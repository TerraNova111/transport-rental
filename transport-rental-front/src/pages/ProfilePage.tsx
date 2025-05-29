import React from "react";
import { useAuth } from "../components/auth/AuthContext";
import defaultAvatar from "../assets/avatar.png";
import { Mail, Pencil } from 'lucide-react';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div className="text-center mt-20 text-lg">Загрузка...</div>;
    }

    const isAdmin = user.role === "ADMIN";
    const isUser = user.role === "USER";

    const bookingHistory = [
        {
            id: 1,
            date: "2025-04-10",
            vehicle: "Самосвал КАМАЗ",
            status: "Одобрено"
        },
        {
            id: 2,
            date: "2025-03-22",
            vehicle: "Экскаватор HITACHI",
            status: "В обработке"
        },
    ];

    return (
        <div className="profile min-h-screen max-w-7xl mx-auto mt-10 px-4 relative">
            <div className="avatar-bg w-full h-64 rounded-2xl shadow-lg relative flex justify-center items-end">
                <img
                    src={defaultAvatar}
                    alt="User Avatar"
                    className="w-40 h-40 rounded-full border-4 border-white shadow-xl absolute bottom-4 left-4"
                />
                <div className="edit-avatar text-black cursor-pointer">
                    <Pencil className="w-4 h-4" />
                </div>
            </div>
            <p className="text-3xl mx-3 my-3">{user.username.split("@")[0]}</p>
            <div className="p-6 mb-6 flex flex-row gap-3 text-gray-500">
                <Mail className="w-5 h-5 mt-0.5 text-gray-600" />
                <p>{user.email}</p>
            </div>

            <div className="flex space-x-4 mb-6 ml-5">
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                    Настройки аккаунта
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                    Изменить пароль
                </button>

                {/* Только для USER */}
                {isUser && (
                    <>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            История бронирований
                        </button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            Способы оплаты
                        </button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            Адрес
                        </button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            Уведомления
                        </button>
                    </>
                )}

                {/* Только для ADMIN */}
                {isAdmin && (
                    <>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            Панель модерации
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                            Управление пользователями
                        </button>
                    </>
                )}
            </div>

            {/* Отображение истории бронирований только для USER */}
            {isUser && (
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">История бронирований</h2>
                    <ul className="space-y-2">
                        {bookingHistory.map(booking => (
                            <li
                                key={booking.id}
                                className="border-b py-2 flex justify-between text-sm"
                            >
                                <span>{booking.date}</span>
                                <span>{booking.vehicle}</span>
                                <span
                                    className={`font-medium ${booking.status === "Одобрено" ? "text-green-600" : "text-yellow-600"}`}>
                                    {booking.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Контент для ADMIN (можно позже заменить на модерацию заявок и т.п.) */}
            {isAdmin && (
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Админ-панель</h2>
                    <p>Здесь будет информация о бронированиях, пользователях, отчеты и т.д.</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;