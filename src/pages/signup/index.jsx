// Importe os módulos necessários
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from "@/services/api";
import '@/styles/global.css';
import Link from 'next/link';

// Componente de Signup
export default function SignupForm() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTecnico, setIsTecnico] = useState(false);
  const [isCliente, setIsCliente] = useState(true);
  const [error, setError] = useState(null);

  // Função de submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.signup({
        nome,
        email,
        password,
        tecnico: isTecnico,
        cliente: isCliente
      });

      if (response.success) {
        // Cadastro bem-sucedido
        router.push('/login'); // Redireciona para a página de login após o cadastro
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      setError('Ocorreu um erro durante o cadastro. Por favor, tente novamente.');
    }
  };

  // JSX do componente
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Crie sua conta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Campos do formulário */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
              Nome
            </label>
            <div className="mt-2">
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="cliente"
                name="tipoUsuario"
                checked={isCliente}
                onChange={() => {
                  setIsCliente(true);
                  setIsTecnico(false);
                }}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="cliente" className="ml-2 block text-sm text-gray-900">
                Cliente
              </label>
            </div>

            <div className="flex items-center ">
              <input
                type="radio"
                id="tecnico"
                name="tipoUsuario"
                checked={isTecnico}
                onChange={() => {
                  setIsCliente(false);
                  setIsTecnico(true);
                }}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="tecnico" className="ml-2 block text-sm text-gray-900">
                Técnico
              </label>
            </div>
          </div>


          {/* Botão de envio */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 transition duration-300 focus:outline-none"
            >
              Cadastrar
            </button>
          </div>

          {/* Exibição de erro */}
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
        </form>

        {/* Link para a página de login */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Já tem uma conta? 
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-1">
             Faça login aqui.
          </Link>
        </p>
      </div>
    </div>
  );
}
