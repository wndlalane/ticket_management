'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTools, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import api from "@/services/api";

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [clientesData, tecnicosData, ticketsData] = await Promise.all([
          api.clientesGet(token),
          api.tecnicosGet(token),
          api.ticketsGet(token)
        ]);

        setClientes(clientesData);
        setTecnicos(tecnicosData);
        setTickets(ticketsData);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 mx-4">
        <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-600 dark:text-gray-300 mb-2" />
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Clientes</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{clientes.length}</p>
        </div>
      </div>

      <div className="flex-1 mx-4">
        <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FontAwesomeIcon icon={faTools} className="text-4xl text-gray-600 dark:text-gray-300 mb-2" />
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Técnicos</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{tecnicos.length}</p>
        </div>
      </div>

      <div className="flex-1 mx-4">
        <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FontAwesomeIcon icon={faTicketAlt} className="text-4xl text-gray-600 dark:text-gray-300 mb-2" />
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Tickets</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{tickets.length}</p>
        </div>
      </div>
    </div>
  );
}
