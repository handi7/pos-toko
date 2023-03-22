import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Space,
  Spin,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { textCaps } from "../hooks/text";

const api = process.env.REACT_APP_API_URL;

export default function AddCategory({ open, close, getCategory }) {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (form) => {
    try {
      setLoading(true);
      await axios.post(
        api + "/category",
        {
          label: textCaps(form?.value),
          value: form?.value.toLowerCase(),
        },
        { headers: { Authorization: token } }
      );

      message.success(`${form?.value} successfully added to category.`);
      getCategory();
      onCancel();
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      title="Add Product"
      //   width={720}
      style={{ maxWidth: "100%" }}
      onClose={onCancel}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="value"
              label="Category Name"
              rules={[
                { required: true, message: "Please enter category name" },
              ]}
            >
              <Input placeholder="Please enter category name" />
            </Form.Item>
          </Col>

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
