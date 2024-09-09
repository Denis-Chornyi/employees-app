import '../../workers-render/skeleton/skeleton.scss';
import './skeleton-worker-info.scss';

const SkeletonWorkerInfo = () => {
  return (
    <div className="skeleton-worker-info">
      <div className="skeleton-worker-info__img skeleton_animation"></div>
      <div className="skeleton-worker-info__name skeleton_animation"></div>
      <div className="skeleton-worker-info__position skeleton_animation"></div>
      <div className="skeleton-worker-info__age  skeleton_animation"></div>
      <div className="skeleton-worker-info__phone   skeleton_animation"></div>
    </div>
  );
};

export default SkeletonWorkerInfo;
