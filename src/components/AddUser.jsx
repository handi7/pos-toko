import { LoadingOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";

const api = process.env.REACT_APP_API_URL;

export default function AddUser({ open, close, getUsers }) {
  const user = useSelector(selectUser);

  const [form] = Form.useForm();
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);

  const [loading, setLoading] = useState(false);

  const onFinish = async (form) => {
    try {
      setLoading(true);
      await axios.post(api + "/user", form, {
        headers: { Authorization: token },
      });
      getUsers();
      close();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error?.response?.data?.message);
    }
  };

  const onCancel = () => {
    if (!loading) {
      form.resetFields();
      close();
    }
  };

  return (
    <Drawer
      title="Add New User"
      style={{ maxWidth: "100%" }}
      onClose={onCancel}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Please enter user name"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter user email" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Please enter user email"
              />
            </Form.Item>
          </Col>

          {user?.role === "owner" && (
            <Col span={24}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select user role" }]}
              >
                <Select
                  placeholder="Select Role"
                  options={[
                    {
                      value: "kasir",
                      label: "Kasir",
                    },
                    {
                      value: "admin",
                      label: "Admin",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          )}

          <Col span={24}>
            <Form.Item>
              <Space className="centered-end">
                <Button disabled={loading} onClick={onCancel}>
                  Cancel
                </Button>
                <Button disabled={loading} htmlType="submit" type="primary">
                  {loading ? (
                    <Spin indicator={<LoadingOutlined spin />} />
                  ) : (
                    "Add"
                  )}
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
