import React, { useState } from "react";
import SelectAddressMap from './maps/SelectAddressMap';
import { AddressInfo } from "../types/Address";
import TransportRouteMap from "./maps/TransportRouteMap";


interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (
        startDate: string,
        endDate: string,
        deliveryAddress?: AddressInfo | null,
        loadingAddress?: AddressInfo | null,
        unloadingAddress?: AddressInfo | null
    ) => void | Promise<void>;
    serviceCategory: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, serviceCategory, onSubmit }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [deliveryAddress, setDeliveryAddress] = useState<AddressInfo | null>(null);
    const [loadingAddress, setLoadingAddress] = useState<AddressInfo | null>(null);
    const [unloadingAddress, setUnloadingAddress] = useState<AddressInfo | null>(null);

    const handleSubmit = () => {
        console.log("startDate:", JSON.stringify(startDate));
        console.log("endDate:", JSON.stringify(endDate));
        console.log("(!startDate || !endDate):", !startDate || !endDate);
        console.log("serviceCategory:", serviceCategory);
        console.log("serviceCategory.trim().toUpperCase() !== 'TRANSPORT':", serviceCategory.trim().toUpperCase() !== 'TRANSPORT');

        if ((!startDate || !endDate) && serviceCategory.trim().toUpperCase() !== "TRANSPORT") {
            alert("Выберите даты");
            return;
        }

        if (serviceCategory === "RENTAL" && !deliveryAddress) {
            alert("Выберите адрес доставки");
            return;
        }

        if (serviceCategory === "TRANSPORT" && (!loadingAddress || !unloadingAddress)) {
            alert("Выберите адреса загрузки и выгрузки");
            return;
        }

        onSubmit(
            startDate,
            endDate,
            serviceCategory === "RENTAL" ? deliveryAddress : undefined,
            serviceCategory === "TRANSPORT" ? loadingAddress : undefined,
            serviceCategory === "TRANSPORT" ? unloadingAddress : undefined
        );

        setStartDate("");
        setEndDate("");
        setDeliveryAddress(null);
        setLoadingAddress(null);
        setUnloadingAddress(null);
        onClose();
    };

    return (
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    📋 Бронирование услуги
                </h2>
                <p className="text-sm text-blue-100">Заполните данные для создания брони</p>
            </div>

            {/* Даты */}
            {serviceCategory === "RENTAL" && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-4 mb-4">
                    <h3 className="font-semibold text-gray-800">📅 Период аренды</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Дата начала
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Дата окончания
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Адрес для RENTAL */}
            {serviceCategory === "RENTAL" && (
                <div className="bg-green-50 rounded-xl p-4 space-y-4 border border-green-200 mb-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-green-700">
                            Адрес доставки
                        </label>
                        <SelectAddressMap onSelect={setDeliveryAddress}/>
                        {deliveryAddress && (
                            <div className="bg-white rounded-lg p-3 border border-green-200 mt-3">
                                <div className="flex items-start gap-2">
                                    <div
                                        className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <p className="font-medium text-gray-800">
                                            {deliveryAddress.formattedAddress}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            📍 {deliveryAddress.latitude.toFixed(4)}, {deliveryAddress.longitude.toFixed(4)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Адреса для TRANSPORT */}
            {serviceCategory === "TRANSPORT" && (
                <div className="bg-orange-50 rounded-xl p-4 space-y-4 border border-orange-200 mb-4">
                    <h3 className="font-semibold text-orange-800 flex items-center gap-2">
                        🚛 Маршрут перевозки
                    </h3>
                    <TransportRouteMap
                        onLoadingAddressSelect={setLoadingAddress}
                        onUnloadingAddressSelect={setUnloadingAddress}
                        loadingAddress={loadingAddress}
                        unloadingAddress={unloadingAddress}
                    />
                </div>
            )}

            {/* Кнопки */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors border border-gray-200"
                >
                    Отмена
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Забронировать
                </button>
            </div>
        </div>
    );
};

export default BookingModal;