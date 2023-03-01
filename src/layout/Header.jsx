import {
  faBars,
  faClose,
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Card, Space } from "antd";
import React, { useState } from "react";

export default function Header({ mobile, setDrawer, setCollapsed }) {
  const [show, setShow] = useState(false);

  return (
    <header className="d-flex justify-content-between align-items-center p-3 border">
      <Space size={10}>
        <span
          className="fs-4 p-2 pointer"
          onClick={mobile ? setDrawer : setCollapsed}
        >
          <FontAwesomeIcon icon={faBars} />
        </span>
        <span className="fw-bold fs-4">POS TOKO</span>
      </Space>

      <Space size={5} className="pointer" onClick={() => setShow(!show)}>
        <div className="d-flex flex-column text-end">
          <span className="fw-bold text-primary">Handiani</span>
          <small className="text-secondary">Super Admin</small>
        </div>

        <Avatar
          size="large"
          style={{
            backgroundColor: "#87d068",
          }}
          // icon={<UserOutlined />}
        />

        {show && (
          <div className="position-absolute bg-white end-0 me-3 mt-4">
            <Space
              size={5}
              className="d-flex border border-bottom-0 rounded-top py-2 px-3"
            >
              <Avatar
                size="large"
                style={{
                  backgroundColor: "#87d068",
                }}
                // icon={<UserOutlined />}
              />
              <div className="d-flex flex-column">
                <span className="fw-bold text-primary">Handiani</span>
                <small className="text-secondary">handi@mail.com</small>
              </div>
            </Space>
            <ul className="list-group">
              <li className="list-group-item">
                <Space size={10}>
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </Space>
              </li>
              <li className="list-group-item">
                <Space size={10}>
                  <FontAwesomeIcon icon={faGear} />
                  <span>Settings</span>
                </Space>
              </li>
              <li className="list-group-item text-danger">
                <Space size={10}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>Logout</span>
                </Space>
              </li>
            </ul>
          </div>
        )}
      </Space>
    </header>
  );
}
