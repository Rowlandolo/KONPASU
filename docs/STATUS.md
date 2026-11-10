# KONPASU – Bestandsaufnahme und Entwicklungsstand

Datum: 03.11.2026. Verbindliche Produktquelle: PRODUCT_SPEC.md und vollständiges Masterbriefing. Dies ist eine Codebestandsaufnahme mit gezielten ausführbaren Regressionen, keine vollständige Produkt- oder Geräteabnahme.

## Verifizierte Basis und Arbeitsstand

- **Live: KONPASU 2.4.1 / `konpasu-offline-v241`**, Main-Merge `ee160643515cf89dbc5c1bde38245ea3210052e2` aus PR #12. Pages-Lauf [41648613896](https://github.com/Rowlandolo/KONPASU/actions/runs/41648613896) erfolgreich. `version.json`, HTML, Service Worker, Historienmodul, Artbook-Hauptmodul und Erscheinungsspeicher öffentlich mit HTTP 200 und exakt lokalen SHA-256 bestätigt. Echte iPhone-/VoiceOver-/Alt-PWA-Abnahme bleibt offen.
- Aktuelle Entwicklung: Startset in Entwurfs-PR [#3](https://github.com/Rowlandolo/KONPASU/pull/3); vollständiger Prototypkatalog in `feature/artbook-89-prototypes`, darauf aufbauender Entwurfs-PR [#4](https://github.com/Rowlandolo/KONPASU/pull/4); reiner Outfit-Leseadapter in darauf aufbauendem Entwurfs-PR [#5](https://github.com/Rowlandolo/KONPASU/pull/5); Mehrfachoutfit im Sitzungsspeicher in Entwurfs-PR [#6](https://github.com/Rowlandolo/KONPASU/pull/6); additiver Speichervertrag mit Rückweg in Entwurfs-PR [#7](https://github.com/Rowlandolo/KONPASU/pull/7). sichtbarer Mehrfacheditor in darauf aufbauendem Entwurfs-PR [#8](https://github.com/Rowlandolo/KONPASU/pull/8); gespeicherte Mehrfachausrüstung auf dem persönlichen Hauptavatar in darauf aufbauendem Entwurfs-PR [#9](https://github.com/Rowlandolo/KONPASU/pull/9). Persönliche Artbook-Anprobe in darauf aufbauendem Entwurfs-PR [#10](https://github.com/Rowlandolo/KONPASU/pull/10). Persönliche Speicherung mit Rücknahme und Artbook-Hauptansicht in Entwurfs-PR [#11](https://github.com/Rowlandolo/KONPASU/pull/11) auf #10. Entwicklungskandidat 2.4.1-preview.5 mit eigenem Cache und ausdrücklich gespeicherten additiven Feldern; kein Merge/Deployment und keine Änderung persönlicher Daten.
- Aktueller Avatar: zwei unabhängig gezeichnete Standfiguren, sieben Basiswahlen/acht Flächen, sechs PNG-Prototypartikel/zwölf Ausrüstungsfragmente. Zusätzlich alle übrigen 89 Artikel mit 134 Modulen im Katalog; Cardio, Schritte, Beweglichkeit, Wasser sowie `sleep-1` bis `sleep-4` besitzen Premiumkandidaten mit insgesamt dreiundvierzig getrennten Modulen, 65 Artikel bleiben Vektorstudien. 95/95 bleiben kombinierbar.

**Etappe 4 · Paket 4.16:** Die Bambusflasche (`water-1`) ist als hashgebundenes transparentes Einzelmodul für beide Körperformen umgesetzt. Einzelprüfung und 32-Modul-Übergang mit den vollständigen Premiumfamilien Cardio, Schritte und Beweglichkeit sind im Entwicklungsatelier grün; 190 Einzelrenderings, 19 Familienblätter, Offline-Warmzustand und null Speicherwrites bestätigt. Beleg: `design/avatar/verification-premium-water-v14.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.17:** Die Lackflasche (`water-2`) ergänzt ein zweites hashgebundenes Wasser-Zubehörmodul. Beide Wasserartikel bestehen gemeinsame Zwei-Modul-Komposition und den 33-Modul-Übergang mit Cardio, Schritte und Beweglichkeit auf Form A und B. Beleg: `design/avatar/verification-premium-water-v15.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.18:** Die Kristallfeldflasche (`water-3`) ergänzt ein drittes hashgebundenes Wasser-Zubehörmodul. Die ersten drei Wasserartikel bestehen gemeinsam und im 34-Modul-Übergang mit Cardio, Schritte und Beweglichkeit auf Form A und B. Beleg: `design/avatar/verification-premium-water-v16.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.19:** Die zeremonielle Wasserkalebasse (`water-4`) ergänzt ein viertes hashgebundenes Wasser-Zubehörmodul. Die ersten vier Wasserartikel bestehen gemeinsam und im 35-Modul-Übergang mit Cardio, Schritte und Beweglichkeit auf Form A und B. Beleg: `design/avatar/verification-premium-water-v17.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.20 und Wasser-Familienabnahme:** Das Quellendrachen-Gefäß (`water-5`) ergänzt Gefäß- und offenen Drachen-/Wassereffekt. Alle fünf Wasserartikel bestehen als sechs Module sowie im 37-Modul-Übergang mit Cardio, Schritte und Beweglichkeit auf Form A und B. Beleg: `design/avatar/verification-premium-water-v18.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.21:** Die Mond-Haarnadel (`sleep-1`) besitzt getrennte hintere Stifte und ein vorderes Mondsichel-/Blütenmodul. Nach visueller Passformkorrektur bleibt das Gesicht frei; Einzelansicht und 39-Modul-Übergang bestehen auf Form A und B. Beleg: `design/avatar/verification-premium-sleep-v19.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.22:** Der Traumkissen-Talisman (`sleep-2`) ergänzt ein dunkelblaues, gold eingefasstes Kissenmodul mit Mondhasen, Blüten, Wellenstickerei und Tragekordel. Die Kordel sitzt auf beiden Körperformen an der rechten Hand; beide Schlafartikel bestehen gemeinsam als drei Module sowie im 40-Modul-Übergang. Beleg: `design/avatar/verification-premium-sleep-v20.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.23:** Der Nacht-Haori (`sleep-3`) besitzt getrennte mitternachtsblaue Vorder-/Rückebenen mit offenem elfenbeinfarbenem Revers, Goldkanten und Nachtmotiven. Die offene Mitte erhält Gesicht, Kimono, Obi, Hände und Hakama; die ersten drei Schlafartikel bestehen als fünf Module sowie im 42-Modul-Übergang. Beleg: `design/avatar/verification-premium-sleep-v21.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.

**Etappe 4 · Paket 4.24:** Die Mondlaterne (`sleep-4`) ergänzt ein antikgoldenes, warm leuchtendes Einzelmodul mit Mondsichel, Sternöffnungen, Blütenranke und Quaste. Nach visueller Korrektur hängt sie an der rechten Obi-Kante; die ersten vier Schlafartikel bestehen als sechs Module sowie im 43-Modul-Übergang. Beleg: `design/avatar/verification-premium-sleep-v22.json`. Keine App-, Daten-, Rewardregel-, Service-Worker- oder Liveänderung.
- 280 Regressionen, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 13 neue Kataloggruppen erfolgreich für c4dcdff69d4c2536f2e11c1993dd7cbd7c46a9ca. [Katalognachweis](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939844); 190 sichtbare Einzelrenderings, 4.465 reine Paarplanungen je Körper und 19 gesichtete Familienbilder. Vollbeleg verification-catalog-v10.json.
- Etappen 1 und 2 technisch für das Startset abgeschlossen: 819,188 Bytes Startgrafiken, 1,155,204 Bytes insgesamt, 47.84 MiB rechnerisches Quell-RGBA; 24 WebPs plus Manifest bytegleich reproduziert. Original-/Mobilevergleich beider Formen und 390 px/3× bestanden und gesichtet. Physische Telefon-/GPU-/Peakabnahme bleibt Etappe 5 vor Veröffentlichung.
- **Etappe 3 technisch abgeschlossen:** 3.1 Leseadapter, 3.2 Mehrfachentwurf, 3.3 Speicherbackend und 3.4 Editor-/Hauptavatarintegration einschließlich persönlicher Artbook-Varianten, ausdrücklicher Speicherung/Rücknahme und vollständiger automatischer Schnappschüsse für alle neuen Avataraktionen. 445 Regressionen sowie 10 App-, 26 Atelier-, 12 Editor-, 13 Speicher-, 12 SVG-Hauptavatar-, 11 Varianten- und 15 Artbook-/Historien-Browsergruppen erfolgreich für `0749e4527c6fd1a847f373af0476dc0c42f13cd6`. Alle 95 Artikel sind prototypisiert und kombinierbar; die finale Premiumausarbeitung der 89 Vektorartikel bleibt Etappe 4. Kein allgemeines Fertigversprechen für die gesamte App.
- Lokaler Gitverlauf bleibt eine eigene Snapshot-Baseline. Remoteänderungen erfolgen auf dem echten Upstream-Branch mit erwartetem Parent und SHA-geprüften Dateien, kein Push der synthetischen lokalen Historie.

Die folgende Bestandsaufnahme und spätere Verlaufsabschnitte enthalten ältere Befunde. Maßgeblich für den aktuellen Lieferstand sind diese Übersicht und der jüngste Phasenabschluss.

Etappe-2-Geschirrabschnitt abgeschlossen, siehe aktueller Abschluss am Dokumentende und AVATAR_DEPTH_CONTRACT.md. Der frühere Zwischenstand mit offenem Build/Browser ist damit ersetzt. Live-App und Daten unverändert.

Ärmelabschnitt abgeschlossen; der Zwischenstand mit offenem Build/Browser ist durch den Phasenabschluss am Dokumentende ersetzt. V4 verlangt vollständige Gewandgruppen; v3-Verträge bleiben validier- und planbar, ihre Pixelquellen benötigen weiterhin eine passende explizite Deliveryzuordnung bzw. Originalmodus. Keine automatische Altquellen-/Profilmigration. Live-App und Daten unverändert.

Kopfteilabschnitt abgeschlossen; Einzelheiten und Belege im jüngsten Abschluss am Dokumentende. Frühere Zwischenstände beschreiben die Entwicklung und ersetzen nicht die aktuelle Übersicht.

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

## Abschluss Etappe 2, Ärmel: gemeinsame Gewandwahl mit zwei Tiefenflächen

Je Form zwei neue eigenständige transparente PNGs; vorherige Gewandgrafiken und übrige Quellbilder bytegleich erhalten. V4 gruppiert kimono-back und kimono unter der vorhandenen Gewandwahl. Sieben Schalter bleiben sieben, tatsächliche Basisflächen acht. Hintere Ärmelinnenflächen liegen auf Tiefe 180 hinter Körper/Armen (200), Frontgewand auf 320. Armmaske referenziert ausschließlich Frontstoff. Fehlende oder rollenwidrige Flächen scheitern vor einer Teilfigur; v3-Verträge bleiben planbar, ohne automatische Delivery-/Nutzerprofilmigration.

255 Regressionen, bestehende App-Chromiumprüfung und 23 Atelier-Prüfgruppen erfolgreich für dde46f6de2c07a7b4bc7755e8a8ea6447827076a: https://github.com/Rowlandolo/KONPASU/actions/runs/41551201193. Je 128 logische Basiszustände und 32 Rewardauswahlen pro Körper; jeder Gewandzustand hat null oder zwei Flächen. Alle acht Unterarm-/Handgelenkanker: Frontalpha 0, Körperalpha 253; hintere Fläche dort absichtlich vorhanden. Reale SVG-Pixel beweisen Rücken-/Körper-/Frontordnung und Frontmaskierung der Armartikel. Ein schwach geglätteter Goldsaum am bisherigen Hand-Randmesspunkt wird mit <32 Alpha vom undurchsichtigen Rest unterschieden; andere Teile weiterhin <20, unabhängige Passform- und Qualitätsgrenzen unverändert.

Grundoutfit und komplettes Set beider Formen, isoliertes Gewand, Einzelgrafikvorschauen sowie 3×-Mobil-/Originalaufnahme gesichtet. Keine schwebende Armrüstung oder Hände in isolierten Gewandbildern festgestellt. Aktuelle komplette Figur rekonstruiert deterministisch; Bodywechsel, Retry/Race, beschädigte Hinterärmeldatei ohne Teilfigur und null Speicherwrites geprüft. Kein vollständiger kartesischer Sichttest und keine universelle Poseabnahme behauptet.

Laufzeitbasis jetzt 848×1272, hintere Innenflächen maximal 512 Pixel lange Kante bei Qualität 0.98. Dadurch bleiben trotz zwei zusätzlicher Quellen die unveränderten numerischen Ziele erfüllt: 17 Startdateien mit 761,978 Bytes, 21 insgesamt mit 1,100,998 Bytes, 50,022,912 Quell-RGBA-Bytes (47.71 MiB). Frischer Build 41551201181 liefert alle 21 Ausgaben plus Manifest bytegleich. 3×-Originalvergleich: Gesamt-MAE 0.916/255, Gesicht 2.875, Gold 3.133, stärker abweichende Pixel 0.211 %. Verlustraster und Quell-RGBA-Schätzung sind keine Geräte-/GPU-/Peakfreigabe.

Nachweis: design/avatar/verification-sleeve-depth-v08.json; Vertrag und nächste Kopfteilkriterien: AVATAR_DEPTH_CONTRACT.md. Etappe 2 bleibt für Kopfteil-/Haartiefen offen. Live-App, persönliche Ziele/Trainings/Belohnungen, Schema, Service Worker und main unverändert. Abschlussnachtrag ergänzt nur Belege, Dokumentation und Registrierungsannotation, keine getestete Runtime oder Geometrie.

## Abschluss Etappe 2: Fokus-Stirnband und Haarüberlagerung

Das tatsächliche Artbook-Stirnband ist focus-1 (untere Reihe, Spalte 1, 1W). Legacy-Titel Konzentrationsstein, Slot main und Ein-Wochen-Nachweis bleiben unverändert; focus-2 zeigt bildlich eine Sanduhr. Bytegleiche Referenztafel/-karte und semantische Entscheidung in headwear-contract-v09.json. Drei eigenständige bildgenerierte PNGs: hintere Bänder auf Tiefe 90, Band 580 unter Pony 600, Schleife 620 davor. Haare und alle fünf Krafttrainingartikel bleiben unabhängig auswählbar; kein automatisches Ablegen. Fehlendes Kopfteilmodul lässt alle drei ausstehend, nicht eine halbe Kopfbedeckung.

262 Regressionen, bestehende App-Chromiumprüfung und 26 Atelier-Prüfgruppen erfolgreich für 633e50984f581db846495e011b7766a29d6fb70c: https://github.com/Rowlandolo/KONPASU/actions/runs/41555922134. 256 logische Basiszustände und 128 Rewardauswahlen als getrennte Suiten, acht Haarzustände beider Formen, tatsächliche SVG-Tiefenpixel, freie Gesichtsproben (alle Alpha 0), beschädigte Kopfteilgrafik ohne Teilfigur, Retry/Race und null Speicherwrites. Beide Figuren mit und ohne Haare, Kopfteil allein und Einzelgrafiken gesichtet; aktuelle unveränderte Screenshots archiviert. Kein vollständiger kartesischer Sichttest.

Laufzeitbasis 840×1260 bei Qualität 0.98; nur neue drei Kopfquellen verwenden explizite sichtbare Registrierungsgrenzen Alpha>16, vom Build anhand echter Quellpixel verifiziert. Vollständige native PNGs einschließlich schwacher Randpixel bleiben unverändert. 20 Startdateien mit 819,188 Bytes, 24 insgesamt mit 1,155,204 Bytes und 50,162,944 Quell-RGBA-Bytes (47.84 MiB). Unveränderte 8-MB-/48-MiB-Ziele erfüllt. Frischer Build 41555922095 reproduziert alle 24 Ausgaben plus Manifest bytegleich. 3×-Originalvergleich: Gesamt-MAE 0.931/255, Gesicht 3.334, Gold 3.135, stärker abweichende Pixel 0.226 %. Reale Telefon-/GPU-/Spitzenspeichermessung bleibt offen.

Optionales Fokus-Artbook lud beim ausdrücklichen Öffnen außerhalb des Sichtbereichs zunächst nicht: eager-Anforderung beim Öffnen sowie Lade-/Fehlerhinweis und Retry ergänzt; frischer Browserlauf erfolgreich. Vollbeleg: design/avatar/verification-headwear-depth-v09.json. Etappe 2 ist technisch für dieses Startset abgeschlossen: sechs Artikel, zwölf Ausrüstungsfragmente, zwei Standfiguren in einer Pose. Keine pauschale Abnahme aller künftigen Kopfartikel oder der übrigen 89 Standardartikel. Als Nächstes Etappe 3 mit verlustfreiem App-/Outfitvertrag und geprüftem Rückweg. Live-App, persönliche Daten, Schema, Service Worker und main unverändert. Abschlussnachtrag ergänzt ausschließlich Belege, Dokumentation und Registrierungsannotation.

## Abschluss: alle übrigen 89 Artikel als Vektor-Passformprototypen

Nutzerauftrag vom 03.11.2026 vor Etappe 3 abgearbeitet: alle 95 Artbook-Abbildungen auf fünf Originaltafeln einzeln zugeordnet, stabile IDs und Legacy-Voraussetzungen erhalten. 89 neue Vektorstudien mit 134 eigenen transparenten SVG-Modulen ergänzen die sechs bisherigen PNG-Prototypartikel. Beide Standfiguren, unabhängige Auswahl/Sichtbarkeit/Reihenfolge und echte Frontstoffmasken im separaten `design/avatar/catalog.html`. Es handelt sich um Passform-/Funktionsprototypen; die 89 Premiumzeichnungen bleiben ein eigener Arbeitsschritt.

280 Regressionen, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 13 zusätzliche Katalog-Browsergruppen erfolgreich für c4dcdff69d4c2536f2e11c1993dd7cbd7c46a9ca: [Kataloglauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939844), [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939822). Alle 4.465 Paare auf beiden Körpern im reinen Planer; 190 tatsächliche Einzelrenderings mit sichtbarer Pixeländerung (Minimum A 48 / B 61 Pixel bei 256×384). Alle 95 gemeinsam als Stressauswahl erhalten; keine Behauptung aller Paarungen als visuell abgenommen. Tatsächliche Außenstoffmasken verändern 563 Bildpixel und erhalten die Artikelgruppen.

19 Familienvergleichsbilder mit Originaltafelbereichen und beiden Figuren sowie Mischoutfits, 95er-Stressfigur, mobile Ansicht und Detailvergleich gesichtet und unverändert unter `design/avatar/review-catalog-v10/` archiviert. Verschobene bestehende Karten besonders bei Sozial/Natur erkannt: neuer Vergleich nutzt explizite Viewports der bytegleichen Gesamttafel, mit tatsächlicher Pixelprüfung der Begrenzung. Legacykarten bleiben unangetastet. Koordinatenrundung beseitigt Node-/Chromium-Hashabweichungen bei Perlen/Fächern. Gewandmotive, Bandführung und sichtbarere Aurasockel nach Sichtprüfung verfeinert.

Keine Live-, Daten-, Schema-, Besitz-, Rewardregel- oder Service-Workeränderung. Reales Gerät, PWA-Kaltstart/Upgrade, Mimikgrafiken, Griffposen, endgültige Schuhpassform und Premiumzeichnung bleiben offen. Vollbeleg und Grenzen: `design/avatar/verification-catalog-v10.json`; Lesefassung und Bedienung: `ARTBOOK_PROTOTYPE_REVIEW.md`; je Artikel vollständige Quelle, Module und beide Registrierungen: `ARTBOOK_95_PROTOTYPES.md`. Abschlusscommit enthält ausschließlich Dokumentation und Prüfbelege.

## Abschluss Etappe 3.1: verlustfreier Outfit-Leseadapter

`avatar-outfit-v25.js` projiziert aktuelle Auswahl, Favoriten und historische Schnappschüsse ohne Schreibzugriff. Parallele Legacy-/Slotwerte, ruhende/unbekannte Einträge, eigene Ziel-IDs und beide Begleiterfelder bleiben mit ihrer Herkunft erhalten. Artikelidentität und Grafikschlüssel sind getrennt; Besitz/Tragbarkeit und tatsächliche Altauflösung stammen aus den bestehenden APIs. Leere Favoriten bleiben leer. Ohne historische Quelle entsteht eine neutrale blockierte Ansicht statt einer erfundenen heutigen Vergangenheit.

303 Regressionen einschließlich 23 neuer Adapterfälle, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 12 neue Browsergruppen erfolgreich für **1d50304da6b818cf1181cb79fda02072755e8143**: [Regression und bestehender Browser](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680366), [synthetische Outfitprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680286). Acht UI-Fälle, exakte Quelltreue, 390-px-Layout, Textsicherheit, sichtbare Fehler und bedienbare bereits geladene Offlineansicht geprüft. Kein localStorage-/IndexedDB-Eintrag, keine Browserfehler. Sechs tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-contract-v01/` archiviert; Vollbeleg `design/avatar/verification-outfit-contract-v01.json`.

Entwurfs-PR [#5](https://github.com/Rowlandolo/KONPASU/pull/5) baut auf #4 auf. Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Die synthetischen VM-Fälle verwenden kontrollierte Wochen-/Tierwerte; sie sind keine vollständige Reward-/Kalender- oder Geräteabnahme. Etappe 3 insgesamt ist weiterhin offen. Als Nächstes folgt ein geordneter Mehrfachentwurf mit eigenen Artikelinstanzen, Sichtbarkeit, Reihenfolge und Undo ausschließlich im Sitzungsspeicher. Persistenz, Import/Export/Rollback und Appintegration folgen mit eigenem Prüfvertrag. Details: AVATAR_OUTFIT_CONTRACT.md.

## Abschluss Etappe 3.2: Mehrfachoutfit im Sitzungsspeicher

Eigene Werkstatt `design/avatar/outfit-draft.html` und reiner Editor `avatar-outfit-draft-v25.js` in Entwurfs-PR [#6](https://github.com/Rowlandolo/KONPASU/pull/6), aufbauend auf #5. Artikel unabhängig hinzufügen, ausblenden, sortieren und entfernen; Undo/Redo für alle Aktionen einschließlich Körperform und Reset. Stabile Instanzen erhalten eigene Ziel-IDs bei geteilter Grafik. Start nur mit tatsächlicher Altauflösung; vollständige Originalquelle unverändert. Jedes synthetische Beispiel behält seinen Entwurf während der geöffneten Seite; Neuladen verwirft ihn sichtbar angekündigt. Kein sessionStorage, localStorage oder IndexedDB-Zugriff.

**324 Regressionen (21 neu), bestehende App-/Atelierprüfung mit 26 Gruppen und 16 neue Chromiumgruppen erfolgreich** für `7b90e8a535e52d64b8f2767ef2954f1526b591e2`: [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823151), [Entwurfsprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823134). Tatsächliche UI-Undo/Redo-Kette, geteilte PNG-Grafik mit eindeutigen SVG-IDs, veränderte gleich tiefe SVG-Reihenfolge, 95er-Kombination mit 134 Vektor-/12 PNG-Modulen, DE/EN, 320/390/430 px, 44-px-Ziele, Warm-Offlinebetrieb und Fehlerfälle bestanden. Drei echte Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-draft-v01/` archiviert. Vollbeleg `design/avatar/verification-outfit-draft-v01.json`; Vertrag und Grenzen AVATAR_SESSION_DRAFT.md.

Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Historische Personalisierung, Szenen und gesonderter Legacy-Begleiter bleiben im Original erhalten; ihre Rendererübernahme ist noch offen. Prototypgrafiken, physisches Gerät und kaltes PWA-Upgrade bleiben eigene Gates. Als Nächstes Etappe 3.3: expliziter additiver Speicher-/Import-/Export-/Rollbackvertrag mit Datenvergleich und bestehendem Revisions-/Konfliktschutz. Noch keine dauerhafte Speicherung oder neue Figur in der Live-App.

## Abschluss Etappe 3.3: dauerhafter Outfitvertrag mit Rückweg

Entwurfs-PR [#7](https://github.com/Rowlandolo/KONPASU/pull/7) auf #6 ergänzt `profile.outfit25` ausschließlich nach ausdrücklichem Speichern sowie genau einen dauerhaften Rücknahmeeintrag `outfitRecovery25`. Reine Kandidatenprüfung und struktureller Datenvergleich in `avatar-outfit-persistence-v25.js`; Anbindung an dieselbe Speicherqueue, IndexedDB-Revision und Fallback-Web-Lock in `avatar-outfit-store-v25.js`. Alte Ausrüstung, Favoriten/History, Ziele/Trainings und unbekannte Daten bleiben erhalten. Frischer Besitz-/Tragbarkeitsnachweis; ruhende/unbekannte gespeicherte Wünsche bleiben erhalten, ohne als tragbar zu gelten. Rücknahme nach Neuladen ändert nur Outfitfelder und erhält spätere andere Einträge. Noch Backend/API, keine produktive Verbindung der neuen Editor-/Rendereroberfläche.

**350 Regressionen (26 neu), bestehende App-/26 Ateliergruppen, 16 bestehende Editorgruppen und 13 neue Speicher-Browsergruppen erfolgreich** für `b6e0d96c0d331360ab77a4a15e0ada309af9bfcb`: [Basis/App](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181636), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181657), [echte Speicherprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181638). Reale IndexedDB, Startup/Reload, vorhandene JSON-Backup-/Import-UI, frische Offline-Seite mit tatsächlichem Worker, konkurrierende Tabs, Queueüberlagerung, Rücknahme nach späteren Daten und erzwungener Put-Fehler geprüft. Browser-Evidenz über echte Reward-/Kalenderfunktionen mit expliziten Wochenmesswerten; keine Tier-/Evidenzstubs. Der synthetische Screenshot ist eine ausschließlich vom Test erzeugte Ergebniskarte, kein neues produktives Bedienelement. Belege unter `design/avatar/review-outfit-storage-v01/`, Vollbeleg `design/avatar/verification-outfit-storage-v01.json`.

Kandidat **2.4.1-preview.1** hat einen getrennten Cache `konpasu-offline-v241-outfit-preview1` und precacht alle vier neuen Laufzeitabhängigkeiten kritisch. Dieser Entwicklungsstand ist nicht veröffentlicht; main/Pages und persönliche Daten wurden nicht geändert. Nächster Abschnitt 3.4: Editorbedienung mit Speichern/Rücknahme und klaren Konfliktzuständen an die API anbinden, neuen Renderer samt Personalisierung/Szenen/Begleiter und Legacy-Rückweg integrieren. Physisches iPhone, VoiceOver und Alt-PWA-Upgrade bleiben eigenständige Abnahmen. Details: AVATAR_OUTFIT_PERSISTENCE.md.

## Abschluss Etappe 3.4.1: sichtbarer Editor mit Speichern, Konflikt und Rücknahme

Entwurfs-PR [#8](https://github.com/Rowlandolo/KONPASU/pull/8) auf #7 ergänzt den tatsächlichen Einstieg **Avatar → Outfits → Mehrfachoutfit bearbeiten**. Native Dialogbedienung mit Artbook-Anprobe, Artikelwahl/Suche, unabhängiger Sichtbarkeit/Reihenfolge, Körperform, Undo/Redo/Reset und ausdrücklichem Speichern. Separate dauerhafte Rücknahme ist bei ungespeicherten Entwurfsänderungen gesperrt. Schließen behält den Entwurf in der laufenden App. Vorhandene Ausrüstung, Favoriten, History, Ziele/Trainings und übrige Daten bleiben erhalten.

Konflikt zeigt klare Meldung, sperrt Speichern und erhält den Entwurf. „Neueste Daten laden · Entwurf behalten“ liest und validiert denselben Speicher, prüft lokale Appänderungen vor/nach dem Lesen und rebasiert nur auf ausdrückliche Aktion. Ungespeicherte andere Einträge werden nicht überschrieben; vorhandener JSON-Export ist erreichbar. Geprüfter Memory-Ausgangsstand nach Startup/Schreibabschluss, typisierter Konflikthinweis und erwartetes Recovery-Token ergänzen den vorhandenen Schutz. Keine automatische Wiederholung fehlgeschlagener Writes.

**366 Regressionen (16 neu), 12 neue UI-Browsergruppen, 13 bestehende Speichergruppen und bisherige App-/26 Ateliergruppen erfolgreich** für `cb18dd1142783b34331eed1d9566448f79c9c056`: [App/Tests](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795811), [sichtbare UI](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795808), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795918). Echter Offline-Neustart mit Anprobe, Speichern/Neuladen/Rücknahme, tatsächlicher Zweitab-Konflikt und behaltener Entwurf, lokale Fremdänderungen, JSON-Sicherung, DE/EN, 320/390/430 px, Touch/Fokus, Textsicherheit und Integritäts-Retry geprüft. 24 Liefer-WebPs reproduziert: [Build](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795888). Drei tatsächliche UI-Bilder gesichtet und unverändert archiviert; Bericht/Vollbeleg unter `design/avatar/review-outfit-editor-v01/` und `design/avatar/verification-outfit-editor-v01.json`.

Kandidat **2.4.1-preview.2** mit getrenntem Cache `konpasu-offline-v241-outfit-preview2`; alle benötigten Vorschauverträge/Skripte/24 WebPs sind kritisch precached. Keine Original-Artbooktafeln oder einzelnen 134 SVG-Dateien dafür geladen. Kein Main-Merge/Deployment und kein Zugriff auf private Browserprofile. **3.4 insgesamt bleibt offen:** Hauptavatarroute samt Personalisierung/Szenen/Begleiter, Favoriten/History und Synchronisierung mit Legacyaktionen ist der nächste Integrationsabschnitt 3.4.2. Die neue Standfigur wird in diesem Schritt ausdrücklich als Editor-Anprobe angezeigt, die bisherige Hauptdarstellung bleibt aktiv. Physische Geräte-/GPU-/VoiceOver-/Alt-PWA-Abnahme und finale Grafik bleiben offen. Vertrag: AVATAR_OUTFIT_EDITOR.md.


## Abschluss Etappe 3.4.2: Mehrfachausrüstung auf dem persönlichen Hauptavatar

Entwurfs-PR [#9](https://github.com/Rowlandolo/KONPASU/pull/9) auf #8 zeigt ausdrücklich gespeicherte Mehrfachausrüstung auf Hauptavatar und Home. Mehrere Instanzen gleicher Slots/Grafiken bleiben erhalten. Persönliche Körperdarstellung, Maße, Frisur/Farbe, Mimik, Gewandfarbe, Szene und belegte Begleiterform werden weiter aus dem Profil gelesen. Ausblenden/Reihenfolge, Inventaraktionen, Favoriten und historische Quellen sind abgestimmt. Ganze Legacy-Looks pausieren den erhaltenen Mehrfachlook; ausdrückliches Editor-Speichern reaktiviert ihn. Künftige Formate und überholte Recoveryquellen sind geschützt.

Browser-/Sichtprüfung fand und korrigierte den vorzeitigen Home-Start, deckende Caption-CSS auf Ausrüstungsspans und einen zusammengedrückten Fallback. Transparente Ausrüstung und volle Fallbackbreite mit Hinweis darunter sind jetzt zusätzlich im echten Browser geprüft.

**388 Regressionen (22 neu), 12 neue Hauptavatar-Browsergruppen, 12 bestehende Editorgruppen, 13 Speichergruppen sowie 10 App-/26 Ateliergruppen erfolgreich** für `d4d2948033ca6e102c2928b398ca0055023e9bb5`: [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771908), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771935), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41629772026), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771846). Vier tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-main-avatar-v01/` archiviert; vollständiger Beleg `design/avatar/verification-main-avatar-v01.json`. Nur synthetische Daten, kein privates Browserprofil, kein Deployment. Der nachfolgende Archivcommit enthält ausschließlich Dokumentation und Belege.

Kandidat **2.4.1-preview.3**, eigener Cache `konpasu-offline-v241-outfit-preview3`. Die Hauptansicht verwendet vorhandene personalisierbare SVGs. **Offen:** vollständige persönliche Varianten der neuen Artbook-Standfigur samt finaler Premiumgrafik, automatische lückenlose Historyeinträge je Editor-Save, historische Zielkonfiguration und physische iPhone-/VoiceOver-/Alt-PWA-Abnahme. Nächster Abschnitt 3.4.3: persönliche Artbook-Basisvarianten, Passform und geprüfte Umschaltung mit erhaltenem SVG-Rückweg. Vertrag: AVATAR_MAIN_OUTFITS.md.


## Abschluss Etappe 3.4.3a: persönliche Artbook-Varianten und Passformstudie

Entwurfs-PR [#10](https://github.com/Rowlandolo/KONPASU/pull/10) auf #9 ergänzt im tatsächlichen Mehrfacheditor eine ausdrücklich einschaltbare persönliche Artbook-Studie. Neun neue separate Zeichnungen: drei vollständige Köpfe/Mimiken und Vorder-/Hinterhaare für drei Frisuren. Drei Haar- und drei Gewandfarben werden mit alphaerhaltenden Farbfiltern dargestellt. Bestehende Profilwerte dienen als Ausgangspunkt; Körperform A/B bleibt ausdrücklich frei gewählt. Die persönlichen Regler verändern weder Profil noch Besitz oder Hauptavatar. Outfit-Speichern schreibt weiterhin ausschließlich den bestehenden Outfit-/Recoveryvertrag.

162 Kombinationen auf beiden Körpern mit dem sechs Artikel umfassenden PNG-Startset tatsächlich gerendert, Körper-/Ausrüstungsgeometrie und eindeutige IDs unverändert, Kopfteil-/Haar-Tiefenordnung in allen Fällen geprüft. Zusätzlich alle 95 Artikelidentitäten auf beiden Körpern komponiert; dies ist keine vollständige Sichtabnahme jeder möglichen Kombination. Drei Mimik-/Haarfarbwerte unterscheiden sich in tatsächlichen Pixeln. Original-/WebP-Vergleich: maximaler Alphafehler 0, sichtbarer Farb-RMSE 1,802745. Umschaltung zur Ursprungsansicht, Profilvergleich nach Save, DE/EN, 320/390/430 px/44px, Integritätsfehler mit Retry und erste Aktivierung nach frischem Offline-Neustart bestanden.

**402 Regressionen (14 neu), 11 neue persönliche Browsergruppen, 12 Hauptavatar-, 12 Editor-, 13 Speicher- sowie 10 App-/26 Ateliergruppen erfolgreich** für `dedbfedb4dbd6eb96f51a3d12b977f4fcfbc6a4a`: [Varianten/Passform](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882331), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882613), [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882357), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882476), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882422). Fünf tatsächlich im Browser erzeugte Bilder gesichtet und unverändert unter `design/avatar/review-personal-variants-v11/` archiviert; Vollbeleg `design/avatar/verification-personal-variants-v11.json`. Nur synthetische Daten, kein privates Browserprofil, kein Main-Merge/Deployment. Der folgende Archivcommit enthält ausschließlich Dokumentation und Belege.

Kandidat **2.4.1-preview.4**, Cache `konpasu-offline-v241-outfit-preview4`. Der 466.178-Byte-Atlas ist kritisch precached und wird erst beim Einschalten in der Anprobe decodiert. Die unveränderte Original-PNG wird nicht precached. Delivery lokal bytegleich mit Pillow 12.3.0/libwebp 1.6.0 reproduziert; zusätzlicher Quell-RGBA-Bedarf rund 6 MiB. Keine physische Peak-/GPU-Messung. Vertrag: AVATAR_PERSONAL_VARIANTS.md.

Die neuen Zeichnungen und Farbpaletten sind Studien für eine erwachsene Pose. Vollständige persönliche Körper-/Gesichts-/Hautvarianten, endgültige Premiumfarben, weitere Posen, reale Geräte/GPU/VoiceOver/Alt-PWA und universelle Passform bleiben offen. **Nächster Abschnitt 3.4.3b:** ausdrücklich bestätigte Übernahme persönlicher Werte mit feldbegrenztem Datenvergleich/Rückweg und Vorbereitung der Artbook-Hauptdarstellung mit Szenen/Begleitern sowie erhaltenem SVG-Rückweg. Noch keine automatische persönliche Speicherung oder Hauptavatar-Umschaltung.


## Abschluss Etappe 3.4.3b: persönliche Speicherung und Artbook-Hauptansicht

Entwurfs-PR [#11](https://github.com/Rowlandolo/KONPASU/pull/11) auf #10 ergänzt **Persönliche Einstellungen speichern**, eine feldbegrenzte dauerhafte Rücknahme und die separate Wahl **Artbook als Hauptansicht verwenden**. Frisur, Haarfarbe, Mimik und Gewandfarbe werden ausschließlich bei ausdrücklicher Änderung übernommen. Outfit-Speichern und dessen Rücknahme bleiben unabhängig. Quellen-/Revisionskonflikte und Schreibfehler erhalten lokale Entwürfe und spätere andere Einträge. Ausdrücklicher Refresh führt einen dreiseitigen persönlichen Vergleich aus; konkurrierende Änderungen desselben Feldes verlangen eine sichtbare neue Auswahl.

Startseite und Studio komponieren die persönliche Artbook-Figur mit allen gültigen sichtbaren gespeicherten Instanzen, vorhandener Szene und tatsächlich verfügbarem Begleiter samt belegter Form. Gemeinsame begrenzte Maßtransformation hält alle Figurteile zusammen. Vor erfolgreicher Integritätsprüfung bleibt der vollständige persönliche SVG-Avatar sichtbar; ausdrücklicher Retry und SVG-Rückweg erhalten Outfit/Profil. Favoriten und vorhandene vollständige historische Schnappschüsse verwenden eigene Quellen; fehlende Vergangenheit übernimmt keinen heutigen Look. Die Grundansicht bleibt für alte Profile unverändert, bis die neue Ansicht ausdrücklich gewählt wird.

**438 Regressionen (36 neu), 15 neue Browsergruppen, 12 bestehende Editor-, 13 Speicher-, 12 SVG-Hauptavatar-, 11 persönliche Varianten- sowie 10 App-/26 Ateliergruppen erfolgreich** für `0f72f4713487fb014a03d637e4a3f1b4624435e9`: [Speichern/Hauptansicht](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814087), [App/Regression/Atelier](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814128), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814084), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814297), [SVG-Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814314), [Varianten/Passform](https://github.com/Rowlandolo/KONPASU/actions/runs/41643814172). Echte synthetische IndexedDB-/Reload-/Offline-/Zweitab-/JSON-Restore-/Put-Fehlerfälle; keine privaten Profile und kein Deployment. Fünf tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-artbook-main-settings-v01/` archiviert; Vollbeleg `design/avatar/verification-artbook-main-settings-v01.json`. Der nachfolgende Archivcommit enthält ausschließlich Dokumentation und Belege.

