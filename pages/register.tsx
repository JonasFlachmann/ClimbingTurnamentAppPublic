import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/registration-process");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkgreen p-4">
      <div className="bg-darkgreen rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Registrieren</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-md bg-darkgreen border border-lightgreen text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-lightgreen"
          />
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
            onClick={handleRegister}
            className="bg-light
