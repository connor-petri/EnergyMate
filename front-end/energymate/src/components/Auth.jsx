import { Navigate } from "react-router-dom";

export default function Auth({ children }) {
  return children;
  const isAuth = window.localStorage.getItem("token");
  if (isAuth) {
    return children;
  }
  return <Navigate to="/signIn" />;
}
