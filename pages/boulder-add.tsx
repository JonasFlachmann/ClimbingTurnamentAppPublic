import { useRouter } from "next/router";

export default function BoulderAdd() {
  const router = useRouter();

  const handleSubmit = () => {
    alert("Route wurde festgelegt (noch Dummy).");
  };

  return (
    <div className="min-h-screen bg-darkgreen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Neue Boulderroute hinzufügen
      </h1>

      {/* Formular */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-darkgreen rounded-xl shadow-lg border border-lightgreen p-6 w-full max-w-2xl flex flex-col gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Routenname"
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightgreen"
        />

        <input
          type="file"
          accept="image/*"
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-lightgreen file:text-darkgreen hover:file:bg-green-500"
        />

        <input
          type="text"
          placeholder="Griffarbe"
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightgreen"
        />

        <select
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white focus:outline-none focus:ring-2 focus:ring-lightgreen"
        >
          <option value="">Schwierigkeit wählen</option>
          <option value="leicht">Leicht</option>
          <option value="mittel">Mittel</option>
          <option value="schwer">Schwer</option>
          <option value="profi">Profi</option>
        </select>

        <input
          type="text"
          placeholder="Ort / Wand"
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightgreen"
        />

        <textarea
          placeholder="Beschreibung"
          rows={4}
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightgreen"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition transform hover:scale-105"
        >
          Route festlegen
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <button
          onClick={() => router.push("/home")}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition"
        >
          Home
        </button>
        <button
          onClick={() => alert("Zur Karte (noch Dummy)")}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition"
        >
          Karte
        </button>
        <button
          onClick={() => router.push("/tournament-create")}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition"
        >
          Turniere
        </button>
      </div>
    </div>
  );
}
