# KONPASU – Roadmap

Stand 03.11.2026. Reihenfolge aus Masterbriefing §11. Kein Terminversprechen; jede Stufe wird mit Belegen abgeschlossen.

| Phase | Ziel / kleinste überprüfbare Lieferung | Stand |
|---|---|---|
| 0 | Repo-/Speicheraudit, verbindliche Spezifikation, Status, Fehlerregister, QA | Dokumentiert und gepflegt; Speicherschutz getestet, GitHub-Zugriff wiederhergestellt, PR #1 veröffentlicht |
| 1 | 2.3.2 Avatar-/Inventar-/Favoriten-/Versionsfehler | Mit 2.4.0 veröffentlicht; VM- und Chromiumprüfungen erfolgreich |
| 2 | Tatsächlicher Layeravatar, echte Reward-Assets, Vorschau, Personalisierung, Cache | Technischer SVG-Avatar live; Artbook-Stil und neue modulare Basis in separatem Atelier, reales iPhone/Upgrade offen |
| 3 | 95 Voraussetzungen semantisch auditieren, ca. 30 Slots, Sets, Begleiter, historische Rewards und finales Design | Sammlung, Schwellenaudit und Ruhmeshalle lokal umgesetzt; Historienkorrektur abgesichert. Visuelle Abnahme, Konfigurationshilfe, Balancefragen und weitere Ausbauten offen |
| 4 | Workout-UX, Katalog/Pläne/Sätze/PBs, historische Bearbeitung und Doppelzählung absichern | Codebasis vorhanden; vollständige Abnahme offen |
| 5 | Alle 19 Zielmodule: Einheiten, Pausen, Nachträge, Wochenwechsel, Obergrenzen | Stichproben getestet, Ziel-für-Ziel-E2E offen |
| 6 | Vollständige Startseite C, Tagesfokus, Premium Botanical, systematische DE/EN und A11y | Personalisierter Home-Avatar integriert; Gesamt-UX offen |
| 7 | Offlinecoach, vorsichtige Muster, freiwillige Experimente, sichere Aktionen und Undo | Basis vorhanden, Produktausbau offen |
| 8 | Architekturentscheidung, optionales Konto/Sync, Konflikte, native Plattformen | Noch nicht begonnen; keine Neuschreibung |
| 9 | Releasequalität über alle Phasen: Automatik, echte Geräte, Backup/Restore und Rückweg | Blockierende Abnahmen siehe QA |

## Nächster kleinster Schritt

Aktuelle Entwicklungspriorität ist Etappe 3 aus AVATAR_RELEASE_STEPS.md: zuerst verlustfreien App-/Outfitvertrag anhand synthetischer Legacyprofile, Favoriten und History prüfen; noch keine automatische Storage-Migration. Neue geordnete Mehrfachauswahl muss alte Ausrüstung und alle noch nicht übertragenen Artikel mit geprüftem Rückfallweg erhalten. Danach Adapter/Inventar und kontrollierte Integration. Etappen 1 und 2 sind technisch für das Sechserstartset auf zwei Standfiguren abgeschlossen; 262 Regressionen/26 Atelier-Gruppen, 0.82 MB Startgrafiken/47.84 MiB Quell-RGBA. Reale Geräte-/PWA-Abnahme bleibt Etappe 5, 89 weitere Grafiken Etappe 4 und Veröffentlichung Etappe 6. Eine erste Liveversion mit dem Startset erfordert die zugehörigen Integrations-/Geräte-/Releasegates.

Die App bleibt offline nutzbar. Reales iPhone/Alt-PWA-Upgrade und historische Zielkonfigurationen bleiben eigenständige Prüfpunkte. Der spätere Copilot baut auf einer gemeinsamen, getesteten Aktionsengine mit Undo auf; Details in PROFESSIONAL_APP_PLAN.md.

## Historische Entwicklungsschritte

Die folgenden Abschnitte dokumentieren die Reihenfolge bisheriger Lieferungen; frühere „nächste Schritte“ sind durch den aktuellen Abschnitt oben ersetzt.

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

