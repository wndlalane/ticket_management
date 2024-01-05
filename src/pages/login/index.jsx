'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from "@/services/api";
import '@/styles/global.css'
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {

    const storedData = localStorage.getItem('authentication');
    if (storedData) {
      const authentication = JSON.parse(storedData);
      if (authentication.cliente) {
        router.push('/admin/ticket')
      } else if (authentication.tecnico) {
        router.push('/admin/dashboard');
      }
    } else {
      console.log('Nenhum dado de autenticação encontrado.');
    }

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.login({ email, password });

      if (response.success) {
        localStorage.setItem('authentication', JSON.stringify(response.authentication));
        localStorage.setItem('token', JSON.stringify(response.authentication.token));
        if (response.authentication.cliente) {
          router.push('/admin/ticket');
        } else {
          router.push('/admin/dashboard');
        }
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError('Ocorreu um erro durante o login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Faça login em sua conta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 transition duration-300 focus:outline-none"
            >
              Sign in
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Ainda não tem uma conta?
          <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Cadastre-se agora!
          </Link>
        </p>
      </div>
    </div>
  );
}
