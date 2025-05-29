import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";

import AuthPopup from "./auth/AuthModal";
import {useAuth} from "./auth/AuthContext";


const Header: React.FC = () => {

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-md flex flex-col justify-between items-center
        fixed top-0 left-0 w-full z-50 uppercase">
            <div className="flex w-full items-center justify-between p-5 top-header">
                <div className="text-white">
                    <p>info@tranzequip.kz</p>
                    <p>+7 (777) 828-23-66</p>
                </div>
                <div className="logo bg-[url('./assets/logo.png')] bg-no-repeat w-16 h-16"></div>

                <div className="h-16 flex items-center justify-evenly">
                {user ? (
                        <div className="flex items-center justify-center">
                            <div className="profile-button bg-blue-600  text-white mr-10">

                                {user?.role === "USER" && (
                                    <Link
                                        className="text-xl hover:no-underline normal-case"
                                        to="/profile"
                                    >
                                        Профиль
                                    </Link>
                                )}
                                {user?.role === "ADMIN" && (
                                    <Link
                                        className="text-xl hover:no-underline normal-case"
                                        to="/admin"
                                    >
                                        Админка
                                    </Link>
                                )}
                            </div>
                            <div className="logout bg-blue-600 text-white">
                                <button
                                    className="text-xl"
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                ) : (
                    <button className="login bg-blue-600  text-white text-xl"
                                onClick={() => setIsAuthModalOpen(true)}>
                            Войти
                        </button>
                    )}
                </div>
            </div>
            <nav className="flex w-full items-center justify-between normal-case">
                <Link
                    to="/"
                    className="text-gray-700 nav-items border-r-2 border-l-1 text-2xl"
                >
                    Главная
                </Link>
                <Link
                    to="/services"
                    className="text-gray-700 nav-items border-r-2 border-l-1 text-2xl"
                >
                    Услуги
                </Link>
                <Link
                    to="/catalog"
                    className="text-gray-700 nav-items border-r-2 border-l-1 text-2xl"
                >
                    Автопарк
                </Link>
                <Link
                    to="/aboout-us"
                    className="text-gray-700 nav-items border-r-2 border-l-1 text-2xl"
                >
                    О нас
                </Link>
                <Link
                    to="/contacts"
                    className="flex-1 text-gray-700 nav-items border-r-2 border-l-1 text-2xl"
                >
                    Контакты
                </Link>
            </nav>

            <AuthPopup
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={() => setIsAuthModalOpen(false)}
            />
        </header>
    );
};

export default Header;