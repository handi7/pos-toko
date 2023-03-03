import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [pay, setPay] = useState({ pay: 0, change: 0 });

  let total = 0;

  const getCart = () => {
    const temp = [];
    for (let i = 0; i < 5; i++) {
      temp.push({
        name: "Product kjasgkjgd laskjdgk kjafhjhjashl khkgahsg" + (i + 1),
        qty: 2,
        price: 3000,
      });
    }
    setCart(temp);
  };

  const onChange = (val) => {
    setPay({ pay: val, change: val ? val - total : 0 });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <Title level={5} className="centered border-bottom pb-3 fw-bold">
        POS TOKO
      </Title>

      {cart?.map((item, idx) => {
        const subTotal = item?.price * item?.qty;
        total += subTotal;

        return (
          <Row key={idx} gutter={5} className="border-bottom py-2">
            <Col span={13}>
              <span>{item?.name}</span>
            </Col>
            <Col span={5}>
              <span>Rp {item?.price}</span>
            </Col>
            <Col span={1}>
              <span>x{item?.qty}</span>
            </Col>
            <Col span={5} className="text-end w-100">
              <span>Rp {subTotal}</span>
            </Col>
          </Row>
        );
      })}

      <Row gutter={[0, 10]} className="pt-3 border-bottom">
        <Col span={14}>
          <Title level={5}>Total</Title>
        </Col>
        <Col span={10} className="text-end fw-bold">
          <span>Rp {total}</span>
        </Col>

        <Col span={14}>
          <Title level={5}>Bayar</Title>
        </Col>
        <Col span={10} className="text-end">
          <InputNumber placeholder="Rp " onChange={onChange} />
        </Col>

        <Col span={14}>
          <Title level={5}>Kembali</Title>
        </Col>
        <Col span={10} className="text-end">
          <span>Rp {pay?.change}</span>
        </Col>
      </Row>

      <Col span={24} className="centered-end py-3">
        <Button
          type="primary"
          ghost
          className="centered-end fw-bold fs-6"
          icon={<ShoppingCartOutlined className="fs-5" />}
        >
          Bayar
        </Button>
      </Col>
    </div>
  );
}
