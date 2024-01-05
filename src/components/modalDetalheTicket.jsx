'use client'
import React, { useEffect, useState } from 'react';
import api from '@/services/api';

const ModalDetalheTicket = ({ selectedTicket, closeModal, fetchTickets }) => {

    const [authentication, setAuthentication] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem('authentication');
        setAuthentication(JSON.parse(storedData));

    }, [])

    const handleAtualizarStatus = async (status) => {
        try {
            await api.atualizarStatusTicket({ ticketId: selectedTicket.id, tecnico_id: authentication.id, status });
            fetchTickets()
            closeModal()
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalhes do Ticket</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-gray-600">Assunto:</label>
                        <input
                            type="text"
                            value={selectedTicket?.assunto}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600">Status:</label>
                        <input
                            type="text"
                            value={selectedTicket?.status}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600">Cliente:</label>
                        <input
                            type="text"
                            value={selectedTicket?.cliente?.nome}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600">Email do Cliente:</label>
                        <input
                            type="text"
                            value={selectedTicket?.cliente?.email}
                            disabled
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <div colSpan="2">
                    <label className="text-gray-600">Descrição:</label>
                    <textarea
                        value={selectedTicket?.descricao}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded resize-none"
                        rows="8"
                    />
                </div>
                <div className={`flex ${authentication.tecnico && selectedTicket.status == "PENDENTE" ? 'justify-between' : 'flex-row-reverse'}   pt-4`}>
                    {authentication.tecnico && selectedTicket.status == "PENDENTE" ? <div>
                        <button
                            onClick={() => handleAtualizarStatus('RESOLVIDO')}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 focus:outline-none"
                        >
                            Resolvido
                        </button>
                        <button
                            onClick={() => handleAtualizarStatus('CANCELADO')}
                            className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 focus:outline-none mr-2"
                        >
                            Cancelado
                        </button>
                    </div> : null
                    }

                    <button
                        onClick={closeModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
                    >
                        Fechar Detalhes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDetalheTicket;
