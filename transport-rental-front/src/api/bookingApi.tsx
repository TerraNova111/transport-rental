import axios from "../utils/axios";

export const createBooking = async (vehicleId: string, startDate: string, endDate: string) => {
    try {
        const response = await axios.post("/api/bookings", { vehicleId, startDate, endDate });
        return response.data;
    } catch (err: any) {
        if (err.response && err.response.status === 409) {
            alert(err.response.data);
        } else {
            console.error(err);
        }
        return null; 
    }
};