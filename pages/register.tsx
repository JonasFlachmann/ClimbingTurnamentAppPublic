import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkgreen p-4">
      <div className="bg-darkgreen rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Registrieren
        </h1>
        <p className="text-gray-300 mb-4 text-center">
          Bitte vervollständige deine Registrierung.
        </p>
        <button
          onClick={() => router.push("/registration-process")}
          className="w-full bg-lightgreen text-darkgreen font-bold py-3 rounded-md hover:bg-green-500 transition"
        >
          Weiter zur Registrierung
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-lightgreen hover:text-green-300 font-medium"
          >
            Zurück zum Login
          </button>
        </div>
      </div>
    </div>
  );
}
