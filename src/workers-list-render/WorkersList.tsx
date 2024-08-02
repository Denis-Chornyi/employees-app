import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import './workers-list.scss';
import NotFindWorkers from './NotFindWorkers';

interface WorkerListProps {
  searchTerm: string;
  setSelectedWorker: (id: string) => void;
}

const WorkerList: React.FC<WorkerListProps> = ({ searchTerm, setSelectedWorker }) => {
  const workers = useSelector((state: RootState) => state.workers.workers);
  const sortCriteria = useSelector((state: RootState) => state.workers.sortCriteria);
  const sortPosition = useSelector((state: RootState) => state.workers.sortPosition);

  const filteredWorkers = workers.filter(
    worker =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedWorkers = filteredWorkers.sort((a, b) => {
    if (sortCriteria === 'alphabet') {
      return a.name.localeCompare(b.name);
    } else {
      return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
    }
  });

  const displayedWorkers =
    sortPosition === 'Everybody'
      ? sortedWorkers
      : sortedWorkers.filter(worker => worker.position === sortPosition);

  if (displayedWorkers.length === 0) {
    return <NotFindWorkers />;
  }

  return (
    <ul className="workers__list">
      {displayedWorkers.map(worker => (
        <li className="workers__item" key={worker.id} onClick={() => setSelectedWorker(worker.id)}>
          <div className="workers__img">
            <img className="workers__avatar" src={worker.avatar} alt="avatar" />
          </div>
          <div className="workers__name">
            {worker.name}
            <span className="workers__tag">{worker.tag}</span>
            <div className="workers__position">{worker.position}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WorkerList;
