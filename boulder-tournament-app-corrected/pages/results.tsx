import NavBar from "../components/NavBar";

export default function Results() {
  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Ergebnisse eintragen</h2>
        <button className="bg-accent text-black px-4 py-2 rounded mb-2">Flash</button>
        <button className="bg-accent text-black px-4 py-2 rounded mb-2">Zone</button>
        <button className="bg-accent text-black px-4 py-2 rounded mb-2">Nicht geschafft</button>
      </div>
    </div>
  );
}