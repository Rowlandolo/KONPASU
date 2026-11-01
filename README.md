# KONPASU 2.0 · Botanical Anime Edition

## Update auf deinem iPhone (GitHub Pages)

1. Öffne zuerst deine **bereits installierte** KONPASU-App und exportiere ein **JSON-Backup**. Speichere es außerhalb von KONPASU, z. B. in Dateien/iCloud Drive.
2. Entpacke **KONPASU-2.0-Offline-Design-Update.zip** auf deinem Windows-PC.
3. Öffne dein bestehendes Repository `Rowlandolo/KONPASU` bei GitHub und lade **alle 14 App-Laufzeitdateien aus dem ZIP-Hauptordner** hoch. Vorhandene Dateien ersetzen; neu dazu kommt besonders `premium-art-bundle.js`. Die Dokumentationsdateien und Screenshots sind optional.
4. Öffne anschließend `https://rowlandolo.github.io/KONPASU/` online in Safari und lade die Seite gegebenenfalls erneut. Warte, bis alle App-Dateien geladen sind, bevor du den Flugmodus testest.
5. Starte die **vorhandene** KONPASU-Homescreen-App neu. Bitte **nicht löschen**, weil lokale Daten sonst verlorengehen können.
6. Prüfe Trainingseinträge, Pläne, Ziel-Daten und Inventar. Teste zuletzt den Flugmodus und den JSON-Export.

## Neues Design und Training

- Hochwertige original erstellte Anime-Belohnungsillustrationen von KONPASU als Artbook (8 Bildtafeln).
- 95 einzelne, aus den Illustrationsvorlagen zugeschnittene und grafisch gerahmte **Inventar-Vorschaubilder**, nach Ziel und Freischaltstufe zugeordnet.
- Weiterhin **separat austauschbare modulare SVG-Ausrüstungsebenen** am tatsächlich verwendeten 2D-Avatar. Die neuen Artbook-Grafiken sind **keine automatisch passend zum Körper ausgerichteten Sprite-Layer**.
- Neue sorgfältig gestaltete Startseite mit Anime-Cover; das Cover ist eine Illustration und nicht die dynamisch berechnete Ausrüstungskombination.
- Alle 97 Standardübungen werden beim ersten Start automatisch in die Übungsbibliothek aufgenommen (ohne historische Trainings oder selbst erstellte Übungen zu entfernen).
- Eigene Übungen: vorhandene Muskelgruppe oder frei benannte eigene Kategorie; Foto, Gerätenotizen und Gerätebezeichnung bleiben erhalten.
- Trainingspläne: Suche nach Übung und Muskelgruppe, kompakte Listen ohne Vorschaubilder; Satz-/Pausen-/Supersatzfelder werden erst nach Auswahl sichtbar.
- Während eines Trainings: kompakter Such- und Hinzufügen-Dialog ohne permanent sichtbare Grafiken.
- Bilder erscheinen erst nach Tippen auf **Ansehen**.
- Kontrastverbesserungen an Text, Cards, Eingabefeldern, Buttons, Kalender und Inventar.

## Was im Update enthalten ist

Laufzeitdateien: `index.html`, `app.css`, `app.js`, `features-v1.js`, `goal-modules.js`, `training-library.js`, `core-v15.js`, `avatar-art-bundle.js`, `avatar2d.js`, `premium-art-bundle.js`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`.

Die Bildtafeln und 95 Vorschaubilder liegen komplett in **einer** Datei `premium-art-bundle.js`, deshalb werden für die GitHub-Pages-Installation **keine 104 Einzelbilder** benötigt.

## Hinweise

- Dies ist weiterhin eine kostenlose, lokal speichernde Offline-PWA, keine native iOS-/Android-App.
- Im Browser automatisiert getestete Funktionen sind keine Garantie für Fehlerfreiheit auf echten Geräten.
- Private Trainings- und Ziel-Daten werden im lokalen Browser-Speicher abgelegt; ohne Backup können sie nach Deinstallation/Löschen von Website-Daten verlorengehen.
- Der 2D-Avatar ist technisch modular und benutzbar, aber die austauschbaren SVG-Körper- und Kleidungsillustrationen sind weiterhin stilisierter als die hochwertigen Anime-Artbook-Vorlagen.
