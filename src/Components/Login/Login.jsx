import { useFormik } from "formik"
import * as yup from 'yup';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'
import {authContext} from '../../Context/AuthContext'

export default function Login() {

  const navigate = useNavigate();

  const { setUserToken } = useContext(authContext);

  const [errorMessage, seterrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false); 

let user = {
    password: '',
    email: '',
}
  async  function loginUser (values) {
      setIsClicked(true);

    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    .then(function(response){
      console.log('sa7', response.data);
      console.log('token', response.data.token);
        localStorage.setItem('tkn', response.data.token);
      setUserToken(response.data.token);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        navigate('/products')
      }, 2000);
    })
    .catch(function(x){
      seterrorMessage(x.response.data.message)
      setIsClicked(false);
    });
    
}

const registerFormik = useFormik( {
  initialValues: user,
  
  onSubmit: loginUser,

  validationSchema: yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(12, 'Password must be at most 12 characters').required('Password is required'),
  }),

} )

  return (
    <div className="min-h-screen bg-[#f0f3f2] flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Success Message */}
        {isSuccess && (
          <div className="p-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200 shadow-sm" role="alert">
            <div className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-green-600"></i>
              <span className="font-medium">Welcome back! Redirecting...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 shadow-sm" role="alert">
            <div className="flex items-center gap-2">
              <i className="bi bi-exclamation-circle-fill text-red-600"></i>
              <span className="font-medium">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login Now</h2>
            <p className="text-sm text-gray-600">Welcome back! Please enter your credentials</p>
          </div>

          {/* Form */}
          <form onSubmit={registerFormik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={registerFormik.handleChange}
                value={registerFormik.values.email}
                onBlur={registerFormik.handleBlur}
                type="email"
                name="email"
                id="email"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  registerFormik.values.email || registerFormik.touched.email
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                Email Address
              </label>

              {registerFormik.errors.email && registerFormik.touched.email && (
                <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{registerFormik.errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={registerFormik.handleChange}
                value={registerFormik.values.password}
                onBlur={registerFormik.handleBlur}
                type="password"
                name="password"
                id="password"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  registerFormik.values.password || registerFormik.touched.password
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                Password
              </label>

              {registerFormik.errors.password && registerFormik.touched.password && (
                <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{registerFormik.errors.password}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isClicked}
              className="w-full bg-[#2bb673] hover:bg-[#239d5f] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {!isClicked ? (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Login</span>
                </>
              ) : (
                <ColorRing
                  visible={true}
                  height="24"
                  width="24"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-[#2bb673] hover:text-[#239d5f] transition-colors"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
