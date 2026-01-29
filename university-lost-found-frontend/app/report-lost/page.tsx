'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ReportLostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    studentName: '',
    studentId: '',
    itemName: '',
    itemCategory: '',
    location: '',
    lostDatetime: '',
    details: '',
  });

  const categories = [
    "Electronics",
    "Books & Stationery",
    "Personal Items (Wallet/Keys)",
    "Clothing & Accessories",
    "Bottles & Containers",
    "ID Cards & Documents",
    "Other"
  ];

  useEffect(() => {
    async function loadUserMetadata() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setForm((prev) => ({
          ...prev,
          studentName: data.user.user_metadata.name ?? '',
          studentId: data.user.user_metadata.student_id ?? '',
        }));
      }
    }
    loadUserMetadata();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const session = await supabase.auth.getSession();
    
    if (!session.data.session) {
      alert('Session expired. Please login again.');
      return;
    }

    const res = await fetch('http://localhost:3001/lost-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data.session.access_token}`,
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      alert('Reported successfully!');
      router.push('/dashboard');
    } else {
      alert('Failed to submit report');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-slate-200 p-4 space-y-8 border border-slate-100">
          <div className="border-b border-slate-100 pb-3">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Report Lost Item</h1>
            <p className="text-slate-500 mt-2">Fill in the details to notify the community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Student Name</label>
              <input readOnly value={form.studentName} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 cursor-not-allowed outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Student ID</label>
              <input readOnly value={form.studentId} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 cursor-not-allowed outline-none" />
            </div>
          </div>

          <div className="space-y-5 mb-2">
            <h2 className="text-lg font-bold text-blue-600 border-l-4 border-blue-600 pl-3">Item Information</h2>
            
            <div className="space-y-3 text-gray-700">
              <input name="itemName" required placeholder="Item Name (e.g. Laptop Charger)" value={form.itemName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              
              <div className="relative">
                <select 
                  name="itemCategory" 
                  required 
                  value={form.itemCategory} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium bg-white appearance-none text-slate-700">
                  <option value="" disabled>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              
              <input name="location" required placeholder="Where did you lose it?" value={form.location} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Date & Time Lost</label>
                <input type="datetime-local" name="lostDatetime" required value={form.lostDatetime} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-600" />
              </div>
              <textarea name="details" placeholder="Additional details (unique marks, color...)" value={form.details} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 h-32 outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-100 disabled:bg-slate-300 mb-2">
            {loading ? 'Submitting...' : 'Submit Official Report'}
          </button>
          <div className="text-center mt-1">
          <Link href="/" className="bg-red-100 text-red-600 font-medium transition text-sm rounded-lg px-3 py-2 inline-block hover:bg-red-200">← Cancel and Go Home</Link>
          </div>
        </form>
        
        
      </div>
    </div>
  );
}