import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';

interface IQuote {
    id: string;
    name: string;
    description: string;
    condition: string;
    value: number;
    insuranceValue: number;
    installmentsNumber: number;
    installmentsValue: number;
}

function Home() {
    const { get } = useApi();
    const [quotes, setQuotes] = useState<Array<IQuote>>([]);
    const user = sessionStorage.getItem('@App:user');
    const token = sessionStorage.getItem('@App:token');
    const [loaded, setLoaded] = useState(false);


useEffect(() => {

    const loadQuotes = async () => {
        try {
            if (user && token && !loaded) {
                const userData = JSON.parse(user);
                const response = await get(`/cotacao/${userData.id}`, token);
                setQuotes(response);
                setLoaded(true); 
            }
        } catch (error) {
            console.error('Erro ao carregar cotações:', error);
        }
    };

    loadQuotes(); 

}, [get, token, user, loaded]); 

    

    return (
        <section className="text-center p-10">
            <div className='w-full flex justify-end mb-4'>
                <Link
                    to="/cotacao"
                    className=" bg-blue-600 text-white rounded px-4 py-2 hover:opacity-85"
                >
                    Nova Cotação
                </Link>
            </div>
            {quotes && quotes.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                    {quotes.map(quote => (
                        <Card key={quote.id} quote={quote} />
                    ))}
                </div>

            ) : (
                <p>Carregando...</p>
            )}
        </section>

    );
}

export default Home;
