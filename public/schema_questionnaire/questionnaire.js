(function () {
  const data = window.YSQ_DATA;
  const totalItems = data.items.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const draftKey = "ysq-l3-client-draft-v1";
  const completedKey = "ysq-l3-last-completed-export-v1";
  let latestPayload = null;
  let currentPage = 0;

  const form = document.getElementById("questionnaire-form");
  const scaleList = document.getElementById("scale-list");
  const itemsContainer = document.getElementById("items-container");
  const pageText = document.getElementById("page-text");
  const progressText = document.getElementById("progress-text");
  const commentText = document.getElementById("comment-text");
  const validationMessage = document.getElementById("validation-message");
  const completionPanel = document.getElementById("completion-panel");
  const downloadAgain = document.getElementById("download-again");
  const respondentFirstName = document.getElementById("respondent-first-name");
  const respondentLastName = document.getElementById("respondent-last-name");
  const previousPage = document.getElementById("previous-page");
  const nextPage = document.getElementById("next-page");
  const submitPanel = document.getElementById("submit-panel");
  const showResetConfirmation = document.getElementById("show-reset-confirmation");
  const resetConfirmation = document.getElementById("reset-confirmation");
  const confirmReset = document.getElementById("confirm-reset");
  const cancelReset = document.getElementById("cancel-reset");

  function renderScale() {
    scaleList.innerHTML = data.ratingScale
      .map((rating) => `
        <li>
          <span><span class="scale-number">${rating.value}</span>: ${rating.label}</span>
        </li>
      `)
      .join("");
  }

  function renderItems() {
    const scaleButtons = data.ratingScale
      .map((rating) => {
        return `
          <label class="rating-option">
            <input type="radio" value="${rating.value}" aria-label="${rating.value} - ${rating.label}">
            <span>${rating.value}</span>
          </label>
        `;
      })
      .join("");

    itemsContainer.innerHTML = data.items
      .map((item, index) => {
        const questionNumber = index + 1;
        return `
          <article class="question-card" data-item-id="${item.id}">
            <div class="question-head">
              <p class="question-count">Question ${questionNumber} sur ${totalItems}</p>
              <p class="question-text">${escapeHtml(item.text)}</p>
            </div>
            <fieldset class="rating-group" aria-label="Réponse à la question ${questionNumber}">
              ${scaleButtons.replaceAll('type="radio"', `type="radio" name="item-${item.id}"`)}
            </fieldset>
            <div class="comment-block">
              <button
                class="comment-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="comment-panel-${item.id}"
                data-comment-toggle="${item.id}"
              >
                Commentaire
              </button>
              <label id="comment-panel-${item.id}" class="comment-field" hidden>
                <textarea name="comment-${item.id}" rows="2" aria-label="Commentaire optionnel pour la question ${questionNumber}"></textarea>
              </label>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function collectAnswers() {
    return data.items.map((item) => {
      const selected = form.querySelector(`input[name="item-${item.id}"]:checked`);
      const comment = form.querySelector(`textarea[name="comment-${item.id}"]`).value.trim();

      return {
        itemId: item.id,
        value: selected ? Number(selected.value) : null,
        comment
      };
    });
  }

  function updateProgress() {
    const answers = collectAnswers();
    const answeredCount = answers.filter((answer) => Number.isInteger(answer.value)).length;
    const comments = answers.filter((answer) => answer.comment.length > 0).length;

    pageText.textContent = `Page ${currentPage + 1} / ${totalPages}`;
    progressText.textContent = `${answeredCount} / ${totalItems} réponses`;
    commentText.textContent = `${comments} commentaire${comments > 1 ? "s" : ""}`;
  }

  function currentPageItemIds() {
    const start = currentPage * itemsPerPage;
    return data.items.slice(start, start + itemsPerPage).map((item) => item.id);
  }

  function validateAnswers(answers, itemIds = null) {
    const allowed = itemIds ? new Set(itemIds) : null;
    const missing = answers.filter((answer) => {
      if (allowed && !allowed.has(answer.itemId)) return false;
      return !Number.isInteger(answer.value);
    });
    document.querySelectorAll(".question-card.is-missing").forEach((card) => {
      card.classList.remove("is-missing");
    });

    if (!missing.length) {
      validationMessage.textContent = "";
      return true;
    }

    if (!allowed) {
      const firstMissingPage = Math.floor((missing[0].itemId - 1) / itemsPerPage);
      if (firstMissingPage !== currentPage) showPage(firstMissingPage);
    }

    missing.forEach((answer) => {
      const card = document.querySelector(`[data-item-id="${answer.itemId}"]`);
      if (card) card.classList.add("is-missing");
    });

    const firstMissing = document.querySelector(".question-card.is-missing");
    validationMessage.textContent = `Il manque ${missing.length} réponse${missing.length > 1 ? "s" : ""}.`;
    if (firstMissing) firstMissing.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }

  function buildPayload(answers) {
    const completeAnswers = answers.map((answer) => ({
      itemId: answer.itemId,
      value: answer.value,
      comment: answer.comment
    }));

    return {
      fileType: "ysq-l3-responses",
      fileVersion: "1.0.0",
      questionnaire: data.questionnaire,
      administration: {
        itemOrder: "standard",
        scoringVisibleToRespondent: false,
        completedAt: new Date().toISOString(),
        totalItems
      },
      respondent: {
        firstName: respondentFirstName.value.trim(),
        lastName: respondentLastName.value.trim(),
        name: [respondentFirstName.value.trim(), respondentLastName.value.trim()].filter(Boolean).join(" ")
      },
      answers: completeAnswers,
      scoring: {
        included: false,
        note: "Scores are computed locally in the therapist review page."
      }
    };
  }

  function showPage(page) {
    currentPage = Math.min(Math.max(page, 0), totalPages - 1);
    const firstVisible = currentPage * itemsPerPage;
    const lastVisible = firstVisible + itemsPerPage;

    data.items.forEach((item, index) => {
      const card = document.querySelector(`[data-item-id="${item.id}"]`);
      if (card) card.hidden = index < firstVisible || index >= lastVisible;
    });

    previousPage.disabled = currentPage === 0;
    nextPage.hidden = currentPage === totalPages - 1;
    submitPanel.hidden = currentPage !== totalPages - 1;
    validationMessage.textContent = "";
    updateProgress();
    saveDraft();
    itemsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveDraft() {
    const draft = {
      savedAt: new Date().toISOString(),
      currentPage,
      respondent: {
        firstName: respondentFirstName.value.trim(),
        lastName: respondentLastName.value.trim()
      },
      answers: collectAnswers()
    };

    localStorage.setItem(draftKey, JSON.stringify(draft));
  }

  function setCommentOpen(itemId, open) {
    const button = form.querySelector(`[data-comment-toggle="${itemId}"]`);
    const field = form.querySelector(`#comment-panel-${itemId}`);
    if (!button || !field) return;

    button.setAttribute("aria-expanded", String(open));
    button.classList.toggle("has-comment", field.querySelector("textarea").value.trim().length > 0);
    field.hidden = !open;
  }

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;

      const draft = JSON.parse(raw);
      if (draft.respondent && typeof draft.respondent.firstName === "string") {
        respondentFirstName.value = draft.respondent.firstName;
      }

      if (draft.respondent && typeof draft.respondent.lastName === "string") {
        respondentLastName.value = draft.respondent.lastName;
      }

      if (draft.respondent && typeof draft.respondent.name === "string" && !draft.respondent.firstName && !draft.respondent.lastName) {
        respondentLastName.value = draft.respondent.name;
      }

      if (Array.isArray(draft.answers)) {
        draft.answers.forEach((answer) => {
          const value = Number(answer.value);
          const selected = Number.isInteger(value)
            ? form.querySelector(`input[name="item-${answer.itemId}"][value="${value}"]`)
            : null;
          const comment = form.querySelector(`textarea[name="comment-${answer.itemId}"]`);

          if (selected) selected.checked = true;
          if (comment && typeof answer.comment === "string") {
            comment.value = answer.comment;
            if (answer.comment.trim()) setCommentOpen(answer.itemId, true);
          }
        });
      }

      if (Number.isInteger(draft.currentPage)) currentPage = draft.currentPage;
    } catch (error) {
      localStorage.removeItem(draftKey);
    }
  }

  function downloadPayload(payload) {
    const name = payload.respondent.name || "anonyme";
    const safeName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "anonyme";
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `reponses-ysq-l3-${safeName}-${date}.json`;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function saveCompletedPayload(payload) {
    localStorage.setItem(completedKey, JSON.stringify(payload));
  }

  function restoreCompletedPayload() {
    try {
      const raw = localStorage.getItem(completedKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      localStorage.removeItem(completedKey);
      return null;
    }
  }

  function resetQuestionnaire() {
    localStorage.removeItem(draftKey);
    localStorage.removeItem(completedKey);
    latestPayload = null;
    currentPage = 0;
    form.reset();

    document.querySelectorAll(".question-card.is-missing").forEach((card) => {
      card.classList.remove("is-missing");
    });

    document.querySelectorAll("[data-comment-toggle]").forEach((button) => {
      setCommentOpen(button.dataset.commentToggle, false);
      button.classList.remove("has-comment");
    });

    validationMessage.textContent = "";
    completionPanel.hidden = true;
    resetConfirmation.hidden = true;
    document.body.classList.remove("has-modal");
    showPage(0);
    respondentFirstName.focus();
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  form.addEventListener("input", () => {
    document.querySelectorAll("[data-comment-toggle]").forEach((button) => {
      const itemId = button.dataset.commentToggle;
      const textarea = form.querySelector(`textarea[name="comment-${itemId}"]`);
      button.classList.toggle("has-comment", textarea && textarea.value.trim().length > 0);
    });
    updateProgress();
    saveDraft();
  });

  form.addEventListener("click", (event) => {
    const button = event.target.closest("[data-comment-toggle]");
    if (!button) return;

    const itemId = button.dataset.commentToggle;
    const isOpen = button.getAttribute("aria-expanded") === "true";
    setCommentOpen(itemId, !isOpen);
    if (isOpen) return;

    const textarea = form.querySelector(`textarea[name="comment-${itemId}"]`);
    if (textarea) textarea.focus();
  });

  previousPage.addEventListener("click", () => {
    showPage(currentPage - 1);
  });

  nextPage.addEventListener("click", () => {
    const answers = collectAnswers();
    if (!validateAnswers(answers, currentPageItemIds())) return;
    showPage(currentPage + 1);
  });

  showResetConfirmation.addEventListener("click", () => {
    resetConfirmation.hidden = false;
    document.body.classList.add("has-modal");
    cancelReset.focus();
  });

  cancelReset.addEventListener("click", () => {
    resetConfirmation.hidden = true;
    document.body.classList.remove("has-modal");
    showResetConfirmation.focus();
  });

  confirmReset.addEventListener("click", resetQuestionnaire);

  resetConfirmation.addEventListener("click", (event) => {
    if (event.target !== resetConfirmation) return;
    resetConfirmation.hidden = true;
    document.body.classList.remove("has-modal");
    showResetConfirmation.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || resetConfirmation.hidden) return;
    resetConfirmation.hidden = true;
    document.body.classList.remove("has-modal");
    showResetConfirmation.focus();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const answers = collectAnswers();
    if (!validateAnswers(answers)) return;

    latestPayload = buildPayload(answers);
    saveCompletedPayload(latestPayload);
    try {
      downloadPayload(latestPayload);
    } catch (error) {
      validationMessage.textContent = "Le fichier est sauvegardé dans ce navigateur. Cliquez sur télécharger à nouveau.";
    }
    completionPanel.hidden = false;
    completionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  downloadAgain.addEventListener("click", () => {
    const payload = latestPayload || restoreCompletedPayload();
    if (payload) downloadPayload(payload);
  });

  renderScale();
  renderItems();
  restoreDraft();
  showPage(currentPage);
})();
