'use client' // Required for usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface CategoryLinkProps {
    id: string; // Updated to string based on your API response
    icon: string;
    nameBn: string;
}

export default function CategoryLink({ id, icon, nameBn }: CategoryLinkProps) {
    const pathname = usePathname();
    const targetHref = `/category/${id}`;
    
    // Check if the current URL matches this link's path
    const isActive = pathname === targetHref;

    return (
        <Link 
            href={targetHref}
            className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive 
                    ? 'bg-blue-600 text-white font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'     
            }`}
        >
            {icon} {nameBn}
        </Link>
    );
}
