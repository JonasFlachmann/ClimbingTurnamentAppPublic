import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkgreen p-4">
      <div className="bg-darkgreen rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
          <button
            type="button"
            onClick={() => router.push("/home")}
            className="bg-lightgreen text-darkgreen font-bold py-3 rounded-md hover:bg-green-500 transition transform hover:scale-105"
          >
            Anmelden
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/register")}
            className="text-lightgreen hover:text-green-300 font-medium"
          >
            Registrieren
          </button>
        </div>
      </div>
    </div>
  );
}
