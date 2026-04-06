import Container from "../layout/Container";

import markets from "../../assets/images/more-sections/markets.png";
import industry from "../../assets/images/more-sections/industry.png";
import regulations from "../../assets/images/more-sections/regulations.png";
import sports from "../../assets/images/more-sections/sports.png";
import startups from "../../assets/images/more-sections/startups.png";
import technology from "../../assets/images/more-sections/technology.png";
import healthcare from "../../assets/images/more-sections/healthcare.png";
import realestate from "../../assets/images/more-sections/realestate.png";

const sections = [
  {
    title: "Markets",
    image: markets,
    heading:
      "AI Revolution: How Machine Learning is Transforming Business Operations",
    points: [
      "Tech giants announce record quarterly earnings amid market uncertainty.",
      "The future of remote work : New tools reshaping the workspace.",
      "Cybersecurity trends every business leader should know.",
    ],
  },
  {
    title: "Industry",
    image: industry,
    heading:
      "Global Markets Rally as Investors Gain Confidence in Economic Recovery.",
    points: [
      "Central bank signal cautious approach to interest rate decisions",
      "Emerging market shows resilience despite global headwinds",
      "Cryptocurrency volatility continues as regulations tighten",
    ],
  },
  {
    title: "Regulations",
    image: regulations,
    heading:
      "CEO Spotlight: The Visionaries Driving Innovation in 2026.",
    points: [
      "Executives' strategies for navigating uncertain economic times",
      "How top leaders from prioritizing sustainability initiatives",
      "The rise of servant leadership in modern corporations",
    ],
  },
  {
    title: "Sports",
    image: sports,
    heading:
      "Unicorn Watch: The Startups Poised to Reach Billion-Dollar Valuations.",
    points: [
      "Venture capital funding rebounds with focus on AI and climate tech",
      "Founder stories: From garage to the global success",
      "The startup ecosystem's most promising sectors for 2026",
    ],
  },
  {
    title: "Startups",
    image: startups,
    heading:
      "Commercial real estate adapts to hybrid work revolution.",
    points: [
      "Housing market trends: what buyers need to know this year",
      "Smart building technology transforming property management",
      "Investment opportunities in sustainable real estate",
    ],
  },
  {
    title: "Technology",
    image: technology,
    heading:
      "Executive Travel: The Best Business Destinations for 2026",
    points: [
      "Work-life balance strategies from top executives",
      "The rise of wellness programs in corporate culture",
      "Luxury trades what high-net-worth individuals are investing in",
    ],
  },
  {
    title: "Healthcare",
    image: healthcare,
    heading:
      "It's good to travel to the best business destinations for 2026.",
    points: [
      "Executives' strategies for navigating uncertain economic times",
      "How top leaders from prioritizing sustainability initiatives",
      "The rise of servant leadership in modern corporations",
    ],
  },
  {
    title: "Real Estate",
    image: realestate,
    heading:
      "Unicorn Watch: The Startups Poised to Reach Billion-Dollar Valuations.",
    points: [
      "Venture capital funding rebounds with focus on AI and climate tech",
      "Founder stories: From garage to the global success",
      "The startup ecosystem's most promising sectors for 2026",
    ],
  },
];

const MoreSections = () => {
  return (
    <section className="bg-[#C89632]/5 py-20">
      <Container>

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-4xl">
            More Sections
          </h2>
          <div className="w-16 h-[2px] bg-[#C89632] mx-auto mt-3"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#000]/10">

          {sections.map((item, index) => (
            <div
              key={index}
              className="p-6 border-r border-b border-[#000]/10 last:border-r-0"
            >

              {/* CATEGORY */}
              <p className="text-xs uppercase tracking-wide mb-3 font-semibold text-[#444]">
                {item.title} →
              </p>

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[180px] object-cover mb-4"
              />

              {/* HEADING */}
              <h3 className="font-heading font-semibold text-[18px] leading-snug mb-3">
                {item.heading}
              </h3>

              {/* BULLETS */}
              <ul className="space-y-2 text-[14px] text-[#666]">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
};

export default MoreSections;