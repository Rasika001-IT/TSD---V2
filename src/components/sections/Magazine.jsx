import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { useRef } from "react";
import { Link } from "react-router-dom";

import Container from "../layout/Container";
import usePosts from "../../hooks/usePosts";

import leftArrow from "../../assets/icons/arrow-left.svg";
import rightArrow from "../../assets/icons/arrow-right.svg";

const Magazine = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { posts, loading } = usePosts();

  if (loading) return null;

  const magazinePosts = posts.slice(0, 6); // ✅ 6 items

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
              className="w-6 h-6 opacity-70 hover:opacity-100 transition"
              alt="prev"
            />
          </button>

          {/* RIGHT ARROW */}
          <button
            ref={nextRef}
            className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10"
          >
            <img
              src={rightArrow}
              className="w-6 h-6 opacity-70 hover:opacity-100 transition"
              alt="next"
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
            {magazinePosts.map((post) => (
              <SwiperSlide key={post.id}>
                <Link to={`/article/${post.slug}`}>
                  <div className="text-center cursor-pointer hover:opacity-80 transition">

                    {/* IMAGE */}
                    {post.image && (
                      <img
                        src={post.image}
                        alt="magazine"
                        className="w-full aspect-[291/372] object-cover"
                      />
                    )}

                    {/* TITLE */}
                    <p
                      className="font-heading font-semibold text-[15px] mt-4 leading-snug px-2"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    {/* EXCERPT */}
                    <div
                      className="text-xs text-black/60 mt-2 line-clamp-2 px-2"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />

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

export default Magazine;