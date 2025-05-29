import React, { useEffect, useState } from "react";
import { Vehicle } from "../types/Vehicle";
import { addVehicle, deleteVehicle } from "../api/adminApi";
import axios from "../utils/axios";

const AdminPanelPage: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        pricePerDay: "",
        available: true,
    });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/admin/vehicles")
            .then((res) => {
                console.log("Полученные данные:", res.data);
                setVehicles(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return;

        const data = new FormData();
        data.append("vehicle", new Blob([JSON.stringify(formData)], { type: "application/json" }));
        data.append("image", image);

        try {
            await addVehicle(data);
            alert("Техника добавлена!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Ошибка при добавлении");
        }
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

    return (
        <div className="admin-panel min-h-screen max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="Название"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Категория"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Описание"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Цена за день"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    required
                />
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Превью"
                        className="w-32 h-32 object-cover border rounded"
                    />
                )}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Добавить технику
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-2">Список техники</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="border rounded p-4 shadow-sm">
                        <img
                            src={`http://localhost:8080/uploads/${vehicle.imageUrl}`}
                            alt={vehicle.name}
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                        <h2 className="text-xl font-semibold">{vehicle.name}</h2>
                        <p className="text-gray-600">{vehicle.category}</p>
                        <p className="text-sm text-gray-500">{vehicle.description}</p>
                        <p className="mt-2 font-bold">{vehicle.pricePerDay}₽ / день</p>
                        <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanelPage;