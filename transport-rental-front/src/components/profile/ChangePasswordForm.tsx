import React, { useState } from "react";
import axios from "../../utils/axios";
import styles from "../../styles/buttons/GenericButton.module.css";


const ChangePasswordForm: React.FC = () => {
    const [form, setForm] = useState({ oldPassword: "", newPassword: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put("/api/user/password", form);
            alert("Пароль изменен");
            setForm({ oldPassword: "", newPassword: "" });
        } catch {
            alert("Ошибка смены пароля");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <input
                type="password"
                name="oldPassword"
                placeholder="Старый пароль"
                value={form.oldPassword}
                onChange={handleChange}
                className="border p-2 rounded w-2/6"
            />
            <input
                type="password"
                name="newPassword"
                placeholder="Новый пароль"
                value={form.newPassword}
                onChange={handleChange}
                className="border p-2 rounded w-2/6"
            />
            <button type="submit" className={`${styles.button} w-2/6`}>
                Сохранить
            </button>
        </form>
    );
};

export default ChangePasswordForm;