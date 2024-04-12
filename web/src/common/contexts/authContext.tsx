import { createContext, useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import axios, { AxiosError } from 'axios';

interface IUser {
  user: {
      id: string;
      name: string
      email: string;
      password?: string;
  };
  token: string;
}


interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  error: string | null;
  signIn(user: object): Promise<void>;
  signOut(): void;
}

type Props = {  
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { login } = useApi();

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, [setUser]);

  async function signIn(userData: IUser) {
    try {
      const response = await login(userData);
      setUser(response.user);
      setError(null); 
      sessionStorage.setItem('@App:user', JSON.stringify(response.user));
      sessionStorage.setItem('@App:token', response.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data) {
          const errorMessage = axiosError.response.data;
          setError(String(errorMessage));
        } else {
          setError('Ocorreu um erro ao fazer login. Tente novamente.');
        }
      } else {
        console.error('Unknown error:', error);
        setError('Ocorreu um erro desconhecido ao fazer login. Tente novamente.');
      }
    }
  }

  function signOut() {
    setUser(null);
    sessionStorage.removeItem("@App:user");
    sessionStorage.removeItem("@App:token");
  }

  return (
    <AuthContext.Provider value={{ 
      signed: Boolean(user), 
      user, 
      error,
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
