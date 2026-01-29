'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from "@/api/config";
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

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
  const [error, setError] = useState<string | null>(null);

  /* --- PAGING SYSTEM LOGIC --- */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchFoundItems() {
      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;

        const res = await fetch(`${API_BASE_URL}/found-items`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 403 || res.status === 401) {
          setError("Access Denied: Admin privileges required to view found items.");
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setFoundItems(data);
      } catch (err) {
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchFoundItems();
  }, []);

  // Calculate items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = foundItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(foundItems.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Found Items</h1>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <LostItemCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State for Admin Guard failure
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200 p-10 text-center border border-slate-100">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Restricted Area</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">{error}</p>
          <Link href="/">
            <button className="w-full bg-[#1B0085] text-white py-3.5 rounded-2xl font-bold hover:bg-indigo-800 transition">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Admin Badge */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Found Items</h1>
          <div className="bg-white px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
            Admin Access
          </div>
        </div>

        {foundItems.length === 0 && (
          <p className="text-gray-500 italic">No found items reported yet.</p>
        )}

        <ul className="space-y-4">
          {currentItems.map((item) => (
            <li key={item.id}>
              <Link href={`/found-items/found/${item.id}`}>
                {/* YOUR ORIGINAL DESIGN */}
                <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-lg font-semibold text-[#1B0085]">{item.item_name}</h2>
                    <div className="flex gap-2">
                      <StatusBadge status={item.status} />
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">📍 {item.location_description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* PAGING SYSTEM CONTROLS */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-bold transition ${
                  currentPage === i + 1 
                  ? 'bg-[#1B0085] text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href={`/`}>
            <button className='bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition font-medium'>
              Back to home
            </button>
          </Link>
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