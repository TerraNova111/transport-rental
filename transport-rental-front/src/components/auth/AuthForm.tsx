import React, { useState } from 'react'

import { useAuth } from './AuthContext'
import {loginUser, registerUser} from "../../api/authApi";

type AuthFormProps = {
    onSuccess?: () => void
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const data = isLogin
                ? await loginUser(email, password)
                : await registerUser(email, password)

            login(data.token)
            if (onSuccess) onSuccess()

        } catch (err: any) {
            console.error(err)
            setError('Ошибка авторизации или регистрации')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-32 p-4 rounded relative">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
                {isLogin ? 'Вход' : 'Регистрация'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded hover:border-blue-700 shadow-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-2 border rounded hover:border-blue-700 shadow-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="auth-button bg-blue-700 text-white hover:bg-blue-800 shadow-xl"
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>
            <div className="mt-4 text-center auth-change" style={{ right: isLogin ? '-330px' : '-290px' }}>
                <button
                    className="text-white hover:underline text-sm"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    )
}

export default AuthForm