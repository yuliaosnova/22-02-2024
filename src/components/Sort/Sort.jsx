import PropTypes from "prop-types";
import { GoSortDesc } from "react-icons/go";
import css from "./Sort.module.css";

const Sort = ({ toggleIsSorted }) => {
  return (
    <div className={css.sort_container}>
      <button type="button" aria-label="button for sort/unsort trips" className={css.sort_btn} onClick={toggleIsSorted}>
        <p className={css.text}>sort by date</p>
        <GoSortDesc className={css.icon} aria-label="sort icon" />
      </button>
    </div>
  );
};

Sort.propTypes = {
  toggleIsSorted: PropTypes.func.isRequired,
};

export default Sort;
