"use client";

import dynamic from "next/dynamic";

const RpgGrid = dynamic(() => import("./RpgGrid"), { ssr: false });

export default function Content() {
	return (
		<div className="flex items-center justify-center">
			<RpgGrid />
		</div>
	);
}
