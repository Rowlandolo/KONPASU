# KONPASU – Prüfkriterien und Release-Gate

Stand 03.11.2026: 2.4.0 ist veröffentlicht und in Chromium geprüft. Der neue Artbook-Avatar bleibt separat in Entwurfs-PRs bis #11 (Kandidat 2.4.1-preview.5). Echte iPhone-/VoiceOver-/Alt-PWA-Abnahme ist weiter offen. Historische Prüflisten stehen unter ihren damaligen Abschnitten; der aktuelle Prüfstand steht am Dokumentende.

## Wiederholbare Automatik

`node scripts/check.cjs` (Node 22, keine Dependencies). Tests/harness lädt echte Runtimequellen, unterdrückt nur Top-Level-init/render und ersetzt Browserdienste. VM-Tests allein sind kein Browserbeleg; reale Chromiumläufe werden separat verlinkt.

- [x] Alle Studiotabs DE/EN rendern ohne fehlende Hilfsfunktionen.
- [x] Best neu aus tragbaren Items; Awards, Favoriten und Trainings bleiben.
- [x] Outfit synchronisiert beide Begleiterfelder; Fallbackentwicklungsstufe korrekt.
- [x] Ruhmeshalle: beide Awardtypen und echter Leerzustand.
- [x] Gesperrte Vorschau/Schließen verändert oder speichert keine Daten.
- [x] Historische laufende Woche zählt nicht als damals abgeschlossene Woche.
- [x] Verdiente Items pausierter Ziele bleiben sichtbar.
- [x] Ausgewählte qualifizierte Serie sichtbar; Effekte aus respektiert.
- [x] Heimfigur reagiert auf Personalisierung.
- [x] 95 echte Rewardassets vorhanden, Körper-/Haar-/Mimik-, Szenen-/Petkombinationen referenzierbar; fehlende Körperlayer führen zum Fallback.
- [x] HTML-Metadaten/Werte escaped, Profil nicht durch Renderer verändert.
- [x] Synthetische Backups v2/v4/v10: Ziele/Sessions/Pläne/Awards/Favoriten/Notizen über migrate/save/reload erhalten (localStorage-Double).
- [x] Startup: beschädigte/nicht lesbare gespeicherte Daten sperren Seeding und weitere Writes; Warnhinweis sichtbar, kein Ersatzprofil-Backup. Gültige DB/Fallbackdaten und echte neue Profile bleiben nutzbar (16 VM-Prüfungen).
- [x] Kaputte Kernstruktur/Doppel-IDs verworfen; Quotenfehler überschreibt alten Speicher nicht; IndexedDB-Revisionskonflikt via Double blockiert.
- [x] Trainings-Doppelzählung/Warmups und unbekannte Wochen; Gaming-/Alkohollücken ohne erfundenen Erfolg.
- [x] SW-Simulation: kritischer Installfehler aktiviert nicht; Composer precached; Offline-Navigation mit vorhandenem Cache; Diagnose umgeht Cache.

- [x] Fallback-Parallelität: veralteter Stand und parallele Saves abgewiesen, eigene Saves geordnet, Vergleich innerhalb Web Lock; ohne Web Locks kein unsicherer Fallback-Write. Acht VM-Tests.

## Browser vor Merge

- [ ] Vollständiger Checkout inklusive premium-art-bundle.js und aller PNGs. Kein Snapshot-ZIP als ganze App hochladen.
- [ ] Chrome/Safari: Neuinstallation sowie Altprofil mit 100+ Sessions, vielen Detail-/Ziel-/Award-/Favoritdaten. Baseline-Export synthetisch sichern und nach Upgrade inhaltlich vergleichen.
- [ ] Echte IndexedDB: save/reload, zwei konkurrierende Tabs, Transaktionsfehler, beschädigte bestehende Daten, localStorage-Fallback, Speicher voll; keine überschriebenen Originaldaten.
- [ ] Restore: gültiges Alt-/Neubackup, Abbruch, fehlerhaftes Backup, fehlgeschlagener Schreibvorgang; Ausgangszustand erhalten.
- [ ] Avatar alle Controls/Equip/Unequip/Best/Favoriten/Try-on, Reload, Zielpause/Reaktivierung, Sprachwechsel; Bildpositionen und Z-Reihenfolge visuell korrekt.
- [ ] 320/390/430/768 px: kein horizontaler Scroll, Ganzkörper vollständig, Touch-Ziele, Kontrast, Tastatur/Screenreader, reduced motion.
- [ ] 19 Zieltypen je: neuer Eintrag, Nachtrag/Korrektur/Löschen, Datenlücke, Pause, Einheit-/Zielwechsel, eigenes Ziel. Erwartungsfälle STATUS.md verwenden.
- [ ] Montag/Sonntag und Sommerzeit: Tagesziel 30-Tage-Ansicht, Woche 12 Wochen, 3/3 früh/4/3 weiter, kein Zukunftserfolg. Bei geänderter Zielkonfiguration Historie überprüfen.
- [ ] Alle 95 Reward-Voraussetzungen mit unbekannt/verfehlt/erreicht sowie Rückschlag und Korrektur; keine unbelegten Embleme oder verschwundener Besitz.
- [ ] T22: Planöffnen ohne Draft, erster Satz mit/ohne Warmup, Nachbearbeitung, Abbruch, eigener Katalog und Planzuordnung ohne Kontextverlust.

## Reales iPhone und Veröffentlichung

- [ ] Nutzer exportiert JSON aus bestehender installierter App und sichert Datei außerhalb der App. Existenz bestätigen, kein privater Export ins Repo.
- [ ] Nutzer gibt geprüften PR ausdrücklich zum Merge frei. Kein automatischer Merge/Deployment.
- [ ] Pages-Erfolg gehört zum neuen freigegebenen Commit, nicht zu einem alten grünen Lauf.
- [ ] Live version.json = 2.4.0 und konpasu-offline-v240; neue JS/CSS/HTML tatsächlich ausgeliefert.
- [ ] Bestehende PWA ohne Deinstallation aktualisieren, vorher/nachher Datensätze und Ausrüstung vergleichen.
- [ ] Flugmodus/Kaltstart: Avatar, Ziele, Training und Speicherung nach Neustart; später Wiederverbindung und erneuter Export.
- [ ] Unterbrochenes Update/mangelndes Netz: alter Worker bleibt bei fehlenden kritischen Dateien benutzbar; kein Mischstand aus neuem HTML und alten Skripten.

## Rückweg

Nur Quellcode über geprüften Revert zurücknehmen; niemals Datenbanken/Website-Daten/PWA löschen. Workerupdate des Reverts prüfen, ggf. neuen Cache-Key für den Rückweg verwenden. Vor und nach Fehlerzuständen externes JSON sichern; Restore ersetzt Daten und bedarf ausdrücklicher Bestätigung. Keine verlustfreie Garantie aus Code- oder Mocktests ableiten.


## Belohnungssammlung, Gestaltungsabschnitt 1

- [x] Acht VM-Regressionen: Status, earned/resting/locked-Filter, Filter ohne Save, Equip/Legacy-Ablegen, Fortschrittsclamp, Escaping und englische Labels.
- [x] Standalone-Vorschau mit synthetischen Beispieldaten und Save-Stub erzeugbar.
- [ ] Visuelle Abnahme 320/390/430/768/1200 px und keine Überläufe; in dieser Umgebung ist Browsernavigation administrativ blockiert.
- [ ] Fokus nach Filter/Rerender, Tastatur, Screenreader und Bildkontrast auf echten Browsern.
- [ ] Reale Bildauflösung/Performance und 95 Items bei allen Zielen; Premium- und SVG-Fallbackpfad.
- [ ] Browserinteraktion und Save/Reload/Offline mit echtem Nutzerprofil erst nach gesichertem Backup.


## Rewardaudit und permanente Ruhmeshalle

- [x] Alle 95 Zuordnungen: Schwelle davor/exakt, Besitz/Tragbarkeit, Snapshot-Slot/Familie, SVG vorhanden (konfigurierte synthetische Ziele).
- [x] Datenlücken/Rückschläge, Pause, Custom-Familien, Zukunftsdaten; gespeicherte Auswahl bleibt erhalten.
- [x] Korrektur/Periodenwechsel löschen Serienhistorie nicht; wiederholtes Rebuild und erneut belegter Zustand erzeugen keine neue Identität/Duplikate.
- [x] Ruhmeshalle trennt gespeicherte/belegte/offene Nachweise, Typfilter ohne Save, ehemalige Ziele und sichere DE/EN-Datumsanzeige.
- [ ] Alle 95 Illustrationen visuell auf Slot/Z-Reihenfolge prüfen, endgültiges Balancing und historische Zielkonfiguration abnehmen.
- [ ] Browser-/iPhone-Abnahme und echte Persistenz des neuen Award-Verhaltens; Node-VM-Tests sind hierfür kein Ersatz.


## Belohnungsvoraussetzungen und Editoranbindung

- [x] Default-Ernährung/Alkohol bleiben ohne ungefragten Wert; UI erklärt offenen Konfigurationsbedarf.
- [x] Tagesnachweise, Wochenfrequenz und vollständige Maximalwert-Protokolle verständlich getrennt; 0 ist gültiges Maximum, Wochenfrequenz >7 wird erklärend markiert.
- [x] Öffnen/Abbrechen des echten Editors ohne Save oder Kontextsverlust; Custom-Ziel wird nicht zur Grafikfamilie umgeleitet.
- [x] Tatsächlicher Submit: fehlender Zahlenwert wird abgewiesen; expliziter persönlicher Zielwert erst beim Speichern übernommen; alte Zielversion und Trainings-/Profildaten unverändert.
- [x] EN-Beschriftungen und Escaping nutzereigener Einheiten.
- [ ] Echte Browserinteraktion, Fokus-/Tastaturführung und iPhone-Abnahme des Übergangs; semantische Gesamtabnahme aller Zielmodi bleibt offen.


## Begleiter und Outfits

- [x] Gemeinsame Begleiterauswahl-/Formlogik, Pause/Gate, unbekannte Schlüssel und bewusstes Übernehmen des Fallbacks.
- [x] Unselektierte Begleiter zeigen ihre berechnete Form; vorhandene 0/2/4/5-Stufenschwellen bleiben.
- [x] Reine Outfitvorschau, Legacy-Übernahme in freie Slots, kein Hineinmischen voriger Legacy-Ausstattung beim Anziehen.
- [x] Umbenennen, bestätigtes Löschen, Abbruch, negative Indizes, Escaping und alte Vorlagen ohne optionale Felder.
- [x] Vorgemerkte Teile bleiben erhalten; gesperrte Items erscheinen nicht als neu freigeschaltet.
- [ ] Bildausschnitte, Avatarposition und Bedienung auf 320/390/430px visuell abnehmen.
- [ ] Echte Persistenz/Reload/Offline und langfristige Import-/Favoritendaten auf iPhone prüfen.


## Ausrüstungsübersicht

- [x] Alle 16 Plätze mit ausgewähltem/aufgelöstem Teil bzw. korrektem Default, kein vorgetäuschtes zusätzliches Kopf-/Hauptaccessoire.
- [x] Ersatz, Pause, fehlender Nachweis und unbekannte gespeicherte Auswahl erklärt; keine Mutation.
- [x] Legacy-Auswahl sichtbar; Aura/Effekte bei Aus als ausgeblendet statt sichtbarem Reward behandelt.
- [x] Übergang zu Inventar/Ansehen ohne Save; UI-Datum heute ohne Historienänderung; DE/EN.
- [ ] Tatsächliche Pixel-/Layerdarstellung und Browserfokus auf Zielgeräten abnehmen.


## Qualitätsaudit – 43 zusätzliche Prüfungen

- [x] Verschachtelte Backups und gespeicherte Startdaten: Typen, optionale Listen, echte Datumswerte, problematische Objektschlüssel; Originalzustand bleibt bei Ablehnung erhalten.
- [x] Tatsächlicher Restore-Handler: Ablehnung vor Bestätigung, Abbruch, Berechnungsfehler, Savefehler und bestätigter Erfolg.
- [x] Gültige zeitbasierte Sätze ohne erfundene Wiederholung; Integritätscheck und CSV-Dauer konsistent.
- [x] Meal-days, explizite Digital-frei-Tage, widersprüchliche Nutzung und DE/EN-/Boolean-Aliase.
- [x] Anprobeende, aktuelle Bearbeitung statt Zeitreise, Datumsschutz, reiner Maßeeditor und positive/optionale Maße.
- [x] Dauerhafte Schreibwarnung, neue belegte Meilensteine einmalig speichern und unveränderte Historie beim Start nicht überschreiben.
- [x] Installiertes HTML vor Netzwerk bei vorhandenem Snapshotcache; erklärende Offlinefehlerseite ohne Löschung.
- [x] Fokus-/Detailaktionen mit DOM-Doubles, sieben Hauptansichten DE/EN neu/historisch und 47 Modusdialoge ohne Laufzeitfehler.
- [ ] Reale Safari-/iPhone-/IndexedDB-/Cache-/Quota- und Tastatur-/Layoutabnahme. Keine Gleichsetzung der VM-Tests mit Browser-E2E.

