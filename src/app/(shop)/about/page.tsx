import { NewsletterSection } from "@/app/(shop)/_sections/newsletter-section";
import { MiniLists } from "@/app/(shop)/_sections/mini-lists";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

/* Figma assets (expire 7 days) */
const IMG_HERO =
  "https://www.figma.com/api/mcp/asset/c84f5e52-0d4f-4c72-8fa2-25fe68b7f589";
const IMG_BANNER =
  "https://www.figma.com/api/mcp/asset/2f1306e5-647d-4001-8ddb-d92ded3a9042";

const IMG_TEAM_1 =
  "https://www.figma.com/api/mcp/asset/3728d998-6fb6-46c4-8432-055f9d484183";
const IMG_TEAM_2 =
  "https://www.figma.com/api/mcp/asset/07716931-d596-4f8c-8cd4-5a00e77b804e";
const IMG_TEAM_3 =
  "https://www.figma.com/api/mcp/asset/f555939c-a07b-4e46-aea6-fb0ec71cfb55";
const IMG_TEAM_4 =
  "https://www.figma.com/api/mcp/asset/b89a10dd-ec79-4335-8233-1d6e2fc68a17";
const IMG_TEAM_5 =
  "https://www.figma.com/api/mcp/asset/709057e1-873b-451c-935b-9aac55923217";
const IMG_TEAM_6 =
  "https://www.figma.com/api/mcp/asset/ea9f67a3-ce66-4ea5-a03f-dbe6d92181c9";
const IMG_TEAM_7 =
  "https://www.figma.com/api/mcp/asset/9957311b-08d7-43a6-938b-52b23dbf7559";
const IMG_TEAM_8 =
  "https://www.figma.com/api/mcp/asset/cc68e107-50e7-46ff-8d75-26f24006f4a8";

const FEATURES = [
  "Great 24/7 customer services.",
  "600+ Dedicated employees.",
  "50+ Branches all over the world.",
  "Over 1 Million Electronics Products.",
];

const TEAM_MEMBERS = [
  { img: IMG_TEAM_1, name: "Kevin Gilbert", role: "Chief Executive Officer" },
  { img: IMG_TEAM_2, name: "Kevin Gilbert", role: "Assistant of CEO" },
  { img: IMG_TEAM_3, name: "Kevin Gilbert", role: "Head of Designer" },
  { img: IMG_TEAM_4, name: "Kevin Gilbert", role: "UX Designer" },
  { img: IMG_TEAM_5, name: "Kevin Gilbert", role: "Product Designer" },
  { img: IMG_TEAM_6, name: "Kevin Gilbert", role: "Head of Development" },
  { img: IMG_TEAM_7, name: "Kevin Gilbert", role: "Design Engineer" },
  { img: IMG_TEAM_8, name: "Kevin Gilbert", role: "UI Designer" },
];

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13l4 4L16 8"
        stroke="#2DA5F3"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13l4 4L20 8"
        stroke="#2DA5F3"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb strip */}
      <div className="bg-gray-50 h-18 flex items-center">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
          />
        </Container>
      </div>

      {/* About section */}
      <section className="py-18">
        <Container>
          <div className="flex items-center gap-[136px]">
            {/* Content */}
            <div className="flex flex-col gap-8 flex-1 min-w-0">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex items-center justify-center self-start bg-secondary-500 text-white text-body-sm font-semibold px-4 py-2 rounded-sm">
                    WHO WE ARE
                  </span>
                  <h1 className="text-display-4 font-semibold text-gray-900 leading-[48px]">
                    Kinbo - largest electronics retail shop in the world.
                  </h1>
                </div>
                <p className="text-body-md text-gray-700 leading-6">
                  Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit
                  vestibulum risus, ac tincidunt diam lectus id magna. Praesent
                  maximus lobortis neque sit amet rhoncus. Nullam tempus lectus
                  a dui aliquet, non ultricies nibh elementum. Nulla ac nulla
                  dolor.
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-body-md text-gray-900 leading-6">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero image */}
            <div className="w-[648px] h-[536px] shrink-0 rounded-[4px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_HERO}
                alt="Team working together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Team member section */}
      <section className="py-18 border-t border-gray-100">
        <Container className="flex flex-col gap-10">
          <h2 className="text-heading-1 font-semibold text-gray-900 text-center">
            Our core team member
          </h2>

          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="grid grid-cols-4 gap-6">
              {TEAM_MEMBERS.slice(0, 4).map((member) => (
                <div
                  key={member.role}
                  className="bg-white border border-gray-100 rounded-sm flex items-center gap-4 p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <p className="text-body-md font-semibold text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-body-sm text-gray-700 truncate">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-4 gap-6">
              {TEAM_MEMBERS.slice(4).map((member) => (
                <div
                  key={member.role}
                  className="bg-white border border-gray-100 rounded-sm flex items-center gap-4 p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <p className="text-body-md font-semibold text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-body-sm text-gray-700 truncate">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Banner section */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_BANNER}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent pointer-events-none" />

        <Container className="relative py-22 flex items-center gap-8">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <h2 className="text-heading-1 font-semibold text-gray-900 leading-10">
              Your trusted and reliable retail shop
            </h2>
            <p className="text-body-lg text-gray-900 leading-6 max-w-[423px]">
              Praesent sed semper metus. Nunc aliquet dolor mauris, et fringilla
              elit gravida eget. Nunc consequat auctor urna a placerat.
            </p>
          </div>

          {/* Play button */}
          <button
            type="button"
            aria-label="Watch video"
            className="w-18 h-18 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </button>
        </Container>
      </section>

      {/* Products mini lists */}
      <MiniLists />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
