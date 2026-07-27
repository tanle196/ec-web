"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

/* Figma assets */
const IMG_HERO =
  "https://www.figma.com/api/mcp/asset/1a3aecf1-392b-44fe-ba8f-c43eb27de6d4";
const IMG_AUTHOR_AVATAR =
  "https://www.figma.com/api/mcp/asset/8ae1f425-e4c2-4e55-91b7-ae3aa7ba2ba3";
const IMG_BODY_1 =
  "https://www.figma.com/api/mcp/asset/6aed55df-b533-450a-93ba-18d8b67f580e";
const IMG_BODY_2 =
  "https://www.figma.com/api/mcp/asset/f23c1537-ef22-465f-b672-2347d0268728";
const IMG_BODY_3 =
  "https://www.figma.com/api/mcp/asset/89525c08-3acc-49f4-a249-4e4e3d9345cd";
const IMG_LATEST_BLOG =
  "https://www.figma.com/api/mcp/asset/c2be6f99-7f05-4fed-b07e-596cb295312e";

const COMMENT_AVATARS = [
  "https://www.figma.com/api/mcp/asset/33080df0-361e-4387-9c94-def28279d2d6",
  "https://www.figma.com/api/mcp/asset/06498619-9b7b-4b8b-b571-df017322707c",
  "https://www.figma.com/api/mcp/asset/682719f6-e775-44df-ab38-51548f857295",
  "https://www.figma.com/api/mcp/asset/dfcbc4f0-cd65-47cc-87e9-d54e7d9cfbb5",
  "https://www.figma.com/api/mcp/asset/00da8bdd-0627-4cb7-8c55-a3f2d265404a",
];

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

const ARTICLE_TAGS = ["Game", "iPhone", "TV", "Macbook"];

const COMMENTS = [
  {
    id: 1,
    name: "Esther Howard",
    date: "January 2, 2022",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: COMMENT_AVATARS[0],
  },
  {
    id: 2,
    name: "Cameron Williamson",
    date: "January 2, 2022",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: COMMENT_AVATARS[1],
    isReply: true,
  },
  {
    id: 3,
    name: "Brooklyn Simmons",
    date: "January 2, 2022",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: COMMENT_AVATARS[2],
  },
  {
    id: 4,
    name: "Ralph Edwards",
    date: "January 2, 2022",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: COMMENT_AVATARS[3],
  },
  {
    id: 5,
    name: "Dianne Russell",
    date: "January 2, 2022",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: COMMENT_AVATARS[4],
  },
];

/* ── Icons ── */
function StackIcon() {
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
      <polygon points="12 2 22 8.5 12 15 2 8.5" />
      <polyline points="2 15.5 12 22 22 15.5" />
      <polyline points="2 12 12 18.5 22 12" />
    </svg>
  );
}

function UserCircleIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
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

