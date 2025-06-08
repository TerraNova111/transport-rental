import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import styles from "../../../styles/buttons/BookingHistoryButton.module.css";

interface Vehicle {
    id: number;
    name: string;
}

interface User {
    id: number;
    fullName: string;
    email: string;
}

interface Booking {
    id: number;
    startDate: string;
    endDate: string;
    vehicle: Vehicle;
    status: string;
    user: User;
}

const AllBookingHistoryList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/bookings")
            .then(res => {
                setBookings(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка при загрузке бронирований", err);
                setLoading(false);
            });
    }, []);

    const handleApproveBooking = async (bookingId: number) => {
        try {
            await axios.post(`/api/bookings/approved/${bookingId}`);
            setBookings(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, status: "APPROVED" } : b
                )
            );
        } catch (error) {
            console.error("Ошибка при подтверждении бронирования:", error);
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="bg-white pt-10 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Список бронирований</h2>
            <ul className="space-y-2">
                {bookings.map(b => (
                    <li key={b.id} className="border-b py-2 text-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-700 font-medium">{b.vehicle.name}</span>
                                <span
                                    className={`ml-2 ${b.status === "APPROVED" ? "text-green-600" : "text-yellow-600"}`}>
                                    {b.status}
                                </span>
                            </div>
                            <button
                                onClick={() => handleApproveBooking(b.id)}
                                disabled={b.status === "APPROVED"}
                                className={`rounded transition px-3 py-1 ${styles.button}
                                ${b.status === "APPROVED"
                                        ? "bg-gray-100 text-black-200 cursor-not-allowed"
                                        : "bg-green-400 text-gray-700 hover:bg-green-500"
                                }`}

                            >
                                Подтвердить
                            </button>
                        </div>
                        <div className="text-gray-500">
                            {b.startDate} — {b.endDate}
                        </div>
                        <div className="text-gray-500">
                            Забронировал: {b.user.fullName} ({b.user.email})
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllBookingHistoryList;