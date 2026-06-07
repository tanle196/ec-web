import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const robotIllustration =
  "https://www.figma.com/api/mcp/asset/4bb0a71f-0905-4b92-91aa-3a86afbefb13";
const robotBackground =
  "https://www.figma.com/api/mcp/asset/482f8777-a09d-4f2d-ae93-58f8489d1ee4";
const robotShadow =
  "https://www.figma.com/api/mcp/asset/b32a0dd1-7e23-45e9-8645-c6a562708417";
const robotParts =
  "https://www.figma.com/api/mcp/asset/432d7f5e-7219-47ce-823b-23546bbfb37c";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-20 bg-white">
        {/* Robot illustration */}
        <div className="relative w-[320px] h-[320px] mb-10">
          <img
            src={robotBackground}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={robotShadow}
            alt=""
            className="absolute bottom-0 left-0 right-0 w-full object-contain"
          />
          <img
            src={robotIllustration}
            alt="Broken robot"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={robotParts}
            alt=""
            className="absolute bottom-0 left-0 right-0 w-full object-contain"
          />
        </div>

        {/* Text + buttons */}
        <div className="flex flex-col items-center gap-6 text-center max-w-[536px]">
          <h1 className="text-[36px] font-semibold leading-[44px] text-[#191c1f]">
            404, Page not found
          </h1>
          <p className="text-[16px] font-normal leading-6 text-[#475156]">
            Something went wrong. It&apos;s look that your requested could not
            be found. It&apos;s look like the link is broken or the page is
            removed.
          </p>
          <div className="flex gap-4 items-center mt-2">
            <GoBackButton />
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-[#ffe7d6] rounded-[2px] px-6 h-12 text-[14px] font-bold tracking-[0.012em] uppercase text-[#fa8232] no-underline hover:bg-[#ffe7d6] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function GoBackButton() {
  return (
    <a
      href="javascript:history.back()"
      className="inline-flex items-center gap-2 bg-[#fa8232] rounded-[2px] px-6 h-12 text-[14px] font-bold tracking-[0.012em] uppercase text-white no-underline hover:opacity-90 transition-opacity"
    >
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
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Go Back
    </a>
  );
}
