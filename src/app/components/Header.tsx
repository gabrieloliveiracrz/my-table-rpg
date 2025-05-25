import Image from "next/image";

export default function Header() {
	return (
		<header className="bg-gray-800 text-white p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between gap-2">
					<Image
						src="/avatar/garrosh.png"
						alt="Avatar do personagem"
						width={102}
						height={102}
						className="rounded-full"
					/>
					<div className="flex flex-col items-center">
						<h1 className="text-2xl font-bold ">Merute</h1>
						<span className="text-sm font-semibold">Mestre da Campanha</span>
					</div>
				</div>

				<div className="flex items-center gap-10 justify-around">
					<h2 className="text-2xl">Mesa</h2>
					<h2 className="text-2xl">Ficha</h2>
					<h2 className="text-2xl">Inventario</h2>
				</div>

				<div>
					<h2 className="text-2xl font-bold">Coração de Rubi</h2>
				</div>
			</div>
		</header>
	);
}
