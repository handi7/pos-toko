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
  Modal,
  Pagination,
  Space,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCategory from "../components/AddCategory";
import UpdateCategory from "../components/EditCategory";
import { useQuery } from "../hooks/useQuery";

const { Title } = Typography;
const { confirm } = Modal;
const api = process.env.REACT_APP_API_URL;

export default function Category() {
  const query = window.location.search;
  const offset = useQuery().get("offset") || 0;
  const limit = useQuery().get("limit") || 10;
  const sort = useQuery().get("sort");
  const desc = useQuery().get("desc");

  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
  const navigate = useNavigate();

  const [data, setData] = useState({ data: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [openDrawer, setDrawer] = useState({ add: false, edit: false });
  const [editData, setEditData] = useState(null);

  const getData = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(api + "/category-data" + query);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onDelete = async (catId) => {
    try {
      await axios.delete(`${api}/category/${catId}`, {
        headers: { Authorization: token },
      });
      getData(query);
    } catch (error) {}
  };

  const paginate = (current) => {
    const off = (current - 1) * limit;
    navigate(
      `/category/?offset=${off}&limit=${limit}${sort ? `&sort=${sort}` : ""}${
        desc ? `&desc=1` : ""
      }`
    );
  };

  const onSort = (_, __, sort) => {
    switch (sort?.order) {
      case "ascend":
        navigate(`/category/?offset=0&limit=${limit}&sort=${sort?.field}`);

        break;

      case "descend":
        navigate(
          `/category/?offset=0&limit=${limit}&sort=${sort?.field}&desc=1`
        );
        break;

      default:
        navigate(`/category/?offset=0&limit=${limit}`);
        break;
    }
  };

  useEffect(() => {
    getData(query);
  }, [query]);

  const showDeleteConfirm = (item) => {
    confirm({
      title: `Are you sure delete ${item?.label}?`,
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        onDelete(item?.cat_id);
      },
      onCancel() {},
    });
  };

  const onClick = ({ key }, item) => {
    switch (key) {
      case "edit":
        setEditData(item);
        setDrawer({ edit: true });
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
      width: 10,
      title: "No",
      render: (_, __, idx) => +offset + idx + 1,
    },
    {
      title: "Category",
      dataIndex: "label",
      sorter: true,
    },
    {
      title: "Product",
      dataIndex: "count",
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
      <Title level={3}>Category</Title>
      <div className="between">
        <Space size={10} className="d-flex align-items-center">
          <Button
            className="centered"
            shape="round"
            icon={<PlusOutlined />}
            onClick={() => setDrawer({ add: true })}
          >
            Add Category
          </Button>
        </Space>
      </div>

      <Table
        bordered
        loading={{ spinning: loading, indicator: <LoadingOutlined spin /> }}
        rowKey={(rec) => rec.cat_id}
        dataSource={data?.data}
        columns={columns}
        onChange={onSort}
        pagination={false}
      />

      {data?.count ? (
        <div className="centered-end">
          <Pagination
            defaultCurrent={1}
            current={offset / +limit + 1}
            pageSize={+limit}
            pageSizeOptions={[10, 15]}
            total={data?.count}
            onChange={paginate}
            // onShowSizeChange={paginate}
          />
        </div>
      ) : null}

      <AddCategory
        open={openDrawer?.add}
        close={() => setDrawer({ ...openDrawer, add: false })}
        getCategory={() => getData(query)}
      />

      {/* {editData && ( */}
      <UpdateCategory
        item={editData}
        open={openDrawer?.edit}
        close={() => {
          setEditData(null);
          setDrawer({});
        }}
        getCategory={() => getData(query)}
      />
      {/* )} */}
    </Space>
  );
}
