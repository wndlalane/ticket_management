'use client'
import React, { useState, useEffect } from 'react';
import api from '@/services/api';

const ModalCriarTicket = ({ onClose, fetchTickets }) => {
    const [assunto, setAssunto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cliente, setCliente] = useState('');

    useEffect(() => {

        const storedData = localStorage.getItem('authentication');
        const authentication = JSON.parse(storedData);
        console.log(authentication)
        setCliente(authentication.id);


    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const data = {
                assunto,
                descricao,
                cliente_id: cliente,
            };

            await api.ticketsPost({ ticketData: data }, token);

            // Fechar o modal após a criação do ticket
            onClose();
            // Chamar a função fornecida para atualizar a lista de tickets na página principal
            fetchTickets();
        } catch (error) {
            console.error('Erro ao criar ticket:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Criar Novo Ticket</h2>
                <form onSubmit={handleSubmit} className="">
                    <div className="mb-4">
                        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700">
                            Assunto
                        </label>
                        <input
                            type="text"
                            id="assunto"
                            value={assunto}
                            onChange={(e) => setAssunto(e.target.value)}
                            className="mt-1 p-2 border w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows="4"
                            className="mt-1 p-2 border w-full"
                            required
                        />
                    </div>
                    <input type="hidden" name="cliente_id" value={cliente || ''} />

                    <div className='flex justify-end'>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 transition duration-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Cadastrar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalCriarTicket;
