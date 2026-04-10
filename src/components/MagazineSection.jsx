import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { useRef } from "react";
import { Link } from "react-router-dom";

import Container from "./layout/Container";

import leftArrow from "../assets/icons/arrow-left.svg";
import rightArrow from "../assets/icons/arrow-right.svg";

const MagazineSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // ✅ REAL MAGAZINE DATA WITH SLUGS
  const magazines = [
    { 
      id: 1,
      title: "Kamiya Jani",
      slug: "kamiya-jani",
      image:
        "https://thesuccessdigest.com/wp-content/uploads/2025/12/Kamiya-Jani-Magazine-1.jpg",
    },
    {
      id: 2,
      title: "Georgios Matis",
      slug: "georgios-matis",
      image:
        "https://thesuccessdigest.com/wp-content/uploads/2025/10/Georgios-Matis-Magazine-1-791x1024.png",
    },
    {
      id: 3,
      title: "Zarine Manchanda",
      slug: "zarine-manchanda",
      image:
        "https://thesuccessdigest.com/wp-content/uploads/2025/08/Zarine-Manchanda-Magazine-1-791x1024.png",
    },
    {
      id: 4,
      title: "Rob Whitfield",
      slug: "rob-whitfield",
      image:
        "https://thesuccessdigest.com/wp-content/uploads/2025/08/Rob-Whitfield-Magazine-1-791x1024.png",
    },
    {
      id: 5,
      title: "Tia Latrell",
      slug: "tia-latrell",
      image:
        "https://thesuccessdigest.com/wp-content/uploads/2025/07/Tia-Latrell-Magazine-.png",
    },
    {
     id: 6,
      title: "Naphtali",
      slug: "naphtali",
      image:
        "https://thesuccessdigest.com/wp-content/uploads/2025/07/Naphtali-Magazine-1-3.png",
    },
    {
      id: 7,
      title: "Kristin",
      slug: "kristin",
      image:
        "https://thesuccessdigest.com/wp-content/uploads/2025/07/Kristin-Magazine-1-2-791x1024.png",
    },
  ];

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
            <img
              src={leftArrow}
              alt="prev"
              className="w-6 h-6 opacity-70 hover:opacity-100 transition"
            />
          </button>

          {/* RIGHT ARROW */}
          <button
            ref={nextRef}
            className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10"
          >
            <img
              src={rightArrow}
              alt="next"
              className="w-6 h-6 opacity-70 hover:opacity-100 transition"
            />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {magazines.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/article/${item.slug}`}>
                  <div className="text-center cursor-pointer hover:opacity-80 transition">

                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-[291/372] object-cover"
                    />

                    {/* TITLE */}
                    <p className="font-heading font-semibold text-[15px] mt-4 leading-snug px-2">
                      {item.title}
                    </p>

                  </div>
                </Link>
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

export default MagazineSection;