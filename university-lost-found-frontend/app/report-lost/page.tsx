'use client';

import { useState } from 'react';

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
    
      const res = await fetch('http://localhost:3001/lost-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Report Lost Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="studentName"
          placeholder="Student Name"
          value={form.studentName}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="itemName"
          placeholder="Item Name"
          value={form.itemName}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="itemCategory"
          placeholder="Category"
          value={form.itemCategory}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="datetime-local"
          name="lostDatetime"
          value={form.lostDatetime}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="details"
          placeholder="Extra details (optional)"
          value={form.details}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
