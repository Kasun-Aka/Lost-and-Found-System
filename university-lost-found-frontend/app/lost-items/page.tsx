'use client';

import { useEffect, useState } from 'react';

type LostItem = {
  id: string;
  owner_name: string;
  owner_student_id: string;
  item_name: string;
  category: string;
  location_description: string;
  lost_at: string;
  description: string;
};

export default function LostItemsPage() {
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('http://localhost:3001/lost-items');
      const data = await res.json();
      setItems(data);
      setLoading(false);
    }

    fetchItems();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lost Items</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="border p-4">
            <h2 className="font-semibold">{item.item_name}</h2>
            <p className="text-sm text-gray-600">{item.category} • {item.location_description}</p>
            <p>{item.description}</p>
            <p className="text-sm">
              Lost at: {new Date(item.lost_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
