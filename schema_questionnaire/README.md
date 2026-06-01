# YSQ-L3 Static Questionnaire

This folder contains a backend-free web version of the questionnaire.

## Files

- `index.html`: respondent questionnaire page.
- `review.html`: therapist review page for uploading a JSON answer file.
- `ysq-client-data.js`: respondent-facing item data only.
- `ysq-data.js`: therapist-facing item and scoring data.
- `questionnaire.js`, `review.js`, `scoring.js`, `styles.css`: app logic and styles.

## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```sh
python3 -m http.server 8765
```

Then open:

- `http://127.0.0.1:8765/index.html`
- `http://127.0.0.1:8765/review.html`

## Respondent Flow

1. Complete every required 1-6 answer.
2. Add optional comments under any question.
3. Move through the paginated form with `Suivant`.
4. Download the JSON response file.
5. Email the downloaded file to `elisebrotteauxleal@gmail.com`.
6. Use the subject `Réponses au questionnaire`.

The respondent page does not display schema names, schema codes, or scores. The downloaded JSON contains raw answers and comments only. A draft is saved in the browser's local storage so the respondent can leave and return on the same device/browser.

## Therapist Flow

1. Open `review.html`.
2. Upload the received JSON file.
3. Review the summary table and expandable schema sections.

The review page computes scores locally in the browser. No data is sent to a server.

## Publishing Note

If the respondent page is published publicly, publish only the respondent files needed by `index.html`. Keep `review.html`, `ysq-data.js`, and `scoring.js` private unless you are comfortable exposing the scoring structure.
