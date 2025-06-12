import React, { useState } from 'react';
import styles from "../styles/buttons/AddVehicleFormButton.module.css"

const ContactsPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setSubmitted(true);
        } catch (err) {
            alert('Ошибка при отправке сообщения');
        }
    };

    return (
        <div className="contacts-page min-h-screen ">
            <div className="mb-2 py-20 px-20">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Контакты</p>
                <div className="h-[1px] bg-gray-300 mt-1"></div>
            </div>
            <div className="p-6">
                <div className="flex flex-row justify-between gap-8">
                    <div className="flex flex-col py-10 ml-20 gap-8">
                        <div>
                            <h1 className="text-6xl mb-8 font-semibold">Контакты</h1>
                        </div>

                        <div className="mb-8 text-xl">
                        <h2 className="text-2xl mb-3 text-gray-500 font-semibold">Контакты</h2>
                            <p className="text-gray-700">Телефон: +7 (777) 828-66-55</p>
                            <p className="text-gray-700 mb-3">Email: info@tranzequip.kz</p>
                        </div>

                        <div className="mb-8 text-xl">
                            <h2 className="text-2xl mb-3 text-gray-500 font-semibold">Адрес</h2>
                            <p className="text-gray-700">г.Алматы, Бостандыкский р-н, ул.Манаса, д.34/1</p>

                        </div>
                    </div>
                    <div className="flex flex-col py-10 mr-[100px] gap-8">
                        <div>
                            <h1 className="text-6xl mb-8 font-semibold">Реквизиты</h1>
                        </div>

                        <div className="flex flex-row justify-between gap-8">
                            <div className="mb-8 text-xl mr-32">
                                <h2 className="text-2xl mb-3 text-gray-500 font-semibold">Адрес</h2>
                                <p className="text-gray-700">г.Алматы, Бостандыкский р-н, ул.Манаса, д.34/1</p>
                            </div>

                            <div className="mb-8 text-xl">
                                <h2 className="text-2xl mb-3 text-gray-500 font-semibold">Фактический адрес</h2>
                                <p className="text-gray-700">г.Алматы, Бостандыкский р-н, ул.Манаса, д.34/1</p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-8">
                            <div className="mb-8 text-xl mr-56">
                                <h2 className="text-2xl mb-3 text-gray-500 font-semibold">БИН</h2>
                                <p className="text-gray-700">521190114507</p>
                            </div>

                            <div className="mb-8 text-xl">
                                <h2 className="text-2xl mb-3 text-gray-500 font-semibold">БИК</h2>
                                <p className="text-gray-700">KCJBKZKX в АО "Банк ЦентрКредит" г.Алматы</p>
                            </div>
                        </div>

                        <div className="mb-8 text-xl">
                            <h2 className="text-2xl mb-3 text-gray-500 font-semibold">Контактный телефон</h2>
                            <p className="text-gray-700">+7 (777) 828-66-55</p>
                        </div>

                    </div>
                </div>

                <div className="p-20">
                    <h2 className="text-6xl mb-8 font-semibold">Связаться с нами</h2>

                    {submitted ? (
                        <p className="text-green-600 font-semibold">Спасибо за ваше сообщение! Мы свяжемся с вами в
                            ближайшее время.</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/6">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ваше имя"
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ваш email"
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Сообщение"
                                required
                                rows={5}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <button
                                type="submit"
                                className={`${styles.button} w-full`}
                            >
                                Отправить
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <div className="min-h-[600px] w-full px-10">
                <iframe
                    title="map"
                    src="https://www.google.com/maps?q=г.Алматы,+ул.+Манаса,+34/1&output=embed"
                    width="100%"
                    height="500px"
                    style={{border: 0}}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
};

export default ContactsPage;