# KONPASU 1.5 – Zielmodule und Training (Offline-PWA)

**Dies ist ein kostenloser, offlinefähiger Web-App-Prototyp, keine native iOS/Android-App und keine garantierte fehlerfreie Endversion.**

## Update auf dem iPhone

1. In der **bisherigen KONPASU-App** unter Einstellungen ein **JSON-Backup exportieren** und die Datei in „Dateien“ oder einem anderen sicheren Ort aufbewahren. Nicht die App löschen.
2. Das ZIP auf deinem PC entpacken.
3. Die **elf Laufzeitdateien** in die **Wurzel** deines vorhandenen GitHub-Repositories `Rowlandolo/KONPASU` hochladen bzw. gleichnamige Dateien überschreiben:
   `index.html`, `app.css`, `app.js`, `features-v1.js`, `goal-modules.js`, `training-library.js`, **`core-v15.js` (NEU)**, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`.
4. Warten, bis GitHub Pages die Änderungen bereitstellt. In Safari auf `https://rowlandolo.github.io/KONPASU/` **online** neu laden, danach die bestehende Homescreen-App neu starten. Gegebenenfalls noch einmal neu laden, damit der neue Offline-Cache aktiviert wird.
5. Im Flugmodus einen Testeintrag erfassen, App schließen und erneut öffnen. Danach normal online testen. Bei Problemen nichts löschen, sondern **Backup behalten**.

## Trainingsplaner

- 97 lokal enthaltene Übungsvorlagen mit deutscher/englischer Suche, Muskelgruppen und schematischen SVG-Illustrationen. Eigene Übungen samt Bild-Upload, Gerätenotizen und Gerätevarianten.
- Eigene Trainingspläne; jetzt **Satzanzahl, Wiederholungsbereich, Pausenzeit und optionale Supersatz-Gruppenkennung je Übung** definieren.
- Während des Trainings: die Vorgabe anzeigen, die gespeicherten Sätze vom letzten Mal anzeigen, Gewicht/Wiederholungen, Satztyp, RPE, Satznotiz und **Dauer in Sekunden** speichern. Für zeitbasierte Sätze sind Wiederholungen optional.
- Pausentimer, vorhandene Historie, Monatskalender, persönliche Rekorde und Satz-Korrekturen bleiben erhalten.
- In einem bereits abgeschlossenen Training können jetzt weitere Übungen und Sätze ergänzt und bearbeitet werden; gespeicherte Satzdauern werden angezeigt.
- **Aufwärmsätze werden nicht als vollständiges Workout gezählt.**
- Trainingspläne und einzelne Sätze funktionieren ohne Internet.

## 19 Zielmodule

- Die bestehenden **19 Kategorien**, die Auswahl mehrerer Zielmodi, unterschiedliche Einheiten, Favoriten, 1-Tipp-Bestätigungen, Stoppuhr und detaillierte manuelle Einträge bleiben erhalten.
- Neue Anzeige von Zeitraum und Datenabdeckung; Status „unbekannt“ bei fehlenden Daten.
- **Schlaf**: Mehrfach erfasste Nächte werden nicht summiert; für eine Nacht zählt der zuletzt eingegebene gültige Hauptschlaf-Eintrag (Nickerchen ausgenommen).
- **Zucker/Alkohol**: Tage ohne Konsum müssen ausdrücklich bestätigt sein; fehlende Eingaben beweisen keine Abstinenz.
- **Gaming/Bildschirmzeit/Zucker/Alkohol mit Höchstwerten**: Der gesamte Zeitraum kann bewusst als vollständig protokolliert bestätigt werden. Ein kompletter Null-Zeitraum darf dann als 0 gewertet werden; unvollständige Angaben reichen nicht für einen Erfolg.
- **Ernährung**: Zusätzlich eine kleine lokale Liste von 28 Lebensmitteln mit groben Nährwert-Schätzwerten pro 100 g. Auswahl + Portion füllt **optional** Kalorien, Protein, Kohlenhydrate und Fett in das Formular, ohne ungefragt Daten zu speichern. *Keine medizinisch exakte Ernährungsdatenbank, kein Barcodescanner.*
- Verläufe zeigen die Zielerfüllung ohne fehlende Tage zu Nullen umzuwandeln.

## Datenschutz und Einschränkungen

Keine externen APIs, Tracker, Cloud-Datenbank oder Abokosten. Der GitHub-Server ist nur für die Erstinstallation und Updates erforderlich. Daten liegen lokal auf dem Gerät; **regelmäßige JSON-Backups sind unerlässlich**, insbesondere vor Updates.

Nicht enthalten: native Health- und Screen-Time-Schnittstellen, automatische Geräteerfassung, umfassende aktuelle Lebensmittel-/Barcode-Datenbank, vollständiges wissenschaftliches Analyse-Labor, Hochleistungs-3D-Avatar, echte KI oder Cloud-Synchronisierung. Vollständiger Offline-Homescreen-Neustart wurde in dieser Umgebung nicht auf einem realen iPhone getestet.

## Technische Hinweise

Die Datenbank bleibt `KONPASU-LOCAL-2` mit demselben State-Format; zusätzliche optionale Felder (Satzdauer, Planvorgaben) werden ohne Zurücksetzen ergänzt. Aus alten Plänen ohne Satzvorgaben entstehen keine fiktiven historischen Trainingsdaten. Die neuen Planvorgaben gelten nur für neue Trainingsstarts.
