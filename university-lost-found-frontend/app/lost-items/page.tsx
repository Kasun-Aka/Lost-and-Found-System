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
  status: 'LOST' | 'FOUND';
};

export default function LostItemsPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Paging System
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('http://localhost:3001/lost-items');
      const data = await res.json();
      setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Lost Items</h1>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <LostItemCardSkeleton key={i} />
            ))}
          </div>
          <div className="mt-4">
            <Link href={`/`}><button className='bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition font-medium '>Back to home</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lost Items</h1>
        {items.length === 0 && <p className="text-gray-500 italic">No lost items reported yet.</p>}
        <ul className="space-y-4">
          {currentItems.map((item) => (
            <li key={item.id}>
              <Link href={`/lost-items/${item.id}`}>
                <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-lg font-semibold text-[#1B0085]">{item.item_name}</h2>
                    <div className="flex gap-2">
                      <StatusBadge status={item.status} />
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{item.category}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">📍 {item.location_description}</p>
                  <p className="text-sm text-gray-500">🕒 Lost at {new Date(item.lost_at).toLocaleString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-lg font-bold transition ${currentPage === i + 1 ? 'bg-[#1B0085] text-white' : 'bg-white text-gray-600 border'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href={`/`}><button className='bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition font-medium '>Back to Home</button></Link>
        </div>
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
    const styles = status === 'LOST' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
    return <span className={`text-xs px-2 py-1 rounded-full ${styles}`}>{status}</span>;
  }
}