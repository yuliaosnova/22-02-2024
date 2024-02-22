//Sort an array of trips objects by start dates in descending order

export function sortByDate(arr) {
  return arr.sort((a, b) => (b.startDate > a.startDate ? 1 : -1));
}
