import React, { useState } from 'react'
import { useAuth } from './AuthContext'
import { loginUser, registerUser } from '../../api/authApi'

import styles from "../../styles/AuthForm.module.css"
import buttonStyle from "../../styles/buttons/AddVehicleFormButton.module.css";

import GoogleIcon  from '../../assets/icons/google-icon-logo.svg';
import ForgotPasswordModal from "./ForgotPasswordModal";

type AuthFormProps = {
    onSuccess?: () => void
    onForgotPassword: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess, onForgotPassword  }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);


    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const data = isLogin
                ? await loginUser(email, password)
                : await registerUser({
                    email,
                    password,
                    fullName,
                    phone,
                    address: '',
                });

            login(data.token);
            if (onSuccess) onSuccess();
        } catch (error: any) {
            if (error.response?.status === 409) {
                setError(error.response.data);
            } else {
                setError("Произошла ошибка. Попробуйте позже.");
            }
        }
    };

    return (
        <div className="flex flex-col justify-center h-full">
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles["flex-column"]}>
                    <label>Email</label>
                </div>
                <div className={styles.inputForm}>
                    <svg
                        height="20"
                        viewBox="0 0 32 32"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                    </svg>
                    <input
                        type="email"
                        className={styles.input}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {!isLogin && (
                    <>
                        <div className={styles["flex-column"]}>
                            <label>Имя</label>
                        </div>
                        <div className={styles.inputForm}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Имя"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles["flex-column"]}>
                            <label>Телефон</label>
                        </div>
                        <div className={styles.inputForm}>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="+7 900 000-00-00"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                <div className={styles["flex-column"]}>
                    <label>Пароль</label>
                </div>
                <div className={styles.inputForm}>
                    <svg
                        height="20"
                        viewBox="-64 0 512 512"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                        <path
                            d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                    </svg>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <svg
                        onClick={() => setShowPassword(!showPassword)}
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className={"cursor-pointer mr-3"}
                    >
                        <path
                            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                    </svg>
                </div>

                {/* Remember me and Forgot password */}
                <div className={styles["flex-row"]}>
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className={`${styles.span} underline`}
                    >
                        Забыли пароль?
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button className={`${buttonStyle.button} w-full`} type="submit">
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>


                <p className={styles.p}>
                    {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        className={styles.span}
                    >
                    {isLogin ? ' Зарегистрироваться' : ' Войти'}
                    </span>
                </p>
            </form>
        </div>
    )
}


export default AuthForm