import Container from "../layout/Container";

import mainImg from "../../assets/images/business/business-main.png";
import img1 from "../../assets/images/business/business-1.png";
import img2 from "../../assets/images/business/business-2.png";
import img3 from "../../assets/images/business/business-3.png";
import img4 from "../../assets/images/business/business-4.png";
import img5 from "../../assets/images/business/business-5.png";

const BusinessFinance = () => {
  return (
    <section className="bg-[#C89632]/5 py-24">

      <Container>

        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">

          <div className="flex flex-col gap-4">
            <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest w-fit">
              Latest Stories
            </span>

            <h2 className="font-heading font-bold text-4xl">
              Business & Finance
            </h2>
          </div>

          <button className="text-sm font-medium hover:opacity-70 transition">
            View All Articles
          </button>

        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

          {/* LEFT SIDE */}
          <div>

            {/* MAIN ARTICLE */}
            <img
              src={mainImg}
              alt="main"
              className="w-full h-[420px] object-cover"
            />

            <h3 className="font-heading font-semibold text-2xl mt-6 leading-snug">
              Iran’s Supreme Leader Threatens Israel and U.S. with ‘A Crushing Response’ Over Israeli Attack
            </h3>

            <p className="text-xs text-black/60 mt-3">
              By Kelly Phillips Erb | TSD Staff
            </p>

            {/* DIVIDER */}
            <div className="border-t border-black/10 my-6"></div>

            {/* BOTTOM GRID */}
            <div className="grid grid-cols-2 gap-6">

              <div>
                <img
                  src={img1}
                  alt=""
                  className="w-full h-[190px] object-cover"
                />
                <p className="font-heading text-sm mt-3">
                  Syrian Conflict Escalation
                </p>
                <p className="text-xs text-black/60 mt-1">
                  By Steve Forbes | TSD Staff
                </p>
              </div>

              <div>
                <img
                  src={img2}
                  alt=""
                  className="w-full h-[190px] object-cover"
                />
                <p className="font-heading text-sm mt-3">
                  India Reaffirms Palestinian Support
                </p>
                <p className="text-xs text-black/60 mt-1">
                  By Brandon Kochkodin | TSD Staff
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="border-l border-black/10 pl-6 flex flex-col gap-8">

            {/* ARTICLE 1 */}
            <div>
              <img
                src={img3}
                alt=""
                className="w-full h-[190px] object-cover"
              />
              <p className="font-heading text-sm mt-3">
                Syrian Conflict Escalation
              </p>
              <p className="text-xs text-black/60 mt-1">
                By Steve Forbes | TSD Staff
              </p>
            </div>

            {/* ARTICLE 2 */}
            <div>
              <img
                src={img4}
                alt=""
                className="w-full h-[190px] object-cover"
              />
              <p className="font-heading text-sm mt-3">
                India Reaffirms Palestinian Support
              </p>
              <p className="text-xs text-black/60 mt-1">
                By Brandon Kochkodin | TSD Staff
              </p>
            </div>

            {/* ARTICLE 3 */}
            <div>
              <img
                src={img5}
                alt=""
                className="w-full h-[190px] object-cover"
              />
              <p className="font-heading text-sm mt-3">
                India Reaffirms Palestinian Support
              </p>
              <p className="text-xs text-black/60 mt-1">
                By Brandon Kochkodin | TSD Staff
              </p>
            </div>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default BusinessFinance;