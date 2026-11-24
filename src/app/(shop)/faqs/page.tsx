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
      <div className="flex h-18 items-center bg-[#f2f4f5]">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
          />
        </Container>
      </div>

      {/* Main content */}
      <Container className="py-18">
        <div className="flex items-start gap-17">
          {/* FAQ accordion */}
          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <h1 className="text-[32px] leading-10 font-semibold text-[#191c1f]">
              Frequently Asked Questions
            </h1>

            <div className="flex flex-col gap-0">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                const hasContent = faq.answer || faq.bullets.length > 0;

                return (
                  <div
                    key={faq.id}
                    className={`mb-0 overflow-hidden rounded-[4px] border border-[#e4e7e9] ${isOpen ? "shadow-[0px_8px_20px_rgba(0,0,0,0.12)]" : ""}`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className={`flex w-full cursor-pointer items-center justify-between gap-9 border-0 px-6 py-5 text-left transition-colors outline-none ${
                        isOpen ? "bg-[#fa8232]" : "bg-white hover:bg-[#fafafa]"
                      }`}
                    >
                      <span
                        className={`flex-1 text-[18px] leading-6 ${
                          isOpen
                            ? "font-semibold text-white"
                            : "font-medium text-[#191c1f]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-5 w-5 flex-none items-center justify-center ${isOpen ? "text-white" : "text-[#191c1f]"}`}
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
                      <div className="flex flex-col gap-4 px-6 pt-0 pb-6 text-[14px] leading-5 text-[#475156]">
                        {faq.answer && <p>{faq.answer}</p>}
                        {faq.bullets.length > 0 && (
                          <ul className="flex list-disc flex-col gap-2 pl-5">
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
          <div className="flex w-[424px] flex-none flex-col gap-6 rounded-[4px] bg-[#fbf4ce] p-8">
            <div className="flex flex-col gap-3">
              <p className="w-[360px] text-[18px] leading-6 font-medium text-[#191c1f]">
                Don&apos;t find your answer, Ask for support.
              </p>
              <p className="w-[360px] text-[14px] leading-5 font-normal text-[#475156]">
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
                className="h-11 w-full rounded-[2px] border border-[#f7e99e] bg-white px-[15px] text-[14px] leading-5 text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#fa8232]"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-11 w-full rounded-[2px] border border-[#f7e99e] bg-white px-[15px] text-[14px] leading-5 text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#fa8232]"
              />
              <textarea
                placeholder="Message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-[2px] border border-[#f7e99e] bg-white px-[15px] py-[11px] text-[14px] leading-5 text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#fa8232]"
              />

              <button
                type="submit"
                className="inline-flex h-12 cursor-pointer items-center gap-2 self-start rounded-[2px] border-0 bg-[#fa8232] px-6 text-[14px] font-bold tracking-[0.012em] text-white uppercase transition-opacity duration-150 hover:opacity-90"
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
