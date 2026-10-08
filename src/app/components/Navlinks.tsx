import React from 'react';
import CategoryLink from './CategoryLink'; // Import the client wrapper

// Updated interface to match your API structure where id is a string
interface Category {
    id: string; 
    slug: string;
    nameBn: string;
    icon: string;
}

const Navlinks = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data: Category[] = await res.json();

    return (
        <ul className="flex gap-4 w-7xl mx-25 list-none p-2 items-center overflow-x-auto">
            {
                data.map((category: Category) => (
                    <li key={category.id}>
                        <CategoryLink 
                            id={category.id} 
                            icon={category.icon} 
                            nameBn={category.nameBn} 
                        />
                    </li>
                ))
            }
        </ul>
    );
};

export default Navlinks;
