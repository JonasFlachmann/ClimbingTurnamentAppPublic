import NavBar from "../components/NavBar";

export default function TournamentCreate() {
  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Turnier anlegen</h2>
        <input className="p-2 mb-2 text-black rounded" placeholder="Turniername" />
        <input className="p-2 mb-2 text-black rounded" placeholder="Datum" />
        <button className="bg-accent text-black px-4 py-2 rounded">Erstellen</button>
      </div>
    </div>
  );
}