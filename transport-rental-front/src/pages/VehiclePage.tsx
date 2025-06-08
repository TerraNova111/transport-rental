import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Vehicle } from "../types/Vehicle";
import BookingModal from "../components/BookingModal";
import {createBooking} from "../api/bookingApi";
import { createPaymentSession } from "../api/paymentApi";
import {commonFields} from "../constants/CommonFields";
import {specificFieldsTransport} from "../constants/SpecificFieldsTransport";
import {specificFieldsRental} from "../constants/SpecificFieldsRental";


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


            if (!booking) {
                return;
            }

            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
            const amount = days * vehicle!.pricePerDay;

            const {url} = await createPaymentSession(booking.id, vehicle!.name, amount)

            window.location.href = url;
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-page  min-h-screen p-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-4 text-left text-gray-800">{vehicle.name}</h1>

                <img
                    src={`http://localhost:8080/uploads/${vehicle.imageUrl}`}
                    alt={vehicle.name}
                    className="w-full h-72 object-cover rounded-lg border border-gray-300 mb-6"
                />

                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">
                        Категория:
                        <span className="ml-1 font-medium text-gray-700">{vehicle.category}</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                        Тип услуги:
                        <span className="ml-1 font-medium text-gray-700">{vehicle.serviceCategory}</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                        Доступность:
                        <span
                            className={`ml-1 font-medium ${
                                vehicle.available ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                        {vehicle.available ? 'Доступно' : 'Недоступно'}
                        </span>
                    </p>
                    <p className="text-lg text-gray-800 mt-2">{vehicle.description}</p>
                </div>

                {vehicle.descriptionDetailed && (
                    <div className="mb-8">
                        <div className="bg-white p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2 -ml-3">
                                Технические характеристики {vehicle.name}
                            </h2>
                            <ul className="space-y-3 divide-y divide-gray-200">
                                {Object.entries(vehicle.descriptionDetailed)
                                    .filter(([key]) => key !== "description")
                                    .map(([key, value]) => {
                                        // 1️⃣ Поиск сначала в commonFields
                                        let field = commonFields.find(f => f.key === key);

                                        // 2️⃣ Если не нашли в commonFields, ищем в специфических
                                        if (!field) {
                                            if (vehicle.serviceCategory === "RENTAL" && vehicle.category) {
                                                field = specificFieldsRental[vehicle.category]?.find(f => f.key === key);
                                            }
                                            if (!field && vehicle.serviceCategory === "TRANSPORT" && vehicle.category) {
                                                field = specificFieldsTransport[vehicle.category]?.find(f => f.key === key);
                                            }
                                        }

                                        // 3️⃣ Выбираем label или дефолтное значение
                                        const label = field ? field.label : key;

                                        return (
                                            <li
                                                key={key}
                                                className="pt-3 first:pt-0 flex justify-between items-center"
                                            >
                                                <span className="text-gray-700">{label}:</span>
                                                <span className="text-gray-600 font-semibold">{value}</span>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mt-6">
                    <p className="text-2xl font-bold text-green-600">
                        {vehicle.pricePerDay}₸ <span className="text-sm text-gray-500 font-normal">/ день</span>
                    </p>
                    <button
                        className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 ${
                            !vehicle.available ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => {
                            if (vehicle.available) setModalOpen(true);
                        }}
                        disabled={!vehicle.available}
                    >
                        Забронировать
                    </button>
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleBooking}
            />
        </div>
    );
};

export default VehiclePage;