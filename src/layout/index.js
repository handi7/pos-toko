import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Layout({ user, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      return navigate("/login");
    }
  }, [user]);

  return <div>{children}</div>;
}
