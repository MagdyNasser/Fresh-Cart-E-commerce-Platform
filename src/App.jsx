import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import "./index.css";
import AuthContextProvider from "./Context/AuthContext";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";
import { Offline } from "react-detect-offline";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Wishlist from "./Components/Wishlist/Wishlist";
import Products from "./Components/Products/Products";
import OrdersHistory from "./Components/OrdersHistory/OrdersHistory";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <OrdersHistory />{" "}
          </ProtectedRoute>
        ),
      }, //Route
      {
        path: "home",
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      }, //Route
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />
          </ProtectedRoute>
        ),
      }, //Route
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      }, //Route
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      }, //Route
        {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      }, //Route

      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      }, //Route

      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },

      { path: "register", element: <Register /> },
      { path: "Login", element: <Login /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

const client = new QueryClient();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <AuthContextProvider>
            <CartContextProvider>
              <RouterProvider router={router} />
              <Toaster />
            </CartContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>

        <Offline>
          <div className="bg-black p-5 fixed text-white bottom-0 start-0 end-5">
            <h1>Connection lost</h1>
          </div>
        </Offline>
      </Provider>
    </>
  );
}