Neuer separat gezeichneter Körperunterbau vorhanden. Jetzt Proportionen/Anker mit bestätigter Basis vergleichen, danach passende vollständige Haar- und Grundkleidungsfragmente erzeugen und anpassen. Keine allein aus groben sichtbaren Masken abgeleitete Produktionsfreigabe.

## Nach Bereinigung und Körperunterbau

Neue unabhängige Haare/Kleider und vollständigen Unterbau gemeinsam im realen Browser sichten, Registrierung bei Bedarf korrigieren. Insbesondere Gesichtöffnung, Kragen, Unterärmel, Hände, Füße sowie alle acht Ausrüstungsfragmente prüfen. Danach Grundoutfit in Gewand/Obi/Hakama/Schuhe und Haare in Vorder-/Hinterteil aufteilen, damit weitere Belohnungen sinnvoll dazwischen liegen können. Vor Liveintegration Größenbudget und zweite gezeichnete Anatomie festlegen; Datenmodell/Favoriten/History erst mit verlustfreiem Rückweg anbinden.

Basis- und Unterbauabschnitt im Chromium abgeschlossen und gesichtet; aktueller Nachweis verification-body-foundation-v02.json. Die nächsten Arbeiten stehen im aktuellen Abschnitt oben, nicht in den historischen Ablaufnotizen.

## Nach sieben unabhängigen Basisgrafiken

Sieben Ebenen und komplette Kombination im Chromium sichten, Taille/Ärmel/Schuhe und Haaranschlüsse korrigieren. Danach Ärmel-Vorder-/Hinterseiten für natürliche Armverdeckung ausarbeiten; zwei gezeichnete Anatomien mit denselben Artikeln prüfen und mobiles Asset-/Renderingbudget festlegen. Produktive Auswahl erst anschließend mit stabilen IDs, vollständigem Besitz-/Favoriten-/Historienrückweg und Offline-/Geräteprüfung anbinden.

