import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../index';

export const RequireAuth = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet/> : <Navigate to="/login"/>
}
