import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
	return (
		<main className="flex flex-col justify-between min-h-screen ">
			<Header />
			<Content />
			<Footer />
		</main>
	);
}
