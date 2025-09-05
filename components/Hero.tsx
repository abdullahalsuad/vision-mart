"use client";
import Image from "next/image";
import bgImage1 from "@/public/images/hero_bg_1.jpeg";
import bgImage2 from "@/public/images/hero_bg_2.jpeg";
import bgImage3 from "@/public/images/hero_bg_3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const slides = [
    {
      title: "Discover Amazing Products",
      desc: "Premium quality electronics and accessories at unbeatable prices. Transform your lifestyle with VisionMart.",
      img: bgImage1,
    },
    {
      title: "Latest Tech Arrivals",
      desc: "Stay ahead with cutting-edge gadgets and exclusive deals only at VisionMart.",
      img: bgImage2,
    },
    {
      title: "Shop Smart, Live Better",
      desc: "Enjoy the best offers on electronics, fashion, and accessories with us.",
      img: bgImage3,
    },
  ];

  return (
    <section className="relative py-6 pt-2 bg-transparent text-center text-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            {/* Background Image with Overlay */}
            <div className="relative flex items-center justify-center h-[400px]">
              <Image
                src={slide.img}
                alt="Hero Background"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-[#00000050] rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 max-w-3xl px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-100">
                  {slide.desc}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-3 rounded-xl bg-white text-[#009688] font-semibold shadow hover:bg-gray-100 transition">
                    Shop Now
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-white text-[#009688] font-semibold shadow hover:bg-gray-100 transition">
                    View Categories
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
