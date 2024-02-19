import { useEffect, useState } from "react";
import { getTrips } from "../../redux/selectors";
import css from "./TripList.module.css";
import sprite from "../../assets/sprite.svg";
import TripItem from "../TripItem/TripItem";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

const TripsList = () => {
  const trips = useSelector(getTrips);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [filteredTrips, setFilteredTrips] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "",
  });
  const filter = searchParams.get("filter") ?? "";

  useEffect(() => {
    if (filter === "") setFilteredTrips(null);
    const filtered = trips.filter((trip) =>
      trip.city.toLowerCase().includes(filter)
    );
    setFilteredTrips(filtered);
  }, [filter, trips]);

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

  return (
    <section className={css.trips_container}>
      <SearchBar setFilter={setSearchParams} />
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
        {!filteredTrips &&
          trips
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

        {filteredTrips &&
          filteredTrips
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

        <button className={css.add_btn}>
          <span>+</span>
          <p>Add trip</p>
        </button>
      </ul>
    </section>
  );
};

export default TripsList;
