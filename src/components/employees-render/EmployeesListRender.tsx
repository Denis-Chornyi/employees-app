import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from '../../common/gateways/index';
import { RootState, AppDispatch } from '../../common/state/store';
import Failed from './components/failed/Failed';
import Skeleton from './components/skeleton/Skeleton';
import EmployeesList from './components/employees-list/EmployeesList';

const EmployeesListRender: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.employees.status);

  useEffect(() => {
    if (status === 'ok') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  let content;

  switch (status) {
    case 'loading':
      content = <Skeleton />;
      break;
    case 'success':
      content = <EmployeesList />;
      break;
    case 'failed':
      content = <Failed />;
      break;
    default:
      content = null;
  }

  return (
    <div className="employees">
      <div className="container">{content}</div>
    </div>
  );
};

export default EmployeesListRender;
