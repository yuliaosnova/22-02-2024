import css from "./DayWeather.module.css";
import sprite from "../../assets/sprite.svg";
import { getDayOfWeek } from "../../utils/getDayOfWeek";

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
				<p className={css.temperature}>/
              {Math.round(todayWEather.days[0].tempmin)}
              <sup className={css.degree}>°С</sup>
            </p>
          </div>
          <p className={css.city}>{todayWEather.address}</p>
        </div>
      )}
    </>
  );
};

export default DayWeather;
