import { Navigate } from "react-router-dom";
import { useAuth } from "../index";

export const RequireAuth = ({children}: { children: JSX.Element }) => {
  const {isAuth} = useAuth();

  if (isAuth) {
    return children;
  }

  return <Navigate to="/login"/>
}