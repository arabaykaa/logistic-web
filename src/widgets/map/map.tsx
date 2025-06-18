import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export const MapWidget = () => {
    return (
        <YMaps query={{ apikey: 'ВАШ_API_КЛЮЧ', lang: 'ru_RU' }}>
            <Map
                defaultState={{ center: [42.8746, 74.5698], zoom: 9 }}
                width="100%"
                height="100%"
            >
                <Placemark geometry={[42.8746, 74.5698]} />
            </Map>
        </YMaps>
    )
}
