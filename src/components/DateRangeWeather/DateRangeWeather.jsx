import PropTypes from "prop-types";
import { getDayOfWeek } from "../../utils/getDayOfWeek";
import sprite from "../../assets/sprite.svg";
import css from "./DateRangeWeather.module.css";

const DateRangeWeather = ({ datesWeather }) => {
  return (
    <>
      <h2 className={css.title}>Weather for your trip</h2>
      {datesWeather && (
        <ul className={css.weather_list}>
          {datesWeather.days.map((day) => (
            <li key={day.datetimeEpoch} className={css.weather_item}>
              <p className={css.day_of_week}>{getDayOfWeek(day.datetime)}</p>
              <p className={css.day_of_week}>{day.datetime}</p>
              <svg width={30} height={40} aria-label="weather icon">
                <use href={`${sprite}#${day.icon}`}></use>
              </svg>
              <div className={css.temp_block}>
                <p className={css.temperature}>
                  {Math.round(day.tempmax)}
                  <sup className={css.degree}>°</sup>
                </p>
                <p className={css.temperature}>
                  /{Math.round(day.tempmin)}
                  <sup className={css.degree}>°</sup>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

DateRangeWeather.propTypes = {
  datesWeather: PropTypes.shape({
    days: PropTypes.arrayOf(
      PropTypes.shape({
        datetime: PropTypes.string.isRequired,
        datetimeEpoch: PropTypes.number.isRequired,
        tempmax: PropTypes.number.isRequired,
        tempmin: PropTypes.number.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default DateRangeWeather;
