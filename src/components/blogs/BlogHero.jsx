import Container from "../layout/Container";
import heroImg from "../../assets/images/blogpage/hero.png";

const BlogHero = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="relative h-[460px]">
          
          {/* IMAGE */}
          <div className="absolute right-0 top-0 w-[65%] h-full">
            <img
              src={heroImg}
              alt="Featured Blog"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CARD */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] bg-white/70 backdrop-blur-xl px-14 py-12 rounded-md shadow-xl text-center">
  
  <h1 className="font-heading text-4xl lg:text-[42px] leading-tight mb-5 font-bold">
    AMC Entertainment Pursues $2.5 Billion Refinancing to Address Existing Debt
  </h1>

  <p className="text-gray-600 text-[15px] font-body leading-relaxed max-w-[560px] mx-auto">
    AMC Entertainment Holdings Inc., the U.S.-based movie theatre chain,
    has begun marketing a refinancing package totaling approximately $2.5 billion.
  </p>

</div>

        </div>
      </Container>
    </section>
  );
};

export default BlogHero;