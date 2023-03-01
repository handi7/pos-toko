import { AreaChartOutlined, UserOutlined } from "@ant-design/icons";

const style = { fontSize: "24px" };

export const menuData = [
  {
    id: 1,
    label: "Dashboard",
    icon: <AreaChartOutlined style={style} />,
    path: "/",
  },
  {
    id: 2,
    label: "Users",
    icon: <UserOutlined style={style} />,
    path: "/users",
  },
];
