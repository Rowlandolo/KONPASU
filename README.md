# KONPASU 2.2 – Training Studio

Das ist das Update des bestehenden KONPASU-Offline-PWA-Projekts. Ziele, bisherige Trainings, Belohnungssystem und Avatar werden durch dieses Update **nicht absichtlich zurückgesetzt**. Es nutzt weiterhin dieselbe lokale Datenbank.

## Installation

1. **Vor dem Update in deiner bisherigen KONPASU-App ein JSON-Backup speichern und extern sichern.**
2. `KONPASU-2.2-Trainingsstudio-Update.zip` entpacken.
3. Sämtliche Laufzeitdateien aus der ZIP direkt ins **Hauptverzeichnis** des bestehenden GitHub-Repositories `Rowlandolo/KONPASU` hochladen, bestehende Dateien ersetzen. Die neue Datei **`training-v22.js` unbedingt hinzufügen**; nicht nur die `index.html` hochladen.
4. Nach der Veröffentlichung `https://rowlandolo.github.io/KONPASU/` online in Safari öffnen und aktualisieren. Danach die bestehende Homescreen-App öffnen und die neue Version kontrollieren.
5. **Die bisherige Homescreen-App nicht löschen**; auf iOS sind die lokalen App-Daten sonst unter Umständen weg. Falls eine Migration nicht funktioniert, dein JSON-Backup nutzen.

## Das ist neu

### Übungskatalog
- 97 vorhandene Standardübungen automatisch in der lokalen Übungsbibliothek; zusätzlich alle selbst angelegten Übungen.
- Übersichtliche, bildfreie Liste mit Suchfeld und Muskelgruppen-/Kategorieauswahl.
- Übung antippen: eigenständige Beschreibung, primäre und unterstützende Muskelgruppen, Bewegungsablauf und offline verfügbare **schematische** Übungs-/Muskelillustration.
- Rückweg zum Katalog mit gespeicherter Suche.
- Aus der Liste oder Detailansicht direkt zu einem vorhandenen oder neuen Trainingsplan hinzufügen, ohne den Katalog zu verlassen.
- Eigene Übung mit Name, Gerät, Foto und eigener Kategorie; sie ist automatisch im Katalog vorhanden.

### Planübersicht und Workout
- Ein Plan wird beim Öffnen **nicht** automatisch gestartet.
- Reihenfolge der Übungen ändern, Übung entfernen, Übungen direkt über die eingebaute Katalogauswahl hinzufügen.
- Geplante Sätze, Wiederholungen, Pausen und Supersatzkennzeichnungen festlegen.
- Erst wenn ein echter Satz gespeichert wird, entsteht ein laufendes Training.
- Jeder Satz mit kg, Wiederholungen oder Dauer, optional Satzart, RPE und Notiz.
- Belegbare Satzwerte und historische Trainings bleiben in der lokalen Datenbank; abgeschlossene Trainings werden im Kalender angezeigt.
- Alte freie laufende Trainingseinheiten bleiben über die bisherige Oberfläche zugänglich.

## Grenzen

Die Übungsillustrationen sind **eigene schematische SVG-Zeichnungen**, keine anatomisch geprüften Bildfolgen oder individuellen Coaching-Anleitungen. Die Anleitungstexte werden je Übungsart differenziert und für häufige Übungen zusätzlich spezifisch angepasst. Für komplexe Übungen sollte die Technik mit einer qualifizierten Person geprüft werden.

Die neue Version wurde in einem Chromium-Browser mit Testskripten auf mehreren mobilen Viewports getestet. Ein vollständiger Installations-, Service-Worker- und Neustarttest auf einem echten iPhone **ist noch nicht erfolgt**. Die Tests ersetzen keine vollständige Freigabe.

## Technischer Aufbau

Alle Dateien liegen in einem Verzeichnis. Keine CDN-Abhängigkeiten, kein Account erforderlich. `training-v22.js` überschreibt nur die Trainingsansicht und ergänzt lokal gespeicherte Daten, ohne das bestehende Trainingsschema auszutauschen. Der Service Worker verwendet den Cache-Namen `konpasu-offline-v220` und enthält die für die App nötigen Assets.
