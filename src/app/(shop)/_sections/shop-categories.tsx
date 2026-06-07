import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── Figma assets (expire 7 days) ─────────────────────────────────── */
const IMG_COMPUTER   = "https://www.figma.com/api/mcp/asset/25be074f-e0ee-4718-a5fc-a39c7c61ef11";
const IMG_SMARTPHONE = "https://www.figma.com/api/mcp/asset/45079f7b-d6f4-4046-9440-75fe764b85b6";
const IMG_HEADPHONES = "https://www.figma.com/api/mcp/asset/b4d99b30-8b0b-4b26-85cd-7d0aeb3faad4";
const IMG_ACCESSORIES= "https://www.figma.com/api/mcp/asset/b1f4b809-00fe-4c60-9265-eb5e84a5a0ef";
const IMG_CAMERA     = "https://www.figma.com/api/mcp/asset/1eb4956e-98eb-4d91-8eaa-3c204b29d3c6";
const IMG_TV         = "https://www.figma.com/api/mcp/asset/bf8c4236-dc01-4903-9328-200bd0a7571d";

const CATEGORIES = [
  { name: "Computer & Laptop", img: IMG_COMPUTER,    href: "/categories/computer" },
  { name: "SmartPhone",        img: IMG_SMARTPHONE,  href: "/categories/smartphone" },
  { name: "Headphones",        img: IMG_HEADPHONES,  href: "/categories/headphones" },
  { name: "Accessories",       img: IMG_ACCESSORIES, href: "/categories/accessories" },
  { name: "Camera & Photo",    img: IMG_CAMERA,      href: "/categories/camera" },
  { name: "TV & Homes",        img: IMG_TV,          href: "/categories/tv" },
];

export function ShopCategories() {
  return (
    <section className="bg-white py-18">
      <div className="max-w-330 mx-auto px-4 lg:px-8">
        <h2 className="text-heading-1 font-semibold text-gray-900 text-center mb-10">
          Shop with Categorys
        </h2>

        <div className="relative">
          {/* Left arrow */}
          <button
            aria-label="Previous"
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors flex items-center justify-center z-10"
          >
            <ChevronLeft size={24} className="text-white" aria-hidden />
          </button>

          {/* Categories row */}
          <div className="grid grid-cols-6 gap-[18px]">
            {CATEGORIES.map(({ name, img, href }) => (
              <a
                key={name}
                href={href}
                className="bg-white border border-gray-100 rounded-sm flex flex-col items-center justify-center gap-4 px-3 py-6 no-underline hover:shadow-card-md transition-shadow"
              >
                <div className="w-[148px] h-[148px] relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={name} className="absolute inset-0 w-full h-full object-contain" />
                </div>
                <span className="text-body-md font-medium text-gray-900 text-center leading-6">
                  {name}
                </span>
              </a>
            ))}
          </div>

          {/* Right arrow */}
          <button
            aria-label="Next"
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors flex items-center justify-center z-10"
          >
            <ChevronRight size={24} className="text-white" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
