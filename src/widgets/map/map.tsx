import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useRef } from "react";

type MapWidgetProps = {
    latitude: number;
    longitude: number;
    clientName?: string;
    containerNumber?: string;
};

export const MapWidget = ({
    latitude,
    longitude,
    clientName,
    containerNumber,
}: MapWidgetProps) => {
    const mapRef = useRef<any>(null);

    const isValidCoords =
        !isNaN(latitude) &&
        !isNaN(longitude) &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180;

    useEffect(() => {
        if (mapRef.current && isValidCoords) {
            mapRef.current.setCenter([latitude, longitude], 10, { duration: 300 });
        }
    }, [latitude, longitude]);

    if (!isValidCoords) {
        return <p className="text-red-500">Некорректные координаты</p>;
    }

    return (
        <YMaps query={{ apikey: "ВАШ_API_КЛЮЧ", lang: "ru_RU" }}>
            <Map
                defaultState={{ center: [latitude, longitude], zoom: 10 }}
                width="100%"
                height="100%"
                instanceRef={mapRef}
            >
                <Placemark
                    geometry={[latitude, longitude]}
                    properties={{
                        balloonContentHeader: clientName || "Контейнер",
                        balloonContentBody: containerNumber
                            ? `Номер: ${containerNumber}`
                            : undefined,
                    }}
                />
            </Map>
        </YMaps>
    );
};
