import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  MapPin,
  ArrowLeftRight,
  Headphones,
  Info,
  Phone,
} from "lucide-react";
import { PromoBanner } from "./promo-banner";
import { CategoryMenu } from "./category-menu";
import { Container } from "../commons/container";

/* ── Brand social icons ──────────────────────────────────────────── */

function TwitterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

/* ── Clicon Logo ─────────────────────────────────────────────────── */

function ClIconLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 flex-none no-underline"
      aria-label="Clicon home"
    >
      <span
        className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-none"
        aria-hidden
      >
        <span className="w-6 h-6 rounded-full border-[3px] border-secondary-700 block" />
      </span>
      <span className="text-white font-bold text-[32px] tracking-[-0.64px] leading-none">
        CLICON
      </span>
    </Link>
  );
}

/* ── Header ──────────────────────────────────────────────────────── */

export function Header() {
  return (
    <header>
      <PromoBanner />

      {/* Blue bars: TopBar + MiddleBar */}
      <div className="bg-secondary-700">
        {/* TopBar */}
        <div className="border-b border-white/20">
          <Container>
            <div className="flex items-center justify-between h-11 gap-4">
              <p className="text-white text-body-sm hidden lg:block whitespace-nowrap">
                Welcome to Clicon online eCommerce store.
              </p>

              <div className="flex items-center gap-5 ml-auto">
                {/* Social links */}
                <div className="hidden lg:flex items-center gap-3">
                  <span className="text-white text-body-sm">Follow us:</span>
                  <div className="flex items-center gap-3 text-white/80">
                    <a
                      href="#"
                      aria-label="Twitter"
                      className="hover:text-white transition-colors"
                    >
                      <TwitterIcon />
                    </a>
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="hover:text-white transition-colors"
                    >
                      <FacebookIcon />
                    </a>
                    <a
                      href="#"
                      aria-label="Pinterest"
                      className="hover:text-white transition-colors"
                    >
                      <PinterestIcon />
                    </a>
                    <a
                      href="#"
                      aria-label="Reddit"
                      className="hover:text-white transition-colors"
                    >
                      <RedditIcon />
                    </a>
                    <a
                      href="#"
                      aria-label="YouTube"
                      className="hover:text-white transition-colors"
                    >
                      <YouTubeIcon />
                    </a>
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="hover:text-white transition-colors"
                    >
                      <InstagramIcon />
                    </a>
                  </div>
                </div>

                <div
                  className="hidden lg:block h-7 w-px bg-white/30"
                  aria-hidden
                />

                <button className="flex items-center gap-1.5 text-white text-body-sm hover:text-white/80 transition-colors">
                  Eng{" "}
                  <ChevronDown size={12} className="opacity-50" aria-hidden />
                </button>
                <button className="flex items-center gap-1.5 text-white text-body-sm hover:text-white/80 transition-colors">
                  USD{" "}
                  <ChevronDown size={12} className="opacity-50" aria-hidden />
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* MiddleBar: Logo + Search + Icons */}
        <Container>
          <div className="flex items-center gap-6 lg:gap-10">
            <ClIconLogo />

            <form
              action="/search"
              method="GET"
              className="flex-1 flex items-center gap-4 bg-white rounded-sm px-5 py-3.5 shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
              role="search"
            >
              <input
                type="search"
                name="q"
                placeholder="Search for anything..."
                className="flex-1 text-body-sm text-gray-900 placeholder:text-gray-500 outline-none border-0 bg-transparent"
                aria-label="Search products"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="flex-none text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>

            <div className="flex items-center gap-5 flex-none">
              <Link
                href="/cart"
                className="relative"
                aria-label="Cart, 2 items"
              >
                <ShoppingCart
                  size={30}
                  className="text-white"
                  strokeWidth={1.5}
                />
                <span
                  aria-hidden
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white border-[1.5px] border-secondary-700 rounded-full text-[11px] font-semibold text-secondary-700 flex items-center justify-center leading-none"
                >
                  2
                </span>
              </Link>
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart size={30} className="text-white" strokeWidth={1.5} />
              </Link>
              <Link href="/account" aria-label="My account">
                <User size={30} className="text-white" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* BottomBar */}
      <div className="bg-white border-b border-gray-100">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <CategoryMenu />

              <nav
                className="hidden lg:flex items-center gap-6"
                aria-label="Quick links"
              >
                <Link
                  href="/track-order"
                  className="flex items-center gap-1.5 text-body-sm text-gray-600 no-underline hover:text-gray-900 transition-colors"
                >
                  <MapPin size={22} strokeWidth={1.5} aria-hidden /> Track Order
                </Link>
                <Link
                  href="/compare"
                  className="flex items-center gap-1.5 text-body-sm text-gray-600 no-underline hover:text-gray-900 transition-colors"
                >
                  <ArrowLeftRight size={22} strokeWidth={1.5} aria-hidden />{" "}
                  Compare
                </Link>
                <Link
                  href="/support"
                  className="flex items-center gap-1.5 text-body-sm text-gray-600 no-underline hover:text-gray-900 transition-colors"
                >
                  <Headphones size={22} strokeWidth={1.5} aria-hidden />{" "}
                  Customer Support
                </Link>
                <Link
                  href="/help"
                  className="flex items-center gap-1.5 text-body-sm text-gray-600 no-underline hover:text-gray-900 transition-colors"
                >
                  <Info size={22} strokeWidth={1.5} aria-hidden /> Need Help
                </Link>
              </nav>
            </div>

            <address className="hidden lg:flex items-center gap-2 not-italic">
              <Phone
                size={26}
                strokeWidth={1.5}
                className="text-gray-900"
                aria-hidden
              />
              <a
                href="tel:+12025550104"
                className="text-body-lg text-gray-900 no-underline hover:text-primary transition-colors"
              >
                +1-202-555-0104
              </a>
            </address>
          </div>
        </Container>
      </div>
    </header>
  );
}