## Verbrauchsnachweise – zusätzliche Regressionen

- [x] Fehlender/ungültiger ABV blockiert freien Tag; ABV 0 widerspricht ihm nicht. Kalender, Details und manuelles Ja konsistent.
- [x] Verschiedene freie Tage statt Anzahl Bestätigungen; keine Wochenfreigabe aus einem Tagesnachweis.
- [x] Wochenobergrenze erst nach Sonntag bestätigt; Überschreitung sofort.
- [x] Detailüberschreitung trotz niedrigerem manuellem Wert/Häkchen; keine Doppeladdition. Negative Einträge reduzieren Untergrenze nicht.
- [x] Zukunftsdaten neutral; DE/EN-Vollständigkeit; Berufsnutzung ausgeschlossen; UI-Konfliktdatum und Hinweise.
- [x] Max-Ziele mit fehlendem Vollständigkeitsfeld können dieses im Detailformular erfassen.
- [ ] Echte Chrome-/Safari-/iPhone-Abnahme: DEVICE_ACCEPTANCE.md, synthetische Importdatei. Chromiumstart in dieser Sitzung fehlgeschlagen.

Gesamt: 179 automatisierte Tests; kein Gerätefreigabebeleg.

## Vollständiges Uploadpaket / Browserausführung

- [x] Optionaler Browser-Prüflauf vorbereitet, isolierter Loopbackorigin und neues Profil; acht Preflight-/Schutzprüfungen grün. Gesamtstand 187.
- [x] Fehlende Assets blockieren Ausführung mit status=blocked und null bestandenen Browserchecks.
- [ ] Vollständiges Originalarchiv, große Grafikdatei und zehn Originalbilder/Icons ergänzen und gegen Originalhashes prüfen.
- [ ] ZIP nach erneutem Entpacken vollständig testen; alle HTML-/Worker-/Manifestreferenzen enthalten, keine privaten Daten.
- [ ] Ausführbaren Browserteil tatsächlich bestehen lassen; BROWSER_ACCEPTANCE.md. Kein Ersatz für echtes iPhone/Upgrade.

## Komplettpaket 02.11.2026

- [x] Nutzerarchiv enthält alle 45 erwarteten Originaldateien; alle Git-Blob-Hashes identisch.
- [x] Originalbilder und Grafikbundle ergänzt; HTML-/Workerreferenzen und Manifesticons vollständig.
- [x] 104 Premium-WebPs vollständig dekodierbar, tatsächliches Originalbundle mit sieben Appansichten DE/EN VM-geprüft.
- [x] Zentrale Versionsanzeige DE/EN stimmt mit version.json, HTML und Worker überein.
- [x] 193 automatische Prüfungen im vollständigen Quellbestand; ZIP-Integrität und Wiederholungsprüfung nach Entpacken dokumentiert in PAKET_PRUEFBERICHT.md.
- [ ] Browser-/iPhone-/PWA-Upgradeabnahme: weiterhin offen; keine Releasegarantie aus Dateivollständigkeit ableiten.

## GitHub-Neuverbindung

- [x] main gelesen und separaten Entwicklungsbranch erfolgreich angelegt.
- [x] Remote-Dateistand vollständig per Git-Blob-SHA verifiziert und Entwurfs-PR #1 erstellt.
- [ ] GitHub-Reviewchecks für den aktuellen PR-Commit bestehen; lokale 193 Prüfungen sind getrennte Belege.
- [ ] Browser/iPhone/Upgrade und Veröffentlichung weiterhin separat freigeben.

## Release-Abnahme 2.4.0

- [x] Nutzerfreigabe und bereits bestätigtes externes Backup berücksichtigt.
- [x] 194 Regressionen sowie zehn echte Chromium-Prüfgruppen erfolgreich (Import/Abbruch, echte IndexedDB, Offline-Tab/Reload/Save, konkurrierende Tabs, sieben Ansichten DE/EN in fünf Breiten, JSON-Download und keine ungefangenen Browserfehler).
- [x] PR #1 übernommen, Pages erfolgreich für caf1aeada7954ab8b35004eb4186492b9b4bfc51.
- [x] Live version.json=2.4.0/v240 und Startseite unabhängig erreichbar.
- [ ] Reales iPhone, VoiceOver und Upgrade einer bestehenden persönlichen PWA weiterhin zu prüfen.

## Artbook-Grundlage

- [x] Alte Kartenbilder als ungeeignet für direktes Anziehen erkannt, Quelle/Artikel-IDs erhalten.
- [x] Alle 32 Auswahlkombinationen des ersten Fünfersets ohne stillen Ersatz geprüft.
- [x] Feste Reihenfolge, acht getrennte anatomische Fragmente, unbekannte IDs/gesperrte Artikel und unveränderte Eingaben geprüft.
- [x] Alle 95 bestehenden Artikel-IDs inventarisiert, alle neuen Grafiken offen markiert.
- [ ] Basis in Körper/Haar/Gewand segmentieren, endgültige Anker/Masken und Körpervarianten.
- [ ] Acht neue angepasste Rüstungsfragmente erzeugen und visuell mit der Basis abnehmen.
- [ ] Echte Appintegration, Persistenz/Favoriten/History-Konvertierung mit Rückweg und Gerätetest.

## Getrennte Ausrüstungsgrafiken

- [x] Drei eigenständige RGBA-PNGs vorhanden, Hash/Abmessungen und gemessene Transparenz dokumentiert.
- [x] Seitenverhältnis erhaltende Einpassung aus Alpha-Bounds, falsche Bounds/Rigs abgewiesen.
- [x] 32 Auswahlkombinationen mit Teilverfügbarkeit geprüft; noch fehlende Grafiken bleiben offen.
- [x] Atelier-Chromiumlauf für 836160db: vier reale Darstellungen, alle 32 UI-Kombinationen, mobile Breite und keine Speicherschreibvorgänge bestanden. Browseraufnahme der Kombination gesichtet; design/avatar/verification-v01.json enthält den Beleg.
- [ ] Sichtabnahme der Paarpassform sowie Vorder-/Hintermasken, danach Körpervarianten.

## Vollständiges Krafttraining-Set als Prototyp

- [x] Acht eigenständige PNG-Fragmente für fünf Artikel; Binär-/Größen-/Rigzuordnung geprüft.
- [x] Alle 32 Kombinationen ohne verdrängende Auswahl, jetzt ohne fehlende Prototypgrafiken.
- [x] Riemenmaskenkoordinaten validiert, Metadaten unverändert, Maske abschaltbar.
- [x] Erweiterter Atelier-Chromiumlauf für 437a240c bestanden: vollständiges Set, Maskenvergleich, alle 32 Auswahlen, mobile Breite, keine Datenwrites. Tatsächliche Aufnahme gesichtet; Handgelenkbänder und Armschienen danach nachjustiert und erneut grün geprüft.
- [ ] Ärmel-/Handübergänge, Masken, zweite Körpervariante, Produktions-Dateigrößen/Offline und produktive Datenanbindung.

## Basisaufteilung / Proportionen

- [x] Original-PNG unverändert; Hash und Abmessungen geprüft.
- [x] Sieben neue Tests: Pixelzuordnung/Rekonstruktion, acht Basis-Auswahlen, Trennbereiche, ungültige Eingaben und gemeinsame Proportionsparameter.
- [x] Native Pixelrekonstruktion, acht Basisbilder und breiteres komplettes Set für 0eaa849d im Chromium technisch bestanden.
- [ ] Sichtabnahme isolierter Trennbereiche: noch NICHT bestanden; Artefakt dokumentiert.
- [ ] Isolierte Maskenkanten visuell korrigieren; verdeckte Körper-/Kopfflächen zeichnen.
- [ ] Eigenständige Körpervariante mit echter Anatomie, separate produktive Kleider-/Haarassets.

- [x] Gesonderte vollständige Körperunterbau-Grafik erstellt, PNG/Hash/Abmessungen getestet, Rigregistrierung explizit nicht akzeptiert.
- [ ] Registrierung auf die bestätigte Pose, saubere passende Haar-/Kleidungsassets und unabhängige visuelle Abnahme.

## Saubere Einzelgrafiken / vollständiger Körperunterbau

- [x] Grobe Quellpixelmasken im aktiven Renderer durch drei unabhängig gezeichnete PNGs ersetzt.
- [x] Alle PNG-Hashes, RGBA-Maße, Platzierungsgrenzen, eindeutige IDs und feste Tiefenreihenfolge geprüft.
- [x] Acht Basis-Auswahlen, ungültige Quellen/IDs/Registrierungen und unveränderte Eingaben geprüft; insgesamt 222 lokale Prüfungen.
- [x] Neuer Chromiumlauf: vollständiger Kopf/Rumpf/Beine/Füße/Hände auch ohne Gewand, keine Gesichts-/Handreste in Haar-/Kleidungsansicht.
- [x] Tatsächliche Komposition mit allen acht Ausrüstungsgrafiken, Haaransatz, Kragen-/Ärmel-/Handübergänge gesichtet; Haarregistrierung und vier Armfragmente korrigiert.
- [ ] Vorder-/Hinterhaare, getrennte Grundkleidungsteile und zweite Anatomie.
- [ ] Produktives Datenmodell, Offlinebudget und Geräteabnahme.

Aktueller Beleg: 6a8775a71b297c0c1616146e7d61ad13e9f5c675, [Reviewlauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41509862640), 222 Regressionen, App-Chromium und elf Atelier-Prüfgruppen erfolgreich. Archivierte Aufnahmen und ausdrücklich begrenzte Sichtabnahme: design/avatar/verification-body-foundation-v02.json. Keine neue Veröffentlichung.

## Sieben unabhängige Basisebenen

- [x] Vollständigen Unterbau bytegleich erhalten; sechs neue separate PNGs samt SHA-256 und nativen Maßen geprüft.
- [x] 128 Auswahlen aller sieben Basisteile mit stabiler Reihenfolge und unveränderten Eingaben; 222 lokale Regressionen.
- [x] Unterschiedliche Zeichenflächen für Hinterhaare/Körper/Kleider und Vorderhaare; Ausrüstung bleibt dazwischen.
- [x] Chromium: alle 128 realen Basisauswahlen, drei Schnellansichten, identischer Neuaufbau und weiter 32 Rewardkombinationen.
- [x] Beschädigtes Pflichtasset zeigt Fehler und lässt keine teilweise Basis/Ausrüstung erscheinen.
- [x] Aktuelle Einzelbilder und Komposition samt Taille, Ärmeln, Schuhen und Frisur gesichtet; Unterarmkanäle korrigiert und an vier Punkten abgesichert.
- [ ] Ärmel-Tiefenaufteilung, weitere Anatomie, Produktionsbudget und App-/Offline-/Geräteintegration.

Aktueller Sieben-Ebenen-Nachweis: 512f877d51d61654cc2eec7d0d41f201883fe7d9, [Chromiumlauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41518792450), 222 Regressionen und zwölf Atelier-Prüfgruppen erfolgreich. Aufnahmen verification-seven-layers-v03.json. Produktions-/Gerätefreigabe weiterhin separat.

## Zwei Körperformen / gemeinsame Szene

- [x] Beide Körpergrafiken und Variantenkleidung per SHA-256/nativen Maßen geprüft; Körperplacement unverändert, unabhängige Bilder statt Ganzkörperstretch.
- [x] 32 Rewardauswahlen je Form, feste Tiefenreihenfolge, aktive/nicht aktive Verdeckungsflächen, seitenverhältnistreue Passform samt transportierter Clips und unveränderte Eingaben: acht neue Tests, 230 insgesamt.
- [x] Reales Chromium: 256 Basiszustände, 64 Rewardzustände und Körperwechsel ohne Verlust der Auswahl.
- [x] Synthetische reale SVG-Pixel bestätigen reversible Verdeckung und erhaltene Artikelauswahl.
- [x] Form A mit vollem Set sowie Form B mit Körperunterbau, Grundoutfit und komplettem Set gesichtet; unterschiedliche Körper-/Kleider-/Ausrüstungspassform geprüft.
- [ ] Renderingbudget, zusätzliche tiefengetrennte Assets, produktive Daten-/Offline-/Geräteabnahme.

