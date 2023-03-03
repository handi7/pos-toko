import { Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";

const { Title } = Typography;

export default function Category({ categories, selected, select }) {
  return (
    <div>
      <Title level={5} className="py-2">
        Category
      </Title>

      <Row gutter={[5, 5]}>
        {categories?.map((category) => {
          const isSelected = selected === category?.value;
          return (
            <Col
              key={category?.id}
              span={12}
              onClick={() => select(category?.value)}
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
