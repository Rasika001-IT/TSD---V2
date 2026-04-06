import Container from "../layout/Container";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardVertical from "./NewsCardVertical";

const NewsList = () => {
  return (
    <section className="mt-20 mb-10">
      <Container>

        <div className="grid grid-cols-[2.2fr_1fr] gap-14">

          {/* LEFT */}
          <div className="flex flex-col gap-12">
            {[1, 2, 3, 4].map((item) => (
              <NewsCardHorizontal key={item} />
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-12 border-l border-gray-200 pl-12 mt-[2px]">
            {[1, 2].map((item) => (
              <NewsCardVertical key={item} />
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default NewsList;