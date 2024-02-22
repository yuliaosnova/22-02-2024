import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { idChange } from "../../redux/selectedTripSlice";
import { getSelectedTripId } from "../../redux/selectors";
import { formatDate } from "../../utils/formatDate";
import css from "./TripItem.module.css";

const TripItem = ({ onTouchStart, onTouchMove, onTouchEnd, trip }) => {
  const selectedTrip = useSelector(getSelectedTripId);
  const dispatch = useDispatch();

  function chooseTrip(selectedId) {
    dispatch(idChange(selectedId));
  }

  return (
    <li
      className={css.trip_item}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={() => chooseTrip(trip.id)}
    >
      <img
        width={120}
        height={120}
        className={css.city_img}
        src={trip.image}
        alt={trip.city}
      ></img>
      <div
        className={
          trip.id === selectedTrip
            ? `${css.description_selected}`
            : `${css.description}`
        }
      >
        <p className={css.city}>{trip.city}</p>
        <p className={css.dates}>
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </p>
      </div>
    </li>
  );
};

TripItem.propTypes = {
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
  trip: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default TripItem;
