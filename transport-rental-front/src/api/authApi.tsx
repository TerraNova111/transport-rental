import axios from "../utils/axios";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/auth/login', { email, password });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error('Неверный email или пароль');
        }
        throw new Error('Ошибка при входе');
    }
};

export const registerUser = async (data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    address: string;
}) => {
    try {
        const response = await axios.post('/api/auth/register', data);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 409) {
            throw new Error('Пользователь с таким email уже зарегистрирован');
        }
        throw new Error('Ошибка при регистрации');
    }
};

export const sendForgotPasswordEmail = async (email: string) => {
    try {
        const response = await fetch('/api/auth/forgot-password?email=' + encodeURIComponent(email), {
            method: 'POST',
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Пользователь с таким email не найден');
            }
            throw new Error('Ошибка при сбросе пароля');
        }

        return await response.text();
    } catch (error: any) {
        throw new Error(error.message || 'Ошибка сети');
    }
};

export const resetPassword = async (token: string, newPassword: string) => {
    const response = await fetch(`/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
        throw new Error('Ошибка сброса пароля');
    }

    return await response.text();
};