import React, {useEffect, useState} from "react";
import { Vehicle } from "../../../types/Vehicle";
import { updateVehicle } from "../../../api/updateVehicle";
import styles from "../../../styles/buttons/AddVehicleFormButton.module.css";

interface VehicleEditFormProps {
    vehicle: Vehicle;
    onCancel: () => void;
    onSave: () => void;
}

import { specificFieldsRental } from '../../../constants/SpecificFieldsRental';
import { specificFieldsTransport } from '../../../constants/SpecificFieldsTransport';
import  { commonFields }  from '../../../constants/CommonFields';
import {updateVehicleImage} from "../../../api/updateVehicleImage";


const VehicleEditForm: React.FC<VehicleEditFormProps> = ({ vehicle, onCancel, onSave }) => {
    const [editVehicle, setEditVehicle] = useState<Vehicle>(vehicle);

    const [descriptionDetailed, setDescriptionDetailed] = useState<{ [key: string]: any }>({});
    const [selectedCategory, setSelectedCategory] = useState<string>(editVehicle?.category || "");

    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (editVehicle) {
            setDescriptionDetailed(editVehicle.descriptionDetailed || {});
            setSelectedCategory(editVehicle.category);
        }
    }, [editVehicle]);

    const handleDescriptionChange = (key: string, value: any) => {
        setDescriptionDetailed((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedVehicle: Vehicle = {
                ...editVehicle,
                category: selectedCategory,
                descriptionDetailed: descriptionDetailed
            };
            await updateVehicle(updatedVehicle.id!, updatedVehicle);
            console.log("обновил вехикл");
            if (image) {
                await updateVehicleImage(updatedVehicle.id!, image);
                console.log("не обновил картинку");

            }

            onSave();
        } catch (err) {
            console.error(err);
            alert("Ошибка при сохранении");
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 mt-10 space-y-6 border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-800">
                Редактировать: {editVehicle.name}
            </h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Тип услуги</label>
                <select
                    value={editVehicle.serviceCategory}
                    onChange={(e) => setEditVehicle({...editVehicle, serviceCategory: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none
                    focus:ring-2 focus:ring-blue-500 transition"
                    required
                >
                    <option value="" disabled>Выберите тип услуги</option>
                    <option key="RENTAL" value="RENTAL">Аренда</option>
                    <option key="TRANSPORT" value="TRANSPORT">Транспорт</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        // обнуляем специфические поля при смене категории
                        setDescriptionDetailed({});
                    }}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none
                    focus:ring-2 focus:ring-blue-500 transition"
                >
                    {editVehicle.serviceCategory === 'RENTAL' &&
                        Object.keys(specificFieldsRental).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}

                    {editVehicle.serviceCategory === 'TRANSPORT' &&
                        Object.keys(specificFieldsTransport).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}

                </select>
            </div>

            {/* Название */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                    type="text"
                    value={editVehicle.name}
                    onChange={(e) => setEditVehicle({...editVehicle, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                    focus:ring-blue-500 transition"
                />
            </div>

            {/* Описание */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                    placeholder="Введите описание"
                    value={editVehicle.description}
                    onChange={(e) => setEditVehicle({...editVehicle, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                    focus:ring-blue-500 transition min-h-[100px]"
                />
            </div>

            {/* Количество */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Количество</label>
                <input
                    type="number"
                    value={editVehicle.quantity || 0}
                    onChange={(e) => setEditVehicle({...editVehicle, quantity: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                    focus:ring-blue-500 transition"
                />
            </div>

            {/* Цена */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Цена за день</label>
                <input
                    type="number"
                    value={editVehicle.pricePerDay || 0}
                    onChange={(e) => setEditVehicle({...editVehicle, pricePerDay: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2
                    focus:ring-blue-500 transition"
                />
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

            {/* Специфические поля */}
            <h4 className="font-semibold mb-2">Специфические характеристики</h4>
            {selectedCategory && specificFieldsRental[selectedCategory]?.map((field) => (
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

            {/* Кнопки */}
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onCancel}
                    className={`${styles.button} w-1/6`}
                >
                    Назад
                </button>
                <button
                    onClick={handleSave}
                    className={`${styles.button} w-2/6`}
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default VehicleEditForm;