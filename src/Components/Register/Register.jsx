import { useFormik } from "formik"
import * as yup from 'yup';
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'


export default function Register() {

  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

let user = {
    name: '',
    phone: '',
    password: '',
    rePassword: '',
    email: '',
}
  async  function registerUser (values) {
    // console.log('Hello from formik', values)
    // send object => APIs

    // try {
    // const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    // console.log('res', data);

    // } catch (error) {
    //   console.log('error', error.response.data.message)
    // }
      setIsClicked(true);

    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .then(function(x){
      // console.log('sa7',x);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/login')
      }, 2000);
    })
    .catch(function(x){
      // console.log('ghalat',x);
      seterrorMessage(x.response.data.message)
      setIsClicked(false);
    });

    // console.log(data.response.data.message);

}

const registerFormik = useFormik( {
  initialValues: user,
  
  onSubmit: registerUser,

  // validate: function(allData){
  //   const errors = {}
  //   const nameRegex = /^[A-Z][a-z]{4,8}$/
  //   const phoneRegex = /^(20)?01[0125][0-9]{8}$/

  //   if(! nameRegex.test(allData.name)) {
  //     errors.name = "Name must start with capital letter aasada adcaesdca"

  //   }

  //   if( phoneRegex.test(allData.phone) == false) {
  //     errors.phone = "Phone must be egyptian number"
  //   }

  //   if(allData.email.includes('@') == false || allData.email.includes('.') == false ) {
  //     errors.email = "Invalid Email"
  //   }

  //   if(allData.password.length < 6 || allData.password.length > 12 ) {
  //     errors.password = "Password must be form 6 to 12 character"
  //   }

  //   if(allData.password !== allData.rePassword) {
  //     errors.rePassword = "Password and re password doesn't match"
  //   }

  //   // console.log(errors)

  //   return errors;
  // }
  validationSchema: yup.object().shape({
    name: yup.string().required('Name is required').min(3,'Minimum must be 3 characters').max(12,'Max must be 12 characters'),
    email: yup.string().email('Inavlid Value').required(),
    phone: yup.string().required('Phone req.').matches(/^01[0125][0-9]{8}$/),
    password: yup.string().min(6).max(12).required(),
    rePassword: yup.string().required().oneOf([ yup.ref('password') ]),
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
              <span className="font-medium">Congratulations! Account created successfully. Redirecting...</span>
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

        {/* Register Card */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Register Now</h2>
            <p className="text-sm text-gray-600">Create your account to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={registerFormik.handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={registerFormik.handleChange}
                value={registerFormik.values.name}
                onBlur={registerFormik.handleBlur}
                type="text"
                name="name"
                id="name"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  registerFormik.values.name || registerFormik.touched.name
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                Full Name
              </label>

              {registerFormik.errors.name && registerFormik.touched.name && (
                <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{registerFormik.errors.name}</span>
                </div>
              )}
            </div>

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

            {/* Phone Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={registerFormik.handleChange}
                value={registerFormik.values.phone}
                onBlur={registerFormik.handleBlur}
                type="tel"
                name="phone"
                id="phone"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="phone"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  registerFormik.values.phone || registerFormik.touched.phone
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                Phone Number
              </label>

              {registerFormik.errors.phone && registerFormik.touched.phone && (
                <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{registerFormik.errors.phone}</span>
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

            {/* Confirm Password Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={registerFormik.handleChange}
                value={registerFormik.values.rePassword}
                onBlur={registerFormik.handleBlur}
                type="password"
                name="rePassword"
                id="rePassword"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="rePassword"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  registerFormik.values.rePassword || registerFormik.touched.rePassword
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                Confirm Password
              </label>

              {registerFormik.errors.rePassword && registerFormik.touched.rePassword && (
                <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{registerFormik.errors.rePassword}</span>
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
                  <i className="bi bi-person-plus-fill"></i>
                  <span>Register</span>
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

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#2bb673] hover:text-[#239d5f] transition-colors"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
