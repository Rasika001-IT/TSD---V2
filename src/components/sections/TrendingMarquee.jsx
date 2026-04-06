import "./marquee.css";
import trendingIcon from "../../assets/icons/trending.svg";

const trendingItems = [
  {
    title: "Global Markets Rally on Fed Signals of Rate Pause",
    time: "2 hours ago",
  },
  {
    title: "AI Startup Raise Record $2B in Series C Funding",
    time: "4 hours ago",
  },
  {
    title: "Fortune 500 CEO Announces Surprise Resignation",
    time: "5 hours ago",
  },
  {
    title: "Inflation Data Shows Promising Signs of Cooling",
    time: "6 hours ago",
  },
];

const TrendingMarquee = () => {
  return (
    <section className="bg-[#0E1116] text-white py-10 overflow-hidden">

      {/* LABEL */}
      <div className="flex items-center gap-2 px-8 text-[#C89632] text-sm font-medium mb-6">
        <img src={trendingIcon} alt="trending" className="w-4 h-4" />
        TRENDING
      </div>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">

          {[...trendingItems, ...trendingItems].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 mr-3 min-w-[320px]"
            >
              {/* NUMBER */}
              <span className="text-[#C89632] text-[32px] font-heading leading-none">
                {String((index % trendingItems.length) + 1).padStart(2, "0")}
              </span>

              {/* TEXT */}
              <div className="max-w-[240px]">
                <p className="font-heading font-bold text-[16px] leading-[1.3]">
                  {item.title}
                </p>
                <p className="text-xs text-white/50 mt-2">
                  {item.time}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default TrendingMarquee;