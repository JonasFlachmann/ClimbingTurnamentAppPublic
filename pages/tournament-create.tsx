import { useRouter } from "next/router";

export default function TournamentCreate() {
  const router = useRouter();

  const dummyTournaments = [
    { name: "Boulder Cup 2025", location: "München" },
    { name: "Climbing Masters", location: "Berlin" },
    { name: "Urban Rock Challenge", location: "Hamburg" },
  ];

  return (
    <div className="min-h-screen bg-darkgreen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Turniere verwalten
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-2xl">
        <button
          onClick={() => alert("Neues Turnier erstellen (noch Dummy)")}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition transform hover:scale-105"
        >
          Neues Turnier erstellen
        </button>
        <button
          onClick={() => alert("Turnier duplizieren (noch Dummy)")}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition transform hover:scale-105"
        >
          Bestehendes Turnier duplizieren
        </button>
      </div>

      {/* Turnierliste */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        {dummyTournaments.map((tournament, idx) => (
          <div
            key={idx}
            className="bg-darkgreen border border-lightgreen rounded-xl shadow-lg p-6 flex flex-col hover:bg-green-800 cursor-pointer transition transform hover:scale-105"
          >
            <h2 className="text-white font-semibold text-lg mb-2">
              {tournament.name}
            </h2>
            <p className="text-gray-300">📍 {tournament.location}</p>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <button
          onClick={() => router.push("/home")}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition"
        >
          Zurück zum Homescreen
        </button>
        <button
          onClick={() => alert('Zur Karte (noch Dummy)')}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition"
        >
          Karte
        </button>
        <button
          onClick={() => alert('Zu bestehenden Turnieren (noch Dummy)')}
          className="flex-1 bg-lightgreen text-darkgreen font-bold py-3 rounded-lg hover:bg-green-500 transition"
        >
          Bestehende Turniere
        </button>
      </div>
    </div>
  );
}
