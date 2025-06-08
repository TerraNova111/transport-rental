import axios from "../utils/axios";
import { Vehicle } from "../types/Vehicle";

export const updateVehicle = async (id: number, vehicle: Vehicle) => {
    await axios.put(`/api/admin/vehicles/${id}`, vehicle);
};