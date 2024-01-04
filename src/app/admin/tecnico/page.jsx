'use client'
import { useEffect, useState } from "react";
import api from "@/services/api";


export default function Tecnicos() {
    const [tecnicos, setTecnicos] = useState ? useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const data = await api.tecnicosGet(token);
                setTecnicos(data);
            } catch (error) {
                console.error('Erro ao carregar lista de tecnicos:', error);
                // Em caso de erro, definimos tecnicos como um array vazio
                setTecnicos([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Lista de Tencicos</h2>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tecnicos && tecnicos.map((tecnico, index) => (
                        <tr key={tecnico.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index + 1}
                            </th>
                            <th >
                                {tecnico.nome}
                            </th>
                            <td className="px-6 py-4">
                                {tecnico.email}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
