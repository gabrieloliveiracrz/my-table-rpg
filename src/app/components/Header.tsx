import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<header className="bg-gray-800 text-white p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between gap-2">
					<Image
						src="/avatar/garrosh.png"
						alt="Avatar do personagem"
						width={76}
						height={76}
						className="rounded-full"
					/>
					<div className="flex flex-col items-center">
						<h1 className="text-2xl font-bold ">Merute</h1>
						<span className="text-sm font-semibold">Mestre da Campanha</span>
					</div>
				</div>

				<div className="flex items-center gap-10 justify-around">
					<Link href="/table" className="text-gray-300 hover:text-white">
						Mesa
					</Link>

					<Link href="/character" className="text-gray-300 hover:text-white">
						Ficha do Personagem
					</Link>

					<Link href="/inventory" className="text-gray-300 hover:text-white">
						Inventário
					</Link>
				</div>

				<div>
					<h2 className="text-2xl font-bold">Coração de Rubi</h2>
				</div>
			</div>
		</header>
	);
}
