import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const user = auth.currentUser;
  console.log(user);
  return user ? <Navigate to="/messenger" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
