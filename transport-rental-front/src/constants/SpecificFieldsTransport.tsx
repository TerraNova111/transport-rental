export const specificFieldsTransport: Record<string, { label: string; key: string; type: string }[]> =  {
    "Самосвал": [
        { label: "Грузоподъемность (т)", key: "payload", type: "number" },
        { label: "Объем кузова (м³)", key: "bodyVolume", type: "number" },
    ],
    "Фургон": [
        { label: "Грузоподъемность (кг)", key: "payload", type: "number" },
        { label: "Объем кузова (м³)", key: "cargoVolume", type: "number" },
    ],
    "Тягач": [
        { label: "Мощность двигателя (л.с.)", key: "enginePower", type: "number" },
        { label: "Тип сцепки", key: "couplingType", type: "text" },
    ],
    "Цистерна": [
        { label: "Объем цистерны (л)", key: "tankVolume", type: "number" },
        { label: "Материал цистерны", key: "tankMaterial", type: "text" },
    ],
    "Автобус": [
        { label: "Количество мест", key: "seatCount", type: "number" },
        { label: "Класс автобуса", key: "busClass", type: "text" },
    ],
    "Бортовой грузовик": [
        { label: "Грузоподъемность (кг)", key: "payload", type: "number" },
        { label: "Длина платформы (м)", key: "platformLength", type: "number" },
    ],
    "Автовоз": [
        { label: "Количество платформ", key: "platformCount", type: "number" },
        { label: "Максимальная длина авто (м)", key: "maxCarLength", type: "number" },
    ],
    "Изотермическая рефрижератор": [
        { label: "Объем кузова (м³)", key: "cargoVolume", type: "number" },
        { label: "Температурный режим (°C)", key: "temperatureRange", type: "text" },
    ],
    "Пассажирский автобус": [
        { label: "Количество мест", key: "seatCount", type: "number" },
        { label: "Класс автобуса", key: "busClass", type: "text" },
    ],
    "Топливозаправщик": [
        { label: "Объем цистерны (л)", key: "tankVolume", type: "number" },
        { label: "Количество отсеков", key: "compartmentCount", type: "number" },
    ]
};