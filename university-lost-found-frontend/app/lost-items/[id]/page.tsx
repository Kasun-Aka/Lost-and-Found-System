'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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

export default function LostItemDetails() {
  const params = useParams();
  const id = params.id as string;

  const [item, setItem] = useState<LostItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchItem() {
      const res = await fetch(`http://localhost:3001/lost-items/${id}`);

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setItem(data);
      setLoading(false);
    }

    fetchItem();
  }, [id]);

  if (loading) {
      return <LostItemDetailsSkeleton />;
    }

  if (!item) {
      return (
        <LostItemDetailsSkeleton title="Item Not Found" />
      );
    }

  return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#1B0085] mb-2">
        {item.item_name}
      </h1>
      

      {/* Category badge */}
      <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
        {item.category}
      </span>

      {/* Info grid */}
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium text-[#501FAB]">📍 Location</span>
          <span>{item.location_description}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-[#501FAB]">🕒 Lost at</span>
          <span>{new Date(item.lost_at).toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-[#501FAB]">👤 Reported by</span>
          <span>
            {item.owner_name} ({item.owner_student_id})
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5" />

      {/* Description */}
      {item.description ? (
        <div>
          <h2 className="font-semibold text-gray-800 mb-1">
            Additional Details
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      ) : (
        <p className="text-gray-400 italic">
          No additional details provided.
        </p>
      )}

      {/* Footer action */}
      <div className="mt-6 text-right">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          I found this item
        </button>
      </div>
    </div>
  </div>
);

    interface Props {
        title?: string;
    }

    function LostItemDetailsSkeleton({title}: Props) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">

            {title ? (
              <h1 className="text-3xl font-bold text-[#1B0085] mb-2 animate-none">
                {title}
              </h1>
            ) : (
              <div className="h-7 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            )}

            <div className="h-4 w-24 bg-gray-200 rounded-full mb-6 animate-pulse"></div>

            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            <hr className="my-5" />

            <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>

            <div className="mt-6 flex justify-end">
              <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      );
    }

}
