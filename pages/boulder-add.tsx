"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Swiper nur Client-seitig laden
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

import "swiper/css";
import "swiper/css/pagination";

export default function BoulderAddPage() {
  const router = useRouter();

  const [routeName, setRouteName] = useState("");
  const [gripColor, setGripColor] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [hallLabel, setHallLabel] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🚧 TODO: API-Call einbauen
    router.push("/tournament-fill");
  };

  const tagGroups = [
    ["Überhang", "Vertikale", "Platte", "Verschneidung"],
    ["Crimps", "Leisten", "Sloper", "Jugs", "Pocketholes"],
    ["Kraft", "Balance", "Dynamisch", "Technisch"],
  ];

  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Neue Route hinzufügen</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Routename */}
          <div>
            <label className="block text-sm font-medium mb-2">Routenname</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Name der Route"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Fotos */}
          <div>
            <label className="block text-sm font-medium mb-3">Fotos</label>
            <Swiper spaceBetween={12} slidesPerView={1}>
              {[1, 2, 3].map((i) => (
                <SwiperSlide key={i}>
                  <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
                    + Foto {i}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Grifffarbe */}
          <div>
            <label className="block text-sm font-medium mb-2">Grifffarbe</label>
            <input
              type="text"
              value={gripColor}
              onChange={(e) => setGripColor(e.target.value)}
              placeholder="z. B. Blau"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Schwierigkeit laut Halle */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Schwierigkeit (laut Halle)
            </label>
            <input
              type="text"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              placeholder="z. B. 6a"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Bezeichnung laut Halle */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Bezeichnung (laut Halle)
            </label>
            <input
              type="text"
              value={hallLabel}
              onChange={(e) => setHallLabel(e.target.value)}
              placeholder="z. B. #42"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Ort / Wand */}
          <div>
            <label className="block text-sm font-medium mb-2">Ort / Wand</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="z. B. Sektor A"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-3">Tags</label>
            <div className="space-y-2">
              {tagGroups.map((group, gi) => (
                <div key={gi} className="flex flex-wrap gap-2">
                  {group.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2 py-1 rounded-md text-xs ${
                        tags.includes(tag)
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Beschreibung */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Beschreibung
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Kurze Beschreibung der Route"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              rows={3}
            />
          </div>

          {/* Bestätigungsbutton */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Route festlegen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
