import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from '../../common/gateways/index';
import { RootState, AppDispatch } from '../../common/state/store';
import moment from 'moment';
import { KeyboardArrowLeft, StarBorder, Star, PhoneOutlined } from '@mui/icons-material';
import CallOnNumber from './components/call-on-number/CallOnNumber';
import NotFoundEmployees from '../employees-render/components/employees-list/not-found-employees/NotFoundEmployees';
import SkeletonEmployeeInfo from './components/skeleton-employee-info/SkeletonEmployeeInfo';
import './employee-info.scss';

const EmployeeInfo: React.FC = () => {
  const [isStarred, setIsStarred] = useState(false);
  const [callOnNumber, setCallOnNumber] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const { employeeId } = useParams<{ employeeId: string }>();
  const employee = useSelector((state: RootState) =>
    state.employees.employees.find(employee => employee.id === employeeId)
  );
  const status = useSelector((state: RootState) => state.employees.status);
  useEffect(() => {
    if (status === 'ok') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <SkeletonEmployeeInfo />;
  }

  if (!employee) {
    return <NotFoundEmployees />;
  }
  const { birthDate, avatar, position, name, phone, tag } = employee;

  const birthDateMoment = moment(birthDate).format('D MMMM YYYY');
  const age = moment().diff(moment(birthDate), 'years');

  const handleClose = () => {
    const previousPath = location.state?.from;
    navigate(previousPath);
  };

  return (
    <>
      <section className={`employee-info ${callOnNumber ? 'dimmed' : ''}`}>
        <div className={`employee-info__container ${callOnNumber ? 'dimmed' : ''}`}>
          <div className="employee-info__header">
            <button className="employee-info__close-btn" onClick={handleClose}>
              <KeyboardArrowLeft />
            </button>
            <img src={avatar} className="employee-info__img" alt="avatar" />
            <h3 className="employee-info__name">
              {name}
              <span className="employee-info__tag">{tag}</span>
            </h3>
            <p className="employee-info__position">
              {position[0].toUpperCase() + position.slice(1)}
            </p>
          </div>
        </div>
        <div className="employee-info__wrapper">
          <div className="employee-info__age">
            <div className="employee-info__star" onClick={() => setIsStarred(!isStarred)}>
              {isStarred ? <Star /> : <StarBorder />}
            </div>
            {birthDateMoment}
            <span>{age} years</span>
          </div>
          <div className="employee-info__phone">
            <PhoneOutlined
              onClick={() => setCallOnNumber(!callOnNumber)}
              className="employee-info__phone-number"
            />
            {phone}
          </div>
        </div>
      </section>
      {callOnNumber && <CallOnNumber phoneNumber={phone} cancel={setCallOnNumber} />}
    </>
  );
};

export default EmployeeInfo;
