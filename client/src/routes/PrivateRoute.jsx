import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSelectors";

function PrivateRoute({ children }) {
  const isAuthenticated =
    useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;