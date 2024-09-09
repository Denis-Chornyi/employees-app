import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../../common/state/workersSlice';
import { RootState, AppDispatch } from '../../common/state/store';
import moment from 'moment';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CallOnNumber from './call-on-number/CallOnNumber';
import NotFoundWorkers from '../workers-render/workers-list/not-found-workers/NotFoundWorkers';
import SkeletonWorkerInfo from './skeleton-worker-info/SkeletonWorkerInfo';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import './worker-info.scss';

const WorkerInfo: React.FC = () => {
  const [isStarred, setIsStarred] = useState(false);
  const [callOnNumber, setCallOnNumber] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleCallWindow = () => {
    setCallOnNumber(!callOnNumber);
  };

  const handleStarIcon = () => {
    setIsStarred(!isStarred);
  };

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

  const birthDate = moment(worker.birthDate).format('D MMMM YYYY');
  const age = moment().diff(moment(worker.birthDate), 'years');

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
              <KeyboardArrowLeftIcon />
            </button>
            <img src={worker.avatar} className="worker-info__img" alt="avatar" />
            <h3 className="worker-info__name">
              {worker.name}
              <span className="worker-info__tag">{worker.tag}</span>
            </h3>
            <p className="worker-info__position">
              {worker.position[0].toUpperCase() + worker.position.slice(1)}
            </p>
          </div>
        </div>
        <div className="worker-info__wrapper">
          <div className="worker-info__age">
            <div className="worker-info__star" onClick={handleStarIcon}>
              {isStarred ? <StarIcon /> : <StarBorderIcon />}
            </div>
            {birthDate}
            <span>{age} years</span>
          </div>
          <div className="worker-info__phone">
            <PhoneOutlinedIcon onClick={handleCallWindow} className="worker-info__phone-number" />
            {worker.phone}
          </div>
        </div>
      </section>
      {callOnNumber && <CallOnNumber phoneNumber={worker.phone} cancel={setCallOnNumber} />}
    </>
  );
};

export default WorkerInfo;
