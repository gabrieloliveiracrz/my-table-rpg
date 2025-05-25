// components/RpgGrid.tsx
"use client";

import { useEffect, useState } from "react";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";

const GRID_SIZE = 50;
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 768;

interface Character {
	id: string;
	name: string;
	color: string;
}

interface Position {
	characterId: string;
	mapId: string;
	x: number;
	y: number;
}

interface MapData {
	id: string;
	name: string;
	image: string;
	gridSize: number;
	selected: boolean;
}

export default function RpgGrid() {
	const [map, setMap] = useState<MapData | null>(null);
	const [characters, setCharacters] = useState<Character[]>([]);
	const [positions, setPositions] = useState<Position[]>([]);
	const [image] = useImage(map?.image || "");
	const [imageDims, setImageDims] = useState<{
		width: number;
		height: number;
	} | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/db.json");
			const data = await res.json();

			const selectedMap = data.maps.find((m: MapData) => m.selected);
			setMap(selectedMap);
			setCharacters(data.characters);
			setPositions(
				data.positions.filter((p: Position) => p.mapId === selectedMap.id),
			);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (image) {
			let width = image.width;
			let height = image.height;

			// Scale image to fit within MAX_WIDTH and MAX_HEIGHT
			const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);
			width = width * scale;
			height = height * scale;

			setImageDims({ width, height });
		}
	}, [image]);

	const cols = imageDims ? Math.ceil(imageDims.width / GRID_SIZE) : 0;
	const rows = imageDims ? Math.ceil(imageDims.height / GRID_SIZE) : 0;

	const handleMapChange = async (mapId: string) => {
		const res = await fetch("/db.json");
		const data = await res.json();
		const newMap = data.maps.find((m: MapData) => m.id === mapId);
		setMap(newMap);
		setPositions(data.positions.filter((p: Position) => p.mapId === mapId));
	};

	return (
		<div>
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

			{map && image && imageDims && (
				<>
					<h2 className="text-lg font-bold mb-2">{map.name}</h2>
					<Stage width={imageDims.width} height={imageDims.height}>
						<Layer>
							<KonvaImage
								image={image}
								width={imageDims.width}
								height={imageDims.height}
							/>
							{[...Array(rows)].map((_, row) =>
								[...Array(cols)].map((_, col) => {
									const key = `${row}-${col}`;
									return (
										<Rect
											key={key}
											x={col * GRID_SIZE}
											y={row * GRID_SIZE}
											width={GRID_SIZE}
											height={GRID_SIZE}
											stroke="rgba(255,255,255,0.2)"
										/>
									);
								}),
							)}
							{positions.map((pos) => {
								const char = characters.find((c) => c.id === pos.characterId);
								if (!char) return null;
								return (
									<Rect
										key={char.id}
										x={pos.x * GRID_SIZE + GRID_SIZE / 4}
										y={pos.y * GRID_SIZE + GRID_SIZE / 4}
										width={GRID_SIZE / 2}
										height={GRID_SIZE / 2}
										fill={char.color}
										cornerRadius={6}
										draggable
									/>
								);
							})}
						</Layer>
					</Stage>
				</>
			)}
		</div>
	);
}
