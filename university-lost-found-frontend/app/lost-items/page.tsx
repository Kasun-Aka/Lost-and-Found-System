'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type LostItem = {
  id: string;
  owner_name: string;
  owner_student_id: string;
  item_name: string;
  category: string;
  location_description: string;
  lost_at: string;
  description: string;
};

export default function LostItemsPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('http://localhost:3001/lost-items');
      const data = await res.json();
      setItems(data);
      setLoading(false);
    }

    fetchItems();
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Lost Items
        </h1>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <LostItemCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-4xl mx-auto">
      
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Lost Items
      </h1>

      {/* Empty state */}
      {items.length === 0 && (
        <p className="text-gray-500 italic">
          No lost items reported yet.
        </p>
      )}

      {/* Items list */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/lost-items/${item.id}`}>
              <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer">
                
                {/* Title + category */}
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-semibold text-[#1B0085]">
                    {item.item_name}
                  </h2>

                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                    {item.category}
                  </span>
                </div>

                {/* Meta info */}
                <p className="text-sm text-gray-600 mb-1">
                  📍 {item.location_description}
                </p>

                <p className="text-sm text-gray-500">
                  🕒 Lost at {new Date(item.lost_at).toLocaleString()}
                </p>

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

  function LostItemCardSkeleton() {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
        <div className="flex justify-between mb-3">
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
        </div>
    
        <div className="h-4 w-60 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    );
  }
}
