"use client";

import { useEffect, useState } from "react";
import Action from "./Action";
import Battle from "./Battle";
import BattleLog from "./BattleLog";

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

export default function Content() {
	const [map, setMap] = useState<MapData | null>(null);
	const [positions, setPositions] = useState<Position[]>([]);
	const [characters, setCharacters] = useState<Character[]>([]);

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

	const handleMapChange = async (mapId: string) => {
		const res = await fetch("/db.json");
		const data = await res.json();
		const newMap = data.maps.find((m: MapData) => m.id === mapId);
		setMap(newMap);
		setPositions(data.positions.filter((p: Position) => p.mapId === mapId));
	};

	useEffect(() => {
		console.log("Map changed:", map);
	}, [map]);

	return (
		<div className="flex justify-between gap-2 p-2 w-full my-auto">
			<Action map={map} onMapChange={handleMapChange} />
			<Battle map={map} positions={positions} characters={characters} />
			<BattleLog />
		</div>
	);
}
