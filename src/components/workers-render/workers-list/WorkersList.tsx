import React from 'react';
import { Worker } from '../../../common/state/workersSlice';
import NotFoundWorkers from './not-found-workers/NotFoundWorkers';
import { RootState } from '../../../common/state/store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import './workers-list.scss';

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
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAndSortedWorkers = filteredWorkers.filter(worker => {
    if (filter === 'everybody' || filter === undefined) return true;
    return worker.position.toLowerCase() === filter.toLowerCase();
  });

  let styleBirthday = {};

  const sortedWorkers = filteredAndSortedWorkers.sort((a, b) => {
    if (sortCriteria === 'alphabet') {
      return a.name.localeCompare(b.name);
    } else {
      styleBirthday = { display: 'block' };
      return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
    }
  });

  if (sortedWorkers.length === 0) {
    return <NotFoundWorkers />;
  }

  const groupedWorkers =
    sortCriteria !== 'alphabet'
      ? sortedWorkers.reduce((acc, worker) => {
          const year = moment(worker.birthDate).format('YYYY');
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(worker);
          return acc;
        }, {} as Record<string, Worker[]>)
      : { '': sortedWorkers };

  return (
    <ul className="workers__list">
      {Object.keys(groupedWorkers).map(year => (
        <React.Fragment key={year}>
          {sortCriteria !== 'alphabet' && (
            <li className="workers__year-group">
              <span className="workers__year-border workers__year-border_left"></span>
              <h3 className="workers__year-title">{year}</h3>
              <span className="workers__year-border workers__year-border_right"></span>
            </li>
          )}
          {groupedWorkers[year].map(worker => (
            <li
              className="workers__item"
              key={worker.id}
              onClick={() => setSelectedWorker(worker.id)}
            >
              <div className="workers__img">
                <img className="workers__avatar" src={worker.avatar} alt="avatar" />
              </div>
              <div className="workers__name">
                {worker.name}
                <span className="workers__tag">{worker.tag}</span>
                <div className="workers__position">
                  {worker.position[0].toUpperCase() + worker.position.slice(1)}
                </div>
              </div>
              <div className="workers__birthday" style={styleBirthday}>
                {moment(worker.birthDate).format('D MMM')}
              </div>
            </li>
          ))}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default WorkerList;
