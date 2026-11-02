# KONPASU – Roadmap

Stand 02.11.2026. Reihenfolge aus Masterbriefing §11. Kein Terminversprechen; jede Stufe wird mit Belegen abgeschlossen.

| Phase | Ziel / kleinste überprüfbare Lieferung | Stand |
|---|---|---|
| 0 | Repo-/Speicheraudit, verbindliche Spezifikation, Status, Fehlerregister, QA | Lokal erstellt; DATA-01/02-Speicherschutz mit 24 zusätzlichen VM-Prüfungen ergänzt; Remote-Branch/PR durch 403 blockiert |
| 1 | 2.3.2 Avatar-/Inventar-/Favoriten-/Versionsfehler | In lokalem 2.4-Kandidaten integriert und VM-getestet |
| 2 | Tatsächlicher Layeravatar, echte Reward-Assets, Vorschau, Personalisierung, Cache | Lokal implementiert; Browser-/Geräte-/Updateabnahme offen |
| 3 | 95 Voraussetzungen semantisch auditieren, ca. 30 Slots, Sets, Begleiter, historische Rewards und finales Design | Sammlung, Schwellenaudit und Ruhmeshalle lokal umgesetzt; Historienkorrektur abgesichert. Visuelle Abnahme, Konfigurationshilfe, Balancefragen und weitere Ausbauten offen |
| 4 | Workout-UX, Katalog/Pläne/Sätze/PBs, historische Bearbeitung und Doppelzählung absichern | Codebasis vorhanden; vollständige Abnahme offen |
| 5 | Alle 19 Zielmodule: Einheiten, Pausen, Nachträge, Wochenwechsel, Obergrenzen | Stichproben getestet, Ziel-für-Ziel-E2E offen |
| 6 | Vollständige Startseite C, Tagesfokus, Premium Botanical, systematische DE/EN und A11y | Personalisierter Home-Avatar integriert; Gesamt-UX offen |
| 7 | Offlinecoach, vorsichtige Muster, freiwillige Experimente, sichere Aktionen und Undo | Basis vorhanden, Produktausbau offen |
| 8 | Architekturentscheidung, optionales Konto/Sync, Konflikte, native Plattformen | Noch nicht begonnen; keine Neuschreibung |
| 9 | Releasequalität über alle Phasen: Automatik, echte Geräte, Backup/Restore und Rückweg | Blockierende Abnahmen siehe QA |

## Nächster kleinster Schritt

Auf Nutzerauftrag umfangreicher Qualitätsaudit abgeschlossen: 43 neue Prüfungen und Korrekturen an Datenübernahme, Speicherung, Nachweisen, Avatarinteraktion, Export und Worker; insgesamt 156 Tests. Details und Grenzen: QUALITY_AUDIT_2026-11-02.md.

Nächste Priorität sind widersprüchliche Konsum-/Obergrenzennachweise und deren historische Semantik vor neuen Features. Regeln zuerst dokumentieren, Altwerte nicht heimlich umdeuten. Vollständige Browser-/iPhone-/Offlineabnahme und GitHub-Schreibzugriff bleiben Releasevoraussetzungen. Inventarsuche/Zielpfadfilter ist danach ein kleiner UX-Ausbau, kein Ersatz für diese Kernprüfung.

## Nach Abschnitt Verbrauchsnachweise

Kernkorrekturen lokal implementiert, 179 Tests grün. Nächster Freigabeschritt: DEVICE_ACCEPTANCE.md mit vollständigem Checkout in freigegebener Browserumgebung und auf echtem iPhone abarbeiten. Historische Ziel-/Periodenwechsel anschließend gezielt auditieren; weder Release noch Geräteabnahme behaupten.

## Nächste konkrete Lieferung

Vollständige Original-GitHub-ZIP ergänzen → aktuellen Kandidaten darüberlegen → entpacktes Komplettpaket samt allen Referenzen, Hashliste und Regressionen prüfen → einfache Uploadanleitung aus UPLOAD_GUIDE.md beilegen. Keine Patchsammlung als vollständiges Uploadpaket deklarieren. Browser-/iPhoneabnahme bleibt eigenständiges Freigabegate.

