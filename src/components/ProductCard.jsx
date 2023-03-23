import { ShoppingCartOutlined } from "@ant-design/icons";
import { Space, Tooltip } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { idr, textCaps } from "../hooks/text";
import { addToCart } from "../store/slices/cartSlice";
import { selectUser } from "../store/slices/userSlice";

export default function ProductCard({ product, select }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
            onClick={() =>
              dispatch(
                addToCart({
                  user_id: user?.id,
                  product_id: product?.id,
                  qty: 1,
                })
              )
            }
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
