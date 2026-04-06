import Container from "../layout/Container";
import heroImage from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <section className="pt-20 pb-24 bg-[#C89632]/5">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* TAG */}
            <span className="inline-block bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
              Cover Story
            </span>

            {/* HEADING */}
            <h1 className="font-heading text-[56px] leading-[1.1] mt-6">
              The Future of <br />
              <span className="text-[#C89632]">
                Business Leadership
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-[15px] text-black/70 max-w-lg leading-relaxed">
              Discover how visionary leaders are reshaping industries and
              creating sustainable growth in an ever-evolving global
              marketplace.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex items-center gap-4">

              <button className="bg-black text-white px-6 py-3 text-[14px] rounded-md hover:bg-black/80 transition">
                Read full story →
              </button>

              <button className="border border-black px-6 py-3 text-[14px] rounded-md hover:bg-black hover:text-white transition">
                Explore Magazine
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE + FLOATING CARD */}
          <div className="relative">

            {/* IMAGE */}
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-[480px] object-cover"
            />

            {/* FLOATING CARD */}
            <div className="absolute -bottom-10 left-[-60px] bg-[#F4F4F4] p-6 w-[300px] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">

              <p className="text-xs text-black/50 mb-3">
                Featured
              </p>

              <p className="text-[15px] leading-snug mb-4 text-black">
                “Kamiya Jani's Blueprint for Modern Media Success.”
              </p>

              <p className="text-[13px] text-[#C89632] leading-snug">
                Founder and editor in Chief <br />
                Curly Tales
              </p>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;