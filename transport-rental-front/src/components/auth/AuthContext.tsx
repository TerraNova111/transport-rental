import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type User = {
    username: string;
    email: string;
    role: string;
    name: string;
    phone: string;
}

type AuthContextType = {
    user: User | null
    login: (token: string) => void
    logout: () => void
    isAuthValidated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthValidated, setIsAuthValidated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({
                username: payload.username,
                email: payload.sub,
                role: payload.role,
                name: payload.name,
                phone: payload.phone
            });

            fetch('/api/auth/validate', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        logout();
                    }
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setIsAuthValidated(true);
                });
        } else {
            setIsAuthValidated(true);
        }
    }, []);


    const login = (token: string) => {
        localStorage.setItem('token', token)
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
            username: payload.username,
            email: payload.sub,
            role: payload.role,
            name: payload.name,
            phone: payload.phone
        });
        setIsAuthValidated(true);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthValidated  }}>
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