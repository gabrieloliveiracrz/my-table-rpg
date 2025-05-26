import Content from "../components/Content";
import Header from "../components/Header";

export default function Table() {
	return (
		<main className="flex flex-col box-border min-h-screen overflow-hidden gap-2 max-h-screen">
			<Header />
			<Content />
		</main>
	);
}
