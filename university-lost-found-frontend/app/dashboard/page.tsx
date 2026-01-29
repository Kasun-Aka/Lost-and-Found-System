'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

type LostItem = {
  id: string;
  item_name: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
};

export default function DashboardPage() {
  const [user, setUser] = useState({ name: '', studentId: '' });
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUser();
    loadMyItems();
  }, []);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    setUser({
      name: data.user.user_metadata.name || '',
      studentId: data.user.user_metadata.student_id || '',
    });
  }

  async function loadMyItems() {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    const lostRes = await fetch('http://localhost:3001/lost-items/mine', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLostItems(await lostRes.json());
  }

  async function markAsClaimed(lostItemId: string) {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    
    const res = await fetch(`http://localhost:3001/lost-items/${lostItemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: 'CLAIMED' }),
    });

    if (!res.ok) {
      alert('Failed to mark as claimed');
      return;
    }

    alert('Item marked as CLAIMED successfully!');
    loadMyItems();
  }

  async function saveProfile() {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { name: user.name, student_id: user.studentId },
    });
    setSaving(false);
    if (error) { alert(error.message); return; }
    alert('Profile updated successfully');
  }

  async function sendPasswordReset() {
    const { data } = await supabase.auth.getUser();
    if (!data.user?.email) return;
    await supabase.auth.resetPasswordForEmail(data.user.email);
    alert('Password reset email sent');
  }

  // Derived filtered lists
  const activeLostItems = lostItems.filter(item => item.status === 'LOST');
  const foundItems = lostItems.filter(item => item.status === 'FOUND');
  const successfullyClaimedItems = lostItems.filter(item => item.status === 'CLAIMED');

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Dashboard</h1>
          <Link href="/" className="bg-slate-300 border border-slate-400 text-gray-900 px-5 py-2 rounded-xl hover:bg-slate-50 transition font-medium shadow-sm">
            Back to Home
          </Link>
        </div>

        {/* Profile Section */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Profile Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
              <input className="w-full text-gray-700 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Student ID</label>
              <input className="w-full text-gray-700 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" value={user.studentId} onChange={(e) => setUser({ ...user, studentId: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={saveProfile} disabled={saving} className="bg-[#1B0085] text-white px-8 py-3 rounded-xl hover:bg-indigo-800 transition font-bold shadow-lg shadow-indigo-100">
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
            <button onClick={sendPasswordReset} className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl hover:bg-slate-200 transition font-bold">
              Change Password
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Active Lost Items */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <h2 className="bg-slate-800 px-6 py-4 font-bold text-white border-b border-slate-100">My Lost Items</h2>
            <div className="divide-y divide-slate-50">
              {activeLostItems.length > 0 ? activeLostItems.map((item) => (
                <Link key={item.id} href={`/lost-items/${item.id}`} className="flex justify-between items-center p-5 hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-700">{item.item_name}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-amber-100 text-amber-700`}>
                    {item.status}
                  </span>
                </Link>
              )) : (
                <p className="p-6 text-sm text-slate-400 italic text-center">No active lost items.</p>
              )}
            </div>
          </section>

          {/* Section 2: Items You Found */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <h2 className="bg-slate-800 px-6 py-4 font-bold text-white border-b border-slate-100">My Items Found</h2>
            <div className="divide-y divide-slate-50">
              {foundItems.length > 0 ? foundItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-5">
                  <Link href={`/found-items/found/${item.id}`} className="font-semibold text-slate-700 hover:text-blue-600 transition underline underline-offset-4 decoration-slate-200">
                    {item.item_name}
                  </Link>
                  <button onClick={() => markAsClaimed(item.id)} className="text-xs bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-700 transition shadow-md shadow-emerald-50">
                    Mark Claimed
                  </button>
                </div>
              )) : (
                <p className="p-6 text-sm text-slate-400 italic text-center">Your items haven't been reported found yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Section 3: Successfully Claimed Items */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <h2 className="bg-slate-800 px-6 py-4 font-bold text-white">Items Successfully Claimed</h2>
          <div className="divide-y divide-slate-50">
            {successfullyClaimedItems.length > 0 ? successfullyClaimedItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-6 bg-slate-50/30">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full text-xs">✓</div>
                  <span className="font-semibold text-slate-600 decoration-slate-300">{item.item_name}</span>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-200 text-slate-500 uppercase tracking-widest">
                  Closed / Claimed
                </span>
              </div>
            )) : (
              <p className="p-10 text-sm text-slate-400 italic text-center">No claimed items yet.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}