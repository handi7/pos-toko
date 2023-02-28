import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";

export default function Login() {
  const onFinish = () => {};
  return (
    <Row
      justify="center"
      align="middle"
      className="bg-light"
      style={{ height: "100vh" }}
    >
      <Col
        xs={{ span: 18 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        xl={{ span: 6 }}
      >
        <Card className="shadow">
          <h5 className="">Login</h5>

          <Form
            layout="vertical"
            name="basic"
            labelCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
