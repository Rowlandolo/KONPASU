# KONPASU – Offline-Prototyp 0.1

Dies ist ein **kostenloser, eigenständig lokal arbeitender App-Prototyp** für iPhone, Android und PC. **Keine KI, kein Abo, kein Backend, keine API-Schlüssel, keine Nutzerverfolgung.**

## Funktionen

- 19 vorkonfigurierte, einzeln aktivierbare Ziele; eigene Ziele; Check-in erreicht / teilweise / nicht erreicht; nachträgliche Einträge per Datum.
- **Krafttrainingsplaner** mit selbst erstellten Übungen, dauerhaften Gerätenotizen, persönlichen Trainingsplänen und Live-Satzprotokollen (kg/Wiederholungen).
- Beim Training: letzte vollständige Satzfolge derselben Übung aus vorheriger Einheit sichtbar, letzte Werte als **bearbeitbare Vorschläge**. Nur gespeicherte Sätze zählen.
- Trainingshistorie und persönliche Gewicht-Rekorde, lokale Grundstatistik und automatisch gespeichertes laufendes Training.
- Stilisierte Avatar-Vorschau mit frei wählbarer Darstellung, Gewandfarbe und optionalen Körpermaßen; Änderungshistorie.
- Offline-Coach mit kurzen statischen Hinweisen; JSON-Export und JSON-Import als lokale Sicherung.
- App-Shell durch Service Worker komplett offline zwischengespeichert; nur selbst enthaltene Dateien, **keine CDN-/API-Abhängigkeit**.

## Auf dem Windows-PC testen

1. ZIP entpacken.
2. Mit Python: `python -m http.server 8080` **im Ordner**, danach `http://localhost:8080/` öffnen. Alternativ HTML direkt öffnen (Speicherung kann bei file:// eingeschränkt sein).
3. Einmal testen: Übung `Bankdrücken` erstellen → Plan `Push` erstellen → starten → 60 kg × 8 loggen → Training abschließen. Nächstes Training zeigt die alten Werte.

## Kostenlos auf iPhone installieren

iPhone erlaubt bei fehlendem Mac und ohne Apple-Developer-Mitgliedschaft nicht einfach eine dauerhaft signierte native IPA. Der kostenlose Weg ist eine installierte Homescreen-Web-App:

1. Kostenlose GitHub-Registrierung. Neues **öffentliches Repository** `konpasu-prototyp` erstellen.
2. **Nur die entpackten Dateien** aus diesem Verzeichnis ins Wurzelverzeichnis des Repositories hochladen (`index.html`, `app.js`, `app.css`, `sw.js`, Manifest, Icons). Keine privaten Daten hochladen.
3. In GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. Die GitHub-Pages-Adresse lautet dann `https://DEIN-NUTZERNAME.github.io/konpasu-prototyp/`. Ersten Besuch mit Internet im **iPhone-Safari** machen. Öffnen, bis der Cache geladen ist.
5. Safari: Teilen → **Zum Home-Bildschirm** → **Als Web-App öffnen** aktivieren → Hinzufügen.
6. Die **installierte** KONPASU-App öffnen und testweise im Flugmodus verwenden. Die App-Dateien und Daten liegen lokal. Nach einem erstmaligen Besuch und erfolgreichem Service-Worker-Cache ist für normale Benutzung kein Server notwendig.

Die kostenlose GitHub-Pages-Seite ist **nur für die einmalige Installation und spätere App-Code-Updates** nötig. Die tägliche App-Nutzung benötigt keine Hosting-/Cloud-Verbindung. Theoretisch kann das Betriebssystem lokale Website-Daten bei Speicherdruck löschen, weshalb Backups notwendig sind.

**Wichtig:** Safari und die installierte Homescreen-Web-App können getrennte Datenspeicher verwenden. Für echte Einträge vorzugsweise ausschließlich das Homescreen-Icon öffnen. Vor Updates und regelmäßig die Exportfunktion verwenden.

## Grenzen dieser ersten Version

- Eine PWA ist keine signierte native iOS/Android-App aus dem App Store.
- Noch keine aufwendige interaktive 3D-Engine, kein 3D-Mentor, keine ausgereifte Rang-/Ausrüstungsmechanik, keine komplette Avatar-Zeitreise. Einfache 2D-Avatar-Darstellung und Änderungshistorie.
- Noch keine native Push-/Health-/Screen-Time-Anbindung, keine Cloud-Synchronisierung. Diese waren zuvor geplant, werden für die kostenlose unabhängige Version ausdrücklich zurückgestellt.
- Ziel-Check-ins für Wochenziele sind in diesem Prototyp manuelle Datumseinträge; die finale wochenbezogene Zähl- und Ranglogik fehlt noch. Keine Datenlücken als Misserfolg.
- Daten sind auf dem Gerät gespeichert, aber in dieser Web-Prototyp-Version nicht zusätzlich anwendungsspezifisch verschlüsselt. Keine echten medizinischen Geheimnisse eingeben, bevor Schutzmechanismen entwickelt sind.
- Prototyp ausschließlich auf aktuellen Geräten unter Safari/Chromium getestet; keine Garantie auf allen iOS-Versionen.

## App-Version

KONPASU 0.1, Offline-Shell `konpasu-offline-v1`. Keine externen Imports.
