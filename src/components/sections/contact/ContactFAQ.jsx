import ChevronDown from "../../../assets/icons/chevron-down.svg";

const faqs = [
  "How can TSD help us?",
  "What makes The Success Digest unique compared to other business magazines?",
  "How can I advertise my business in The Success Digest?",
  "What type of information is provided by The Success Digest?",
];

const ContactFAQ = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-24 font-body">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#EAE6E1] px-5 py-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-[#e3ded8] transition group"
          >
            <span className="text-[15px] text-[#1D1F26] font-medium">
              {faq}
            </span>

            <img
              src={ChevronDown}
              alt="expand"
              className="w-4 h-4 opacity-80 transition-transform duration-200 group-hover:rotate-180"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactFAQ;