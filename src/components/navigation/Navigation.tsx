import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortPosition } from '../../common/state/employeesSlice';
import { RootState } from '../../common/state/store';
import { useSearchParams } from 'react-router-dom';
import tabs from './configs';
import './navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeButton = useSelector((state: RootState) => state.employees.sortPosition);
  const position = searchParams.get('position') || 'everybody';

  useEffect(() => {
    if (position) {
      dispatch(setSortPosition(position as any));
    }
  }, [position, dispatch]);

  const handleButtonClick = (
    buttonType: 'everybody' | 'designer' | 'analyst' | 'manager' | 'android' | 'ios'
  ) => {
    dispatch(setSortPosition(buttonType));

    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set('position', buttonType.toLowerCase());

    setSearchParams(currentParams);
  };

  return (
    <nav className="navigation">
      <div className="container">
        <ul className="navigation__list">
          {tabs.map(({ label, position }, index) => (
            <li
              key={index}
              className={`navigation__item ${
                activeButton === position ? 'navigation__item_active' : ''
              }`}
              onClick={() => handleButtonClick(position)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
