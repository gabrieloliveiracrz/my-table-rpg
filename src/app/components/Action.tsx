import Master from "./actions/Master";
import Player from "./actions/Player";

interface MapData {
	id: string;
	name: string;
	image: string;
	gridSize: number;
	selected: boolean;
}

interface ActionProps {
	map: MapData | null;
	onMapChange: (mapId: string) => void;
}

export default function Action({ map, onMapChange }: ActionProps) {
	return (
		<div className="flex flex-col items-center justify-items-center min-w-62 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent p-2 bg-gray-800 rounded-lg shadow-md">
			<Master map={map} onMapChange={onMapChange} />
			<Player />
		</div>
	);
}
