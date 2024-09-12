import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../../../common/state/workersSlice';
import { RootState, AppDispatch } from '../../../common/state/store';
import Failed from '../components/failed/Failed';
import Skeleton from '../components/skeleton/Skeleton';
import WorkersList from '../components/workers-list/WorkersList';
import { useNavigate, useSearchParams } from 'react-router-dom';

const WorkersListRender: React.FC = () => {
  const [_, setSelectedWorker] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const position = searchParams.get('position') || 'everybody';

  const handleWorkerSelect = (id: string) => {
    setSelectedWorker(id);
    const currentPathWithParams = `${window.location.pathname}${window.location.search}`;
    navigate(`/worker/${id}`, { state: { from: currentPathWithParams } });
  };

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
          setSelectedWorker={handleWorkerSelect}
          workers={workers}
          filter={position}
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
