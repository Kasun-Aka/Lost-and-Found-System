'use client';

import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "@/api/config";
import Link from 'next/link';

export default function AboutUsPage() {
  const [stats, setStats] = useState({ lostCount: 'Loading', foundCount: 'Loading' });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [lostRes, foundRes] = await Promise.all([
          fetch(`${API_BASE_URL}/lost-items/list`),
          fetch(`${API_BASE_URL}/found-items/list`)
        ]);
        const lostData = await lostRes.json();
        const foundData = await foundRes.json();
        setStats({ lostCount: lostData.length || 'Loading', foundCount: foundData.length || 'Loading' });
      } catch (err) { console.error(err); }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Hero Section */}
        <section className="bg-[#1B0085] rounded-[2.5rem] p-12 text-center text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">Reuniting Belongings.</h1>
          <p className="text-indigo-100 text-lg max-w-xl mx-auto opacity-90">
            A seamless digital bridge for our campus community to report, track, and recover lost items with ease.
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center gap-6 shadow-sm">
            <div className="bg-amber-100 text-3xl p-4 rounded-2xl">🔎</div>
            <div>
              <h3 className="text-3xl font-bold text-slate-800">{stats.lostCount}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lost Reports</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center gap-6 shadow-sm">
            <div className="bg-emerald-100 text-3xl p-4 rounded-2xl">✅</div>
            <div>
              <h3 className="text-3xl font-bold text-slate-800">{stats.foundCount}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Items Found</p>
            </div>
          </div>
        </div>

        {/* Full-Width Contact Section */}
        <section className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Get in Touch</h2>
            <p className="text-slate-500">Have questions or need assistance with a claim?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="text-indigo-600 text-xl">📧</div>
              <p className="font-semibold text-slate-700 text-sm">support@lost-found.org</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-indigo-600 text-xl">📍</div>
              <p className="font-semibold text-slate-700 text-sm">Main Office, Block B</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-indigo-600 text-xl">📞</div>
              <p className="font-semibold text-slate-700 text-sm">+94 (77) 123-4567</p>
            </div>
          </div>
        </section>

        {/* Developer Portfolio Section */}
        <section className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8  mb-2">
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-gray-400">The Developer</h2>
              <h3 className="text-xl font-semibold text-white">Upek Kasun Akalanka</h3>
              <p className="text-slate-400 text-sm">Built with Next.js(React), NestJS & Supabase</p>
            </div>
            <p className="text-slate-300 max-w-md">
              Hi, I'm a developer passionate about building clean, functional tools that solve real-world problems.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Kasun-Aka" target="_blank" className="bg-white rounded-full transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1280px-Octicons-mark-github.svg.png?20180806170715" 
                alt="GitHub" className="h-10 w-auto" />
            </a>
            <a href="https://kasun-akalanka-web.vercel.app/" target="_blank" className="transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" >
              <img src="https://kasun-akalanka-web.vercel.app/assets/ghostdevKA.webp" 
                alt="Portfolio" className="h-10 w-auto" />
            </a>
          </div>
        </section>

        <div className="text-center mt-1">
          <Link href="/" className="text-slate-500 hover:text-slate-600 text-sm font-medium transition">
          <button className="bg-red-200 hover:bg-red-300 px-6 py-2 rounded-full transition shadow-lg shadow-red-200 font-medium text-sm">
            ← Back to Home Page
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}