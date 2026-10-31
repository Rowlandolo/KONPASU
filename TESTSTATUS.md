# KONPASU 1.4 – Teststand

## Erfolgreich mit Chromium-Browser-Simulation

- Laden der Oberfläche ohne JavaScript-Laufzeitausnahme.
- Katalog mit 97 Einträgen, Filter nach Muskelgruppen, DE/EN-Suche.
- Eigenständige lokale SVG-Vektorgrafiken; große Bildvorschau.
- Katalogübung in eigene Sammlung aufnehmen, duplizierte Aufnahme vermeiden.
- Eigene Übung erstellen mit Name, Muskelgruppe, Gerät und Notiz.
- Foto hochladen, im Browser verkleinern, bei der Übung speichern, später wieder anzeigen.
- Plan mit zwei Übungen erstellen, Training starten, Gewicht und Wiederholungen speichern, Training beenden.
- Monatskalender mit Trainingstag markieren, Tag öffnen, Einheit öffnen, Monatswechsel.
- 47 messbare Zielmodi (über alle 19 Zielvorlagen), sachgerechte Einheiten, Grenzen-/Alkoholbestätigungen, Favoriten und Timer.
- 18 spezialisierte Detailformulare (Krafttraining hat den separaten Trainingsplaner).
- Migrationstest 0.4-Datenformat, Serienberechnung und Ausrüstungsberechtigungen.

## Nicht vollständig automatisiert / offen

- Persistenz via IndexedDB auf einer echten HTTPS-Origin: Die Browser-Testumgebung sperrt lokale URLs. Die getesteten Interaktionen liefen mit einem simulierten DOM; vollständige Reload-/Offline-Abnahme bleibt offen.
- PWA-Cache, iPhone-Safari- und Android-Homescreen-Neustart, Fotoauswahl mit verschiedenen echten iPhone-Formaten (z.B. HEIC) und Speichergrenzen.
- Vollständige professionelle Kalorien-/Barcode-Datenbank sowie native Screen-Time- und Apple-Health-Funktionen.
- Vollständige Ende-zu-Ende-Prüfung sämtlicher Kombinationen aller Funktionen.

**Urteil:** umfangreiches, funktionsfähiges Testupdate, noch keine fehlerfrei garantierte Endversion.
