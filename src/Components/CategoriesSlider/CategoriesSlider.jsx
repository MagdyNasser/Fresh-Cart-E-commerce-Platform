import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FallingLines } from "react-loader-spinner";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  const allCategories = data?.data.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FallingLines color="#2bb673" width="50" visible={true} />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-5 mb-8 pb-4">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Shop by Category
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Explore our wide range of categories
        </p>
      </div>
      <Slider {...settings} className="categories-slider">
        {allCategories?.map((category) => (
          <div key={category._id} className="px-2">
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2bb673] cursor-pointer">
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
          </div>
        ))}
      </Slider>
    </div>
  );
}
