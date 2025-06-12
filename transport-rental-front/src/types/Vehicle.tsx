export type Vehicle = {
    id: number;
    name: string;
    category: string;
    description: string;
    available: boolean;
    pricePerDay: number;
    ratePerKm: number;
    quantity: number;
    imageUrl: string;
    descriptionDetailed?: Record<string, any>;
    serviceCategory: string;
};