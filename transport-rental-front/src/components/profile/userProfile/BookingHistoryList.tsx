import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";

interface Vehicle {
    id: number;
    name: string;
}

interface Booking {
    id: number;
    startDate: string;
    endDate: string;
    vehicle: Vehicle;
    status: string;
}

const BookingHistoryList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/bookings/my").then(res => {
            setBookings(res.data);
            setLoading(false);
        });
    }, []);

    const handleCancelBooking = async (bookingId: number) => {
        try {
            await axios.post(`/api/bookings/rejected/${bookingId}`);
            setBookings(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, status: "CANCELED" } : b
                )
            );
        } catch (error) {
            console.error("Ошибка при отмене бронирования:", error);
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">История бронирований</h2>
            <ul className="space-y-2">
                {bookings.map(b => (
                    <li key={b.id} className="border-b py-2 text-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-700 font-medium">{b.vehicle.name}</span>
                                <span
                                    className={`ml-2 ${b.status === "CANCELED" ? "text-red-600" : "text-green-600"}`}>
                                    {b.status}
                                </span>
                            </div>
                            <button
                                onClick={() => handleCancelBooking(b.id)}
                                disabled={b.status === "CANCELED"}
                                className={`px-3 py-1 rounded transition
                                ${b.status === "CANCELED"
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                            >
                                Отмена
                            </button>
                        </div>
                        <div className="text-gray-500">
                            {b.startDate} — {b.endDate}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingHistoryList;