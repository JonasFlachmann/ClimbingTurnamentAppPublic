import { useRouter } from "next/router";

const cards = [
  { title: "Turnier anlegen", href: "/tournament-create", icon: "🎯" },
  { title: "Boulder hinzufügen", href: "/boulder-add", icon: "🪨" },
  { title: "Ergebnisse eintragen", href: "/results", icon: "📝" },
  { title: "Ranking", href: "/ranking", icon: "🏆" },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-darkgreen p-6">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Willkommen
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => router.push(card.href)}
            className="bg-darkgreen border border-lightgreen rounded-xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-green-800 transition"
          >
            <div className="w-16 h-16 bg-lightgreen rounded-full mb-4 flex items-center justify-center text-darkgreen font-bold text-2xl">
              {card.icon}
            </div>
            <h2 className="text-white font-semibold text-center">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
