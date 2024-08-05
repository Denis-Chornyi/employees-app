import React from 'react';
import './call-on-number.scss';

interface CallOnNumberProps {
  phoneNumber: string;
  cancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const CallOnNumber: React.FC<CallOnNumberProps> = ({ phoneNumber, cancel }) => {
  return (
    <div className="call-container">
      <button className="call-container__phone-number call-container__btn">{phoneNumber}</button>
      <button className="call-container__cancel call-container__btn" onClick={() => cancel(false)}>
        Cancel
      </button>
    </div>
  );
};

export default CallOnNumber;
