'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function FoundItemsDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [foundItem, setFoundItem] = useState({
    ownerName: '',
    ownerStudentId: '',
    itemName: '',
    itemCategory: '',
    founderName: '',
    founderStudentId: '',
    itemPickUpLocation: '',
    details: '',
  });

  useEffect(() => {
    async function loadUserMetadata() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const { name, student_id } = data.user.user_metadata;
        setFoundItem((prev) => ({
          ...prev,
          founderName: name ?? '',
          founderStudentId: student_id ?? '',
        }));
      }
    }
    loadUserMetadata();
  }, []);

  useEffect(() => {
    async function fetchLostItem() {
      const res = await fetch(`http://localhost:3001/lost-items/${id}`);
      if (!res.ok) { alert('Lost item not found'); return; }
      const data = await res.json();
      setFoundItem((prev) => ({
        ...prev,
        ownerName: data.owner_name,
        ownerStudentId: data.owner_student_id,
        itemName: data.item_name,
        itemCategory: data.category,
      }));
      setLoading(false);
    }
    fetchLostItem();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFoundItem({ ...foundItem, [e.target.name]: e.target.value });
  }

  async function handleFound(e: React.FormEvent) {
    e.preventDefault();
    const session = await supabase.auth.getSession();
    const foundRes = await fetch(`http://localhost:3001/found-items/${id}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data.session?.access_token}`,
      },
      body: JSON.stringify(foundItem),
    });

    if (!foundRes.ok) { alert('Failed to submit found item'); return; }

    const statusRes = await fetch(`http://localhost:3001/lost-items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'FOUND' }),
    });

    if (statusRes.ok) {
      alert('Item marked as FOUND successfully!');
      router.push('/lost-items');
    }
  }

  if (loading) return <p className="p-10 text-center font-bold text-gray-400">Loading Form...</p>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className='max-w-2xl mx-auto'>
        <form onSubmit={handleFound} className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-6">
          <div className="border-b pb-4 mb-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Report Found Item</h1>
            <p className="text-sm text-slate-500 mt-1">Help reunite this item with its owner.</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-2 rounded-r-xl m-2">
             <p className="text-xs text-amber-800 font-medium">You can stay anonymous. Enter "Anonymous" for Name/Student ID if preferred. (*) Required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Your Name *</label>
              <input name="founderName" required value={foundItem.founderName} onChange={handleChange} className="w-full text-gray-700 py-3 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Your Student ID *</label>
              <input name="founderStudentId" required value={foundItem.founderStudentId} onChange={handleChange} className="w-full text-gray-700 py-3 px-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition" />
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-3">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Item (Read Only)</p>
             <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-slate-500">Item</label><p className="font-bold text-slate-700">{foundItem.itemName}</p></div>
                <div><label className="text-xs text-slate-500">Category</label><p className="font-bold text-slate-700">{foundItem.itemCategory}</p></div>
                <div className="col-span-2"><label className="text-xs text-slate-500">Owner</label><p className="font-bold text-slate-700">{foundItem.ownerName} ({foundItem.ownerStudentId})</p></div>
             </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Pick Up Location *</label>
              <input name="itemPickUpLocation" required value={foundItem.itemPickUpLocation} onChange={handleChange} className="w-full text-gray-700 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="Where can they find you?" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Additional Details</label>
              <textarea name="details" value={foundItem.details} onChange={handleChange} className="w-full text-gray-700 px-4 py-3 rounded-xl border border-slate-200 h-28 resize-none focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="Any specific message for the owner?" />
            </div>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition font-black shadow-lg shadow-green-100">SUBMIT FOUND REPORT</button>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/lost-items"><button className='bg-teal-100 text-teal-700 py-2 px-4 rounded-lg hover:bg-teal-200 transition text-sm font-bold'>Back to Lost Items</button></Link>
            <Link href="/"><button className='bg-slate-200 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-300 transition text-sm font-bold'>Home</button></Link>
          </div>
        </form>
               
      </div>
    </div>
  );
}