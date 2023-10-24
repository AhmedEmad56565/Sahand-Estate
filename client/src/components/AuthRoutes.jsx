import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to='/' /> : <Outlet />;
};

export default AuthRoutes;
