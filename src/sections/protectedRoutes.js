import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
  if (localStorage.getItem('token') === null)
    return <Navigate to="/login" replace />;
  return children;
};
export default Protected;
