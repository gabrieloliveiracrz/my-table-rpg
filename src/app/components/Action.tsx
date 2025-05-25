export function Action() {
	const [map, setMap] = useState<MapData | null>(null);
	const [positions, setPositions] = useState<Position[]>([]);

	const handleMapChange = async (mapId: string) => {
		const res = await fetch("/db.json");
		const data = await res.json();
		const newMap = data.maps.find((m: MapData) => m.id === mapId);
		setMap(newMap);
		setPositions(data.positions.filter((p: Position) => p.mapId === mapId));
	};

	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold text-gray-100">Ação do Mestre</h1>
				<div className="mb-4">
					<label htmlFor="map-select" className="mr-2 font-semibold">
						Selecionar mapa:
					</label>
					<select
						value={map?.id || ""}
						onChange={(e) => handleMapChange(e.target.value)}
						className="border p-1"
						id="map-select"
					>
						<option value="map1">Ruínas Antigas</option>
						<option value="map2">Floresta Sombria</option>
						<option value="map3">Caverna de Gelo</option>
					</select>
				</div>
			</div>
		</div>
	);
}
