import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import FeaturedLayout from "../components/featured/FeaturedLayout";
import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";

const Featured = () => {
  return (
    <div className="bg-[#C89632]/5 min-h-screen">
      <Navbar />

      <Container>
        <h1 className="text-4xl font-heading font-bold mt-12 mb-10">
          Featured Articles
        </h1>

        <FeaturedLayout />
      </Container>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Featured;