"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

/* Figma assets (expire 7 days) */
const IMG_BLOG_CARD =
  "https://www.figma.com/api/mcp/asset/c2be6f99-7f05-4fed-b07e-596cb295312e";
const IMG_LATEST_BLOG =
  "https://www.figma.com/api/mcp/asset/9391e948-78c3-4681-b14c-8276114334d0";
const GALLERY_IMAGES = [
  "https://www.figma.com/api/mcp/asset/ceded541-e6a9-4ecc-a2c0-a12f704e3538",
  "https://www.figma.com/api/mcp/asset/170d0e32-1e48-49db-b067-f547c80226ac",
  "https://www.figma.com/api/mcp/asset/0f3942f3-a9ed-409b-a249-4eef2672d84c",
  "https://www.figma.com/api/mcp/asset/48294543-13a5-4a3a-9740-35e82b3ab8c1",
  "https://www.figma.com/api/mcp/asset/0a313e45-a0b8-4b92-9e48-b1339c23f73f",
  "https://www.figma.com/api/mcp/asset/66b72c8f-2682-4d7f-a456-2138279715eb",
  "https://www.figma.com/api/mcp/asset/420ffada-0de8-45a7-9cd6-9462d29016ec",
  "https://www.figma.com/api/mcp/asset/a441974b-6d3c-4953-8799-35efec6ee0f3",
];

const CATEGORIES = [
  "All",
  "Electronics Devices",
  "Computer & Laptop",
  "Computer Accessories",
  "SmartPhone",
  "Headphone",
  "Mobile Accessories",
  "Gaming Console",
  "Camera & Photo",
];

const LATEST_POSTS = [
  {
    id: 1,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    date: "28 Nov, 2015",
  },
  {
    id: 2,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    date: "28 Nov, 2015",
  },
  {
    id: 3,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    date: "28 Nov, 2015",
  },
];

const TAGS = [
  "Game",
  "iPhone",
  "TV",
  "Asus Laptops",
  "Macbook",
  "SSD",
  "Graphics Card",
  "Speaker",
  "Tablet",
  "Microwave",
  "Samsung",
  "Power Bank",
];

const BLOG_POSTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  author: "Cameron",
  date: "1 Feb, 2020",
  comments: 738,
  title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
  excerpt:
    "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
}));

const SORT_OPTIONS = ["Most Popular", "Newest", "Oldest", "Most Comments"];
const TOTAL_PAGES = 6;

function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#475156"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#475156"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#475156"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="11" r="8" />
      <path d="M8 15.5L6 20l6-2.5" />
      <circle cx="9.5" cy="11" r="0.75" fill="#475156" stroke="none" />
      <circle cx="12" cy="11" r="0.75" fill="#475156" stroke="none" />
      <circle cx="14.5" cy="11" r="0.75" fill="#475156" stroke="none" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#77878f"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CaretDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#475156"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="3 6 8 11 13 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fa8232"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 5 5 12 12 19" />
    </svg>
  );
}

