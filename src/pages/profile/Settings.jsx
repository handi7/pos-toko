import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import React, { useState } from "react";

export default function Settings() {
  const [openDrawer, setDrawer] = useState(false);

  const onChange = (e) => {};

  return (
    <Row>
      <Col span={12}>
        <span className="fw-bold">Ganti Password</span>
      </Col>

      <Col span={12} className="centered-end">
        <div className="d-flex flex-column text-secondary mx-3">
          <span>Terakhir diganti</span>
          <span className="fst-italic">terakhir diganti</span>
        </div>
        <Button onClick={() => setDrawer(true)}>Update</Button>
      </Col>

      <Drawer
        title="Update Password"
        placement="right"
        onClick={() => setDrawer(false)}
        onClose={() => setDrawer(false)}
        open={openDrawer}
      >
        <Form layout="vertical">
          <Form.Item label="Password Aktif">
            <Input.Password placeholder="password aktif" onChange={onChange} />
          </Form.Item>
          <Form.Item label="Password Baru">
            <Input.Password placeholder="password baru" onChange={onChange} />
          </Form.Item>
          <Form.Item label="Ulangi Password Baru">
            <Input.Password placeholder="password baru" onChange={onChange} />
          </Form.Item>

          <Form.Item>
            <Button>Update</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Row>
  );
}
