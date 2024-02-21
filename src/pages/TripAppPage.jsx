import { useEffect, useState } from "react";
import TripsList from "../components/TripsList/TripsList";
import css from "./TripAppPage.module.css";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import DayWeather from "../components/DayWeather/DayWeather";
import * as API from "../servises/api";
import { useSelector } from "react-redux";
import { getSelectedTripId, getTrips } from "../redux/selectors";
import DateRangeWeather from "../components/DateRangeWeather/DateRangeWeather";
import AuthBar from "../components/AuthBar/AuthBar";

const TripAppPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayWEather, setTodayWeather] = useState(null);
  const [datesRangeWeather, setDateRangeWeather] = useState(null);
  const trips = useSelector(getTrips);
  const selectedTripId = useSelector(getSelectedTripId);
  const selectedTrip = trips.find((trip) => trip.id === selectedTripId);
  //   console.log(selectedTrip);

  useEffect(() => {
    API.fetchTodayWeather(selectedTrip.city)
      .then((response) => {
        setTodayWeather(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedTrip]);

  useEffect(() => {
    API.fetchFromToWeather(
      selectedTrip.city,
      selectedTrip.startDate,
      selectedTrip.endDate
    )
      .then((response) => {
        setDateRangeWeather(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedTrip]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={css.main_container}>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <Form toggleModal={toggleModal} />
        </Modal>
      )}
      <div className={css.left_block}>
        <div className={css.header}>
          <h1 className={css.title}>
            Weather <span className={css.title_bold}>Forecast</span>
          </h1>
          <AuthBar />
        </div>
        <TripsList toggleModal={toggleModal} />
        <DateRangeWeather datesWeather={datesRangeWeather} />
      </div>
      <div className={css.right_block}>
        <DayWeather todayWEather={todayWEather} />
      </div>
    </div>
  );
};

export default TripAppPage;
