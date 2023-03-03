import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuItems({ menus, closeDrawer }) {
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <Menu
      mode="inline"
      selectedKeys={[path]}
      items={menus}
      onClick={(item) => {
        closeDrawer();
        navigate(item.key);
      }}
    />
  );
}
