export const specificFieldsRental: Record<string, { label: string; key: string; type: string }[]> =  {
    "Экскаватор": [
        { label: "Глубина копания (м)", key: "digDepth", type: "number" },
        { label: "Объем ковша (м³)", key: "bucketCapacity", type: "number" },
    ],
    "Погрузчик": [
        { label: "Грузоподъемность (кг)", key: "loadCapacity", type: "number" },
        { label: "Высота подъема (м)", key: "liftingHeight", type: "number" },
    ],
    "Бульдозер": [
        { label: "Мощность отвала (кВт)", key: "bladePower", type: "number" },
        { label: "Ширина отвала (м)", key: "bladeWidth", type: "number" },
    ],
    "Каток": [
        { label: "Рабочая ширина (м)", key: "workingWidth", type: "number" },
        { label: "Вес катка (кг)", key: "rollerWeight", type: "number" },
    ],
    "Автокран": [
        { label: "Грузоподъемность (т)", key: "liftingCapacity", type: "number" },
        { label: "Высота подъема (м)", key: "liftingHeight", type: "number" },
    ],
    "Грузовик": [
        { label: "Грузоподъемность (кг)", key: "payload", type: "number" },
        { label: "Объем кузова (м³)", key: "bodyVolume", type: "number" },
    ],
    "Асфальтоукладчик": [
        { label: "Ширина укладки (м)", key: "layingWidth", type: "number" },
        { label: "Производительность (т/ч)", key: "productivity", type: "number" },
    ],
    "Бетоносмеситель": [
        { label: "Объем барабана (л)", key: "drumCapacity", type: "number" },
        { label: "Производительность (м³/ч)", key: "productivity", type: "number" },
    ],
    "Грейдер": [
        { label: "Ширина отвала (м)", key: "bladeWidth", type: "number" },
        { label: "Мощность двигателя (л.с.)", key: "enginePower", type: "number" },
    ],
    "Буровая установка": [
        { label: "Глубина бурения (м)", key: "drillDepth", type: "number" },
        { label: "Диаметр бурения (мм)", key: "drillDiameter", type: "number" },
    ],
    "Манипуляторы (КМУ)": [
        { label: "Грузоподъемность стрелы (т)", key: "craneCapacity", type: "number" },
        { label: "Длина стрелы (м)", key: "boomLength", type: "number" },
    ]
};