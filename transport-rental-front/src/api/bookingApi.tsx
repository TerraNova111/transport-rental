import axios from "../utils/axios";

export const createBooking = async (vehicleId: string, startDate: string, endDate: string) => {
    const response = await axios.post("/api/bookings", {vehicleId, startDate, endDate});
    return response.data;
};