import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/auth/Login";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Supplier from "./pages/Supplier";
import Products from "./pages/Products";
import Transaction from "./pages/Transaction";
import Category from "./pages/Category";
import Profile from "./pages/profile";
import MainProfile from "./pages/profile/MainProfile";
import Settings from "./pages/profile/Settings";
import ErrorPage from "./pages/Error";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />

        {/* PRIVATE ROUTES */}
        <Route path="/" element={<Layout user={user} />}>
          <Route path="" element={<Home />} />

          <Route path="user" element={<Profile />}>
            <Route path="" element={<MainProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="users" element={<Users />} />

          <Route path="supplier" element={<Supplier />} />

          <Route path="products" element={<Products />} />

          <Route path="transaction" element={<Transaction />} />

          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