Kandidat **2.4.1-preview.5**, Cache `konpasu-offline-v241-outfit-preview5`. Drei neue Runtime-Module und bestehende geprüfte Grafikabhängigkeiten kritisch precached, keine neuen Grafikdateien oder DB-/Schemamigration. Home-SVG-Regeln auf direktes Haupt-SVG begrenzt, damit Atlasfenster geschlossen bleiben; Szene über eigenen Viewport flächig gefüllt. Tatsächliche Eckpixel sind deckend, Figurenboden/Begleiter und Home-Button im Screenshot geprüft. Vertrag: AVATAR_SAVED_APPEARANCE_MAIN.md.

**Als Nächstes 3.4.4:** automatische vollständige Historien-Schnappschüsse für die neuen persönlichen/Outfit-/Ansichtsaktionen samt geprüftem Rückweg und letzte Integrationsabnahme. Bisher lesen die neuen APIs vorhandene Historie, legen aber nicht für jeden Save einen vollständigen historischen Look an. Etappe 3 insgesamt bleibt daher offen. Prototyppaletten/89 Premiumzeichnungen, vollständige Körper-/Gesichts-/Hautbandbreite und physische iPhone-/GPU-/VoiceOver-/Alt-PWA-Abnahmen bleiben weitere Gates. Main/Live bleibt unverändert bei 2.4.0.

