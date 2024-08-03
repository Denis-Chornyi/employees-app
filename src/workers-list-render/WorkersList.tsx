import React from 'react';
import { Worker } from '../state/workersSlice';
import NotFindWorkers from './NotFindWorkers';
import './workers-list.scss';
import { RootState } from '../state/store';
import { useSelector } from 'react-redux';

interface WorkerListProps {
  searchTerm: string;
  workers: Worker[];
  setSelectedWorker: (id: string) => void;
  filter: string;
}

const WorkerList: React.FC<WorkerListProps> = ({
  searchTerm,
  workers,
  setSelectedWorker,
  filter
}) => {
  const sortCriteria = useSelector((state: RootState) => state.workers.sortCriteria);

  const filteredWorkers = workers.filter(
    worker =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAndSortedWorkers = filteredWorkers.filter(worker => {
    if (filter === 'everybody' || filter === undefined) return true;
    return worker.position.toLowerCase() === filter.toLowerCase();
  });
  const sortedWorkers = filteredAndSortedWorkers.sort((a, b) => {
    if (sortCriteria === 'alphabet') {
      return a.name.localeCompare(b.name);
    } else {
      return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
    }
  });

  if (sortedWorkers.length === 0) {
    return <NotFindWorkers />;
  }

  return (
    <ul className="workers__list">
      {sortedWorkers.map(worker => (
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
