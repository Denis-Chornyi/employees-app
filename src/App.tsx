import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Header from './components/header/Header';
import EmployeeInfo from './components/employee-info/EmployeeInfo';
import Failed from './components/employees-render/components/failed/Failed';
import EmployeesListRender from './components/employees-render/EmployeesListRender';
import './index.scss';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <EmployeesListRender />
      </>
    )
  },
  {
    path: 'employee/:employeeId',
    element: <EmployeeInfo />
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
