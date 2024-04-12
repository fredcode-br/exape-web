import React from "react";

interface Props {
    children: React.ReactNode;
    htmlFor: string;
    customClass?: string;
}

function Label({children, htmlFor, customClass}:Props) {
    return (
        <label 
            className={`block mb-2 text-gray-700 text-sm font-bold ${customClass}`}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    )
}

export default Label;