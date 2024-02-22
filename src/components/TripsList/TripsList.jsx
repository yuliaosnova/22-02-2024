import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getTrips } from "../../redux/selectors";
import sprite from "../../assets/sprite.svg";
import { sortByDate } from "../../utils/sortByDate";
import TripItem from "../TripItem/TripItem";
import SearchBar from "../SearchBar/SearchBar";
import Sort from "../Sort/Sort";
import css from "./TripList.module.css";

const TripsList = ({ toggleModal }) => {
  let trips = useSelector(getTrips);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [filteredTrips, setFilteredTrips] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
  });
  const filter = searchParams.get("filter") ?? "";

  useEffect(() => {
    let filtered = trips.filter((trip) =>
      trip.city.toLowerCase().includes(filter)
    );
    if (!isSorted) {
      setFilteredTrips(filtered);
    } else {
      const sortedTrips = sortByDate(filtered);
      setFilteredTrips(sortedTrips);
    }
  }, [filter, trips, isSorted]);

  function onTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function onTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function onTouchEnd() {
    if (touchStart - touchEnd > 100) {
      clickRight();
    }

    if (touchStart - touchEnd < -100) {
      clickLeft();
    }
  }

  function clickRight() {
    if (index < trips.length - 3) {
      setIndex((index) => index + 1);
    }
  }

  function clickLeft() {
    if (index === 0) {
      return;
    } else {
      setIndex((index) => index - 1);
    }
  }

  function toggleIsSorted() {
    setIsSorted(!isSorted);
    setIndex(0);
  }

  return (
    <div className={css.trips_container}>
      <SearchBar setFilter={setSearchParams} />
      <Sort toggleIsSorted={toggleIsSorted} />
      <div className={css.slide_buttons}>
        <button
          className={css.slide_btn}
          aria-label="slide list to left"
          onClick={clickLeft}
          disabled={index === 0 ? true : false}
        >
          <svg className={css.icon} aria-label="arrow left">
            <use href={`${sprite}#arrow`}></use>
          </svg>
        </button>
        <button
          className={css.slide_btn}
          aria-label="slide list to right"
          onClick={clickRight}
          disabled={index === trips.length - 3 ? true : false}
        >
          <svg
            className={[`${css.icon_right} ${css.icon}`]}
            aria-label="arrow right"
          >
            <use href={`${sprite}#arrow`}></use>
          </svg>
        </button>
      </div>
      {!filteredTrips ||
        (filteredTrips.length === 0 && (
          <p>No results found. Try to add the trip.</p>
        ))}
      <ul className={css.slider}>
        {(filteredTrips || isSorted ? filteredTrips : trips)
          .slice(index, index + 3)
          .map((trip) => (
            <TripItem
              key={trip.id}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              trip={trip}
            />
          ))}

        <button
          className={css.add_btn}
          aria-label="add new trip"
          onClick={toggleModal}
        >
          <span>+</span>
          <p>Add trip</p>
        </button>
      </ul>
    </div>
  );
};

TripsList.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default TripsList;
