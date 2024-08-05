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

const MainWrapper: React.FC = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const position = searchParams.get('position') || 'everybody';

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  useEffect(() => {
    setSearchParams({ search: searchParams.get('search') || '', position });
  }, [searchParams, position, setSearchParams]);

  return (
    <>
      <Header
        toggleSort={toggleSort}
        setSearchTerm={term => setSearchParams({ search: term, position })}
      />
      <Main
        toggleSort={toggleSort}
        isSortOpen={isSortOpen}
        searchTerm={searchParams.get('search') || ''}
        position={position}
      />
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
    element: <div>Page Not Found</div>
  }
];

const router = createBrowserRouter(routes, {
  basename: '/'
});

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
