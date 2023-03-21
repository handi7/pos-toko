import {
  EyeOutlined,
  LoadingOutlined,
  MoreOutlined,
  PlusOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  message,
  Pagination,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetail from "../components/UserDetail";
import { textCaps } from "../hooks/text";
import { useQuery } from "../hooks/useQuery";

const { Title } = Typography;
const api = process.env.REACT_APP_API_URL;

export default function Users() {
  const query = window.location.search;
  const offset = useQuery().get("offset") || 0;
  const limit = useQuery().get("limit") || 10;
  const key = useQuery().get("key");
  const sort = useQuery().get("sort");
  const asc = useQuery().get("asc");

  const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
  const navigate = useNavigate();

  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [searchText, setText] = useState("");
  const [userDetail, setUser] = useState(null);

  const getData = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/users/${query}`, {
        headers: { Authorization: token },
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (text) => {
    navigate(`/users/?offset=0&limit=${limit}&key=${text}`);
  };

  const inputHandler = (e) => {
    if (!e.target.value) {
      navigate(`/users/?offset=0&limit=${limit}`);
    }
    setText(e.target.value);
  };

  const paginate = (current) => {
    const off = (current - 1) * limit;
    navigate(`/users/?offset=${off}&limit=${limit}${key ? `&key=${key}` : ""}`);
  };

  const onSort = (_, __, sort) => {
    switch (sort?.order) {
      case "ascend":
        navigate(
          `/users/?offset=0&limit=${limit}${key ? `&key=${key}` : ""}&sort=${
            sort?.field
          }&asc=1`
        );

        break;

      case "descend":
        navigate(
          `/users/?offset=0&limit=${limit}${key ? `&key=${key}` : ""}&sort=${
            sort?.field
          }`
        );
        break;

      default:
        navigate(`/users/?offset=0&limit=${limit}${key ? `&key=${key}` : ""}`);
        break;
    }
  };

  useEffect(() => {
    setText(key);
    getData(query);
  }, [query]);

  const onClick = async ({ key }, item) => {
    switch (key) {
      case "detail":
        setUser(item);
        break;

      case "deactivate":
        setLoading(true);
        const id = item?.id;
        const is_active = item?.is_active === 0;
        await axios.patch(
          `${api}/user`,
          { id, is_active },
          { headers: { Authorization: token } }
        );
        message.success(
          `${item?.name} berhasil ${is_active ? "diaktifkan" : "dinonaktifkan"}`
        );
        getData(query);
        setLoading(false);
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <span>{textCaps(name)}</span>,
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => <span>{textCaps(role)}</span>,
      sorter: true,
    },
    {
      width: 200,
      title: "Status",
      render: (_, user) => {
        return (
          <div>
            <Tag color={user?.is_verified ? "green" : "red"}>
              {user?.is_verified ? "Verified" : "Unverified"}
            </Tag>
            <Tag color={user?.is_active ? "green" : "red"}>
              {user?.is_active ? "Active" : "Deactivated"}
            </Tag>
          </div>
        );
      },
    },
    {
      width: 10,
      render: (_, user) => (
        <div className="centered-end">
          <Dropdown
            menu={{
              items: [
                {
                  label: <span>Detail</span>,
                  icon: <EyeOutlined />,
                  key: "detail",
                },
                {
                  label: (
                    <span
                      className={`text-${
                        user?.is_active ? "danger" : "success"
                      }`}
                    >
                      {user?.is_active ? "Deactivate" : "Activate"}
                    </span>
                  ),
                  icon: (
                    <UserDeleteOutlined
                      className={`text-${
                        user?.is_active ? "danger" : "success"
                      }`}
                    />
                  ),
                  key: "deactivate",
                },
              ],
              onClick: (e) => onClick(e, user),
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
      <Title level={3}>Data User</Title>
      <div className="between">
        <Space size={10} className="d-flex align-items-center">
          <Button className="centered" shape="round" icon={<PlusOutlined />}>
            Tambah user
          </Button>
        </Space>

        <Space size={10}>
          <Input.Search
            allowClear
            placeholder="Search User"
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

      {data?.count ? (
        <div className="centered-end">
          <Pagination
            defaultCurrent={1}
            current={offset / +limit + 1}
            pageSize={+limit}
            total={data?.count}
            onChange={paginate}
            pageSizeOptions={[10, 15]}
          />
        </div>
      ) : null}

      <UserDetail
        user={userDetail}
        open={userDetail}
        close={() => setUser(null)}
        getUsers={() => getData(query)}
      />
    </Space>
  );
}
