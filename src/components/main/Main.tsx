import React, { useState } from 'react';
import WorkersListRender from '../workers-render/workers-list-render/WorkersListRender';
import SortWorkers from '../sort-workers/SortWorkers';
import { useNavigate } from 'react-router-dom';

interface MainProps {
  searchTerm: string;
  position: string;
}

const Main: React.FC<MainProps> = ({ searchTerm, position }) => {
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
    </div>
  );
};

export default Main;
