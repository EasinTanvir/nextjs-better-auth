// components/Navbar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="w-full bg-white shadow p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">MyApp</h1>

        <div className="flex gap-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/profile" className={linkClass("/profile")}>
            Profile
          </Link>
          <Link href="/login" className={linkClass("/login")}>
            Login
          </Link>
          <Link href="/register" className={linkClass("/register")}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
