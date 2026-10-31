# KONPASU 1.4 – Offline-Funktionsupdate

Dieses Update baut auf KONPASU 1.2/1.3 auf und erweitert den spezialisierten Zielbereich sowie den Krafttrainingsplaner. Es handelt sich weiterhin um eine installierbare Web-App (PWA) und **nicht** um eine native iOS-/Android-App.

## Installation / Update

1. Auf dem iPhone in der bisherigen App **JSON-Backup exportieren und außerhalb der App speichern**.
2. Alle **zehn Laufzeitdateien** aus diesem ZIP ins **Hauptverzeichnis** deines vorhandenen GitHub-Repositories `Rowlandolo/KONPASU` hochladen und bei gleichen Namen überschreiben:
   - `index.html`, `app.css`, `app.js`, `features-v1.js`, **`goal-modules.js`**, **`training-library.js`**, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`.
3. GitHub Pages nach dem Deployment online in Safari öffnen; bei Bedarf neu laden und die vorhandene Homescreen-App erneut starten. **Die Homescreen-App nicht löschen**, solange die Daten nicht extern gesichert sind.
4. Training → **Übungskatalog** öffnen. Einmal auf `+` tippen, um eine Übung in den eigenen Bestand aufzunehmen. Daraus Trainingspläne zusammenstellen oder die Übung direkt zum laufenden Workout hinzufügen.
5. Training → **Kalender** zeigt dokumentierte Einheiten pro Monat; einen Tag antippen, um die Übungen aufzurufen.

## Neu in 1.4

- 97 eigenständig kuratierte Übungen; nach Brust, Rücken, Beinen, Schultern, Bizeps, Trizeps, Core, Ganzkörper und Cardio filterbar.
- Suchen nach deutschen oder englischen Namen.
- Schematische **selbst erstellte SVG-Illustrationen** für Übungstypen. Das sind keine detailgetreuen Fotos und keine Technik-Anleitung. Sie sind vollständig offline und werden nicht von Fitness Point Pro kopiert.
- Eigene Übungen mit Muskelgruppe, Übungsvariante, dauerhaftem Gerätenotiz-Feld und optionalem persönlichen **Foto-Upload**. Fotos werden lokal verkleinert, in der Datenbank gespeichert und in JSON-Backups aufgenommen.
- Bilder in der Übungsliste, während des Trainings und als vergrößerbare Vorschau im Katalog.
- Monatskalender mit markierten Trainingstagen, gespeicherten Trainings und Monatswechsel.
- Vorherige Satzwerte, einzelne Sätze, Planbearbeitung, Satzarten, Supersätze und History aus den bisherigen Versionen bleiben erhalten.
- Die Zielmodule 1.3 mit 47 messbaren Zielmodi und 19 Vorlagen sind integriert.

## Datenschutz und Grenzen

Die App lädt keinerlei Trainingsbilder, JavaScript-Bibliotheken oder Nutzerdaten von fremden Servern. GitHub Pages stellt nur einmalig die App-Dateien bereit. Trainings- und Fotodaten werden lokal gespeichert und sind nicht automatisch gegen Browserdatenverlust gesichert. **Regelmäßige JSON-Backups sind unerlässlich**. Die Offline-Installation und der Updateprozess müssen noch auf einem realen iPhone und Android-Gerät abgenommen werden; automatisierte Tests können keine Fehlerfreiheit garantieren.

**Bewusst noch nicht vollständig:** echter 3D-Avatar, native Gesundheitsschnittstellen, vollständige Profi-Ernährungsdatenbank/Barcode-Erkennung, Cloud-Synchronisation, echte KI, statistisches Forschungs-Labor. Diese Fähigkeiten gehören zum weiterführenden Gesamtprojekt.
