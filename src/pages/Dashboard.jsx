import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.user);

  return <div className="fw-bold">Dashboard</div>;
}
