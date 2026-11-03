# KONPASU

Offline nutzbarer Ziel- und Trainingsbegleiter mit modularer 2D-Figur, Belohnungssammlung und lokalen Nutzerdaten.

Aktuell live: **2.4.1**, Stand 03.11.2026. Etappe 3 des modularen Artbook-Avatars ist technisch abgeschlossen: Mehrfachoutfits, persönliche Werte, Hauptansicht, Szenen/Begleiter, Rücknahmen und vollständige Avatar-Schnappschüsse. 445 Regressionen und sieben Browser-Workflows bestanden; Pages und öffentliche Kernressourcen sind bestätigt. Echter iPhone-/VoiceOver-/Alt-PWA-Gerätetest bleibt offen.

## Hochladen und ansehen

[START-HIER.md](START-HIER.md) erklärt die Testvorschau in einem eigenen GitHub-Pages-Repository sowie den späteren geprüften Updateweg für die bestehende App. Die App benötigt weder Installation von Paketen noch einen Build. ZIP entpacken und die Dateien direkt im Repository-Hauptverzeichnis bereitstellen.

Vor echtem Update JSON-Backup außerhalb der App sichern. Bestehende App, Origin und Datenbanken erhalten; keine Browserdaten als Reparatur löschen. Neue Nachweisregeln können Auswertungen korrigieren, Rohdaten bleiben erhalten.

## Entwicklung

Node 22: `node scripts/check.cjs`. Optionaler echter Browserlauf: [docs/BROWSER_ACCEPTANCE.md](docs/BROWSER_ACCEPTANCE.md); Gerätefälle: [docs/DEVICE_ACCEPTANCE.md](docs/DEVICE_ACCEPTANCE.md). Die mitgelieferte Testdatei enthält ausschließlich synthetische Daten und wird nicht automatisch ins Profil geladen.

Verbindliche Anforderungen: [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) und archiviertes Masterbriefing. Aktueller Stand: [docs/STATUS.md](docs/STATUS.md), Fehler: [docs/KNOWN_ISSUES.md](docs/KNOWN_ISSUES.md), nächste Schritte: [docs/ROADMAP.md](docs/ROADMAP.md), Liefernachweis: [docs/PAKET_PRUEFBERICHT.md](docs/PAKET_PRUEFBERICHT.md).

Frühere Root-Prüfberichte und VORSCHAU-PNGs sind historische Originaldateien. Die ursprüngliche README ist unverändert in [docs/ARCHIV-README-2.3.1.md](docs/ARCHIV-README-2.3.1.md) archiviert.
