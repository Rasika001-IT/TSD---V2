const CategoryList = () => {
  return (
    <div className="bg-white px-10 py-6 shadow-md">
      
      {/* Centered Content Wrapper */}
      <div className="max-w-[240px] mx-auto">

        {/* Heading */}
        <h3 className="text-lg font-heading font-semibold mb-4">
          All Categories
        </h3>

        {/* News */}
        <div className="mb-4">
          <p className="text-base font-heading font-semibold">News (515)</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>Breaking news (265)</li>
            <li>Crypto (17)</li>
            <li>Industries (185)</li>
            <li>Markets (200)</li>
            <li>Regulations (48)</li>
            <li>Sports (11)</li>
            <li>Startups (3)</li>
          </ul>
        </div>

        {/* Blogs */}
        <div className="mb-4">
          <p className="text-base font-heading font-semibold">Blogs (151)</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>Crypto (19)</li>
            <li>Events (22)</li>
            <li>Explainers (64)</li>
            <li>How to (32)</li>
            <li>Lifestyle (61)</li>
            <li>Sports (14)</li>
            <li>Travel (11)</li>
          </ul>
        </div>

        {/* Other Categories */}
        <div className="space-y-2">
          <p className="text-base font-heading font-semibold">
            Magazine (7)
          </p>
          <p className="text-base font-heading font-semibold">
            Featured Articles (7)
          </p>
          <p className="text-base font-heading font-semibold">
            Women of Impact (5)
          </p>
        </div>

      </div>
    </div>
  );
};

export default CategoryList;