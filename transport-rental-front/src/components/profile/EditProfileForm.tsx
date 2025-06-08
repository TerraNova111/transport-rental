import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";

import styles from "../../styles/buttons/GenericButton.module.css";


const EditProfileForm: React.FC = () => {
    const [form, setForm] = useState({ fullName: "", phone: "", address: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.put("/api/user/profile", form);
        alert("Профиль обновлён");

        setForm({ fullName: "", phone: "", address: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Имя"
                className="border p-2 rounded w-2/6"
            />
            <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Телефон"
                className="border p-2 rounded w-2/6"
            />
            <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Адрес"
                className="border p-2 rounded w-2/6"
            />
            <button type="submit" className={`${styles.button} w-2/6`}>
                Сохранить
            </button>
        </form>
    );
};

export default EditProfileForm;