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
    serviceCategory: string;
}

const PAGE_SIZE = 8;

const AllBookingHistoryList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(bookings.length / PAGE_SIZE);

    const bookingsToShow = bookings.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

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

    const handleConfirmReturn = async (bookingId: number) => {
        try {
            await axios.post(`/api/bookings/${bookingId}/confirm-return`);
            setBookings(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, status: "RETURNED" } : b
                )
            );
        } catch (error) {
            console.error("Ошибка при подтверждении возврата:", error);
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="bg-white pt-10 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Список бронирований</h2>
            <ul className="space-y-2 min-h-[800px]">
                {bookingsToShow.map(b => (
                    <li key={b.id} className="border-b py-2 text-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                {b.serviceCategory === "RENTAL" ? (
                                    <span className="text-gray-700 font-medium">Аренда </span>
                                ) : (
                                    <span className="text-gray-700 font-medium">Транспортировка </span>
                                )}
                                <span className="text-gray-700 font-medium">{b.vehicle.name}</span>
                                <span
                                    className={`ml-2 ${b.status === "PAID" ? "text-green-600" : "text-yellow-600"}`}>
                                    {b.status}
                                </span>
                            </div>
                            {b.status === "RETURN_REQUESTED" && (
                                <button
                                    onClick={() => handleConfirmReturn(b.id)}
                                    className={`rounded transition px-3 py-1 w-1/6 ${styles.button} 
                                    bg-blue-500 text-white hover:bg-blue-600`}
                                    >
                                    Подтвердить возврат
                                </button>
                            )}

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

            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Назад
                </button>

                {Array.from({length: totalPages}, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default AllBookingHistoryList;