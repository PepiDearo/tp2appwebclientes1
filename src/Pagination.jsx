import { useEffect, useRef } from 'react';

export function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  onItemsPerPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  const selectRef = useRef(null);

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  // Charger depuis localStorage
  useEffect(() => {
    const savedItemsPerPage = localStorage.getItem('itemsPerPage');
    if (savedItemsPerPage && [4, 8, 12, 16].includes(Number(savedItemsPerPage))) {
      onItemsPerPageChange(Number(savedItemsPerPage));
    }
  }, []);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav 
      className="pagination is-centered" 
      role="navigation" 
      aria-label="Pagination Navigation"
    >
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
        {pageNumbers.map(number => (
          <li key={number} role="listitem">
            <button
              className={`pagination-link ${currentPage === number ? 'is-current' : ''}`}
              aria-label={`Aller à la page ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      
      <div className="field has-addons is-pulled-right" role="group" aria-label="Changer le nombre d'éléments par page">
        <div className="control">
          <span className="select">
            <select
              id="itemsPerPageSelect"
              ref={selectRef}
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              aria-required="true"
              aria-describedby="itemsPerPageLabel"
            >
              {[4, 8, 12, 16].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
    </nav>
  );
}
