import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortPosition } from '../state/workersSlice';
import { RootState } from '../state/store';
import { useNavigate, useParams } from 'react-router-dom';
import './navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filter } = useParams<{ filter: string }>();
  const activeButton = useSelector((state: RootState) => state.workers.sortPosition);

  useEffect(() => {
    if (filter) {
      dispatch(setSortPosition(filter as any));
    }
  }, [filter, dispatch]);

  const handleButtonClick = (
    buttonType: 'everybody' | 'designer' | 'analyst' | 'manager' | 'android' | 'ios'
  ) => {
    dispatch(setSortPosition(buttonType));
    navigate(`/${buttonType.toLowerCase()}`);
  };

  return (
    <nav className="navigation">
      <div className="container">
        <ul className="navigation__list">
          <li
            className={`navigation__item ${
              activeButton === 'everybody' ? 'navigation__item_active' : ''
            }`}
            onClick={() => handleButtonClick('everybody')}
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
