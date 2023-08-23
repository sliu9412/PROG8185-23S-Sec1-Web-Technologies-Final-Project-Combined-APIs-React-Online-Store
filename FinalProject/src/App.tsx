import { Route, Routes } from "react-router";
import TopNavigationBar from "./components/TopNavigationBar";
import AccountPage from "./pages/AccountPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import { RouteGuard } from "./utils/RouteGuard";
import RegisterPage from "./pages/RegsiterPage";
import DetailPage from "./pages/DetailPage";
import OrderPage from "./pages/OrderPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <TopNavigationBar />
      <Routes>
        <Route path="/" Component={ProductsPage} />
        <Route path="/products" Component={ProductsPage} />
        <Route
          path="/cart"
          Component={RouteGuard.haveLogined ? CartPage : LoginPage}
        />
        <Route
          path="/orders"
          Component={RouteGuard.haveLogined ? OrderPage : LoginPage}
        />
        <Route
          path="/login"
          Component={RouteGuard.haveLogined ? ProductsPage : LoginPage}
        />
        <Route
          path="/register"
          Component={RouteGuard.haveLogined ? ProductsPage : RegisterPage}
        />
        <Route
          path="/account"
          Component={RouteGuard.haveLogined ? AccountPage : LoginPage}
        />
        <Route path="/detail/:productId" Component={DetailPage} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
