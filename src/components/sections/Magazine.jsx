import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { useRef } from "react";

import Container from "../layout/Container";

import img1 from "../../assets/images/magazine/mag-1.png";
import img2 from "../../assets/images/magazine/mag-2.png";
import img3 from "../../assets/images/magazine/mag-3.png";
import img4 from "../../assets/images/magazine/mag-4.png";

import leftArrow from "../../assets/icons/arrow-left.svg";
import rightArrow from "../../assets/icons/arrow-right.svg";

const magazineItems = [
  { image: img1, title: "Most Prominent Leader to Follow in 2025" },
  { image: img2, title: "Most Inspiring Leader in 2025" },
  { image: img3, title: "Most Visionary Woman Leader in 2025" },
  { image: img4, title: "Most Innovative Entrepreneur of Year 2025" },
];

const Magazine = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-[#C89632]/5 py-20">

      <Container>

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
            Latest Issues
          </span>

          <h2 className="font-heading font-bold text-4xl mt-4">
            The Magazine
          </h2>

          <div className="w-16 h-[2px] bg-[#C89632] mx-auto mt-3"></div>
        </div>

        {/* SLIDER */}
        <div className="relative">

          {/* LEFT ARROW */}
          <button
            ref={prevRef}
            className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10"
          >
            <img src={leftArrow} className="w-6 h-6 opacity-70 hover:opacity-100 transition" />
          </button>

          {/* RIGHT ARROW */}
          <button
            ref={nextRef}
            className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10"
          >
            <img src={rightArrow} className="w-6 h-6 opacity-70 hover:opacity-100 transition" />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={4}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {magazineItems.map((item, index) => (
              <SwiperSlide key={index}>

                <div className="text-center cursor-pointer">

                  {/* ✅ EXACT FIGMA RATIO */}
                  <img
                    src={item.image}
                    alt="magazine"
                    className="w-full aspect-[291/372] object-cover"
                  />

                  <p className="font-heading font-semibold text-[15px] mt-4 leading-snug px-2">
                    {item.title}
                  </p>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-12">
            <button className="bg-black text-white px-6 py-3 text-sm rounded-[5px] hover:opacity-80 transition">
                Subscribe to Print + Digital
            </button>
        </div>

      </Container>

    </section>
  );
};

export default Magazine;