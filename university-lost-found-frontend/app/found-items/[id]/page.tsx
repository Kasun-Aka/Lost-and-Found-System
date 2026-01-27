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

  /* ---------------- FETCH LOST ITEM ---------------- */
  useEffect(() => {
    async function fetchLostItem() {
      const res = await fetch(`http://localhost:3001/lost-items/${id}`);

      if (!res.ok) {
        alert('Lost item not found');
        return;
      }

      const data = await res.json();

      setFoundItem((prev) =>
      ({
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

  /* ---------------- HANDLE INPUT CHANGE ---------------- */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFoundItem({ ...foundItem, [e.target.name]: e.target.value });
  }

  /* ---------------- SUBMIT FOUND ITEM ---------------- */
  async function handleFound(e: React.FormEvent) {
  e.preventDefault();

  const payload = {
    ownerName: foundItem.ownerName,
    ownerStudentId: foundItem.ownerStudentId,
    itemName: foundItem.itemName,
    itemCategory: foundItem.itemCategory,
    founderName: foundItem.founderName,
    founderStudentId: foundItem.founderStudentId,
    itemPickUpLocation: foundItem.itemPickUpLocation,
    details: foundItem.details,
  };

  /* Save found item */
  const session = await supabase.auth.getSession();

  const foundRes = await fetch(`http://localhost:3001/found-items/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `Bearer ${session.data.session?.access_token}`,
     },
    body: JSON.stringify(payload),
  });

  if (!foundRes.ok) {
    alert('Failed to submit found item');
    return;
  }

  /* Update lost item status */
  const statusRes = await fetch(`http://localhost:3001/lost-items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'FOUND' }),
  });

  if (!statusRes.ok) {
    alert('Found item saved, but failed to update lost item status');
    return;
  }

  /* Success */
  alert('Item marked as FOUND successfully!');
  router.push('/lost-items');
}


  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className='w-xl p-4'>
      <form
        onSubmit={handleFound}
        className="w-full bg-white rounded-xl shadow p-5 space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Report Found Item
        </h1>

        {/* FOUND BY */}
        <div>
          <label className="labelLost">Your Name</label>
          <input
            name="founderName"
            required
            value={foundItem.founderName}
            onChange={handleChange}
            className="inputLost"
          />
        </div>

        <div>
          <label className="labelLost">Your Student ID</label>
          <input
            name="founderStudentId"
            required
            value={foundItem.founderStudentId}
            onChange={handleChange}
            className="inputLost"
          />
        </div>

        <hr />

        {/* LOST ITEM (READ ONLY) */}
        <div>
          <label className="labelLost">Item Name</label>
          <input
            value={foundItem.itemName}
            disabled
            className="inputLost bg-gray-100 text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="labelLost">Category</label>
          <input
            value={foundItem.itemCategory}
            disabled
            className="inputLost bg-gray-100 text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="labelLost">Owner</label>
          <input
            value={`${foundItem.ownerName} (${foundItem.ownerStudentId})`}
            disabled
            className="inputLost bg-gray-100 text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* PICKUP */}
        <div>
          <label className="labelLost">Pick Up Location</label>
          <input
            name="itemPickUpLocation"
            required
            value={foundItem.itemPickUpLocation}
            onChange={handleChange}
            className="inputLost"
          />
        </div>

        <div>
          <label className="labelLost">Additional Details</label>
          <textarea
            name="details"
            value={foundItem.details}
            onChange={handleChange}
            className="inputLost h-24 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
        >
          Submit Found Item
        </button>
      </form>
      <div className="w-full mt-4 flex justify-between items-start">
            <Link href={`/found-items`}>
              <button className='bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition font-medium '>Go to Found Items</button>
            </Link>
            <Link href={`/lost-items`}>
              <button className='bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition font-medium '>Go to Lost Items</button>
            </Link>
            <Link href={`/`}>
              <button className='bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition font-medium '>Back to home</button>
            </Link>
      </div>
      </div>
     </div>
  );
}


