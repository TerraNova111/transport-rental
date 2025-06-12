import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { AddressInfo } from "../../types/Address";
import { Library } from '@googlemaps/js-api-loader';

interface SelectAddressMapProps {
    onSelect: (address: AddressInfo) => void;
}

const containerStyle = {
    width: '100%',
    height: '500px'
};

const defaultCenter = {
    lat: 43.2220,
    lng: 76.8512
};

const libraries: Library[] = ['places'];

const SelectAddressMap: React.FC<SelectAddressMapProps> = ({ onSelect }) => {
    const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries: libraries
    });

    const getAddressInfo = useCallback(async (lat: number, lng: number): Promise<AddressInfo> => {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode(
                { location: { lat, lng } },
                (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const result = results[0];
                        const addressComponents = result.address_components;

                        let street = '';
                        let city = '';
                        let state = '';
                        let zipCode = '';
                        let country = '';

                        addressComponents.forEach(component => {
                            const types = component.types;

                            if (types.includes('street_number')) {
                                street = component.long_name + ' ' + street;
                            }
                            if (types.includes('route')) {
                                street += component.long_name;
                            }
                            if (types.includes('locality') || types.includes('administrative_area_level_2')) {
                                city = component.long_name;
                            }
                            if (types.includes('administrative_area_level_1')) {
                                state = component.long_name;
                            }
                            if (types.includes('postal_code')) {
                                zipCode = component.long_name;
                            }
                            if (types.includes('country')) {
                                country = component.long_name;
                            }
                        });

                        resolve({
                            latitude: lat,
                            longitude: lng,
                            street: street.trim() || undefined,
                            city: city || undefined,
                            state: state || undefined,
                            zipCode: zipCode || undefined,
                            country: country || undefined,
                            formattedAddress: result.formatted_address
                        });
                    } else {
                        reject(new Error('Не удалось получить информацию об адресе'));
                    }
                }
            );
        });
    }, []);

    // Обработчик клика по карте
    const onMapClick = useCallback(async (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            setSelectedPosition({ lat, lng });
            setIsLoading(true);

            try {
                const addressInfo = await getAddressInfo(lat, lng);
                onSelect(addressInfo);
            } catch (error) {
                console.error('Ошибка при получении адреса:', error);
                // Если не удалось получить адрес, отправляем только координаты
                onSelect({
                    latitude: lat,
                    longitude: lng
                });
            } finally {
                setIsLoading(false);
            }
        }
    }, [onSelect, getAddressInfo]);

    if (!isLoaded) {
        return <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            Загрузка карты...
        </div>;
    }

    return (
        <div className="space-y-2">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedPosition || defaultCenter}
                zoom={selectedPosition ? 15 : 11}
                onClick={onMapClick}
            >
                {selectedPosition && (
                    <Marker position={selectedPosition} />
                )}
            </GoogleMap>

            {isLoading && (
                <p className="text-sm text-blue-600">Получение информации об адресе...</p>
            )}

            {selectedPosition && !isLoading && (
                <p className="text-sm text-green-600">
                    ✓ Адрес выбран
                </p>
            )}
        </div>
    );
};

export default SelectAddressMap;