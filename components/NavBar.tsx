import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-4 p-4 bg-primary text-accent">
      <Link href="/home">Home</Link>
      <Link href="/tournament-create">Turnier</Link>
      <Link href="/boulder-add">Boulder</Link>
      <Link href="/results">Ergebnisse</Link>
      <Link href="/ranking">Ranking</Link>
    </nav>
  );
}
