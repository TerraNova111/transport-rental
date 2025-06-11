import React, {useEffect, useState} from "react";
import { addVehicle } from "../../../api/adminApi";
import styles from "../../../styles/buttons/AddVehicleFormButton.module.css";

const serviceCategories = [
    { value: "RENTAL", label: "Аренда спецтехники" },
    { value: "TRANSPORT", label: "Транспортные услуги" },
];

import  { categoryOptions }  from '../../../constants/CategoryOptions';
import { commonFields } from "../../../constants/CommonFields";


const VehicleAddPanel: React.FC = () => {
    const [descriptionDetailed, setDescriptionDetailed] = useState<{ [key: string]: any }>({});
    const [image, setImage] = useState<File | null>(null);

    const handleDescriptionChange = (key: string, value: any) => {
        setDescriptionDetailed((prev) => ({ ...prev, [key]: value }));
    };

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        pricePerDay: "",
        available: true,
        quantity: 1,
        serviceCategory: "",
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return;

        const dataToSend = {
            ...formData,
            descriptionDetailed: descriptionDetailed
        };

        console.log(dataToSend);

        const data = new FormData();
        data.append("vehicle", new Blob([JSON.stringify(dataToSend)], { type: "application/json" }));
        data.append("image", image);
        console.log(data);

        try {
            await addVehicle(data);
            alert("Техника добавлена!");
        } catch (err) {
            console.error(err);
            alert("Ошибка при добавлении");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-8 mt-10 space-y-6 border border-gray-200"
        >
            <h2 className="text-3xl font-bold text-gray-800">Добавить технику</h2>
            <p className="text-gray-500 mb-4">
                Заполните форму ниже для добавления новой техники в каталог
            </p>

            {/* Название */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                    type="text"
                    placeholder="Введите название"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                    focus:ring-blue-500 transition"
                    required
                />
            </div>

            {/* Тип услуги */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Тип услуги</label>
                <select
                    value={formData.serviceCategory}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            serviceCategory: e.target.value,
                            category: "", // Сбрасываем категорию при смене сервиса
                        })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none
                    focus:ring-2 focus:ring-blue-500 transition"
                    required
                >
                    <option value="" disabled>Выберите тип услуги</option>
                    {serviceCategories.map((service) => (
                        <option key={service.value} value={service.value}>
                            {service.label}
                        </option>
                    ))}
                </select>
            </div>


            {formData.serviceCategory && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Категория техники</label>
                    <select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({...formData, category: e.target.value})
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none
                        focus:ring-2 focus:ring-blue-500 transition"
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {categoryOptions[formData.serviceCategory].map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}


            {/* Описание */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                    placeholder="Введите описание"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                    focus:ring-blue-500 transition min-h-[100px]"
                />
            </div>

            <h4 className="font-semibold mb-2">Общие характеристики</h4>
            {commonFields.filter((field)=> field.key == "description")
                .map((field) => (
                    <div className="mb-4" key={field.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <textarea
                            value={descriptionDetailed[field.key] || ""}
                            onChange={(e) => handleDescriptionChange(field.key, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                            focus:ring-blue-500 transition min-h-[200px]"
                        />
                    </div>
            ))}

            {commonFields.filter((field)=> field.key != "description")
                .map((field) => (
                    <div className="mb-4" key={field.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <input
                            type={field.type}
                            value={descriptionDetailed[field.key] || ""}
                            onChange={(e) => handleDescriptionChange(field.key, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                           focus:ring-blue-500 transition"
                        />
                    </div>
            ))}


            {/* Цена за день и Количество в одной строке на больших экранах */}
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цена за день</label>
                    <input
                        type="number"
                        placeholder="Введите цену за день"
                        value={formData.pricePerDay}
                        onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                        focus:ring-blue-500 transition"
                        required
                    />
                </div>

                {/* Количество */}
                <div className="flex-1 mt-4 md:mt-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Количество</label>
                    <input
                        type="number"
                        placeholder="Введите количество"
                        value={formData.quantity}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                quantity: parseInt(e.target.value, 10) || 0
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                        focus:ring-blue-500 transition"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Изображение</label>
                <div
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center
                    cursor-pointer hover:border-blue-400 transition">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                    />
                    <div className="flex flex-col items-center">
                        <span className="text-4xl text-gray-400 mb-2">📷</span>
                        <span className="text-gray-600 font-medium">Нажмите или перетащите файл</span>
                    </div>
                </div>
                {image && (
                    <div className="mt-4 flex items-center justify-center">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Превью"
                            className="w-32 h-32 object-cover border rounded-lg shadow-md"
                        />
                    </div>
                )}
            </div>

            <button
                type="submit"
                className={`${styles.button} w-full`}
            >
                Добавить технику
            </button>
        </form>
    );
};

export default VehicleAddPanel;