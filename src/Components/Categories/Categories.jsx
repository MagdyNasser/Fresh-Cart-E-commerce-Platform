import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import LoaderScreen from "../LoaderScreen/LoaderScreen"

export default function Categories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  })

  const allCategories = data?.data.data;

  if (isLoading) {
    return <LoaderScreen />
  }

  return (
    <div className="container mx-auto px-4 md:px-5 py-8">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          All Categories
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Browse through all our product categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {allCategories?.map((category) => (
          <div
            key={category._id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2bb673] cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#f0f9f1] to-white">
              <div className="aspect-square w-full flex items-center justify-center p-4 md:p-6">
                <img
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#2bb673]/0 group-hover:bg-[#2bb673]/5 transition-colors duration-300"></div>
            </div>

            {/* Category Name */}
            <div className="p-4 md:p-5 bg-white">
              <h6 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#2bb673] transition-colors duration-300 text-center line-clamp-2">
                {category.name}
              </h6>
            </div>

            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2bb673] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
