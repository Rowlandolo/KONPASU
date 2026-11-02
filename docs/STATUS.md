# KONPASU – Bestandsaufnahme und Entwicklungsstand

Datum: 02.11.2026. Verbindliche Produktquelle: PRODUCT_SPEC.md und vollständiges Masterbriefing. Dies ist eine Codebestandsaufnahme mit gezielten ausführbaren Regressionen, keine vollständige Produkt- oder Geräteabnahme.

## Verifizierte Basis und Arbeitsstand

- Live: KONPASU 2.4.0 / konpasu-offline-v240, Runtime-Merge caf1aeada7954ab8b35004eb4186492b9b4bfc51 aus PR #1; Pages-Lauf 41486638959 und Live-Version bestätigt. Echte iPhone-/VoiceOver-/Alt-PWA-Abnahme bleibt offen.
- Aktuelle Entwicklung: feature/avatar-artbook-foundation, Entwurfs-PR [#3](https://github.com/Rowlandolo/KONPASU/pull/3). Neuer Avatar ausschließlich im Entwicklungsatelier, keine neue Live-/Schema-/Cacheänderung.
- Neu: zwei unabhängig gezeichnete Körperformen mit sieben Basisebenen, eigener Passform und fünf Krafttrainingartikeln/neun Rüstungsfragmenten. Das Geschirr besitzt eigene Vorder-/Rückgrafiken statt der alten Clippolygone; Körperwechsel erhält die Auswahl. Keine Speicherwrites.
- 248 Regressionen sowie App- und Atelier-Chromiumlauf mit 21 Atelier-Prüfgruppen erfolgreich für 0a65c3c7d62943028fcd12e49a8021a91b195574. [Browsernachweis](https://github.com/Rowlandolo/KONPASU/actions/runs/41547850324); Belege in design/avatar/verification-harness-depth-v07.json.
- Etappe 1 technisch abgeschlossen: 770,084 Bytes Startgrafiken statt 15,523,832 kanonischen PNG-Bytes (95.04 % weniger), 1,099,250 Bytes für beide Formen/Startset, 47.74 MiB rechnerisches Quell-RGBA. Original-PNGs bleiben unverändert; Inhalts-Hashes in den WebP-URLs vermeiden Revisionen unter derselben Dateiadresse. Beide Formen und 390 px bei 3× Pixeldichte gegen Originalmodus geprüft und gesichtet. Reale Telefon-/GPU-/Peakmessung bleibt in Etappe 5 offen, keine Produktionsfreigabe.
- Etappe 2, Geschirrabschnitt geprüft: 760,882 Startbytes, 1,090,048 Bytes insgesamt, 47.94 MiB Quell-RGBA. Engere Rückriemenpassform auch ohne Gewand auf beiden Formen gesichtet und durch echte Alphapixel abgesichert. Als Nächstes innerhalb Etappe 2: Vorder-/Hinterärmel, anschließend Kopfteile. Weitere 90 Artikel und gespeicherte Mehrfach-Outfits bleiben offen. 6-Prozent-Breite bleibt zusätzlich ein geometrischer Test.
- Lokaler Gitverlauf bleibt eine eigene Snapshot-Baseline. Remoteänderungen erfolgen auf dem echten Upstream-Branch mit erwartetem Parent und SHA-geprüften Dateien, kein Push der synthetischen lokalen Historie.

Die folgende Bestandsaufnahme und spätere Verlaufsabschnitte enthalten ältere Befunde. Maßgeblich für den aktuellen Lieferstand sind diese Übersicht und der jüngste Phasenabschluss.

Etappe-2-Geschirrabschnitt abgeschlossen, siehe aktueller Abschluss am Dokumentende und AVATAR_DEPTH_CONTRACT.md. Der frühere Zwischenstand mit offenem Build/Browser ist damit ersetzt. Live-App und Daten unverändert.

## Ist–Soll

| Bereich | Tatsächlich im Quellcode | Zum verbindlichen Ziel noch offen |
|---|---|---|
| Ziele | 19 PRESETS, 47 GM_MODES, eigene Ziele, Aktivierung/Ereignisse/Versionen, freiwillige Detailformulare | Alle Zieltypen und Einheiten vollständig E2E testen; Ernährungstiefe und native Sensoren später |
| Kalender/Analyse | goal-calendar-v23.js: Tagesnachweise, 12 Wochen, frühzeitiger Erfolg, lokale Mo–So-Grenze, unbekannte Wochen; app.js Default 84 Tage/ältere 28-Tage-Auswahl | Einheitlicher 30-Tage-Standard für Tagesziele; Pausen, Änderungen innerhalb einer Woche, Zielhistorie und alle Max-Grenzfälle |
| Krafttraining | 97 Katalogübungen; Suche/Filter, Inline-Planzuordnung, Reihenfolge/Prescriptions, Sätze/Typ/RPE/Notiz/Dauer, Historie/Kalender; T22 erzeugt Draft erst beim Satz | Echte Pausen-/Fortsetzungszustände, Duplizieren, Supersatz-Navigation, PB-Qualität und historische Randfälle vollständig abnehmen |
| Avatar Basis | 346 eingebettete SVGs; 16 Slotnamen, 95 Standarditems, sieben Begleiter mit vier Formen; bisher statischer Blueprint und fehlende Hilfen | Finaler hochwertiger Anime-Look und optische Layerabnahme; keine Behauptung eines fertigen Premium-Enddesigns |
| Avatar Kandidat | Body/Hair/Face/Gewand/Szene/Reward/Pet komponiert; gleiche Figur zuhause; gesperrte Vorschau ohne Besitzänderung | Vollständige Startseite C und Mobilebrowser-Abnahme |
| Inventar/Rewards | 19×5 strukturelle Zuordnungen vorhanden, temporäre Tragbarkeit, Favoriten, Serien und Awards | Rund 30 Slots statt 16, Sets, komplette Besitz-/Korrektur-/Historiensemantik; REWARD_MAPPING.json ist Strukturbeleg, kein Balancezertifikat |
| Daten | IndexedDB KONPASU-LOCAL-2, DB-Version 1, kv/state; Snapshot-Warteschlange mit Revisionsprüfung; localStorage-Fallback; JSON/CSV-Export, validierter bestätigter Restore | Lesefehler/Fallback-Schutz jetzt VM-getestet; echte IndexedDB-Roundtrips, Cross-tab-Fallback jetzt mit Web-Locks-Double getestet; echte Browserparallelität, große Fotos/Quoten und umfassender Validator offen |
| Offline | Statische lokale Ressourcen, Critical-/Optional-Precache, Installfehler blockiert skipWaiting, Diagnose nicht gecacht | Echter Kaltstart/Upgrade/Flugmodus auf bestehender iPhone-PWA; Cache-Rennen und Quota |
| UX/DE/EN | Helles Botanical-CSS, viele zweisprachige Formulare, aber globale DOM-Nachübersetzung | Vollständige Startseite C, einheitliche Sprache und A11y, 320/390/430px, Touch, Kontrast |
| Coach | Lokale Regeln, Reflexionen, Wenn-dann/Experimente und explorative Auswertung | Keine echte KI; Aktionsengine mit Undo, methodische Analysen und adaptive Zurückhaltung weiterentwickeln |
| Cloud/native | Kein Konto, keine Synchronisierung, keine nativen Apps | Phase 8; erst Architekturvergleich und stabile Offlinebasis |

## Alle 19 Zielpfade: vorhandene Eingabelogik und Abnahme

Alle haben Quick-Check/Detailgrundlage; „vorhanden“ besagt keine E2E-Abnahme.

| Ziel | Codegrundlage / Messwerte | Spezifischer offener Prüffall |
|---|---|---|
| Krafttraining | Sessions/Sätze und Tagesnachweis | Gleicher Tag, Warmup, Löschen/Nachtrag, keine Doppelzählung (teilweise VM-getestet) |
| Cardio | Aktivität, Minuten, km, HF/Route manuell | Minutenmodus vs. Trainingstage/Woche |
| Bewegung | Schrittwerte, manuelle Quelle | Tagesziel und Einheitwechsel |
| Mobility | Aktivität, Dauer, optionale Beweglichkeit | Mehrere Protokolle derselbe Tag |
| Wasser | Getränke/ml, Tee/Kaffee vorgesehen | DE/EN-Getränkewerte und individuelle Tagesmenge |
| Schlaf | Bett/Wachzeit, Qualität/Nap | Doppelte Nächte, Zeitzonen/Sommerzeit |
| Ernährung | Mahlzeit/kcal/Makros, Schätzhilfe, Wochenbalance | Bilanz ohne erfundene Vollständigkeit; keine Barcode-/Foto-DB |
| Zucker | Added-sugar-Werte, explizite freie Tage | Bestätigung plus widersprüchlicher Konsum |
| Alkohol | ml/ABV und explizite freie Tage | Ohne Protokoll unbekannt (VM-Stichprobe); Konflikte DE/EN |
| Lesen | Buch/Seiten/Minuten | Lesetage nur einmal zählen, Moduswechsel |
| Sprachen | Sprache/Zeit/Lektion | Mehrere Sprachen, Tageszählung |
| Weiterbildung | Kurs/Zeit/Meilenstein | Wochenziel nach Tage- bzw. Mengenmodus |
| Fokus | Aufgabe/Minuten/Methode/Unterbrechungen | Sessions vs. Tage eindeutig spezifizieren |
| Meditation | Übung/Zeit | Fehlende und Null-Dauer differenzieren |
| Tagebuch | Freiwilliger privater Text | Export/Restore und leere Texte |
| Soziales | Aktivität/Zeit/Art | Ereignisse vs. Tage fachlich abgleichen |
| Natur | Ort/Aktivität/Zeit | Positive Details als Tagesnachweis |
| Bildschirmzeit | Privat/Beruf, Minuten/Komplettbestätigung | Berufszeit DE/EN, Teilprotokoll kein Erfolg |
| Gaming | Spiel/Minuten/Komplettbestätigung | Wochenlimit mit Lücken unbekannt (VM-Stichprobe) |

## Speicher- und Änderungsgrenzen

`app.js` enthält createState/migrate/openDB/readDB/writeDB/store/backup/validateImportedBackup und Restore-Handler. `features-v1.js`, `goal-modules.js`, `goal-calendar-v23.js` ergänzen State/Migration/Assessment; core-v15.js und training-v22.js verändern Interaktionen. Die Kombination globaler Funktionen, Überschreibungen und Capture-Listener ist fehleranfällig und erfordert Integrationsprüfungen, bevor Module aufgeteilt werden.

Die Avatarintegration verändert keine Ziel-/Workout-Datenschemata oder DB-Namen. Der anschließende Abschnitt DATA-01 härtet init() gegen Lesefehler, ergänzt readFallbackState()/storageReadMessage() und verhindert in backup() den Export eines Ersatzprofils nach gescheitertem Laden; store() verwendet dann eine passende Fehlermeldung. Bis DATA-01 blieben Migration und Restore unverändert; der nachfolgende Qualitätsabschnitt ergänzt die Validierungs- und Rollbackpfade ohne neues Schema. Avataraktionen speichern wie bisher über recordProfile → store. ensure ergänzt fehlende Avatar-Defaults in Erinnerung; boot() und bestehende Features können weiterhin Katalog/Defaultdaten ergänzen. Deshalb ist „keine neue Migration“ keine Garantie, dass die bestehende App nie Daten verändert.

## Review des Release-Kits

Alle enthaltenen Quellen, drei Tests, Preflight, Live-Prüfer und beiden Anleitungen geprüft; neue ZIP-Nutzdateien identisch zum vorher vorgelegten Kit (generierte Python-Caches ausgeschlossen). Sechs Originalquellen mit Git-Blob-SHA exakt gegen den erwarteten Stand abgeglichen; --check vor Anwendung erfolgreich. Die 2.4-Patchlogik integriert die relevanten 2.3.2-Fixes, ohne zwei öffentliche Releases zu benötigen.

Die Kit-Tests verwenden vereinfachte Avatarquellen und Mock-SVGs; sie belegen weder tatsächlichen UI-Eventfluss noch echte Bilder oder Browserpersistenz. Deshalb wurden zusätzliche Tests mit den vorhandenen echten App-Skripten und SVGs ergänzt. Zusätzlich korrigiert: historische Wochen, Fallback-Begleiterstufe, pausierte Inventarziele, Serien-Layer, unvollständiges Grafikbundle, ungültige Custom-Familie, echtes Home-Rendering. Das Originalkit bleibt unter tools/release-kit/ als Referenz; sein Patcher erzeugt NICHT automatisch alle anschließenden Verbesserungen dieses Branches.

## Teststand

`node scripts/check.cjs`: 193/193 Regressionstests erfolgreich, alle lokal vorhandenen Runtime-JS-Dateien syntaxgeprüft. Die separaten Originalkit-Tests: 6 Python-Patchtests, 4 Python-Release-Gatetests und 7 Renderertests erfolgreich. Ein gefälschtes positives Live-Gate in diesen Tests ist ein Test mit HTTP-Mocks, kein Deploymentnachweis.

Original-Avataröffnung zusätzlich gezielt als `mkButton is not defined` reproduziert. Vier zusätzliche Kit-Defekte zuerst rot, nach Korrektur grün. Reale SVG-Assets für 95 Rewards, 81 Body/Hair/Face-Kombinationen, neun Szenen und 28 Begleiterformen überprüft. Tests sind Node-VM-/Cache-/Storage-Simulationen; kein Browser, keine echte IndexedDB, keine Performance-/Layout-/Safariabnahme. Prüfliste und Releaseblocker in QA_CHECKLIST.md.


## Zweiter Entwicklungsabschnitt: Lesefehler absichern (DATA-01)

16 neue Startupregressionen; davon zunächst 11 vorhandene Fehlerfälle rot reproduziert. Beschädigtes/ungültiges Fallback-JSON (einschließlich leerer Zeichenfolge, null, false, Zahl und falscher Objektstruktur), verweigerter localStorage-Zugriff, fehlgeschlagenes IndexedDB-Lesen und ungültiger DB-Inhalt sperren weitere Schreibzugriffe. Automatisches Katalogseeding und Award-Neuberechnung entfallen im gesperrten Zustand. Ursprüngliche Speicherinhalte werden weder gelöscht noch überschrieben.

Nur wenn eine geöffnete IndexedDB tatsächlich keinen state-Eintrag besitzt, darf ein gültiger Fallback übernommen werden. Ein Lesefehler ist kein Abwesenheitsbeleg und lädt deshalb keinen möglicherweise veralteten Fallback. Kann IndexedDB gar nicht geöffnet werden, bleibt der vorhandene gültige Fallback wie bisher nutzbar. Ein vorhandener gültiger DB-Stand hat Vorrang, auch wenn ein alter Fallback kaputt ist.

Nach einem Lesefehler warnt die gerenderte Ansicht dauerhaft, dass sie nicht das gespeicherte Profil zeigt. backup() exportiert in diesem Zustand keine scheinbar gültige leere persönliche Sicherung. Ein Reparatur-/Rohdatenexportwerkzeug oder eine automatische Wiederherstellung ist damit nicht implementiert; Daten nicht zurücksetzen. Keine neue Schema-/Datenmigration. DATA-02 wurde anschließend separat gehärtet (siehe unten); DATA-03 (tiefe Importvalidierung) bleibt offen.


## Dritter Abschnitt: konkurrierende Fallback-Tabs (DATA-02)

Acht zusätzliche Regressionen, davon fünf vor dem Fix rot. Ohne Schemaänderung merkt sich die App den zuletzt erfolgreich gelesenen/geschriebenen localStorage-Rohstand. writeFallback() nimmt einen gemeinsamen Web Lock, liest darin den aktuellen Rohstand erneut und schreibt nur bei Übereinstimmung. Zwei gleichzeitige Tabs mit demselben Ausgangsstand ergeben exakt einen erfolgreichen Save; die anderen Änderungen bleiben im Speicher des unterlegenen Tabs für einen expliziten JSON-Export. Eigene Warteschlangen-Saves laufen weiter geordnet durch.

Web Locks arbeiten lokal, ohne Netzverbindung. Wenn IndexedDB nicht verfügbar ist UND Web Locks fehlen oder fehlschlagen, bleibt der Fallback schreibgeschützt statt ungeschützt zu überschreiben. Vorhandene Daten bleiben lesbar/exportierbar. Das ist eine bewusst sichtbare Einschränkung dieser doppelten Ausnahmesituation; IndexedDB-Betrieb ist unverändert. Eine vollständige Offline-Abnahme auf Zielbrowsern ist weiterhin erforderlich. Alte bereits geöffnete App-Versionen beteiligen sich nicht am Lockprotokoll; sie müssen vor dem Upgrade gesichert und anschließend neu geladen werden. Cross-Backend-Konflikte bei gleichzeitigem Wechsel von Fallback zu IndexedDB sind nicht vollständig gelöst.

## Veröffentlichungsversuch nach Nutzerauftrag

Veröffentlichung ausdrücklich beauftragt und extern gesichertes JSON-Backup vom Nutzer bestätigt. Neuer Check: main weiterhin 444bdb3981ccc03c550fb402c2cca9e45ad8a46a; create_branch weiterhin HTTP 403 Resource not accessible by integration. Kein Remote-Branch, kein PR, kein Merge und keine Veröffentlichung erfolgt. Die Autorisierung ersetzt weder fehlenden technischen Zugriff noch ausstehende Browser-/Geräteprüfungen. Kein Wechsel auf eine andere Hosting-Origin, weil bestehende lokale Nutzerdaten dadurch nicht übernommen würden.


## Belohnungen – erster Gestaltungsabschnitt

Auf ausdrücklichen Nutzerwunsch wird die Belohnungssammlung jetzt schrittweise professionell gestaltet. Neue Karten, Status-/Slotfilter, Zähler, Progressanzeigen und Vorschau im bestehenden Botanical-Stil sind lokal implementiert; Regeln, Schwellen und Datenformat bleiben unverändert. Ein alter Equip-Randfall wurde mit Regression korrigiert: bereits sichtbare Legacy-Ausrüstung wird beim ersten Klick abgenommen. Acht neue Tests, insgesamt 61 erfolgreich. Details, Vorschaugenerator und weitere Schritte: REWARDS_DESIGN.md.

Aktueller Browserbefund: Chromium und Playwright nun vorhanden, aber Prozessstart zunächst sandboxgesperrt und lokale Datei-Navigation anschließend administrativ blockiert. Eine isolierte Vorschau mit synthetischen Daten ist erzeugbar; echte visuelle/Browser-/Geräteabnahme bleibt offen. Kein Deployment dieses Abschnitts.


## Belohnungen – Schwellenaudit und Ruhmeshalle

95 Schwellen-/Slot-/SVG-Zuordnungen mit tatsächlichen Appfunktionen und synthetischen konfigurierten Zielen geprüft; Details und Grenzen in REWARD_AUDIT.md. Ernährung/Alkohol benötigen sinnvoll konfigurierte Zielwerte, die Defaults wurden nicht verändert. Offene Tragbarkeit bei späteren Datenlücken ist als Balancefrage dokumentiert.

Permanente Serien-Historie wird bei Korrektur oder Periodenwechsel nicht mehr still gelöscht. Gespeicherte, nicht mehr belegbare Einträge bleiben erhalten und werden in der neuen Ruhmeshalle mit „Nachweis offen“ markiert; sie schalten keine Ausrüstung frei. Neue Emblem-Karten, Typfilter, Herkunft und sichere Datumsdarstellung. 16 zusätzliche Regressionen, insgesamt 77 bestanden. Keine neue Datenschemamigration; keine Veröffentlichung oder Geräteabnahme.


## Belohnungen – Zielvorgabe und Konfigurationsweg

Karten und Details erläutern jetzt echte aktuelle Zielwerte, Zeiträume und Nachweisregeln. Fehlende Zielwerte erhalten eine direkte Editoraktion, ohne voreingestellte persönliche Vorgaben aus dem Moduskatalog zu übernehmen. „Ziel einrichten“ aus dem Rewardpfad öffnet bestehende spezialisierte oder eigene Zielbearbeitung; erst das ausdrückliche Speichern verändert die Zielversion. Die flexible Ernährungsbalance wurde nicht still in ein numerisches Modell umgewandelt.

Zwölf zusätzliche Regressionen einschließlich tatsächlichem Submit-/Validierungsweg, historischem Zielversionsvergleich und unveränderten Trainings-/Profildaten: insgesamt 89 bestanden. Kein neuer Storage-/Rewardalgorithmus. Eigenständig öffnbare Voraussetzungen-Vorschau mit synthetischen Daten ergänzt. Keine Veröffentlichung oder visuelle Geräteabnahme.


## Belohnungen – Begleiter und Outfits

Neue Begleitergalerie mit tatsächlich sichtbarem Begleiter, gespeicherter Auswahl und aktuellen Formen aller sieben Begleiter. Gemeinsame Gate-/Stufenlogik für Rendern und Auswahl; pausierte Quellziele und ungültige Schlüssel sind abgesichert. Keine neuen Gates/Schwellen oder Pflegepflichten.

Favoriten zeigen reine Livevorschauen und trennen gespeicherte von tragbarer Auswahl. Umbenennen ergänzt, Löschen bestätigt und Indizes validiert. Speichern übernimmt Legacy-Teile in bislang unbelegte Slots; ausdrücklich angewendete Outfits leeren die vorherige Legacy-Auswahl, damit keine fremden Teile hineinmischen. Favoritenformat/DB-Schema unverändert; keine Migration alter Vorlagen. 14 neue Tests, insgesamt 103 erfolgreich. Beide Vorschauen mit synthetischen Daten erzeugbar; visuelle Browser-/iPhoneabnahme weiterhin offen. Nicht veröffentlicht.


## Belohnungen – Ausrüstungsübersicht

Neuer Tab für die 16 bestehenden Slots: gespeicherte Auswahl, tatsächlich aufgelöster Reward oder Grundausstattung sowie verständliche Gründe für Ersatz/Ruhen/Ausblenden getrennt dargestellt. Ausschaltbare Aura/Effekte werden nicht als sichtbar gezählt. Navigation in Inventar und Detailvorschau ohne neue Writes, Änderungen an Auswahl oder Unlocks. UI-Zeitreise endet für diese ausdrücklich heutige Übersicht, ohne Historie zu verändern.

Zehn weitere VM-Regressionen, insgesamt 113 erfolgreich. Synthetische HTML-Vorschau erzeugbar; keine erfolgreiche visuelle Browser-/iPhone- oder Persistenzabnahme dieses Abschnitts. Noch nicht veröffentlicht.


## Umfangreicher Qualitätsabschnitt

Quellcode-, Fehlerfall- und Integrationsaudit in QUALITY_AUDIT_2026-11-02.md. Import und Start prüfen verschachtelte Datentypen/echte Datumswerte vor Übernahme bzw. Seeding. Restore setzt bei Berechnungs-/Savefehlern den vorherigen Arbeitsspeicherstand wieder ein. Zeitbasierte Sätze werden konsistent validiert. Neu belegte Start-Meilensteine werden bei tatsächlicher Änderung gesichert, unveränderte Profile nicht erneut geschrieben.

Fehlende Ernährungs-/Digital-frei-Tagesnachweise und DE/EN-/Boolean-Aggregationsunterschiede korrigiert; bestehende rohe Protokolle bleiben unverändert. Anprobe-/Zeitreise-Wechsel, Maße-only-Einstieg und Tastatur-/Detailfokus verbessert. Persistente Schreibfehlerwarnung, CSV-Nachweise/Dauer und Cache-first-Navigation mit erklärendem Offlinefehler ergänzt. Kein neues Schema oder neue Rewardschwellen; CSV hat eine zusätzliche Dauer_s-Spalte.

43 neue Prüfungen, insgesamt 156 erfolgreich. Alle sieben Hauptansichten DE/EN mit neuem und synthetischem historischem Profil sowie alle 47 Modusdialoge in Node-VM geprüft. Keine reale Browser-/iPhone-/Offline-/Layoutabnahme und keine Veröffentlichung. OFF-01/Importsemantik bleiben mit den im Audit genannten Grenzen offen.

## Verbrauchsnachweise und Obergrenzen

23 zusätzliche Regressionen; insgesamt 179 erfolgreich. Alkohol mit fehlendem ABV, freie Tagesnachweise, vollständige Perioden, manuelle Werte gegen Detailüberschreitungen, negative Werte und Zukunftsdaten vereinheitlicht. Konflikttage und fehlende Vollständigkeit im UI erklärt. Rohdaten und Schema bleiben unverändert; abgeleitete Erfolge können konservativer werden. Regeln und Reviewgrenzen in CONSUMPTION_EVIDENCE.md. Browserstart erneut fehlgeschlagen; reale Geräteabnahme weiterhin offen, konkrete Schritte und synthetische Importdatei in DEVICE_ACCEPTANCE.md. Kein Deployment.

## Browserprüfung und angefordertes Komplettpaket

187 automatisierte Quellcode-/VM-/Preflightprüfungen erfolgreich. Optionaler ausführbarer Browserlauf in scripts/browser-check.cjs, derzeit BLOCKIERT: unvollständiger Assetbestand und Chromium SIGTRAP/Operation not permitted. Keine Browser-/iPhone-Freigabe. Am 02.11. erneut GitHub main/version.json=2.3.1 bestätigt; Nutzer sieht 1.8, mögliche Cache-/UI-Abweichung nicht auf Gerät geprüft. Nutzer fordert vollständiges Uploadpaket. Vollständige Original-ZIP ist für unveränderte Assets angefordert; vor Eingang kein unvollständiges ZIP als komplette App liefern. BROWSER_ACCEPTANCE.md und UPLOAD_GUIDE.md dokumentieren Ausführung, Lieferbedingungen und Schritteplan.

## Vollständiges Uploadpaket aus Nutzerarchiv

Original-ZIP KONPASU-main.zip mit allen 45 Basisdateien erhalten, sämtliche Git-Blob-Hashes stimmen. 21 bisher fehlende Originaldateien unverändert ergänzt, einschließlich 6,3-MB-Grafikbundle und aller Bilder/Icons/alten Vorschauen. Aktueller Kandidat liegt vollständig vor. Sechs weitere Integritäts-/Originalbundle-/Versionsprüfungen, insgesamt 193 bestanden. Englischen alten 2.0-Versionshinweis auf zentrale Kandidatversion korrigiert. 104 Premium-WebPs vollständig und offline auflösbar. ZIP wird nach Entpacken erneut geprüft; Nachweis in PAKET_PRUEFBERICHT.md. Browserstart bleibt mit SIGTRAP/Operation not permitted blockiert; keine echte Browser-/iPhone-Abnahme. START-HIER.md erläutert separate Testvorschau und späteren PR-/Updateweg. Nicht deployed.

## GitHub-Schreibzugriff wiederhergestellt

Nach Nutzer-Neuverbindung Branchanlage erfolgreich. Ausgangspunkt main weiterhin 444bdb3981ccc03c550fb402c2cca9e45ad8a46a. Übertragung des vollständigen geprüften Kandidaten in eigenen Remote-Branch beauftragt; Pull Request als Entwurf, echte Geräteabnahme bleibt offen. Originaldateien werden per bekanntem SHA erhalten; keine privaten Backups hochladen.

Remoteprüfung: alle 72 geänderten/neuen Dateien stimmen per Git-Blob-SHA mit dem lokalen Kandidaten überein; Remote-Tree hat vollständig 106 Dateien. PR #1 als Entwurf geöffnet. GitHub-Reviewchecks für den aktuellen PR-Commit gesondert prüfen; die 193 bisherigen Ergebnisse sind lokale Prüfungen. main unverändert, nicht veröffentlicht.

## Veröffentlichungsfreigabe

Nutzerfreigabe zur Übernahme des vollständigen aktuellen Standes nach main liegt vor. Extern gesichertes JSON-Backup wurde im Gespräch bestätigt. Vor Merge zusätzlichen Chromiumlauf in GitHub Actions ausführen; danach Pages-Lauf für den tatsächlichen Mergecommit und ausgelieferte Version prüfen. Echte iPhone-Abnahme bleibt als offener Gerätebefund dokumentiert.

Chromiumlauf in GitHub Actions erstmals durchgeführt: reale Speicherung, Import/Abbruch/Validierung, Offline-Reload/Save, 70 Ansichts-/Sprach-/Viewportkombinationen und Konfliktschutz funktionieren. Kaltstartfehler gm-Auswertung vor core-v15-Helferdefinition erkannt und durch eigenen frühen gmYes-Helfer korrigiert. Zusätzliche Regression; Gesamtstand jetzt 194. Beide Tabs werden im Browserprüflauf vor gezielter Konflikterzeugung auf denselben gespeicherten Ausgangsstand synchronisiert. Reales iPhone/VoiceOver/Alt-PWA-Upgrade weiterhin offen.

## Veröffentlichung abgeschlossen (02.11.2026)

Nutzerfreigabe umgesetzt, PR #1 nach grünen Prüfungen gemergt. 194 Regressionen und kompletter realer Chromiumlauf erfolgreich für PR-Commit 4cb2c2e52b87928e56daf93538bdf04d95200232. Quelle: https://github.com/Rowlandolo/KONPASU/pull/1. Pages-Lauf https://github.com/Rowlandolo/KONPASU/actions/runs/41486638959 erfolgreich. Live-JSON und Startseite über unabhängigen Abruf geprüft. Native iPhone-/VoiceOver-/Alt-PWA-Upgradefälle bleiben offen. Frühere Nicht-deployed-/Browserblockerabschnitte sind historische Befunde. Dokumentationsnachtrag verändert keine Runtime oder Nutzerdaten.

## Avatar-Artbook-Grundlage (Entwicklung, nicht live)

Audit: 95 Kartenbilder sind keine transparenten, passend geriggten Ausrüstungsteile; mehrere alte Slotzuordnungen widersprechen den Bildern. Neuer separater Branch. Grundkörper-Stilentwurf, 95er-Arbeitsinventar, reine Ebenenplanung für fünf unabhängige Krafttrainingartikel/acht Fragmente und Entwickleratelier erstellt. Neun neue Prüfungen einschließlich aller 32 Startkombinationen; 203 Gesamtprüfungen. Keine neuen produktionsfertigen Rüstungsgrafiken, keine neue Persistenz/Live-Anbindung. Plan in AVATAR_ARTBOOK_PLAN.md, Copilot-/Appplan in PROFESSIONAL_APP_PLAN.md.

## Avatar-Grafikprototypen (nur Entwicklungsbranch)

Grundkörperrichtung bestätigt. Geschirr und beide Schulterpanzer als drei unabhängige transparente PNGs erstellt und mit geprüftem Metadatenadapter im Atelier kombinierbar. Sechs zusätzliche Integritäts-/Einpassungsprüfungen; insgesamt 209 lokal bestanden. Eigener Atelier-Chromiumtest erfasst reale Kombinationsansichten und 32 UI-Kombinationen. Freigabe der Passform, Vorder-/Hintermasken und Körpervarianten weiter offen. Live-App unverändert, keine Schema-/Rewardänderung.

Atelier-Nachweis: GitHub-Lauf 41492495604 für 836160db erfolgreich; 209 Regressionen, bestehender App-Chromiumlauf und zusätzliche Atelierprüfung grün. Die echte kombinierte Browseraufnahme ist in design/avatar/review-combined-v01.png archiviert und wurde gesichtet. Schulterpanzer und Geschirr sind gemeinsam sichtbar. Die reine Sichtprüfung dieser Pose ersetzt keine Masken-/Körpervariantenabnahme.

## Vollständiges erstes Set als Grafikprototyp

Fünf neue transparente PNGs ergänzt: zwei Handgelenkbänder, zwei Armschienen, Brustpanzer. Damit sind alle fünf Krafttrainingartikel als acht unabhängig auflösbare Fragmente im Atelier vorhanden. Alle 32 Auswahlen bleiben erhalten. Umschaltbare rigbezogene Riemenmaske; keine Pixel- oder Nutzerdatenänderung. 211 lokale Prüfungen bestanden. Produktionspassform, weitere Körper, echte Vorder-/Hintersegmentierung und Dateigrößenbudget bleiben offen. Live-App unverändert; Entwurfs-PR #3.

Fünferset-Nachweis: Für 437a240c sind 211 Regressionen, App-Chromium und erweiterter Atelierlauf erfolgreich (41495775682). Nach Sichtung der ersten Aufnahme wurden zu tief sitzende Bänder höher gesetzt und Armschienen verkürzt; neue Aufnahme erneut gesichtet und archiviert. design/avatar/verification-full-set-v01.json und review-full-set-v01.png belegen den tatsächlichen Stand. Keine Veröffentlichung.

## Basisaufteilung und Proportionsstudie (nur Atelier)

Sichtbare Originalpixel sind vorläufig separat als Körperbereiche, Haare und Grundkleidung schaltbar; Quelle bytegleich. Kein neuer vollständiger Körper und keine verdeckte Anatomie rekonstruiert. Zwei geometrische Proportionen verwenden denselben gemeinsamen Transform für Basis und alle acht Ausrüstungsebenen. Sieben neue Prüfungen, insgesamt 218 lokal. Browserprüfung ergänzt acht Basisansichten und exakte decodierte Rekonstruktion. Individuell neue Körper-/Frisurgrafiken und weitere Anatomie weiterhin offen. Keine Profil-, Schema- oder Liveänderung.

Basisstudie-Nachweis: GitHub-Lauf 41498104081 für 0eaa849d erfolgreich; 218 Regressionen, App-Chromium und erweiterter Atelierlauf bestanden. Exakte decodierte Rekonstruktion, acht Basiszustände und gemeinsamer Breitentest belegt. Sichtung isolierter Bereiche: Trennkanten noch unzureichend, keine visuelle Produktionsabnahme. Artefakt unter design/avatar/verification-base-study-v01.json; unter Kleidung/Kopf fehlen sourcebedingt Körperflächen. Ein getrennt gezeichneter Unterbau wird als nicht registrierter Studienentwurf ergänzt.

Unterkörperstudie ergänzt: vollständige separate Figur mit geschlossener Unterkleidung und Kopf ohne Haare, bildgeneriert aus der bestätigten Referenz. Noch nicht mit dem bisherigen Rig registriert und deshalb nicht als Ersatzkörper in die Ausrüstungsansicht eingesetzt. Getrennte Ansicht im Atelier; Herkunft und Hash festgehalten. 219 lokale Prüfungen. Die positive technische Browserabnahme der Maskenstudie ist von der ausdrücklich noch fehlenden visuellen Produktionsabnahme zu unterscheiden.

## Saubere Einzelgrafiken und vollständiger Körperunterbau (Atelier)

Die grobe Pixelmaskenzerlegung wurde aus dem Atelier-Renderer entfernt. Drei neue, unabhängig generierte transparente PNGs bilden jetzt vollständigen Körper/Kopf in geschlossener Unterkleidung, äußere Grundkleidung und Haare; Originalreferenz und frühere Studien bleiben unverändert archiviert. Der Körper enthält auch unter dem Gewand Rumpf und Beine. Haare werden separat mit erhaltener Proportion auf den Kopf registriert. Hashes, native Maße und Platzierungen stehen im versionierten base-layer-contract.json. Keine Bilddatei nachträglich rasterbearbeitet.

Elf aktualisierte Basisprüfungen, insgesamt 222 lokale Prüfungen erfolgreich. Browserprüfung für diesen Stand umfasst: acht Basiszustände, vollständige Anatomie an Referenzpunkten, keine Gesichts-/Handreste in isolierten Ebenen, deterministischer Neuaufbau, 32 Ausrüstungskombinationen und gemeinsame Breitenvariation. Ein-Pose-Prototyp, keine universelle Produktionsfreigabe. Live-App, Schema, Offline-Cache und Nutzerdaten unverändert.

Sichtkorrektur: Haarregistrierung nach echter Aufnahme verkleinert und nach links/oben versetzt; Gesichtöffnung passt nun. Arm-/Handgelenkanker und vier Armfragmente anschließend auf die neuen Körperproportionen nachgeführt, statt die alten Handpositionen zu übernehmen. Erneuter kompletter Browserlauf für diese Passform erfolgreich, siehe Abschluss unten.

## Abschluss: saubere Basis und Körperunterbau

222 Regressionen und reale Chromiumprüfungen erfolgreich für 6a8775a71b297c0c1616146e7d61ad13e9f5c675: https://github.com/Rowlandolo/KONPASU/actions/runs/41509862640. Alle acht Basisansichten, vollständiger Kopf/Rumpf/Beine/Füße/Hände ohne Gewand, keine Gesichts-/Handreste in isolierten Haaren/Kleidern, deterministischer Neuaufbau, 32 Ausrüstungsauswahlen, mobile Breite und keine Speicherwrites geprüft. Tatsächliche Aufnahmen von Unterbau, Kombination, komplettem Set und Breitenvariation gesichtet und unverändert archiviert. Haarpassform und vier Armfragmente nach Sichtprüfung korrigiert.

Prototyp für diese Pose visuell geprüft, keine universelle Produktionsfreigabe. Die groben Masken sind abgelöst. Alle früheren „noch ausstehenden“ Browserbefunde dieses Abschnitts sind damit abgeschlossen; iPhone/Produktionsintegration und die im aktuellen Kopf genannten Ausbauarbeiten bleiben offen. Abschluss-Nachtrag ändert nur Nachweise/Dokumentation und die Registrierungsannotation, keine getestete Geometrie oder Runtime.

## Sieben unabhängige Basisebenen (Entwicklung)

Grundkleidung in Gewand, Hakama, Obi und Schuhe sowie Frisur in Vorder-/Hinterhaare als sechs eigenständige transparente PNGs neu gezeichnet. Vollständiger Körperunterbau bleibt bytegleich. Vertrag v3 registriert sieben Ebenen mit festen IDs/Hashes/Positionen. Hinterhaare liegen hinter dem Körper, Vorderhaare auf gesondertem Canvas vor der Ausrüstung. Keine Teilgrafik wird durch Auswahl einer anderen still entfernt. Die ehemaligen gemeinsamen Haar-/Kleiderbilder bleiben als Referenzen erhalten.

Drei Schnellansichten und sieben einzelne Schalter im Atelier. Alle 128 Basisauswahlen als Unitfälle geprüft, weiterhin 222 lokale Regressionen erfolgreich. Erweiterter Chromiumlauf für 128 reale UI-Auswahlen, Schnellansichten, beschädigte erforderliche PNG-Datei und unveränderte 32 Rewardkombinationen vorbereitet; aktuelle Browser-/Sichtabnahme noch ausstehend. Basisdateien nun 5.99 MB plus 9.38 MB Rüstungsprototypen; kein Produktionsbudget akzeptiert. Live-App, Nutzerdaten, Cache und Schema unverändert.

Erster siebenlagiger Chromiumlauf für dc16d9b8 technisch erfolgreich (41516918584). Sichtung deckt verdeckte Unterarme mit darüber schwebenden Armschienen auf. Gewand daraufhin neu gezeichnet mit transparenten Unterarmkanälen, nach Generierungsvergrößerung seitenverhältnistreu auf dieselben Zielkonturen registriert. Neue Browserassertion prüft vier tatsächliche Unterarmpunkte gegen erneute Verdeckung. Erneute Sichtabnahme erforderlich.

## Abschluss: sieben eigenständige Basisgrafiken

https://github.com/Rowlandolo/KONPASU/actions/runs/41518792450 für 512f877d51d61654cc2eec7d0d41f201883fe7d9 erfolgreich: 222 Regressionen, bestehender App-Chromiumlauf und zwölf Atelier-Prüfgruppen. Alle 128 Basiszustände durch UI-Toggles, drei Schnellansichten, deterministischer Neuaufbau, vier offene Unterarmpunkte, 32 Rewardauswahlen, gemeinsamer Breitentest, 390-px-Layout, beschädigtes Pflichtasset ohne Teilfigur und keinerlei Speicherwrites geprüft. Die 128 und 32 Zustände sind getrennte Prüfungen, kein behaupteter vollständiger kartesischer 4096er-Sichttest.

Komplettes Set, Grundoutfit, Unterbau mit Frisur, fehlender Obi/Hakama und breitere Komposition gesichtet. Das zu dichte Ärmelinnenfutter wurde durch neu gezeichnete transparente Unterarmkanäle korrigiert; PNG seitenverhältnistreu registriert, keine Raster-Nachbearbeitung. Vier unveränderte Browseraufnahmen und Befunde unter verification-seven-layers-v03.json archiviert. Neuer aktueller Basisbestand: 6,144,050 Bytes. Weiterhin Prototyp einer Pose, keine universelle Produktions- oder Gerätefreigabe; kein Liveupdate. Abschlussnachtrag ändert nur Dokumentation, Nachweise und Registrierungsannotation.

## Zwei Körperformen und gemeinsame Szenenkomposition (Entwicklung)

Zweite Anatomie als eigenständiges Körper-PNG gezeichnet, dazu eigenes Gewand und Hakama. Beide Formen behalten dieselbe vollständige native Körperplatzierung; kein globales Breitenziehen zur Erzeugung von Form B. Individuelle Ausrüstungspositionen/Anker sowie Kleidungsplatzierungen stehen in body-profiles-v04.json und base-layer-broad-v04-contract.json.

Alle sichtbaren Ebenen werden jetzt gemeinsam in SVG-Zeichenreihenfolge komponiert. Deklarierte aktive Kleidungsoberflächen überdecken Armartikel über ihre tatsächliche Alphaform; Artikel bleiben in Auswahl und Szenenliste. Alte Geschirrmaske wird mit der jeweiligen Passform transportiert. Kein behaupteter universeller 3D-Tiefenautomatismus.

Acht neue sinnvolle Regressionen, insgesamt 230 lokal erfolgreich. Chromiumprüfung erweitert um beide Formen (256 Basiszustände/64 Rewardzustände), unveränderte Auswahl beim Körperwechsel, wegfallende Verdeckung ohne Gewand und tatsächliche Pixel einer synthetischen Verdeckung. Browser-/Sichtabnahme dieses Stands noch ausstehend. Keine Live-/Schema-/Profil-/Cacheänderung.

## Abschluss: zwei Körperformen und aktive Alpha-Verdeckung

https://github.com/Rowlandolo/KONPASU/actions/runs/41529386209 für 89e6dcc4bbcc9c90c2043628a8440a0b65e40c57 erfolgreich: 230 Regressionen, bestehende App-Chromiumprüfung und 14 Atelier-Prüfgruppen. Beide Formen zusammen 256 Basis- und 64 Rewardzustände, A/B-Wechsel mit erhaltener Auswahl, reversible Verdeckung durch aktive Gewandfläche, tatsächliche SVG-Pixel, Fehlasset, mobile Breite und keine Writes geprüft. Kein vollständiger kartesischer Sichttest behauptet. Erste Browserunterbrechung betraf nur textuellen CSS-Vergleich; Test prüft jetzt die tatsächliche Transformationsmatrix ohne globale Streckung.

Form A mit vollem Set sowie Form B mit eigenem Körperunterbau, Grundoutfit und vollem Set tatsächlich gesichtet; vier unveränderte Aufnahmen archiviert. Neue Körperzeichnung besitzt sichtbare eigene Schulter-/Arm-/Rumpf-/Beinformen; Haare und Schuhe werden passend registriert, Arme/Ausrüstung individuell angepasst. Gemeinsame SVG-Szene ist nun die sichtbare Darstellung; bisherige Canvases dienen ausschließlich den isolierten Basisprüfungen und der Vorschau-Schnittstelle. Kein Fallback auf den alten Körper bei B-Auswahl.

Einschränkungen: erklärte Alphaoberflächen statt universeller 3D-Tiefeninferenz, Geschirrclips weiterhin posebezogen, weitere echte Vorder-/Hinterfragmente offen. Zehn eindeutige Basis-PNGs zusammen 9,905,070 Bytes plus Rüstung sind noch kein akzeptiertes mobiles Produktionsbudget. Keine Live-/Schema-/Cache-/Profildatenänderung. Abschlussnachtrag ergänzt Nachweise, Dokumentation und Registrierungsannotation.

## Leistungsbudget und sechs verbleibende Avatar-Etappen

Konkreter Zählplan in AVATAR_RELEASE_STEPS.md: sechs größere Produktetappen bis zum vollständigen 95-Artikel-Avatar; aktuelle Etappe 1 läuft. Frühere Prototyplieferungen sind keine erledigten Produktions-/Geräteschritte. Eine erste Liveversion mit dem Startset kann mit geprüftem Rückfallweg und erforderlicher Geräte-/Releaseabnahme früher geliefert werden.

Lade-/Renderoptimierungen implementiert: zweite Körperform erst auf Auswahl, Fehlerretry ohne Auswahlverlust, Schutz vor verspäteter Antwort; Original-Artbook als unveränderte 436,058-Byte-Einzeldatei erst auf Öffnen; stabile SVG-Bildknoten und referenzierte Maskenflächen; Canvas-Prüfflächen nur beim Snapshot. Basisdecodierung und SVG verwenden dieselbe geprüfte Data-URL. Alle bisherigen PNGs/Passformen unverändert.

Budgetrechnung: Startgrafiken 15,523,832 statt 25,583,088 Bytes, rechnerisch 10,059,256 Bytes / etwa 39,3 % weniger. Zehn Basis- plus acht Rüstungsdateien zusammen 19,284,852 Bytes; Quell-RGBA 113,246,724 Bytes (Schätzung, kein Browser-/GPU-Peakspeicher). Produktionsziele 8 MB Startgrafiken / 48 MiB Quell-RGBA noch nicht erreicht. Prototypobergrenzen werden automatisiert geprüft. Sechs neue sinnvolle Budget-/Originalreferenztests, 236 lokal erfolgreich. Erweiterte reale Browserprüfung für Laden, Wiederverwendung, Retry/Race und Pixelmasken ausstehend. Kein Live-/Schema-/Cache-/Profildatenupdate.

## Leistungsabschnitt geprüft, Produktionsziele weiter offen

https://github.com/Rowlandolo/KONPASU/actions/runs/41533841108 für e05b0c3f5228b10a83ef270fcac1b28045f1bf8a: 236 Regressionen, bestehender App-Chromiumlauf und 17 Atelier-Prüfgruppen erfolgreich. Gemessen: 15 anfängliche PNG-Anfragen mit 15,523,832 Quelldateibytes, keine Zusatzkörper-/Artbookanforderung vor Nutzung, null vorab angelegte Prüfraster, null PNG-Kopien in Maskendefinitionen, 15 aktuelle Bildknoten. Wiederverwendung, einmalige zusätzliche Körper-/Referenzressourcen, Retry nach Fehler sowie neueste Körper-/Artikelauswahl trotz verspäteter Antwort bestanden. Der explizit geöffnete Referenzinhalt wird sofort geladen; initiales Zurückhalten ist von Browser-Lazy-Loading getrennt.

40 synchron gemessene Rendererzyklen auf CI: Median 6.5 ms, p95 8.1 ms, Maximum 13.2 ms, ohne Paint. Keine Geräte-/Frameratezusage daraus ableiten. Die vollständigen Set-Aufnahmen beider Körper sind sogar bytegleich mit den archivierten v04-PNGs; keine visuelle Verschlechterung durch Knoten-/Maskenwiederverwendung. Vollbeleg mit Inventar/Messgrenzen: verification-performance-v05.json.

Etappe 1 bleibt aktiv: Produktionsgrafikgrößen und reale Zielgerätmessung fehlen. Sechs übergeordnete Avatar-Etappen in AVATAR_RELEASE_STEPS.md; zusätzliche App-/Copilotarbeiten separat. Kein Liveupdate, keine Profil-/Schema-/Cacheänderung. Abschlussnachtrag verändert nur Dokumentation, Nachweise und die Budget-Scopebeschreibung.

## Mobile Auslieferungsgrafiken (Etappe 1)

Reproduzierbare Buildpipeline scripts/build-avatar-delivery.cjs mit gepinnter Playwright-/Chromiumversion erstellt. 18 verkleinerte WebP-Laufzeitdateien aus unveränderten kanonischen PNGs; vollständige Bildkoordinaten bleiben erhalten. Originale, Artikel-IDs, Passformen und Quellen-Hashes bleiben erhalten. Build-Lauf 41540836840 erfolgreich: Alpha-Abweichung zur passend skalierten Referenz je Datei null, maximaler Farb-RMSE etwa 7.25/255 in opaken Bereichen. Das ist keine Behauptung identischer Pixel zur unskalierten Originaldatei.

Strikter Deliveryadapter prüft Quell-SHA, Maße, Ausgabehash und tatsächliche Bildmaße. Mobile Dateien sind Standard im Atelier; ?artwork=original bietet den getrennten Originalvergleich. Fehlende oder veraltete Deliveryeinträge fallen nicht still auf große Originale zurück. Kein Profil-/Schema-/Live-/Cacheupdate.

Erster Buildentwurf: 543,984 Bytes Startgrafiken, 776,544 Bytes insgesamt für beide Körper und das Fünferset. Quell-RGBA der Auslieferungsdateien 39,292,672 Bytes, numerische 8-MB-/48-MiB-Ziele erfüllt. Physische Geräte-/GPU-/Peakmessung weiterhin offen. Sieben neue Delivery-/Integritätstests; insgesamt 243 lokale Prüfungen. Die endgültige, schärfere Variante und abgeschlossene Browserabnahme folgen unten.

## Abschluss: kleine Laufzeitdateien und geprüfte Bildqualität

Finales Rezept mit 864×1296-Basis und Qualität 0.98 bewahrt mehr Gesichts-/Goldzeichnung innerhalb der Budgets. 770,084 Startbytes (95.04 % weniger als kanonische Start-PNGs), 1,099,250 Bytes für 18 Ausgaben und 50,061,824 Quell-RGBA-Bytes (47.74 MiB). In der Sitzung startet Form A mit 15 Bilddateien; Form B ergänzt drei. Dateien enthalten ihren tatsächlichen Ausgabehash im Namen, Loader prüfen vollständigen SHA und echte Maße.

245 Regressionen, App-Chromium und 19 Atelier-Prüfgruppen erfolgreich für c99b943e70666452aeba9e9a95fe0f05f2c4ad34: https://github.com/Rowlandolo/KONPASU/actions/runs/41544503356. Zwei Formen, 256 Basiszustände/64 Rewardzustände, Retry/Race, aktive Masken, fehlendes/beschädigtes Asset, null Speicherwrites und 390-px-Layout weiterhin geprüft. Kein vollständiger kartesischer Sichttest behauptet.

Originalvergleich beider Figuren sowie 390 px bei 3× Pixeldichte bestanden; Gesicht und Goldschmuck bleiben erkennbar, Konturen/Passformen unverändert. Bei 3×: mittlere absolute Kanalabweichung 0.875/255, Gesicht 2.811, Gold 3.065; 0.188 % Pixel mit Kanalabweichung über 32. Dies ist bewusst verlustbegrenzte Auslieferung, keine Pixelidentität zu Original-PNGs. Aktuelle Mobil-/Originalaufnahmen und Form B gesichtet und unverändert archiviert. Ein unabhängiger frischer Build auf demselben Quellcommit (41544503475) liefert Manifest und 18 WebPs bytegleich.

Vollbeleg: design/avatar/verification-delivery-v06.json. Etappe 1 technisch abgeschlossen; reale Telefon-/GPU-/Speicherspitzenmessungen bleiben in Etappe 5 vor Veröffentlichung. Nächster Abschnitt: Etappe 2, echte Vorder-/Hintergrafiken für Riemen und Ärmel. Live-App, Profil, Schema und Service Worker unverändert. Abschlussnachtrag ergänzt nur Dokumentation und Prüfbelege, keine Runtime-/Geometrieänderung.

## Abschluss Etappe 2, erster Abschnitt: echtes Vorder-/Hintergeschirr

Zwei neue separate transparente PNGs ersetzen die alte Geschirr-Gesamtgrafik samt posebezogenem Clipping. Die alte PNG bleibt bytegleich archiviert. Vorderseite behält den bisherigen Fragment-/Assetschlüssel und die ID strength-3; Rückseite wird als zweites Modul desselben Artikels geführt. Beide werden gemeinsam ausgewählt und bleiben im Szenenplan, auch wenn Körper/Kleider sie verdecken. Fehlt ein Teil, bleibt der gesamte Artikel ausstehend. Rollen und Tiefen werden ausdrücklich geprüft: Rückseite 150, Körper 200, Kleidung 300–350, Vorderseite 430, Brust-/Schulter-/Armteile darüber.

Beide Formen mit Geschirr allein, komplettem Set, ohne äußeres Gewand und mit ausgeblendeter Basis tatsächlich gesichtet. Die zusätzliche Ohne-Gewand-Ansicht zeigte zunächst einen zu weit außen liegenden Rückriemen an Form A; um acht Rigpixel nach innen korrigiert und Form-B-Gruppenregistrierung entsprechend transportiert. Neue echte Alpha-Prüfung unterhalb Schulterhöhe erkennt ein erneutes Hängen außerhalb des Körpers (höchstens vier Randpixel; A: 1, B: 3). Kein universeller 3D-Tiefenautomatismus behauptet.

248 Regressionen, bestehende App-Chromiumprüfung und 21 Atelier-Prüfgruppen erfolgreich für 0a65c3c7d62943028fcd12e49a8021a91b195574: https://github.com/Rowlandolo/KONPASU/actions/runs/41547850324. 256 Basis-/64 Rewardzustände als getrennte Suiten, echte Rücken-/Körper-/Frontpixel, beschädigte Rückgrafik ohne Teilfigur, Retry/Race, null Writes und 390 px/3× geprüft. Ein frischer Build (41547850475) liefert 19 Laufzeitdateien plus Manifest bytegleich. Der korrigierte Negativtest verändert gültige WebP-Bytes hinter dem Header, damit er tatsächlich SHA-Verweigerung statt Headerverweigerung prüft.

Aktuell 16 Startdateien mit 760,882 Bytes, 19 insgesamt mit 1,090,048 Bytes und 50,269,696 rechnerischen Quell-RGBA-Bytes (47.94 MiB). Numerische Produktionsziele weiter erfüllt; physische Telefon-/GPU-/Spitzenspeichermessung offen. 3×-Vergleich zum neuen Original: MAE 0.883/255, Gesicht 2.811, Gold 3.123, stärker abweichende Pixel 0.193 %. Keine Pixelgleichheit zum alten maskierten Geschirr behauptet.

Nachweis und unveränderte Browseraufnahmen: design/avatar/verification-harness-depth-v07.json. Dauerhafter Tiefen-/Auswahlvertrag und nächste Ärmelkriterien: AVATAR_DEPTH_CONTRACT.md. Etappe 2 bleibt für Vorder-/Hinterärmel und Kopfteile aktiv. Live-App, Profil, Belohnungshistorie, Schema, Service Worker und main bleiben unverändert. Abschlussnachtrag enthält nur Nachweise/Dokumentation, keine getestete Runtime oder Geometrie.