Aktueller Nachweis: 89e6dcc4bbcc9c90c2043628a8440a0b65e40c57, [Zwei-Formen-Lauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41529386209), 230 Regressionen, App-Chromium und 14 Atelier-Prüfgruppen erfolgreich. Archivierte Aufnahmen und Grenzen: design/avatar/verification-two-forms-v04.json.

## Bedarfsgesteuertes Laden / Renderbudget

- [x] Unveränderte Quell-PNGs; optionale Referenz exakt bytegleich zum Original-WebP.
- [x] Wiederholbare Byte-/Quell-RGBA-Rechnung, eindeutige Ressourcen, Prototypobergrenzen und offen ausgewiesene Produktionsziele; sechs neue Tests, 236 insgesamt.
- [x] Chromium: keine zweite Körperform/Artbook beim Start, null Prüfraster und keine PNG-Kopien in Masken.
- [x] Stabile Körper-Bildknoten, pro Sitzung nur einmal geladene Zusatzgrafiken, echte Maskenpixel weiter korrekt.
- [x] Fehlgeschlagene Körperladung erhält Auswahl und lässt Retry zu; verspätete Antwort überschreibt neuere Auswahl/Artikel nicht.
- [x] Skriptzeiten samt Messgrenze aufgezeichnet; bestehende Kombinationen/Offline-Appprüfung weiter erfolgreich. Set-PNGs beider Körper bytegleich zum vorherigen Stand.
- [ ] Kleine Produktionsgrafiken und reale Zielgeräte: Etappe 1 noch nicht abgeschlossen.

Leistungsbeleg: e05b0c3f5228b10a83ef270fcac1b28045f1bf8a, [Lauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41533841108), 236 Regressionen und 17 Atelier-Prüfgruppen. Produktive Größen-/Geräteziele bleiben offen.

## Mobile Auslieferungsdateien

- [x] 18 Laufzeitdateien mit kanonischer Quell-SHA, echten WebP-Maßen, Ausgabehash und Dateigröße verifiziert.
- [x] Build prüft unveränderte Transparenz zur passend skalierten Referenz und begrenzten Farbfehler; Original-PNGs unangetastet.
- [x] Veraltete Quellen, falsche Maße, doppelte/ungültige Pfade und fehlende Einträge werden abgewiesen; Originalvergleich ausdrücklich getrennt. Neun neue Tests, 245 insgesamt, einschließlich Rezeptkonsistenz und Ausgabehash im Dateinamen.
- [x] 8 MB Startgrafiken und 48 MiB Quell-RGBA numerisch erfüllt; weiterhin keine physische Gerätefreigabe.
- [x] Echter Browser: beide Formen, 256 Basis-/64 Rewardzustände, mobile Ressourcen-/Retry-/Race-/Maskenprüfungen weiterhin erfolgreich.
- [x] Bilder gegen Originalmodus vergleichen: gesamtes Set, Gesicht, Goldmuster und Anteil stärker abweichender Pixel. Gesamt-MAE ≤3, Gesicht/Gold jeweils ≤5 auf 0–255-Skala; Anteil der Pixel mit Kanalabweichung >32 ≤2.5 %.
- [x] 390 px bei 3× Pixeldichte geprüft; tatsächliche Aufnahmen gesichtet. Keine Behauptung eines physischen Telefonlaufs.
- [x] Wiederholung des gepinnten Builds auf frischem CI-Runner: Manifest und alle 18 Laufzeitdateien bytegleich; kanonische PNGs unverändert.
- [ ] Echte Zieltelefon-/GPU-/Speicherspitzenabnahme vor Liveupdate.

