import Link from "next/link";

const links = [
  { href: "/products", label: "Sản phẩm" },
  { href: "/categories", label: "Danh mục" },
];

export function Nav() {
  return (
    <nav className="flex items-center gap-6">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
