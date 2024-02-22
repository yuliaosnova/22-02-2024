import PropTypes from "prop-types";
import sprite from "../../assets/sprite.svg";
import { getDayOfWeek } from "../../utils/getDayOfWeek";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import css from "./DayWeather.module.css";

const DayWeather = ({ todayWEather }) => {
  return (
    <>
      {todayWEather && (
        <div className={css.widget_container}>
          <p className={css.day}>
            {getDayOfWeek(todayWEather.days[0].datetime)}
          </p>
          <div className={css.temperature_block}>
            <svg width={70} height={40}>
              <use href={`${sprite}#${todayWEather.days[0].icon}`}></use>
            </svg>
            <p className={css.temperature}>
              {Math.round(todayWEather.days[0].tempmax)}
              <sup className={css.degree}>°С</sup>
            </p>
            <p className={css.temperature}>
              /{Math.round(todayWEather.days[0].tempmin)}
              <sup className={css.degree}>°С</sup>
            </p>
          </div>
          <p className={css.city}>{todayWEather.address.slice(0, -3)}</p>
          <CountdownTimer />
        </div>
      )}
    </>
  );
};

DayWeather.propTypes = {
  todayWEather: PropTypes.shape({
    days: PropTypes.arrayOf(
      PropTypes.shape({
        datetime: PropTypes.string.isRequired,
        tempmax: PropTypes.number.isRequired,
        tempmin: PropTypes.number.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    address: PropTypes.string.isRequired,
  }),
};

export default DayWeather;
