import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../utils/axios";
import {Vehicle} from "../types/Vehicle";
import BookingModal from "../components/BookingModal";
import {createBooking} from "../api/bookingApi";
import {createPaymentSession} from "../api/paymentApi";
import {commonFields} from "../constants/CommonFields";
import {specificFieldsTransport} from "../constants/SpecificFieldsTransport";
import {specificFieldsRental} from "../constants/SpecificFieldsRental";


const VehiclePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [availableCount, setAvailableCount] = useState<number | null>(null);

    useEffect(() => {
        axios.get(`/api/vehicles/${id}`)
            .then((res) => setVehicle(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        if (vehicle) {
            fetchAvailability();
        }
    }, [vehicle]);

    const fetchAvailability = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const res = await axios.get(`/api/vehicles/${id}/available-quantity`, {
                params: {
                    startDate: today,
                    endDate: today
                }
            });
            setAvailableCount(res.data); // тут исправление
            console.log(res.data);
        } catch (error) {
            console.error("Ошибка при получении доступности техники:", error);
        }
    };

    if (!vehicle) return <div className="p-4">Загрузка...</div>;

    const handleBooking = async (
        startDate: string,
        endDate: string,
        deliveryAddress?: { latitude: number; longitude: number } | null,
        loadingAddress?: { latitude: number; longitude: number } | null,
        unloadingAddress?: { latitude: number; longitude: number } | null
    ) => {

        if (new Date(startDate) > new Date(endDate)) {
            alert("Дата начала бронирования не может быть позже даты окончания.");
            return;
        }

        try {
            setLoading(true);

            const booking = await createBooking(
                id!,
                startDate,
                endDate,
                vehicle!.serviceCategory,
                deliveryAddress,
                loadingAddress,
                unloadingAddress
            );

            if (!booking) return;

            const amount = booking.price;

            const { url } = await createPaymentSession(booking.id, vehicle!.name, amount);

            window.location.href = url;
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const serviceCategoryTranslations: { [key: string]: string } = {
        RENTAL: "Аренда",
        TRANSPORT: "Транспорт"
    };

    return (
        <div className="vehicle-page  min-h-screen">
            <div className="w-full bg-gray-100 p-0">
                <div className="max-w-7xl m-auto">
                    <nav className="text-xl text-gray-600  py-5">
                        <Link to="/catalog" className="hover:underline text-xl">Каталог</Link>
                        {vehicle.serviceCategory && (
                            <>
                                <span className="">/</span>
                                <Link
                                    to={`/catalog/${vehicle.serviceCategory}`}
                                    className="hover:underline text-xl"
                                >
                                    {serviceCategoryTranslations[vehicle.serviceCategory] || vehicle.serviceCategory}
                                </Link>
                            </>
                        )}
                        {vehicle.category && (
                            <>
                                <span className="">/</span>
                                <Link
                                    to={`/catalog/${vehicle.serviceCategory}/${vehicle.category}`}
                                    className="hover:underline text-xl"
                                >
                                    {vehicle.category}
                                </Link>
                                <span className="">/</span>
                                <span className="px-[10px]">{vehicle.name}</span>
                            </>
                        )}
                    </nav>
                    <h1 className="text-4xl font-bold mt-2 pt-14 pb-5">
                        {vehicle.serviceCategory && (
                            <>
                                {vehicle.serviceCategory === 'RENTAL' ? 'Аренда' : 'Заказ Транспорта'}
                                {vehicle.category ? ` ${vehicle.category}а` : ''}
                                {vehicle.name ? ` ${vehicle.name}` : ''}

                            </>
                        )}
                    </h1>
                </div>
            </div>
            <div className="p-6 max-w-6xl mx-auto">
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
                            <span className="ml-1 font-medium text-gray-700">{
                                serviceCategoryTranslations[vehicle.serviceCategory]}
                            </span>
                        </p>
                        <p className="text-lg text-gray-800 mt-2">{vehicle.description}</p>
                        {vehicle.descriptionDetailed?.description && (
                            <p className="text-lg text-gray-800 mt-2">{vehicle.descriptionDetailed.description}</p>
                        )}
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
                                            let field = commonFields.find(f => f.key === key);

                                            if (!field) {
                                                if (vehicle.serviceCategory === "RENTAL" && vehicle.category) {
                                                    field = specificFieldsRental[vehicle.category]?.find(f => f.key === key);
                                                }
                                                if (!field && vehicle.serviceCategory === "TRANSPORT" && vehicle.category) {
                                                    field = specificFieldsTransport[vehicle.category]?.find(f => f.key === key);
                                                }
                                            }

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
                        {vehicle.serviceCategory === "RENTAL" ? (
                            <p className="text-2xl font-bold text-green-600">
                                {vehicle.pricePerDay}₸ <span className="text-sm text-gray-500 font-normal">/ день</span>
                            </p>
                        ): (
                            <p className="text-2xl font-bold text-green-600">
                                {vehicle.ratePerKm}₸ <span className="text-sm text-gray-500 font-normal">/ км</span>
                            </p>
                        )}
                        <div className="text-lg font-semibold text-gray-800">
                            {availableCount !== null ? (
                                <span>Доступное количество: {availableCount}</span>
                            ) : (
                                <span>Загрузка...{availableCount}</span>
                            )}
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleBooking}
                    serviceCategory={vehicle.serviceCategory}
                />
            </div>
        </div>
    );
};

export default VehiclePage;