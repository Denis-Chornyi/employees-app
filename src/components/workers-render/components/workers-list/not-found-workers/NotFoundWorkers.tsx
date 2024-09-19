import './not-found-workers.scss';

const NotFoundWorkers = () => (
  <div className="nobody-block">
    <img className="nobody-block__img" src="/images/magnifying-glass.png" alt="magnifying glass" />
    <h4 className="nobody-block__title">We didn't find anyone</h4>
    <p className="nobody-block__text">Try changing your request</p>
  </div>
);

export default NotFoundWorkers;
