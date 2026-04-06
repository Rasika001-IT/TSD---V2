import sampleImg from "../../assets/images/hero.png";
import Container from "../layout/Container";

const NewsHero = () => {
  return (
    <section className="pt-16 pb-12">
      <Container>

        <div className="max-w-[820px] mx-auto text-center">
          <h1 className="font-heading font-bold text-[36px] leading-[1.25] mb-4">
            AMC Entertainment Pursues $2.5 Billion Refinancing to Address Existing Debt
          </h1>

          <p className="font-body text-[15px] text-gray-600 leading-[1.6] mb-10">
            AMC Entertainment Holdings Inc., the U.S.-based movie theatre chain,
            has begun marketing a refinancing package totaling approximately $2.5 billion...
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={sampleImg}
            alt="news"
            className="w-full max-w-[1000px] h-[480px] object-cover rounded-sm"
          />
        </div>

      </Container>
    </section>
  );
};

export default NewsHero;