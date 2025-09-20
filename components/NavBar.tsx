import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-4 p-4 bg-primary text-accent items-center">
      <Link href="/home">Home</Link>
      <Link href="/tournament-create">Turnier</Link>
      <Link href="/boulder-add">Boulder</Link>
      <Link href="/results">Ergebnisse</Link>
      <Link href="/ranking">Ranking</Link>

      {/* Neuer User-Flow Button */}
      <Link
        href="/user-flow"
        className="ml-auto rounded-full w-10 h-10 flex items-center justify-center bg-accent text-primary font-bold shadow-md"
      >
        UF
      </Link>
    </nav>
  );
}
