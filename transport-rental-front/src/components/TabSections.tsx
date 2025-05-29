import React, { useState } from "react";
import {Link} from "react-router-dom";

type Tab = "all" | "direction" | "transport";

const tabContent: Record<Tab, { title: string; link: string }[]> = {
    all: [
        { title: "Автомобильные перевозки",  link: "/services/auto" },
        { title: "Негабаритные перевозки", link: "/services/trucking" },
        { title: "Контейнерные перевозки", link: "/services/containers" },
        { title: "Авиаперевозки", link: "/services/air" },
        { title: "Аренда спецтехники", link: "/services/booking" }
    ],
    direction: [
        { title: "Международные перевозки",  link: "/directions/moscow-spb" },
        { title: "Перевозки по Казахстану",  link: "/directions/ns-om" },
    ],
    transport: [
        { title: "Автомобильные", link: "/vehicles/crane" },
        { title: "Авиа",  link: "/vehicles/bulldozer" },
        { title: "Морские",  link: "/vehicles/bulldozer" },
    ],
};

const TabSections: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("all");

    return (
        <div className="flex flex-col p-20">
            <h1 className="text-center p-20 font-bold">Решения для компаний любой сложности</h1>
            <div className="flex justify-center mb-6 border-b text-3xl p-10">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`py-10 px-5 mx-10 font-medium ${
                        activeTab === "all" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                    }`}
                >
                    Все услуги
                </button>
                <button
                    onClick={() => setActiveTab("direction")}
                    className={`py-10 px-5 mx-10 font-medium ${
                        activeTab === "direction" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                    }`}
                >
                    По направлению
                </button>
                <button
                    onClick={() => setActiveTab("transport")}
                    className={`py-10 px-5 mx-10 font-medium ${
                        activeTab === "transport" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                    }`}
                >
                    По транспорту
                </button>
            </div>

            <div className="tab-section-b flex flex-row justify-evenly px-28 text-white">
                <div className="flex flex-col ">
                    {tabContent[activeTab].map((item, index) => (
                        <a
                            href={item.link}
                            key={index}
                            className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                        >

                            <div className="p-4">
                                <h3 className="text-2xl text-gray-800 normal-case">{item.title}</h3>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="tab-section-br">
                    <div className="tab-section-br-text flex flex-col justify-between">
                        <div className="flex flex-col gap-6 font-semibold">
                            <p>Мы обеспечиваем высочайшее качество транспортно-<br/>логистических услуг.
                                Мы являемся лидером рынка грузовых<br/> перевозок Центральной Азии.</p>
                            <Link to="/more-about" className="more-about p-3 border w-1/6 text-center rounded-2xl">
                                Читать большее
                            </Link>
                        </div>
                        <div className="flex flex-col justify-between">
                            <Link to="/ftl" className="p-0 text-xl">
                                FTL перевозки
                            </Link>
                            <Link to="/ltl" className="p-0 text-xl">
                                LTL перевозки
                            </Link>
                        </div>
                    </div>
                    <div className="tab-section-icon bg-[url('./assets/tab-section.png')] bg-no-repeat"></div>
                </div>
            </div>
        </div>
    );
};

export default TabSections;