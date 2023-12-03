import React from 'react';
import './style.scss';
const Paginator = ({ length, currentPage, setCurrentPage }) => {
  return (
    <div className="paginator middle">
      <div className="pagination">
        <ul>
          {Array(Math.ceil(length))
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className={index === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(index)}
              >
                <a href="#"></a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Paginator;
