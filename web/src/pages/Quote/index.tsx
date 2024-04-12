import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Label from '../../components/Form/Label';
import Input from '../../components/Form/Input';
import Button from '../../components/Button';

interface IFormData {
    name: string;
    description: string;
    condition: string;
    value: number;
}

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

function Quote() {
    const { post } = useApi();
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        description: '',
        condition: 'Novo',
        value: 0
    });
    const [quoteData, setQuoteData] = useState<IQuote | null>(null);
    const [quoteSaved, setQuoteSaved] = useState<boolean>(false);

    const user = sessionStorage.getItem('@App:user');
    const token = sessionStorage.getItem('@App:token');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (user && token) {
                const response = await post(`/cotacao/processamento`, formData, token);
                setQuoteData(response);
                setQuoteSaved(false)
            }
        } catch (error) {
            console.error('Erro ao processar cotação:', error);
        }
    };

    const handleSaveQuote = async () => {
        try {
            if (user && token && quoteData) {
                const userData = JSON.parse(user);
                await post(`/cotacao/${userData.id}`, quoteData, token);
                setQuoteSaved(true);
            }
        } catch (error) {
            console.error('Erro ao salvar cotação:', error);
        }
    };

    return (
        <section className="text-center p-10">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h1 className="text-2xl font-semibold mb-4">Realizar Cotação</h1>
                    <form onSubmit={handleSubmit} className="px-44">
                        <div className="mb-4 text-start">
                            <Label htmlFor="name">
                                Nome: 
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="mb-4 text-start">
                            <Label htmlFor="description">
                                Descrição: 
                            </Label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full border border-gray-300 rounded-md py-2 px-4 resize-none" required />
                        </div>
                        <div className="mb-4 text-start">
                            <Label htmlFor="condition">
                                Condição: 
                            </Label>
                            <select id="condition" name="condition" value={formData.condition} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-4" required>
                                <option value="Novo">Novo</option>
                                <option value="Reformado">Reformado</option>
                                <option value="Antigo">Antigo</option>
                            </select>
                        </div>
                        <div className="mb-4 text-start">
                            <Label htmlFor="value">
                                Valor: 
                            </Label>
                            <Input
                                id="value"
                                type="number"
                                name="value"
                                value={formData.value}
                                handleChange={handleChange}
                            />
                        </div>
                        <Button
                            type="submit"
                            handleClick={()=>{}} 
                        >
                            Processar Cotação
                        </Button>   
                     </form>
                </div>

                {quoteData && (
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Cotação Processada:</h1>
                        <p><strong>Nome:</strong> {quoteData.name}</p>
                        <p><strong>Descrição:</strong> {quoteData.description}</p>
                        <p><strong>Condição:</strong> {quoteData.condition}</p>
                        <p><strong>Preço:</strong> {quoteData.value}</p>
                        <p><strong>Valor Seguro:</strong> {quoteData.insuranceValue}</p>
                        <p><strong>Num. Parcelas:</strong> {quoteData.installmentsNumber}</p>
                        <p><strong>Val. Parcelas:</strong> {quoteData.installmentsValue}</p>
                        {quoteSaved ? <p className="text-green-600 font-semibold">Cotação salva com sucesso!</p> :
                            <Button
                            type="submit"
                            handleClick={handleSaveQuote} 
                            customClass='bg-green-500'
                            >
                            Salvar Cotação
                        </Button>
                        }
                    </div>
                )}

            </div>
        </section>
    );
}

export default Quote;
