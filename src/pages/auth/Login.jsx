import { Button, Card, Checkbox, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, selectUser } from "../../store/slices/userSlice";

export default function Login() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onFinish = async (form) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        form
      );

      localStorage.setItem(process.env.REACT_APP_TOKEN, res.data.token);
      dispatch(login(res.data.data));
    } catch ({ response }) {
      message.error(response?.data?.error);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      className="bg-light"
      style={{ height: "100vh" }}
    >
      {user && <Navigate to="/" replace={true} />}
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
