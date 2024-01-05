'use client'
import React, { useEffect, useState } from 'react';
import api from '@/services/api';

export default function Tickets() {

    const [tickets, setTickets] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedTicket, setSelectedTicket] = useState(null);

    // Função para buscar a lista de tickets da API
    const fetchTickets = async () => {

        try {
            const token = localStorage.getItem('token');
            let data = [];
            const storedData = localStorage.getItem('authentication');

            const authentication = JSON.parse(storedData);
            if (authentication.cliente) {
                data = await api.usuarioTicketsGet({ usuario_id: authentication.id }, token)

            } else {
                data = await api.ticketsGet(token);

            }
            setTickets(data);
        } catch (error) {
            console.error('Erro ao carregar lista de tickets:', error);
            // Em caso de erro, definimos tickets como um array vazio
            setTickets([]);
        }
    };

    // Função para abrir o modal com os detalhes do ticket selecionado
    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setModalOpen(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setSelectedTicket(null);
        setModalOpen(false);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div>
            {/* Modal para exibir os detalhes do ticket */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Lista de Tickets</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Assunto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cliente
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Técnico
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets &&
                            tickets.map((ticket, index) => (
                                <tr
                                    key={ticket.id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{ticket.assunto}</td>
                                    <td className="px-6 py-4">{ticket.cliente.nome}</td>
                                    <td className="px-6 py-4">{ticket.tecnico.nome}</td>
                                    <td className="px-6 py-4">{ticket.status}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => openModal(ticket)} className="text-blue-600 hover:underline">
                                            Ver Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para exibir os detalhes do ticket */}
            {modalOpen && selectedTicket && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalhes do Ticket</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-gray-600">Assunto:</label>
                                <input
                                    type="text"
                                    value={selectedTicket.assunto}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Status:</label>
                                <input
                                    type="text"
                                    value={selectedTicket.status}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Cliente:</label>
                                <input
                                    type="text"
                                    value={selectedTicket.cliente.nome}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="text-gray-600">Email do Cliente:</label>
                                <input
                                    type="text"
                                    value={selectedTicket.cliente.email}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                        </div>
                        <div colSpan="2">
                            <label className="text-gray-600">Descrição:</label>
                            <textarea
                                value={selectedTicket.descricao}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded resize-none"
                                rows="8"
                            />
                        </div>
                        <div className='flex flex-row-reverse pt-4'>
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
                            >
                                Fechar Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}
