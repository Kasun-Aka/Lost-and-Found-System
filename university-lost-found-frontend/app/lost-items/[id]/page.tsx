'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from "@/api/config";
import { useParams } from 'next/navigation';
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

export default function LostItemDetails() {
  const params = useParams();
  const id = params.id as string;

  const [item, setItem] = useState<LostItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchItem() {
      const res = await fetch(`${API_BASE_URL}/lost-items/${id}`);
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

  if (loading) return <LostItemDetailsSkeleton />;
  if (!item) return <LostItemDetailsSkeleton title="Item Not Found" />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-slate-50 border-b border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={item.status} />
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
                {item.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              {item.item_name}
            </h1>
          </div>

          <div className="p-8">
            {/* Info Grid */}
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                  📍
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Last Seen At</p>
                  <p className="text-slate-700 font-medium">{item.location_description}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                  🕒
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Time Lost</p>
                  <p className="text-slate-700 font-medium">{new Date(item.lost_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                  👤
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Reported By</p>
                  <p className="text-slate-700 font-medium">
                    {item.owner_name} <span className="text-slate-400 ml-1 text-sm">({item.owner_student_id})</span>
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-100" />

            {/* Description Section */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 mb-3">Additional Details</h2>
              {item.description ? (
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-2xl italic border border-slate-100">
                  "{item.description}"
                </p>
              ) : (
                <p className="text-slate-400 italic">No additional details provided.</p>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-10">
              <Link href={`/found-items/${item.id}`}>
                <button className="w-full bg-[#1B0085] text-white py-4 rounded-2xl hover:bg-[#2a0e9c] transition shadow-lg shadow-indigo-100 font-semibold text-lg">
                  I found this item
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full mt-8 flex justify-between items-center px-2">
          <button className='bg-emerald-400 border border-slate-200 text-white-600 py-2 px-6 rounded-xl hover:bg-emerald-500 transition font-medium shadow-sm'>
          <Link href={`/lost-items`} className="text-white hover:text-white flex items-center gap-2 transition font-medium">
            ← Back to Lost Items
          </Link>
          </button>
          <Link href={`/`}>
            <button className='bg-red-100 border border-slate-200 text-red-400 py-2 px-6 rounded-xl hover:bg-red-200 transition font-medium shadow-sm'>
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  function LostItemDetailsSkeleton({ title }: { title?: string }) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm p-8 border border-slate-200">
          {title ? (
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
          ) : (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
              <div className="h-10 w-64 bg-slate-200 rounded-xl"></div>
              <div className="space-y-3 pt-6">
                <div className="h-12 w-full bg-slate-100 rounded-2xl"></div>
                <div className="h-12 w-full bg-slate-100 rounded-2xl"></div>
                <div className="h-12 w-full bg-slate-100 rounded-2xl"></div>
              </div>
            </div>
          )}
          <div className="mt-8">
            <Link href="/lost-items" className="text-[#1B0085] font-medium underline">← Back to Lost Items</Link>
          </div>
        </div>
      </div>
    );
  }

  function StatusBadge({ status }: { status: 'LOST' | 'FOUND' }) {
    const styles = status === 'LOST' 
      ? 'bg-red-50 text-red-600 border-red-100' 
      : 'bg-green-50 text-green-600 border-green-100';
    return (
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${styles}`}>
        {status}
      </span>
    );
  }
}