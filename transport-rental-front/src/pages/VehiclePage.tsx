import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Vehicle } from "../types/Vehicle";
import BookingModal from "../components/BookingModal";
import {createBooking} from "../api/bookingApi";
import { createPaymentSession } from "../api/paymentApi";

const VehiclePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`/api/vehicles/${id}`)
            .then((res) => setVehicle(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!vehicle) return <div className="p-4">Загрузка...</div>;

    const handleBooking = async (startDate: string, endDate: string) => {
        if (!startDate || !endDate) {
            alert("Выберите даты");
            return;
        }

        try {
            setLoading(true);

            const booking = await createBooking(id!, startDate, endDate);
            console.log("Создано бронирование:", booking);

            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
            const amount = days * vehicle!.pricePerDay;

            const {url} = await createPaymentSession(booking.id, vehicle!.name, amount)

            window.location.href = url;
        } catch (err: any) {
            console.error(err);
            alert("Ошибка при бронировании: " + (err.response?.data?.message || ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-page min-h-screen p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>
            <img src={`http://localhost:8080/uploads/${vehicle.imageUrl}`} alt={vehicle.name} className="w-full h-64 object-cover rounded mb-4" />
            <p className="text-gray-600 mb-2">Категория: {vehicle.category}</p>
            <p className="text-gray-800 mb-2">{vehicle.description}</p>
            <p className="text-lg font-semibold">Цена за день: {vehicle.pricePerDay} ₽</p>

            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(true)}
            >
                Забронировать
            </button>
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleBooking}
            />
        </div>
    );
};

export default VehiclePage;