import React, { useEffect, useCallback } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  useSearchParams
} from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import WorkerInfo from './worker-info/WorkerInfo';
import Failed from './workers-render/failed/Failed';
import '../index.scss';

const MainWrapper: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const position = searchParams.get('position') || 'everybody';
  const sort = searchParams.get('sort') || '';

  const updateSearchParams = useCallback(
    (term: string) => {
      const newParams = new URLSearchParams();
      newParams.set('position', position);

      if (term) {
        newParams.set('search', term);
      }

      if (sort) {
        newParams.set('sort', sort);
      }

      setSearchParams(newParams);
    },
    [position, sort, setSearchParams]
  );

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (!searchParams.get('search')) {
      newParams.delete('search');
    }

    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <>
      <Header setSearchTerm={updateSearchParams} />
      <Main searchTerm={searchParams.get('search') || ''} position={position} />
    </>
  );
};

const WorkerInfoWrapper: React.FC = () => {
  return <WorkerInfo />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainWrapper />
  },
  {
    path: 'worker/:workerId',
    element: <WorkerInfoWrapper />
  },
  {
    path: '*',
    element: <Failed />
  }
];

const router = createBrowserRouter(routes, {
  basename: '/'
});

const App: React.FC = () => {
  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
