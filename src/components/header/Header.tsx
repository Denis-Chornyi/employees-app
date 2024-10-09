import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from '../search/Search';
import Navigation from '../navigation/Navigation';
import SortEmployees from '../sort-employees/SortEmployees';
import './header.scss';

const Header: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');

  
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (currentSearch !== searchTerm) {
      setSearchTerm(currentSearch);
    }
  }, [searchParams]); 

  
  const handleSearchChange = (term: string) => {
    if (term === searchTerm) return;

    setSearchTerm(term);
    const newParams = new URLSearchParams(searchParams);
    if (term) {
      newParams.set('search', term);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

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
        onSearchChange={handleSearchChange}
        isSortOpen={isSortOpen}
      />

      <SortEmployees onClose={handleCloseSort} isSortOpen={isSortOpen} />

      <Navigation />
    </div>
  );
};

export default Header;
