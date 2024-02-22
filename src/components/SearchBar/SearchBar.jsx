import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaTrash } from "react-icons/fa";
import css from "./SearchBar.module.css";

const SearchBar = ({ setFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.length === 0) {
      setFilter({ filter: "" });
    }
    setFilter({ filter: searchQuery });
  };

  const onRemoveClick = () => {
    setSearchQuery("");
    setFilter({ filter: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.search_form}>
        <button
          type="submit"
          aria-label="button for starting search"
          className={css.search_button}
        >
          <FaSearch aria-label="search icon" />
        </button>
        <input
          type="text"
          value={searchQuery}
          className={css.search_input}
          placeholder="Search you trip"
          name="search"
          autoFocus
          onChange={handleChange}
        />
        <button
          type="reset"
          aria-label="button for reseting search form"
          className={css.remove_btn}
          onClick={onRemoveClick}
        >
          <FaTrash className={css.trash_icon} aria-label="remove icon" />
        </button>
      </form>
    </>
  );
};

SearchBar.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default SearchBar;
