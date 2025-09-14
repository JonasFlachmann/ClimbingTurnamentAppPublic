import { useRouter } from "next/router";

export default function TournamentFill() {
  const router = useRouter();

  const dummyRoutes = [
    { name: "Route A", difficulty: "Mittel" },
    { name: "Route B", difficulty: "Schwer" },
    { name: "Route C", difficulty: "Leicht" },
  ];

  const dummyParticipants = [
    { name: "Max Mustermann" },
    { name: "Anna Kletter" },
    { name: "Tom Boulder" },
  ];

  return (
    <div className="min-h-screen bg-darkgreen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Turnier befüllen
      </h1>

      {/* Formular */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-darkgreen rounded-xl shadow-lg border border-lightgreen p-6 w-full max-w-2xl flex flex-col gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Turniername"
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightgreen"
        />

        <label className="text-white">Hallenplan hochladen (Foto/PDF)</label>
        <input
          type="file"
          accept="image/*,.pdf"
          className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-lightgreen file:text-darkgreen hover:file:bg-green-500"
        />

        {/* Dummy-Routen */}
        <div className="mt-4">
          <h2 className="text-xl text-white font-semibold mb-2">
            Bereits hinzugefügte Routen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dummyRoutes.map((route, idx) => (
              <div
                key={idx}
                className="bg-darkgreen border border-lightgreen rounded-lg p-4 shadow hover:bg-green-800 transition"
              >
                <p className="text-white font-bold">{route.name}</p>
                <p className="text-gray-300">Schwierigkeit: {route.difficulty}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => alert("Route hinzufügen (noch Dummy)")}
            className="mt-4 w-full bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition transform hover:scale-105"
          >
            Route hinzufügen
          </button>
        </div>

        {/* Teilnehmer */}
        <div className="mt-6">
          <h2 className="text-xl text-white font-semibold mb-2">Teilnehmer</h2>
          <ul className="mb-4">
            {dummyParticipants.map((p, idx) => (
              <li key={idx} className="text-white">
                • {p.name}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => alert("Teilnehmer-Link generieren (noch Dummy)")}
            className="w-full bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition transform hover:scale-105"
          >
            Teilnehmer per Link einladen
          </button>
        </div>

        {/* Turnier veröffentlichen */}
        <button
          type="button"
          onClick={() => router.push("/tournament-overview")}
          className="mt-6 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition transform hover:scale-105"
        >
          Turnier veröffentlichen
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
