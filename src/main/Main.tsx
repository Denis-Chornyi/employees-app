import React from 'react';
import WorkersListRender from '../workers-list-render/WorkersListRender';
import SortWorkers from '../sort-workers/SortWorkers';
import { useNavigate, useParams } from 'react-router-dom';

interface MainProps {
  isSortOpen: boolean;
  toggleSort: () => void;
  searchTerm: string;
  setSelectedWorker: (id: string) => void;
}

const Main: React.FC<MainProps> = ({ isSortOpen, toggleSort, searchTerm, setSelectedWorker }) => {
  const navigate = useNavigate();
  const { filter } = useParams<{ filter: string }>();

  console.log('Current filter:', filter);

  const handleWorkerSelect = (id: string) => {
    if (filter) {
      setSelectedWorker(id);
      navigate(`/${filter}/worker/${id}`, { state: { from: `/${filter}` } });
    } else {
      console.error('Filter is undefined');
      navigate(`/everybody/worker/${id}`, { state: { from: '/everybody' } });
    }
  };

  return (
    <div className="main">
      <WorkersListRender
        searchTerm={searchTerm}
        filter={filter || 'everybody'}
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
