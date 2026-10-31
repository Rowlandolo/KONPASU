# KONPASU 1.6 – Prüfbericht

## Tests (automatisiert)

- `node --check`: `app.js`, `features-v1.js`, `goal-modules.js`, `training-library.js`, `core-v15.js`, `avatar-art-bundle.js`, `avatar2d.js`, `sw.js`.
- Vollständige XML-Prüfung aller **346 SVG-Dateien**.
- Browser-Tastenfolgen / Zustandswechsel auf mobilem Viewport: Avatar sichtbar, Inventar, 2D-Grafik ohne defekte Bilder, Geschlechtsdarstellung, Frisur, Hintergrund, ausgewählte freigeschaltete Gegenstände, Outfit speichern/abnehmen/wiederherstellen, Begleiter, historische Datumsauswahl, Englisch-Umschaltung.
- Freischalt-/Serienregeln: 38 bestätigte Tage, 30-Tage-Emblem bleibt bei belegtem Bruch; Spezialeffekt wird beim belegten Bruch ausgeblendet; bei Datenlücke kein rückwirkend behaupteter Misserfolg.
- Regression aus der bestehenden Version 1.5: 97 Übungen, Planvorgaben, neue Sätze (kg/Wdh./Dauer), Trainingskalender, bearbeitbare abgeschlossene Einheiten, Schlafdauer und Nährwert-Schätzhilfe, Obergrenzen und Aufwärmsätze.

## Was die Tests nicht belegen

- Keinen iOS-Safari-/Homescreen-Offlinetest auf echter Hardware in dieser Umgebung.
- Keine vollautomatische Testabdeckung jedes Bedienpfads; keine Garantie auf Fehlerfreiheit.
- Keine freie, geometrisch korrekte Anpassung beliebiger SVG-Kleidungsstücke an jede mögliche Körperproportion.
- Keine externen KI-, Cloud- oder native iOS/Android-Funktionen.

## Datenbestand

Die bestehenden Schlüssel in der lokalen Datenbank bleiben unverändert. Neue Avatar-Optionen werden unter `profile.avatar2d` abgelegt. Bestehende Backup- und Trainingsdaten werden nicht absichtlich überschrieben. Trotzdem vor Installation ein JSON-Backup exportieren.
