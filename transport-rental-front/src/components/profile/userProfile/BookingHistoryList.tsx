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
    serviceCategory: string;
}

const PAGE_SIZE = 8;

const BookingHistoryList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(bookings.length / PAGE_SIZE);

    const bookingsToShow = bookings.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    useEffect(() => {
        axios.get("/api/bookings/my").then(res => {
            setBookings(res.data);
            setLoading(false);
        });
    }, []);

    const handleRequestReturn = async (bookingId: number) => {
        try {
            await axios.post(`/api/bookings/${bookingId}/request-return`);
            setBookings(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, status: "RETURN_REQUESTED" } : b
                )
            );
        } catch (error: any) {
            const msg = error?.response?.data?.message || "Ошибка при возврате";
            alert(msg);
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">История бронирований</h2>
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
                                    className={`ml-2 ${b.status === "CANCELED" ? "text-red-600" : "text-green-600"}`}>
                                    {b.status}
                                </span>
                            </div>
                            {["PENDING", "IN_PROGRESS"].includes(b.status) && (
                                <button
                                    className="px-3 py-1 rounded transition bg-green-500 text-white hover:bg-green-600"
                                    onClick={() => handleRequestReturn(b.id)}>
                                    Запросить возврат
                                </button>
                            )}
                        </div>
                        <div className="text-gray-500">
                            {b.startDate} — {b.endDate}
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

export default BookingHistoryList;