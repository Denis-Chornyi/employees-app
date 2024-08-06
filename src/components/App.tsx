import React, { useState, useEffect } from 'react';
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

const MainWrapper: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const position = searchParams.get('position') || 'everybody';

  useEffect(() => {
    setSearchParams({ search: searchParams.get('search') || '', position });
  }, [searchParams, position, setSearchParams]);

  return (
    <>
      <Header setSearchTerm={term => setSearchParams({ search: term, position })} />
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
  return <RouterProvider router={router} />;
};

export default App;
