import React, { useState } from "react";
import EditProfileForm from "../components/profile/EditProfileForm";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import VehicleAddPanel from "../components/profile/adminProfile/VehicleAddPanel";
import VehicleList from "../components/profile/adminProfile/VehicleList";
import defaultAvatar from "../assets/avatar.png";
import {Pencil} from "lucide-react";
import AllBookingHistoryList from "../components/profile/adminProfile/AllBookingHistoryList";


const AdminPanelPage: React.FC = () => {
    const [tab, setTab] = useState<"profile" | "password" | "history" | "add_vehicle" | "vehicle_list">("profile");

    return (
        <div className="admin-panel min-h-screen max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
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
            <div className="mt-20 bg-white">
                <div className="flex flex-wrap">
                    {[
                        {key: 'profile', label: 'Настройки аккаунта'},
                        {key: 'password', label: 'Изменить пароль'},
                        {key: 'history', label: 'Список бронирований'},
                        {key: 'add_vehicle', label: 'Добавить технику'},
                        {key: 'vehicle_list', label: 'Список техники'},
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



            {/* Контент вкладок */}
            <div
                className="bg-white p-8 shadow-lg border border-gray-200 mb-10 transition-all duration-300">
                {tab === "profile" && <EditProfileForm/>}
                {tab === "password" && <ChangePasswordForm/>}
                {tab === "history" && <AllBookingHistoryList/>}
                {tab === "add_vehicle" && <VehicleAddPanel/>}
                {tab === "vehicle_list" && <VehicleList/>}
            </div>

        </div>
    );
};

export default AdminPanelPage;