# KONPASU 2.3.1 – Update-Reparatur

## Wichtigste Fehlerursachen
- Version 1.8 und frühere Service Worker liefern `index.html` und Skripte aus dem Cache. Daher erscheint trotz neuer GitHub-Dateien weiterhin die alte Oberfläche.
- Neue Service Worker installieren bisher per `cache.addAll()`: **Fehlt auch nur eine benötigte Datei**, wird die Aktivierung verworfen und die alte Version bleibt aktiv.
- Die Version auf der Einstellungen-Seite war in älteren Paketen teilweise fest verdrahtet und kann falsch angezeigt werden.
- GitHub Pages muss das gesamte entpackte Paket aus dem korrekten Branch/Verzeichnis ausliefern; nur die ZIP-Datei hochzuladen reicht nicht.

## Sicheres Update
1. In deiner **alten installierten Homescreen-App** unter Einstellungen zuerst ein **JSON-Backup** erstellen und außerhalb der App sichern. App nicht löschen.
2. ZIP entpacken. Die Runtime-Dateien einschließlich `sw.js`, `app.js`, `index.html`, `training-v22.js`, `goal-calendar-v23.js`, `premium-art-bundle.js`, `version.json` und `update-check.html` ins **Hauptverzeichnis** von `Rowlandolo/KONPASU` hochladen und ersetzen. Nicht nur das ZIP hochladen.
3. GitHub Actions/Pages prüfen, ob der neue Commit erfolgreich veröffentlicht wurde.
4. Im Browser `https://rowlandolo.github.io/KONPASU/update-check.html` öffnen. Diese Diagnose liegt absichtlich **außerhalb des alten Service-Worker-Caches**.
5. Bei der Diagnose muss **2.3.1** gemeldet werden und alle geprüften JS-Dateien müssen vorhanden sein. Falls nicht, GitHub-Upload prüfen.
6. Die bestehende Homescreen-App mit Internet öffnen, vollständig schließen und erneut starten. In Einstellungen die Versionsanzeige prüfen.
7. Falls weiterhin alte Inhalte erscheinen: Auf der Diagnose-Seite optional den **KONPASU-App-Cache** erneuern. Achtung: Safari und Homescreen-App können auf iOS getrennte Speicherbereiche verwenden; es gibt keine Garantie, dass Safari den Cache der installierten App beeinflusst.

## Nicht tun
- NICHT die Homescreen-App löschen, bevor du ein außerhalb der App gespeichertes und lesbares Backup besitzt.
- NICHT Safari-Website-Daten insgesamt löschen; das kann lokale Daten zerstören.
- NICHT nur `index.html` oder nur `sw.js` veröffentlichen.

## Neue Update-Mechanik
- Netzwerkaktualisierung der App-Startseite mit Offline-Fallback.
- Alle unverzichtbaren JS-/CSS-Dateien müssen verfügbar sein, bevor ein Update aktiviert wird. Optionale Bilddateien blockieren das Update nicht mehr.
- `version.json` wird nicht durch die App gecacht.
- `update-check.html` zeigt aktuelle Serverversion und fehlende Kernskripte an.
- „Auf Updates prüfen“ gibt nun konkrete Informationen und meldet nicht mehr blind Erfolg.

## Status
Die JavaScript-Dateien und das Paket wurden statisch geprüft. Die tatsächliche Veröffentlichung in deinem GitHub-Repository und ein echter iOS-Homescreen-Test konnten hier nicht bestätigt werden.
