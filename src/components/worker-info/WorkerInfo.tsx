import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../../common/gateways/index';
import { RootState, AppDispatch } from '../../common/state/store';
import moment from 'moment';
import { KeyboardArrowLeft, StarBorder, Star, PhoneOutlined } from '@mui/icons-material';
import CallOnNumber from './components/call-on-number/CallOnNumber';
import NotFoundWorkers from '../workers-render/components/workers-list/not-found-workers/NotFoundWorkers';
import SkeletonWorkerInfo from './components/skeleton-worker-info/SkeletonWorkerInfo';
import './worker-info.scss';

const WorkerInfo: React.FC = () => {
  const [isStarred, setIsStarred] = useState(false);
  const [callOnNumber, setCallOnNumber] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const { workerId } = useParams<{ workerId: string }>();
  const worker = useSelector((state: RootState) =>
    state.workers.workers.find(worker => worker.id === workerId)
  );
  const status = useSelector((state: RootState) => state.workers.status);
  useEffect(() => {
    if (status === 'ok') {
      dispatch(fetchWorkers());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <SkeletonWorkerInfo />;
  }

  if (!worker) {
    return <NotFoundWorkers />;
  }
  const { birthDate, avatar, position, name, phone, tag } = worker;

  const birthDateMoment = moment(birthDate).format('D MMMM YYYY');
  const age = moment().diff(moment(birthDate), 'years');

  const handleClose = () => {
    const previousPath = location.state?.from;
    navigate(previousPath);
  };

  return (
    <>
      <section className={`worker-info ${callOnNumber ? 'dimmed' : ''}`}>
        <div className={`worker-info__container ${callOnNumber ? 'dimmed' : ''}`}>
          <div className="worker-info__header">
            <button className="worker-info__close-btn" onClick={handleClose}>
              <KeyboardArrowLeft />
            </button>
            <img src={avatar} className="worker-info__img" alt="avatar" />
            <h3 className="worker-info__name">
              {name}
              <span className="worker-info__tag">{tag}</span>
            </h3>
            <p className="worker-info__position">{position[0].toUpperCase() + position.slice(1)}</p>
          </div>
        </div>
        <div className="worker-info__wrapper">
          <div className="worker-info__age">
            <div className="worker-info__star" onClick={() => setIsStarred(!isStarred)}>
              {isStarred ? <Star /> : <StarBorder />}
            </div>
            {birthDateMoment}
            <span>{age} years</span>
          </div>
          <div className="worker-info__phone">
            <PhoneOutlined
              onClick={() => setCallOnNumber(!callOnNumber)}
              className="worker-info__phone-number"
            />
            {phone}
          </div>
        </div>
      </section>
      {callOnNumber && <CallOnNumber phoneNumber={phone} cancel={setCallOnNumber} />}
    </>
  );
};

export default WorkerInfo;
