import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ menu, collapsed, mobile, setMobile }) {
  return (
    <Layout.Sider
      theme="light"
      collapsedWidth={mobile ? 0 : 100}
      collapsed={mobile ? true : collapsed}
      trigger={null}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      {menu}
    </Layout.Sider>
  );
}
