import axios from "axios";

interface IUser {
    user: {
        id: string;
        name: string
        email: string;
        password?: string;
    };
    token: string;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const useApi = () => ({
    login: async (user: IUser) => {
        const response = await api.post('/login', user);
        return response.data;
    },
    get: async (endpoint: string, token?: string) => {
        try {
            const headers: HeadersInit = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await api.get(endpoint, { headers });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação GET:', error);
            throw error;
        }
    },

    post: async (endpoint: string, body: object, token?: string) => {
        try {
            const headers: Record<string, string> = {}; 
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
    
            const response = await api.post(endpoint, body, {
                headers: headers
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer solicitação POST:', error);
            throw error;
        }
    }
    
    
});