Aktueller Abschluss: c99b943e70666452aeba9e9a95fe0f05f2c4ad34, [Browser/Regressionen](https://github.com/Rowlandolo/KONPASU/actions/runs/41544503356), [Rebuild](https://github.com/Rowlandolo/KONPASU/actions/runs/41544503475). 245 Regressionen und 19 Atelier-Prüfgruppen erfolgreich. Nachweis und archivierte Vergleichsaufnahmen: design/avatar/verification-delivery-v06.json. Historische offene Produktionsgrößen-/Browserpunkte oben sind für diesen technischen Stand abgeschlossen; Geräte-/Offlineintegration bleibt offen.

## Etappe 2: zweigeteiltes Geschirr

- [x] Getrennte neue PNGs mit Quellreferenz, SHA-256, Maßen und Alpha-Grenzen; bisheriges Original erhalten.
- [x] Vorhandener Artikel-/Frontschlüssel erhalten, Rückteil ergänzt; fehlendes Teil lässt den ganzen Artikel ausstehend.
- [x] Beide Formregistrierungen, neun Fragmente, Rücken-/Vorderrolle und ungültige Tiefen durch 28 gezielte Rig-/Artwork-/Szenentests geprüft.
- [x] Frischer Auslieferungsbuild, 248 vollständige Regressionen und unveränderte numerische Budgets: 760,882 Startbytes, 50,269,696 Quell-RGBA-Bytes.
- [x] Reale SVG-Pixel für Rücken/Körper/Vorderseite und getrennte Grafikvorschau, ohne Teilverlust.
- [x] Beide Formen mit Geschirr allein, vollem Set und ausgeblendeter Basis gesichtet; 3×-Bildqualität gegen neue Originale erfolgreich.
- [x] Ohne Gewand zu weit außen liegende Rückriemen korrigiert; echte Alpha-Prüfung unterhalb y=190 maximal vier Randpixel außerhalb Körperfläche (A: 1, B: 3).
- [x] Beschädigte Rückgrafik zeigt Fehler ohne halben Artikel/Teilfigur; Retry/Race und bestehende Offline-Appprüfung weiterhin erfolgreich. Negativtest verändert gültige WebP-Bytes nach dem Header und prüft die SHA-Verweigerung.
- [ ] Ärmel-Vorder-/Hinterflächen, weitere Kopfteile und physische Geräte-/Produktionsintegration.

Aktueller Beleg: 0a65c3c7d62943028fcd12e49a8021a91b195574, [248 Regressionen, App-Chromium und 21 Atelier-Prüfgruppen](https://github.com/Rowlandolo/KONPASU/actions/runs/41547850324), [bytegleicher Rebuild](https://github.com/Rowlandolo/KONPASU/actions/runs/41547850475). Original-/Mobilevergleich verlustbegrenzt, keine Pixelidentität zum früheren maskierten Geschirr behauptet. Archivierte Ansichten, Prüfgrenzen und Messwerte: design/avatar/verification-harness-depth-v07.json. Keine neue Liveversion.

## Etappe 2: Ärmel als gemeinsame Gewandgruppe

- [x] Vier neue native PNGs, ursprüngliche Gewanddateien unverändert, eigene Quellen-/Hash-/Platzierungsangaben für beide Formen.
- [x] Sieben logische Wahlen behalten; je ausgewähltem Gewand immer beide internen Flächen, vollständige Vertragsvalidierung und unveränderte Eingaben. 27 gezielte Basis-/Szenentests erfolgreich.
- [x] Hinterärmel vor Hinterhaaren und hinter Körper; nur Frontgewand als Armverdeckungsfläche; keine neuen Besitz-/Speicherartikel.
- [x] Frischer Laufzeitbuild und 255 vollständige Regressionen; 761,978 Startbytes / 50,022,912 Quell-RGBA-Bytes innerhalb der unveränderten Ziele.
- [x] Beide Formen im Browser, 256 logische Basis-/64 Rewardzustände als getrennte Suiten und unveränderte Auswahl beim Wechsel. Je logischem Gewandzustand immer null oder zwei Flächen.
- [x] Echte Front-/Hinterärmel-/Körper-/Armartikelpixel; acht offene Unterarm-/Handgelenkanker (Frontalpha 0, Körperalpha 253) und körperrichtige Einzelgrafikvorschau.
- [x] Zusammengesetzte Figur/Einzelgrafiken beider Formen gesichtet; Original-/Mobilevergleich bei 390 px und 3× erfolgreich.
- [x] Beschädigte Hinterfläche ohne halbes Gewand/Teilfigur; Lazy-Load-Retry/Race und unveränderte Offline-Appprüfungen erfolgreich.
- [x] Zweiter gepinnter Build: alle 21 Ausgaben plus Manifest bytegleich. Vorherige Quell-PNGs unverändert erhalten.
- [ ] Kopfteile, reale Geräte-/PWA-Abnahme und App-/Persistenzintegration.

Nachweis: dde46f6de2c07a7b4bc7755e8a8ea6447827076a, [255 Regressionen, App-Chromium und 23 Atelier-Prüfgruppen](https://github.com/Rowlandolo/KONPASU/actions/runs/41551201193), [Rebuild](https://github.com/Rowlandolo/KONPASU/actions/runs/41551201181). Gewand-Einzelrandprobe erlaubt <32 Alpha für eine schwach geglättete Goldkante, andere Einzelteile weiterhin <20; Passform-/Bildqualitätstests bleiben separat unverändert. Archivierte Aufnahmen und Messgrenzen: design/avatar/verification-sleeve-depth-v08.json. Keine neue Liveversion.

## Etappe 2: Fokus-Stirnband / Haarüberlagerung

- [x] Quellboard/Karte bytegleich archiviert, tatsächliche Stufe-1-Abbildung und unveränderte ID/Voraussetzung dokumentiert; keine Gleichsetzung von Legacy-Slot und Körperposition.
- [x] Drei neue native PNGs mit getrennten Rollen; sichtbare Registrierungsgrenzen nur für neue Grafiken definiert, native Dateien unverändert.
- [x] Sieben gezielte Tests: Referenzbytes, gültige Grenzen, vollständige Gruppe, acht unabhängige Haarzustände beider Formen, Tiefenrollen, bestehende Freischaltsperre und gemeinsame Haarregistrierung.
- [x] Frischer Build prüft tatsächliche Alpha>16-Grenzen, Ausgabehashes, Maße und unveränderte Budgets.
- [x] Vollständige Regressionen, 256 Basis-/128 Rewardzustände im Browser, kein Entfernen anderer ausgewählter Artikel oder Haare.
- [x] Reale SVG-Pixel für Hinterbänder, Haare, Stirnband und Schleife; Gesichtsproben frei, beide Figuren mit/ohne Haare sichten.
- [x] Original-/Mobilevergleich beider Formen und 390 px/3×; kaputte Kopfteilgrafik ohne Teilfigur, Retry/Race/Offline-App weiter erfolgreich.
- [ ] Physische Geräte-/PWA-Abnahme, universelle weitere Kopfartikel und App-/Datenintegration.

## Abschluss Etappe 2: Fokus-Stirnband und Haarüberlagerung

262 Regressionen, App-Chromium und 26 Atelier-Prüfgruppen erfolgreich für 633e50984f581db846495e011b7766a29d6fb70c ([Lauf 41555922134](https://github.com/Rowlandolo/KONPASU/actions/runs/41555922134)). Vollbeleg samt archivierten Aufnahmen: design/avatar/verification-headwear-depth-v09.json. 256 Basis- und 128 Rewardzustände getrennt geprüft; kein vollständiger kartesischer Sichttest. Alle Kopf-Gesichtsproben Alpha 0; echte SVG-Pixel prüfen Tiefenreihenfolge. Frischer Build 41555922095 reproduziert 24 WebPs plus Manifest bytegleich. Beide Figuren und 390 px/3× gegen Originalmodus gesichtet. Startdateien 819,188 Bytes / Quell-RGBA 50,162,944 Bytes (47.84 MiB); unveränderte Ziele erfüllt. Physische Telefon-/GPU-/Peakmessung bleibt offen.

Nächste Integrationskriterien: alte Einzelauswahl/Favoriten/History verlustfrei in einer reinen Testprojektion abbilden; ruhend/verdeckt/gesperrte Vorschau getrennt halten; keine Besitzfreigabe aus Grafikverfügbarkeit. Fehlende neue Grafiken müssen bestehende Darstellung erhalten. Ein tatsächlicher Speicherschritt benötigt gesonderten Datenvertrag, synthetische Roundtrip-/Rollbackfälle und Offlineprüfung.

## Abschluss: alle übrigen 89 Artikel als Vektor-Passformprototypen

Nutzerauftrag vom 03.11.2026 vor Etappe 3 abgearbeitet: alle 95 Artbook-Abbildungen auf fünf Originaltafeln einzeln zugeordnet, stabile IDs und Legacy-Voraussetzungen erhalten. 89 neue Vektorstudien mit 134 eigenen transparenten SVG-Modulen ergänzen die sechs bisherigen PNG-Prototypartikel. Beide Standfiguren, unabhängige Auswahl/Sichtbarkeit/Reihenfolge und echte Frontstoffmasken im separaten `design/avatar/catalog.html`. Es handelt sich um Passform-/Funktionsprototypen; die 89 Premiumzeichnungen bleiben ein eigener Arbeitsschritt.

280 Regressionen, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 13 zusätzliche Katalog-Browsergruppen erfolgreich für c4dcdff69d4c2536f2e11c1993dd7cbd7c46a9ca: [Kataloglauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939844), [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939822). Alle 4.465 Paare auf beiden Körpern im reinen Planer; 190 tatsächliche Einzelrenderings mit sichtbarer Pixeländerung (Minimum A 48 / B 61 Pixel bei 256×384). Alle 95 gemeinsam als Stressauswahl erhalten; keine Behauptung aller Paarungen als visuell abgenommen. Tatsächliche Außenstoffmasken verändern 563 Bildpixel und erhalten die Artikelgruppen.

19 Familienvergleichsbilder mit Originaltafelbereichen und beiden Figuren sowie Mischoutfits, 95er-Stressfigur, mobile Ansicht und Detailvergleich gesichtet und unverändert unter `design/avatar/review-catalog-v10/` archiviert. Verschobene bestehende Karten besonders bei Sozial/Natur erkannt: neuer Vergleich nutzt explizite Viewports der bytegleichen Gesamttafel, mit tatsächlicher Pixelprüfung der Begrenzung. Legacykarten bleiben unangetastet. Koordinatenrundung beseitigt Node-/Chromium-Hashabweichungen bei Perlen/Fächern. Gewandmotive, Bandführung und sichtbarere Aurasockel nach Sichtprüfung verfeinert.

Keine Live-, Daten-, Schema-, Besitz-, Rewardregel- oder Service-Workeränderung. Reales Gerät, PWA-Kaltstart/Upgrade, Mimikgrafiken, Griffposen, endgültige Schuhpassform und Premiumzeichnung bleiben offen. Vollbeleg und Grenzen: `design/avatar/verification-catalog-v10.json`; Lesefassung und Bedienung: `ARTBOOK_PROTOTYPE_REVIEW.md`; je Artikel vollständige Quelle, Module und beide Registrierungen: `ARTBOOK_95_PROTOTYPES.md`. Abschlusscommit enthält ausschließlich Dokumentation und Prüfbelege.

- [x] Alle 95 stabilen IDs, alte Slots/Namen/Voraussetzungen byte-/strukturgleich referenziert; neue Darstellungsnamen keine Migration.
- [x] Fünf ganze Originaltafeln und 95 Legacykarten bytegleich; Vergleiche nutzen die dokumentierten Originaltafel-Viewports. Clip-Pixel je Familie außen Alpha 0 / innen 255.
- [x] Alle 134 SVG-Module reproduzierbar, eigenständig, ohne externe Quellen und mit geprüften Hashes; vollständiger frischer Generatorlauf ohne Git-Differenz.
- [x] 4.465 Paarplanungen je Körper, 190 sichtbare Einzelrenderings, 95er-Stressauswahl, unabhängige Sichtbarkeit/Reihenfolge/Haarflächen und keine Slotverdrängung.
- [x] Tatsächliche SVG-Pixel für äußere Kleidermasken; kaputte Referenz mit Retry und ungültiger Vektorhash ohne Teilfigur.
- [x] 19 Familienbilder, zwei Mischoutfits, mobile Ansicht, Originaldetail und 95er-Stressfigur gesichtet; keinerlei Profilspeicherzugriff.
- [x] Bereits geladenes Atelier ohne Netzwerk weiter bedienbar. Dies ist kein kalter PWA-Offlinestart.
- [ ] Finale Premiumzeichnung/Detailpassform, richtige Mimiklayer/Griffposen und Schuhmasken.
- [ ] Neue App-/Outfitpersistenz, Import/Export/Rollback und Offline-Precache.
- [ ] Physische Geräte-/GPU-/Peak-/VoiceOver-/Alt-PWA-Abnahme und Veröffentlichung.

## Abschluss Etappe 3.1: verlustfreier Outfit-Leseadapter

`avatar-outfit-v25.js` projiziert aktuelle Auswahl, Favoriten und historische Schnappschüsse ohne Schreibzugriff. Parallele Legacy-/Slotwerte, ruhende/unbekannte Einträge, eigene Ziel-IDs und beide Begleiterfelder bleiben mit ihrer Herkunft erhalten. Artikelidentität und Grafikschlüssel sind getrennt; Besitz/Tragbarkeit und tatsächliche Altauflösung stammen aus den bestehenden APIs. Leere Favoriten bleiben leer. Ohne historische Quelle entsteht eine neutrale blockierte Ansicht statt einer erfundenen heutigen Vergangenheit.

303 Regressionen einschließlich 23 neuer Adapterfälle, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 12 neue Browsergruppen erfolgreich für **1d50304da6b818cf1181cb79fda02072755e8143**: [Regression und bestehender Browser](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680366), [synthetische Outfitprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680286). Acht UI-Fälle, exakte Quelltreue, 390-px-Layout, Textsicherheit, sichtbare Fehler und bedienbare bereits geladene Offlineansicht geprüft. Kein localStorage-/IndexedDB-Eintrag, keine Browserfehler. Sechs tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-contract-v01/` archiviert; Vollbeleg `design/avatar/verification-outfit-contract-v01.json`.

Entwurfs-PR [#5](https://github.com/Rowlandolo/KONPASU/pull/5) baut auf #4 auf. Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Die synthetischen VM-Fälle verwenden kontrollierte Wochen-/Tierwerte; sie sind keine vollständige Reward-/Kalender- oder Geräteabnahme. Etappe 3 insgesamt ist weiterhin offen. Als Nächstes folgt ein geordneter Mehrfachentwurf mit eigenen Artikelinstanzen, Sichtbarkeit, Reihenfolge und Undo ausschließlich im Sitzungsspeicher. Persistenz, Import/Export/Rollback und Appintegration folgen mit eigenem Prüfvertrag. Details: AVATAR_OUTFIT_CONTRACT.md.

- [x] 23 neue Adapterfälle mit realen Alt-APIs; vollständiger synthetischer Quellvergleich, eigene Zielidentität, Pausen, unbekannte Daten und fehlerhafte Leser.
- [x] Acht Browserfälle für aktuell/Favorit/Historie; 12 Browsergruppen einschließlich 390 px, XSS-Text, kaputter Fixture und Warm-Offlinebetrieb.
- [x] Leerer Favorit erbt keine Ausrüstung; fehlender historischer Schnappschuss erhält keine heutigen Teile.
- [x] Keine Appinitialisierung, persönlichen Exporte, Profilimporte oder Speichereinträge; sechs Browserbilder gesichtet/archiviert.
- [x] Geordneter Mehrfachentwurf und Undo/Redo im Sitzungsspeicher: Etappe 3.2 abgeschlossen, siehe jüngster Nachweis.
- [ ] Persistenter Mehrfachvertrag, Altprofilvergleich, Import/Export, Rollback, App- und PWA-Integration.
- [ ] Reale Geräte-/VoiceOver-/Kaltstart-/Upgradeabnahme; finale Grafik und Veröffentlichung.

## Abschluss Etappe 3.2: Mehrfachoutfit im Sitzungsspeicher

Eigene Werkstatt `design/avatar/outfit-draft.html` und reiner Editor `avatar-outfit-draft-v25.js` in Entwurfs-PR [#6](https://github.com/Rowlandolo/KONPASU/pull/6), aufbauend auf #5. Artikel unabhängig hinzufügen, ausblenden, sortieren und entfernen; Undo/Redo für alle Aktionen einschließlich Körperform und Reset. Stabile Instanzen erhalten eigene Ziel-IDs bei geteilter Grafik. Start nur mit tatsächlicher Altauflösung; vollständige Originalquelle unverändert. Jedes synthetische Beispiel behält seinen Entwurf während der geöffneten Seite; Neuladen verwirft ihn sichtbar angekündigt. Kein sessionStorage, localStorage oder IndexedDB-Zugriff.

**324 Regressionen (21 neu), bestehende App-/Atelierprüfung mit 26 Gruppen und 16 neue Chromiumgruppen erfolgreich** für `7b90e8a535e52d64b8f2767ef2954f1526b591e2`: [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823151), [Entwurfsprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823134). Tatsächliche UI-Undo/Redo-Kette, geteilte PNG-Grafik mit eindeutigen SVG-IDs, veränderte gleich tiefe SVG-Reihenfolge, 95er-Kombination mit 134 Vektor-/12 PNG-Modulen, DE/EN, 320/390/430 px, 44-px-Ziele, Warm-Offlinebetrieb und Fehlerfälle bestanden. Drei echte Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-draft-v01/` archiviert. Vollbeleg `design/avatar/verification-outfit-draft-v01.json`; Vertrag und Grenzen AVATAR_SESSION_DRAFT.md.

Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Historische Personalisierung, Szenen und gesonderter Legacy-Begleiter bleiben im Original erhalten; ihre Rendererübernahme ist noch offen. Prototypgrafiken, physisches Gerät und kaltes PWA-Upgrade bleiben eigene Gates. Als Nächstes Etappe 3.3: expliziter additiver Speicher-/Import-/Export-/Rollbackvertrag mit Datenvergleich und bestehendem Revisions-/Konfliktschutz. Noch keine dauerhafte Speicherung oder neue Figur in der Live-App.

- [x] 21 neue Regressionen für Instanzen, Quelltreue, komplette Undo/Redo-Kette, No-ops, Fehlaktionen und Render-Akzeptanzrollback.
- [x] 16 neue Browsergruppen: tatsächliche UI-Aktionen, gleiche PNG-Grafik getrennt, eindeutige IDs, feste Tiefe und geänderte SVG-Reihenfolge, alle 95 gemeinsam.
- [x] Beispielwechsel erhält Entwürfe; Reload verwirft sie. Originalquelle bleibt nach Reset/Entfernen/Undo unverändert.
- [x] Fehlende Historie/ungültiger Favorit sperren Bearbeitung und verbergen Vorschau; unsichere Texte führen kein HTML aus.
- [x] DE/EN, 320/390/430 px, 44-px-Ziele, erhaltene Tastaturfokussierung, bereits geladene Formen offline.
- [x] Keine localStorage-/sessionStorage-/IndexedDB-Einträge und keine Browserfehler; drei Screenshots gesichtet.
- [ ] Dauerhafte Mehrfachauswahl, tatsächliche Appaktionen, Import/Export/Rollback und Speicher-Konflikt-/Offlinefälle.
- [ ] Physische Geräte-/VoiceOver-/PWA-Kaltstart-/Upgradeabnahme und Veröffentlichung.

## Abschluss Etappe 3.3: dauerhafter Outfitvertrag mit Rückweg

Entwurfs-PR [#7](https://github.com/Rowlandolo/KONPASU/pull/7) auf #6 ergänzt `profile.outfit25` ausschließlich nach ausdrücklichem Speichern sowie genau einen dauerhaften Rücknahmeeintrag `outfitRecovery25`. Reine Kandidatenprüfung und struktureller Datenvergleich in `avatar-outfit-persistence-v25.js`; Anbindung an dieselbe Speicherqueue, IndexedDB-Revision und Fallback-Web-Lock in `avatar-outfit-store-v25.js`. Alte Ausrüstung, Favoriten/History, Ziele/Trainings und unbekannte Daten bleiben erhalten. Frischer Besitz-/Tragbarkeitsnachweis; ruhende/unbekannte gespeicherte Wünsche bleiben erhalten, ohne als tragbar zu gelten. Rücknahme nach Neuladen ändert nur Outfitfelder und erhält spätere andere Einträge. Noch Backend/API, keine produktive Verbindung der neuen Editor-/Rendereroberfläche.

**350 Regressionen (26 neu), bestehende App-/26 Ateliergruppen, 16 bestehende Editorgruppen und 13 neue Speicher-Browsergruppen erfolgreich** für `b6e0d96c0d331360ab77a4a15e0ada309af9bfcb`: [Basis/App](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181636), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181657), [echte Speicherprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181638). Reale IndexedDB, Startup/Reload, vorhandene JSON-Backup-/Import-UI, frische Offline-Seite mit tatsächlichem Worker, konkurrierende Tabs, Queueüberlagerung, Rücknahme nach späteren Daten und erzwungener Put-Fehler geprüft. Browser-Evidenz über echte Reward-/Kalenderfunktionen mit expliziten Wochenmesswerten; keine Tier-/Evidenzstubs. Der synthetische Screenshot ist eine ausschließlich vom Test erzeugte Ergebniskarte, kein neues produktives Bedienelement. Belege unter `design/avatar/review-outfit-storage-v01/`, Vollbeleg `design/avatar/verification-outfit-storage-v01.json`.

Kandidat **2.4.1-preview.1** hat einen getrennten Cache `konpasu-offline-v241-outfit-preview1` und precacht alle vier neuen Laufzeitabhängigkeiten kritisch. Dieser Entwicklungsstand ist nicht veröffentlicht; main/Pages und persönliche Daten wurden nicht geändert. Nächster Abschnitt 3.4: Editorbedienung mit Speichern/Rücknahme und klaren Konfliktzuständen an die API anbinden, neuen Renderer samt Personalisierung/Szenen/Begleiter und Legacy-Rückweg integrieren. Physisches iPhone, VoiceOver und Alt-PWA-Upgrade bleiben eigenständige Abnahmen. Details: AVATAR_OUTFIT_PERSISTENCE.md.

- [x] Additive Felder nur nach expliziter Aktion; struktureller Vergleich sämtlicher übrigen Profile-/Ziel-/Training-/History-/Reward-/Fremdfelder.
- [x] Frischer tatsächlicher Besitz/Tragbarkeitsnachweis; unverdiente Anproben blockiert, ruhende/unklare frühere Wünsche erhalten.
- [x] Backup-/Import-/Migrationsvergleich; beschädigte bekannte Erweiterungen auch in History abgewiesen, künftige Versionen neutral erhalten.
- [x] Wiederaufnahme mit Reihenfolge/Instanzidentitäten/Körperform/Sichtbarkeit nach tatsächlichem Startup/Reload.
- [x] Eine dauerhafte gezielte Rücknahme nach Neuladen; spätere Notizen/Checks/Trainings bleiben erhalten.
- [x] Echte IndexedDB-Revisionskonflikte und Put-Abbruch; Fallback-Web-Lock/Rohdaten-CAS und fehlende Web Locks.
- [x] Gemeinsam vorgemerkte gewöhnliche Saves können neue Outfitfelder nicht überschreiben; Quota-/Schreibfehler lassen bisherigen Diskstand bestehen.
- [x] Tatsächliche kalte Offline-Seite mit neuem Worker und kritischen Abhängigkeiten lädt, speichert, lädt erneut und nimmt zurück. Das ist keine Alt-PWA-/physische iPhone-Abnahme.
- [ ] Produktive Editor-/Rendererbedienung, Personalisierung/Szenen/Begleiter und Legacy-Rückweg samt allen UI-/Offlinefällen.
- [ ] Physische Geräte, VoiceOver, Alt-PWA-Upgrade und freigegebene Veröffentlichung.

## Etappe 4 · Paket 4.11

- [x] Beide Dehnbänder sind getrennte, hashgebundene transparente PNG-Module.
- [x] Körperform A/B, Einzelrendering, unabhängige Modulidentitäten und sichtbare Pixeländerung geprüft.
- [x] Cardio, Schritte und `mobility-1` bleiben gemeinsam als 23 Module ausgewählt und sichtbar.
- [x] 95-Artikel-Stressauswahl, Warm-Offline-Katalog und speicherfreie Vorschau bleiben erfolgreich.
- [ ] Physische iPhone-/Android-, VoiceOver-, GPU-/Speicher- und kalte PWA-/Upgrade-Abnahme.

## Etappe 4 · Paket 4.12

- [x] Obi-Gürtel und Blütenknoten/Stoffbahnen sind getrennte, hashgebundene transparente PNG-Module.
- [x] Körperform A/B, Einzelrendering, natürliche Taillenüberdeckung und sichtbare Pixeländerung geprüft.
- [x] `mobility-1` und `mobility-2` bleiben gemeinsam als vier Module sichtbar.
- [x] Cardio, Schritte und beide Beweglichkeitsartikel bleiben gemeinsam als 25 Module erhalten.
- [x] 95-Artikel-Stressauswahl, Warm-Offline-Katalog und speicherfreie Vorschau bleiben erfolgreich.
- [ ] Physische iPhone-/Android-, VoiceOver-, GPU-/Speicher- und kalte PWA-/Upgrade-Abnahme.

## Etappe 4 · Paket 4.13

- [x] Linker und rechter Beweglichkeitsärmel sind getrennte, hashgebundene transparente PNG-Module.
- [x] Körperform A/B, freie Hände, Unterarmpassform und sichtbare Pixeländerung geprüft.
- [x] Kimono-/Außenkleidungsmaskierung verdeckt nur tatsächliche Vorderflächen und erhält die Auswahl.
- [x] Die ersten drei Beweglichkeitsartikel bleiben gemeinsam als sechs Module sichtbar.
- [x] Cardio, Schritte und die ersten drei Beweglichkeitsartikel bleiben gemeinsam als 27 Module erhalten.
- [x] 95-Artikel-Stressauswahl, Warm-Offline-Katalog und speicherfreie Vorschau bleiben erfolgreich.
- [ ] Physische iPhone-/Android-, VoiceOver-, GPU-/Speicher- und kalte PWA-/Upgrade-Abnahme.

## Etappe 4 · Paket 4.14

- [x] Vorder- und Rückebene des Tänzer-Haori sind getrennte, hashgebundene transparente PNG-Module.
- [x] Körperform A/B, offenes Zentrum, Hals, Ärmelöffnungen und sichtbare Pixeländerung geprüft.
- [x] Vorderflächenmaskierung verdeckt nur tatsächliche Armflächen und erhält alle ausgewählten Artikel.
- [x] Die ersten vier Beweglichkeitsartikel bleiben gemeinsam als acht Module sichtbar.
- [x] Cardio, Schritte und die ersten vier Beweglichkeitsartikel bleiben gemeinsam als 29 Module erhalten.
- [x] 95-Artikel-Stressauswahl, Warm-Offline-Katalog und speicherfreie Vorschau bleiben erfolgreich.
- [ ] Physische iPhone-/Android-, VoiceOver-, GPU-/Speicher- und kalte PWA-/Upgrade-Abnahme.

## Etappe 4 · Paket 4.15 und Beweglichkeits-Familie

- [x] Drachen- und Windebene sind getrennte, hashgebundene transparente PNG-Module mit offenen Zentren.
- [x] Alle fünf Beweglichkeitsartikel bleiben gemeinsam als zehn Module auf Körperform A/B sichtbar.
- [x] Cardio, Schritte und Beweglichkeit bleiben gemeinsam als 31 Module erhalten.
- [x] Maskierung, Sichtbarkeit, Reihenfolge, 95-Artikel-Stressauswahl, Warm-Offline-Katalog und Mehrfachoutfitlauf bestanden.
- [ ] Physische iPhone-/Android-, VoiceOver-, GPU-/Speicher- und kalte PWA-/Upgrade-Abnahme.

## Abschluss Etappe 3.4.1: sichtbarer Editor mit Speichern, Konflikt und Rücknahme

Entwurfs-PR [#8](https://github.com/Rowlandolo/KONPASU/pull/8) auf #7 ergänzt den tatsächlichen Einstieg **Avatar → Outfits → Mehrfachoutfit bearbeiten**. Native Dialogbedienung mit Artbook-Anprobe, Artikelwahl/Suche, unabhängiger Sichtbarkeit/Reihenfolge, Körperform, Undo/Redo/Reset und ausdrücklichem Speichern. Separate dauerhafte Rücknahme ist bei ungespeicherten Entwurfsänderungen gesperrt. Schließen behält den Entwurf in der laufenden App. Vorhandene Ausrüstung, Favoriten, History, Ziele/Trainings und übrige Daten bleiben erhalten.

Konflikt zeigt klare Meldung, sperrt Speichern und erhält den Entwurf. „Neueste Daten laden · Entwurf behalten“ liest und validiert denselben Speicher, prüft lokale Appänderungen vor/nach dem Lesen und rebasiert nur auf ausdrückliche Aktion. Ungespeicherte andere Einträge werden nicht überschrieben; vorhandener JSON-Export ist erreichbar. Geprüfter Memory-Ausgangsstand nach Startup/Schreibabschluss, typisierter Konflikthinweis und erwartetes Recovery-Token ergänzen den vorhandenen Schutz. Keine automatische Wiederholung fehlgeschlagener Writes.

**366 Regressionen (16 neu), 12 neue UI-Browsergruppen, 13 bestehende Speichergruppen und bisherige App-/26 Ateliergruppen erfolgreich** für `cb18dd1142783b34331eed1d9566448f79c9c056`: [App/Tests](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795811), [sichtbare UI](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795808), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795918). Echter Offline-Neustart mit Anprobe, Speichern/Neuladen/Rücknahme, tatsächlicher Zweitab-Konflikt und behaltener Entwurf, lokale Fremdänderungen, JSON-Sicherung, DE/EN, 320/390/430 px, Touch/Fokus, Textsicherheit und Integritäts-Retry geprüft. 24 Liefer-WebPs reproduziert: [Build](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795888). Drei tatsächliche UI-Bilder gesichtet und unverändert archiviert; Bericht/Vollbeleg unter `design/avatar/review-outfit-editor-v01/` und `design/avatar/verification-outfit-editor-v01.json`.

Kandidat **2.4.1-preview.2** mit getrenntem Cache `konpasu-offline-v241-outfit-preview2`; alle benötigten Vorschauverträge/Skripte/24 WebPs sind kritisch precached. Keine Original-Artbooktafeln oder einzelnen 134 SVG-Dateien dafür geladen. Kein Main-Merge/Deployment und kein Zugriff auf private Browserprofile. **3.4 insgesamt bleibt offen:** Hauptavatarroute samt Personalisierung/Szenen/Begleiter, Favoriten/History und Synchronisierung mit Legacyaktionen ist der nächste Integrationsabschnitt 3.4.2. Die neue Standfigur wird in diesem Schritt ausdrücklich als Editor-Anprobe angezeigt, die bisherige Hauptdarstellung bleibt aktiv. Physische Geräte-/GPU-/VoiceOver-/Alt-PWA-Abnahme und finale Grafik bleiben offen. Vertrag: AVATAR_OUTFIT_EDITOR.md.

- [x] Tatsächlicher Studioeinstieg ohne automatische Writes; vorhandene Favoriten und Legacydarstellung erhalten.
- [x] Sichtbare Save-/Recoverykontrollen, Erfolg erst nach Commit, frische Folgequelle, unverdiente Anprobe bleibt korrigierbar.
- [x] Realer Tabkonflikt behält Entwurf/sperrt Save; ausdrückliches Aktualisieren rebasiert Auswahl und erlaubt sicheren Folgesave.
- [x] Lokale andere Einträge und Änderungen während Lesen geschützt, bestehende vollständige JSON-Sicherung erreichbar.
- [x] Schließen/Wiederöffnen behält Entwurf; ungespeicherter Entwurf sperrt dauerhafte Rücknahme. Kein Autosave oder automatische Konfliktwiederholung.
- [x] DE/EN, native Dialog-/Tastaturbedienung, 320/390/430 px, 44 px, Textsicherheit und fehlgeschlagene Integrität mit Retry.
- [x] Kalte Offline-Seite öffnet geprüfte Vorschau und bedient Save/Reload/Recovery über tatsächlichen Worker/IndexedDB.
- [x] 24 Grafiklieferdateien reproduziert, bisherige App-/Atelier- und Speicherprüfung erfolgreich; drei UI-Screenshots gesichtet/archiviert.
- [ ] Neue Hauptavatarroute, persönliche Darstellung/Szenen/Begleiter/Favoriten/History und Legacy-Aktionssynchronisierung.
- [ ] Physische Geräte/GPU/VoiceOver/Alt-PWA-Upgrade, finale Premiumgrafik und freigegebene Veröffentlichung.

## Etappe 4 · Paket 4.16 Bambusflasche

- [x] `water-1` gegen das Original-Artbookmotiv geprüft: grünes Bambusrohr, Goldfassungen, Trageschnur und Quaste.
- [x] Transparentes Einzelmodul mit SHA-256, Bytezahl und realen PNG-Maßen gebunden.
- [x] Eigene Passform auf Form A und B; vollständige Silhouette innerhalb der Bühne, neutrale Hände unverändert.
- [x] Einzelrendering und 32-Modul-Übergang mit vollständigem Cardio, Schritte und Beweglichkeit auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-water-v14.json`; archivierte Ansichten: `design/avatar/review-premium-water-v14/`.

## Etappe 4 · Paket 4.17 Lackflasche

- [x] `water-2` gegen die Artbookkarte geprüft: dunkler Lackkörper, roter Halsrand, Goldkordel, Seitenschlaufe, Quaste und helle Goldblüten.
- [x] Transparentes Einzelmodul mit SHA-256, Bytezahl und realen PNG-Maßen gebunden.
- [x] Eigene versetzte Passform auf Form A und B; vollständige Silhouette und neutrale Hände erhalten.
- [x] Bambus- und Lackflasche gemeinsam als zwei unabhängige, sichtbare und sortierbare Module gerendert.
- [x] 33-Modul-Übergang mit vollständigem Cardio, Schritte und Beweglichkeit auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-water-v15.json`; archivierte Ansichten: `design/avatar/review-premium-water-v15/`.

## Etappe 4 · Paket 4.18 Kristallfeldflasche

- [x] `water-3` gegen die Artbookkarte geprüft: hellblauer Facettenkörper, Kristallverschluss, Goldnetz, Kordelschlaufe und helle Quaste.
- [x] Transparentes Einzelmodul mit SHA-256, Bytezahl und realen PNG-Maßen gebunden.
- [x] Eigene Passform auf Form A und B; dritte versetzte Position erhält alle vollständigen Silhouetten und neutrale Hände.
- [x] Erste drei Wasserartikel gemeinsam als drei unabhängige, sichtbare und sortierbare Module gerendert.
- [x] 34-Modul-Übergang mit vollständigem Cardio, Schritte und Beweglichkeit auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-water-v16.json`; archivierte Ansichten: `design/avatar/review-premium-water-v16/`.

## Etappe 4 · Paket 4.19 Zeremonielle Wasserkalebasse

- [x] `water-4` gegen die Artbookkarte geprüft: elfenbeinfarbene Doppelkalebasse, Goldblüten, Goldkordel, goldene Quaste und grüner Anhänger.
- [x] Transparentes Einzelmodul mit SHA-256, Bytezahl und realen PNG-Maßen gebunden.
- [x] Eigene äußere Passform auf Form A und B; vollständige Kalebasse, beide Quasten und neutrale Hände erhalten.
- [x] Erste vier Wasserartikel gemeinsam als vier unabhängige, sichtbare und sortierbare Module gerendert.
- [x] 35-Modul-Übergang mit vollständigem Cardio, Schritte und Beweglichkeit auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-water-v17.json`; archivierte Ansichten: `design/avatar/review-premium-water-v17/`.

## Etappe 4 · Paket 4.20 und Wasser-Familienabnahme

- [x] `water-5` gegen die Artbookkarte geprüft: dunkles Goldgefäß, jadefarbener Drachenkopf und transparenter Wasserbogen.
- [x] Gefäß und offener Drachen-/Wassereffekt als zwei getrennte transparente, hashgebundene Module umgesetzt.
- [x] Einzelrendering auf Form A und B; offene Effektmitte erhält Figur, Haare und Kleidung.
- [x] Alle fünf Wasserartikel gemeinsam als sechs unabhängige, sichtbare und sortierbare Module gerendert.
- [x] 37-Modul-Übergang mit vollständigem Cardio, Schritte und Beweglichkeit auf beiden Körperformen.
- [x] 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, Mehrfachoutfit, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-water-v18.json`; archivierte Ansichten: `design/avatar/review-premium-water-v18/`.

## Etappe 4 · Paket 4.21 Mond-Haarnadel

- [x] `sleep-1` gegen die Artbookkarte geprüft: Goldmond, Sternpunkte, Kirschblüten und hängende violette Glyzinie.
- [x] Goldstifte als hintere und sichtbarer Schmuck als vordere transparente, hashgebundene Haarebene umgesetzt.
- [x] Erste Sichtprüfung erkannte Gesichtsüberdeckung; korrigierte seitliche Passform hält Augen, Gesicht und Mimik auf Form A und B frei.
- [x] Einzelrendering und 39-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit und Wasser auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Frisuren/Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sleep-v19.json`; archivierte Ansichten: `design/avatar/review-premium-sleep-v19/`.

## Etappe 4 · Paket 4.22 Traumkissen-Talisman

- [x] `sleep-2` gegen die Artbookkarte geprüft: dunkelblaues Kissen, Goldfassung und -kordel, weißer Mondhase, Blüten und Wellenstickerei.
- [x] Transparentes, hashgebundenes Einzelmodul mit eigener Passform für Form A und B umgesetzt.
- [x] Kordel an der rechten Hand registriert; Finger, Kissen, Hakama und vorhandene Hüftaccessoires bleiben getrennt lesbar.
- [x] Beide Schlafartikel gemeinsam als drei Module und im 40-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit und Wasser auf beiden Körperformen gerendert.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sleep-v20.json`; archivierte Ansichten: `design/avatar/review-premium-sleep-v20/`.

## Etappe 4 · Paket 4.23 Nacht-Haori

- [x] `sleep-3` gegen die Artbookkarte geprüft: mitternachtsblauer Haori, elfenbeinfarbenes offenes Revers, Goldkanten, Nachtblüten, Wolken und Sternpunkte.
- [x] Rückensilhouette und sparsame Vorderflächen als zwei transparente, hashgebundene Tiefenmodule umgesetzt.
- [x] Eigene Passform für Form A und B; Gesicht, Kimono, Obi, Hände und Hakama bleiben durch die offene Mitte sichtbar.
- [x] Tatsächliche Vorderflächen maskieren Armartikel; 1.105 veränderte Maskenpixel im realen Browserrendering bestätigt.
- [x] Die ersten drei Schlafartikel gemeinsam als fünf Module und im 42-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit und Wasser gerendert.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sleep-v21.json`; archivierte Ansichten: `design/avatar/review-premium-sleep-v21/`.

## Etappe 4 · Paket 4.24 Mondlaterne

- [x] `sleep-4` gegen die Artbookkarte geprüft: antikgoldener sechseckiger Rahmen, warmes Elfenbeinlicht, Mondsichel, Sternöffnungen und seitliche Blütenranke.
- [x] Transparentes, hashgebundenes Einzelmodul mit Zierknauf, dunkelblauer Quaste und eigener Passform für Form A und B umgesetzt.
- [x] Erste Sichtprüfung erkannte eine scheinbare Ärmelaufhängung; korrigierte Registrierung sitzt an der rechten Obi-Kante und erhebt keinen Handgriffanspruch.
- [x] Laterne, Traumkissen und vorhandene Hüftartikel bleiben auf beiden Formen getrennt lesbar.
- [x] Die ersten vier Schlafartikel gemeinsam als sechs Module und im 43-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit und Wasser gerendert.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sleep-v22.json`; archivierte Ansichten: `design/avatar/review-premium-sleep-v22/`.

## Etappe 4 · Paket 4.25 und Schlaf-Familienabnahme

- [x] `sleep-5` gegen die Artbookkarte geprüft: warmer Vollmond, mitternachtsblauer Nachthimmelbogen, Sterne, helle Wolken-/Windbänder und Kirschblüten.
- [x] Fremde Meditationssilhouette bewusst ausgeschlossen; persönliche KONPASU-Figur bleibt einzige zentrale Figur.
- [x] Transparentes, hashgebundenes Hintergrundmodul mit identischer stabiler Registrierung auf Form A und B umgesetzt.
- [x] Große offene Mitte erhält Gesicht, Mimik, Körper, Kleidung, Ausrüstung und Füße auf beiden Formen.
- [x] Alle fünf Schlafartikel gemeinsam als sieben unabhängige, sichtbare und sortierbare Module gerendert.
- [x] 44-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit und Wasser auf beiden Körperformen.
- [x] 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, Mehrfachoutfit, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sleep-v23.json`; archivierte Ansichten: `design/avatar/review-premium-sleep-v23/`.

## Etappe 4 · Paket 4.26 Bento-Anhänger

- [x] `nutrition-1` gegen die Artbookkarte geprüft: mitternachtsblaues Bento-Täschchen, Goldfassung und -schlaufe, Blüten, helle Quaste, Nori-Onigiri und Hasen-Reisbällchen.
- [x] Transparentes, hashgebundenes Einzelmodul mit eigener Passform für Form A und B umgesetzt.
- [x] Schlaufe an der linken Obi-Kante registriert; beide Hände bleiben neutral.
- [x] Bento bleibt neben Bambus-/Lackflasche und weiteren Hüftartikeln als eigener Artikel lesbar.
- [x] Einzelrendering und 45-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser und Schlaf auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-nutrition-v24.json`; archivierte Ansichten: `design/avatar/review-premium-nutrition-v24/`.

## Etappe 4 · Paket 4.27 Kräuterbeutel

- [x] `nutrition-2` gegen die Artbookkarte geprüft: waldgrüne Seide, elfenbeinfarbener Zugverschluss, Goldkordel, Quasten, Jadeperle und botanische Stickerei.
- [x] Transparentes, hashgebundenes Einzelmodul mit eigener Passform für Form A und B umgesetzt.
- [x] Links außen neben `nutrition-1` registriert; Hand, Obi, Kräuterbeutel und Bento bleiben getrennt lesbar.
- [x] Beide Ernährungsartikel gemeinsam als zwei unabhängige, sichtbare und sortierbare Module gerendert.
- [x] Einzelrendering und 46-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser und Schlaf auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-nutrition-v25.json`; archivierte Ansichten: `design/avatar/review-premium-nutrition-v25/`.

## Etappe 4 · Paket 4.28 Vitalitäts-Obi

- [x] `nutrition-3` gegen die Artbookkarte geprüft: waldgrün-elfenbeinfarbene Seide, Blatt-/Blütenmotive, Goldkanten, Blütenknoten und helle Quasten.
- [x] Zwei transparente, hashgebundene Module für Taillengürtel und vorderen Knoten mit eigener Passform für Form A und B umgesetzt.
- [x] Gürtel schließt die Taille; Knoten, Stoffbahnen und Quasten bleiben vor dem Gürtel lesbar und beide Hände frei.
- [x] Bento-Anhänger, Kräuterbeutel und Vitalitäts-Obi gemeinsam als vier unabhängige, sichtbare und sortierbare Module gerendert.
- [x] Einzelrendering und 48-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser und Schlaf auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-nutrition-v26.json`; archivierte Ansichten: `design/avatar/review-premium-nutrition-v26/`.

## Etappe 4 · Paket 4.29 Kochgelehrten-Haori

- [x] `nutrition-4` gegen die Artbookkarte geprüft: offene helle Jacke, grünes Futter, Ernte-/Kräutermotive und dunkelgrüne Schürze mit goldenen Kochutensilien.
- [x] Drei transparente, hashgebundene Module für Rückengewand, Vordergewand und Schürze mit eigener Passform für Form A und B umgesetzt.
- [x] Zu hohen Erstkragen verworfen; korrigierte tiefe Halsöffnung hält Gesicht, Kinn und Hals vollständig frei.
- [x] Offene Mitte erhält Grundkleidung und Obi; Hände bleiben frei und nur tatsächlicher Vorderstoff maskiert Armartikel.
- [x] Erste vier Ernährungsartikel gemeinsam als sieben unabhängige, sichtbare und sortierbare Module gerendert.
- [x] Einzelrendering und 51-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser und Schlaf auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, warmer Offlinezustand, 59 Kataloggruppen und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-nutrition-v27.json`; archivierte Ansichten: `design/avatar/review-premium-nutrition-v27/`.

## Etappe 4 · Paket 4.30 und Ernährungs-Familienabnahme

- [x] `nutrition-5` gegen die Artbookkarte geprüft: dunkelgrün-goldenes Reisährenemblem, Blüten und orangefarbener Kürbis; vertragliche Reisschale als getrenntes tragbares Modul erhalten.
- [x] Drei transparente, hashgebundene Module für Emblem, Reisschale und Kürbis mit eigener Passform für Form A und B umgesetzt.
- [x] Zunächst verdecktes Emblem in den freien rechten Hintergrund versetzt; Goldring und Reisähren bleiben klar lesbar.
- [x] Reisschale und Kürbis bleiben getrennte Obi-Accessoires; Hände und vorherige Ernährungsartikel bleiben frei.
- [x] Alle fünf Ernährungsartikel gemeinsam als zehn unabhängige, sichtbare und sortierbare Module gerendert.
- [x] 54-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser und Schlaf auf beiden Körperformen.
- [x] 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, Mehrfachoutfit, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-nutrition-v28.json`; archivierte Ansichten: `design/avatar/review-premium-nutrition-v28/`.

## Etappe 4 · Paket 4.31 Zucker-Siegel-Omamori

- [x] `sugar-1` gegen die Artbookkarte geprüft: dunkelgrünes Omamori, Gold-/Blütenornament, rote Kordel und diagonal gesperrtes Zuckersiegel.
- [x] Textfreies, markenneutrales Zuckerkristallsymbol ohne erfundene Produkt- oder Gesundheitsangabe umgesetzt.
- [x] Transparentes, hashgebundenes Einzelmodul mit eigener Passform für Form A und B umgesetzt.
- [x] Zunächst gelöste Position näher an die rechte Hüftseite verschoben; beide Hände bleiben neutral.
- [x] Einzelrendering und 55-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser, Schlaf und Ernährung auf beiden Körperformen.
- [x] 95-Artikel-Stresstest, unabhängige Sichtbarkeit/Reihenfolge, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sugar-v29.json`; archivierte Ansichten: `design/avatar/review-premium-sugar-v29/`.

## Etappe 4 · Paket 4.32 Reinheitsarmband

- [x] `sugar-2` gegen die Artbookkarte geprüft: helle Perlen, einzelne Jadeperle, Goldknoten, Quaste und Blattornament.
- [x] Transparentes, hashgebundenes Einzelmodul mit eigener Passform am linken Handgelenk für Form A und B umgesetzt.
- [x] Anatomische Verdeckung durch tatsächliche Kimono-/Außenkleidungspixel geprüft; der Artikel bleibt ausgewählt.
- [x] `sugar-1` und `sugar-2` gemeinsam als zwei unabhängige Module auf beiden Körperformen geprüft.
- [x] 56-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser, Schlaf und Ernährung auf beiden Körperformen.
- [x] 65 Katalogprüfungen, 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Weitere Posen, App-/Kalt-Offlineintegration, physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sugar-v30.json`; archivierte Ansichten: `design/avatar/review-premium-sugar-v30/`.

## Etappe 4 · Paket 4.33 Helles Lächeln

- [x] `sugar-3` gegen die Artbookkarte geprüft: drei freundliche erwachsene Gesichter, geschlossene lächelnde Augen und variierte Kopfstellungen.
- [x] Transparentes, hashgebundenes Premium-Triptychon mit Elfenbein-/Goldrahmen, Jadeblättern und Blüten umgesetzt.
- [x] Erste auf Form B abgeschnittene Registrierung korrigiert; alle drei Porträts bleiben auf beiden Körperformen vollständig sichtbar.
- [x] Ehrliche Mimikstudie neben dem Kopf; kein ungeprüftes Überschreiben der bestehenden Gesichtsanatomie.
- [x] `sugar-1` bis `sugar-3` gemeinsam als drei unabhängige Module auf beiden Körperformen geprüft.
- [x] 57-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser, Schlaf und Ernährung auf beiden Körperformen.
- [x] 67 Katalogprüfungen, 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Vollständige austauschbare Gesichtslayer, weitere Posen, App-/Kalt-Offlineintegration, physische Geräte und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sugar-v31.json`; archivierte Ansichten: `design/avatar/review-premium-sugar-v31/`.

## Etappe 4 · Paket 4.34 Lotusfächer

- [x] `sugar-4` gegen die Artbookkarte geprüft: tiefgrüne Fächerseide, helle Lotusblüten und Goldrippen.
- [x] Transparentes, hashgebundenes Premiummodul mit botanischer Goldzeichnung, Jadeperle und Elfenbeinquaste umgesetzt.
- [x] Eigene Passform am linken Obi für Form A und B; neutrale Hände und ehrliche fehlende Griffpose erhalten.
- [x] `sugar-1` bis `sugar-4` gemeinsam als vier unabhängige Module auf beiden Körperformen geprüft.
- [x] 58-Modul-Übergang mit vollständigem Cardio, Schritte, Beweglichkeit, Wasser, Schlaf und Ernährung auf beiden Körperformen.
- [x] 69 Katalogprüfungen, 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Spätere Griffpose, weitere Posen, App-/Kalt-Offlineintegration, physische Geräte und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sugar-v32.json`; archivierte Ansichten: `design/avatar/review-premium-sugar-v32/`.

## Etappe 4 · Paket 4.35 und Zuckerbalance-Familienabnahme

- [x] `sugar-5` gegen die Artbookkarte geprüft: offene jadegrüne Strömung, Goldbögen, Lichtpartikel und helle Lotusblüten.
- [x] Hintergrundwirbel und flaches Lotus-Podest als zwei transparente, hashgebundene Premiummodule umgesetzt.
- [x] Große transparente Mitte, freie Figur und Podestregistrierung unter den Füßen auf Form A und B geprüft.
- [x] Alle fünf Zuckerbalance-Kandidaten gemeinsam als sechs unabhängige Module auf beiden Körperformen geprüft.
- [x] Cardio, Schritte, Beweglichkeit, Wasser, Schlaf, Ernährung und Zuckerbalance gemeinsam als 60 Module auf beiden Körperformen geprüft.
- [x] 71 Katalogprüfungen, 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Vollständige Gesichtslayer für `sugar-3`, weitere Posen, App-/Kalt-Offlineintegration, physische Geräte und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-sugar-v33.json`; archivierte Ansichten: `design/avatar/review-premium-sugar-v33/`.

## Etappe 4 · Paket 4.36 Versiegelter Sake-Anhänger

- [x] `alcohol-1` gegen die Artbookkarte geprüft: helles Doppelgefäß, versiegelter Hals, Goldschnur und Glocke.
- [x] Transparentes, hashgebundenes Premiummodul mit botanischer Keramik, Knoten, Quaste und textfreiem Sperrsymbol umgesetzt.
- [x] Zwei unterarmnahe Registrierungen korrigiert; Schlaufe beginnt am linken Obi, Hand und Unterarm bleiben frei.
- [x] Einzelrendering und 61-Modul-Übergang mit sieben vollständigen Premiumfamilien auf beiden Körperformen.
- [x] 73 Katalogprüfungen, 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Spätere Griffpose, weitere Posen, App-/Kalt-Offlineintegration, physische Geräte und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-alcohol-v34.json`; archivierte Ansichten: `design/avatar/review-premium-alcohol-v34/`.

## Etappe 4 · Paket 4.37 Nüchternheitslaterne

- [x] `alcohol-2` gegen die Artbookkarte geprüft: helle rechteckige Rahmenlaterne mit botanischem Motiv.
- [x] Transparentes, hashgebundenes Premiummodul mit mitternachtsblau-goldenem Rahmen, Elfenbeinpapier, Zweig, Kette und blauer Quaste umgesetzt.
- [x] Unterarmnahe Erstregistrierung korrigiert; Ring beginnt am rechten Obi, Hand und Unterarm bleiben frei.
- [x] `alcohol-1` und `alcohol-2` gemeinsam als zwei unabhängige Module auf beiden Körperformen geprüft.
- [x] 62-Modul-Übergang mit sieben vollständigen Premiumfamilien auf beiden Körperformen.
- [x] 75 Katalogprüfungen, 190 Einzelrenderings, 19 Familienblätter, 95-Artikel-Stressauswahl, warmer Offlinezustand und null Browser-Speicherwrites.
- [ ] Spätere Griffpose, weitere Posen, App-/Kalt-Offlineintegration, physische Geräte und Produktionsfreigabe.

Beleg: `design/avatar/verification-premium-alcohol-v35.json`; archivierte Ansichten: `design/avatar/review-premium-alcohol-v35/`.


## Abschluss Etappe 3.4.2: persönlicher Hauptavatar mit Mehrfachoutfit

**388 Regressionen (22 neu), 12 neue Hauptavatar-Browsergruppen, 12 bestehende Editorgruppen, 13 Speichergruppen sowie 10 App-/26 Ateliergruppen erfolgreich** für `d4d2948033ca6e102c2928b398ca0055023e9bb5`: [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771908), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771935), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41629772026), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771846). Vier tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-main-avatar-v01/` archiviert; vollständiger Beleg `design/avatar/verification-main-avatar-v01.json`. Nur synthetische Daten, kein privates Browserprofil, kein Deployment. Der nachfolgende Archivcommit enthält ausschließlich Dokumentation und Belege.

- [x] Tatsächlicher Editor-Save zeigt sämtliche tragbaren sichtbaren Identitäten in Hauptavatar und Home; gleicher Slot/Grafik ersetzt keine Auswahl.
- [x] Persönlicher Körper, optionale Maße (Regression), Haare/Farbe, Mimik, Gewandfarbe, Szene und belegte Begleiterform bleiben sichtbar.
- [x] Normales Neuladen und frischer Offline-Home-/Studio-Start durch tatsächlichen Worker/IndexedDB; keine Artbook-Vorschauöffnung erforderlich.
- [x] Ordnung/Ausblenden erst nach Save am Hauptavatar; ruhende/remappte Wünsche roh erhalten, keine stille neue Zuordnung.
- [x] Inventar schaltet nur eine Identität; Gesamtausrüstung/alte Favoriten pausieren ohne Löschen, Editor kann reaktivieren.
- [x] Neue Favoriten zeigen eigene Mehrfachauswahl, alte erben keine aktuelle; Begleiter synchron, künftige Formate geschützt.
- [x] Historische Quelle mit damaliger Personalisierung/Szene/Begleiter; fehlende Vergangenheit übernimmt keine heutige Auswahl.
- [x] Fehlende Rewardgrafik zeigt vollständige persönliche Basis mit Hinweis; transparente Home-Layer und volle Fallbackbreite zusätzlich geprüft.
- [x] DE/EN, 320/390/430px und vier tatsächliche Screenshots gesichtet; reine Projektion schreibt keine Nutzerdaten.
- [ ] Neue Artbook-Hauptfigur mit vollständigen persönlichen Haar-/Mimik-/Körpervarianten und finaler Passform.
- [ ] Automatische lückenlose historische Schnappschüsse jeder Editor-Speicherung samt eigenem Speichervergleich/Rückweg.
- [ ] Historische Zielkonfiguration, physisches iPhone/GPU/VoiceOver, bestehende Alt-PWA-Upgrades und freigegebene Veröffentlichung.


## Abschluss Etappe 3.4.3a: persönliche Artbook-Anprobe

**402 Regressionen (14 neu), 11 neue persönliche Browsergruppen, 12 Hauptavatar-, 12 Editor-, 13 Speicher- sowie 10 App-/26 Ateliergruppen erfolgreich** für `dedbfedb4dbd6eb96f51a3d12b977f4fcfbc6a4a`: [Varianten/Passform](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882331), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882613), [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882357), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882476), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882422). Fünf tatsächlich im Browser erzeugte Bilder gesichtet und unverändert unter `design/avatar/review-personal-variants-v11/` archiviert; Vollbeleg `design/avatar/verification-personal-variants-v11.json`. Nur synthetische Daten, kein privates Browserprofil, kein Main-Merge/Deployment. Der folgende Archivcommit enthält ausschließlich Dokumentation und Belege.

- [x] Tatsächlicher Opt-in im Editor; Ausgangswerte aus bestehendem Profil, keine Körperform aus Geschlecht/Maßen abgeleitet.
- [x] Neun SHA-geprüfte Kopf-/Haarzeichnungen, alte Gesichtspixel vollständig ausgespart, Haut ohne Haar-/Gewandfilter.
- [x] 162 persönliche Kombinationen auf beiden Formen mit Startset gerendert; Körper-/Ausrüstungsgeometrie stabil, alle IDs eindeutig, Kopfteil-Tiefenordnung geprüft.
- [x] Drei Gesichtsausdrücke und Haarfarben unterscheiden sich in tatsächlichen Pixeln; neun Kopfteil-/Mimikansichten und sechs Ganzkörperansichten gesichtet.
- [x] Alle 95 Artikelidentitäten auf beiden Körpern komponiert, keine neue Freischaltung oder Profilspeicherung.
- [x] Ausschalten stellt ursprüngliche Haare/Kopf/Gewandfilter wieder her; Outfit-Save übernimmt keine persönlichen Studienwerte.
- [x] Original-/Delivery-Pixelvergleich Alphafehler 0, Farb-RMSE 1,802745; Original-PNG unverändert und Delivery lokal bytegleich reproduziert.
- [x] Sichtbare DE/EN-/44px-Regler und 320/390/430px; kalte Offline-Erstaktivierung/Reload, Integritätsfehler und ausdrücklicher Retry.
- [x] Bestehende App-/Atelier-/Editor-/Hauptavatar-/Speicherprüfungen weiterhin erfolgreich; fünf Originalbilder archiviert.
- [ ] Vollständige persönliche Körper-/Gesichts-/Hautbandbreite und finale handgemalte Gewand-/Haarpaletten.
- [ ] Bestätigte dauerhafte persönliche Übernahme mit Feldvergleich/Rückweg und neue Hauptavatarroute samt Szenen/Begleitern.
- [ ] Universelle Premium-Passform aller Kombinationen, physisches iPhone/GPU/VoiceOver/Alt-PWA und Veröffentlichung.


## Abschluss Etappe 3.4.3b: persönliche Save-/Rücknahme- und Hauptansichtprüfung

438 Regressionen (36 neu), 15 neue Browsergruppen und bestehende App-/26 Atelier-/12 Editor-/13 Speicher-/12 SVG-Hauptavatar-/11 Variantenprüfungen erfolgreich für `0f72f4713487fb014a03d637e4a3f1b4624435e9`. [Neue Browserprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814087), [Regression/App](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814128). Alle weiteren Run-/Job-IDs, SHA-256 der fünf gesichteten unveränderten Bilder und Grenzen: `design/avatar/verification-artbook-main-settings-v01.json`. Ausschließlich synthetische Daten, kein Deployment, keine unaufgefangenen Seitenfehler.

- [x] Tatsächliches persönliches Save schreibt nur ausdrücklich geänderte Werte; unbekannte andere Profilwerte, Ziele, Trainings, Outfit und unabhängige Recovery bleiben erhalten.
- [x] Save/Recovery überleben Reload. Rücknahme erhält spätere Namen/Notizen/Trainings, prüft erwartetes Token und unveränderte Zielfelder.
- [x] Quellen-/Diskkonflikt sperrt Save, behält Anprobe; Dreiwegevergleich übernimmt unberührte Remoteänderungen und verlangt bei gleichem konkurrierendem Feld ausdrückliche neue Auswahl.
- [x] Andere ungespeicherte Appdaten verhindern Refresh; späterer gewöhnlicher Save ermöglicht sicheren Abgleich ohne Entwurfsverlust.
- [x] Opake künftige Formate/Recovery einschließlich verschachtelter künftiger Ansichtsbelege bleiben erhalten; veraltete Queue-Snapshots setzen persönliche Save-/Rücknahmefelder nicht zurück.
- [x] Separate Artbook-Aktivierung braucht gespeichertes Outfit, saubere Anprobe und geprüfte Grafik; SVG-Rückweg und gezielte Ansichts-Rücknahme erhalten Outfit und Persönlichkeit.
- [x] Tatsächliche Studio-/Home-Ansicht erhält gültige gespeicherte Identitäten, persönliche Ebenen, neun Szenen, echten verdienten Shiba und Maßtransformation aller Figurteile.
- [x] Ruhende/remappte Artikel, gesperrte Begleiter und gesperrte Anprobe erzeugen weder Besitz noch automatische Profilbereinigung.
- [x] Neuer Favorit verwendet eigene Artbook-Quelle, alter erbt kein heutiges Outfit; bestehender vollständiger historischer Look liest nur eigene Daten, fehlende Vergangenheit bleibt unabhängig.
- [x] SHA-fehlerhafte Grafik behält komplette persönliche SVG-Figur, kein halbes Artbook; Retry schreibt nichts. Frischer kalter Offline-Neustart/Reload mit echtem Worker und IndexedDB bestanden.
- [x] Echte Export-/Bestätigungsimport-UI erhält Ansicht, persönliche Werte, beide Rücknahmen, Outfit und unbekannte Felder.
- [x] Echter IndexedDB-Put-Fehler setzt nur Transaktionsfelder zurück, erhält spätere fremde Memorynotiz und bisherigen Diskstand; bestehender Schreibschutz wird aktiv.
- [x] 320/390/430px und DE/EN, geschlossene Home-Atlasfenster, deckende Hintergrund-Eckpixel, vollständige Figur/Begleiter und erreichbarer Home-Button in Originalbildern geprüft.
- [ ] Automatische vollständige historische Schnappschüsse für alle neuen Save-/Rücknahmeaktionen plus letzte Inventar-/Favoriten-/Legacy-Integrationsabnahme (3.4.4).
- [ ] Vollständige persönliche Körper-/Gesichts-/Hautbandbreite, endgültige Premiumfarben/-zeichnungen und universelle optische Passform.
- [ ] Physisches iPhone/GPU/VoiceOver/Alt-PWA-Upgrade, Review/Freigabe und Veröffentlichung.

## Abschluss Etappe 3.4.4: vollständige Historie und Gesamtintegration

Geprüfter Quellstand `0749e4527c6fd1a847f373af0476dc0c42f13cd6`. 445 Regressionen und alle sieben Browser-Workflows erfolgreich. Vollbeleg `design/avatar/verification-stage3-complete-v01.json`; Vertrag AVATAR_HISTORY_STAGE3.md.

- [x] Outfit-Save/-Rücknahme erzeugen je einen vollständigen resultierenden Profilschnappschuss.
- [x] Persönliche Save-/Rücknahme und Artbook-/SVG-Ansichtswahl/-Rücknahme erzeugen je einen vollständigen resultierenden Profilschnappschuss.
- [x] No-op, ungültige/stale Quelle, Revisionskonflikt und fehlgeschlagener DB-/Fallback-Write erzeugen keinen Schnappschuss.
- [x] Schreibfehler entfernt nur den vorbereiteten eigenen Eintrag; gleichzeitig entstandene fremde Historie bleibt erhalten.
- [x] Hinter Avatartransaktionen wartender gewöhnlicher Save kann neue Historie, Outfit- oder persönliche Felder nicht zurücksetzen.
- [x] Alte sparsame Historie bleibt importierbar und unverändert; fehlende Vergangenheit wird nicht aus heutigen Daten erfunden.
- [x] Identisches Datum und UTC-Timestamp wählen deterministisch den zuletzt angehängten Eintrag.
- [x] JSON-Export/Bestätigungsimport, Reload, kalter Offline-Neustart, echte IndexedDB, Fallback-CAS und Zweitabkonflikte erhalten die Historie.
- [x] Inventar, unabhängige Mehrfachartikel, Sichtbarkeit/Reihenfolge, Personalisierung, Hauptansicht, Szenen, Begleiter, Favoriten und bestehende historische Quellen gemeinsam geprüft.
- [x] Kritischer Offline-Precache enthält den neuen Historienvertrag; Releaseversion 2.4.1 und eigener Cache `konpasu-offline-v241`.
- [x] Main-Merge `ee160643515cf89dbc5c1bde38245ea3210052e2`, Pages-Lauf 41648613896, öffentliches `version.json` und fünf Kernressourcen mit HTTP 200 sowie exakt lokalen SHA-256 bestätigt.
- [ ] Physisches iPhone/GPU/VoiceOver und Upgrade einer bereits installierten alten PWA prüfen; Daten nicht löschen.


## Etappe 4 · Paket 4.38 Heiter und gelassen

- [x] `alcohol-3` gegen die Artbookkarte geprüft: drei ruhige, freundliche Ausdrücke derselben erwachsenen Figur.
- [x] Zusammenhängende Dreierstudie, elfenbein-goldene Rahmen und blaue Wolkenakzente als transparentes Premiummodul umgesetzt und hashgebunden.
- [x] Körperformspezifische Registrierung hält die Studie links neben dem Kopf vollständig sichtbar und von der Zucker-Mimikstudie rechts getrennt.
- [x] Das Modul bleibt eine unabhängige Sammelstudie und überschreibt weder Avatar-Gesicht noch persönliche Mimik.
- [x] `alcohol-1` bis `alcohol-3` gemeinsam als drei unabhängige Module auf beiden Körperformen geprüft.
- [x] 63-Modul-Übergang, 95-Artikel-Stressauswahl, Sichtbarkeit, Reihenfolge und warmer Offlinezustand geprüft.
- [x] 77 Katalogprüfungen, 190 Einzelrenderings und 19 Familienblätter bestanden; null Speicherwrites und keine unaufgefangenen Seitenfehler.
- [ ] Austauschbare/animierte Gesichtsanatomie, andere Posen, physische Geräte, VoiceOver, GPU-/Peak-Memory sowie kalte PWA-/Upgrade-Abnahme.


## Etappe 4 · Paket 4.39 Klarhimmel-Obi

- [x] `alcohol-4` gegen die Artbookkarte geprüft: hellblau-elfenbeinfarbener Obi, dunkelblaue Faltenkanten, Goldschleife und helle Bandenden.
- [x] Körpernaher Gürtel und vordere Schleife als zwei getrennte transparente, hashgebundene Premiummodule umgesetzt.
- [x] Wolken-/Blütenmotive, antikgoldene Paspel, Goldkordel und Elfenbeinquasten erhalten.
- [x] Eigene Passformen schließen die Taille auf Form A und B; Schleife und Enden bleiben vollständig im Bild, Hände und Gesicht unverändert.
- [x] `alcohol-1` bis `alcohol-4` gemeinsam als fünf unabhängige Module auf beiden Körperformen geprüft.
- [x] 65-Modul-Übergang, natürliche Tiefenüberlagerung, 95-Artikel-Stressauswahl, Sichtbarkeit, Reihenfolge und warmer Offlinezustand geprüft.
- [x] 79 Katalogprüfungen, 190 Einzelrenderings und 19 Familienblätter bestanden; null Speicherwrites und keine unaufgefangenen Seitenfehler.
- [ ] Andere Posen, physische Geräte, VoiceOver, GPU-/Peak-Memory sowie kalte PWA-/Upgrade-Abnahme.


## Etappe 4 · Paket 4.40 Klares Fest und Alkoholbalance-Familienabnahme

- [x] `alcohol-5` gegen die Artbookkarte geprüft: klare Berglandschaft, ruhige Feststraße, Torii, Kirschblüten und warme Laternen.
- [x] Landschaft, Torii und seitliche Markt-/Laternenstraße als drei getrennte transparente, hashgebundene Premiummodule umgesetzt.
- [x] Zentrale Toröffnung und Weg halten die persönliche Figur auf Form A und B vollständig lesbar; keine fremde Figur oder erfundene Schrift.
- [x] Alle fünf Alkoholbalance-Kandidaten gemeinsam als acht unabhängige Module auf beiden Körperformen geprüft.
- [x] Vollständiger 68-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser, Schlaf, Ernährung und Zuckerbalance bestanden.
- [x] Einzelrendering, unabhängige Sichtbarkeit/Reihenfolge, natürliche Szenenüberlagerung, 95-Artikel-Stressauswahl und Mehrfachoutfitlauf bestanden.
- [x] 81 Katalogprüfungen, 190 Einzelrenderings und 19 Familienblätter bestanden; null Speicherwrites und keine unaufgefangenen Seitenfehler.
- [ ] Andere Posen, physische Geräte, VoiceOver, GPU-/Peak-Memory sowie kalte PWA-/Upgrade-Abnahme.


## Etappe 4 · Paket 4.41 Buch-Anhänger

- [x] `reading-1` gegen die Artbookkarte geprüft: dunkelgrüner Miniaturbuchkörper, Goldfassung, helle Kirschblüte, Schlaufe und Quaste.
- [x] Transparentes Premiummodul ohne erfundene Schrift hashgebunden umgesetzt.
- [x] Körperformspezifische Registrierung beginnt am linken Obi; Buch und Quaste bleiben vollständig sichtbar, beide Hände neutral.
- [x] Keine ungetestete Griffpose und kein Anspruch auf ein geöffnetes lesbares Buch.
- [x] Einzelmodul auf Form A und B sowie 69-Modul-Übergang mit acht vollständigen Premiumfamilien geprüft.
- [x] 95-Artikel-Stressauswahl, Sichtbarkeit, Reihenfolge und warmer Offlinezustand bestanden.
- [x] 83 Katalogprüfungen, 190 Einzelrenderings und 19 Familienblätter bestanden; null Speicherwrites und keine unaufgefangenen Seitenfehler.
- [ ] Andere Posen, physische Geräte, VoiceOver, GPU-/Peak-Memory sowie kalte PWA-/Upgrade-Abnahme.
