import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

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
              <Dashboard />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
