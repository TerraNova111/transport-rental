import React from 'react';
import servicesBg from "../assets/services-bg.png";
import TabSections from "../components/TabSections";

const ServicesPage: React.FC = () => {
    return (
        <div>
            <section
                className="relative h-screen bg-fixed bg-center bg-cover bg-no-repeat"
                style={{backgroundImage: `url(${servicesBg})`}}
            >
                <div className="absolute inset-0  bg-opacity-50 z-10"/>
                <div className="relative z-20 h-full flex items-center justify-start px-14 text-white">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Грузоперевозки в Казахстане, Центральной Азии, СНГ и Европе
                        </h1>
                        <p className="text-xl md:text-xl mb-6 w-[500px]">
                            Транспортная группа TRANZEQUIP предлагает широкий спектр логистических решений с
                            использованием возможностей собственного автомобильного транспорта в Крупнейших портах
                            Азии и СНГ и разветвленной сети представительств по всему миру.
                        </p>

                    </div>
                </div>
            </section>
            <main className="tab-section relative z-30 -mt-24 bg-white shadow-lg">
                <TabSections/>
            </main>
        </div>
    );
};

export default ServicesPage;