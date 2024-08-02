import magnifyingGlass from '../images/magnifying-glass.png';
import './workers-list.scss';

const NotFindWorkers = () => {
  return (
    <div className="nobody-block">
      <img className="nobody-block__img" src={magnifyingGlass} alt="magnifying glass" />
      <h4 className="nobody-block__title">We didn't find anyone</h4>
      <p className="nobody-block__text">Try changing your request</p>
    </div>
  );
};

export default NotFindWorkers;
