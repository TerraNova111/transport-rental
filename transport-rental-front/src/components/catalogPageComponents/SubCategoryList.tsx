import React from "react";
import { Link } from "react-router-dom";
import { categoryOptions } from "../../constants/CategoryOptions"; // путь подкорректируй под себя

interface SubCategoryListProps {
    selectedService: string;
}

const SubCategoryList: React.FC<SubCategoryListProps> = ({ selectedService }) => {
    const categories = categoryOptions[selectedService] || [];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
                <Link
                    key={category.value}
                    to={`/catalog/${selectedService.toLowerCase()}/${category.value.toLowerCase()}`}
                    className="border rounded p-2 hover:bg-gray-100"
                >
                    {category.label}
                </Link>
            ))}
        </div>
    );
};

export default SubCategoryList;