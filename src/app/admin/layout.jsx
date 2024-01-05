'use client'
import Navbar from "@/components/partials/navbar";
import Sidebar from "@/components/partials/sidebar";
import { redirect } from 'next/navigation'
import { useEffect } from "react";
export default function AdminLayout({ children }) {

  useEffect(() => {
    const storedData = localStorage.getItem('authentication');
    const authentication = JSON.parse(storedData);
    if (!authentication) {
      redirect('/login')
    }

  }, [])
  return (

    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Navbar */}
        <Navbar />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}