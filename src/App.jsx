import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserDashboard from "./pages/UserDashboard";
import Auth from "./pages/Auth";
import ProductsList from "./pages/ProductsList";
import AdminDashboard from "./pages/AdminDashboard";
import MyOrders from "./components/MyOrders";
import Layout from "./components/Layout";
import AdminOrders from "./components/AdminOrders";
import AdminProducts from "./components/AdminProducts";

function App() {
  const { userRole } = useAppContext();

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={userRole === "user" ? <Cart /> : <Navigate to="/auth" />}
          />
          <Route
            path="/checkout"
            element={
              userRole === "user" ? <Checkout /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/admin"
            element={
              userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/Userdashboard"
            element={
              userRole === "user" ? <UserDashboard /> : <Navigate to="/" />
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
