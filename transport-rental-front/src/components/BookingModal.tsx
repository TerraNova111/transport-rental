import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (startDate: string, endDate: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = () => {
        onSubmit(startDate, endDate);
        setStartDate("");
        setEndDate("");
        onClose();
    };


    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-30" />
            
            <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg z-50">
                <Dialog.Title className="text-lg font-semibold mb-4">Бронирование</Dialog.Title>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm">Дата начала</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm">Дата окончания</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Отмена</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Забронировать</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default BookingModal;
