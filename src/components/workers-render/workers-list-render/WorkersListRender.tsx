import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../../../common/state/workersSlice';
import { RootState, AppDispatch } from '../../../common/state/store';
import Failed from '../components/failed/Failed';
import Skeleton from '../components/skeleton/Skeleton';
import WorkersList from '../components/workers-list/WorkersList';

interface WorkersListRenderProps {
  searchTerm: string;
  filter: string;
  setSelectedWorker: (id: string) => void;
}

const WorkersListRender: React.FC<WorkersListRenderProps> = ({
  searchTerm,
  filter,
  setSelectedWorker
}) => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.workers.status);
  const workers = useSelector((state: RootState) => state.workers.workers);

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
      content = (
        <WorkersList
          searchTerm={searchTerm}
          setSelectedWorker={setSelectedWorker}
          workers={workers}
          filter={filter}
        />
      );
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
