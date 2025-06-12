import React, { useEffect, useState } from 'react'
import AuthForm from './AuthForm'

interface AuthPopupProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void;
    onForgotPassword: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose, onSuccess, onForgotPassword  }) => {
    const [visible, setVisible] = useState(isOpen)

    useEffect(() => {
        if (isOpen) setVisible(true)
        else {
            const timeout = setTimeout(() => setVisible(false), 300)
            return () => clearTimeout(timeout)
        }
    }, [isOpen])

    if (!visible) return null

    return (

        <div
            className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm
                transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            aria-modal="true"
            role="dialog"
            aria-labelledby="auth-popup-title"
        >

            <div
                className={`bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-auto p-10
                    transform transition-transform duration-300
                    ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
                style={{ minHeight: '500px' }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full
                        hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-600"
                    aria-label="Close authentication modal"
                >
                    <span className="text-3xl font-bold text-gray-600">&times;</span>
                </button>


                <AuthForm onSuccess={onSuccess} onForgotPassword={onForgotPassword}/>
            </div>
        </div>
    )
}

export default AuthPopup