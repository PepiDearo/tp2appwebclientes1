import { useEffect } from 'react';

export function Pagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  onItemsPerPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

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
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <button
        className="pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
      
      <ul className="pagination-list">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              className={`pagination-link ${currentPage === number ? 'is-current' : ''}`}
              aria-label={`Page ${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      
      <div className="field has-addons is-pulled-right">
        <div className="control">
          <span className="select">
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
              {[4, 8, 12, 16].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </span>
        </div>
      </div>
    </nav>
  );
}