Sieben-Ebenen-Abschnitt einschließlich korrigierter Unterarmkanäle abgeschlossen; [Nachweis](https://github.com/Rowlandolo/KONPASU/actions/runs/41518792450) und verification-seven-layers-v03.json. Allgemeine Ärmel-/Arm-Tiefen und zweite Anatomie bleiben der nächste gestalterische Abschnitt.

## Nach zwei Körperformen und gemeinsamer Szene

Beide Formen mit Grundoutfit, Unterbau und vollständigem Set im realen Chromium sichten und Passformen korrigieren. Anschließend Rendering-/Dateigrößenbudget verbindlich festlegen, echte Kopf-/Ärmel-/Riemenfragmente in dieselbe Szenenlogik einordnen und erst danach produktive Mehrfach-Outfits mit Besitz-/Favoriten-/History-Rückweg anbinden. Weitere 90 Artikel nacheinander, keine neue Schemaänderung ohne Auftrag und Rückweg.

Zwei-Formen-/Szenenabschnitt erfolgreich geprüft und gesichtet: https://github.com/Rowlandolo/KONPASU/actions/runs/41529386209, verification-two-forms-v04.json. Aktuelle nächste Priorität steht oben; frühere Körpervarianten- und Maskenaufträge sind für diesen Prototyp abgeschlossen, nicht universell für alle zukünftigen Artikel.

## Zählbarer Weg zum vollständigen Artbook-Avatar

Sechs größere Etappen mit Ergebnissen und Abschlusskriterien: AVATAR_RELEASE_STEPS.md. Etappe 1 (Leistung/Grafikbudget) ist aktiv, mit bedarfsgesteuertem Laden und Bild-/Maskenwiederverwendung. Produktionsziele sind noch nicht erreicht. Dann Tiefenfragmente, Daten-/Appintegration, weitere 90 Artikel, Geräte-/Offlineabnahme und Veröffentlichung. Der KI-Copilot und die restliche App besitzen zusätzliche Phasen im PROFESSIONAL_APP_PLAN.md.

Aktueller Etappe-1-Beleg: https://github.com/Rowlandolo/KONPASU/actions/runs/41533841108, verification-performance-v05.json. Bedarfssteuerung und Rendering optimiert, visuelle Set-Ausgabe bytegleich; Produktionsgrößen bleiben ein offenes Abschlusskriterium.

## Numerische Produktionsbudgets / nächster Abschnitt

Neue Laufzeitgrafiken erfüllen die numerischen Datei-/Quell-RGBA-Ziele. Nach echtem Vergleich gegen Originale und 3×-Vorschau ist der technische Teil von Etappe 1 abgeschlossen. Die physische Gerätebestätigung bleibt in Etappe 5 und ist weiterhin Voraussetzung vor Veröffentlichung. Danach Etappe 2: tatsächliche Vorder-/Hinterfragmente für Riemen, Ärmel und spätere Kopfteile.

Abschluss belegt: verification-delivery-v06.json, 245 Regressionen und 19 Atelier-Prüfgruppen im Lauf 41544503356 erfolgreich, finaler Build bytegleich wiederholt. Etappe 2 ist die nächste konkrete Lieferung; übrige fünf Etappen und reale Gerätefreigabe bleiben offen.

Erster Abschnitt von Etappe 2 abgeschlossen: zweigeteiltes Geschirr mit unverändertem Artikel-/Frontschlüssel, auf beiden Körpern mit und ohne Gewand gesichtet. 248 Regressionen und 21 Atelier-Prüfgruppen grün im Lauf 41547850324. Ein frischer Build reproduziert alle 19 Laufzeitdateien plus Manifest bytegleich (41547850475). Nachweise: verification-harness-depth-v07.json. Als Nächstes Ärmel-Vorder-/Hinterflächen unter erhaltener logischer Gewandauswahl; AVATAR_DEPTH_CONTRACT.md beschreibt konkrete Bedingungen.

Ärmelabschnitt abgeschlossen: vier neue körperbezogene PNGs, gruppierter Basisvertrag und körperrichtige Vorschau; sieben logische Wahlen und alle 95 Artikel-IDs bleiben erhalten. 255 Regressionen und 23 Atelier-Prüfgruppen erfolgreich (41551201193); 21 Ausgaben plus Manifest bytegleich wiederholt (41551201181). Nachweis: verification-sleeve-depth-v08.json. Als Nächstes Kopfteil-/Haartiefen, danach geplanter App-/Datenvertrag aus Etappe 3; keine neue Live-/Storage-Migration in diesem Abschnitt.

Kopfteilabschnitt begonnen: focus-1 anhand tatsächlicher Artbook-Abbildung als Stirnband zugeordnet, drei Module und unabhängige Haarüberlagerung vorbereitet. Sechs Prototypartikel statt fünf; 89 weitere Standardartikel, weiterhin 18 Grafikpakete (17×5 und zuletzt 4). Nächster Prüfpunkt sind beide zusammengesetzten Köpfe, Haarvarianten, fehlerhafte Module und unveränderte mobile Budgets. Etappe 3 erst nach diesem konkret belegten Startset-Tiefenabschnitt.

## Abschluss Etappe 2: Fokus-Stirnband und Haarüberlagerung

Kopfteilabschnitt erfolgreich abgeschlossen: focus-1 mit drei Modulen und unabhängig wählbaren Haarflächen, sechs Prototypartikel insgesamt. 262 Regressionen, App-Chromium und 26 Atelier-Prüfgruppen erfolgreich für 633e50984f581db846495e011b7766a29d6fb70c ([Lauf 41555922134](https://github.com/Rowlandolo/KONPASU/actions/runs/41555922134)). Vollbeleg samt archivierten Aufnahmen: design/avatar/verification-headwear-depth-v09.json. Etappen 1/2 sind technisch für dieses Startset abgeschlossen; nächster Abschnitt ist der reine App-/Outfitvertrag aus Etappe 3. Weitere 89 Artikel bilden 18 Pakete (17×5, zuletzt 4). Reale Geräte-/PWA-Abnahme und Freigabe vor Veröffentlichung bleiben erforderlich.
