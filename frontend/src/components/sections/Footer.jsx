import Container from "../layout/Container";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo-footer.png";
import fb from "../../assets/icons/facebook.svg";
import tw from "../../assets/icons/twitter.svg";
import ig from "../../assets/icons/instagram.svg";
import li from "../../assets/icons/linkedin.svg";
import arrow from "../../assets/icons/arrow-footer.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0E1420] text-white pt-16">

      <Container>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 pb-16">

          {/* LEFT: LOGO BLOCK */}
          <div className="flex flex-col gap-3 w-full md:w-[260px]">

            <img src={logo} alt="logo" className="h-12 w-auto mb-1" />

            <div className="flex gap-4">

  {/* Facebook (no link yet) */}
  <img
    src={fb}
    className="w-6 h-6 opacity-70 hover:opacity-100 transition cursor-pointer"
    alt="Facebook"
  />

  {/* Twitter / X */}
  <a
    href="https://x.com/TheSucessDigest"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={tw}
      className="w-6 h-6 opacity-70 hover:opacity-100 transition cursor-pointer"
      alt="Twitter"
    />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/thesuccess_digest/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={ig}
      className="w-6 h-6 opacity-70 hover:opacity-100 transition cursor-pointer"
      alt="Instagram"
    />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/company/the-success-digest/?viewAsMember=true"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={li}
      className="w-6 h-6 opacity-70 hover:opacity-100 transition cursor-pointer"
      alt="LinkedIn"
    />
  </a>

</div>

            <button className="bg-white text-black px-7 py-3 text-[14px] rounded-md font-medium w-fit mt-1">
              Subscribe
            </button>

          </div>

          {/* RIGHT: LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 flex-1">

            <div>
              <h4 className="font-heading text-[20px] mb-5">More from TSD</h4>
              <ul className="space-y-3 text-[14px] text-white/60">
                <li>Newsletter Sign Up</li>
                <li>EI Club</li>
                <li>Careers</li>
                <li>Our Team</li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-[20px] mb-5">About</h4>
              <ul className="space-y-3 text-[14px] text-white/60">
                <li><Link to="/about">
    About Us
  </Link></li>
                <li>Media Kit</li>
                <li>Contact</li>
                <li>Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-[20px] mb-5">Press</h4>
              <ul className="space-y-3 text-[14px] text-white/60">
                <li>Press Room</li>
                <li>
  <Link to="/contact">
    Contact Us
  </Link>
</li>
                <li><Link to="/advertise">Advertising</Link></li>
                <li>Subscriptions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-[20px] mb-5">Quick Links</h4>
              <ul className="space-y-3 text-[14px] text-white/60">
                <li>Home</li>
                <li>News</li>
                <li>Blogs</li>
                <li>Magazine</li>
                <li>Featured Articles</li>
                <li>Women in Business</li>
              </ul>
            </div>

          </div>

        </div>

      </Container>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-5 text-sm text-white/50">

        <Container>

          <div className="flex items-center justify-between">

            <p>© The Success Digest. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/content-usage-policy">Terms of Service</Link>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition">
              <img src={arrow} className="w-4 opacity-70" />
              </button>
            </div>

          </div>

        </Container>

      </div>

    </footer>
  );
};

export default Footer;