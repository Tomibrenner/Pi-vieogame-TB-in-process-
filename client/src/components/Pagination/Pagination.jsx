import React from "react";
import "./Pagination.module.css";

const Pagination = ({ gamesPerPage, games, pages }) => {
  const pageNumber = [];
  const total = games && Math.ceil(games / gamesPerPage);
  for (let i = 1; i <= total; i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="pagination_main">
      <ul className="pagination_ul">
        {pageNumber.map((number, index) => (
          <li key={Math.random()} className="number">
            <button onClick={() => pages(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
