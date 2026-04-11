import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ui/ScrollToTop";

import Home from "./pages/Home";
import News from "./pages/News";
import Blogs from "./pages/Blogs";
import Magazine from "./pages/Magazine";
import Featured from "./pages/Featured";
import WomenInBusiness from "./pages/WomenInBusiness";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ArticlePage from "./pages/ArticlePage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import ContentUsagePolicy from "./pages/ContentUsagePolicy";
import Advertise from "./pages/Advertise";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/women-in-business" element={<WomenInBusiness />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/content-usage-policy" element={<ContentUsagePolicy />} />
        <Route path="/advertise" element={<Advertise />} />
      </Routes>
    </Router>
  );
}

export default App;