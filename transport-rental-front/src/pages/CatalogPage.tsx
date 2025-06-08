import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { categoryOptions } from '../constants/CategoryOptions';
import { Vehicle } from "../types/Vehicle";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const CatalogPage: React.FC = () => {
    const { serviceCategory, category } = useParams<{ serviceCategory: string; category?: string }>();
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [expandedVehicleId, setExpandedVehicleId] = useState<string | null>(null);

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

    return (
        <div className="catalog-page ">
            <div className="w-full bg-gray-100 p-0">
                <div className="max-w-7xl m-auto">
                    <nav className="text-sm text-gray-600  py-5">
                        <Link to="/catalog" className="hover:underline">Каталог</Link>
                        {serviceCategory && (
                            <>
                                <span className="">/</span>
                                <Link
                                    to={`/catalog/${serviceCategory}`}
                                    className="hover:underline capitalize"
                                >
                                    {serviceCategory}
                                </Link>
                            </>
                        )}
                        {category && (
                            <>
                                <span className="mx-2">/</span>
                                <span className="capitalize">{category}</span>
                            </>
                        )}
                    </nav>
                    <h1 className="text-4xl font-bold mt-2 pt-14 pb-5">
                        {serviceCategory && (
                            <>
                                {serviceCategory === 'RENTAL' ? 'Аренда' : serviceCategory}
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
                    <aside className="w-64 p-4 border-r">
                        <h3 className="font-bold mb-2">Категории</h3>
                        <ul>
                            <li
                                className={`cursor-pointer mb-1 ${!category ? 'font-bold text-yellow-500' : ''}`}
                                onClick={() => navigate(`/catalog/${serviceCategory}`)}
                            >
                                Все
                            </li>
                            {categories.map(cat => (
                                <li
                                    key={cat.value}
                                    className={`cursor-pointer mb-1 ${category === cat.value ? 'font-bold text-yellow-500' : ''}`}
                                    onClick={() => onCategoryClick(cat.value)}
                                >
                                    {cat.label}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Vehicle Cards */}
                    <main className="flex-1 p-4">
                        {loading ? (
                            <p>Загрузка...</p>
                        ) : vehicles.length === 0 ? (
                            <p>Техника не найдена</p>
                        ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {vehicles.map(vehicle => (
                                    <li key={vehicle.id}
                                        className="border rounded-lg shadow-sm p-4 bg-white flex flex-col">
                                        <img
                                            src={`http://localhost:8080/uploads/${vehicle.imageUrl}`}
                                            alt={vehicle.name}
                                            className="w-full h-40 object-cover rounded mb-2"
                                        />
                                        <h4 className="text-lg font-semibold mb-1">{vehicle.name}</h4>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {vehicle.category}
                                        </p>
                                        <p className="text-green-600 font-bold mb-2">
                                            {vehicle.pricePerDay}₸ <span
                                            className="text-gray-500 font-normal">/ день</span>
                                        </p>
                                        <div className="flex justify-between items-center mb-2">
                                            <button
                                                onClick={() => toggleExpand(vehicle.id.toString())}
                                                className="text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                {expandedVehicleId === vehicle.id.toString() ? (
                                                    <>
                                                        <ChevronUpIcon className="w-5 h-5 mr-1"/>
                                                        Скрыть характеристики
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDownIcon className="w-5 h-5 mr-1"/>
                                                        Показать характеристики
                                                    </>
                                                )}
                                            </button>
                                            <Link
                                                to={`/vehicle/${vehicle.id}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow transition"
                                            >
                                                Подробнее
                                            </Link>
                                        </div>
                                        {expandedVehicleId === vehicle.id.toString() && (
                                            <div className="bg-gray-50 p-3 rounded border mt-2 text-sm">
                                                {vehicle.description
                                                    ? <p>{vehicle.description}</p>
                                                    : <p className="text-gray-400">Описание недоступно</p>}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;