import { useRouter } from "next/router";

export default function RegistrationProcess() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkgreen p-4">
      <div className="bg-darkgreen rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Registrierung
        </h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Voller Name"
            className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lightgreen"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lightgreen"
          />
          <input
            type="text"
            placeholder="Land"
            className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lightgreen"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-lightgreen text-darkgreen font-bold py-3 rounded-md hover:bg-green-400 transition"
          >
            Registrierung abschließen
          </button>
        </form>
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
