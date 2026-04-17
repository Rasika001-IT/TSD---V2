import Container from "../layout/Container";

const Newsletter = () => {
  return (
    <section className="bg-[#FCF9F4] py-24 text-center">
      <Container>
        
        {/* TITLE */}
        <h2 className="font-heading font-bold text-4xl">
          Sign Up for the TSD Newsletter
        </h2>

        {/* SUBTEXT */}
        <p className="text-black/70 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
          Get the latest business news, informative insight, business strategies,
          technological hacks, culture reviews, innovations directly in your inbox.
        </p>

        {/* FORM */}
        <div className="flex justify-center items-center gap-10 mt-12 flex-wrap">

          {/* NAME */}
          <input
            type="text"
            placeholder="Enter your name"
            className="bg-transparent border-b border-black/40 w-[280px] pb-2 outline-none text-sm placeholder:text-black/50"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent border-b border-black/40 w-[280px] pb-2 outline-none text-sm placeholder:text-black/50"
          />

          {/* BUTTON */}
          <button className="bg-black text-white px-6 py-2 text-sm rounded-[5px] hover:opacity-90 transition">
            Sign Up
          </button>

        </div>

      </Container>
    </section>
  );
};

export default Newsletter;