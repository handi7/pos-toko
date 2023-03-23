import { Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

const { Title } = Typography;

export default function Category({ categories, selected }) {
  const navigate = useNavigate();
  const key = useQuery().get("key");

  const onSelect = (category) => {
    if (category) {
      navigate(`/?cat=${category?.cat_id}${key ? `&key=${key}` : ""}`);
    } else {
      navigate(`/?${key ? `key=${key}` : ""}`);
    }
  };

  return (
    <div>
      <Title level={5} className="py-2">
        Category
      </Title>

      <Row gutter={[5, 5]}>
        <Col key="all" span={12} onClick={() => onSelect(null)}>
          <div
            className={`centered border rounded pointer ${
              !selected ? "bg-primary text-white" : "text-primary"
            } p-2`}
          >
            <span>All</span>
          </div>
        </Col>
        {categories?.map((category) => {
          const isSelected = +selected === category?.cat_id;
          return (
            <Col
              key={category?.cat_id}
              span={12}
              onClick={() => onSelect(category)}
            >
              <div
                className={`centered border rounded pointer ${
                  isSelected ? "bg-primary text-white" : "text-primary"
                } p-2`}
              >
                <span>{category?.label}</span>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
