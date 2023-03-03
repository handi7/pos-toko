import { Card, Drawer, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { menuData } from "./menuData";
import MenuItems from "./MenuItems";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

export default function Layoutt({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [mobile, setMobile] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
    } else {
      setLogged(true);
    }
  }, [user]);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
    window.addEventListener("resize", () => setMobile(window.innerWidth < 768));
    return (_) =>
      window.removeEventListener("resize", () =>
        setMobile(window.innerWidth < 768)
      );
  }, []);

  const Menu = (
    <MenuItems menus={menuData} closeDrawer={() => setDrawer(false)} />
  );

  if (!logged)
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );

  return (
    <React.Fragment>
      {mobile && (
        <Drawer
          title="Topics"
          placement="left"
          onClick={() => setDrawer(false)}
          onClose={() => setDrawer(false)}
          open={drawer}
        >
          {Menu}
        </Drawer>
      )}

      <Header
        mobile={mobile}
        setDrawer={() => setDrawer(!drawer)}
        setCollapsed={() => setCollapsed(!collapsed)}
      />

      <Layout>
        <Sidebar
          menu={Menu}
          collapsed={collapsed}
          mobile={mobile}
          setMobile={setMobile}
        />

        <Layout.Content style={{ minHeight: "92vh" }} className="p-3">
          <Card>{children}</Card>
        </Layout.Content>
      </Layout>
    </React.Fragment>
  );
}
