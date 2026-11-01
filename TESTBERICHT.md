# KONPASU 2.2 – Funktions- und Regressionstest

**Testumgebung:** Chromium headless, lokale HTML-/JS-Inline-Ausführung (da der Testbrowser lokale HTTP-Adressen blockiert), Viewports 320, 390, 430 und 768 Pixel. Die statischen App-Assets und der Cache-Manifest-Inhalt wurden gesondert gegen vorhandene Dateien geprüft.

## Bestandene Abläufe

- App ohne JavaScript-Laufzeitfehler initialisiert.
- Navigation zum Trainingsbereich funktioniert.
- 97 vorbereitete Standardübungen sind beim Start vorhanden.
- Katalog zeigt die Auswahl kompakt und ohne Bilder in den Zeilen.
- Suche findet passende Übungen; Suchbegriff bleibt nach Detailansicht und Rückkehr erhalten.
- Detailansicht zeigt Übungs- und Muskelillustration sowie Beschreibung.
- Aus dem Katalog lässt sich direkt ein neuer Trainingsplan anlegen und eine Übung zuordnen.
- Eigene Übung mit freier Kategorie erstellt und in der Bibliothek gespeichert.
- Diese eigene Übung lässt sich aus dem Katalog einem Plan zuordnen.
- Vor dem ersten gespeicherten Satz bleibt `data.draft === null`.
- Übungen im Plan lassen sich in der Reihenfolge ändern.
- Erster gespeicherter Satz erzeugt die laufende Trainingseinheit; ein Beispiel mit 42,5 kg × 8 Wiederholungen wurde geprüft.
- Abschließen erzeugt eine gespeicherte Einheit und leert den Entwurf.
- Trainingskalender ist danach erreichbar.
- Kein horizontales Seitenüberlaufen bei 320, 390, 430 und 768 Pixeln in den geprüften Testabläufen.
- Alle geprüften Abläufe liefen ohne Browser-JavaScript-Fehler durch.
- Die relevanten JavaScript-Dateien bestehen die Syntaxprüfung.

## Noch nicht vollständig getestet

- iPhone-Homescreen-App: Update, Flugmodus, Hintergrundspeicherung und echte langfristige Nutzung.
- Große Datenbestände nach mehreren Monaten und umfangreiche JSON-Importe.
- Sämtliche Kombinationen aus Supersatz, Resttimer, RPE, Training mit Unterbrechung, Wiederaufnahme und Archivierung.
- Vollständige fachliche Technikabnahme aller 97 Übungsbeschreibungen.
- Übungsbilder sind bewusst schematisch, keine fotorealistischen Schritt-für-Schritt-Darstellungen.

**Freigabestatus:** Funktional ausgebauter und automatisiert getesteter Trainingsprototyp. Kein Anspruch auf garantierte Fehlerfreiheit.
