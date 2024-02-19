import TripsList from "../components/TripsList/TripsList";
import css from "./TripAppPage.module.css";

const TripAppPage = () => {
  return (
    <div className={css.main_container}>
      <div className={css.left_block}>
        <h1 className={css.title}>
          Weather <span className={css.title_bold}>Forecast</span>
        </h1>
        <TripsList />
      </div>
      <div className={css.right_block}></div>
    </div>
  );
};

export default TripAppPage;
