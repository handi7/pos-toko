import { ShoppingCartOutlined } from "@ant-design/icons";
import { Space, Tooltip } from "antd";
import React from "react";

export default function ProductCard({ product, select }) {
  return (
    <div className="border rounded shadow">
      <div className="position-relative">
        <Tooltip title="Add to cart">
          <ShoppingCartOutlined
            style={{
              bottom: 0,
              fontSize: 20,
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
            className="position-absolute centered pointer text-white w-100 p-2"
          />
        </Tooltip>
        <img
          className="pointer"
          src={product?.image}
          width="100%"
          alt="product"
          onClick={select}
        />
      </div>

      <Space size={0} direction="vertical p-2">
        <span className="text-success fs-6">$ {product?.price}</span>
        <span className="fs-6 pointer" onClick={select}>
          {product?.name}
        </span>
      </Space>
    </div>
  );
}
