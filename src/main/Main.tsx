import React from 'react';
import WorkersListRender from '../workers-list-render/WorkersListRender';
import SortWorkers from '../sort-workers/SortWorkers';
import './main.scss';
import { useNavigate } from 'react-router-dom';

interface MainProps {
  isSortOpen: boolean;
  toggleSort: () => void;
  searchTerm: string;
  setSelectedWorker: (id: string) => void;
}

const Main: React.FC<MainProps> = ({ isSortOpen, toggleSort, searchTerm, setSelectedWorker }) => {
  const navigate = useNavigate();

  const handleWorkerSelect = (id: string) => {
    setSelectedWorker(id);
    navigate(`/worker/${id}`);
  };

  return (
    <div className="main">
      <WorkersListRender searchTerm={searchTerm} setSelectedWorker={handleWorkerSelect} />
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
