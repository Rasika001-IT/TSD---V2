import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "../layout/Container";

import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/icons/search.svg";

const navLinks = [
  { name: "Home", path: "/" },

  {
    name: "News",
    path: "/news",
    dropdown: [
      { name: "Regulations", path: "/news/regulations" },
      { name: "Sports", path: "/news/sports" },
      { name: "Startups", path: "/news/startups" },
      { name: "Breaking News", path: "/news/breaking-news" },
      { name: "Crypto", path: "/news/crypto" },
      { name: "Industries", path: "/news/industries" },
      { name: "Markets", path: "/news/markets" },
    ],
  },

  {
    name: "Blogs",
    path: "/blogs",
    dropdown: [
      { name: "Explainers", path: "/blogs/explainers" },
      { name: "How To", path: "/blogs/how-to" },
      { name: "Lifestyle", path: "/blogs/lifestyle" },
      { name: "Sports", path: "/blogs/sports" },
      { name: "Travel", path: "/blogs/travel" },
      { name: "Events", path: "/blogs/events" },
      { name: "Crypto", path: "/blogs/crypto-blogs" },
    ],
  },

  { name: "Magazine", path: "/magazine" },

  { name: "Featured Articles", path: "/featured" },

  { name: "Women in Business", path: "/women-in-business" },

  {
    name: "About Us",
    path: "/about",
    dropdown: [
      { name: "About Us", path: "/about" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Advertise With Us", path: "/advertise" },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f9f6ef]/80 backdrop-blur-md shadow-sm"
          : "bg-[#f9f6ef]"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-[72px]">

          <div className="flex items-center gap-10">

            <NavLink to="/">
              <img
                src={logo}
                alt="The Success Digest"
                className="h-14 w-auto object-contain cursor-pointer"
              />
            </NavLink>

            <nav className="hidden lg:flex items-center gap-8 font-body text-[14px]">

              {navLinks.map((link, index) => (
                <div key={index} className="relative group">

                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative ${isActive ? "font-semibold" : ""}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}

                        <span
                          className={`absolute left-0 -bottom-1 h-[1px] bg-black transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </>
                    )}
                  </NavLink>

                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-4 w-[190px] bg-[#FFFFFF] shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

                      <div className="py-3 px-4 flex flex-col gap-3 text-[#1D1F26]">

                        {link.dropdown.map((item, i) => (
                          <NavLink
                            key={i}
                            to={item.path}
                            className="hover:translate-x-1 transition-all duration-200"
                          >
                            {item.name}
                          </NavLink>
                        ))}

                      </div>

                    </div>
                  )}

                </div>
              ))}

            </nav>

          </div>

          <div className="flex items-center gap-6">

            <div className="flex items-center bg-white/70 border border-gray-200 rounded-md px-3 py-1.5">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-[13px] w-32 placeholder-gray-500"
              />

              <img
                src={searchIcon}
                alt="Search"
                className="w-4 h-4 ml-2 opacity-70"
              />
            </div>

            <button className="bg-black text-white px-4 py-2 text-[13px] rounded-md hover:bg-black/80 transition">
              Subscribe
            </button>

          </div>

        </div>
      </Container>
    </header>
  );
};

export default Navbar;