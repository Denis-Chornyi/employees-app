import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import Header from './components/header/Header';
import WorkerInfo from './components/worker-info/WorkerInfo';
import Failed from './components/workers-render/components/failed/Failed';
import './index.scss';
import WorkersListRender from './components/workers-render/WorkersListRender';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <WorkersListRender />
      </>
    )
  },
  {
    path: 'worker/:workerId',
    element: <WorkerInfo />
  },
  {
    path: '*',

    element: (
      <>
        <Header />
        <Failed />
      </>
    )
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
