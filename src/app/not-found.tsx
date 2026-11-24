import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";

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
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center bg-white py-20">
        {/* Robot illustration */}
        <div className="relative mb-10 h-[320px] w-[320px]">
          <Image src={robotBackground} alt="" fill className="object-contain" />
          <Image
            src={robotShadow}
            alt=""
            fill
            className="object-contain object-bottom"
          />
          <Image
            src={robotIllustration}
            alt="Broken robot"
            fill
            className="object-contain"
          />
          <Image
            src={robotParts}
            alt=""
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* Text + buttons */}
        <div className="flex max-w-[536px] flex-col items-center gap-6 text-center">
          <h1 className="text-[36px] leading-[44px] font-semibold text-[#191c1f]">
            404, Page not found
          </h1>
          <p className="text-[16px] leading-6 font-normal text-[#475156]">
            Something went wrong. It&apos;s look that your requested could not
            be found. It&apos;s look like the link is broken or the page is
            removed.
          </p>
          <div className="mt-2 flex items-center gap-4">
            <GoBackButton />
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-[2px] border-2 border-[#ffe7d6] px-6 text-[14px] font-bold tracking-[0.012em] text-[#fa8232] uppercase no-underline transition-colors hover:bg-[#ffe7d6]"
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
      className="inline-flex h-12 items-center gap-2 rounded-[2px] bg-[#fa8232] px-6 text-[14px] font-bold tracking-[0.012em] text-white uppercase no-underline transition-opacity hover:opacity-90"
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
