import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../state/workersSlice';
import { RootState, AppDispatch } from '../state/store';
import Failed from './Failed';
import Skeleton from './Skeleton';
import WorkerList from './WorkersList';
import './workers-list.scss';

interface WorkersListRenderProps {
  searchTerm: string;
  setSelectedWorker: (id: string) => void;
}

const WorkersListRender: React.FC<WorkersListRenderProps> = ({ searchTerm, setSelectedWorker }) => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.workers.status);

  useEffect(() => {
    if (status === 'ok') {
      dispatch(fetchWorkers());
    }
  }, [status, dispatch]);

  let content;

  switch (status) {
    case 'loading':
      content = <Skeleton />;
      break;
    case 'succeeded':
      content = <WorkerList searchTerm={searchTerm} setSelectedWorker={setSelectedWorker} />;
      break;
    case 'failed':
      content = <Failed />;
      break;
    default:
      content = null;
  }

  return (
    <div className="workers">
      <div className="container">{content}</div>
    </div>
  );
};

export default WorkersListRender;
