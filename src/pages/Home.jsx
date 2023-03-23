import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Image,
  Input,
  InputNumber,
  message,
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
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import { idr, textCaps } from "../hooks/text";
import { useQuery } from "../hooks/useQuery";
import { selectUser } from "../store/slices/userSlice";

const { Title, Text } = Typography;

const api = process.env.REACT_APP_API_URL;

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

export default function Home() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const query = window.location.search;
  const offset = useQuery().get("offset") || 0;
  const limit = useQuery().get("limit") || 10;
  const key = useQuery().get("key");
  const cat = useQuery().get("cat");

  const [products, setProducts] = useState({});
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [grid, setGrid] = useState(true);
  const [loading, setLoading] = useState(false);

  const getProducts = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/products/${query}`);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`${api}/categories`);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectCategory = (name, category) => {
    if (name) {
      setCategory(category);
      navigate(`/?cat=${category?.cat_id}${key ? `&key=${key}` : ""}`);
    } else {
      navigate(`/?${key ? `key=${key}` : ""}`);
    }
  };

  const onSearch = (val) => {
    if (val) {
      navigate(`/?key=${val}${cat ? `&cat=${cat}` : ""}`);
    } else {
      navigate(`/?${cat ? `cat=${cat}` : ""}`);
    }
  };

  const onSearchChange = (e) => {
    if (!e.target.value) navigate(`/?${cat ? `cat=${cat}` : ""}`);
  };

  const selectProduct = (item) => {
    setSelected(item);
    setOpenModal(true);
  };

  const paginate = (current) => {
    const off = (current - 1) * limit;
    navigate(
      `/?offset=${off}&limit=${limit}${cat ? `&cat=${cat}` : ""}${
        key ? `&key=${key}` : ""
      }`
    );
  };

  useEffect(() => {
    getProducts(query);
    getCategories();
  }, [query]);

  useEffect(() => {
    if (cat) {
      categories.map((category) => {
        if (+cat === category.cat_id) setCategory(category);
      });
    } else {
      setCategory(null);
    }
  }, [categories, cat]);

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

  const addToCart = (item) => {
    const user_id = user?.id;
    const product_id = item?.id;
    const qty = item?.qty;
    const onAdd = () => {
      if (!item?.qty) return message.error("Please add quantity at least 1");
    };
    return (
      <Button type="link" icon={<ShoppingCartOutlined />} onClick={onAdd} />
    );
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      render: (name, rec) => {
        return (
          <Space>
            <Image src={rec?.img_url} width={40} />
            <Text strong>{textCaps(name)}</Text>
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "label",
      render: (label) => <Text>{label}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <Text>{idr(price)}</Text>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (_, product) => <Text>{`${product.stock} ${product.unit}`}</Text>,
    },
    {
      width: 200,
      title: "Add to Cart",
      dataIndex: "stock",
      render: (stock, product) => {
        return (
          <InputNumber
            placeholder="qty"
            min={0}
            max={stock}
            onChange={(val) => (product.qty = val)}
            addonAfter={addToCart(product)}
          />
        );
      },
    },
  ];

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
                  style={{ width: 120 }}
                  options={categories}
                  value={category?.value}
                  allowClear
                  placeholder="All"
                  onChange={onSelectCategory}
                />
              )}
              <Input.Search
                allowClear
                style={{ width: 200 }}
                placeholder="Search"
                onChange={onSearchChange}
                onSearch={onSearch}
              />
            </Space>
          </div>

          {grid ? (
            <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
              <Row gutter={[20, 20]}>
                {products?.data?.map((product) => {
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
              bordered
              rowKey={(r) => r.id}
              dataSource={products?.data}
              columns={columns}
              pagination={false}
            />
          )}

          {products?.total ? (
            <div className="centered-end pt-3">
              <Pagination
                defaultCurrent={1}
                current={offset / +limit + 1}
                pageSize={+limit}
                pageSizeOptions={[10, 15]}
                total={products?.total}
                onChange={paginate}
                // onShowSizeChange={paginate}
              />
            </div>
          ) : null}
        </Col>

        {showCategory && (
          <Col xs={6}>
            <Category categories={categories} selected={cat} />
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
        <img src={selected?.img_url} width="100%" alt="product" />

        <div className="mt-2">
          <span className="text-success fw-bold fs-5">$ {selected?.price}</span>
        </div>

        <p>{selected?.description}</p>
      </Modal>
    </div>
  );
}
