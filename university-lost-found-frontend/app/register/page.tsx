'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, student_id: studentId },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Account created! Please check your email for verification.');
    router.push('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 w-full max-w-md border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-200">U</div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-800">Create Account</h1>
        <p className="text-center text-slate-500 text-sm mb-8 mt-2">Join the University Lost & Found community</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Student ID"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <input
            type="email"
            required
            placeholder="University Email"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 disabled:bg-slate-300"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
          <Link href="/login" className="text-sm text-indigo-600 font-medium hover:underline">
            Already have an account? Login
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}