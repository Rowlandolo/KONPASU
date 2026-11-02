# KONPASU 2.4.0 – vollständiges Paket hochladen

Das vollständige Originalarchiv ist inzwischen eingegangen. Alle 45 Basisdateien stimmen mit dem geprüften Repository überein. Die vormals fehlenden Originalgrafiken und premium-art-bundle.js sind ergänzt. Dieses Komplettpaket benötigt keine Patches und keinen Build.

## Paket und Prüfstand

Die ZIP enthält Dateien direkt im Hauptverzeichnis: index.html neben app.js, sw.js, manifest.webmanifest und allen Originalbildern. Dazu kommen docs/, tests/, scripts/, tools/ und .github/. Alle Originaldateipfade bleiben vorhanden; überarbeitete Runtimequellen ersetzen ihre alten Versionen. Die alte README bleibt in docs/ARCHIV-README-2.3.1.md erhalten. Alte VORSCHAU-PNGs sind historische Originalbilder und keine aktuelle Sichtabnahme.

193 automatische Prüfungen bestanden. Vollständige SHA256-Dateiliste: PAKETINHALT-SHA256.json. Prüfbericht: PAKET_PRUEFBERICHT.md. Original-Hashreferenz: ORIGINAL_SOURCE_MANIFEST.json. Browserstart in dieser Umgebung blockiert; keine Safari-/iPhone-/Upgradefreigabe behaupten.

## Einfach zuerst anschauen

1. ZIP auf einem Computer entpacken.
2. Neues öffentliches GitHub-Repository **KONPASU-Test** erstellen. Das bestehende Repository KONPASU behalten.
3. Add file → Upload files. Alle entpackten Dateien und Ordner direkt ins Hauptverzeichnis hochladen. index.html muss auf der obersten Ebene liegen. Nicht die ZIP selbst hochladen. Keine zusätzliche Ordnerhülle anlegen.
4. Bei mehr als 100 Dateien nacheinander hochladen: zuerst Hauptverzeichnis, danach die Unterordner. Je Datei gilt beim Webupload die 25-MB-Grenze; die vorhandenen Paketdateien liegen darunter.
5. Settings → Pages → Deploy from a branch → main → /(root) → Save. Erfolgreichen Pages-Lauf unter Actions abwarten.
6. Testadresse öffnen, normalerweise https://rowlandolo.github.io/KONPASU-Test/. Die App verwendet dort eigene lokale Daten. Das ist eine Testvorschau, kein Umzug deines persönlichen Profils. Keine privaten Sicherungen zum bloßen Anschauen importieren.

Für einen lokalen Test auf einem eigenen Entwicklercomputer kann alternativ im entpackten Ordner `python3 -m http.server 8000 --bind 127.0.0.1` gestartet und http://127.0.0.1:8000/ geöffnet werden. Dafür keine bestehende persönliche App überschreiben. Ein Doppelklick auf index.html ist keine verlässliche Offline-/Service-Worker-Abnahme. iPhone-PWA-Fälle brauchen HTTPS und echte Hardware.

## Bestehendes KONPASU kontrolliert aktualisieren

1. Aktuelles JSON-Backup aus der bestehenden App außerhalb der App sichern. Bestehende Homescreen-App, Browserdaten und Datenbanken behalten.
2. Im ursprünglichen Repository einen Entwicklungsbranch wie **preview/konpasu-24** erstellen. Dort alle Paketdateien mit unveränderter Ordnerstruktur hochladen. Alte Originaldateien nicht vorher pauschal löschen.
3. Pull Request gegen main öffnen. Ein Branch allein erzeugt keine laufende Website-Vorschau. Den ersten visuellen Test deshalb getrennt wie oben durchführen.
4. Nach Review und Freigabe mergen. Unter Actions muss der Pages-Lauf für genau den neuen Commit erfolgreich sein. Settings → Pages muss auf die beabsichtigte Quelle zeigen. Repositoryname und bestehende App-URL beibehalten, damit der lokale Datenorigin bestehen bleibt.
5. https://rowlandolo.github.io/KONPASU/version.json und https://rowlandolo.github.io/KONPASU/update-check.html prüfen. Erwartet: 2.4.0, Cache konpasu-offline-v240. App bei Internetverbindung schließen und neu öffnen. Wenn die Ansicht alt bleibt, Versionsdiagnose verwenden; keine Website-Daten oder Homescreen-App löschen.
6. Persönliche Datensätze und Ausrüstung mit dem Backup vergleichen. Neue Einträge speichern, erneut öffnen, anschließend Offline-/Neustartfälle aus DEVICE_ACCEPTANCE.md prüfen und wieder exportieren.
7. Bei Fehlern den Code über einen geprüften Git-Revert zurücknehmen. Keine Datenbankbereinigung durchführen. Dieses Paket führt keine neue Datenbank-/Schemastruktur ein; die Regeln für abgeleitete Erfolge wurden jedoch korrigiert. Details: CONSUMPTION_EVIDENCE.md.

## Was es mit „1.8“ auf sich hat

Die gelieferte Original-ZIP enthält version.json=2.3.1. Der alte Appcode zeigte dennoch eine fest eingetragene 1.8 an. Deshalb kann die bisherige sichtbare Zahl falsch sein; zusätzlich sind alte Caches möglich. Der konkrete Gerätebestand ist damit nicht unabhängig geprüft. Die neue Versionsanzeige ist zentralisiert und auf Deutsch/Englisch mit version.json abgeglichen. Ein Direktupgrade jedes historischen 1.8-Datenformats ist noch nicht auf Geräten abgenommen.

## Danach in dieser Reihenfolge

1. Separate Testvorschau öffnen und Browser-/Gerätefälle abarbeiten; Befunde festhalten und korrigieren.
2. Kontrollierte Aktualisierung der bestehenden App nach Review/Freigabe und Backup.
3. Historische Zieländerungen und Periodenwechsel auditieren.
4. Tragbarkeit nach Datenlücken (REW-06) fachlich entscheiden; danach Sets und Inventar weiterentwickeln.
5. Mobile Bedienung, VoiceOver, Kontrast und DE/EN nach echter Sichtprüfung verbessern.
6. Auf stabiler Offlinebasis Training und Coach ausbauen; Konto-/Sync-Architektur getrennt planen. Keine voreilige Neuschreibung oder 3D-Priorisierung.
