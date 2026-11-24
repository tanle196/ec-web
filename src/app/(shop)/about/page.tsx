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
      <div className="flex h-18 items-center bg-gray-50">
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
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex items-center justify-center self-start rounded-sm bg-secondary-500 px-4 py-2 text-body-sm font-semibold text-white">
                    WHO WE ARE
                  </span>
                  <h1 className="text-display-4 leading-[48px] font-semibold text-gray-900">
                    Kinbo - largest electronics retail shop in the world.
                  </h1>
                </div>
                <p className="text-body-md leading-6 text-gray-700">
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
                    <span className="text-body-md leading-6 text-gray-900">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero image */}
            <div className="h-[536px] w-[648px] shrink-0 overflow-hidden rounded-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_HERO}
                alt="Team working together"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Team member section */}
      <section className="border-t border-gray-100 py-18">
        <Container className="flex flex-col gap-10">
          <h2 className="text-center text-heading-1 font-semibold text-gray-900">
            Our core team member
          </h2>

          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="grid grid-cols-4 gap-6">
              {TEAM_MEMBERS.slice(0, 4).map((member) => (
                <div
                  key={member.role}
                  className="flex items-center gap-4 rounded-sm border border-gray-100 bg-white p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                  />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="truncate text-body-md font-semibold text-gray-900">
                      {member.name}
                    </p>
                    <p className="truncate text-body-sm text-gray-700">
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
                  className="flex items-center gap-4 rounded-sm border border-gray-100 bg-white p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                  />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="truncate text-body-md font-semibold text-gray-900">
                      {member.name}
                    </p>
                    <p className="truncate text-body-sm text-gray-700">
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
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />

        <Container className="relative flex items-center gap-8 py-22">
          <div className="flex max-w-[500px] flex-col gap-4">
            <h2 className="text-heading-1 leading-10 font-semibold text-gray-900">
              Your trusted and reliable retail shop
            </h2>
            <p className="max-w-[423px] text-body-lg leading-6 text-gray-900">
              Praesent sed semper metus. Nunc aliquet dolor mauris, et fringilla
              elit gravida eget. Nunc consequat auctor urna a placerat.
            </p>
          </div>

          {/* Play button */}
          <button
            type="button"
            aria-label="Watch video"
            className="flex h-18 w-18 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary-500 transition-colors hover:bg-primary-600"
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
