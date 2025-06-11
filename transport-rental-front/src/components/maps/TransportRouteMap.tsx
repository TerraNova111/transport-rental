import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';
import { AddressInfo } from "../../types/Address";


interface TransportRouteMapProps {
    onLoadingAddressSelect: (address: AddressInfo) => void;
    onUnloadingAddressSelect: (address: AddressInfo) => void;
    loadingAddress?: AddressInfo | null;
    unloadingAddress?: AddressInfo | null;
}

const mapContainerStyle = {
    width: '100%',
    height: '600px'
};

const center = {
    lat: 43.2220,
    lng: 76.8512
};

const mapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
};

const libraries: Library[] = ['places'];

export const TransportRouteMap: React.FC<TransportRouteMapProps> = ({
                                                                        onLoadingAddressSelect,
                                                                        onUnloadingAddressSelect,
                                                                        loadingAddress,
                                                                        unloadingAddress
                                                                    }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries: libraries
    });

    const [activeMarker, setActiveMarker] = useState<'loading' | 'unloading' | null>(null);
    const [selectedInfoWindow, setSelectedInfoWindow] = useState<'loading' | 'unloading' | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);

    const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        if (!event.latLng || !activeMarker) return;

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        if (!geocoderRef.current) {
            geocoderRef.current = new google.maps.Geocoder();
        }

        geocoderRef.current.geocode(
            { location: { lat, lng } },
            (results, status) => {
                if (status === 'OK' && results?.[0]) {
                    const address: AddressInfo = {
                        latitude: lat,
                        longitude: lng,
                        formattedAddress: results[0].formatted_address
                    };

                    if (activeMarker === 'loading') {
                        onLoadingAddressSelect(address);
                    } else {
                        onUnloadingAddressSelect(address);
                    }

                    setActiveMarker(null); // Сбрасываем активный режим
                }
            }
        );
    }, [activeMarker, onLoadingAddressSelect, onUnloadingAddressSelect]);

    if (!isLoaded) {
        return (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Загрузка карты...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Панель управления */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">Выберите точки маршрута</h4>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveMarker(activeMarker === 'loading' ? null : 'loading')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            activeMarker === 'loading'
                                ? 'bg-green-500 text-white shadow-lg'
                                : 'bg-white border-2 border-green-500 text-green-600 hover:bg-green-50'
                        }`}
                    >
                        {activeMarker === 'loading' ? '✓ Отменить' : '📍 Точка загрузки'}
                    </button>

                    <button
                        onClick={() => setActiveMarker(activeMarker === 'unloading' ? null : 'unloading')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            activeMarker === 'unloading'
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-white border-2 border-red-500 text-red-600 hover:bg-red-50'
                        }`}
                    >
                        {activeMarker === 'unloading' ? '✓ Отменить' : '📍 Точка выгрузки'}
                    </button>
                </div>

                {activeMarker && (
                    <p className="text-sm text-gray-600 mt-2">
                        🖱️ Кликните на карте, чтобы поставить метку для{' '}
                        {activeMarker === 'loading' ? 'загрузки' : 'выгрузки'}
                    </p>
                )}
            </div>

            {/* Карта */}
            <div className="rounded-lg overflow-hidden border-2 border-gray-200">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={11}
                    options={mapOptions}
                    onClick={handleMapClick}
                    onLoad={() => {
                        geocoderRef.current = new google.maps.Geocoder();
                    }}
                >
                    {/* Метка загрузки */}
                    {loadingAddress && (
                        <>
                            <Marker
                                position={{
                                    lat: loadingAddress.latitude,
                                    lng: loadingAddress.longitude
                                }}
                                icon={{
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 12,
                                    fillColor: '#10B981',
                                    fillOpacity: 1,
                                    strokeColor: '#ffffff',
                                    strokeWeight: 3
                                }}
                                onClick={() => setSelectedInfoWindow('loading')}
                            />
                            {selectedInfoWindow === 'loading' && (
                                <InfoWindow
                                    position={{
                                        lat: loadingAddress.latitude,
                                        lng: loadingAddress.longitude
                                    }}
                                    onCloseClick={() => setSelectedInfoWindow(null)}
                                >
                                    <div className="p-2">
                                        <h3 className="font-semibold text-green-700 mb-1">📦 Точка загрузки</h3>
                                        <p className="text-sm text-gray-600">{loadingAddress.formattedAddress}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </>
                    )}

                    {/* Метка выгрузки */}
                    {unloadingAddress && (
                        <>
                            <Marker
                                position={{
                                    lat: unloadingAddress.latitude,
                                    lng: unloadingAddress.longitude
                                }}
                                icon={{
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 12,
                                    fillColor: '#EF4444',
                                    fillOpacity: 1,
                                    strokeColor: '#ffffff',
                                    strokeWeight: 3
                                }}
                                onClick={() => setSelectedInfoWindow('unloading')}
                            />
                            {selectedInfoWindow === 'unloading' && (
                                <InfoWindow
                                    position={{
                                        lat: unloadingAddress.latitude,
                                        lng: unloadingAddress.longitude
                                    }}
                                    onCloseClick={() => setSelectedInfoWindow(null)}
                                >
                                    <div className="p-2">
                                        <h3 className="font-semibold text-red-700 mb-1">🎯 Точка выгрузки</h3>
                                        <p className="text-sm text-gray-600">{unloadingAddress.formattedAddress}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </>
                    )}
                </GoogleMap>
            </div>

            {/* Информация о выбранных точках */}
            {(loadingAddress || unloadingAddress) && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-3">📋 Выбранный маршрут</h4>
                    <div className="space-y-2">
                        {loadingAddress && (
                            <div className="flex items-start gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                                <div className="text-sm">
                                    <span className="font-medium text-gray-800">Загрузка: </span>
                                    <span className="text-gray-600">{loadingAddress.formattedAddress}</span>
                                </div>
                            </div>
                        )}

                        {unloadingAddress && (
                            <div className="flex items-start gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                                <div className="text-sm">
                                    <span className="font-medium text-gray-800">Выгрузка: </span>
                                    <span className="text-gray-600">{unloadingAddress.formattedAddress}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransportRouteMap;