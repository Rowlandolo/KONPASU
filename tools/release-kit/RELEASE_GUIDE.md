# KONPASU 2.4 – Veröffentlichungsleitfaden (02.11.2026)

## Ergebnis der Prüfung

- GitHub-Rechte: Das Konto `Rowlandolo` hat für `Rowlandolo/KONPASU` laut Repository-Metadaten `admin=true` und `push=true`. Die GitHub-Integration verweigert jedoch `create_branch` mit **403 Resource not accessible by integration**. Deshalb **keine Änderung auf main durch ChatGPT**.
- Letzter geprüfter Main-Commit: `444bdb3981ccc03c550fb402c2cca9e45ad8a46a` (01.11.2026).
- Public Pages `version.json`: noch `2.3.1`; letzter Pages-Run #17 vom 01.11.2026 erfolgreich: https://github.com/Rowlandolo/KONPASU/actions/runs/41301820103
- Die sechs Quellcode-Dateien in diesem Leitfaden haben **exakt** die geprüften GitHub-Blob-SHA-Werte. `release_preflight.py` gleicht die lokal heruntergeladene Kopie damit ab.
- 13/13 isolierte Tests bestanden. Keine Safari-/iPhone-E2E-Tests durchgeführt.

## Sicherer Veröffentlichungsablauf

1. **Bevor irgendetwas hochgeladen wird:** In der auf deinem iPhone **installierten** KONPASU-App unter Einstellungen ein JSON-Backup exportieren. Prüfen, dass die Datei als herunterladbare lokale Datei auf dem Gerät oder einem anderen sicheren Ort vorhanden ist. Browserdaten nicht löschen, PWA nicht entfernen.
2. Am Windows-PC das derzeitige Repository über https://github.com/Rowlandolo/KONPASU → **Code → Download ZIP** laden und entpacken. Die App-Dateien müssen sich im Stammordner der entpackten Kopie befinden.
3. Dieses Release-Kit entpacken und in PowerShell ausführen (Python 3 und Node.js erforderlich):

   ```powershell
   py release_preflight.py "C:\Pfad\zu\KONPASU-main"
   py apply_240.py "C:\Pfad\zu\KONPASU-main" --check
   py apply_240.py "C:\Pfad\zu\KONPASU-main"
   py tests\test_patch_240.py
   node --test tests\test_avatar_composer_v24.cjs
   ```

   Alle Checks müssen erfolgreich sein. Der Patch legt automatisch **außerhalb** des Repo-Verzeichnisses einen Code-Backupordner mit Zeitstempel an.
4. In GitHub über **Branches → New branch** einen Branch namens `feature/konpasu-v2-4-review` von `main` erstellen (das GitHub-Webkonto kann andere Berechtigungen als die ChatGPT-Integration haben). Nicht direkt auf `main` hochladen.
5. Im neuen Branch über **Add file → Upload files** die folgenden **sieben Dateien** aus der gepatchten Repository-Kopie **gemeinsam in einem Commit** hochladen; Dateinamen im Repository-Stammverzeichnis unverändert lassen: `app.js`, `avatar2d.js`, `app.css`, `index.html`, `sw.js`, `version.json` und die neue `avatar-composer-v24.js`. Keine Backup-ZIP, JSON-Exportdateien oder persönlichen Daten hochladen.
6. Einen Pull Request von `feature/konpasu-v2-4-review` nach `main` öffnen. Den Diff prüfen: *nur* die genannten sieben Quellcode-Dateien ändern sich. Durch das bloße Hochladen auf einen Feature-Branch sollte die öffentliche Pages-Version unverändert bleiben.
7. Da GitHub Pages momentan automatisch vom Hauptzweig deployed, löst **erst das Merge nach `main`** die öffentliche Veröffentlichung aus. Vorher Benutzerbackup, Quellcode-Test und PR-Diff kontrollieren. Dann PR mergen.
8. Unter https://github.com/Rowlandolo/KONPASU/actions auf den neuen Workflow **pages build and deployment** achten; `success` muss für den **neuen Commit** gelten. Ein früheres grünes Deployment genügt nicht.
9. Live-Version aus dem Browser prüfen: https://rowlandolo.github.io/KONPASU/version.json muss **2.4.0** und `konpasu-offline-v240` anzeigen. Zusätzlich auf Windows:

   ```powershell
   py verify_live_deployment.py
   ```

   Das Skript prüft nur öffentliche HTTP-Dateien, ändert nichts.
10. Auf dem iPhone die **bestehende** Home-Screen-App bei Internetverbindung öffnen, aktualisieren, Avatar-Mimik, Haarfarbe, Szene, Begleiter, Belohnungen, Startansicht, Ziele, Trainings und Offline-Neustart prüfen. Die App nicht löschen, um vermeidbaren Verlust von lokal gespeicherten Daten zu verhindern.

## Fehler / Rückweg

- Falls die Prüfdateien nach dem Merge trotz erfolgreichem Workflow `2.3.1` zeigen: das Deployment des **neuen Commits** prüfen, den App-Link im Browser (ohne Home-Screen-Cache) aufrufen, und die Service-Worker-Aktualisierung der bestehenden Installation abwarten bzw. neu öffnen. **Nicht** die App löschen und keine Website-Daten löschen.
- Falls 2.4 Daten fehlerhaft zeigt, **nicht** den importierten Stand ersetzen oder die App neu installieren. Zuerst einen Screenshot bzw. Export des Datenzustands sichern. Den PR in GitHub über den Revert-Button zurücknehmen oder die ursprünglichen sechs Code-Dateien aus dem Patch-Backup auf dem Hauptzweig wiederherstellen. Eine reine Code-Rücknahme **löscht nicht** das lokale Profil; die vorher exportierte JSON-Sicherung bleibt zusätzlich erhalten.
- Die neu eingeführte `avatar-composer-v24.js` kann nach einem Rollback liegenbleiben, solange sie in `index.html` und `sw.js` nicht eingebunden ist. Bei Bedarf später gezielt entfernen.

## Grenzen

- Der 2.4-Patch ist an **genau den geprüften** Stand gebunden; wenn `release_preflight.py` Abweichungen meldet, keine veralteten Dateien überschreiben. Vorher Änderungen vergleichen bzw. den Patch neu auf den aktuellen Stand anpassen.
- Kein Eingriff in localStorage, IndexedDB, JSON-Exports oder Profilschema. Das kann ohne echten iPhone-Test aber keine vollständige Datengarantie sein.
- 13 Tests prüfen synthetische Zustände. Eine vollständige Ende-zu-Ende-Prüfung mit dem tatsächlichen iPhone-App-Zustand ist noch ausstehend.
