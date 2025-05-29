import React from 'react'
import AuthForm from './AuthForm'
import authImage from '../../assets/auth-logo.jpg'

interface AuthPopupProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div
                className="bg-white rounded-2xl shadow-lg relative flex flex-row w-full max-w-3xl h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-1/2 relative p-6">
                    <button
                        onClick={onClose}
                        className="modal-close text-gray-500 hover:text-black text-xl"
                    >
                        &times;
                    </button>
                    <AuthForm onSuccess={onClose} />
                </div>


                <div
                    className="w-1/2 h-full bg-blend-soft-light bg-blue-900 auth-bg
                    flex flex-col justify-center items-center text-white p-6 bg-cover bg-center"
                    style={{ backgroundImage: `url(${authImage})` }}
                >
                    <h1 className="text-3xl font-bold mb-4 text-center">Привет, Друг!</h1>
                    <p className="text-center mb-6 normal-case">
                        Введите свои персональные данные и начните свое путешествие вместе с нами
                    </p>

                </div>
            </div>
        </div>
    )
}

export default AuthPopup