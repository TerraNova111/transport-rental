import React from "react";

interface CategorySelectorProps {
    selectedService: string;
    onSelect: (service: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedService, onSelect }) => {
    return (
        <div className="flex gap-4 mb-4">
            <button
                onClick={() => onSelect("RENTAL")}
                className={`px-4 py-2 rounded ${selectedService === "RENTAL" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
                Аренда
            </button>
            <button
                onClick={() => onSelect("TRANSPORT")}
                className={`px-4 py-2 rounded ${selectedService === "TRANSPORT" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
                Транспорт
            </button>
        </div>
    );
};

export default CategorySelector;