import { Outlet } from 'react-router-dom';
import { loadProfileModel } from './model';
import { useStore } from 'effector-react';

export const LayoutSkeleton = () => {
  const [isLoaded] = useStore(loadProfileModel.$state);

  return isLoaded ? <Outlet /> : <div>Loading...</div>;
};
