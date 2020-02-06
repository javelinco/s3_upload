export function formatTimeLength(msInput: string): string {
  let resultString = '';
  let ms = parseInt(msInput, 10);
  if (isNaN(ms)) {
    throw new Error(`Error parsing '${msInput}': not a number`);
  }
  if (ms < 0) {
    ms = -ms;
  }

  const s = Math.floor((ms / 1000) % 60);
  const m = Math.floor((ms / 1000 / 60) % 60);
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (d > 0) {
    resultString += `${d} days, `;
  }
  if (h > 0) {
    resultString += `${h} hours, `;
  }
  resultString += `${m} minutes, ${s} seconds`;
  return resultString;
}
