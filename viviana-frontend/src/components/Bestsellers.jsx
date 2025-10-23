import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../ProductContext";
import ProductModal from "../components/ProductModel";

const Bestsellers = () => {
  const { products, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!Array.isArray(products)) {
    return <p className="p-4 text-red-600">Failed to load products.</p>;
  }

  const featured = products.slice(0, 8); // First 8 products

  return (
    <section className="relative py-12 lg:pt-20 px-6">
      {/* Background Text */}
      <img
        src="assets/bg_elements/bestsellers.png"
        className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-7xl opacity-6 z-0"
        alt="Bestsellers Background"
      />

      {/* Title */}
      <div className="text-center relative z-10">
        <p className="text-[#596980] text-lg uppercase font-Montserrat">
          Premium Quality
        </p>
        <img
          src="assets/bg_elements/line1.png"
          className="mx-auto my-2 w-32 md:w-96"
          alt="Line"
        />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-roxborough text-[#5b0058] font-bold">
          Our Bestsellers
        </h2>
      </div>

      {/* Swiper Container */}
      <div className="relative my-16 px-14">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".button-next",
            prevEl: ".button-prev",
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="px-6 md:px-10 lg:px-24"
        >
          {featured.map((product) => (
            <SwiperSlide
              key={product.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={
                  product.images?.length > 0
                    ? `http://localhost:5000${product.images[0]}`
                    : "https://via.placeholder.com/300x300?text=No+Image"
                }
                className="w-full h-96 object-cover rounded-lg"
                alt={product.name}
              />
              <h3 className="text-lg font-bold mt-4 text-[#a22311]">
                {product.name}
              </h3>
              {/* You can remove this if `price` is not available */}
              {/* <p className="text-sm text-gray-600">{product.price}</p> */}
              <button className="button-1 mt-2 w-30">View</button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="button-prev absolute top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer text-2xl text-[#5b0058]">
          <ChevronLeft />
        </div>
        <div className="button-next absolute top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer text-2xl text-[#5b0058]">
          <ChevronRight />
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default Bestsellers;
