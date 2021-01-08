import PropTypes from "prop-types";
import _ from "lodash";
import "./pagination.styles.css";

export function Pagination({
  pageSize,
  itemsCount,
  currentPage,
  onPageChange,
  nextPage,
  prevPage,
}) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li className="list__item">
          <button
            className="prev__next list__btn"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            prev
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className="list__item">
            <button
              className={
                page === currentPage ? "list__btn active" : "list__btn"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className=" list__item">
          <button
            className="prev__next list__btn"
            disabled={currentPage === pagesCount}
            onClick={nextPage}
          >
            next
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
