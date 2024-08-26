import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth,setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        setIsAuth(true);
    }
    setIsLoading(false);
  }, [navigate]);


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuth) {
    navigate("/login");
    return;
  }

  return children;
};

export default PrivateRoute;
