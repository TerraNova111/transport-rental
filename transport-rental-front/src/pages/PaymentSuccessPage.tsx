import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccessPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Оплата прошла успешно!</h1>
                <p className="mb-6">Спасибо за бронирование. Мы скоро с вами свяжемся.</p>
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;