function ArrowRightIcon({ color = "#fa8232" }: { color?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("Graphics Card");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Popular");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="flex h-18 items-center bg-[#f2f4f5]">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />
        </Container>
      </div>

      {/* Main layout */}
      <Container className="py-18">
        <div className="flex items-start gap-12">
          {/* ── Sidebar ── */}
          <aside className="flex w-[400px] shrink-0 flex-col gap-6">
            {/* Category */}
            <div className="flex flex-col gap-4 rounded-[4px] border border-[#e4e7e9] bg-white p-6">
              <h3 className="text-[16px] leading-6 font-medium tracking-wide text-[#191c1f] uppercase">
                Category
              </h3>
              <div className="flex flex-col gap-3">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isActive
                            ? "border-[#fa8232] bg-[#fa8232]"
                            : "border-[#c9cfd2] bg-white"
                        }`}
                      >
                        {isActive && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={`text-[14px] leading-5 ${
                          isActive
                            ? "font-medium text-[#191c1f]"
                            : "font-normal text-[#475156]"
                        }`}
                      >
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Latest Blog */}
            <div className="flex flex-col gap-6 rounded-[6px] border border-[#e4e7e9] bg-white p-6">
              <h3 className="text-[16px] leading-6 font-medium tracking-wide text-[#191c1f] uppercase">
                Latest Blog
              </h3>
              {LATEST_POSTS.map((post) => (
                <Link
                  key={post.id}
                  href="#"
                  className="group flex items-center gap-4 no-underline"
                >
                  <div className="relative h-20 w-[104px] shrink-0 overflow-hidden rounded-[2px]">
                    <Image
                      src={IMG_LATEST_BLOG}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="line-clamp-2 text-[14px] leading-5 font-medium text-[#191c1f] transition-colors group-hover:text-[#fa8232]">
                      {post.title}
                    </p>
                    <p className="text-[14px] leading-5 font-normal text-[#77878f]">
                      {post.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Gallery */}
            <div className="flex flex-col gap-6 rounded-[6px] border border-[#e4e7e9] bg-white p-6">
              <h3 className="text-[16px] leading-6 font-medium tracking-wide text-[#191c1f] uppercase">
                Gallery
              </h3>
              <div className="flex flex-col gap-3">
                {[GALLERY_IMAGES.slice(0, 4), GALLERY_IMAGES.slice(4)].map(
                  (row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex items-center justify-between"
                    >
                      {row.map((src, i) => (
                        <div
                          key={i}
                          className="relative h-20 w-20 overflow-hidden rounded-[2px]"
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-col gap-[18px]">
              <h3 className="text-[16px] leading-6 font-medium tracking-wide text-[#191c1f] uppercase">
                Popular Tag
              </h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => {
                  const isActive = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`cursor-pointer rounded-[2px] border px-3 py-1.5 text-[14px] leading-5 font-medium transition-colors ${
                        isActive
                          ? "border-[#fa8232] bg-[#fff3eb] text-[#fa8232]"
                          : "border-[#e4e7e9] bg-white text-[#191c1f] hover:border-[#fa8232] hover:text-[#fa8232]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex min-w-0 flex-1 flex-col gap-10">
            {/* Search & Sort */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex max-w-[424px] flex-1 items-center gap-2 rounded-[2px] border border-[#e4e7e9] bg-white px-4 py-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-[14px] leading-5 text-[#191c1f] outline-none placeholder:text-[#77878f]"
                />
                <SearchIcon />
              </div>
              <div className="flex items-center gap-[22px]">
                <span className="text-[14px] leading-5 whitespace-nowrap text-[#191c1f]">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-11 w-[180px] cursor-pointer appearance-none rounded-[2px] border border-[#e4e7e9] bg-white pr-10 pl-4 text-[14px] leading-5 text-[#475156] outline-none"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                    <CaretDownIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* Blog grid */}
            <div className="grid grid-cols-2 gap-6">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col gap-6 rounded-[4px] border border-[#e4e7e9] bg-white p-8 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative aspect-[360/248] w-full overflow-hidden rounded-[3px]">
                    <Image
                      src={IMG_BLOG_CARD}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <UserIcon />
                        <span className="text-[14px] leading-5 text-[#475156]">
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon />
                        <span className="text-[14px] leading-5 text-[#475156]">
                          {post.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ChatIcon />
                        <span className="text-[14px] leading-5 text-[#475156]">
                          {post.comments}
                        </span>
                      </div>
                    </div>
                    {/* Title */}
                    <h2 className="text-[18px] leading-6 font-medium text-[#191c1f]">
                      {post.title}
                    </h2>
                    {/* Excerpt */}
                    <p className="text-[16px] leading-6 text-[#77878f]">
                      {post.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 self-start rounded-[2px] border-2 border-[#ffe7d6] px-6 text-[14px] leading-[48px] font-bold tracking-[0.168px] whitespace-nowrap text-[#fa8232] uppercase no-underline transition-colors hover:border-[#fa8232]"
                  >
                    Read more
                    <ArrowRightIcon />
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#fa8232] p-2 transition-colors hover:bg-[#fff3eb] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ArrowLeftIcon />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map(
                  (page) => {
                    const isActive = currentPage === page;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[14px] leading-5 transition-colors ${
                          isActive
                            ? "bg-[#fa8232] font-semibold text-white"
                            : "border border-[#e4e7e9] bg-white font-normal text-[#191c1f] hover:border-[#fa8232]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {String(page).padStart(2, "0")}
                      </button>
                    );
                  },
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))
                }
                disabled={currentPage === TOTAL_PAGES}
                className="flex cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#fa8232] p-2 transition-colors hover:bg-[#fff3eb] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ArrowRightIcon color="#fa8232" />
              </button>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
}
