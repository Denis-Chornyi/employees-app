import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import './search.scss';

interface SearchProps {
  onBurgerMenuClick: () => void;
  onSearchChange?: (searchTerm: string) => void;
  isSortOpen: boolean;
}

const Search: React.FC<SearchProps> = ({ onBurgerMenuClick, onSearchChange, isSortOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [searchTerm, navigate, location.search]);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  }, [searchTerm, onSearchChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearInput = () => {
    setSearchTerm('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const iconStyle = isSortOpen
    ? {
        filter:
          'invert(54%) sepia(92%) saturate(7380%) hue-rotate(250deg) brightness(94%) contrast(94%)',
        width: '20px',
        height: '20px'
      }
    : {
        width: '20px',
        height: '20px',
        filter: 'contrast(0%)'
      };

  return (
    <div className="search">
      <div className="container search__container">
        <form className="search__form">
          <input
            className="search__input"
            type="search"
            placeholder="Enter name, tag, email..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="search__burger-menu" onClick={onBurgerMenuClick}>
            <FormatListBulletedIcon className="search__burger-menu-icon" style={iconStyle} />
          </button>
        </form>
        {searchTerm && (
          <button type="button" className="search__clear" onClick={clearInput}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
