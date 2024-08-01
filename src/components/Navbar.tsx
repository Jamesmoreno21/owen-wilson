"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const links = [
    { href: "/", text: "Home" },
    { href: "/movies", text: "Movies" },
    { href: "/directors", text: "Directors" },
    { href: "/extra-info", text: "Extra Information" },
  ];
  const pathname = usePathname();

  return (
    <nav className="flex flex-row items-center justify-between w-full pt-5 pb-4 px-8 bg-gray-800 text-white fixed top-0">
      <h1 className="text-2xl font-bold">Owen Wilson</h1>
      <div className="flex flex-row gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href ? "underline" : ""
            } hover:underline text-lg`}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}
