import axios from "../utils/axios";

export const createPaymentSession = async (
    bookingId: number,
    vehicleName: string,
    amount: number
) => {
    console.log("Создаю сессию оплаты", { bookingId, vehicleName, amount });
    const res = await axios.post("/api/payment/create-checkout-session", {
        bookingId,
        vehicleName,
        amount,
    });
    return res.data;
};