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

export default function Master({ map, onMapChange }: ActionProps) {
	return (
		<div className="">
			<h1 className="text-2xl font-bold text-gray-100">Ação do Mestre</h1>
			<div className="flex flex-col items-center justify-between p-2">
				<label htmlFor="map-select" className="font-semibold">
					Selecionar mapa:
				</label>
				<select
					value={map?.id || ""}
					onChange={(e) => onMapChange(e.target.value)}
					className="border border-gray-300 rounded-md p-2 bg-gray-700 text-gray-100 focus:shadow-lg"
					id="map-select"
				>
					<option value="map1">Ruínas Antigas</option>
					<option value="map2">Floresta Sombria</option>
					<option value="map3">Caverna de Gelo</option>
					<option value="map4">Casa do Dragão</option>
				</select>
			</div>
		</div>
	);
}
