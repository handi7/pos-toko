import { Drawer, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { menuData } from "./menuData";
import MenuItems from "./MenuItems";

export default function Layoutt({ user, children }) {
  const navigate = useNavigate();
  const topics = ["First topic", "Second topic", "Third topic"];

  const [mobile, setMobile] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("/");

  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
    setDrawer(!drawer);
  };

  useEffect(() => {
    if (!user?.id) {
      return navigate("/login");
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
    <MenuItems
      menus={menuData}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  return (
    <div>
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

        <Layout.Content style={{ height: "92vh" }} className="p-5">
          {/* {topics[contentIndex]} */}
          {children}
        </Layout.Content>
      </Layout>
    </div>
  );
}
