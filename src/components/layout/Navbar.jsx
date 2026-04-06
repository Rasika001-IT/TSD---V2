import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "../layout/Container";

import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/icons/search.svg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "Blogs", path: "/blogs" },
  { name: "Magazine", path: "/magazine" },
  { name: "Featured Articles", path: "/featured" },
  { name: "Women in Business", path: "/women-in-business" },
  { name: "About Us", path: "/about" }, 
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

          {/* LEFT */}
          <div className="flex items-center gap-10">

            {/* LOGO CLICK → HOME */}
            <NavLink to="/">
              <img
                src={logo}
                alt="The Success Digest"
                className="h-14 w-auto object-contain cursor-pointer"
              />
            </NavLink>

            <nav className="hidden lg:flex items-center gap-8 font-body text-[14px]">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative group ${
                      isActive ? "font-semibold" : ""
                    }`
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
              ))}
            </nav>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">

            {/* ✅ Search Bar */}
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

            {/* Subscribe Button */}
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