## Abschluss Etappe 3.4.4 und technische Gesamtintegration

Entwurfs-PR [#12](https://github.com/Rowlandolo/KONPASU/pull/12) ergänzt `avatar-history-v25.js`. Jeder erfolgreiche neue Outfit-/Persönlichkeits-/Ansichts-Save sowie jede dauerhafte Rücknahme fügt exakt einen vollständigen resultierenden Profilschnappschuss hinzu. No-op, Konflikt und Schreibfehler fügen keinen hinzu. Feldbegrenzte Fehlerwiederherstellung entfernt nur den eigenen vorbereiteten Eintrag und erhält gleichzeitig entstandene andere Historie. Wartende normale Saves werden für Historie, Outfit und persönliche Felder auf den aktuellen Transaktionsstand rebasiert.

Alte sparsame Historieneinträge bleiben lesbar und werden weder ergänzt noch umgedeutet. Fehlende Vergangenheit übernimmt keinen heutigen Look. Gleiche Datum-/Zeitwerte werden stabil nach Einfügereihenfolge aufgelöst, zuletzt gespeichert gewinnt. Profilkopien enthalten den vollständigen Avatarzustand einschließlich Mehrfachoutfit, Personalisierung, Ansicht, Szene, Begleiter, Favoriten, Legacywerte und unbekannte Profilerweiterungen.

**445 Regressionen sowie alle sieben Browser-Workflows erfolgreich** für `0749e4527c6fd1a847f373af0476dc0c42f13cd6`: App/Atelier, Editor, Speicher, SVG-Hauptavatar, persönliche Varianten und Artbook-/Historienintegration. Echte synthetische IndexedDB-/Fallback-CAS-/Offline-/Reload-/Backup-Restore-/Put-Fehlerfälle bestanden. Etappe 3 ist technisch abgeschlossen. Vollbeleg `design/avatar/verification-stage3-complete-v01.json`, Vertrag AVATAR_HISTORY_STAGE3.md. 2.4.1 wurde über Main-Merge `ee160643515cf89dbc5c1bde38245ea3210052e2` und erfolgreichen Pages-Lauf 41648613896 live veröffentlicht; Kernressourcen öffentlich bytegleich bestätigt.
