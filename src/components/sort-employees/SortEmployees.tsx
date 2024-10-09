import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../common/state/store';
import { setSortCriteria } from '../../common/state/employeesSlice';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'react-router-dom';
import './sort-employees.scss';

interface SortEmployeesProps {
  onClose: () => void;
  isSortOpen: boolean;
}

const SortEmployees: React.FC<SortEmployeesProps> = ({ onClose, isSortOpen }) => {
  const dispatch = useDispatch();
  const activeButton = useSelector((state: RootState) => state.employees.sortCriteria);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleButtonClick = (buttonType: 'alphabet' | 'birthday') => {
    dispatch(setSortCriteria(buttonType));

    const newParams = new URLSearchParams(searchParams);

    if (buttonType === 'alphabet') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', 'byBirthday');
    }

    setSearchParams(newParams);
  };

  return (
    <div className="sort-wrapper">
      {isSortOpen && <div className="overlay" onClick={onClose} />}
      <div className={`sort-block ${isSortOpen ? 'sort-block_active' : ''}`}>
        <div className="sort-block__header">
          <button className="sort-block__close-btn" onClick={onClose}>
            <span className="sort-block__close-icon">
              <CloseIcon />
            </span>
          </button>
          <h4 className="sort-block__title">Sorting</h4>
        </div>
        <div className="sort-block__content">
          <div className="sort-block__wrapper" onClick={() => handleButtonClick('alphabet')}>
            <button
              className={`sort-block__button ${
                activeButton === 'alphabet' ? 'sort-block__button_active' : ''
              }`}
            />
            <p className="sort-block__description">Alphabetically</p>
          </div>
          <div className="sort-block__wrapper" onClick={() => handleButtonClick('birthday')}>
            <button
              className={`sort-block__button ${
                activeButton === 'birthday' ? 'sort-block__button_active' : ''
              }`}
            />
            <p className="sort-block__description">By birthday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortEmployees;
