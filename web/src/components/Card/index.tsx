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

type Props = {
    quote: IQuote;
}

function Card ({ quote }: Props) {
    return (
        <div className="bg-white border border-black p-4 rounded-lg"  style={{ width: "300px", height: "275px", overflow: "hidden" }}>
            <h2 className="text-xl font-semibold mb-2">{quote.name}</h2>
            <p className="text-gray-600 mb-2">{quote.description}</p>
            <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">Condição:</p>
                <p className="text-blue-500">{quote.condition}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">Valor:</p>
                <p className="text-green-500">{quote.value}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">Cotação Seguro:</p>
                <p className="text-green-500">{quote.insuranceValue}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">Num. Parcelas:</p>
                <p className="text-blue-500">{quote.installmentsNumber}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-gray-700">Val. Parcelas:</p>
                <p className="text-green-500">{quote.installmentsValue}</p>
            </div>
        </div>
    );
}

export default Card;
