'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavbarComponent() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Navbar</h2>
      <nav className="border-b border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-xl font-bold">Logo</div>
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Home
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              About
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Services
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Contact
            </a>
          </div>
          <button className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign In
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-slate-600 hover:text-slate-900"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMobileOpen && (
          <div className="md:hidden border-t border-slate-200 px-6 py-4 space-y-3">
            <a href="#" className="block text-slate-600 hover:text-slate-900">
              Home
            </a>
            <a href="#" className="block text-slate-600 hover:text-slate-900">
              About
            </a>
            <a href="#" className="block text-slate-600 hover:text-slate-900">
              Services
            </a>
            <a href="#" className="block text-slate-600 hover:text-slate-900">
              Contact
            </a>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </div>
        )}
      </nav>
      <p className="text-sm text-slate-600">Resize your window to see the mobile menu toggle.</p>
    </div>
  );
}
