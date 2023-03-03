import {
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Button, Drawer, Dropdown, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import Clock from "./Clock";

const items = [
  {
    label: "Profile",
    icon: <UserOutlined />,
    key: "/user",
  },
  {
    label: "Settings",
    icon: <SettingOutlined />,
    key: "/user/settings",
  },
  {
    type: "divider",
  },
  {
    label: <span className="text-danger">Logout</span>,
    icon: <LogoutOutlined className="text-danger" />,
    key: "logout",
  },
];

export default function Header({ mobile, setDrawer, setCollapsed }) {
  const navigate = useNavigate();

  const [openCart, setCart] = useState(false);

  const onClick = ({ key }) => {
    if (key === "logout") {
    } else {
      navigate(key);
    }
  };

  return (
    <header className="between p-3 border">
      <Space size={10}>
        <span
          className="fs-4 p-2 pointer"
          onClick={mobile ? setDrawer : setCollapsed}
        >
          <FontAwesomeIcon icon={faBars} />
        </span>
        <span className="fw-bold fs-4">POS TOKO</span>
      </Space>

      {!mobile && <Clock />}

      <Space size={15}>
        <Badge count={5} offset={[-5, 5]}>
          <Button
            type="link"
            size="large"
            className="centered"
            icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
            onClick={() => setCart(true)}
          />
        </Badge>

        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <Space size={5} className="pointer">
            <div className="d-flex flex-column text-end">
              <span className="fw-bold text-primary">Handiani</span>
              <small className="text-secondary">Super Admin</small>
            </div>

            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </Space>

      <Drawer
        title="Cart"
        placement="right"
        width={mobile ? "90%" : 560}
        open={openCart}
        onClose={() => setCart(false)}
      >
        <Cart />
      </Drawer>
    </header>
  );
}
