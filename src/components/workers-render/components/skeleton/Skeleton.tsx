import './skeleton.scss';

const Skeleton = () => {
  return (
    <ul className="skeleton__list">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="skeleton__item">
          <div className="skeleton__img skeleton_animation"></div>
          <div className="skeleton__name skeleton_animation">
            <div className="skeleton__position skeleton_animation"></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Skeleton;
