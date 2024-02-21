import { getTimeFromMillisec } from "./getTimeFromMillisec";

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
