import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import WorkerInfo from './worker-info/WorkerInfo';

const MainWrapper: React.FC = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  return (
    <>
      <Header toggleSort={toggleSort} setSearchTerm={setSearchTerm} />
      <Main toggleSort={toggleSort} isSortOpen={isSortOpen} searchTerm={searchTerm} />
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
    path: '/:filter',
    element: <MainWrapper />
  },
  {
    path: '/:filter/worker/:workerId',
    element: <WorkerInfoWrapper />
  }
];

const router = createBrowserRouter(routes, {
  basename: '/'
});

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
