# ALLEZ-CLIMBING – Development Rules ✅

Dies sind die verbindlichen Entwicklungsregeln für die Weiterentwicklung der App **ALLEZ-CLIMBING**.  
Alle Arbeiten am Code orientieren sich an diesen Vorgaben.  

---

## 1. Code-Struktur
- **Keine Löschungen**  
  - Funktionen, Buttons, Textfelder oder andere Elemente werden **nie entfernt**, außer mit expliziter Anweisung.  
- **Volle Dateien liefern**  
  - Neue Code-Updates werden **immer als komplette Datei/page** geliefert, sodass direkt Copy & Paste möglich ist.  
- **Aktueller Codestand**  
  - Der aktuelle Codestand wird von mir gespeichert und berücksichtigt.  
  - Keine eigenen Codeänderungen durch den Product Engineer – der Codestand bleibt konsistent.  

---

## 2. UI-Design
- **Zentrale Verwaltung**  
  - Alle UI-Elemente (Buttons, Inputs, Layouts, Farben, Schriftarten) werden **zentral definiert**.  
  - Änderungen erfolgen **nur an einer Stelle**, um Konsistenz sicherzustellen.  

---

## 3. Tests & Qualitätssicherung
- **Online-Tests**  
  - Alle Anpassungen werden ausschließlich über das Online-Deployment (Vercel) geprüft.  
- **Fehlerprüfung**  
  - Der gesamte Code wird auf **Fehler** (Syntax, Logik, Imports etc.) überprüft.  
  - Vergleich mit der vorherigen Version auf **fehlende oder doppelte Elemente**.  
- **Änderungsübersicht**  
  - Jede Änderung wird zusammengefasst und auf **korrekte Umsetzung** geprüft.  
- **User-Flow & Navigation**  
  - Der **User-Flow** wird kontrolliert.  
  - Links werden auf **Vollständigkeit und Richtigkeit** überprüft.  

---

## 4. Checkliste bei jedem Update
Vor jedem Merge/Update werden folgende Punkte abgehakt:  
- [ ] Keine Löschungen ohne Anweisung  
- [ ] Ganze Datei geliefert  
- [ ] Aktueller Codestand berücksichtigt  
- [ ] UI-Elemente zentral verwaltet  
- [ ] Fehlerprüfung abgeschlossen  
- [ ] Änderungen zusammengefasst und geprüft  
- [ ] User-Flow und Links überprüft  

---

## 5. Template für Änderungszusammenfassungen

Jede Änderung wird in folgender Struktur dokumentiert:  

### 🔄 Änderungsübersicht (Datum: YYYY-MM-DD)
**Betroffene Datei(en):**  
- `pages/example.tsx`  
- `components/ui/Button.tsx`  

**Änderungen:**  
- [Neu] Neue Komponente `<TournamentCard />` hinzugefügt  
- [Geändert] Button-Styles zentral angepasst (`Button.tsx`)  
- [Fix] Falschen Link zu `/profile` korrigiert  

**Prüfungen:**  
- ✅ Keine Funktionen/Elemente gelöscht  
- ✅ Ganze Datei geliefert  
- ✅ Fehlerprüfung durchgeführt (keine Fehler gefunden)  
- ✅ User-Flow geprüft (Navigation vollständig, Links korrekt)  

---

📌 Mit dieser Datei stellen wir sicher, dass die Entwicklung von **ALLEZ-CLIMBING** konsistent, nachvollziehbar und fehlerfrei erfolgt.  
