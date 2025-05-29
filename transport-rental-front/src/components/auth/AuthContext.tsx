import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type User = {
    username: string;
    email: string;
    role: string;
}

type AuthContextType = {
    user: User | null
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            setUser({
                username: payload.username,
                email: payload.sub,
                role: payload.role,
            });
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token)
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
            username: payload.username,
            email: payload.sub,
            role: payload.role,
        });
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}