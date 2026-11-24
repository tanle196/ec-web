import Link from "next/link";
import { ArrowRight, User, Calendar, MessageCircle } from "lucide-react";
import { Container } from "@/components/commons/container";

/* ── Figma assets (expire 7 days) ─────────────────────────────────── */
const IMG_WATCH =
  "https://www.figma.com/api/mcp/asset/dd219d4e-dba2-4ec8-b238-2a12e0d94f08";
const IMG_PCB =
  "https://www.figma.com/api/mcp/asset/8907aa3f-8981-47b0-a00d-5ae140f26b75";
const IMG_PHONE =
  "https://www.figma.com/api/mcp/asset/12ad13b1-251a-4360-9219-2839a76eaa7c";

interface BlogPost {
  img: string;
  author: string;
  date: string;
  comments: string;
  title: string;
  excerpt: string;
}

const POSTS: BlogPost[] = [
  {
    img: IMG_WATCH,
    author: "Kristin",
    date: "19 Dec, 2013",
    comments: "453",
    title:
      "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
    excerpt:
      "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
  },
  {
    img: IMG_PCB,
    author: "Robert",
    date: "28 Nov, 2015",
    comments: "738",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    excerpt:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    img: IMG_PHONE,
    author: "Arlene",
    date: "9 May, 2014",
    comments: "826",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    excerpt:
      "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col gap-6 rounded-sm border border-gray-100 bg-white p-8 shadow-[0_8px_12px_rgba(0,0,0,0.04)]">
      {/* Cover image */}
      <div className="h-[248px] w-full shrink-0 overflow-hidden rounded-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.img}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Meta row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-body-sm text-gray-700">
            <User size={18} className="text-gray-700" aria-hidden />
            {post.author}
          </div>
          <div className="flex items-center gap-1.5 text-body-sm text-gray-700">
            <Calendar size={18} className="text-gray-700" aria-hidden />
            {post.date}
          </div>
          <div className="flex items-center gap-1.5 text-body-sm text-gray-700">
            <MessageCircle size={18} className="text-gray-700" aria-hidden />
            {post.comments}
          </div>
        </div>
        <h3 className="text-body-lg leading-6 font-medium text-gray-900">
          {post.title}
        </h3>
        <p className="text-body-md leading-6 text-gray-500">{post.excerpt}</p>
      </div>

      {/* CTA */}
      <Link
        href="/blog"
        className="flex h-12 w-fit items-center gap-2 rounded-sm border-2 border-primary-100 px-6 text-body-sm font-bold tracking-[0.168px] text-primary-500 uppercase no-underline transition-colors hover:bg-primary-100"
      >
        Read more <ArrowRight size={18} strokeWidth={2} aria-hidden />
      </Link>
    </article>
  );
}

export function LatestNews() {
  return (
    <section className="bg-gray-50 py-18">
      <Container>
        <h2 className="mb-10 text-center text-heading-1 font-semibold text-gray-900">
          Latest News
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
