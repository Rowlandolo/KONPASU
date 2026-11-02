# Lieferprüfung – vollständiger KONPASU-2.4.0-Kandidat

Datum: 02.11.2026 (Europe/Berlin). Noch nicht durch diese Sitzung veröffentlicht.

## Ausgangsdaten und Vollständigkeit

Die vom Nutzer gelieferte KONPASU-main.zip enthält 45 Dateien, 15.294.262 unkomprimierte Bytes. Alle 45 Git-Blob-SHA1 stimmen exakt mit dem zuvor verifizierten Repositorystand 444bdb3981ccc03c550fb402c2cca9e45ad8a46a überein. Das Archiv enthält keine abweichenden oder zusätzlichen Dateien. Seine version.json meldet 2.3.1; der alte sichtbare 1.8-Hinweis war im Quellcode fest eingetragen.

21 fehlende Originaldateien ergänzt, einschließlich aller Originalbilder, Icons, historischer Vorschaubilder und des 6.298.236 Byte großen premium-art-bundle.js. Originalbildbytes und Premiumbundle bleiben unverändert. Sämtliche ursprünglichen Dateipfade sind im neuen Paket enthalten. Laufzeitdateien werden durch den aktuellen Entwicklungsstand ersetzt; Original-README zusätzlich archiviert.

Das vollständige Paket enthält Appdateien, Dokumentation, Entwicklungstests, synthetische Testdatei und Hilfsskripte. Keine persönlichen App-Backups oder Browserprofile, .git, node_modules, Python-Caches oder lokalen Browserartefakte. Kein Build erforderlich. Kein Löschen bestehender Repositorydateien notwendig. SHA256-Liste für jede Lieferdatei außer der Liste selbst im Paket enthalten.

## Automatisch bestanden

- Syntax aller vorhandenen Runtime-JavaScript-Dateien einschließlich des echten Premiumbundles.
- 193 Prüfungen über `node scripts/check.cjs`, im vollständigen Entwicklungsstand und nach erneutem Entpacken der finalen ZIP ausgeführt; null fehlgeschlagene Tests. Quellcode-/VM-/Storage-/Cache-Doubles und Integritätsprüfungen, keine echte Browserabnahme.
- Alle in index.html und Service Worker deklarierten notwendigen Dateien und Grafiken vorhanden. Browser-Preflight: ready, Ausführungsstatus preflight-only.
- Manifesticons sind echte PNGs mit den deklarierten Abmessungen. Alle 104 eingebetteten Premiumbilder sind vollständige WebP-Payloads mit gültigem RIFF-Längenfeld, Resolver funktioniert ohne Netz.
- Statische Premiumbildverweise in den Runtimequellen auflösbar. Echtes Originalbundle zusammen mit sieben Hauptansichten DE/EN und modularer Figur ausführbar im VM-Harness.
- Versionsanzeige DE/EN, HTML-Metadaten, version.json=2.4.0 und Cache konpasu-offline-v240 konsistent. Alter englischer 2.0-Hinweis korrigiert.
- Backup-/Startschutz, Restore-Rollback, Speicherkonflikte, Ziele/Training, Avatar/Belohnungen, Exporte, Obergrenzennachweise und UI-Smokes in den vorhandenen Regressionen bestanden.
- Finale ZIP entpackt, Hashliste gegen alle entpackten Bytes geprüft, keine zusätzlichen/fehlenden Dateien, sämtliche Originaldateipfade enthalten, ZIP-CRC geprüft. Dateianzahl und Archiv-SHA256 in der separaten LIEFERNACHWEIS-Datei neben dem Download.

## Bewusst nicht als bestanden ausgegeben

Der echte Chromiumlauf bricht in dieser Umgebung beim Prozessstart ab: SIGTRAP, Crashpad `setsockopt: Operation not permitted`. Deshalb null bestandene echte Browserchecks, keine neuen Browser-Screenshots und keine Safari-/iPhone-/Flugmodus-/Upgrade-/Quota-/VoiceOver-Abnahme. Die Original-VORSCHAU-PNGs sind alte Repositorybilder.

Vollständige Dateien und grüne Quellcodetests garantieren nicht, dass jede Interaktion auf jedem Gerät fehlerfrei funktioniert. Das Paket eignet sich zum isolierten Testupload. Freigabefälle: DEVICE_ACCEPTANCE.md und BROWSER_ACCEPTANCE.md. Bekannte Produkt-/Historienlücken: KNOWN_ISSUES.md und ROADMAP.md.

## Daten und Rückweg

Keine neue Datenbank-/Schemastruktur durch die Lieferung. Bestehende Rohprotokolle werden von den korrigierten Nachweisregeln nicht umgeschrieben; abgeleitete Statistiken, Erfolge und Tragbarkeit können sich konservativ korrigieren. Das ist in CONSUMPTION_EVIDENCE.md beschrieben. Vor Live-Update aktuelles externes JSON-Backup sichern, bisherige Origin beibehalten und erst nach Review/Freigabe mergen. Bestehende App/Website-Daten nicht löschen. Rückweg ist ein geprüfter Code-Revert, keine automatische Datenbereinigung.

Der lokale Entwicklungsbranch besitzt einen eigenen Snapshot-Gitverlauf. Er ist kein originaler Upstreamcheckout. Die Lieferung erfolgt deshalb als vollständige Dateien; für den Upload sind keine Git-Patches nötig.
