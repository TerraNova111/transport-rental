import React from "react";
import homeBg from "../assets/home-intro.png";
import TabSections from "../components/TabSections";

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
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Транспортная компания TranzEquip
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

            <main className="tab-section relative z-30 -mt-24 bg-white shadow-lg">
                <TabSections/>
            </main>
        </div>
    );
};

export default HomePage;