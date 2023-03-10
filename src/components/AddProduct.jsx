import {
  DeleteFilled,
  LoadingOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import axios from "axios";
import React, { useState } from "react";

const api = process.env.REACT_APP_API_URL;

export default function AddProduct({
  type,
  open,
  close,
  categories,
  getProducts,
}) {
  const [form] = Form.useForm();
  const [image, setImage] = useState({ file: null, preview: null });
  const [loading, setLoading] = useState(false);

  const onFinish = async (form) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image?.file);
      for (const key in form) {
        if (key !== "image") formData.append(key, form[key]);
      }

      await axios.post(`${api}/product`, formData);
      getProducts();
      setLoading(false);
      onCancel();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onCancel = () => {
    if (!loading) {
      form.resetFields();
      setImage({ file: null, preview: null });
      close();
    }
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage({ file, preview: URL.createObjectURL(file) });
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
              name="image"
              rules={[{ required: true, message: "Please select image" }]}
            >
              <div className="text-center position-relative">
                <label
                  htmlFor="product1"
                  className="pointer border rounded px-2"
                >
                  {image?.preview ? (
                    <img src={image?.preview} width={200} alt="product" />
                  ) : (
                    <PictureOutlined
                      style={{ fontSize: 200 }}
                      className="text-secondary w-100"
                    />
                  )}
                </label>

                {image?.preview && (
                  <div
                    style={{ top: -5, right: 50 }}
                    className="centered p-2 position-absolute"
                  >
                    <Button
                      danger
                      shape="circle"
                      className="centered"
                      onClick={() => setImage({ file: null, preview: null })}
                    >
                      <DeleteFilled className="fs-5" />
                    </Button>
                  </div>
                )}

                <input
                  id="product1"
                  type="file"
                  className="d-none"
                  onChange={onImageChange}
                />
              </div>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Please enter product name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="cat_id"
              label="Category"
              rules={[{ required: true, message: "Please choose Category" }]}
            >
              <Select placeholder="Please choose Category">
                {categories?.map((category) => {
                  return (
                    <Select.Option
                      key={category?.cat_id}
                      value={category?.cat_id}
                    >
                      {category?.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                addonBefore="Rp"
                placeholder="Please enter price"
              />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: "Please enter stock" }]}
            >
              <InputNumber
                addonAfter="unit"
                style={{ width: "100%" }}
                placeholder="Please enter stock"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="unit"
              label="Unit"
              rules={[{ required: true, message: "Please select unit" }]}
            >
              <Select placeholder="unit">
                <Select.Option value="jack">Jack Ma</Select.Option>
                <Select.Option value="tom">Tom Liu</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "please enter description" }]}
            >
              <Input.TextArea rows={4} placeholder="please enter description" />
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
