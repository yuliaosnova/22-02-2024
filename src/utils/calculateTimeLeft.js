import { getTimeFromMillisec } from "./getTimeFromMillisec";

/**
 * Calculate the time left until the start of the trip.
 * @param {string} startTripDate The start date of the trip.
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 */

export function calculateTimeLeft(startTripDate) {
  const initialTime = Date.now();

  const localOffsetInMillis = new Date().getTimezoneOffset() * 60000;

  const initialUTCtime = initialTime - localOffsetInMillis;

  const date = new Date(startTripDate).getTime();

  const milliSecLeft = date - initialUTCtime;

  if (milliSecLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const timeLeft = getTimeFromMillisec(milliSecLeft);

  return timeLeft;
}
