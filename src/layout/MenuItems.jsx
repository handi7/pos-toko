import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuItems({
  menus,
  selectedKey: s,
  changeSelectedKey: c,
}) {
  const navigate = useNavigate();
  // const styledTopics = [];

  // menus.forEach((menu, key) =>
  //   styledTopics.push(
  //     <Menu.Item key={key} onClick={changeSelectedKey} icon={menu?.icon}>
  //       {menu?.label}
  //     </Menu.Item>
  //   )
  // );

  const onClick = (e) => {
    c(e);
    navigate(e.key);
  };

  return (
    <Menu mode="inline" selectedKeys={[s]}>
      {/* {styledTopics} */}
      {menus?.map((menu, idx) => {
        return (
          <Menu.Item
            key={menu?.path}
            onClick={(e) => onClick(e)}
            icon={menu?.icon}
          >
            <span className="fw-bold">{menu?.label}</span>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
