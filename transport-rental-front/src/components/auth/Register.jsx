import { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            await axios.post('http://localhost:8080/api/auth/register', {
                email,
                password
            })
            alert('Успешная регистрация!')
        } catch (err) {
            console.log(err)
            setError('Ошибка регистрации')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full p-2 border rounded"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Зарегистрироваться
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}