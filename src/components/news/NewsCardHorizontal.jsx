import sampleImg from "../../assets/images/article.png";

const NewsCardHorizontal = () => {
  return (
    <div className="flex gap-8 items-start cursor-pointer group transition-all duration-300 hover:opacity-90">

      {/* IMAGE */}
      <img
        src={sampleImg}
        alt="news"
        className="w-[260px] h-[170px] object-cover flex-shrink-0 rounded-sm transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      {/* CONTENT */}
      <div className="max-w-[520px]">

        <h3 className="font-heading text-[18px] leading-[1.4] mb-2 group-hover:underline">
          AMC Entertainment Pursues $2.5 Billion Refinancing to Address Existing Debt
        </h3>

        <p className="font-body text-[14px] text-gray-600 leading-[1.6] mb-2">
          AMC Entertainment Holdings Inc., the U.S.-based movie theatre chain,
          has begun marketing a refinancing package totaling approximately $2.5 billion...
        </p>

        <span className="font-body text-[12px] text-gray-400">
          7 hours ago
        </span>

      </div>

    </div>
  );
};

export default NewsCardHorizontal;