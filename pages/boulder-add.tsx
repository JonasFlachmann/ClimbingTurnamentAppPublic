"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function BoulderAddPage() {
  const router = useRouter();
  const [boulderName, setBoulderName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🚧 TODO: API Call zum Speichern des Boulders
    alert("Boulder gespeichert!");
    router.push("/tournament-overview");
  };

  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Boulder hinzufügen</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bouldername */}
          <div>
            <label className="block text-sm font-medium mb-2">Bouldername</label>
            <input
              type="text"
              value={boulderName}
              onChange={(e) => setBoulderName(e.target.value)}
              placeholder="Name des Boulders"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Schwierigkeit */}
          <div>
            <label className="block text-sm font-medium mb-2">Schwierigkeit</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Bitte wählen</option>
              <option value="leicht">Leicht</option>
              <option value="mittel">Mittel</option>
              <option value="schwer">Schwer</option>
            </select>
          </div>

          {/* Beschreibung */}
          <div>
            <label className="block text-sm font-medium mb-2">Beschreibung</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Kurze Beschreibung des Boulders"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              rows={3}
            />
          </div>

          {/* Platzhalter für Fotos */}
          <div>
            <label className="block text-sm font-medium mb-3">Fotos</label>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600"
                >
                  + Foto
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
