export function restrictDates() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 15);
  return currentDate.toISOString().split("T")[0];
}
