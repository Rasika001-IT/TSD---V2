import sidebarImg from "../../assets/images/featured/sidebar.png";

const SmallArticleCard = () => {
  return (
    <div>
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={sidebarImg}
          alt="AMC Article"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="mt-4 text-lg font-heading font-semibold leading-snug">
        AMC Entertainment Pursues $2.5 Billion Refinancing to Address
      </h3>

      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        AMC Entertainment Holdings Inc., the U.S.-based movie theatre chain, has begun marketing a existing...
      </p>
    </div>
  );
};

export default SmallArticleCard;