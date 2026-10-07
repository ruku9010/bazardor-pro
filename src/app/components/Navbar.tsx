"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const links = (
    <>
      <li>
        <Link href="/sign-in">
          <Button className="bg-white text-black">সাইন ইন</Button>{" "}
        </Link>
      </li>
      <li>
        <Link href="/sign-up">
          <Button className="bg-[#05893E] text-white rounded-xl py-4">সাইন আপ</Button>
        </Link>
      </li>
    </>
  );
  return (
    <nav className="sticky top-0 z-40 w-7xl mx-auto border-b border-separator bg-white backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
          <div className="flex">
            <span className="bg-[#05893E] p-4 rounded-2xl">🛒</span>
            <div className="flex flex-col ml-2">
              <span className="font-bold text-2xl">বাজার দর</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">{links}</ul>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">{links}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
