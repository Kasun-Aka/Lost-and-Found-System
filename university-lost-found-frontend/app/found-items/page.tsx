'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type FoundItem = {
  id: string;
  owner_name: string;
  owner_student_id: string;
  item_name: string;
  category: string;
  location_description: string;
  lost_at: string;
  description: string;
  status: 'LOST' | 'FOUND';
};

export default function FoundItemsPage() {
    const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFoundItems() {
            const res = await fetch('http://localhost:3001/found-items');
            const data = await res.json();
            setFoundItems(data);
            setLoading(false);
    }

        fetchFoundItems();
      }, []);

      if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Found Items
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
            Found Items
          </h1>

          {/* Empty state */}
          {foundItems.length === 0 && (
            <p className="text-gray-500 italic">
              No found items reported yet.
            </p>
          )}

          {/* Items list */}
          <ul className="space-y-4">
            {foundItems.map((item) => (
              <li key={item.id}>
                <Link href={`/found-items/found/${item.id}`}>
                  <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer">

                    {/* Title + category */}
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-lg font-semibold text-[#1B0085]">
                        {item.item_name}
                      </h2>

                      <div className="flex gap-2">
                          <StatusBadge status={item.status} />
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            {item.category}
                          </span>
                        </div>
                    </div>

                    {/* Meta info */}
                    <p className="text-sm text-gray-600 mb-1">
                      📍 {item.location_description}
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

      function StatusBadge({ status }: { status: 'LOST' | 'FOUND' }) {
        const styles =
          status === 'LOST'
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700';

        return (
          <span className={`text-xs px-2 py-1 rounded-full ${styles}`}>
            {status}
          </span>
        );
      }


    }
