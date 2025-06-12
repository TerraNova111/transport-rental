import React from "react";

import homeBg from "../assets/home-intro.png";
import aboutBg from "../assets/about.png";
import achBg from "../assets/ach-bg.png";
import historyBg from "../assets/history-bg.png";
import proudBg from "../assets/proud.png";


import iconTenge from "../assets/icons/tg-icon.png";
import iconAuto from "../assets/icons/auto-icon.png";
import iconHistory from "../assets/icons/history-icon.png";

import iconAchievements from "../assets/icons/ach-icon.png";
import iconProf from "../assets/icons/prof-icon.png";
import iconRel from "../assets/icons/rel-icon.png";
import iconInno from "../assets/icons/innovations-icon.png";
import iconClient from "../assets/icons/client-icon.png";

const achievements = [
    { number: "10+", text: "Лет успешной работы на рынке", icon: iconTenge },
    { number: "300+", text: "Выполненных заказов", icon: iconAuto },
    { number: "99%", text: "Удовлетворенных клиентов", icon: iconHistory },
]

const value = [
    { title: "Профессионализм", text: "Мы стремимся к высочайшему уровню\n" +
            "профессионализма во всем, что мы делаем.", icon: iconProf },
    { title: "Инновации", text: "Постоянное внедрение новых\n" +
            "технологий и методов работы\n" +
            "для оптимизации наших услуг.", icon: iconInno },
    { title: "Надежность", text: "Мы гарантируем безопасность\n" +
            "и своевременность всех перевозок.", icon: iconRel },
    { title: "Клиентоориентированность", text: "Индивидуальный подход к каждому\n" +
            "клиенту и его потребностям.", icon: iconClient },
    { title: "Наши достижения\n", text: "Мы являемся крупнейшей\n" +
            "транспортно-логистической\n" +
            "компанией в Центральной Азии.", icon: iconAchievements },

]

const HomePage: React.FC = () => {
    return (
        <div className="w-full">
            <section
                className="relative h-screen bg-fixed bg-center bg-cover bg-no-repeat"
                style={{backgroundImage: `url(${homeBg})`}}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"/>
                <div className="relative z-20 h-full flex items-center justify-start px-14 text-white">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Транспортная компания TranzEquip
                        </h1>
                        <p className="text-xl md:text-xl mb-6">
                            Точка опоры для вашего бизнеса.
                            Комплексные логистические решения.
                        </p>
                    </div>
                </div>
            </section>

            <main className="tab-section relative z-30 -mt-24 bg-white shadow-lg">

                <div className="mb-2 py-40 px-20">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">О компании</p>
                    <div className="h-[1px] bg-gray-300 mt-1"></div>
                </div>

                {/* О компании - текст + большая картинка */}
                <section className="flex flex-col md:flex-row justify-between items-start gap-8 px-20">
                    <div className="md:w-1/3 ">
                        <h2 className="text-4xl font-bold mb-4">О компании</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Наша компания уже более 10 лет успешно работает в сфере транспортных услуг и аренды
                            спецтехники.
                            Мы гордимся качеством предоставляемых услуг и индивидуальным подходом к каждому клиенту.
                            Наш современный автопарк и профессиональная команда позволяют решать задачи любой сложности.
                        </p>
                    </div>
                    <div className="md:w-3/5">
                        <img
                            src={aboutBg}
                            alt="О компании"
                            className="w-full object-cover h-[500px] rounded-2xl"
                        />
                    </div>
                </section>

                {/* Наши достижения - 3 блока с цифрой и текстом */}
                <section className="mt-48">
                    <h2 className="text-5xl mb-10 px-20">Наши достижения</h2>
                    <div className="flex flex-col 2xl:flex-row justify-start gap-8 px-20">
                        {achievements.map(({number, text, icon}, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 rounded-lg p-8 w-[25%] min-h-[200px] flex flex-col justify-between"
                            >
                                <div className="flex flex-row justify-between">
                                    <h3 className="text-5xl mb-3">{number}</h3>
                                    <img src={icon} alt="" className="w-12 h-12 mb-3"/>
                                </div>
                                <p className="text-gray-500 text-lg">{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Картинка на всю ширину */}
                <section>
                    <img
                        src={achBg}
                        alt="Техника в работе"
                        className="w-full/2 object-cover h-96 md:h-96 m-auto my-24"
                    />
                </section>

                {/* Картинка половина + справа История компании с текстом */}
                <section className="flex flex-col md:flex-row justify-between items-start gap-8 px-20 mt-48">
                    <div className="md:w-3/5">
                        <img
                            src={historyBg}
                            alt="О компании"
                            className="w-full object-cover h-[800px] rounded-2xl"
                        />
                    </div>
                    <div className="md:w-1/3 ">
                        <h2 className="text-4xl font-bold mb-4">О компании</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Наша компания уже более 10 лет успешно работает в сфере транспортных услуг и аренды
                            спецтехники.
                            Мы гордимся качеством предоставляемых услуг и индивидуальным подходом к каждому клиенту.
                            Наш современный автопарк и профессиональная команда позволяют решать задачи любой сложности.
                        </p>
                    </div>
                </section>

                {/* Наши ценности */}
                <section className="mt-48">
                    <h2 className="text-5xl mb-10 px-20">Наши ценности</h2>
                    <div className="px-20">
                        <div className="w-5/6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                            {value.map(({title, text, icon}, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-50 rounded-lg p-8 min-h-[200px] flex flex-col justify-between"
                                >
                                    <div className="flex flex-row justify-between items-center">
                                        <h3 className="text-2xl mb-3">{title}</h3>
                                        <img src={icon} alt="" className="w-12 h-12 mb-3"/>
                                    </div>
                                    <p className="text-gray-500 text-lg whitespace-pre-line">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flex flex-col md:flex-row justify-between items-start gap-8 px-20 mt-48 pb-48">
                    <div className="md:w-1/3 ">
                        <h2 className="text-5xl font-bold mb-4">TranzEquip гордится</h2>
                        <p className="text-gray-700 leading-relaxed">
                            В TranzEquip мы гордимся тем, что можем вносить свой вклад в успех наших клиентов,
                            предоставляя надежные и эффективные логистические решения.
                            Мы постоянно ищем способы улучшения наших услуг и расширения нашего влияния в логистической
                            отрасли. Свяжитесь с нами, чтобы узнать больше о том, как мы можем помочь вашему бизнесу.
                        </p>
                    </div>
                    <div className="md:w-3/5">
                        <img
                            src={proudBg}
                            alt="О компании"
                            className="w-full object-cover h-[500px] rounded-2xl"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;