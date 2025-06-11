import axios from "../utils/axios";
import { AddressInfo } from "../types/Address";


export const createAddress = async (addressInfo: AddressInfo) => {
    try {
        const response = await axios.post("/api/addresses", {
            latitude: addressInfo.latitude,
            longitude: addressInfo.longitude,
            street: addressInfo.street || null,
            city: addressInfo.city || null,
            state: addressInfo.state || null,
            zipCode: addressInfo.zipCode || null,
            country: addressInfo.country || null
        });
        return response.data;
    } catch (err) {
        console.error("Ошибка создания адреса:", err);
        throw err;
    }
};