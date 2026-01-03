import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (localStorage.getItem('tkn')) {
      dispatch(getWishlist());
    }
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId) => {
    const result = await dispatch(removeFromWishlist(productId));
    if (removeFromWishlist.fulfilled.match(result)) {
      dispatch(getWishlist()); // Refresh wishlist
      toast.success('Removed from wishlist', {
        duration: 3000,
        position: 'top-right',
      });
    } else {
      toast.error('Failed to remove from wishlist', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  if (loading && items.length === 0) {
    return <LoaderScreen />;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="mb-6">
            <i className="bi bi-heart text-6xl text-gray-300"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to your wishlist to save them for later</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-500">
          You have {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => {
          // Handle different API response formats
          let productData, productId;
          
          if (item.product) {
            // Format: { product: {...}, id: "..." }
            productData = item.product;
            productId = item.product._id || item.id;
          } else if (item._id) {
            // Format: { _id: "...", title: "...", ... }
            productData = item;
            productId = item._id;
          } else if (item.id) {
            // Format: { id: "...", ... }
            productData = item;
            productId = item.id;
          } else {
            // Fallback
            productData = item;
            productId = item._id || item.id || index;
          }

          return (
            <div
              key={productId}
              className="bg-white rounded-xl relative overflow-hidden group p-5 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Product Image Container */}
              <div className="relative bg-white rounded-xl mb-4 overflow-hidden aspect-square shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src={productData.imageCover}
                  alt={productData.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(productId)}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-red-500 transition-all duration-200 shadow-sm hover:shadow-md z-10"
                  title="Remove from wishlist"
                >
                  <i className="bi bi-heart-fill text-red-500 text-base"></i>
                </button>
              </div>

              {/* Product Information */}
              <div className="flex flex-col flex-grow">
                {/* Category */}
                <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">
                  {productData.category?.name || 'Product'}
                </p>

                {/* Product Name */}
                <h3 className="font-bold text-gray-900 text-base mb-2.5 line-clamp-2 min-h-[2.5rem] leading-tight">
                  {productData.title}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  {productData.priceAfterDiscount ? (
                    <div className="flex items-center gap-2">
                      <p className="line-through text-gray-400 text-sm">
                        {productData.price} EGP
                      </p>
                      <p className="font-bold text-gray-900 text-lg">
                        {productData.priceAfterDiscount} EGP
                      </p>
                    </div>
                  ) : (
                    <p className="font-bold text-gray-900 text-lg">{productData.price} EGP</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    to={`/productDetails/${productId}`}
                    className="w-full bg-[#2bb673] hover:bg-[#239d5f] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                  >
                    <i className="bi bi-eye text-base"></i>
                    <span className="text-sm">View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

