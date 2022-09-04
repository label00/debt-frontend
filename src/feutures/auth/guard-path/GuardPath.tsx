import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from 'effector-react';
import { viewerModel } from 'entities';

const $isAuth = viewerModel.$viewer.map((viewer) => viewer.isAuth);

export const GuardPath = () => {
  const isAuth = useStore($isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
