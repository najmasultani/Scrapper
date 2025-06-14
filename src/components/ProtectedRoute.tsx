
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthProvider';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const session = useContext(AuthContext);
  return session ? children : <Navigate to="/login" replace />;
};
