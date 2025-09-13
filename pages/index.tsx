import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-darkgreen p-4">
      <div className="bg-darkgreen rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lightgreen"
          />
          <input
            type="password"
            placeholder="Passwort"
            className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lightgreen"
          />
          {/* Navigation direkt auf Home-Seite */}
          <Link href="/Home">
            <button
              type="button"
              className="bg-lightgreen text-darkgreen font-bold py-3 rounded-md hover:bg-green-400 transition"
            >
              Anmelden
            </button>
          </Link>
        </form>
        <div className="mt-4 text-center">
          <Link href="/Register">
            <button className="text-lightgreen hover:text-green-300 font-medium">
              Registrieren
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
