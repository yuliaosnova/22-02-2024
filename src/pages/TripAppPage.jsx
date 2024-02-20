import { useState } from "react";
import TripsList from "../components/TripsList/TripsList";
import css from "./TripAppPage.module.css";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";

const TripAppPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <h1 className={css.title}>
          Weather <span className={css.title_bold}>Forecast</span>
        </h1>
        <TripsList toggleModal={toggleModal} />
      </div>
      <div className={css.right_block}></div>
    </div>
  );
};

export default TripAppPage;
