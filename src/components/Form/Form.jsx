import { IoMdClose } from "react-icons/io";
import css from "./Form.module.css";
import { restrictDates } from "../../utils/restrictDates";
import cities from "../../assets/cities.json";
import { useDispatch } from "react-redux";
import { addTrip } from "../../redux/tripSlice";
import { nanoid } from "nanoid";

const Form = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const maxDate = restrictDates();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const city = e.target.elements.city.value;
    const start = e.target.elements.start.value;
    const end = e.target.elements.end.value;
    const image = cities.find(({ name }) => name === city).image;

    dispatch(
      addTrip({
        id: nanoid(),
        city,
        image,
        startDate: start,
        endDate: end,
      })
    );
    form.reset();
    toggleModal();
  }

  return (
    <form className={css.modal} onSubmit={handleSubmit}>
      <div className={css.modal_header}>
        <h3 className={css.modal_title}>Create trip</h3>
        <button
          type="button"
          className={css.close_form_btn}
          onClick={toggleModal}
        >
          <IoMdClose className={css.icon_close} />
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
            max={maxDate}
            placeholder="Select date"
            className={css.field}
            required
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </label>

        <label htmlFor="end">
          <p className={css.label}>
            <span className={css.asterisk}>* </span>End date
          </p>
          <input
            type="text"
            name="end"
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

export default Form;
