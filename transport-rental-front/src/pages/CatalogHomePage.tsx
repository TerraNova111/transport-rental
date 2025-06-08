import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/buttons/AddVehicleFormButton.module.css"; // Подставь свой путь
import { categoryOptions } from "../constants/CategoryOptions";

const bannerImages = [
    { src: "/images/catalogBanner/1.png", alt: "Автокран Sany" },
    { src: "/images/catalogBanner/2.png", alt: "Scania" },
    { src: "/images/catalogBanner/3.png", alt: "Экскаватор JCB JS" },
    { src: "/images/catalogBanner/4.png", alt: "Манипулятор FAW J^" }
];

const CatalogHomePage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div>

            <div className="relative w-[1400px] h-[600px] mt-48 m-auto">
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 lg:left-36 xl:left-36 2xl:-left-20 z-10
                        3xl:-left-32 transform -translate-y-1/2 bg-black text-white rounded-full
                        p-2 hover:bg-opacity-70"
                >
                    &#8592;
                </button>

                <button
                    onClick={handleNext}
                    className="absolute top-1/2 xl:right-64 2xl:-right-20 z-10
                        3xl:-right-32 transform -translate-y-1/2 bg-black text-white rounded-full p-2 hover:bg-opacity-70"
                >
                    &#8594;
                </button>
                <div className="overflow-hidden">
                    <div
                        className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{transform: `translateX(-${currentIndex * 100}%)`}}
                    >
                        {bannerImages.map(({src, alt}, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={alt}
                                className="w-full flex-shrink-0 object-cover"
                            />
                        ))}
                    </div>
                    {/* Кнопки переключения */}

                    <div className="absolute bottom-14 left-0 right-0 flex justify-center space-x-2 px-4">
                        {bannerImages.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? "bg-yellow-400 w-20" : "bg-yellow-200 w-10"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="max-w-6xl m-auto ">
                <h1 className="text-4xl font-bold mb-10 px-20">Аренда Спецтехники</h1>
                <p className="opacity-70 px-10 mb-10">
                    Компания «TranzEquip» предлагает аренду спецтехники широкого назначения в
                    Москве и Московской области для осуществления строительных, дорожно-ремонтных,
                    демонтажных работ, а также многофункциональное навесное оборудование. Помимо этого
                    мы предоставляем услуги по перевозке спецтехники и других грузов низкорамным тралом
                    или эвакуатором.
                </p>
                <h1 className="text-xl font-bold mb-4 ml-10 py-3 text-center
                bg-gradient-to-l from-yellow-300 to-yellow-500 w-[250px] rounded-xl">
                    Выберите технику
                </h1>
            </div>
            <div className="catalog-home p-4 max-w-7xl mx-auto">
                {/* Каталог */}
                <div className="border p-10 m-20 mt-0 rounded-2xl shadow-xl">
                    <div className="flex flex-col gap-6 ml-5">
                        {Object.entries(categoryOptions).map(([serviceCategory, categories]) => (
                            <div key={serviceCategory} className="p-2 w-full m-auto">
                                <h5 className="font-semibold p-0">
                                    {serviceCategory === 'RENTAL' ? (
                                        <Link
                                            to="/catalog/RENTAL"
                                            className={`${styles.button} w-1/6 text-center bg-yellow-400 h-12`}
                                        >
                                            Аренда
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/catalog/TRANSPORT"
                                            className={`${styles.button} w-1/6 text-center bg-yellow-400 h-12`}
                                        >
                                            Транспорт
                                        </Link>
                                    )}
                                </h5>
                                <ul className="flex w-full flex-wrap gap-6">
                                    {categories.map(cat => (
                                        <li key={cat.value} className="w-56 flex flex-col items-center">
                                            <Link
                                                to={`/catalog/${serviceCategory}/${encodeURIComponent(cat.value)}`}
                                                className="group flex flex-col items-center transition-opacity hover:no-underline"
                                            >
                                                <img
                                                    src={cat.image}
                                                    alt={cat.label}
                                                    className="w-full h-16 object-cover rounded"
                                                />
                                                <span
                                                    className="text-center text-gray-800 group-hover:text-yellow-500 transition-colors duration-300"
                                                >
                                                    {cat.label}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogHomePage;