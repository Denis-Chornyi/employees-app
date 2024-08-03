import { useDispatch, useSelector } from 'react-redux';
import { setSortPosition } from '../state/workersSlice';
import { RootState } from '../state/store';
import './navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const activeButton = useSelector((state: RootState) => state.workers.sortPosition);

  const handleButtonClick = (
    buttonType: 'Everybody' | 'designer' | 'analyst' | 'manager' | 'android' | 'ios'
  ) => {
    dispatch(setSortPosition(buttonType));
  };

  return (
    <nav className="navigation">
      <div className="container">
        <ul className="navigation__list">
          <li
            className={`navigation__item ${
              activeButton === 'Everybody' ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleButtonClick('Everybody')}
          >
            Everybody
          </li>
          <li
            className={`navigation__item ${
              activeButton === 'designer' ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleButtonClick('designer')}
          >
            Designers
          </li>
          <li
            className={`navigation__item ${
              activeButton === 'analyst' ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleButtonClick('analyst')}
          >
            Analysts
          </li>
          <li
            className={`navigation__item ${
              activeButton === 'manager' ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleButtonClick('manager')}
          >
            Managers
          </li>
          <li
            className={`navigation__item ${
              activeButton === 'ios' ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleButtonClick('ios')}
          >
            iOS
          </li>
          <li
            className={`navigation__item ${
              activeButton === 'android' ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleButtonClick('android')}
          >
            Android
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
