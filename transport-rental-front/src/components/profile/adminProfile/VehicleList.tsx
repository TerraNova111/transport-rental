import React, { useEffect, useState } from "react";
import { Vehicle } from "../../../types/Vehicle";
import { deleteVehicle } from "../../../api/adminApi";
import axios from "../../../utils/axios";
import VehicleEditForm from "./VehicleEditForm";

import styles from "../../../styles/buttons/GenericButton.module.css";



const VehicleList: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios
            .get("http://localhost:8080/api/admin/vehicles")
            .then((res) => {
                setVehicles(res.data);
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteVehicle(id);
            setVehicles(vehicles.filter((v) => v.id !== id));
        } catch (err) {
            console.error(err);
            alert("Ошибка при удалении");
        }
    };

    const handleEdit = (vehicle: Vehicle) => {
        setEditVehicle(vehicle);
    };

    const handleCancelEdit = () => {
        setEditVehicle(null);
    };

    const handleSaveEdit = () => {
        setEditVehicle(null);
        fetchVehicles();
    };

    if (editVehicle) {
        return (
            <VehicleEditForm
                vehicle={editVehicle}
                onCancel={handleCancelEdit}
                onSave={handleSaveEdit}
            />
        );
    }

    return (
        <div className="bg-white pt-10 rounded-xl  p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Список техники</h2>
            <ul className="space-y-4">
                {vehicles.map(vehicle => (
                    <li
                        key={vehicle.id}
                        className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition duration-300"
                    >
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <img
                                src={`http://localhost:8080/uploads/${vehicle.imageUrl}`}
                                alt={vehicle.name}
                                className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                            />
                            <div>
                                <p className="font-semibold text-lg text-gray-800">{vehicle.name}</p>
                                <p className="text-gray-500 text-sm">{vehicle.category}</p>
                                <p className="text-gray-500 text-sm italic">{vehicle.description}</p>
                                <p className="text-gray-600 text-sm mt-1">Количество: <span
                                    className="font-medium">{vehicle.quantity}</span></p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <p className="font-bold text-lg text-green-600">{vehicle.pricePerDay}₸ <span
                                className="text-sm font-normal text-gray-500">/ день</span></p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(vehicle)}
                                    className={`${styles.button}`}
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(vehicle.id!)}
                                    className={`${styles.button}`}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehicleList;