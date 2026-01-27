'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function ReportLostPage() {
  const [form, setForm] = useState({
    studentName: '',
    studentId: '',
    itemName: '',
    itemCategory: '',
    location: '',
    lostDatetime: '',
    details: '',
  });


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      const session = await supabase.auth.getSession();

      const res = await fetch('http://localhost:3001/lost-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert('Failed to submit');
        return;
      }

      const data = await res.json();
      console.log('Saved:', data);

      alert('Lost item reported successfully!');
        setForm({
          studentName: '',
          studentId: '',
          itemName: '',
          itemCategory: '',
          location: '',
          lostDatetime: '',
          details: '',
        });
    }

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-5"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Report Lost Item
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Please provide accurate details to help recover your item.
        </p>
      </div>

      {/* Student Info */}
      <div className="space-y-3">
        <div>
          <label className="labelLost">Student Name</label>
          <input
            name="studentName"
            required
            value={form.studentName}
            onChange={handleChange}
            placeholder="e.g. John Watson"
            className="inputLost"
          />
        </div>

        <div>
          <label className="labelLost">Student ID</label>
          <input
            name="studentId"
            required
            value={form.studentId}
            onChange={handleChange}
            placeholder="e.g. IT24XXXX"
            className="inputLost"
          />
        </div>
      </div>

      {/* Item Info */}
      <div className="space-y-3">
        <div>
          <label className="labelLost">Item Name</label>
          <input
            name="itemName"
            required
            value={form.itemName}
            onChange={handleChange}
            placeholder="e.g. Black Helmet"
            className="inputLost"
          />
        </div>

        <div>
          <label className="labelLost">Category</label>
          <input
            name="itemCategory"
            required
            value={form.itemCategory}
            onChange={handleChange}
            placeholder="e.g. Electronics, Bag, ID Card"
            className="inputLost"
          />
        </div>

        <div>
          <label className="labelLost">Lost Location</label>
          <input
            name="location"
            required
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Back gate, Library"
            className="inputLost"
          />
        </div>

        <div>
          <label className="labelLost">Lost Date & Time</label>
          <input
            type="datetime-local"
            required
            name="lostDatetime"
            value={form.lostDatetime}
            onChange={handleChange}
            className="inputLost"
          />
        </div>
      </div>

      {/* Extra details */}
      <div>
        <label className="labelLost">Additional Details (optional)</label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Any unique marks, color, condition, etc."
          className="inputLost h-24 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Submit Lost Item Report
      </button>
    </form>
    <div className="mt-4">
      <Link href={`/`}>
        <button className='bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition font-medium '>Back to home</button>
      </Link>
    </div>
  </div>
);

}
