import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Pagination } from "swiper"; // ✅ Fix: statt "swiper/modules"

// ✅ Swiper nur Client-seitig laden
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  {
    ssr: false,
  }
);

export default function BoulderAdd() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Boulder hinzufügen</h1>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="w-full h-64"
      >
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold">Schritt 1: Boulder Name</h2>
            <input
              type="text"
              placeholder="Name eingeben"
              className="mt-4 p-2 border rounded w-full"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold">Schritt 2: Schwierigkeitsgrad</h2>
            <select className="mt-4 p-2 border rounded w-full">
              <option>Leicht</option>
              <option>Mittel</option>
              <option>Schwer</option>
            </select>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold">Schritt 3: Beschreibung</h2>
            <textarea
              placeholder="Beschreibung eingeben"
              className="mt-4 p-2 border rounded w-full"
              rows={4}
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Zurück
        </button>
        {step < 2 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Weiter
          </button>
        ) : (
          <button
            onClick={() => router.push("/home")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Fertig
          </button>
        )}
      </div>
    </div>
  );
}
