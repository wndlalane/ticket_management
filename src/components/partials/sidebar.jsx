'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [authentication, setAuthentication] = useState({});
  const router = useRouter();
  useEffect(() => {
    const storedData = localStorage.getItem('authentication');

    setAuthentication(JSON.parse(storedData));

  }, [])
  const handleLogout = () => {
    // Remover o item de autenticação do localStorage
    localStorage.removeItem('authentication');

    const store = localStorage.getItem('authentication');
    const auth = JSON.parse(store);
    if (!auth) {
      router.push('/login');
    }
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">Ticket Management</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {authentication.tecnico ? <nav className="flex-1 px-2 py-4 bg-gray-800">

          <Link href="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Dashboard
          </Link>
          <Link href="/admin/tecnico" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
            Tecnicos
          </Link>
          <Link href="/admin/cliente" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Clientes
          </Link>
          <Link href="/admin/ticket" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4 1.41-1.41L12 14.17l6.59-6.59L18 8z" />
            </svg>
            Tickets
          </Link>
          <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Sair
          </div>
        </nav> : <nav className="flex-1 px-2 py-4 bg-gray-800">
          <Link href="/admin/ticket" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4 1.41-1.41L12 14.17l6.59-6.59L18 8z" />
            </svg>
            Tickets
          </Link>
          <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Sair
          </a>
        </nav>}
      </div>
    </div>
  )
}