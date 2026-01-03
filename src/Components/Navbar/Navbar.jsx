import { Link, NavLink, useNavigate } from "react-router-dom";
import freshLogo from '../../assets/images/freshcart-logo.svg';
import { useContext, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../store/wishlistSlice";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const wishlistCount = items.length;

  useEffect(() => {
    if (userToken && localStorage.getItem('tkn')) {
      dispatch(getWishlist());
    }
  }, [dispatch, userToken]);

  function handleLogout() {
    localStorage.removeItem('tkn');
    setUserToken(null);
    navigate('/login');
  }

  // 1. تصغير الروابط (Padding أقل + Text أصغر)
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "px-3 py-1.5 bg-white shadow-md rounded-full text-slate-800 font-semibold border border-gray-100 transition-all text-sm" // Active
      : "px-3 py-1.5 text-slate-600 font-medium hover:text-green-600 transition-colors text-sm"; // Normal

  // 2. تصغير الأيقونات (w-9 h-9 بدل w-10 h-10)
  const iconBtnClasses = "relative w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 text-slate-600 hover:bg-gray-50 transition-all";

  return (
    // 3. تقليل الـ Padding الرأسي للناف بار نفسه (py-2 بدل py-3)
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-[#f0f3f2] shadow-sm border-b border-gray-200">
      
      {/* Left Section: Logo & Links */}
      <div className="flex items-center gap-6">
        <Link to='' className="flex items-center">
          {/* تصغير اللوجو شوية (h-7 بدل h-8) */}
          <img src={freshLogo} alt="Fresh Cart" className="h-7" />
        </Link>

        {userToken && (
          <ul className='hidden lg:flex items-center gap-1'>
            <li><NavLink className={navLinkClasses} to='/home'>Home</NavLink></li>
            <li><NavLink className={navLinkClasses} to='/products'>Products</NavLink></li>
            <li><NavLink className={navLinkClasses} to='/categories'>Categories</NavLink></li>
            <li><NavLink className={navLinkClasses} to='/brands'>Brands</NavLink></li>
          </ul>
        )}
      </div>

      {/* Middle Section: Search Bar */}
      {userToken && (
        <div className="flex-1 max-w-lg mx-6 hidden md:block">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            {/* تصغير الـ Input (py-2 + text-sm) */}
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500 transition-all"
            />
          </div>
        </div>
      )}

      {/* Right Section: Icons & Account */}
      <div className="flex items-center gap-2">
        
        {userToken ? (
          <>
            <Link to='/cart' className={iconBtnClasses}>
              <i className="fa-solid fa-cart-shopping text-sm"></i> {/* أيقونة أصغر */}
              {numOfCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] text-white border-2 border-white">
                  {numOfCartItems}
                </span>
              )}
            </Link>

            <Link to='/wishlist' className={`${iconBtnClasses} hidden sm:flex`}>
              <i className="fa-regular fa-heart text-sm"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* زر الـ Logout أصغر */}
            <div className="ml-1 relative">
              <button onClick={handleLogout} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
                <i className="fa-regular fa-user text-slate-700 text-sm"></i>
                <span className="text-xs font-bold text-slate-700 uppercase">Logout</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <NavLink to='/login' className="text-sm text-slate-600 font-medium hover:text-green-600">Login</NavLink>
            <NavLink to='/register' className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-green-700 transition-all">Register</NavLink>
          </div>
        )}
      </div>

    </nav>
  );
}