import React, { useState } from 'react';
import WorkersListRender from '../workers-list-render/WorkersListRender';
import SortWorkers from '../sort-workers/SortWorkers';
import { useNavigate } from 'react-router-dom';

interface MainProps {
  isSortOpen: boolean;
  toggleSort: () => void;
  searchTerm: string;
  position: string;
}

const Main: React.FC<MainProps> = ({ isSortOpen, toggleSort, searchTerm, position }) => {
  const [_, setSelectedWorker] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleWorkerSelect = (id: string) => {
    setSelectedWorker(id);
    navigate(`/worker/${id}`);
  };

  return (
    <div className="main">
      <WorkersListRender
        searchTerm={searchTerm}
        filter={position}
        setSelectedWorker={handleWorkerSelect}
      />
      {isSortOpen && (
        <>
          <div className="overlay" onClick={toggleSort}></div>
          <SortWorkers onClose={toggleSort} isSortOpen={isSortOpen} />
        </>
      )}
    </div>
  );
};

export default Main;
