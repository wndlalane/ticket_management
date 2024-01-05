import axios from 'axios';

const API_BASE_URL = 'https://ticket-management-backend.vercel.app';

const api = {
  login: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/logout`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  clientesGet: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clientes`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  tecnicosGet: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tecnicos`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  ticketsGet: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tickets`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  usuarioTicketsGet: async ({ usuario_id }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/usuario/${usuario_id}/tickets`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  ticketsPost: async ({ ticketData }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tickets`, ticketData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  atualizarStatusTicket: async ({ ticketId, tecnico_id, status }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tickets/${ticketId}/status`, { tecnico_id, status }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

};

export default api;
