'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTools, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import api from "@/services/api";


export default function Dashboard() {

    const [clientes, setClientes] = useState ? useState([]) : [];
    const [tecnicos, setTecnicos] = useState ? useState([]) : [];
    const [tickets, setTickets] = useState ? useState([]) : [];
    useEffect(() => {
        const clienteFetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await api.clientesGet(token);
                console.log(data)
                setClientes(data);
            } catch (error) {
                console.error('Erro ao carregar lista de clientes:', error);
                // Em caso de erro, definimos clientes como um array vazio
                setClientes([]);
            }
        };
        const tecnicoFetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await api.tecnicosGet(token);
                setTecnicos(data);
                console.log(data.length)
            } catch (error) {
                console.error('Erro ao carregar lista de tecnicos:', error);
                // Em caso de erro, definimos tecnicos como um array vazio
                setTecnicos([]);
            }
        };
        const ticketsFetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await api.ticketsGet('token');
                setTickets(data);
                console.log(data.length)
            } catch (error) {
                console.error('Erro ao carregar lista de tecnicos:', error);
                // Em caso de erro, definimos tickets como um array vazio
                setTecnicos([]);
            }
        };

        tecnicoFetchData()
        clienteFetchData()
        ticketsFetchData()


    }, []);
  return (
    <div className="flex">
      <div className="flex-1 mx-4">
        <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-600 dark:text-gray-300 mb-2" />
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Clientes</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{clientes ? clientes.length : 0}</p>
        </div>
      </div>

      <div className="flex-1 mx-4">
        <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FontAwesomeIcon icon={faTools} className="text-4xl text-gray-600 dark:text-gray-300 mb-2" />
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Técnicos</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{tecnicos ? tecnicos.length: 0}</p>
        </div>
      </div>

      <div className="flex-1 mx-4">
        <div className="flex flex-col items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <FontAwesomeIcon icon={faTicketAlt} className="text-4xl text-gray-600 dark:text-gray-300 mb-2" />
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Tickets</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{tickets? tickets.length: 0}</p>
        </div>
      </div>
    </div>
  );
}
