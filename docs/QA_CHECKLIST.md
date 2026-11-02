# KONPASU – Prüfkriterien und Release-Gate

Stand 02.11.2026: 2.4.0 ist veröffentlicht und in Chromium geprüft. Der neue Artbook-Avatar bleibt separat im Entwicklungsatelier / Entwurfs-PR #3. Echte iPhone-/VoiceOver-/Alt-PWA-Abnahme ist weiter offen. Historische Prüflisten stehen unter ihren damaligen Abschnitten; die aktuelle Basisprüfung steht am Dokumentende.

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
