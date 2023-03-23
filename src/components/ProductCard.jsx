import { ShoppingCartOutlined } from "@ant-design/icons";
import { Space, Tooltip } from "antd";
import React from "react";
import { idr, textCaps } from "../hooks/text";

export default function ProductCard({ product, select }) {
  return (
    <div className="border rounded shadow">
      <div className="position-relative">
        <Tooltip title="Add to cart">
          <ShoppingCartOutlined
            style={{
              bottom: 0,
              fontSize: 20,
              backgroundColor: "rgba(16,142,233,0.4)",
            }}
            className="position-absolute centered pointer text-white w-100 p-2"
          />
        </Tooltip>
        <img
          className="pointer"
          src={product?.img_url}
          style={{ width: "100%", aspectRatio: "1/1" }}
          alt="product"
          onClick={select}
        />
      </div>

      <Space size={0} direction="vertical p-2">
        <span className="text-success fs-6">{idr(product?.price)}</span>
        <span className="fs-6 pointer" onClick={select}>
          {textCaps(product?.name)}
        </span>
      </Space>
    </div>
  );
}
