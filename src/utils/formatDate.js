/**
 * Format a date from YYYY-MM-DD to DD.MM.YYYY format.
 * @param {string} date YYYY-MM-DD format
 * @returns {string} DD.MM.YYYY format
 */

export function formatDate(date) {
  const arr = date.split("-");
  const formattedDate = arr[2] + "." + arr[1] + "." + arr[0];
  return formattedDate;
}
