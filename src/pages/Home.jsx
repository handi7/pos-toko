import { LoadingOutlined } from "@ant-design/icons";
import {
  Col,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";

const { Title } = Typography;

const api = "https://63fcbcf18ef914c5559e48bf.mockapi.io/api/v1";

const items = [
  {
    key: "grid",
    label: `Card`,
  },
  {
    key: "list",
    label: `List`,
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

export default function Home() {
  const user = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [grid, setGrid] = useState(true);
  const [loading, setLoading] = useState(false);

  const getProducts = async (page, limit) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${api}/products/?page=${page}&limit=${limit}`
      );
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = () => {
    const temp = [];
    temp.push({ id: 1, label: "All", value: "" });
    for (let i = 1; i < 5; i++) {
      temp.push({
        id: i + 1,
        label: "Category" + (i + 1),
        value: "category" + (i + 1),
      });
    }
    setCategories(temp);
  };

  const selectProduct = (item) => {
    setSelected(item);
    setOpenModal(true);
  };

  const paginate = (page, size) => {
    getProducts(page, size);
  };

  useEffect(() => {
    getProducts(1, 10);
    getCategories();
  }, []);

  useEffect(() => {
    setShowCategory(window.innerWidth > 1500);
    window.addEventListener("resize", () =>
      setShowCategory(window.innerWidth > 1500)
    );
    return (_) =>
      window.removeEventListener("resize", () =>
        setShowCategory(window.innerWidth > 1500)
      );
  }, []);

  return (
    <div className="fw-bold">
      <Row gutter={25}>
        <Col xs={showCategory ? 18 : 24}>
          <Title level={4}>Products</Title>
          <div className="between mb-2">
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={(key) => setGrid(key === "grid")}
            />
            <Space size={5}>
              {!showCategory && (
                <Select
                  value={category}
                  style={{ width: 120 }}
                  options={categories}
                  onChange={(val) => setCategory(val)}
                />
              )}
              <Input.Search style={{ width: 200 }} placeholder="Search" />
            </Space>
          </div>

          {grid ? (
            <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
              <Row gutter={[20, 20]}>
                {products?.map((product) => {
                  return (
                    <Col
                      key={product?.id}
                      xs={{ span: 24 }}
                      sm={{ span: 12 }}
                      lg={{ span: 6 }}
                    >
                      <ProductCard
                        product={product}
                        select={() => selectProduct(product)}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Spin>
          ) : (
            <Table
              loading={{
                spinning: loading,
                indicator: <LoadingOutlined spin />,
              }}
              rowKey={(r) => r.id}
              dataSource={products}
              columns={columns}
              pagination={false}
            />
          )}
          <Pagination
            className="centered-end pt-3"
            defaultCurrent={1}
            pageSizeOptions={[10, 15]}
            total={60}
            onChange={paginate}
          />
        </Col>

        {showCategory && (
          <Col xs={6}>
            <Category
              categories={categories}
              selected={category}
              select={setCategory}
            />
          </Col>
        )}
      </Row>

      <Modal
        title={selected?.name}
        width={640}
        style={{ top: 20 }}
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <img src={selected?.image} width="100%" alt="product" />

        <div className="mt-2">
          <span className="text-success fw-bold fs-5">$ {selected?.price}</span>
        </div>

        <p>{selected?.description}</p>
      </Modal>
    </div>
  );
}
