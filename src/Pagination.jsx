import { useEffect, useRef } from 'react';

// Pagination.jsx
export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {/* Select number of items per page */}
      <div className="field is-grouped is-justify-content-center mb-4">
        <div className="control">
          <div className="select">
            <select
              id="itemsPerPageSelect"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              aria-label="Sélectionner le nombre d'épisodes par page"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pagination navigation */}
      <nav className="pagination is-centered" role="navigation" aria-label="Pagination Navigation">
        <button
          className="pagination-previous"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-disabled={currentPage === 1}
          aria-label="Page précédente"
        >
          Précédent
        </button>

        <button
          className="pagination-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages}
          aria-label="Page suivante"
        >
          Suivant
        </button>

        <ul className="pagination-list" role="list">
          {pageNumbers.map((number) => (
            <li key={number} role="listitem">
              <button
                className={`pagination-link ${currentPage === number ? 'is-current' : ''}`}
                aria-label={`Aller à la page ${number}`}
                aria-current={currentPage === number ? 'page' : undefined}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
