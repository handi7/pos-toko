import { Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function ErrorPage() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 3000);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Space>
        <Title level={3}>404</Title>
        <Title level={5}>Page not Found.</Title>
      </Space>
    </div>
  );
}
