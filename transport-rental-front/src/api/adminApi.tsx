import axios from "../utils/axios";

const API_URL = "http://localhost:8080/api/admin";

export const fetchAllVehicles = async () => {
    const res = await axios.get(`${API_URL}/vehicles`);
    return res.data;
};

export const addVehicle = async (formData: FormData) => {
    return await axios.post(`${API_URL}/vehicles`, formData);
};

export const deleteVehicle = async (id: number) => {
    return await axios.delete(`${API_URL}/vehicles/${id}`);
};