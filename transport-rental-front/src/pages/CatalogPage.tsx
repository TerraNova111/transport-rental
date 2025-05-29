import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Vehicle } from "../types/Vehicle";
import homeBg from "../assets/catalog-bg.jpg";
import {Link} from "react-router-dom";

const CatalogPage: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        axios.get("/api/vehicles/available")
            .then(res => setVehicles(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="w-full">
            <section
                className="relative h-screen bg-fixed bg-center bg-cover bg-no-repeat"
                style={{backgroundImage: `url(${homeBg})`}}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"/>
                <div className="relative z-20 h-full flex items-center justify-start px-14 text-white">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Наша техника
                        </h1>
                        <p className="text-xl md:text-2xl mb-6">
                            Аренда спецтехники и транспортных услуг с онлайн-бронированием
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg">
                            Расчитать стоимость
                        </button>
                    </div>
                </div>
            </section>
            <div className="catalog min-h-screen relative z-30 -mt-24 bg-white shadow-lg">
                <div className="max-w-5xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Каталог техники</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                        {vehicles.map(vehicle => (
                            <div key={vehicle.id} className="border rounded p-4 shadow-sm">
                                <img
                                    src={`http://localhost:8080/uploads/${vehicle.imageUrl}`}
                                    alt={vehicle.name}
                                    className="w-full h-40 object-cover rounded mb-2"
                                />
                                <h2 className="text-xl font-semibold">{vehicle.name}</h2>
                                <p className="text-gray-600">{vehicle.category}</p>
                                <p className="text-sm text-gray-500">{vehicle.description}</p>
                                <p className="mt-2 font-bold">{vehicle.pricePerDay}₸ / день</p>
                                <button
                                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={() => alert("Открыть страницу бронирования")}
                                >
                                    Забронировать
                                </button>
                                <Link to={`/vehicle/${vehicle.id}`}>
                                    <p className="font-medium">Подробнее</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CatalogPage;