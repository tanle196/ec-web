import Link from "next/link";
import { Container } from "@/components/commons/container";

/* ── Social icons ────────────────────────────────────────────────── */

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

/* ── Payment icons (simplified SVG badges) ───────────────────────── */

function VisaIcon() {
  return (
    <div className="bg-white rounded px-2 py-1 h-8 flex items-center justify-center min-w-12">
      <svg viewBox="0 0 48 16" height="12" aria-label="Visa">
        <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1A1F71">VISA</text>
      </svg>
    </div>
  );
}

function MastercardIcon() {
  return (
    <div className="bg-white rounded px-2 py-1 h-8 flex items-center justify-center min-w-12" aria-label="Mastercard">
      <svg viewBox="0 0 38 24" height="18">
        <circle cx="15" cy="12" r="10" fill="#EB001B" />
        <circle cx="23" cy="12" r="10" fill="#F79E1B" />
        <path d="M19 5.28A10 10 0 0 1 23 12a10 10 0 0 1-4 6.72A10 10 0 0 1 15 12a10 10 0 0 1 4-6.72z" fill="#FF5F00" />
      </svg>
    </div>
  );
}

function PaypalIcon() {
  return (
    <div className="bg-white rounded px-2 py-1 h-8 flex items-center justify-center min-w-12">
      <svg viewBox="0 0 60 16" height="14" aria-label="PayPal">
        <text x="0" y="12" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#003087">Pay</text>
        <text x="22" y="12" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#009cde">Pal</text>
      </svg>
    </div>
  );
}

function AmexIcon() {
  return (
    <div className="bg-[#007BC1] rounded px-2 py-1 h-8 flex items-center justify-center min-w-12">
      <svg viewBox="0 0 60 14" height="10" aria-label="American Express">
        <text x="0" y="11" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white" letterSpacing="0.5">AMEX</text>
      </svg>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────────────── */

const FOOTER_LINKS = [
  {
    title: "My Account",
    links: [
      { label: "My Profile", href: "/account" },
      { label: "Login / Register", href: "/login" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "My Orders", href: "/account/orders" },
      { label: "Returns", href: "/account/returns" },
    ],
  },
  {
    title: "Helps",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "FAQs", href: "/help" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Proxy",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "Latest News", href: "/blog" },
      { label: "Affiliate Program", href: "/affiliate" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Phones & Tablets", href: "/categories/phones" },
      { label: "Computers & Laptops", href: "/categories/laptops" },
      { label: "Audio", href: "/categories/audio" },
      { label: "TV & Home Theater", href: "/categories/tv" },
      { label: "Cameras", href: "/categories/cameras" },
    ],
  },
] as const;

const SOCIAL = [
  { label: "Twitter", icon: <TwitterIcon />, href: "#" },
  { label: "Facebook", icon: <FacebookIcon />, href: "#" },
  { label: "Instagram", icon: <InstagramIcon />, href: "#" },
  { label: "YouTube", icon: <YouTubeIcon />, href: "#" },
  { label: "Pinterest", icon: <PinterestIcon />, href: "#" },
];

/* ── Footer ──────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer>
      {/* Main body */}
      <div className="bg-gray-900">
        <Container className="py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

            {/* Brand column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0" aria-hidden>
                  <span className="w-5 h-5 rounded-full border-[2.5px] border-secondary-700 block" />
                </span>
                <span className="text-white font-bold text-[28px] tracking-[-0.56px] leading-none">
                  CLICON
                </span>
              </div>

              <p className="text-body-sm text-gray-400 leading-relaxed max-w-60">
                Best information about the company goes here but now lorem ipsum is
                &nbsp; at the moment.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {SOCIAL.map(({ label, icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-500 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_LINKS.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-body-sm font-semibold text-white uppercase tracking-widest mb-5">
                  {title}
                </h3>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-body-sm text-gray-400 no-underline hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <Container className="py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-body-sm text-gray-500 text-center sm:text-left">
                © {new Date().getFullYear()} Clicon. All rights reserved.
              </p>
              <div className="flex items-center gap-2" aria-label="Accepted payment methods">
                <VisaIcon />
                <MastercardIcon />
                <PaypalIcon />
                <AmexIcon />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
