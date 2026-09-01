(function () {
  const data = window.YSQ_DATA;
  const scoring = window.YSQ_SCORING;
  const fileInput = document.getElementById("answers-file");
  const dropZone = document.getElementById("drop-zone");
  const fileError = document.getElementById("file-error");
  const reviewContent = document.getElementById("review-content");
  const summary = document.getElementById("summary");
  const scoreTable = document.getElementById("score-table");
  const schemaSections = document.getElementById("schema-sections");
  const itemById = new Map(data.items.map((item) => [item.id, item]));

  function renderReview(payload) {
    const answerMap = scoring.normalizeAnswers(payload.answers || []);
    const answers = Array.from(answerMap.values());
    const scores = scoring.scoreQuestionnaire(data, answers);
    const totalComments = answers.filter((answer) => answer.comment.length > 0).length;
    const answered = answers.length;
    const highResponses = answers.filter((answer) => answer.value >= 5).length;
    const completedAtDate = payload.administration && payload.administration.completedAt
      ? new Date(payload.administration.completedAt)
      : null;
    const completedAt = completedAtDate
      ? completedAtDate.toLocaleString("fr-FR")
      : "Non renseigné";
    const questionnaireDate = completedAtDate
      ? completedAtDate.toLocaleDateString("fr-FR")
      : "Non renseignée";

    const respondentName = payload.respondent
      ? payload.respondent.name || [payload.respondent.firstName, payload.respondent.lastName].filter(Boolean).join(" ")
      : "";

    summary.innerHTML = [
      summaryCard("Nom", respondentName || "Non renseigné"),
      summaryCard("Date du questionnaire", questionnaireDate),
      summaryCard("Complété le", completedAt),
      summaryCard("Réponses", `${answered} / ${data.items.length}`),
      summaryCard("Commentaires", String(totalComments)),
      summaryCard("Réponses 5-6", String(highResponses))
    ].join("");

    scoreTable.innerHTML = scores
      .map((score) => `
        <tr>
          <td><strong>${escapeHtml(score.label)}</strong> <span class="muted">(${score.code})</span></td>
          <td>${score.answered} / ${score.itemCount}</td>
          <td>${score.sum} / ${score.max}</td>
          <td>${score.average.toFixed(2)}</td>
          <td>${score.highResponses}</td>
          <td>${score.commentCount}</td>
        </tr>
      `)
      .join("");

    schemaSections.innerHTML = scores
      .map((score) => renderSchemaSection(score, answerMap))
      .join("");

    reviewContent.hidden = false;
  }

  function summaryCard(label, value) {
    return `
      <article class="summary-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </article>
    `;
  }

  function renderSchemaSection(score, answerMap) {
    const rows = score.itemIds
      .map((itemId) => {
        const item = itemById.get(itemId);
        const answer = answerMap.get(itemId);
        const value = answer ? answer.value : "—";
        const label = answer ? scoring.ratingLabel(data, answer.value) : "Sans réponse";
        const comment = answer && answer.comment ? answer.comment : "";

        return `
          <article class="answer-row">
            <div class="answer-meta">
              <span>Item ${itemId}</span>
              <strong>${value}</strong>
            </div>
            <div>
              <p class="answer-text">${escapeHtml(item.text)}</p>
              <p class="answer-label">${escapeHtml(label)}</p>
              ${comment ? `<p class="answer-comment">${escapeHtml(comment)}</p>` : `<p class="answer-comment is-empty">Aucun commentaire</p>`}
            </div>
          </article>
        `;
      })
      .join("");

    return `
      <details class="schema-detail">
        <summary>
          <span>
            <strong>${escapeHtml(score.label)}</strong>
            <em>${escapeHtml(score.domain)} · ${score.code}</em>
          </span>
          <span class="summary-stats">
            ${score.answered}/${score.itemCount} réponses · ${score.commentCount} commentaires · moyenne ${score.average.toFixed(2)}
          </span>
        </summary>
        <div class="answers-list">${rows}</div>
      </details>
    `;
  }

  async function loadFile(file) {
    try {
      fileError.textContent = "";
      const payload = JSON.parse(await file.text());
      validatePayload(payload);
      renderReview(payload);
    } catch (error) {
      reviewContent.hidden = true;
      fileError.textContent = error.message || "Impossible de lire ce fichier.";
    }
  }

  function validatePayload(payload) {
    if (!payload || payload.fileType !== "ysq-l3-responses") {
      throw new Error("Ce fichier ne ressemble pas à un fichier de réponses YSQ-L3.");
    }
    if (!Array.isArray(payload.answers)) {
      throw new Error("Le fichier ne contient pas de liste de réponses.");
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (file) loadFile(file);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.add("is-dragging");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.remove("is-dragging");
    });
  });

  dropZone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) loadFile(file);
  });
})();
