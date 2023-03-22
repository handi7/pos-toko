import { Button, Col, Drawer, message, Row, Space, Tag } from "antd";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { textCaps } from "../hooks/text";
import { selectUser } from "../store/slices/userSlice";

const api = process.env.REACT_APP_API_URL;

export default function UserDetail({ user, open, close, getUsers }) {
  const currentUser = useSelector(selectUser);
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);

  const onActivate = async () => {
    try {
      const id = user?.id;
      const is_active = user?.is_active === 0;
      await axios.patch(
        api + "/user",
        { id, is_active },
        { headers: { Authorization: token } }
      );
      message.success(
        `${user?.name} berhasil ${is_active ? "diaktifkan" : "dinonaktifkan"}`
      );
      getUsers();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      title={textCaps(user?.name)}
      style={{ maxWidth: "100%" }}
      onClose={close}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Row className="fw-bold">
        <Col span={10}>Name</Col>
        <Col span={14}>{textCaps(user?.name)}</Col>

        <Col span={10}>Username</Col>
        <Col span={14}>{user?.username}</Col>

        <Col span={10}>Email</Col>
        <Col span={14}>{user?.email}</Col>

        <Col span={10}>Role</Col>
        <Col span={14}>{textCaps(user?.role)}</Col>

        <Col span={10}>Status</Col>
        <Col span={14}>
          <Tag color={user?.is_verified ? "green" : "red"}>
            {user?.is_verified ? "Verified" : "Unverified"}
          </Tag>
        </Col>

        <Col span={10} />
        {user?.is_verified ? (
          <Col span={14}>
            <Tag color={user?.is_active ? "green" : "red"}>
              {user?.is_active ? "Active" : "Deactived"}
            </Tag>
          </Col>
        ) : null}
      </Row>

      <div className="text-center mt-3">
        <div>
          <span>Action</span>
        </div>
        {currentUser?.role === ("owner" || "admin") && (
          <Space direction="vertical">
            {!user?.is_verified && (
              <Button type="link">Send verification</Button>
            )}
            <Button
              size="small"
              danger={user?.is_active ? true : false}
              onClick={onActivate}
            >
              {user?.is_active ? "Deactivate" : "Activate"}
            </Button>
          </Space>
        )}
      </div>
    </Drawer>
  );
}
