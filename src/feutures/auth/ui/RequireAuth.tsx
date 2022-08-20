import { Navigate, Outlet } from 'react-router-dom';
import { $isAuth } from '../model';
import { useStore } from 'effector-react';

export const RequireAuth = () => {
  const isAuth = useStore($isAuth);
  return isAuth ? <Outlet/> : <Navigate to="/login"/>
}
