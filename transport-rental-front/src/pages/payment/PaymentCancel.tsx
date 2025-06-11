import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../utils/axios";

const PaymentCancel: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const bookingId = searchParams.get("bookingId");
        if (bookingId) {
            axios
                .delete(`/api/bookings/${bookingId}`)
                .then(() => {
                    console.log("Booking cancelled successfully.");
                })
                .catch((error) => {
                    console.error("Error cancelling booking:", error);
                });
        }
    }, [searchParams]);

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Оплата отменена</h1>
            <p className="mb-4">
                Ваш платеж был отменен или не завершен. Бронирование было удалено.
            </p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleGoHome}
            >
                Вернуться на главную
            </button>
        </div>
    );
};

export default PaymentCancel;