/**
 * Convert milliseconds to days, hours, minutes, and seconds.
 * @param {number} milliseconds
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 */

export function getTimeFromMillisec(milliseconds) {
  let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
