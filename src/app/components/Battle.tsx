import dynamic from "next/dynamic";
import CombatActions from "./battle/CombatActions";
import CombatOrder from "./battle/CombatOrder";
const RpgGrid = dynamic(() => import("./battle/RpgGrid"), { ssr: false });

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

export default function Battle({
	map,
	positions,
	characters,
}: { map: MapData | null; positions: Position[]; characters: Character[] }) {
	return (
		<div className="flex flex-col items-center gap-4 max-w-4xl mx-auto p-2 w-full h-auto">
			<CombatOrder />
			<RpgGrid map={map} positions={positions} characters={characters} />
			<CombatActions />
		</div>
	);
}
