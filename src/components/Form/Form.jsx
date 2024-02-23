import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { restrictDates } from "../../utils/restrictDates";
import { getTodayDate } from "../../utils/getTodayDate";
import cities from "../../assets/cities.json";
import { addTrip } from "../../redux/tripSlice";
import css from "./Form.module.css";

const Form = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const today = getTodayDate();
  const maxDate = restrictDates();
  const [minDate, setMinDate] = useState(today);
  console.log(minDate)

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const city = form.elements.city.value;
   //  const start = form.elements.start.value;
    const end = form.elements.end.value;
    const c = cities.find(({ name }) => name === city);
	 

    dispatch(
      addTrip({
        id: nanoid(),
        city,
        region: c?.region,
        image: c?.image,
        startDate: minDate,
        endDate: end,
      })
    );
    toast.success("The trip was added to the list!");
    form.reset();
    toggleModal();
  }

  const onStartDateChange = (e) => {
    setMinDate(e.target.value);
  };

  return (
    <form className={css.modal} onSubmit={handleSubmit}>
      <div className={css.modal_header}>
        <h3 className={css.modal_title}>Create trip</h3>
        <button
          type="button"
          aria-label="button for closing modal"
          className={css.close_form_btn}
          onClick={toggleModal}
        >
          <IoMdClose className={css.icon_close} aria-label="close icon" />
        </button>
      </div>
      <div className={css.form}>
        <label htmlFor="city" className={css.label}>
          <p className={css.field_name}>
            <span className={css.asterisk}>* </span>City
          </p>
          <select
            name="city"
            className={css.select}
            defaultValue="default"
            required
          >
            <option value="default" disabled>
              Please select a city
            </option>
            {cities.map((city) => (
              <option value={city.name} key={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="start">
          <p className={css.label}>
            <span className={css.asterisk}>* </span>Start date
          </p>
          <input
            type="text"
            name="start"
            min={today}
            max={maxDate}
            placeholder="Select date"
            className={css.field}
            required
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={(e) => onStartDateChange(e)}
          />
        </label>

        <label htmlFor="end">
          <p className={css.label}>
            <span className={css.asterisk}>* </span>End date
          </p>
          <input
            type="text"
            name="end"
            min={minDate}
            max={maxDate}
            placeholder="Select date"
            className={css.field}
            required
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </label>
      </div>
      <div className={css.modal_footer}>
        <div className={css.buttons_container}>
          <button
            type="reset"
            className={css.modal_button}
            onClick={toggleModal}
          >
            Cancel
          </button>
          <button type="submit" className={css.modal_button}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  toggleModal: PropTypes.func,
};

export default Form;
