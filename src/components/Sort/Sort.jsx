import css from "./Sort.module.css";
import { GoSortDesc } from "react-icons/go";

const Sort = ({ toggleIsSorted }) => {
  return (
    <div className={css.sort_container}>
      <button type="button" className={css.sort_btn} onClick={toggleIsSorted}>
        <p className={css.text}>sort by date</p>
        <GoSortDesc className={css.icon} />
      </button>
    </div>
  );
};

export default Sort;
