import { Button, Col, Drawer, Row, Space, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { textCaps } from "../hooks/text";
import { selectUser } from "../store/slices/userSlice";

export default function UserDetail({ user, open, close }) {
  const currentUser = useSelector(selectUser);

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
        <Col span={14}>
          <Tag color={user?.is_active ? "green" : "red"}>
            {user?.is_active ? "Active" : "Deactived"}
          </Tag>
        </Col>
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
            <Button size="small" danger={user?.is_active ? true : false}>
              {user?.is_active ? "Deactivate" : "Activate"}
            </Button>
          </Space>
        )}
      </div>
    </Drawer>
  );
}
