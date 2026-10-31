# KONPASU 1.6 – Modulares 2D-Avatar- und Belohnungssystem

## Was neu ist

- Ursprünglicher, offlinefähiger 2D-Samurai in **leichter Dreiviertelperspektive**. Kein 3D.
- 16 übersichtliche Anpassungsgruppen, die die früher geplanten internen Ausrüstungskategorien bündeln.
- Echte **separat gezeichnete, transparente SVG-Layer** mit identischem 480×600-Koordinatensystem. Alle Ebenen sind zusätzlich als eine gebündelte JS-Datei (`avatar-art-bundle.js`) enthalten, damit der GitHub-Upload mit wenigen Dateien funktioniert.
- **19 Themenkollektionen × 5 Stufen = 95** wechselbare Belohnungs-Grafiklayer, plus je eine passende Inventar-Illustration.
- Weitere **76 Serien-Effektlayer** (19 Kollektionen × 4 echte Tages- oder Wochenserien-Meilensteine).
- Sieben Begleiterarten mit jeweils vier gezeichneten Evolutionsformen; vier Starterbegleiter, weitere Arten werden durch bestehende Zielregeln freigeschaltet.
- Favoriten-Outfits speichern / anwenden / löschen, Einzelteile ausrüsten / ablegen, beste verfügbare Ausrüstung und Grundausstattung.
- Hintergrund, Haarfarbe, Frisur, Mimik und Geschlechtsdarstellung verändern.
- Historische Avatar-Einstellungen und Rangentwicklung über Datumsauswahl, Embleme für Serien und Zielmeilensteine.
- Bestehende Datenbank und alle Trainings- und Zielmodule aus 1.5 bleiben erhalten.
- Botanisch-ruhiges **Creme-Salbei-Design** für die App-Oberfläche.

## Installieren / aktualisieren

**ZUERST**: In der bestehenden KONPASU-App unter *Einstellungen* ein vollständiges JSON-Backup exportieren und außerhalb der App sichern. Die bestehende Homescreen-App bitte **nicht löschen**.

1. Das Paket `KONPASU-1.6-2D-Avatar-Offline-Update.zip` auf deinem Windows-PC entpacken.
2. Die **13 Dateien im ZIP-Hauptverzeichnis** (ohne Dokumentation) in das Hauptverzeichnis deines bestehenden GitHub-Repositories `Rowlandolo/KONPASU` hochladen bzw. ersetzen. Die **neuen Dateien** `avatar2d.js` und `avatar-art-bundle.js` müssen unbedingt mit dabei sein.
3. Änderungen committen. Die bisherige GitHub-Pages-Einstellung `main` und `/(root)` bleibt bestehen.
4. Nach Veröffentlichung `https://rowlandolo.github.io/KONPASU/` mit Internetverbindung in Safari öffnen, aktualisieren und KONPASU dann vom bisherigen iPhone-Homescreen starten.
5. **Avatar** öffnen. Inventar, Gestaltung, Begleiter, Outfits, Serien, Ruhmeshalle und Zeitreise ausprobieren.
6. App schließen, Flugmodus aktivieren, App erneut öffnen und prüfen, ob der Avatar und die restlichen Kernfunktionen verfügbar sind.

> GitHub Pages liefert nur die statischen Dateien für die erste Installation und Updates. KONPASU speichert weiterhin lokal; der neue Avatar und alle Grafiken funktionieren anschließend ohne KI-API, Benutzerkonto oder Cloud-Datenbank. Das browserbasierte Speicherrisiko bleibt; regelmäßiges JSON-Backup ist wichtig.

## Beschränkungen dieses Releases

- Die Grafiken sind funktionale, **stilisiert gezeichnete Vektor-Assets** und noch nicht das finale aufwendig handillustrierte Premium-Anime-Artwork.
- Die Körpermaße steuern eine **dezente 2D-Proportions-Skalierung**, keine medizinisch oder anatomisch exakte Körperrekonstruktion.
- Die Zeitreise kann frühere gespeicherte Look-Zustände und historischen Rang darstellen; eine vollständig animierte lückenlose Video-Zeitreise wurde nicht umgesetzt.
- Für eine einzelne Zielserie wird eine spezielle zusätzliche Aura dargestellt; die üblichen Ausrüstungsslots bleiben gleichzeitig nutzbar.
- Externe KI, native App-Store-Builds, Cloud-Sync und native iPhone-Systemintegrationen sind weiterhin nicht enthalten; die Kern-App bleibt lokal.
- Eine vollständige Offline-Abnahme auf einem realen iPhone konnte hier nicht vorgenommen werden. Die durchgeführten Tests sind Browser- und Datenlogiktests.

## Originalgrafiken

Die **346 ursprünglichen SVG-Dateien** sind als separates Quellenpaket `KONPASU-1.6-2D-SVG-Quellgrafiken.zip` enthalten. Dieses Paket ist **nicht** für die iPhone-Installation erforderlich; alle Grafiken sind in `avatar-art-bundle.js` eingebunden. Es kann für spätere Änderungen oder hochwertige Überzeichnungen verwendet werden.
