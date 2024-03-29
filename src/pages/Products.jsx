import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LoadingOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import { idr, textCaps } from "../hooks/text";
import { useQuery } from "../hooks/useQuery";

const { Title, Text } = Typography;
const { confirm } = Modal;
const api = process.env.REACT_APP_API_URL;

export default function Products() {
  const query = window.location.search;
  const offset = useQuery().get("offset") || 0;
  const limit = useQuery().get("limit") || 10;
  const key = useQuery().get("key");
  const sort = useQuery().get("sort");
  const asc = useQuery().get("asc");
  const cat = useQuery().get("cat");

  const navigate = useNavigate();

  const [data, setData] = useState({ data: [], total: 0 });
  const [categories, setCategories] = useState([]);
  const [catId, setCat] = useState(null);
  const [searchText, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [drawer, setDrawer] = useState({ add: false, edit: false });
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const getData = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/products/${query}`);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const onDelete = async (productId) => {
    try {
      await axios.delete(`${api}/product/${productId}`);
      getData(query);
    } catch (error) {}
  };

  const onSearch = (text) => {
    navigate(
      `/products/?offset=0&limit=${limit}&key=${text}${
        cat ? `&cat=${cat}` : ""
      }`
    );
  };

  const inputHandler = (e) => {
    if (!e.target.value) {
      navigate(`/products/?offset=0&limit=${limit}${cat ? `&cat=${cat}` : ""}`);
    }
    setText(e.target.value);
  };

  const paginate = (current) => {
    const off = (current - 1) * limit;
    navigate(
      `/products/?offset=${off}&limit=${limit}${key ? `&key=${key}` : ""}${
        sort ? `&sort=${sort}` : ""
      }${asc ? `&asc=${asc}` : ""}`
    );
  };

  const onSort = (_, __, sort) => {
    switch (sort?.order) {
      case "ascend":
        navigate(
          `/products/?offset=0&limit=${limit}${key ? `&key=${key}` : ""}&sort=${
            sort?.field
          }&asc=1${cat ? `&cat=${cat}` : ""}`
        );

        break;

      case "descend":
        navigate(
          `/products/?offset=0&limit=${limit}${key ? `&key=${key}` : ""}&sort=${
            sort?.field
          }${cat ? `&cat=${cat}` : ""}`
        );
        break;

      default:
        navigate(
          `/products/?offset=0&limit=${limit}${key ? `&key=${key}` : ""}${
            cat ? `&cat=${cat}` : ""
          }`
        );
        break;
    }
  };

  const filterByCategory = (_, item) => {
    const q = `/products/?offset=0&limit=${limit}${key ? `&key=${key}` : ""}${
      sort ? `&sort=${sort}${asc ? "&asc=1" : ""}` : ""
    }${item?.cat_id ? `&cat=${item.cat_id}` : ""}`;

    navigate(q);
  };

  useEffect(() => {
    getCategories();
    setText(key);
    cat ? setCat(+cat) : setCat(null);
    getData(query);
  }, [query]);

  const showDeleteConfirm = (item) => {
    confirm({
      title: `Are you sure delete ${item?.name}?`,
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        onDelete(item?.id);
      },
      onCancel() {},
    });
  };

  const onClick = ({ key }, item) => {
    switch (key) {
      case "edit":
        setEditData(item);
        setDrawer({ ...drawer, edit: true });
        break;

      case "delete":
        showDeleteConfirm(item);
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      render: (name, rec) => {
        return (
          <div>
            <Image src={rec?.img_url} width={50} />{" "}
            <Text strong>{textCaps(name)}</Text>
          </div>
        );
      },
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "label",
      render: (label) => textCaps(label),
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => idr(price),
      sorter: true,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (stock, rec) => <Text>{`${stock} ${rec?.unit}`}</Text>,
      sorter: true,
    },
    {
      width: 10,
      render: (_, rec) => (
        <div className="centered-end">
          <Dropdown
            menu={{
              items: [
                {
                  label: <span>Edit</span>,
                  icon: <EditOutlined />,
                  key: "edit",
                },
                {
                  label: <span className="text-danger">Delete</span>,
                  icon: <DeleteOutlined className="text-danger" />,
                  key: "delete",
                },
              ],
              onClick: (e) => onClick(e, rec),
            }}
            trigger={["click"]}
            className="centered"
          >
            <Button color="success" className="centered" shape="circle">
              <MoreOutlined />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <Space size={10} direction="vertical" className="w-100">
      <Title level={3}>Products</Title>
      <div className="between">
        <Space size={10} className="d-flex align-items-center">
          <Button
            className="centered"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => setDrawer({ add: true })}
          >
            Add Product
          </Button>
        </Space>

        <Space size={10}>
          <Select
            value={catId ? categories.find((c) => c.cat_id === catId) : catId}
            style={{ width: 120 }}
            allowClear
            options={categories}
            placeholder="Category"
            onChange={filterByCategory}
          />
          <Input.Search
            allowClear
            placeholder="Search Product"
            value={searchText}
            onSearch={onSearch}
            onChange={inputHandler}
          />
        </Space>
      </div>

      <Table
        bordered
        loading={{ spinning: loading, indicator: <LoadingOutlined spin /> }}
        rowKey={(rec) => rec.id}
        dataSource={data?.data}
        columns={columns}
        onChange={onSort}
        pagination={false}
      />

      {data?.total ? (
        <div className="centered-end">
          <Pagination
            defaultCurrent={1}
            current={offset / +limit + 1}
            pageSize={+limit}
            pageSizeOptions={[10, 15]}
            total={data?.total}
            onChange={paginate}
            // onShowSizeChange={paginate}
          />
        </div>
      ) : null}

      <AddProduct
        open={drawer?.add}
        close={() => setDrawer({ add: false })}
        categories={categories}
        getProducts={() => getData(query)}
      />

      {editData && (
        <EditProduct
          data={editData}
          open
          close={() => setEditData(null)}
          categories={categories}
          getProducts={() => getData(query)}
        />
      )}
    </Space>
  );
}
