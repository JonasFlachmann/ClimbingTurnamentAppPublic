import Link from "next/link";

export default function Ranking() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkgreen p-4">
      <h1 className="text-3xl text-white mb-6">Ranking</h1>
      <Link href="/home">
        <button className="bg-lightgreen text-darkgreen font-bold py-3 px-6 rounded-md hover:bg-green-400 transition">
          Zurück zur Startseite
        </button>
      </Link>
    </div>
  );
}
