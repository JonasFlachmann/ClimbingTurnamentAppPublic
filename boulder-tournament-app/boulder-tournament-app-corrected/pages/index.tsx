import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl mb-6 text-accent">Boulder Tournament</h1>
      <input className="p-2 mb-2 rounded text-black" placeholder="E-Mail" />
      <input className="p-2 mb-4 rounded text-black" type="password" placeholder="Passwort" />
      <Link href="/home" className="bg-accent text-black px-4 py-2 rounded">
        Login
      </Link>
    </div>
  );
}