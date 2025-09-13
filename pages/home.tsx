import Link from "next/link";

const cards = [
  { title: "Turnier anlegen", img: "/placeholder.png", href: "#" },
  { title: "Boulder hinzufügen", img: "/placeholder.png", href: "#" },
  { title: "Ergebnisse eintragen", img: "/placeholder.png", href: "#" },
  { title: "Ranking", img: "/placeholder.png", href: "#" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-darkgreen p-4">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">Willkommen</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link key={index} href={card.href}>
            <div className="bg-darkgreen border border-lightgreen rounded-lg shadow-lg p-4 flex flex-col items-center hover:bg-green-800 transition cursor-pointer">
              <img src={card.img} alt={card.title} className="w-20 h-20 mb-4" />
              <h2 className="text-white font-semibold">{card.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
