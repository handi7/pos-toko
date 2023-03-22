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
import React, { useEffect, useState } from "react";
import { textCaps } from "../hooks/text";

const api = process.env.REACT_APP_API_URL;

export default function UpdateCategory({ item, open, close, getCategory }) {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (form) => {
    try {
      setLoading(true);
      await axios.patch(
        api + "/category",
        {
          label: textCaps(form?.value),
          value: form?.value.toLowerCase(),
          cat_id: item?.cat_id,
        },
        { headers: { Authorization: token } }
      );

      message.success(`${form?.value} successfully updated.`);
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

  useEffect(() => {
    form.setFieldValue("value", item?.value);
  }, [item]);

  return (
    <Drawer
      title="Add Product"
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
                    "Update"
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
