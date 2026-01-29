'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col font-sans">
      {/* Navigation Header */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 hidden sm:block">UniFound</span>
        </div>

        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <button className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition shadow-md font-medium text-sm">
                      My Profile
                    </button>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-rose-50 border border-rose-200 text-rose-600 px-5 py-2 rounded-full hover:bg-rose-600 hover:text-white transition font-medium text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600 transition font-medium text-sm">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 font-medium text-sm">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-100 rounded-full">
          Campus Community Tool
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          University <span className="text-blue-600">Lost & Found</span>
        </h1>

        <p className="max-w-2xl text-slate-600 text-lg md:text-xl mb-12 leading-relaxed">
          The official centralized platform for students to report lost items, 
          browse found belongings, and reunite with what matters most.
        </p>

        {/* Main Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
          <Link
            href="/report-lost"
            className="group relative rounded-2xl bg-blue-600 text-white p-8 text-center shadow-xl shadow-blue-200 hover:scale-105 transition-all duration-300"
          >
            <div className="text-3xl mb-3">📢</div>
            <h2 className="text-xl font-bold mb-2">Report Lost</h2>
            <p className="text-sm text-blue-100">
              Lost an item? List it here so others can find you.
            </p>
          </Link>

          <Link
            href="/lost-items"
            className="group rounded-2xl bg-white border border-slate-200 p-8 text-center shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="text-3xl mb-3">🔍</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Browse Lost</h2>
            <p className="text-sm text-slate-500">
              See what others are looking for. Can you help?
            </p>
          </Link>

          <Link
            href="/found-items"
            className="group rounded-2xl bg-white border border-slate-200 p-8 text-center shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
          >
            <div className="text-3xl mb-3">🤝</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Found Items</h2>
            <p className="text-sm text-slate-500">
              Found something? Check if someone has claimed it.
            </p>
          </Link>
        </div>
      </header>

      {/* Info Section */}
      <section className="bg-white/50 backdrop-blur-md border-t border-slate-200 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 font-bold">01</div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Secure & Verified</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mandatory student ID verification ensures a safe and trusted community for all users.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-600 mb-4 font-bold">02</div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Fast Notification</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Get real-time updates and contact finders directly through our streamlined dashboard.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 font-bold">03</div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Campus Centric</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Optimized for university student ID system and common lost items in a university.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white text-center text-xs tracking-widest uppercase text-slate-400 py-8">
        © {new Date().getFullYear()} University Lost & Found System • All Rights Reserved
      </footer>
    </div>
  );
}