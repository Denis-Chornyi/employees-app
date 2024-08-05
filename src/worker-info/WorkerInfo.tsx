import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import moment from 'moment';
import arrowIcon from '../images/arrow-prev.svg';
import starIcon from '../images/star.svg';
import starEmptyIcon from '../images/star-empty.svg';
import phoneIcon from '../images/phone.svg';
import CallOnNumber from '../call-on-number/CallOnNumber';
import './worker-info.scss';

const WorkerInfo: React.FC = () => {
  const [star, setStar] = useState(starEmptyIcon);
  const [styleStarIcon, setStyleStarIcon] = useState({ width: '24px', margin: '0 14px 0 0' });
  const [callOnNumber, setCallOnNumber] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCallWindow = () => {
    setCallOnNumber(!callOnNumber);
  };

  const handleStarIcon = () => {
    if (star === starEmptyIcon) {
      setStar(starIcon);
      setStyleStarIcon({ width: '16px', margin: '0 18px 0 4px' });
    } else {
      setStar(starEmptyIcon);
      setStyleStarIcon({ width: '24px', margin: '0 14px 0 0' });
    }
  };

  const { workerId } = useParams<{ workerId: string }>();
  const worker = useSelector((state: RootState) =>
    state.workers.workers.find(worker => worker.id === workerId)
  );

  if (!worker) {
    return <div>Worker not found</div>;
  }

  const birthDate = moment(worker.birthDate).format('D MMMM YYYY');
  const age = moment().diff(moment(worker.birthDate), 'years');

  const handleClose = () => {
    const previousPath = location.state?.from || '/?position=everybody';
    navigate(previousPath);
  };

  return (
    <>
      <section className={`worker-info ${callOnNumber ? 'dimmed' : ''}`}>
        <div className={`worker-info__container ${callOnNumber ? 'dimmed' : ''}`}>
          <div className="worker-info__header">
            <button className="worker-info__close-btn" onClick={handleClose}>
              <img src={arrowIcon} alt="arrow icon" />
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
            <img src={star} alt="star empty" onClick={handleStarIcon} style={styleStarIcon} />
            {birthDate}
            <span>{age} років</span>
          </div>
          <div className="worker-info__phone">
            <img src={phoneIcon} alt="phone icon" onClick={handleCallWindow} />
            {worker.phone}
          </div>
        </div>
      </section>
      {callOnNumber && <CallOnNumber phoneNumber={worker.phone} cancel={setCallOnNumber} />}
    </>
  );
};

export default WorkerInfo;
