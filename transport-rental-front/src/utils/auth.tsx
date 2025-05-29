import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    role: string;
    exp: number;
}

export function getRoleFromToken(): string | null {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.role || null;
    } catch (e) {
        console.error("Ошибка при декодировании токена", e);
        return null;
    }
}