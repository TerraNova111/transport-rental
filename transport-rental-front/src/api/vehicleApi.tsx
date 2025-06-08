import axios from "../utils/axios";

export const getAllCategories = async (): Promise<string[]> => {
    const response = await axios.get<string[]>('/api/vehicles/categories');
    return response.data;
};

export const getAllServiceCategories = async (): Promise<string[]> => {
    const response = await axios.get<string[]>('/api/vehicles/service-categories');
    return response.data;
};