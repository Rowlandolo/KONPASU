# KONPASU – Prüfkriterien und Release-Gate

Stand: lokaler Kandidat 2.4.0, 02.11.2026. Veröffentlichung vom Nutzer beauftragt, aber technisch blockiert und noch nicht geräteabgenommen. Produktfreigabe durch Nutzer und belegte technische Abnahme getrennt festhalten.

## Wiederholbare Automatik

`node scripts/check.cjs` (Node 22, keine Dependencies). Tests/harness lädt echte Runtimequellen, unterdrückt nur Top-Level-init/render und ersetzt Browserdienste. Keine Browserprüfung behaupten.

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
- [ ] Remote-Dateistand gegen lokale Git-Blob-Hashes verifizieren, Entwurfs-PR und zugehörige Checks prüfen.
- [ ] Browser/iPhone/Upgrade und Veröffentlichung weiterhin separat freigeben.
