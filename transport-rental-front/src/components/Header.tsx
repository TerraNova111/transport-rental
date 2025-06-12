import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {
    UserCircle,
    ShieldCheck,
    SignOut,
    SignIn,
} from "@phosphor-icons/react";

import AuthPopup from "./auth/AuthPopup";
import {useAuth} from "./auth/AuthContext";
import ForgotPasswordModal from "./auth/ForgotPasswordModal";


const Header: React.FC = () => {

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const { user, logout, isAuthValidated } = useAuth()
    const navigate = useNavigate();

    const [authOpen, setAuthOpen] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);

    const handleOpenAuth = () => {
        setAuthOpen(true);
        setForgotOpen(false);
    };

    const handleOpenForgot = () => {
        setForgotOpen(true);
        setAuthOpen(false);
    };

    const handleCloseAll = () => {
        setAuthOpen(false);
        setForgotOpen(false);
    };

    return (
        <header
            className="bg-white shadow-md flex flex-col justify-between items-center fixed top-0 left-0 w-full z-50 uppercase">
            <div className="flex w-full items-center justify-between p-5 top-header">
                <div className="text-white">
                    <p>info@tranzequip.kz</p>
                    <p>+7 (777) 828-23-66</p>
                </div>
                <div className="logo bg-[url('../assets/logo.png')] bg-no-repeat w-16 h-16"></div>
                <div className="flex items-center space-x-4">
                    {isAuthValidated && (
                        <>
                            {user ? (
                                <>
                                    {user.role === "USER" && (
                                        <Link
                                            to="/profile"
                                            className="p-2"
                                            title="Профиль"
                                        >
                                            <UserCircle size={24}
                                                        className="text-white transition-transform duration-200 hover:scale-110"/>
                                        </Link>
                                    )}
                                    {user.role === "ADMIN" && (
                                        <Link
                                            to="/admin"
                                            className="p-2"
                                            title="Админка"
                                        >
                                            <ShieldCheck size={24}
                                                         className="text-white transition-transform duration-200 hover:scale-110"/>
                                        </Link>
                                    )}
                                    <button
                                        className="p-2"
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                        }}
                                        title="Выйти"
                                    >
                                        <SignOut size={24}
                                                 className="text-white transition-transform duration-200 hover:scale-110"/>
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="p-2"
                                    onClick={handleOpenAuth}
                                    title="Войти"
                                >
                                    <SignIn size={24}
                                            className="text-white transition-transform duration-200 hover:scale-110"/>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            <nav className="flex flex-col sm:flex-row w-full items-center justify-between normal-case">
                <Link to="/"
                      className="text-gray-700 nav-items border-b sm:border-b-0 sm:border-r-2 py-2 px-4 text-xl sm:text-2xl w-full sm:w-auto text-center">
                    Главная
                </Link>
                <Link to="/services"
                      className="text-gray-700 nav-items border-b sm:border-b-0 sm:border-r-2 py-2 px-4 text-xl sm:text-2xl w-full sm:w-auto text-center">
                    Услуги
                </Link>
                <Link to="/catalog"
                      className="text-gray-700 nav-items border-b sm:border-b-0 sm:border-r-2 py-2 px-4 text-xl sm:text-2xl w-full sm:w-auto text-center">
                    Автопарк
                </Link>
                <Link to="/contacts"
                      className="text-gray-700 nav-items py-2 px-4 text-xl sm:text-2xl w-full sm:w-auto text-center">
                    Контакты
                </Link>
            </nav>

            <AuthPopup
                isOpen={authOpen}
                onClose={handleCloseAll}
                onSuccess={handleCloseAll}
                onForgotPassword={handleOpenForgot}
            />

            {forgotOpen && (
                <ForgotPasswordModal
                    onClose={handleOpenAuth} // при закрытии возвращаемся к AuthPopup
                />
            )}
        </header>
    );
};

export default Header;