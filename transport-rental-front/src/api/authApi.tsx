import axios from "../utils/axios";

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', {email, password})
    return response.data
}

export const registerUser = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/register', {email, password})
    return response.data
}