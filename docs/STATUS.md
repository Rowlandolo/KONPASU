# KONPASU – Bestandsaufnahme und Entwicklungsstand

Datum: 02.11.2026. Verbindliche Produktquelle: PRODUCT_SPEC.md und vollständiges Masterbriefing. Dies ist eine Codebestandsaufnahme mit gezielten ausführbaren Regressionen, keine vollständige Produkt- oder Geräteabnahme.

## Verifizierte Basis und Arbeitsstand

- GitHub `main`: `444bdb3981ccc03c550fb402c2cca9e45ad8a46a`, Version 2.3.1, Cache `konpasu-offline-v231`.
- Letzter GitHub-Pages-Run: 41301820103, success für exakt diesen Commit. Öffentliche Live-URL konnte in dieser Sitzung nicht unabhängig gelesen werden; kein neuer Live-Versionsnachweis.
- Repository: 45 Rootdateien; kein package.json, kein Build-System, keine eingecheckten Workflows oder automatisierten Tests an der geprüften Basis. Pages verwendet einen von GitHub bereitgestellten Deploymentlauf; Einstellungen konnten nicht vollständig gelesen werden.
- Lokal: `feature/konpasu-24-audit`; verifizierter Textsnapshot als eigene Baseline, NICHT der originale Upstream-Gitverlauf. Die zuvor fehlenden Binärassets und premium-art-bundle.js wurden aus der am 02.11. gelieferten vollständigen Original-ZIP ergänzt. Alle 45 Originaldateien stimmen vor Übernahme exakt mit den bekannten Git-Blob-Hashes überein. Die Textsnapshot-Baseline bleibt ein eigener lokaler Gitverlauf; das neue Komplettpaket benötigt keine Patch-Anwendung.
- GitHub-Neuverbindung erfolgreich: Entwicklungsbranch feature/konpasu-24-reviewed-update vom unveränderten main angelegt. Die geprüften Dateien wurden direkt über GitHub übertragen: Entwurfs-PR https://github.com/Rowlandolo/KONPASU/pull/1. Kein Merge und kein Deployment. Frühere HTTP-403-Befunde weiter unten sind historische Sitzungsbefunde.
- Kandidat lokal: 2.4.0 mit 2.3.2-Fixes plus zusätzlicher Härtung. Produkt-/Datenversion und IndexedDB-Version bleiben unverändert.

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