function ArrowLeftIcon({ color = "#fa8232" }: { color?: string }) {
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

function ReplyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fa8232"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

/* ── Social share icons ── */
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function CopyLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function BlogDetailPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("Graphics Card");
  const [search, setSearch] = useState("");
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <Container>
          <PageBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Blog Detail" },
            ]}
          />
        </Container>
      </div>

      {/* Main */}
      <Container className="py-18">
        <div className="flex flex-col gap-12">
          {/* Hero image */}
          <div className="relative w-full aspect-[1320/740] rounded-[3px] overflow-hidden">
            <Image
              src={IMG_HERO}
              alt="Blog hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content + Sidebar */}
          <div className="flex gap-12 items-start">
            {/* ── Main content ── */}
            <article className="flex-1 min-w-0 flex flex-col gap-8">
              {/* Heading */}
              <div className="flex flex-col gap-6">
                {/* Meta row */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <StackIcon />
                    <span className="text-[14px] leading-5 text-[#475156]">
                      Electronics
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCircleIcon />
                    <span className="text-[14px] leading-5 text-[#475156]">
                      Marvin McKinney
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon />
                    <span className="text-[14px] leading-5 text-[#475156]">
                      8 Sep, 2020
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChatIcon />
                    <span className="text-[14px] leading-5 text-[#475156]">
                      738
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-[32px] font-semibold leading-[40px] text-[#191c1f]">
                  How artist collective Meow Wolf&apos;s website complements
                  their immersive venues
                </h1>

                {/* Author + Share */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={IMG_AUTHOR_AVATAR}
                        alt="Cameron Williamson"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[16px] font-medium leading-6 text-[#191c1f]">
                      Cameron Williamson
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Share on WhatsApp"
                      className="bg-[#25d366] p-3 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <WhatsAppIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Share on Facebook"
                      className="bg-[#3b5998] p-3 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <FacebookIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Share on Twitter"
                      className="bg-[#1da1f2] p-3 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <TwitterIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Share on LinkedIn"
                      className="bg-[#0077b5] p-3 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <LinkedInIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Share on Pinterest"
                      className="bg-[#e60023] p-3 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <PinterestIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="Copy link"
                      className="bg-[#475156] p-3 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <CopyLinkIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#e4e7e9]" />

              {/* Article body */}
              <div className="flex flex-col gap-6 text-[16px] leading-[28px] text-[#5f6c72]">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
                  pulvinar lorem felis nec erat. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nunc maximus, nulla ut commodo
                  sagittis, sapien dui mattis dui, non pulvinar lorem felis nec
                  erat.
                </p>
                <p>
                  Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
                  porttitor, facilisis luctus, metus. Phasellus ultrices nulla
                  quis nibh. Quisque a lectus. Donec consectetuer ligula
                  vulputate sem tristique cursus. Nam nulla quam, gravida non,
                  commodo a, sodales sit amet, nisi.
                </p>

                {/* Inline images */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[424/280] rounded-[3px] overflow-hidden">
                    <Image
                      src={IMG_BODY_1}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[424/280] rounded-[3px] overflow-hidden">
                    <Image
                      src={IMG_BODY_2}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <p>
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Vestibulum tortor quam,
                  feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                  libero sit amet quam egestas semper. Aenean ultricies mi vitae
                  est. Mauris placerat eleifend leo.
                </p>

                {/* Blockquote */}
                <blockquote className="relative bg-[#f2f4f5] rounded-[3px] px-8 py-6 flex gap-5 items-start my-2">
                  <div className="shrink-0 mt-1">
                    <svg
                      width="40"
                      height="32"
                      viewBox="0 0 40 32"
                      fill="#fa8232"
                      aria-hidden
                    >
                      <path d="M0 32V19.2C0 8.96 6.4 2.24 19.2 0l2.24 3.84C15.36 5.44 11.84 8 10.56 12H18V32H0zm22 0V19.2C22 8.96 28.4 2.24 41.2 0l2.24 3.84C37.36 5.44 33.84 8 32.56 12H40V32H22z" />
                    </svg>
                  </div>
                  <p className="text-[18px] font-medium leading-7 text-[#191c1f] italic">
                    &quot;Neque porro quisquam est, qui dolorem ipsum quia dolor
                    sit amet, consectetur, adipisci velit, sed quia non numquam
                    eius modi tempora incidunt ut labore et dolore magnam
                    aliquam quaerat voluptatem.&quot;
                  </p>
                </blockquote>

                <p>
                  Quisque sit amet est et sapien ullamcorper pharetra.
                  Vestibulum erat wisi, condimentum sed, commodo vitae, ornare
                  sit amet, wisi. Aenean fermentum, elit eget tincidunt
                  condimentum, eros ipsum rutrum orci, sagittis tempus lacus
                  enim ac dui. Donec non enim in turpis pulvinar facilisis.
                </p>

                {/* Third body image */}
                <div className="relative w-full aspect-[872/480] rounded-[3px] overflow-hidden">
                  <Image
                    src={IMG_BODY_3}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <p>
                  Donec non enim in turpis pulvinar facilisis. Ut felis.
                  Praesent dapibus, neque id cursus faucibus, tortor neque
                  egestas augue, eu vulputate magna eros eu erat. Aliquam erat
                  volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
                  facilisis luctus, metus.
                </p>
              </div>

              <div className="h-px bg-[#e4e7e9]" />

              {/* Tags + Share */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14px] font-medium leading-5 text-[#191c1f]">
                    Tags:
                  </span>
                  {ARTICLE_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className="px-3 py-1.5 rounded-[2px] border border-[#e4e7e9] text-[14px] font-medium leading-5 text-[#191c1f] cursor-pointer hover:border-[#fa8232] hover:text-[#fa8232] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium leading-5 text-[#191c1f]">
                    Share:
                  </span>
                  <button
                    type="button"
                    aria-label="Share on Facebook"
                    className="bg-[#3b5998] p-2.5 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <FacebookIcon />
                  </button>
                  <button
                    type="button"
                    aria-label="Share on Twitter"
                    className="bg-[#1da1f2] p-2.5 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <TwitterIcon />
                  </button>
                  <button
                    type="button"
                    aria-label="Share on Pinterest"
                    className="bg-[#e60023] p-2.5 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <PinterestIcon />
                  </button>
                </div>
              </div>

              <div className="h-px bg-[#e4e7e9]" />

              {/* Prev / Next navigation */}
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/blog"
                  className="flex items-center gap-4 p-5 border border-[#e4e7e9] rounded-[4px] no-underline group hover:border-[#fa8232] transition-colors"
                >
                  <ArrowLeftIcon />
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] leading-4 text-[#77878f] uppercase tracking-wide">
                      Previous post
                    </span>
                    <span className="text-[14px] font-medium leading-5 text-[#191c1f] group-hover:text-[#fa8232] transition-colors line-clamp-2">
                      Curabitur pulvinar aliquam lectus, non blandit erat mattis
                      vitae.
                    </span>
                  </div>
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center justify-end gap-4 p-5 border border-[#e4e7e9] rounded-[4px] no-underline group hover:border-[#fa8232] transition-colors text-right"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] leading-4 text-[#77878f] uppercase tracking-wide">
                      Next post
                    </span>
                    <span className="text-[14px] font-medium leading-5 text-[#191c1f] group-hover:text-[#fa8232] transition-colors line-clamp-2">
                      Curabitur pulvinar aliquam lectus, non blandit erat mattis
                      vitae.
                    </span>
                  </div>
                  <ArrowRightIcon />
                </Link>
              </div>

              <div className="h-px bg-[#e4e7e9]" />

              {/* Comments */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[20px] font-semibold leading-7 text-[#191c1f]">
                  {COMMENTS.length} Comments
                </h3>
                <div className="flex flex-col gap-6">
                  {COMMENTS.map((comment) => (
                    <div
                      key={comment.id}
                      className={`flex gap-4 ${comment.isReply ? "ml-14" : ""}`}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={comment.avatar}
                          alt={comment.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-3 p-5 bg-[#f8f9fa] rounded-[4px]">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[16px] font-semibold leading-6 text-[#191c1f]">
                              {comment.name}
                            </span>
                            <span className="text-[13px] leading-5 text-[#77878f]">
                              {comment.date}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 text-[14px] font-medium leading-5 text-[#fa8232] cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <ReplyIcon />
                            Reply
                          </button>
                        </div>
                        <p className="text-[14px] leading-6 text-[#5f6c72]">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#e4e7e9]" />

              {/* Leave a comment */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[20px] font-semibold leading-7 text-[#191c1f]">
                  Leave a Comment
                </h3>
                <p className="text-[14px] leading-5 text-[#77878f]">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="comment-name"
                        className="text-[14px] font-medium leading-5 text-[#191c1f]"
                      >
                        Your name <span className="text-[#fa8232]">*</span>
                      </label>
                      <input
                        id="comment-name"
                        type="text"
                        placeholder="Your name"
                        value={commentForm.name}
                        onChange={(e) =>
                          setCommentForm((f) => ({
                            ...f,
                            name: e.target.value,
                          }))
                        }
                        className="h-11 px-4 border border-[#e4e7e9] rounded-[2px] text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#fa8232] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="comment-email"
                        className="text-[14px] font-medium leading-5 text-[#191c1f]"
                      >
                        Email address <span className="text-[#fa8232]">*</span>
                      </label>
                      <input
                        id="comment-email"
                        type="email"
                        placeholder="Email address"
                        value={commentForm.email}
                        onChange={(e) =>
                          setCommentForm((f) => ({
                            ...f,
                            email: e.target.value,
                          }))
                        }
                        className="h-11 px-4 border border-[#e4e7e9] rounded-[2px] text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#fa8232] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="comment-message"
                      className="text-[14px] font-medium leading-5 text-[#191c1f]"
                    >
                      Your message <span className="text-[#fa8232]">*</span>
                    </label>
                    <textarea
                      id="comment-message"
                      placeholder="Write your message..."
                      rows={5}
                      value={commentForm.message}
                      onChange={(e) =>
                        setCommentForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }))
                      }
                      className="px-4 py-3 border border-[#e4e7e9] rounded-[2px] text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#fa8232] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="self-start bg-[#fa8232] text-white text-[14px] font-bold leading-5 uppercase tracking-[0.168px] px-8 py-3.5 rounded-[2px] cursor-pointer hover:bg-[#e6721f] transition-colors"
                  >
                    Submit Comment
                  </button>
                </form>
              </div>
            </article>

            {/* ── Sidebar ── */}
            <aside className="w-[400px] shrink-0 flex flex-col gap-6">
              {/* Search */}
              <div className="flex items-center gap-2 bg-white border border-[#e4e7e9] rounded-[2px] px-4 py-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none border-0 bg-transparent"
                />
                <SearchIcon />
              </div>

              {/* Category */}
              <div className="bg-white border border-[#e4e7e9] rounded-[4px] p-6 flex flex-col gap-4">
                <h3 className="text-[16px] font-medium leading-6 text-[#191c1f] uppercase tracking-wide">
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
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? "bg-[#fa8232] border-[#fa8232]"
                              : "bg-white border-[#c9cfd2]"
                          }`}
                        >
                          {isActive && (
                            <div className="w-2 h-2 rounded-full bg-white" />
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
              <div className="bg-white border border-[#e4e7e9] rounded-[6px] p-6 flex flex-col gap-6">
                <h3 className="text-[16px] font-medium leading-6 text-[#191c1f] uppercase tracking-wide">
                  Latest Blog
                </h3>
                {LATEST_POSTS.map((post) => (
                  <Link
                    key={post.id}
                    href="#"
                    className="flex gap-4 items-center no-underline group"
                  >
                    <div className="relative w-[104px] h-20 rounded-[2px] overflow-hidden shrink-0">
                      <Image
                        src={IMG_LATEST_BLOG}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[14px] font-medium leading-5 text-[#191c1f] line-clamp-2 group-hover:text-[#fa8232] transition-colors">
                        {post.title}
                      </p>
                      <p className="text-[14px] font-normal leading-5 text-[#77878f]">
                        {post.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Gallery */}
              <div className="bg-white border border-[#e4e7e9] rounded-[6px] p-6 flex flex-col gap-6">
                <h3 className="text-[16px] font-medium leading-6 text-[#191c1f] uppercase tracking-wide">
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
                            className="relative w-20 h-20 rounded-[2px] overflow-hidden"
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
                <h3 className="text-[16px] font-medium leading-6 text-[#191c1f] uppercase tracking-wide">
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
                        className={`px-3 py-1.5 rounded-[2px] border text-[14px] font-medium leading-5 cursor-pointer transition-colors ${
                          isActive
                            ? "bg-[#fff3eb] border-[#fa8232] text-[#fa8232]"
                            : "bg-white border-[#e4e7e9] text-[#191c1f] hover:border-[#fa8232] hover:text-[#fa8232]"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
