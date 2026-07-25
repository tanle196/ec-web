"use client";

import { useState } from "react";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

const faqs = [
  {
    id: 1,
    question: "Suspendisse ultrices pharetra libero sed interdum.",
    answer: null,
    bullets: [],
  },
  {
    id: 2,
    question: "Fusce molestie condimentum facilisis.",
    answer:
      "Nulla malesuada iaculis nisi, vitae sagittis lacus laoreet in. Morbi aliquet pulvinar orci non vulputate. Donec aliquet ullamcorper gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed molestie accumsan dui, non iaculis magna mattis id. Ut consectetur massa at viverra euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent eget sem purus.",
    bullets: [
      "Vivamus sed est non arcu porta aliquet et vitae nulla.",
      "Integer et lacus vitae justo fermentum rutrum. In nec ultrices massa.",
      "Proin blandit nunc risus, at semper turpis sagittis nec.",
      "Quisque ut dolor erat.",
    ],
  },
  {
    id: 3,
    question: "Quisque quis nunc quis urna tempor lobortis vel non orci.",
    answer: null,
    bullets: [],
  },
  {
    id: 4,
    question:
      "Donec rutrum ultrices ante nec malesuada. In accumsan eget nisi a rhoncus.",
    answer: null,
    bullets: [],
  },
  {
    id: 5,
    question: "Nulla sed sapien maximus, faucibus massa vitae.",
    answer: null,
    bullets: [],
  },
];

export default function FaqsPage() {
  const [openId, setOpenId] = useState<number | null>(2);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up support API
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb strip */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <Container>
          <PageBreadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
        </Container>
      </div>

      {/* Main content */}
      <Container className="py-18">
        <div className="flex gap-17 items-start">
          {/* FAQ accordion */}
          <div className="flex flex-col gap-10 flex-1 min-w-0">
            <h1 className="text-[32px] font-semibold leading-10 text-[#191c1f]">
              Frequently Asked Questions
            </h1>

            <div className="flex flex-col gap-0">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                const hasContent = faq.answer || faq.bullets.length > 0;

                return (
                  <div
                    key={faq.id}
                    className={`border border-[#e4e7e9] rounded-[4px] overflow-hidden mb-0 ${isOpen ? "shadow-[0px_8px_20px_rgba(0,0,0,0.12)]" : ""}`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className={`w-full flex items-center justify-between gap-9 px-6 py-5 text-left cursor-pointer border-0 outline-none transition-colors ${
                        isOpen ? "bg-[#fa8232]" : "bg-white hover:bg-[#fafafa]"
                      }`}
                    >
                      <span
                        className={`text-[18px] leading-6 flex-1 ${
                          isOpen
                            ? "font-semibold text-white"
                            : "font-medium text-[#191c1f]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`flex-none w-5 h-5 flex items-center justify-center ${isOpen ? "text-white" : "text-[#191c1f]"}`}
                      >
                        {isOpen ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        )}
                      </span>
                    </button>

                    {isOpen && hasContent && (
                      <div className="px-6 pb-6 pt-0 flex flex-col gap-4 text-[14px] leading-5 text-[#475156]">
                        {faq.answer && <p>{faq.answer}</p>}
                        {faq.bullets.length > 0 && (
                          <ul className="flex flex-col gap-2 pl-5 list-disc">
                            {faq.bullets.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Support form */}
          <div className="bg-[#fbf4ce] rounded-[4px] p-8 flex flex-col gap-6 w-[424px] flex-none">
            <div className="flex flex-col gap-3">
              <p className="text-[18px] font-medium leading-6 text-[#191c1f] w-[360px]">
                Don&apos;t find your answer, Ask for support.
              </p>
              <p className="text-[14px] font-normal leading-5 text-[#475156] w-[360px]">
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Sed molestie accumsan dui, non iaculis primis in faucibu raesent
                eget sem purus.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#f7e99e] rounded-[2px] h-11 px-[15px] text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#fa8232] transition-colors"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-[#f7e99e] rounded-[2px] h-11 px-[15px] text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#fa8232] transition-colors"
              />
              <textarea
                placeholder="Message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-white border border-[#f7e99e] rounded-[2px] px-[15px] py-[11px] text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#fa8232] transition-colors resize-none"
              />

              <button
                type="submit"
                className="self-start inline-flex items-center gap-2 px-6 h-12 rounded-[2px] bg-[#fa8232] text-white text-[14px] font-bold tracking-[0.012em] uppercase border-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
              >
                Send Message
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
