import { useState } from "react";
import css from "./SearchBar.module.css";
import { FaSearch, FaTrash } from "react-icons/fa";

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
	setSearchQuery("")
	setFilter({filter: ""})
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={css.search_form}>
        <button type="submit" className={css.search_button}>
          <FaSearch  />
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
		  <button type="reset" className={css.remove_btn} onClick={onRemoveClick}>
		  <FaTrash className={css.trash_icon} />
		  </button>
		  
      </form>
    </>
  );
};

export default SearchBar;
