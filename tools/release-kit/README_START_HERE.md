# KONPASU 2.4.0 – Echte modulare 2D-Avatar-Darstellung

**Stand: 02.11.2026.** Entwicklungspaket, **nicht** auf GitHub veröffentlicht und **nicht** auf einem echten iPhone getestet. Grundlage: öffentliches Repository `Rowlandolo/KONPASU`, Hauptzweig `main`, Version `2.3.1`, zum Erstellungszeitpunkt. Der Zugriff auf einen neuen GitHub-Zweig war wegen GitHub-Berechtigungen (HTTP 403) nicht möglich.

## Ergebnis

Die bisherige große, unveränderliche Blueprint-Grafik wird durch echte Ebenen aus bereits im Projekt enthaltenen Original-SVGs ersetzt (`avatar-art-bundle.js`). Darin gibt es bereits über 200 aufeinander abgestimmte Illustrationsebenen. Die Darstellung reagiert jetzt auf:

- 3 Frisuren und 3 Haarfarben, 3 Ausdrücke und 3 Körperdarstellungen;
- 3 japanisch inspirierte Gewandfarben und 9 Hintergründe;
- 7 Begleiter mit bis zu 4 Entwicklungsformen;
- tatsächlich tragbare Belohnungsgegenstände auf ihren vorgesehenen Slots;
- Vorschau gesperrter/ruhender Belohnungen **ohne** Veränderung der Ausrüstung;
- leichte, begrenzte Körperproportions-Anpassung anhand freiwilliger Profilwerte.

Bei fehlenden Originalgrafiken wird automatisch die alte Blueprint-Darstellung als Fallback verwendet. Die vorhandene Offline-PWA wird um `avatar-composer-v24.js` erweitert.

**Zusätzlich enthalten:** Die gezielten Bugfixes von 2.3.2 (fehlende `mkButton`, `displayTier`, `KPBackgroundControls`, veraltete Belohnungsauswahl, Begleiter-Synchronisation beim Lieblingsoutfit und korrigierte Leeranzeige der Ruhmeshalle). So funktioniert dieses Paket **direkt auf 2.3.1** – du musst das ältere 2.3.2-Paket nicht vorher ausführen. Auch ein korrekt lokal eingespieltes 2.3.2 kann als Ausgangspunkt dienen.

## Datensicherheit

- **Keine Migration** von Profil, Zielen, Trainingsdaten, Historie, Inventar, Belohnungen, IndexedDB oder localStorage.
- Änderungen sind auf 6 vorhandene **Quellcode-Dateien** und genau **eine neue JS-Datei** begrenzt.
- Der Patcher prüft erwartete Quellcode-Anker vollständig **vor** dem ersten Schreiben.
- `--check` ändert gar nichts. Beim Anwenden wird ein Code-Backup **außerhalb** des Repo-Verzeichnisses angelegt. Bei Schreibfehlern werden die ursprünglichen Quelldateien wiederhergestellt.
- Das Code-Backup ersetzt **kein persönliches JSON-Backup aus der App**. Deshalb: Vor dem Upload KONPASU → Einstellungen → JSON-Backup exportieren, die Exportdatei sichern und die Homescreen-App nicht löschen.

## Installation ohne Mac (Windows)

1. **In der derzeit installierten KONPASU-App ein JSON-Backup exportieren** und außerhalb der App sichern.
2. Den aktuellen Hauptzweig von https://github.com/Rowlandolo/KONPASU über **Code → Download ZIP** herunterladen und entpacken. Die Quellcode-Dateien (`index.html`, `avatar2d.js`, `app.js` usw.) müssen im angegebenen Ordner liegen.
3. Dieses Paket ebenfalls entpacken.
4. PowerShell im Ordner dieses Pakets öffnen und zuerst **nur prüfen**:

   ```powershell
   py apply_240.py "C:\Pfad\zu\KONPASU-main" --check
   ```

5. Bei `OK` den Patch anwenden:

   ```powershell
   py apply_240.py "C:\Pfad\zu\KONPASU-main"
   ```

6. Automatische Tests ausführen:

   ```powershell
   py tests\test_patch_240.py
   node --test tests\test_avatar_composer_v24.cjs
   ```

   Erforderlich: Python 3 und Node.js (beliebige aktuelle LTS-Version).

