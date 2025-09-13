import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Willkommen!</h2>
        <p>Hier siehst du deine Turniere oder kannst neue erstellen.</p>
      </div>
    </div>
  );
}