import { useEffect, useState } from "react";
import { getTrips } from "../../redux/selectors";
import css from "./TripList.module.css";
import sprite from "../../assets/sprite.svg";
import TripItem from "../TripItem/TripItem";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import Sort from "../Sort/Sort";
import { sortByDate } from "../../utils/sortByDate";

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
    <section className={css.trips_container}>
      <SearchBar setFilter={setSearchParams} />
      <Sort toggleIsSorted={toggleIsSorted} />
      <div className={css.slide_buttons}>
        <button className={css.slide_btn} onClick={clickLeft}>
          <svg className={css.icon}>
            <use href={`${sprite}#arrow`}></use>
          </svg>
        </button>
        <button className={css.slide_btn} onClick={clickRight}>
          <svg className={[`${css.icon_right} ${css.icon}`]}>
            <use href={`${sprite}#arrow`}></use>
          </svg>
        </button>
      </div>
      <ul className={css.slider}>
        {(filteredTrips || isSorted ? filteredTrips : trips)
          .slice(index, index + 3)
          .map((trip, i) => (
            <TripItem
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              trip={trip}
              index={index}
              key={i}
            />
          ))}

        <button className={css.add_btn} onClick={toggleModal}>
          <span>+</span>
          <p>Add trip</p>
        </button>
      </ul>
    </section>
  );
};

export default TripsList;
