import React, { useState } from 'react';
import Search from '../search/Search';
import Navigation from '../navigation/Navigation';
import SortWorkers from '../sort-workers/SortWorkers';
import './header.scss';

interface HeaderProps {
  setSearchTerm?: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchTerm }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setIsSortOpen(prev => !prev);
  };

  const handleCloseSort = () => {
    setIsSortOpen(false);
  };

  return (
    <div className="header">
      <h1 className="header__title">Search</h1>
      <Search
        onBurgerMenuClick={handleBurgerMenuClick}
        onSearchChange={setSearchTerm}
        isSortOpen={isSortOpen}
      />

      <SortWorkers onClose={handleCloseSort} isSortOpen={isSortOpen} />

      <Navigation />
    </div>
  );
};

export default Header;
