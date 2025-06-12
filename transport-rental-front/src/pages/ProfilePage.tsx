import React, {useState} from "react";
import { useAuth } from "../components/auth/AuthContext";
import defaultAvatar from "../assets/avatar.png";
import { Mail, Pencil } from 'lucide-react';
import EditProfileForm from "../components/profile/EditProfileForm";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import BookingHistoryList from "../components/profile/userProfile/BookingHistoryList";


const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [tab, setTab] = useState<"profile" | "password" | "history">("profile");

    if (!user) {
        return <div className="text-center mt-20 text-lg">Загрузка...</div>;
    }

    return (
        <div className="profile min-h-screen max-w-7xl mx-auto mt-10 px-4 relative">

            <div className="avatar-bg w-full h-64 rounded-2xl shadow-lg relative flex justify-center items-end">
                <img
                    src={defaultAvatar}
                    alt="User Avatar"
                    className="w-40 h-40 rounded-full border-4 border-white shadow-xl absolute bottom-4 left-4"
                />
                <div className="edit-avatar text-black cursor-pointer">
                    <Pencil className="w-4 h-4"/>
                </div>
            </div>

            <div className="p-6 mb-6 flex flex-col gap-3 text-gray-500">
                <div className="flex flex-row gap-2">
                    <Mail className="w-5 h-5 mt-0.5 text-gray-600"/>
                    <p>Почта: {user.email}</p>
                </div>
                <p>Имя: {user.name}</p>
                <p>Телефон: {user.phone}</p>
            </div>

            <div className="bg-white">
                <div className="flex flex-wrap">
                    {[
                        {key: 'profile', label: 'Настройки аккаунта'},
                        {key: 'password', label: 'Изменить пароль'},
                        {key: 'history', label: 'История бронирований'}
                    ].map(({key, label}) => (
                        <button
                            key={key}
                            onClick={() => setTab(key as typeof tab)}
                            className={`flex-1 px-4 py-4 text-center font-semibold transition-all duration-300 border-b-4 
                            ${
                                tab === key
                                    ? "border-blue-600 text-blue-600 bg-white"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="bg-white p-6 shadow-lg border border-gray-200 mb-10 transition-all duration-300">
                {tab === "profile" && <EditProfileForm/>}
                {tab === "password" && <ChangePasswordForm/>}
                {tab === "history" && <BookingHistoryList/>}
            </div>
        </div>
    );
};

export default ProfilePage;