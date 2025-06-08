import axios from "../utils/axios";

export const updateVehicleImage = async (vehicleId: number, image: File) => {
    const formData = new FormData();
    formData.append('imageFile', image);

    await axios.put(`/api/admin/${vehicleId}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};