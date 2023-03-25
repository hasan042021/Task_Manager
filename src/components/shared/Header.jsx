import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../images/svg/logo-task.svg";
const Header = ({ search, setSearch }) => {
  return (
    <nav class="container relative py-3">
      <div class="flex items-center justify-between">
        <Link to="/">
          <img src={logoImage} />
        </Link>
        <div class="flex-1 max-w-xs search-field group">
          <i class="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            class="search-input text-black"
            id="lws-searchTask"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
