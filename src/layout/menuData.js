import {
  BarChartOutlined,
  InboxOutlined,
  OrderedListOutlined,
  ShopOutlined,
  ShoppingOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";

const style = { fontSize: "24px" };

export const menuData = [
  {
    id: 1,
    label: "Home",
    icon: <ShopOutlined style={style} />,
    key: "/",
  },
  {
    id: 2,
    label: "User",
    icon: <UserOutlined style={style} />,
    key: "/users",
  },
  {
    id: 3,
    label: "Produk",
    icon: <ShoppingOutlined style={style} />,
    key: "/products",
  },
  {
    id: 4,
    label: "Supplier",
    icon: <InboxOutlined style={style} />,
    key: "/Supplier",
  },
  {
    id: 5,
    label: "Kategori",
    icon: <OrderedListOutlined style={style} />,
    key: "/category",
  },
  {
    id: 6,
    label: "Transaksi",
    icon: <SwapOutlined style={style} />,
    key: "/transaction",
  },
];
