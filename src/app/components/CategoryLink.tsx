
"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryLinkProps {
  id: string;
  icon: string;
  nameBn: string;
}

function CategoryLinkContent({ id, icon, nameBn }: CategoryLinkProps) {
  const pathname = usePathname();
  const targetHref = `/category/${id}`;
  const isActive = pathname === targetHref;

  return (
    <Link
      href={targetHref}
      className={isActive ? "active-category" : ""}
    >
      {icon} {nameBn}
    </Link>
  );
}

export default function CategoryLink(props: CategoryLinkProps) {
  return (
    <Suspense fallback={<span>{props.nameBn}</span>}>
      <CategoryLinkContent {...props} />
    </Suspense>
  );
}
