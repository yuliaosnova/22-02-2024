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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className={css.timer}>
      <div className={css.timer_item}>
        <p className={css.time_value}>{days}</p>
        <p className={css.time_label}>Days</p>
      </div>
      <div className={css.timer_item}>
        <p className={css.time_value}>{hours}</p>
        <p className={css.time_label}>Hours</p>
      </div>
      <div className={css.timer_item}>
        <p className={css.time_value}>{minutes}</p>
        <p className={css.time_label}>Minutes</p>
      </div>
      <div className={css.timer_item}>
        <p className={css.time_value}>{seconds}</p>
        <p className={css.time_label}>Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;

