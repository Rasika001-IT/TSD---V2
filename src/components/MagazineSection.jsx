import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "./layout/Container";

import leftArrow from "../assets/icons/arrow-left.svg";
import rightArrow from "../assets/icons/arrow-right.svg";

const MagazineSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    const fetchMagazinePage = async () => {
      try {
        const res = await fetch(
          "https://thesuccessdigest.com/wp-json/wp/v2/pages/3193"
        );

        const data = await res.json();

        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content.rendered, "text/html");

        const items = Array.from(doc.querySelectorAll("a"))
  .map((anchor, index) => {
    const img = anchor.querySelector("img");

    if (!img) return null;

    const href = anchor.href;

    const slug = href
      .replace("https://thesuccessdigest.com/", "")
      .replaceAll("/", "");

    const formattedTitle =
      img.alt?.trim() ||
      slug
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");

    return {
      id: index,
      title: formattedTitle,
      image: img.src,
      slug,
      originalUrl: href,
    };
  })
  .filter(Boolean);

        setMagazines(items);
      } catch (err) {
        console.error("Failed to fetch magazine data:", err);
      }
    };

    fetchMagazinePage();
  }, []);

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
                <Link to={`/magazine/${item.slug}`}>
                  <div className="text-center cursor-pointer hover:opacity-80 transition">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-[291/372] object-cover"
                    />

                    <p className="font-heading font-semibold text-[15px] mt-4 leading-snug px-2">
                      {item.title}
                    </p>

                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

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