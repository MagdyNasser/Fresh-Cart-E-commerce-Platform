import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderScreen from "./../LoaderScreen/LoaderScreen";
import { Link } from "react-router-dom";

export default function OrdersHistory() {
  function getUserOrders() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders", {
      headers: {
        token: localStorage.getItem('tkn'),
      },
    });
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getUserOrders"],
    queryFn: getUserOrders,
    enabled: !!localStorage.getItem('tkn'),
  });

  const orders = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#f0f3f2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Occurred</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f3f2] py-8">
      <div className="container mx-auto px-4 md:px-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View all your paid orders</p>
        </div>

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#2bb673] rounded-full flex items-center justify-center">
                        <i className="bi bi-bag-check text-white text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div className="mb-3 ml-16">
                        <p className="text-sm text-gray-600 mb-1">
                          <i className="bi bi-geo-alt-fill text-[#2bb673] mr-2"></i>
                          <span className="font-semibold">Shipping Address:</span>
                        </p>
                        <p className="text-sm text-gray-700 ml-6">
                          {order.shippingAddress.details}, {order.shippingAddress.city}
                        </p>
                        <p className="text-sm text-gray-700 ml-6">
                          Phone: {order.shippingAddress.phone}
                        </p>
                      </div>
                    )}

                    {/* Payment Method */}
                    <div className="mb-3 ml-16">
                      <p className="text-sm text-gray-600">
                        <i className="bi bi-credit-card text-[#2bb673] mr-2"></i>
                        <span className="font-semibold">Payment Method:</span>{" "}
                        <span className="text-gray-700">
                          {order.paymentMethodType === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                        </span>
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="ml-16">
                      <p className="text-sm text-gray-600 mb-2">
                        <i className="bi bi-box-seam text-[#2bb673] mr-2"></i>
                        <span className="font-semibold">Items ({order.cartItems?.length || 0}):</span>
                      </p>
                      <div className="flex flex-wrap gap-2 ml-6">
                        {order.cartItems?.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200"
                          >
                            {item.product?.imageCover && (
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="w-8 h-8 object-contain rounded"
                              />
                            )}
                            <span className="text-xs text-gray-700 font-medium">
                              {item.product?.title || 'Product'} x{item.count}
                            </span>
                          </div>
                        ))}
                        {order.cartItems?.length > 3 && (
                          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
                            <span className="text-xs text-gray-700 font-medium">
                              +{order.cartItems.length - 3} more
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="md:text-right">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Total Price</p>
                      <p className="text-2xl font-bold text-[#2bb673]">
                        {order.totalOrderPrice} EGP
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          order.isPaid
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          <i className={`bi ${order.isPaid ? 'bi-check-circle-fill' : 'bi-clock-fill'} mr-1`}></i>
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-bag-x text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#2bb673] hover:bg-[#239d5f] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <i className="bi bi-cart-plus"></i>
                <span>Browse Products</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

