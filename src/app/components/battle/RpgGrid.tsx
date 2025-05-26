// components/RpgGrid.tsx
"use client";

import { useEffect, useState } from "react";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";

const GRID_SIZE = 50;
const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;

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

export default function RpgGrid({
	map,
	positions,
	characters,
}: { map: MapData | null; positions: Position[]; characters: Character[] }) {
	const [image] = useImage(map?.image || "");
	const [imageDims, setImageDims] = useState<{
		width: number;
		height: number;
	} | null>(null);

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

	return (
		<div className="flex ">
			{map && image && imageDims && (
				<>
					{/* <h2 className="text-lg font-bold mb-2">{map.name}</h2> */}
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
