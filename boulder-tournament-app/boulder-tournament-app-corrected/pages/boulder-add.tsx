import NavBar from "../components/NavBar";

export default function BoulderAdd() {
  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Boulder hinzufügen</h2>
        <input className="p-2 mb-2 text-black rounded" placeholder="Boulder Name" />
        <button className="bg-accent text-black px-4 py-2 rounded">Foto auswählen</button>
      </div>
    </div>
  );
}