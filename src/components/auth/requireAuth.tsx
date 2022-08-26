import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth:React.FC<ChildrenProps> = ({ children }) => {
  const userInstance = useAuth();
  let location = useLocation();
  if (!userInstance.authed) {
    console.info("未登录");
    // return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
    {children}
    </>
  );
};

export default RequireAuth;
