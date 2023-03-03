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

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <Layout user={user}>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/users"
          element={
            <Layout user={user}>
              <Users />
            </Layout>
          }
        />

        <Route
          path="/supplier"
          element={
            <Layout user={user}>
              <Supplier />
            </Layout>
          }
        />

        <Route
          path="/products"
          element={
            <Layout user={user}>
              <Products />
            </Layout>
          }
        />

        <Route
          path="/transaction"
          element={
            <Layout user={user}>
              <Transaction />
            </Layout>
          }
        />

        <Route
          path="/category"
          element={
            <Layout user={user}>
              <Category />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
