const ContactForm = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20 font-body">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="First Name*"
          className="bg-[#EAE6E1] px-4 py-3.5 rounded-lg outline-none text-[#1D1F26] placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Last Name*"
          className="bg-[#EAE6E1] px-4 py-3.5 rounded-lg outline-none text-[#1D1F26] placeholder:text-gray-400"
        />

        <div className="flex items-center bg-[#EAE6E1] rounded-lg px-4">
          <span className="mr-2 text-sm">🇮🇳</span>
          <span className="text-gray-400 mr-2">|</span>
          <input
            type="text"
            placeholder="+91 000-000-0000"
            className="bg-transparent py-3.5 outline-none w-full text-[#1D1F26] placeholder:text-gray-400"
          />
        </div>

        <input
          type="email"
          placeholder="Email Address*"
          className="bg-[#EAE6E1] px-4 py-3.5 rounded-lg outline-none text-[#1D1F26] placeholder:text-gray-400"
        />

        <textarea
          rows="6"
          placeholder="Message*"
          className="bg-[#EAE6E1] px-4 py-3.5 rounded-lg outline-none col-span-1 md:col-span-2 text-[#1D1F26] placeholder:text-gray-400"
        ></textarea>

        <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#1D1F26] text-white px-10 py-2.5 rounded-md font-medium hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>

      </form>
    </section>
  );
};

export default ContactForm;