'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <div className="flex justify-end items-end px-4 py-8 gap-4">

        <Link
          href="/login">
          <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition font-medium ">
          Login
          </button>
        </Link>
        <Link
          href="/register">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium ">
          Register
        </button>
        </Link>
      </div>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          University Lost & Found System
        </h1>

        <p className="max-w-2xl text-gray-600 text-lg mb-10">
          A centralized platform for students to report lost items, view found
          items, and reunite belongings safely and efficiently.
        </p>

        {/* Main Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
          <Link
            href="/report-lost"
            className="rounded-xl bg-blue-600 text-white p-6 text-center shadow hover:bg-blue-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Report Lost Item</h2>
            <p className="text-sm opacity-90">
              Lost something? Submit details and let others help.
            </p>
          </Link>

          <Link
            href="/lost-items"
            className="rounded-xl bg-white border border-gray-200 p-6 text-center shadow hover:border-blue-400 transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              View Lost Items
            </h2>
            <p className="text-sm text-gray-600">
              Browse recently reported lost items.
            </p>
          </Link>

          <Link
            href="/found-items"
            className="rounded-xl bg-white border border-gray-200 p-6 text-center shadow hover:border-green-400 transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Found Items
            </h2>
            <p className="text-sm text-gray-600">
              Check items that have already been found.
            </p>
          </Link>
        </div>
      </header>

      {/* Info Section */}
      <section className="bg-white border-t py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-2">Secure & Verified</h3>
            <p className="text-gray-600 text-sm">
              Student-based reporting ensures accountability and trust.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Fast & Simple</h3>
            <p className="text-gray-600 text-sm">
              Minimal steps to report or claim an item.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">University Focused</h3>
            <p className="text-gray-600 text-sm">
              Designed specifically for campus-level use.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} University Lost & Found System
      </footer>
    </div>
  );
}
