
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link, Button } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [date, setDate] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  const handleSignout = async () => {
    setIsSigningOut(true);

    try {
      const result = await signOut();

      if (result.error) {
        console.error("Sign out failed:", result.error);
        return;
      }

      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Unable to sign out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const authLinks = user ? (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsUserMenuOpen((prev) => !prev)}
        aria-expanded={isUserMenuOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-gray-100"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#05893E] font-semibold text-white">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <span className="max-w-32 truncate font-medium text-black">
          {user.name || "User"}
        </span>

        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${
            isUserMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6 9 6 6 6-6"
          />
        </svg>
      </button>

      
{isUserMenuOpen && (
  <div
    role="menu"
    className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
  >
    <div className="px-4 py-3">
      <p className="truncate text-sm font-semibold text-gray-900">
        {user.name || "User"}
      </p>

      <p className="break-all text-xs text-gray-500">
        {user.email}
      </p>
    </div>

    <div className="my-1 border-t border-gray-200" />

    <Link
      href="/profile"
      onClick={closeMenus}
      className="flex w-full rounded-lg px-4 py-3 text-gray-800 hover:bg-gray-100"
    >
      My Profile
    </Link>

    <div className="my-1 border-t border-gray-200" />

    <button
      type="button"
      role="menuitem"
      onClick={handleSignout}
      disabled={isSigningOut}
      className="w-full rounded-lg px-4 py-3 text-left text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSigningOut ? "Signing out..." : "Sign out"}
    </button>
  </div>
)}

    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link href="/sign-in" onClick={closeMenus}>
        <Button className="bg-white text-black">
          সাইন ইন
        </Button>
      </Link>

      <Link href="/sign-up" onClick={closeMenus}>
        <Button className="rounded-xl bg-[#05893E] py-4 text-white">
          সাইন আপ
        </Button>
      </Link>
    </div>
  );

  return (
    <nav className="sticky top-0 z-40 mx-auto w-full bg-white py-2 backdrop-blur-lg md:w-7xl">
      <header className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            className="md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>

            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>

          <div className="flex items-center">
            <span className="rounded-2xl bg-[#05893E] p-4">
              🛒
            </span>

            <div className="ml-2 flex flex-col">
              <Link href="/" className="text-2xl font-bold">
                বাজার দর
              </Link>

              <span className="text-sm">
                {date || "Loading..."}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden items-center md:flex">
          {!isPending && authLinks}
        </div>
      </header>

      {isMenuOpen && (
        <div className="border-t border-gray-200 px-4 py-3 md:hidden">
          {!isPending && authLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
