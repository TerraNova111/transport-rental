import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/buttons/AddVehicleFormButton.module.css"


type Tab = "all" | "rental" | "transport";

interface ServiceBlock {
    title: string;
    description: string;
    category: "rental" | "transport";
}

const services: ServiceBlock[] = [
    {
        title: "Аренда спецтехники",
        description: "Мы предоставляем вам широкий выбор специализированной техники, которая поможет вам\n" +
            "реализовать проекты эффективно и в срок. Сотрудничая с нами, вы получаете доступ к\n" +
            "современной технике и профессиональному сервису, который поддерживает ваш бизнес\n" +
            "на пути к успеху.",
        category: "rental",
    },
    {
        title: "Аренда самосвалов",
        description: "Мы предоставляем современные и надежные самосвалы для эффективных грузоперевозок.\n" +
            "Наши автомобили разработаны, чтобы справляться с самыми сложными задачами и удовлетворять\n" +
            "потребности наших клиентов.",
        category: "rental",
    },
    {
        title: "Аренда автокранов",
        description: "Мы предлагаем высокотехнологичные автокраны, предназначенные для различных задач подъема и\n" +
            "перевозки. Наша техника обеспечивает надежность, производительность и безопасность в\n" +
            "каждой работе.",
        category: "rental",
    },
    {
        title: "Аренда транспортной техники",
        description: "Мы предоставляем в аренду широкий спектр транспортной техники для решения различных логистических " +
            "и производственных задач. В нашем автопарке — современные и технически исправные транспортные средства, " +
            "готовые к эксплуатации в любых условиях.",
        category: "transport",
    },
    {
        title: "Автомобильные перевозки",
        description: "Максимальное качество транспортно-экспедиционных услуг при минимальных затратах.\n" +
            "Мы занимаем лидирующие позиции на рынке грузовых перевозок Казахстана и стран СНГ.",
        category: "transport",
    },
    {
        title: "Тентовые перевозки",
        description: "Мы предлагаем качественные тентовые перевозки, сочетающие в себе универсальность и\n" +
            "эффективность для удовлетворения всех ваших транспортных потребностей. Благодаря\n" +
            "современному парку автомобилей, оборудованных прочными и надежными тентами,\n" +
            "мы гарантируем безопасность и целостность вашего груза в процессе доставки.",
        category: "transport",
    },
    {
        title: "Рефрижераторные перевозки",
        description: "Мы в компании Транслайн понимаем, насколько важна сохранность и свежесть продукции в\n" +
            "процессе транспортировки. Наша компания специализируется на рефрижераторных грузоперевозках,\n" +
            "обеспечивая оптимальные условия для перевозки скоропортящихся товаров, лекарств, продуктов\n" +
            "питания и других товаров, требующих поддержания постоянной температуры.",
        category: "transport",
    },
];

const TabSections: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("all");
    const navigate = useNavigate();

    const renderBlocks = (filtered: ServiceBlock[]) =>
        filtered.map((service, index) => (
            <div
                key={index}
                className="py-20 px-10 my-10 border rounded-3xl bg-gray-50"
            >
                <div className="p-4 flex flex-row justify-between text-xl">
                    <h3 className="text-5xl text-gray-800">{service.title}</h3>
                    <p className="w-2/5">{service.description}</p>
                </div>
            </div>
        ));

    const handleNavigate = () => {
        const route =
            activeTab === "rental"
                ? "/catalog/RENTAL"
                : activeTab === "transport"
                    ? "/catalog/TRANSPORT"
                    : "/catalog/";
        navigate(route);
    };

    const rentalBlocks = services.filter((s) => s.category === "rental");
    const transportBlocks = services.filter((s) => s.category === "transport");

    return (
        <div className="flex flex-col p-20 mb-96">
            <h1 className="text-center p-20 font-bold text-5xl">
                Решения для компаний любой сложности
            </h1>

            <div className="flex justify-center mb-6 border-b text-3xl p-10">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`py-6 px-5 mx-10 font-medium ${
                        activeTab === "all"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600"
                    }`}
                >
                    Все услуги
                </button>
                <button
                    onClick={() => setActiveTab("transport")}
                    className={`py-6 px-5 mx-10 font-medium ${
                        activeTab === "transport"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600"
                    }`}
                >
                    Транспортные услуги
                </button>
                <button
                    onClick={() => setActiveTab("rental")}
                    className={`py-6 px-5 mx-10 font-medium ${
                        activeTab === "rental"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600"
                    }`}
                >
                    Аренда
                </button>
            </div>

            <div className="flex flex-col my-10">
                {activeTab === "all" && (
                    <>
                        {renderBlocks(rentalBlocks)}
                        {renderBlocks(transportBlocks)}
                    </>
                )}
                {activeTab === "rental" && renderBlocks(rentalBlocks)}
                {activeTab === "transport" && renderBlocks(transportBlocks)}
            </div>

            <div className="flex justify-end mb-10">
                <button
                    onClick={handleNavigate}
                    className={`${styles.button} w-1/6 h-16`}
                >
                    Перейти в каталог
                </button>
            </div>
        </div>
    );
};

export default TabSections;