'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

type LostItem = {
  id: string;
  item_name: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
};

type FoundItem = {
  id: string;
  item_name: string;
  lost_item_id: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState({ name: '', studentId: '' });
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUser();
    loadMyItems();
  }, []);

  /* ---------------- USER PROFILE ---------------- */

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    setUser({
      name: data.user.user_metadata.name || '',
      studentId: data.user.user_metadata.student_id || '',
    });
  }

  async function saveProfile() {
    setSaving(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        name: user.name,
        student_id: user.studentId,
      },
    });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Profile updated successfully');
  }

  async function sendPasswordReset() {
    const { data } = await supabase.auth.getUser();
    if (!data.user?.email) return;

    await supabase.auth.resetPasswordForEmail(data.user.email);
    alert('Password reset email sent');
  }

  /* ---------------- ITEMS ---------------- */

  async function loadMyItems() {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    const userId = session.data.session?.user.id;

    const lostRes = await fetch('http://localhost:3001/lost-items/mine', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLostItems(await lostRes.json());

    const foundRes = await fetch('http://localhost:3001/found-items/mine', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFoundItems(await foundRes.json());
    
  }

  async function markAsClaimed(lostItemId: string) {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    const res = await fetch(
      `http://localhost:3001/lost-items/${lostItemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'CLAIMED' }),
      }
    );

    if (!res.ok) {
      alert('Failed to mark as claimed');
      return;
    }

    loadMyItems();
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto p-6 space-y-8 text-gray-700">

        <h1 className="text-3xl font-bold text-black">My Dashboard</h1>

        {/* PROFILE */}
        <section className="bg-white p-4 rounded-xl shadow space-y-3">
          <h2 className="font-semibold">Profile</h2>

          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Student ID"
            value={user.studentId}
            onChange={(e) =>
              setUser({ ...user, studentId: e.target.value })
            }
          />

          <div className="flex gap-3">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Profile
            </button>

            <button
              onClick={sendPasswordReset}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Change Password
            </button>
          </div>
        </section>

        {/* LOST ITEMS */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">My Lost Items</h2>

          {lostItems?.map((item) => (
            <Link
              key={item.id}
              href={`/lost-items/${item.id}`}
              className="block border-b py-2 hover:bg-gray-50">
              {item.item_name} — <span className="text-sm">{item.status}</span>
            </Link>
          ))}
        </section>

        {/* FOUND ITEMS */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Items I Found</h2>

          {foundItems?.map((item) => (
            <div
              key={item.id}
              className="border-b py-2 flex justify-between items-center"
            >
              <Link
                href={`/found-items/${item.id}`}
                className="hover:underline">
                {item.item_name}
              </Link>

              <button
                onClick={() => markAsClaimed(item.lost_item_id)}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded"
              >
                Mark as Claimed
              </button>
            </div>
          ))}
        </section>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
