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
import CategoryPage from "./pages/CategoryPage";
import ArchivePage from "./pages/ArchivePage";
import AuthorPage from "./pages/AuthorPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/magazine/:slug" element={<ArticlePage />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/women-in-business" element={<WomenInBusiness />} />
        <Route path="/women-in-business/:slug" element={<ArticlePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/content-usage-policy" element={<ContentUsagePolicy />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/news/:category" element={<CategoryPage />} />
        <Route path="/blogs/:category" element={<CategoryPage />} />
        <Route
  path="/category/:slug"
  element={<ArchivePage />}
/>

<Route
  path="/tag/:slug"
  element={<ArchivePage />}
/>

<Route
  path="/author/:slug"
  element={<AuthorPage />}
/>
      </Routes>
    </Router>
  );
}

export default App;