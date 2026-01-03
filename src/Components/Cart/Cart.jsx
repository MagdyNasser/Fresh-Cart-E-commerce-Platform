import LoaderScreen from "../LoaderScreen/LoaderScreen";
import useCart from "./useCart";
import { Link } from "react-router-dom";

export default function Cart() {
  const { handleChangeCount, handleDelete, totalCartPrice, products } = useCart();

  if (!products) {
    return <LoaderScreen />;
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="mb-6">
            <i className="bi bi-cart-x text-6xl text-gray-300"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to your cart to continue shopping</p>
          <Link
            to="/home"
            className="inline-block bg-[#2bb673] hover:bg-[#239d5f] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-500">You have {products.length} {products.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4">
          {products?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                        {product.product.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3">
                        {product.product.category?.name || 'Category'}
                      </p>
                    </div>

                    {/* Quantity and Price Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1">
                          <button
                            onClick={() => handleChangeCount(product.product._id, product.count - 1)}
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-md bg-white hover:bg-gray-100 text-gray-700 hover:text-[#2bb673] transition-all duration-200 border border-gray-200 shadow-sm"
                            disabled={product.count <= 1}
                          >
                            <i className="bi bi-dash text-sm"></i>
                          </button>
                          <span className="w-12 text-center font-semibold text-gray-900">
                            {product.count}
                          </span>
                          <button
                            onClick={() => handleChangeCount(product.product._id, product.count + 1)}
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-md bg-white hover:bg-gray-100 text-gray-700 hover:text-[#2bb673] transition-all duration-200 border border-gray-200 shadow-sm"
                          >
                            <i className="bi bi-plus text-sm"></i>
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{product.price} EGP</p>
                          <p className="text-xs text-gray-500">per item</p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleDelete(product.product._id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                      >
                        <i className="bi bi-trash text-base"></i>
                        <span>Remove from cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({products.length} {products.length === 1 ? 'item' : 'items'})</span>
                <span className="font-medium">{totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-[#2bb673]">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#2bb673]">{totalCartPrice} EGP</span>
                </div>
              </div>
            </div>

            <Link to="/order">
              <button className="w-full bg-[#2bb673] hover:bg-[#239d5f] text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2">
                <i className="bi bi-credit-card text-lg"></i>
                <span>Proceed to Checkout</span>
              </button>
            </Link>

            <Link to="/home" className="block mt-4 text-center text-gray-600 hover:text-[#2bb673] font-medium text-sm transition-colors">
              <i className="bi bi-arrow-left mr-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
