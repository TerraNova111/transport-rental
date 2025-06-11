import axios from "../utils/axios";
import {createAddress} from "./addressApi";
import { AddressInfo } from "../types/Address";

export const createBooking = async (
    vehicleId: string,
    startDate: string,
    endDate: string,
    serviceCategory: string,
    deliveryAddress?: AddressInfo | null,
    loadingAddress?: AddressInfo | null,
    unloadingAddress?: AddressInfo | null
) => {
    try {
        let deliveryAddressId: string | undefined;
        let loadingAddressId: string | undefined;
        let unloadingAddressId: string | undefined;

        if (deliveryAddress) {
            const address = await createAddress(deliveryAddress);
            deliveryAddressId = address.id;
        }

        if (loadingAddress) {
            const address = await createAddress(loadingAddress);
            loadingAddressId = address.id;
        }

        if (unloadingAddress) {
            const address = await createAddress(unloadingAddress);
            unloadingAddressId = address.id;
        }

        const response = await axios.post("/api/bookings", {
            vehicleId,
            startDate,
            endDate,
            serviceCategory,
            deliveryAddressId,
            loadingAddressId,
            unloadingAddressId
        });

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