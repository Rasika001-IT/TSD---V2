import Container from "../layout/Container";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardVertical from "./NewsCardVertical";

const NewsList = ({ horizontalPosts, verticalPosts }) => {
  return (
    <section className="mt-20 mb-10">
      <Container>

        <div className="grid grid-cols-[2.2fr_1fr] gap-14">

          <div className="flex flex-col gap-12">
            {horizontalPosts.map((post) => (
              <NewsCardHorizontal key={post.id} post={post} />
            ))}
          </div>

          <div className="flex flex-col gap-12 border-l border-gray-200 pl-12 mt-[2px]">
            {verticalPosts.map((post) => (
              <NewsCardVertical key={post.id} post={post} />
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default NewsList;