import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";
import * as API from "../servises/api";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import DayWeather from "../components/DayWeather/DayWeather";
import TripsList from "../components/TripsList/TripsList";
import { getSelectedTripId, getTrips } from "../redux/selectors";
import DateRangeWeather from "../components/DateRangeWeather/DateRangeWeather";
import AuthBar from "../components/AuthBar/AuthBar";
import css from "./TripAppPage.module.css";

const TripAppPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayWEather, setTodayWeather] = useState(null);
  const [datesRangeWeather, setDateRangeWeather] = useState(null);
  const trips = useSelector(getTrips);
  const selectedTripId = useSelector(getSelectedTripId);
  const selectedTrip = trips.find((trip) => trip.id === selectedTripId);

  useEffect(() => {
    API.fetchTodayWeather(selectedTrip.city, selectedTrip.region)
      .then((response) => {
        setTodayWeather(response);
      })
      .catch((error) => {
      //   console.log(error);
      //   toast.error("Something went wrong :(");
      });
  }, [selectedTrip]);

  useEffect(() => {
    API.fetchFromToWeather(
      selectedTrip.city,
      selectedTrip.region,
      selectedTrip.startDate,
      selectedTrip.endDate
    )
      .then((response) => {
        setDateRangeWeather(response);
      })
      .catch((error) => {
      //   console.log(error);
      //   toast.error("Something went wrong :(");
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
          <div className={css.title_block}>
            <h1 className={css.title}>
              Weather <span className={css.title_bold}>Forecast</span>
            </h1>
            <a
              className={css.github_link}
              href="https://github.com/yuliaosnova/22-02-2024"
              target="_blank"
              rel="noopener noferrer"
              aria-label="Github reference"
            >
              <FaGithub aria-label="github icon" />
            </a>
          </div>

          <AuthBar />
        </div>
        <TripsList toggleModal={toggleModal} />
        <DateRangeWeather datesWeather={datesRangeWeather} />
      </div>
      <div className={css.right_block}>
        <DayWeather todayWEather={todayWEather} />
      </div>
      <ToastContainer
        style={{ width: "250px", fontSize: "12px" }}
        position="top-center"
        autoClose={2500}
        theme="light"
      />
    </div>
  );
};

export default TripAppPage;
