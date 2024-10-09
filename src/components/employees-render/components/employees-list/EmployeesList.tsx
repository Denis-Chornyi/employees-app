import React from 'react';
import { Employee } from '../../../../common/state/employeesSlice';
import moment from 'moment';
import { getDisplayedEmployees, groupedEmployees } from '../../../../common/utils/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../common/state/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotFoundEmployees from '../employees-list/not-found-employees/NotFoundEmployees';
import './employees-list.scss';

const EmployeesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchTerm = searchParams.get('search') || '';
  const position = searchParams.get('position') || 'everybody';

  const employees = useSelector((state: RootState) => state.employees.employees);

  const sortCriteria = useSelector((state: RootState) => state.employees.sortCriteria);

  const sortedEmployees = getDisplayedEmployees(employees, position, searchTerm, sortCriteria);

  const handleEmployeeSelect = (id: string | undefined) => {
    if (id) {
      const currentPathWithParams = `${window.location.pathname}${window.location.search}`;
      navigate(`/employee/${id}`, { state: { from: currentPathWithParams } });
    }
  };

  if (sortedEmployees.length === 0) {
    return <NotFoundEmployees />;
  }

  return (
    <ul className="employees__list">
      {Object.keys(groupedEmployees(sortedEmployees, sortCriteria)).map(year => (
        <React.Fragment key={year}>
          {sortCriteria !== 'alphabet' && (
            <li className="employees__year-group">
              <span className="employees__year-border employees__year-border_left" />
              <h3 className="employees__year-title">{year}</h3>
              <span className="employees__year-border employees__year-border_right" />
            </li>
          )}
          {(groupedEmployees(sortedEmployees, sortCriteria) as Record<string, Employee[]>)[year].map(
            employee => (
              <li
                className="employees__item"
                key={employee.id}
                onClick={() => handleEmployeeSelect(employee.id)}
              >
                <div className="employees__img">
                  <img className="employees__avatar" src={employee.avatar} alt="avatar" />
                </div>
                <div className="employees__name">
                  {employee.name}
                  <span className="employees__tag">{employee.tag}</span>
                  <div className="employees__position">
                    {employee.position[0].toUpperCase() + employee.position.slice(1)}
                  </div>
                </div>
                <div
                  className="employees__birthday"
                  style={sortCriteria !== 'alphabet' ? { display: 'block' } : {}}
                >
                  {moment(employee.birthDate).format('D MMM')}
                </div>
              </li>
            )
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default EmployeesList;
