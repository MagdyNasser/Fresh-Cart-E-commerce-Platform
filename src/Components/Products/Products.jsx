import { useContext, useEffect } from "react";
import axios from "axios";
import LoaderScreen from "./../LoaderScreen/LoaderScreen";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cartContext } from "./../../Context/CartContext";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../store/wishlistSlice";

export default function Products() {
  const { addProductToCart } = useContext(cartContext);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (localStorage.getItem('tkn')) {
      dispatch(getWishlist());
    }
  }, [dispatch]);

  function getAllproducts2() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllproducts2,
  });

  async function handleAddProduct(id) {
    const res = await addProductToCart(id);
    if (res) {
      toast.success("Product Added Successfully", {
        duration: 3000,
        position: "top-right",
      });
    } else {
      toast.error("Error occurred", { duration: 3000, position: "top-right" });
    }
  }

  function isProductInWishlist(productId) {
    return items.some((item) => {
      let itemId;
      if (item.product) {
        itemId = item.product._id || item.id;
      } else {
        itemId = item._id || item.id;
      }
      return itemId === productId;
    });
  }

  async function handleWishlistToggle(productId, e) {
    e.preventDefault();
    const isInWishlist = isProductInWishlist(productId);
    
    if (isInWishlist) {
      const result = await dispatch(removeFromWishlist(productId));
      if (removeFromWishlist.fulfilled.match(result)) {
        dispatch(getWishlist()); // Refresh wishlist
        toast.success("Removed from wishlist", { duration: 3000, position: "top-right" });
      } else {
        toast.error("Failed to remove from wishlist", { duration: 3000, position: "top-right" });
      }
    } else {
      const result = await dispatch(addToWishlist(productId));
      if (addToWishlist.fulfilled.match(result)) {
        dispatch(getWishlist()); // Refresh wishlist
        toast.success("Added to wishlist", { duration: 3000, position: "top-right" });
      } else {
        toast.error("Failed to add to wishlist", { duration: 3000, position: "top-right" });
      }
    }
  }

  const allProducts = data?.data.data;

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Browse our complete collection of products</p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {allProducts?.map((product) => {
            const rating = Math.round(product.ratingsAverage || 0);
            const fullStars = rating;
            const emptyStars = 5 - rating;
            const reviewCount = product.ratingsQuantity || 0;

            return (
              <div
                key={product._id}
                className="bg-white rounded-xl relative overflow-hidden group p-5 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {/* Product Image Container */}
                <div className="relative bg-white rounded-xl mb-4 overflow-hidden aspect-square shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Heart Icon (Favorite/Wishlist) */}
                  <button
                    className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border transition-all duration-200 shadow-sm hover:shadow-md z-10 ${
                      isProductInWishlist(product._id)
                        ? 'border-red-300 hover:border-red-500'
                        : 'border-gray-200 hover:border-[#2bb673]'
                    }`}
                    onClick={(e) => handleWishlistToggle(product._id, e)}
                    title={isProductInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <i className={`bi ${isProductInWishlist(product._id) ? 'bi-heart-fill' : 'bi-heart'} ${
                      isProductInWishlist(product._id) ? 'text-red-500' : 'text-[#2bb673]'
                    } text-base`}></i>
                  </button>
                </div>

                {/* Product Information */}
                <div className="flex flex-col flex-grow">
                  {/* Category */}
                  <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">
                    {product.category.name}
                  </p>
                  
                  {/* Product Name */}
                  <h3 className="font-bold text-gray-900 text-base mb-2.5 line-clamp-2 min-h-[2.5rem] leading-tight">
                    {product.title}
                  </h3>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(fullStars)].map((_, i) => (
                        <i
                          key={i}
                          className="bi bi-star-fill text-[#2bb673] text-sm"
                        ></i>
                      ))}
                      {[...Array(emptyStars)].map((_, i) => (
                        <i
                          key={i + fullStars}
                          className="bi bi-star text-gray-300 text-sm"
                        ></i>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({reviewCount})</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    {product.priceAfterDiscount ? (
                      <div className="flex items-center gap-2">
                        <p className="line-through text-gray-400 text-sm">
                          {product.price} EGP
                        </p>
                        <p className="font-bold text-gray-900 text-lg">
                          {product.priceAfterDiscount} EGP
                        </p>
                      </div>
                    ) : (
                      <p className="font-bold text-gray-900 text-lg">{product.price} EGP</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 mt-auto">
                    <Link
                      to={`/productDetails/${product._id}`}
                      className="flex-1 bg-[#2bb673] hover:bg-[#239d5f] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    >
                      <i className="bi bi-cart text-base"></i>
                      <span className="text-sm">Buy now</span>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddProduct(product._id);
                      }}
                      className="w-11 h-11 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                    >
                      <i className="bi bi-cart-plus text-gray-700 text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

