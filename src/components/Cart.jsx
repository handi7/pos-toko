import {
  DeleteOutlined,
  ExclamationCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Col, InputNumber, Modal, Row, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { idr } from "../hooks/text";
import { deleteCart, updateCart } from "../store/slices/cartSlice";
import { selectUser } from "../store/slices/userSlice";

const { Title } = Typography;
const { confirm } = Modal;

export default function Cart({ cart }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [pay, setPay] = useState({ pay: 0, change: 0 });

  let total = 0;

  const onChange = (val) => {
    setPay({ pay: val, change: val ? val - total : 0 });
  };

  const onQtyChange = (qty, id) => {
    if (qty) {
      dispatch(updateCart(user?.id, { id, qty }));
    }
  };

  const deleteConfirm = (id) => {
    confirm({
      title: `Delete item?`,
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteCart(user?.id, id));
      },
      onCancel() {},
    });
  };

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
            <Col span={11}>
              <span>{item?.name}</span>
            </Col>
            <Col span={4}>
              <span>{idr(item?.price)}</span>
            </Col>
            <Col span={3}>
              <InputNumber
                addonBefore="x"
                min={1}
                max={item?.stock}
                value={item?.qty}
                onChange={(qty) => onQtyChange(qty, item?.id)}
              />
            </Col>
            <Col span={4} className="text-end w-100">
              <span>{idr(subTotal)}</span>
            </Col>
            <Col span={2} className="text-end w-100">
              <Button
                type="link"
                danger
                onClick={() => deleteConfirm(item?.id)}
              >
                <DeleteOutlined />
              </Button>
            </Col>
          </Row>
        );
      })}

      <Row gutter={[0, 10]} className="pt-3 border-bottom">
        <Col span={14}>
          <Title level={5}>Total</Title>
        </Col>
        <Col span={10} className="text-end fw-bold">
          <span>{idr(total)}</span>
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
          <span>{idr(pay?.change)}</span>
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
