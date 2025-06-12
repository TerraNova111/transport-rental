import React, { useState } from 'react'
import { sendForgotPasswordEmail } from '../../api/authApi'
import styles from "../../styles/AuthForm.module.css"
import buttonStyle from "../../styles/buttons/AddVehicleFormButton.module.css"
import { X } from 'lucide-react'

type Props = {
    onClose: () => void;
};

const ForgotPasswordModal: React.FC<Props> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await sendForgotPasswordEmail(email);
            setMessage("Ссылка для сброса отправлена (если email зарегистрирован).");
        } catch (err) {
            setError("Ошибка отправки. Попробуйте ещё раз.");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm z-50 transition-opacity duration-300">
            <div
                className="relative bg-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-lg transition-transform transform animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="ml-8">
                    <h2 className="text-2xl font-bold mb-2">Восстановление пароля</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Введите email, и мы отправим вам ссылку для сброса пароля.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles["flex-column"]}>
                        <label>Email</label>
                    </div>
                    <div className={styles.inputForm}>
                        <svg
                            height="20"
                            viewBox="0 0 32 32"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                        </svg>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-600 text-sm text-center">{message}</p>}

                    <button type="submit" className={`${buttonStyle.button} w-full mt-6`}>
                        Отправить ссылку
                    </button>
                    <button onClick={onClose} className={`${buttonStyle.button} w-full`}>
                        Назад
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;