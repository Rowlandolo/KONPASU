# KONPASU 0.3 — Offline-App-Prototyp (Deutsch / English)

**Kostenlos. Keine API-Schlüssel, keine externen Bibliotheken, keine Abos.**

Dieses Repository enthält die installierbare KONPASU-Web-App für iPhone-Safari und andere moderne Browser. Eine Verbindung wird **einmal** benötigt, um die Dateien von GitHub Pages zu laden und lokal zu cachen. Danach funktionieren die eingebauten App-Funktionen offline. Es ist **noch keine native iOS-/Android-App**.

## Bestehende Installation aktualisieren (ohne absichtlichen Datenverlust)

1. Die **bereits installierte KONPASU-App** auf dem iPhone öffnen. Unter **Einstellungen** zuerst **JSON-Backup** exportieren und außerhalb der App sichern.
2. Dieses ZIP **entpacken**. Die folgenden Dateien in das **Hauptverzeichnis desselben GitHub-Repositories** hochladen und vorhandene Dateien ersetzen:
   `index.html`, `app.js`, `app.css`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` (README optional).
3. GitHub Pages veröffentlicht die neuen Dateien. Die bekannte Adresse `https://rowlandolo.github.io/KONPASU/` in Safari mit Internetverbindung öffnen und aktualisieren. Falls noch 0.1 angezeigt wird, die Seite nach einem erneuten Öffnen noch einmal neu laden; der neue Service Worker muss aktiviert werden.
4. Bestehende Homescreen-App wieder öffnen. Unter **Einstellungen** sollte **KONPASU 0.3** stehen. **Weder Website-Daten löschen noch die vorhandene App deinstallieren**, wenn du noch kein Backup hast.
5. Unter **Language / Sprache** oder rechts oben zwischen **DE** und **EN** umschalten. Im Flugmodus die Funktionen testen. Die Einstellungen werden lokal gespeichert.

Die lokale Datenbank verwendet unverändert `KONPASU-LOCAL-2` und migriert vorhandene v0.1/v0.2-Daten. Dies wurde auf Code- und Browser-Testebene geprüft; dennoch vor jedem Update ein Backup erstellen.

## Jetzt in v0.3 verfügbar

- **19 Zielvorlagen** plus beliebige eigene Ziele; flexible Tages-/Wochenziele, Min-/Max-Werte, rückdatierbare Check-ins (Erreicht / Teilweise / Nicht erreicht), optionale konkrete Messwerte.
- **Trainingstagebuch:** Übungen und Gerätevarianten selbst anlegen; Gerätenotizen, Trainingspläne, einzelne Sätze mit kg und Wiederholungen, frühere Werte anzeigen, Vorwerte nur nach expliziter Bestätigung übernehmen; Trainingsprotokolle und Sätze nachträglich bearbeiten; Pausentimer; CSV-Export.
- **Sprache:** Deutsch / Englisch; Umschaltung auf jeder Hauptseite, gespeicherte Auswahl. Eigene Übungsnamen und Freitext bleiben im Original.
- **Analysen:** Erfüllung und Datenvollständigkeit getrennt, Zeitfilter, dokumentierte Messwerte, Trainingsbestwerte und explorative paarweise Korrelationen, sofern genügend vergleichbare Wochen existieren. Keine kausalen Aussagen.
- **Offline-Coach:** kurze regelbasierte Hinweise; einstellbarer Ton, freiwillige Reflexionen, A/B-Strategie-Experimente als persönliche Planungshilfe.
- **Samurai-Avatar, Version 1:** stilisierte 2D-Darstellung mit Geschlechtsdarstellung, Farben, Begleiterwahl, Körpermaßen, sichtbaren ausgewählten Ausrüstungselementen; Belohnungspfade, historische Embleme und gespeicherte Avatar-Einstellungen nach Datum.
- **Datenschutz:** IndexedDB lokal auf dem Gerät; keine Analyse-/Tracking-Skripte, Cloud oder KI-Server; JSON-Backup und Wiederherstellung sowie Trainings-CSV.

## Noch NICHT realisiert – kein Versprechen einer vollständigen Endversion

Das ist ein **funktionsfähiger Kernprototyp**, aber nicht die vollständige App aus unserer Planung: noch keine hochwertige modulare **3D-Anime-Engine**, keine komplette 30-Slot-3D-Rüstung, keine grafischen evolvierenden 3D-Begleiter, keine native Screen-Time-/HealthKit-Anbindung, keine echte KI, keine echte mehrgerätige Cloud-Synchronisierung oder Benutzerkonten. Die A/B-Experimente sind erst als Erfassung vorhanden, nicht als vollständige randomisierte N-of-1-Auswertungsengine. Eine dauerhaft native iOS-/Android-App erfordert eine gesonderte Build- und Veröffentlichungsphase.

**Browserdaten können gelöscht werden. Regelmäßig Backup exportieren.**

## Entwicklerhinweise

Keine Build-Tools nötig. Für Browser-Tests lokal einen HTTP-Server starten, z. B. `python -m http.server`. Für Homescreen-Installation und Service-Worker-Speicherung ist HTTPS erforderlich (GitHub Pages erfüllt das). Kein CDN und keine Fremdskripte; statische Assets werden in `sw.js` offline gecacht.

## Tests

Im automatisierten Chromium-Browser-Interaktionstest geprüft: 19 Vorlagen; Zielanlage und Statusänderung; Messwert; Übung und Plan; Training mit Satz; Vorwerte mit expliziter Bestätigung; Satzbearbeitung; Pausentimer; Avatarformular; Analytics; Reflexionen und Strategie-Experiment; Download eines JSON-Backups; Sprachwechsel DE/EN. Bei diesem Ablauf wurden keine JavaScript-Laufzeitfehler beobachtet. Noch nicht auf einem echten iPhone getestet und keine Garantie für vollständige Fehlerfreiheit.
