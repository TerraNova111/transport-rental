import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { categoryOptions } from '../constants/CategoryOptions';
import { Vehicle } from "../types/Vehicle";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import {commonFields} from "../constants/CommonFields";
import {specificFieldsRental} from "../constants/SpecificFieldsRental";
import {specificFieldsTransport} from "../constants/SpecificFieldsTransport";
import styles from "../styles/buttons/GenericButton.module.css";

const PAGE_SIZE = 8;

const CatalogPage: React.FC = () => {
    const { serviceCategory, category } = useParams<{ serviceCategory: string; category?: string }>();
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(vehicles.length / PAGE_SIZE);

    const vehiclesToShow = vehicles.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const categories =
        categoryOptions[serviceCategory as keyof typeof categoryOptions] || [];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (!serviceCategory) return;

        setLoading(true);
        let url = `/api/vehicles/available?serviceCategory=${serviceCategory}`;
        if (category) {
            url += `&category=${encodeURIComponent(category)}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setVehicles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [serviceCategory, category]);

    const onCategoryClick = (cat: string) => {
        navigate(`/catalog/${serviceCategory}/${encodeURIComponent(cat)}`);
    };

    const toggleExpand = (vehicleId: string) => {
        setExpandedVehicleId(prev => (prev === vehicleId ? null : vehicleId));
    };

    const serviceCategoryTranslations: { [key: string]: string } = {
        RENTAL: "Аренда",
        TRANSPORT: "Транспорт"
    };

    return (
        <div className="catalog-page min-h-screen">
            <div className="w-full bg-gray-100 p-0">
                <div className="max-w-7xl m-auto">
                    <nav className="text-sm text-gray-600  py-5">
                        <Link to="/catalog" className="hover:underline text-xl">Каталог</Link>
                        {serviceCategory && (
                            <>
                                <span className="">/</span>
                                <Link
                                    to={`/catalog/${serviceCategory}`}
                                    className="hover:underline text-xl"
                                >
                                    {serviceCategoryTranslations[serviceCategory] || serviceCategory}
                                </Link>
                            </>
                        )}
                        {category && (
                            <>
                                <span className="">/</span>
                                <span className="px-[10px] text-xl">{category}</span>
                            </>
                        )}
                    </nav>
                    <h1 className="text-4xl font-bold mt-2 pt-14 pb-5">
                        {serviceCategory && (
                            <>
                                {serviceCategory === 'RENTAL' ? 'Аренда' : 'Заказ Транспорта'}
                                {category ? ` ${category}а` : ''}
                            </>
                        )}
                    </h1>
                </div>
            </div>
            <div className="flex flex-col max-w-7xl m-auto">
                {/* Main Content */}
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside
                        className="w-72 p-6 border-r border-gray-200 sticky top-60 h-fit bg-white shadow-sm rounded-lg">
                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg text-gray-800 mb-1">Категории</h3>
                            <div className="w-12 h-0.5 bg-yellow-400 rounded-full"></div>
                        </div>

                        {/* Categories List */}
                        <ul className="space-y-1">
                            {/* Все категории */}
                            <li
                                className={`
                                        group relative cursor-pointer rounded-lg px-4 py-1 transition-all duration-200 ease-in-out
                                        ${!category
                                    ? 'bg-yellow-50 text-yellow-700 font-semibold shadow-sm border border-yellow-200'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }
                                `}
                                onClick={() => navigate(`/catalog/${serviceCategory}`)}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Все категории</span>
                                    {!category && (
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    )}
                                </div>

                                {/* Hover effect indicator */}
                                {category && (
                                    <div
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-yellow-400 rounded-r-full transition-all duration-200 group-hover:h-8"></div>
                                )}
                            </li>
                            {/* Category items */}
                            {categories.map(cat => (
                                <li
                                    key={cat.value}
                                    className={`
                                        group relative cursor-pointer rounded-lg px-4 py-1 transition-all duration-200 ease-in-out
                                        ${category === cat.value
                                        ? 'bg-yellow-50 text-yellow-700 font-semibold shadow-sm border border-yellow-200'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                                    `}
                                    onClick={() => onCategoryClick(cat.value)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{cat.label}</span>
                                        {category === cat.value && (
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        )}
                                    </div>

                                    {/* Hover effect indicator */}
                                    {category !== cat.value && (
                                        <div
                                            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-yellow-400 rounded-r-full transition-all duration-200 group-hover:h-8"></div>
                                    )}

                                    {/* Active state left border */}
                                    {category === cat.value && (
                                        <div
                                            className="absolute left-0 top-0 w-1 h-full bg-yellow-400 rounded-r-full"></div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Vehicle Cards */}
                    <main className="flex-1 p-4 ">
                        {loading ? (
                            <p>Загрузка...</p>
                        ) : vehicles.length === 0 ? (
                            <p>Техника не найдена</p>
                        ) : (
                            <ul className="flex flex-col gap-4 min-h-[800px]">
                                {vehiclesToShow.map(vehicle => (
                                    <li
                                        key={vehicle.id}
                                        className=" ounded-lg  p-4 bg-white flex flex-col md:flex-row transition-all duration-300 ease-in-out"
                                    >
                                        {/* Левая колонка: картинка */}
                                        <img
                                            src={`http://localhost:8080/uploads/${vehicle.imageUrl}`}
                                            alt={vehicle.name}
                                            className="w-full md:w-2/4 h-64 object-cover rounded mb-4 md:mb-0 md:mr-8 flex-shrink-0"
                                        />

                                        {/* Правая колонка: описание */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex-shrink-0">
                                                <h2 className="text-2xl font-semibold mb-1">{vehicle.name}</h2>
                                                <p className="leading-relaxed mb-3">{vehicle.description}</p>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    {vehicle.category}
                                                </p>
                                                {vehicle.serviceCategory === "RENTAL" ? (
                                                    <p className="text-green-600 font-bold mb-2">
                                                        {vehicle.pricePerDay}₸ <span
                                                        className="text-gray-500 font-normal">/ день</span>
                                                    </p>
                                                ) : (
                                                    <p className="text-green-600 font-bold mb-2">
                                                        {vehicle.ratePerKm}₸ <span
                                                        className="text-gray-500 font-normal">/ км</span>
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-center mt-2 flex-shrink-0">
                                                <button
                                                    onClick={() => toggleExpand(vehicle.id.toString())}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                                                >
                                                    {expandedVehicleId === vehicle.id.toString() ? (
                                                        <>
                                                            <ChevronUpIcon className="w-5 h-5 mr-1 text-gray-500"/>
                                                            <span className="text-gray-500">Скрыть характеристики</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDownIcon className="w-5 h-5 mr-1 text-gray-500"/>
                                                            <span
                                                                className="text-gray-500">Показать характеристики</span>
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                                                    className={`${styles.button}`}
                                                    type="button"
                                                >
                                                    Подробнее
                                                </button>
                                            </div>

                                            <div
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                    expandedVehicleId === vehicle.id.toString()
                                                        ? 'max-h-[600px] opacity-100 mt-2'
                                                        : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <div
                                                    className="bg-gray-50 p-4 rounded border text-sm h-full min-h-[200px] flex flex-col">
                                                    {vehicle.descriptionDetailed ? (
                                                        <div className="flex-1">
                                                            {Object.entries(vehicle.descriptionDetailed)
                                                                .filter(([key]) => key !== "description")
                                                                .map(([key, value]) => {
                                                                    let field = commonFields.find(f => f.key === key);

                                                                    if (!field) {
                                                                        if (vehicle.serviceCategory === "RENTAL" && vehicle.category) {
                                                                            field = specificFieldsRental[vehicle.category]?.find(f => f.key === key);
                                                                        }
                                                                        if (!field && vehicle.serviceCategory === "TRANSPORT" && vehicle.category) {
                                                                            field = specificFieldsTransport[vehicle.category]?.find(f => f.key === key);
                                                                        }
                                                                    }

                                                                    const label = field ? field.label : key;

                                                                    return (
                                                                        <li
                                                                            key={key}
                                                                            className="pt-3 first:pt-0 flex justify-between items-center"
                                                                        >
                                                                            <span
                                                                                className="text-gray-700">{label}:</span>
                                                                            <span
                                                                                className="text-gray-600 font-semibold">{value}</span>
                                                                        </li>
                                                                    );
                                                                })}
                                                        </div>
                                                    ) : (
                                                        <div className="flex-1 flex items-center justify-center">
                                                            <p className="text-gray-400">Описание недоступно</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Назад
                            </button>

                            {Array.from({length: totalPages}, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 border rounded ${
                                        currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Вперед
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;