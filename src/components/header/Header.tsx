import React from 'react';
import Search from '../search/Search';
import Navigation from '../navigation/Navigation';
import './header.scss';

interface HeaderProps {
  toggleSort: () => void;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSort, setSearchTerm }) => {
  return (
    <div className="header">
      <h1 className='header__title'>Search</h1>
      <Search onBurgerMenuClick={toggleSort} onSearchChange={setSearchTerm} />
      <Navigation />
    </div>
  );
};

export default Header;
