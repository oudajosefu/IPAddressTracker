import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';

interface Props {
	center: [number, number];
}

const Map = ({ center }: Props) => {
	return (
		<MapContainer
			className='z-0 h-full aspect-auto'
			center={center}
			zoom={18}
			zoomControl={false}
			scrollWheelZoom={false}
			dragging={false}>
			<ChangeView center={center} />
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker
				position={center}
				icon={
					new L.Icon({
						iconUrl: '/static/images/icon-location.svg',
					})
				}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};

const ChangeView = ({ center }: { center: [number, number] }) => {
	const map = useMap();
	map.setView(center);
	return null;
};

export default Map;
