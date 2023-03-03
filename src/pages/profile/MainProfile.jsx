import { Col, Divider, Row } from "antd";
import React from "react";

export default function MainProfile() {
  return (
    <Row>
      <Col span={8}>Nama</Col>
      <Col span={16}>Handi</Col>
      <Divider />
      <Col span={8}>Username</Col>
      <Col span={16}>handi7</Col>
      <Divider />
      <Col span={8}>Email</Col>
      <Col span={16}>handi@mail.com</Col>
      <Divider />
      <Col span={8}>Role</Col>
      <Col span={16}>Super Admin</Col>
      <Divider />
    </Row>
  );
}
