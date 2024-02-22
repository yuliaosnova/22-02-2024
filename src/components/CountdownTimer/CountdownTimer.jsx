import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedTripId, getTrips } from "../../redux/selectors";
import { calculateTimeLeft } from "../../utils/calculateTimeLeft";
import css from "./CountdownTimer.module.css";

const CountdownTimer = () => {
  const trips = useSelector(getTrips);
  const selectedTripId = useSelector(getSelectedTripId);
  const selectedTrip = trips.find((trip) => trip.id === selectedTripId);
  const startDate = selectedTrip.startDate;
  const timeLeft = calculateTimeLeft(startDate);

  const [days, setDays] = useState(timeLeft.days);
  const [hours, setHours] = useState(timeLeft.hours);
  const [minutes, setMinutes] = useState(timeLeft.minutes);
  const [seconds, setSeconds] = useState(timeLeft.seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      } else if (minutes > 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((hours) => hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays((days) => days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes, hours, days]);

  return (
    <div className={css.timer}>
      <div className={css.timer_item}>
        <p className={css.time_value}>{timeLeft.days}</p>
        <p className={css.time_label}>Days</p>
      </div>
      <div className={css.timer_item}>
        <p className={css.time_value}>{timeLeft.hours}</p>
        <p className={css.time_label}>Hours</p>
      </div>
      <div className={css.timer_item}>
        <p className={css.time_value}>{timeLeft.minutes}</p>
        <p className={css.time_label}>Minutes</p>
      </div>
      <div className={css.timer_item}>
        <p className={css.time_value}>{timeLeft.seconds}</p>
        <p className={css.time_label}>Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
