import React, { useState } from 'react';
import burgerMenu from '../../images/list-ui-alt.svg';
import './search.scss';

interface SearchProps {
  onBurgerMenuClick: () => void;
  onSearchChange: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onBurgerMenuClick, onSearchChange }) => {
  const [isStyled, setIsStyled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSize = () => {
    setIsStyled(prev => !prev);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearInput = () => {
    setSearchTerm('');
    onSearchChange('');
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
          />
          <button type="button" className="search__burger-menu" onClick={onBurgerMenuClick}>
            <img
              src={burgerMenu}
              alt="Menu"
              onClick={toggleSize}
              style={isStyled ? { width: '21px', height: '21px' } : {}}
            />
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
