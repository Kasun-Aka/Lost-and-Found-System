'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { API_BASE_URL } from "@/api/config";
import Link from 'next/link';

type FoundItem = {
  owner_name: string;
  owner_student_id: string;
  item_name: string;
  category: string;
  founder_name: string;
  founder_student_id: string;
  pickup_location: string;
  details: string;
};

export default function FoundItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState<FoundItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      const res = await fetch(`${API_BASE_URL}/found-items/found/${id}`);
      if (res.ok) setItem(await res.json());
      setLoading(false);
    }
    fetchItem();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-gray-400">Loading Details...</div>;
  if (!item) return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center"><h1 className="text-2xl font-bold mb-4">Item Not Found</h1><Link href="/found-items" className="text-blue-600 underline">Back to list</Link></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-[#1B0085] p-8 text-white">
           <span className="text-[10px] uppercase tracking-widest bg-green-500 px-3 py-1 rounded-full">FOUND</span>
           <h1 className="text-3xl font-bold mt-4">{item.item_name}</h1>
           <p className="opacity-70 mt-1 font-medium">{item.category}</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
             <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <span className="text-slate-400 text-sm font-bold uppercase">📍 Pickup At</span>
                <span className="text-slate-700 font-bold">{item.pickup_location}</span>
             </div>
             <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <span className="text-slate-400 text-sm font-bold uppercase">👤 Found By</span>
                <span className="text-slate-700 font-bold">{item.founder_name} ({item.founder_student_id})</span>
             </div>
          </div>

          <div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Message/Details</h2>
            <div className="bg-slate-50 p-4 rounded-xl text-slate-600 leading-relaxed italic">
              "{item.details || 'No additional details provided.'}"
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-4">
        <Link href="/found-items"><button className='bg-teal-600 text-white py-2 px-6 rounded-xl hover:bg-teal-700 transition font-bold shadow-lg shadow-teal-100'>Back to Found Items</button></Link>
        <Link href="/"><button className='bg-white text-slate-600 border border-slate-200 py-2 px-6 rounded-xl hover:bg-slate-50 transition font-bold'>Home</button></Link>
      </div>
    </div>
  );
}