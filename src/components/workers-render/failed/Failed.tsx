import { Link } from 'react-router-dom';
import errorIcon from '../../../images/error-icon.png';
import './failed.scss'

const Failed = () => {
  return (
    <div className="failed">
      <img className="failed__icon" src={errorIcon} alt="ERROR" />
      <h5 className="failed__title">Some unexpected error...</h5>
      <p className="failed__description">Our team is fixing it now</p>
      <Link to='/' className="failed__link">Try again</Link>
    </div>
  );
};

export default Failed;
