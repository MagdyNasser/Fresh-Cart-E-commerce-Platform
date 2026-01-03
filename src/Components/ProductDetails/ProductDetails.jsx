import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";
import { useContext, useEffect } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, getWishlist } from "../../store/wishlistSlice";

export default function ProductDetails() {
    const { id } = useParams();
    const { addProductToCart } = useContext(cartContext);
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.wishlist);

    // Check if product is in wishlist
    const isInWishlist = items.some((item) => {
        let productId;
        if (item.product) {
            productId = item.product._id || item.id;
        } else {
            productId = item._id || item.id;
        }
        return productId === id;
    });

    useEffect(() => {
        if (localStorage.getItem('tkn')) {
            dispatch(getWishlist());
        }
    }, [dispatch]);


    async function handleAddToCart(){
    const res = await addProductToCart(id);

    if (res) {
        // console.log('Success!!!');
        toast.success("Product Added Successfully", { duration: 3000, position:'top-right'})
    } else {
        // console.log('Error!!!')
        toast.error("Error occurred", { duration: 3000, position:'top-right'})
    }

    }

    async function handleWishlistToggle() {
        if (isInWishlist) {
            const result = await dispatch(removeFromWishlist(id));
            if (removeFromWishlist.fulfilled.match(result)) {
                dispatch(getWishlist()); // Refresh wishlist
                toast.success("Removed from wishlist", { duration: 3000, position:'top-right'});
            } else {
                toast.error("Failed to remove from wishlist", { duration: 3000, position:'top-right'});
            }
        } else {
            const result = await dispatch(addToWishlist(id));
            if (addToWishlist.fulfilled.match(result)) {
                dispatch(getWishlist()); // Refresh wishlist
                toast.success("Added to wishlist", { duration: 3000, position:'top-right'});
            } else {
                toast.error("Failed to add to wishlist", { duration: 3000, position:'top-right'});
            }
        }
    }

        function getProductDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

const { data, isError, isLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: getProductDetails,
});

    const ProductDetailsObj = data?.data.data;

    if(isError) {
        return (
            <div className="min-h-screen bg-[#f0f3f2] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">No product found with this ID</h1>
                    <p className="text-gray-600">Please check the product ID and try again</p>
                </div>
            </div>
        )
    }

    if(isLoading) {
        return <LoaderScreen />
    }

    const rating = Math.round(ProductDetailsObj.ratingsAverage || 0);
    const fullStars = rating;
    const emptyStars = 5 - rating;
    const reviewCount = ProductDetailsObj.ratingsQuantity || 0;

  return (
    <div className="min-h-screen bg-[#f0f3f2] py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 lg:p-10">
                    {/* Product Image Section */}
                    <div className="flex flex-col gap-4">
                        <div className="relative bg-white rounded-xl overflow-hidden aspect-square shadow-md group">
                            <img 
                                src={ProductDetailsObj.imageCover} 
                                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300" 
                                alt={ProductDetailsObj.title} 
                            />
                            {/* Favorite Button */}
                            <button
                                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white border transition-all duration-200 shadow-md hover:shadow-lg z-10 ${
                                    isInWishlist 
                                        ? 'border-red-300 hover:border-red-500' 
                                        : 'border-gray-200 hover:border-[#2bb673]'
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleWishlistToggle();
                                }}
                                title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'} ${
                                    isInWishlist ? 'text-red-500' : 'text-[#2bb673]'
                                } text-lg`}></i>
                            </button>
                        </div>
                        
                        {/* Additional Images if available */}
                        {ProductDetailsObj.images && ProductDetailsObj.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-3">
                                {ProductDetailsObj.images.slice(0, 4).map((img, index) => (
                                    <div key={index} className="relative bg-white rounded-lg overflow-hidden aspect-square shadow-sm border border-gray-100 cursor-pointer hover:border-[#2bb673] transition-all duration-200">
                                        <img 
                                            src={img} 
                                            className="w-full h-full object-contain p-2" 
                                            alt={`${ProductDetailsObj.title} - ${index + 1}`} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information Section */}
                    <div className="flex flex-col gap-6">
                        {/* Category */}
                        <div>
                            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                                {ProductDetailsObj.category?.name || 'Product'}
                            </p>
                            
                            {/* Product Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {ProductDetailsObj.title}
                            </h1>

                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(fullStars)].map((_, i) => (
                                        <i
                                            key={i}
                                            className="bi bi-star-fill text-[#2bb673] text-lg"
                                        ></i>
                                    ))}
                                    {[...Array(emptyStars)].map((_, i) => (
                                        <i
                                            key={i + fullStars}
                                            className="bi bi-star text-gray-300 text-lg"
                                        ></i>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 font-medium">
                                    {ProductDetailsObj.ratingsAverage?.toFixed(1) || '0.0'}
                                </span>
                                <span className="text-sm text-gray-500">
                                    ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                                </span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                            <div className="flex items-center gap-4 mb-2">
                                {ProductDetailsObj.priceAfterDiscount ? (
                                    <>
                                        <p className="line-through text-gray-400 text-xl font-medium">
                                            {ProductDetailsObj.price} EGP
                                        </p>
                                        <p className="font-bold text-gray-900 text-3xl">
                                            {ProductDetailsObj.priceAfterDiscount} EGP
                                        </p>
                                        <span className="bg-[#2bb673] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                            {Math.round(((ProductDetailsObj.price - ProductDetailsObj.priceAfterDiscount) / ProductDetailsObj.price) * 100)}% OFF
                                        </span>
                                    </>
                                ) : (
                                    <p className="font-bold text-gray-900 text-3xl">
                                        {ProductDetailsObj.price} EGP
                                    </p>
                                )}
                            </div>
                            
                            {/* Quantity Available */}
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                                <i className="bi bi-check-circle-fill text-[#2bb673] text-lg"></i>
                                <span className="text-sm text-gray-700">
                                    <span className="font-semibold">{ProductDetailsObj.quantity}</span> items available in stock
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {ProductDetailsObj.description}
                            </p>
                        </div>

                        {/* Brand if available */}
                        {ProductDetailsObj.brand && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Brand:</span>
                                <span className="text-sm font-semibold text-gray-900">{ProductDetailsObj.brand.name}</span>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button 
                                onClick={handleAddToCart} 
                                className="flex-1 bg-[#2bb673] hover:bg-[#239d5f] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                            >
                                <i className="bi bi-cart-plus text-xl"></i>
                                <span>Add to Cart</span>
                            </button>
                            
                            <button 
                                className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                            >
                                <i className="bi bi-bag-check text-xl"></i>
                                <span>Buy Now</span>
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <i className="bi bi-truck text-[#2bb673] text-xl"></i>
                                <div>
                                    <p className="text-xs text-gray-500">Free Shipping</p>
                                    <p className="text-sm font-semibold text-gray-900">On orders over 500 EGP</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="bi bi-arrow-counterclockwise text-[#2bb673] text-xl"></i>
                                <div>
                                    <p className="text-xs text-gray-500">Easy Returns</p>
                                    <p className="text-sm font-semibold text-gray-900">30 days return policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
