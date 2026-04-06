import sampleImg from "../../assets/images/article.png";

const NewsCardVertical = () => {
  return (
    <div className="cursor-pointer group transition-all duration-300 hover:opacity-90 space-y-2">

      {/* IMAGE */}
      <img
        src={sampleImg}
        alt="news"
        className="w-full h-[170px] object-cover rounded-sm transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />

      {/* CONTENT */}
      <h3 className="font-heading text-[15px] leading-[1.5] group-hover:underline">
        AMC Entertainment Pursues $2.5 Billion Refinancing to Address Existing Debt
      </h3>

      <p className="font-body text-[13.5px] text-gray-600 leading-[1.6]">
        AMC Entertainment Holdings Inc., the U.S.-based movie theatre chain,
        has begun marketing a refinancing package...
      </p>

    </div>
  );
};

export default NewsCardVertical;