## Nach Lieferung des vollständigen Originalarchivs

Paketblocker behoben. Vollständiger Kandidat mit Originalbildern, Quellcode und Entwicklungsmaterial zum manuellen Testupload vorbereitet; 193 automatisierte Prüfungen grün. Jetzt zuerst separate Pages-Testvorschau und DEVICE_ACCEPTANCE.md abarbeiten. Anschließend geprüften PR für Original-App, dann historische Ziel-/Periodenkonsistenz und REW-06. Weitere Features hängen von diesen Befunden ab.

## Nach wiederhergestelltem GitHub-Zugriff

Geprüften Kandidaten im separaten Remote-Branch als Entwurfs-PR bereitstellen, GitHub-Reviewchecks abwarten, offene Browser-/Gerätefälle abnehmen. Manueller Datei-Upload ist für die Übertragung nicht mehr erforderlich. main und Pages bis zur geprüften Freigabe beibehalten.

## Nach Live-Release 2.4.0

PR #1 gemergt, Pages und Live-Version bestätigt. Als Nächstes persönliche Alt-PWA auf iPhone prüfen (Datenvergleich, Update, Offline-Neustart), dann historische Ziel-/Periodenänderungen und REW-06. Keine erneute manuelle Dateiübertragung nötig.

## Neue unmittelbare Priorität: Artbook-Avatar

PROFESSIONAL_APP_PLAN.md definiert den Weg zu abgenommenen Kernfunktionen und KI-Copilot. Jetzt Basis-/Poseabnahme, Schulterpanzer+Geschirr passend ausarbeiten, dann komplettes Krafttraining-Fünferset. Erst nach sichtbarer Passform produktives Mehrfach-Outfitmodell mit geprüftem Rückweg und danach restliche 90 Artikel. Kern-Datensicherheit und reale iPhone-Abnahme laufen begleitend.

## Nach Erstellung der ersten drei Grafikprototypen

Vier tatsächliche Atelieransichten im Chromium prüfen, Proportionen/Positionen visuell nacharbeiten und rückwärtige Geschirrriemen durch Masken/Tiefenaufteilung korrekt verdecken. Danach fünf noch fehlende Fragmente und komplette Kombinationsabnahme; erst dann produktives Outfitmodell. Nutzerprofil und Liveausrüstung werden dabei noch nicht angefasst.

Erste tatsächliche Kombinationsansicht erfolgreich in Chromium aufgenommen und gesichtet. Jetzt vorrangig Rückseitenmasken für Geschirr und tiefe Körperüberlagerungen ausarbeiten; dann übrige Krafttrainingfragmente. Die aktuellen drei PNGs verbleiben im Entwicklungsatelier.

## Nach Komplettierung des Krafttraining-Prototyps

Tatsächliches Fünferset im Browser sichten, Hand-/Ärmelübergänge und Riemenverdeckung nacharbeiten. Anschließend Basis in Körper, Grundgewand und Haare trennen und zweite Körpervariante prüfen, bevor dieses Rig als allgemeiner Grafikvertrag gilt. Produktions-Outfitmodell und Datenkonvertierung erst mit getesteten Rückwegen; Artbookpfade anschließend nacheinander.

Erste Fünferset-Aufnahme nach Handgelenk-/Unterarmkorrektur in Chromium erfolgreich gesichtet. Nächster Abschnitt: Basis in Körper/Grundkleidung/Haar zerlegen und Masken mit einer weiteren Körpervariante prüfen, dann produktive Mehrfachauswahl mit erhaltener Outfit-/Historienkompatibilität.

## Nach erster Basisaufteilung

Isolierte Körper-/Haar-/Kleidungsbilder prüfen und Trennmasken korrigieren. Darauf aufbauend verborgene Körper-/Kopfflächen anhand der bestätigten Pose zeichnen und für wirklichen Wechsel passende neue Einzelgrafiken erstellen. Die geometrische Breitenvariation dient nur dem gemeinsamen Einpassungstest und ersetzt keine individuell gezeichnete zweite Anatomie. Erst nach dieser Sichtabnahme produktive freie Umkleidung.
