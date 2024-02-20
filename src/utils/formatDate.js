export function formatDate(date) {
  const arr = date.split("-");
  const formattedDate = arr[2] + "." + arr[1] + "." + arr[0];
  return formattedDate;
}
