import '../../../employees-render/components/skeleton/skeleton.scss';
import './skeleton-employee-info.scss';

const SkeletonEmployeeInfo = () => {
  return (
    <div className="skeleton-employee-info">
      <div className="skeleton-employee-info__img skeleton_animation"></div>
      <div className="skeleton-employee-info__name skeleton_animation"></div>
      <div className="skeleton-employee-info__position skeleton_animation"></div>
      <div className="skeleton-employee-info__age  skeleton_animation"></div>
      <div className="skeleton-employee-info__phone   skeleton_animation"></div>
    </div>
  );
};

export default SkeletonEmployeeInfo;
