import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../../common/state/workersSlice';
import { RootState, AppDispatch } from '../../common/state/store';
import Failed from './components/failed/Failed';
import Skeleton from './components/skeleton/Skeleton';
import WorkersList from './components/workers-list/WorkersList';

const WorkersListRender: React.FC = () => {
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
    case 'success':
      content = <WorkersList />;
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
