'use client'
import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import ModalDetalheTicket from '@/components/modalDetalheTicket';
import ModalCriarTicket from '@/components/modalCriarTicket';

export default function Tickets() {

    const [tickets, setTickets] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const [isCliente, setIsCliente] = useState(false);


    const [modalCreateTicketOpen, setModalCreateTicketOpen] = useState(false);

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
            setIsCliente(authentication.cliente)
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


    const openCreateTicketModal = () => {
        setModalCreateTicketOpen(true);
    };

    const closeCreateTicketModal = () => {
        setModalCreateTicketOpen(false);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div>
            {/* Modal para exibir os detalhes do ticket */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between pb-5">
                    <h2 className="text-xl font-semibold mb-4">Lista de Tickets</h2>

                    {isCliente ? <button
                        onClick={openCreateTicketModal}
                        className=" text-white pl-2 pr-2 rounded-md bg-purple-700 transition duration-300 pt-0">
                        Novo Ticket
                    </button> : null}
                </div>
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
                                    <td className="px-6 py-4">{ticket?.assunto}</td>
                                    <td className="px-6 py-4">{ticket?.cliente?.nome}</td>
                                    <td className="px-6 py-4">{ticket?.tecnico?.nome}</td>
                                    <td className="px-6 py-4">{ticket?.status}</td>
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
                <ModalDetalheTicket selectedTicket={selectedTicket} closeModal={closeModal} fetchTickets={fetchTickets} />
            )}

            {/* Modal de criação de ticket */}
            {modalCreateTicketOpen && (
                <ModalCriarTicket
                    onClose={closeCreateTicketModal}
                    fetchTickets={fetchTickets}
                />
            )}

        </div>
    );
}