7. Aus dem **gepatchten KONPASU-main-Ordner**, nicht aus diesem Paket, diese 7 Quellcode-Dateien bei GitHub aktualisieren:

   - `app.js`
   - `avatar2d.js`
   - `avatar-composer-v24.js` **(neu)**
   - `app.css`
   - `index.html`
   - `sw.js`
   - `version.json`

   Achte darauf, dass die Dateien im **Stammverzeichnis** des Repositorys liegen. Hochladen der ZIP-Datei selbst reicht nicht; GitHub entpackt sie nicht automatisch. **Keine privaten JSON-Daten mit hochladen.** Empfohlen: den neuen Code erst in einem separaten Branch als Pull Request ausprobieren statt direkt auf `main` zu veröffentlichen.

8. Nach einem erfolgreichen GitHub-Pages-Deployment: https://rowlandolo.github.io/KONPASU/version.json öffnen. Die Version muss `2.4.0` anzeigen. Dann die App online öffnen, den Avatar testen, offline testen und erst danach weiter ausrollen.

## Manuelle Abnahme auf iPhone und Desktop

- [ ] Avatar erscheint statt Blueprint als echte Figur auf einem Hintergrund.
- [ ] Frisur, Haarfarbe, Geschlecht-Darstellung, Mimik und Gewandfarbe ändern sichtbar die Figur.
- [ ] Szene von Garten zu Wald ändern; die gewählte Szene bleibt nach Neustart erhalten.
- [ ] Begleiter wechseln; das richtige Tier erscheint sichtbar.
- [ ] Ein **tragbares** Belohnungsstück im Inventar anlegen: es erscheint am Körper; nach Neustart weiterhin sichtbar.
- [ ] Ein **gesperrtes** Stück nur ansehen: Vorschau erscheint, nach Schließen ist es nicht angelegt.
- [ ] „Beste verfügbare Ausrüstung“ verwendet keine inzwischen gesperrten Altteile.
- [ ] Outfit speichern und wieder anlegen: Begleiter und Ausrüstung bleiben konsistent.
- [ ] Ruhmeshalle ohne und mit Auszeichnungen; keine irreführende Leeranzeige.
- [ ] Kleine Avatar-Vorschau auf Startseite erscheint ohne Abschneiden oder Überlagerung.
- [ ] Ohne Internet (Flugmodus, App neu öffnen) sind Avatar und Ziele weiterhin nutzbar.
- [ ] Ziele, Trainingspläne, Trainingshistorie, Kalender, Notizen und vorhandene Belohnungen vollständig erhalten.

## Tests und Grenzen

**13 automatisierte Tests bestanden** (7 JavaScript-Render-Tests, 6 Python-Patch-/Datenschutztests). JavaScript-Syntax wurde mit Node geprüft. Die GitHub-Code-Anker der Version 2.3.1 wurden unabhängig über die verbundene GitHub-Leseintegration überprüft. Die vollständige Patch-Anwendung auf eine hier lokal vorliegende Kopie des echten Repositories war nicht möglich (kein externer Netzwerkzugang in der Testumgebung). Deshalb sind Live-App-, iPhone-/Safari-, Profil- und Offline-End-to-End-Abnahmen **ausstehend**.

**Grenze der Darstellung:** Dies ist ein auf bestehenden Original-SVGs basierender, hochwertiger funktionaler Layer-Renderer. Es ist noch kein finaler handgezeichneter Premium-Avatar mit komplexer Einzelteil-Verformung, vollständigem Skelett oder Animation. Das kann in 2.4.1/2.5 darauf aufbauen. Das neue System setzt auf dieselben bereits gespeicherten Werte; es gibt **keinen neuen Pflicht-Check-in**.

## Rollback

Bei Problemen die sechs Original-Quelldateien aus `KONPASU-main-CODE-BACKUP-BEFORE-240-...` wiederherstellen und den neuen Verweis auf `avatar-composer-v24.js` aus der alten `index.html`/`sw.js` durch die Backup-Dateien ersetzen lassen. Die neue JS-Datei kann nach dem Rollback gelöscht werden, die persönlichen App-Daten **nicht** löschen und keine Browserdaten/Service-Worker-Speicher manuell zurücksetzen.
