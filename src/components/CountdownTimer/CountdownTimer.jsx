import { useEffect, useState } from "react";
import css from "./CountdownTimer.module.css";
import { calculateTimeLeft } from "../../utils/calculateTimeLeft";
import { useSelector } from "react-redux";
import { getSelectedTripId, getTrips } from "../../redux/selectors";

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
        <div className={css.time_value}>{timeLeft.days}</div>
        <div className={css.time_label}>Days</div>
      </div>
      <div className={css.timer_item}>
        <div className={css.time_value}>{timeLeft.hours}</div>
        <div className={css.time_label}>Hours</div>
      </div>
      <div className={css.timer_item}>
        <div className={css.time_value}>{timeLeft.minutes}</div>
        <div className={css.time_label}>Minutes</div>
      </div>
      <div className={css.timer_item}>
        <div className={css.time_value}>{timeLeft.seconds}</div>
        <div className={css.time_label}>Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
