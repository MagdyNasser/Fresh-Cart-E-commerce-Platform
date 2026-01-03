import { useContext, useState } from "react"
import { cartContext } from "../../Context/CartContext"
import axios from "axios"
import toast from "react-hot-toast"
import { useFormik } from "formik";

export default function Order() {
    const { cartId, resetValues } = useContext(cartContext);
    const [isCash, setIsCash] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const formikObj = useFormik({
        initialValues: {
        details: "",
        phone: "",
        city: ""
        },
        onSubmit: function(values){
            setIsLoading(true);
            if (isCash) {
                createCashOrder(values);
            }else {
                createCheckout(values);
            }
        }
    })

    function createCashOrder(values) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
            shippingAddress: values
        },{
            headers: {
                token: localStorage.getItem('tkn')
            }
        }
    )
    .then( (resp)=> {
        if(resp.data.status === 'success') {
            toast.success('Order Created',{ position:'top-right'});
            resetValues();
            setIsLoading(false);
        }
    } )
    .catch( (err)=> {
        console.log('err',err);
        setIsLoading(false);
    } )
    }

        function createCheckout(values) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
            shippingAddress: values,
        },{
            headers: {
                token: localStorage.getItem('tkn')
            },
            params: {
              url: 'http://localhost:5173/',
            }
        }
    )
    .then((resp)=> {
        window.open(resp.data.session.url, "_self");
        setIsLoading(false);
    })
    .catch((err)=> {
        console.log("err", err);
        setIsLoading(false);
    })
}
  return (
    <div className="min-h-screen bg-[#f0f3f2] flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Order Card */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Order</h2>
            <p className="text-sm text-gray-600">Please fill in your shipping details</p>
          </div>

          {/* Form */}
          <form onSubmit={formikObj.handleSubmit} className="space-y-6">
            {/* Details Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={formikObj.handleChange}
                value={formikObj.values.details}
                type="text"
                id="details"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="details"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  formikObj.values.details
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                Shipping Details
              </label>
            </div>

            {/* Phone Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={formikObj.handleChange}
                value={formikObj.values.phone}
                type="tel"
                id="phone"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="phone"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  formikObj.values.phone
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                Phone Number
              </label>
            </div>

            {/* City Field */}
            <div className="relative z-0 w-full group">
              <input
                onChange={formikObj.handleChange}
                value={formikObj.values.city}
                type="text"
                id="city"
                className="block pt-7 pb-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#2bb673] peer transition-colors"
                placeholder=" "
                required
              />
              <label
                htmlFor="city"
                className={`absolute text-sm duration-300 transform origin-[0] left-0 ${
                  formikObj.values.city
                    ? 'text-[#2bb673] scale-75 -translate-y-6 top-0 z-10'
                    : 'text-gray-500 scale-100 translate-y-0 top-7 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#2bb673] peer-focus:top-0 peer-focus:z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
                }`}
              >
                City
              </label>
            </div>

            {/* Payment Method Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => setIsCash(true)}
                type="submit"
                disabled={isLoading}
                className="flex-1 text-white bg-black rounded-lg box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <i className="bi bi-cash-coin"></i>
                <span>Cash order</span>
              </button>
              
              <button
                onClick={() => setIsCash(false)}
                type="submit"
                disabled={isLoading}
                className="flex-1 text-white bg-[#2C4238] rounded-lg box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <i className="bi bi-credit-card"></i>
                <span>Checkout</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
