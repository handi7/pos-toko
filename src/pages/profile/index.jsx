import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Tabs, Typography } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const { Title } = Typography;

const tabs = [
  {
    key: "/user",
    label: (
      <span className="centered px-2">
        <UserOutlined /> Info
      </span>
    ),
  },
  {
    key: "/user/settings",
    label: (
      <span className="centered px-2">
        <SettingOutlined /> Pengaturan
      </span>
    ),
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const activeTab = window.location.pathname;

  return (
    <div>
      <Title level={5}>Profil</Title>
      <Tabs
        activeKey={activeTab}
        items={tabs}
        onTabClick={(key) => navigate(key)}
      />
      <Outlet />
    </div>
  );
}
