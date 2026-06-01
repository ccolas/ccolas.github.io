(function () {
  const HIGH_RESPONSE_THRESHOLD = 5;

  function normalizeAnswers(answers) {
    const answerMap = new Map();

    answers.forEach((answer) => {
      const itemId = Number(answer.itemId);
      const value = Number(answer.value);
      if (!Number.isInteger(itemId) || !Number.isInteger(value)) return;

      answerMap.set(itemId, {
        itemId,
        value,
        comment: typeof answer.comment === "string" ? answer.comment.trim() : ""
      });
    });

    return answerMap;
  }

  function scoreQuestionnaire(data, answers) {
    const answerMap = normalizeAnswers(answers);

    return data.schemas.map((schema) => {
      const schemaAnswers = schema.itemIds
        .map((itemId) => answerMap.get(itemId))
        .filter(Boolean);

      const sum = schemaAnswers.reduce((total, answer) => total + answer.value, 0);
      const answered = schemaAnswers.length;
      const itemCount = schema.itemIds.length;
      const commentCount = schemaAnswers.filter((answer) => answer.comment.length > 0).length;
      const highResponses = schemaAnswers.filter((answer) => answer.value >= HIGH_RESPONSE_THRESHOLD).length;

      return {
        code: schema.code,
        label: schema.label,
        domain: schema.domain,
        itemIds: schema.itemIds,
        itemCount,
        answered,
        missing: itemCount - answered,
        sum,
        max: itemCount * 6,
        average: answered ? Number((sum / answered).toFixed(2)) : 0,
        highResponses,
        commentCount
      };
    });
  }

  function scoreMap(data, answers) {
    return Object.fromEntries(scoreQuestionnaire(data, answers).map((score) => [score.code, score]));
  }

  function ratingLabel(data, value) {
    const rating = data.ratingScale.find((entry) => entry.value === Number(value));
    return rating ? rating.label : "";
  }

  window.YSQ_SCORING = {
    normalizeAnswers,
    scoreQuestionnaire,
    scoreMap,
    ratingLabel
  };
})();
