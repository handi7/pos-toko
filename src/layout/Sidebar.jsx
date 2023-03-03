import { Layout } from "antd";
import React from "react";

export default function Sidebar({ menu, collapsed, mobile }) {
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
