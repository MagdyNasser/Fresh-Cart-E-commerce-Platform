import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Product images with better positioning and styling
const slides = [
  {
    id: 1,
    title: "Your Supercenter, Reimagined",
    subtext: "Buy all your need without moving a feet",
    images: [
      {
        src: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&q=80",
        alt: "Wireless Mouse",
        className: "absolute left-0 md:left-4 top-12 md:top-16 w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain rotate-[-18deg] z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop&q=80",
        alt: "Samsung Galaxy S25 Ultra",
        className: "absolute left-16 md:left-24 lg:left-32 top-4 md:top-8 w-36 h-48 md:w-48 md:h-64 lg:w-56 lg:h-72 object-contain rotate-[8deg] z-20 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop&q=80",
        alt: "Corn Kernels",
        className: "absolute right-2 md:right-8 lg:right-12 top-16 md:top-20 w-32 h-40 md:w-40 md:h-48 lg:w-48 lg:h-56 object-contain rotate-[12deg] z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&q=80",
        alt: "Sunglasses",
        className: "absolute right-8 md:right-16 lg:right-20 bottom-8 md:bottom-12 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain rotate-[-10deg] z-15 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80",
        alt: "Headphones",
        className: "absolute left-8 md:left-12 bottom-4 md:bottom-8 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain rotate-[15deg] z-5 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      }
    ]
  },
  {
    id: 2,
    title: "Your Supercenter, Reimagined",
    subtext: "Buy all your need without moving a feet",
    images: [
      {
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&q=80",
        alt: "Smart Watch",
        className: "absolute left-0 md:left-4 top-12 md:top-16 w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain rotate-[-15deg] z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80",
        alt: "Headphones",
        className: "absolute left-16 md:left-24 lg:left-32 top-4 md:top-8 w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain rotate-[10deg] z-20 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80",
        alt: "Sneakers",
        className: "absolute right-2 md:right-8 lg:right-12 top-16 md:top-20 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain rotate-[-12deg] z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&q=80",
        alt: "Laptop",
        className: "absolute right-8 md:right-16 lg:right-20 bottom-8 md:bottom-12 w-32 h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 object-contain rotate-[8deg] z-15 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&q=80",
        alt: "Sunglasses",
        className: "absolute left-8 md:left-12 bottom-4 md:bottom-8 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain rotate-[18deg] z-5 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      }
    ]
  },
  {
    id: 3,
    title: "Your Supercenter, Reimagined",
    subtext: "Buy all your need without moving a feet",
    images: [
      {
        src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&q=80",
        alt: "Laptop",
        className: "absolute left-0 md:left-4 top-12 md:top-16 w-32 h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 object-contain rotate-[-20deg] z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop&q=80",
        alt: "Smartphone",
        className: "absolute left-16 md:left-24 lg:left-32 top-4 md:top-8 w-36 h-48 md:w-48 md:h-64 lg:w-56 lg:h-72 object-contain rotate-[5deg] z-20 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop&q=80",
        alt: "Grocery",
        className: "absolute right-2 md:right-8 lg:right-12 top-16 md:top-20 w-32 h-40 md:w-40 md:h-48 lg:w-48 lg:h-56 object-contain rotate-[15deg] z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&q=80",
        alt: "Watch",
        className: "absolute right-8 md:right-16 lg:right-20 bottom-8 md:bottom-12 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain rotate-[-8deg] z-15 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      },
      {
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80",
        alt: "Headphones",
        className: "absolute left-8 md:left-12 bottom-4 md:bottom-8 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain rotate-[12deg] z-5 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
      }
    ]
  }
];

export default function HomeSlider() {
  const swiperRef = useRef(null);

  return (
    <div className="px-4 md:px-5 mb-5">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        className="home-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-[#f0f9f1] rounded-3xl border border-[#2bb673] p-6 md:p-8 lg:p-12 relative overflow-hidden min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
              {/* Content Section */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-full relative z-30">
                {/* Left Side - Text Content */}
                <div className="w-full md:w-1/2 lg:w-2/5 mb-6 md:mb-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-6 md:mb-8">
                    {slide.subtext}
                  </p>
                  <button className="bg-[#2bb673] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-[#239d5f] transition-colors duration-300 border border-[#2bb673]">
                    Get Started
                  </button>
                </div>

                {/* Right Side - Product Images */}
                <div className="w-full md:w-1/2 lg:w-3/5 relative h-[280px] md:h-[380px] lg:h-[450px] overflow-visible">
                  {slide.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-white/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`${image.className} bg-white/80 backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-lg`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Next Button */}
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="swiper-button-next-custom absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#2bb673] bg-white flex items-center justify-center hover:bg-[#f0f9f1] transition-colors duration-300 shadow-md"
                aria-label="Next slide"
              >
                <i className="bi bi-chevron-right text-[#2bb673] text-xl md:text-2xl"></i>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
