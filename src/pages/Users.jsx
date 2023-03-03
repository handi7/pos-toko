import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Space, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const { Title } = Typography;
const api = "https://63fcbcf18ef914c5559e48bf.mockapi.io/api/v1";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

export default function Users() {
  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const getData = async (page, limit) => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/users/?page=${page}&limit=${limit}`);
      setData({ data: res.data, total: 60 });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (page, size) => {
    getData(page, size);
  };

  useEffect(() => {
    getData(1, 10);
  }, []);

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
          <Input placeholder="search" />
        </Space>
      </div>

      <Table
        bordered
        loading={{ spinning: loading, indicator: <LoadingOutlined spin /> }}
        rowKey={(rec) => rec.id}
        dataSource={data?.data}
        columns={columns}
        onChange={paginate}
        pagination={false}
        // pagination={{
        //   defaultCurrent: 1,
        //   defaultPageSize: 10,
        //   pageSizeOptions: [10, 15, 20],
        //   total: data?.total,
        // }}
      />

      <div className="centered-end">
        <Pagination
          total={data?.total}
          onChange={paginate}
          pageSizeOptions={[10, 15, 20]}
        />
      </div>
    </Space>
  );
}
