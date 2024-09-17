import React from 'react';
import { Worker } from '../../../../common/state/workersSlice';
import moment from 'moment';
import NotFoundWorkers from './not-found-workers/NotFoundWorkers';
import { getDisplayedEmployees, groupedWorkers } from '../../../../common/utils/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../common/state/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './workers-list.scss';

const WorkerList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchTerm = searchParams.get('search') || '';
  const position = searchParams.get('position') || 'everybody';

  const workers = useSelector((state: RootState) => state.workers.workers);

  const sortCriteria = useSelector((state: RootState) => state.workers.sortCriteria);

  const sortedWorkers = getDisplayedEmployees(workers, position, searchTerm, sortCriteria);

  const handleWorkerSelect = (id: string | undefined) => {
    if (id) {
      const currentPathWithParams = `${window.location.pathname}${window.location.search}`;
      navigate(`/worker/${id}`, { state: { from: currentPathWithParams } });
    }
  };

  if (sortedWorkers.length === 0) {
    return <NotFoundWorkers />;
  }

  return (
    <ul className="workers__list">
      {Object.keys(groupedWorkers(sortedWorkers, sortCriteria)).map(year => (
        <React.Fragment key={year}>
          {sortCriteria !== 'alphabet' && (
            <li className="workers__year-group">
              <span className="workers__year-border workers__year-border_left" />
              <h3 className="workers__year-title">{year}</h3>
              <span className="workers__year-border workers__year-border_right" />
            </li>
          )}
          {(groupedWorkers(sortedWorkers, sortCriteria) as Record<string, Worker[]>)[year].map(
            worker => (
              <li
                className="workers__item"
                key={worker.id}
                onClick={() => handleWorkerSelect(worker.id)}
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
                <div
                  className="workers__birthday"
                  style={sortCriteria !== 'alphabet' ? { display: 'block' } : {}}
                >
                  {moment(worker.birthDate).format('D MMM')}
                </div>
              </li>
            )
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default WorkerList;
