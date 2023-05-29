import { Navigate, Outlet } from "react-router-dom";
import withAuth from "../components/hoc/WithAuth";

// PrivateRoute component that requires authentication to access certain routes
function PrivateRoute({ isAuth, redirectPath = "/", children }) {
  if (!isAuth) { // If user is not authenticated
    return <Navigate to={redirectPath} replace />; // Redirect to specified path
  }
  return children ? children : <Outlet />; // Render the children components or nested routes, or render the Outlet component for nested routing
}

export default withAuth(PrivateRoute);

