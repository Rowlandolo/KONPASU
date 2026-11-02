# KONPASU – Masterbriefing und verbindlicher Entwicklungsauftrag für Codex
**Übergabe: 02.11.2026 | Repository: `Rowlandolo/KONPASU` | Sprache: Deutsch**

## 0. Deine Rolle und die wichtigste Arbeitsregel

Du bist ab jetzt mein leitender Softwareentwickler, Architekt, UX-Designer, Qualitätsprüfer und technischer Projektmanager für **KONPASU** (diese exakte Schreibweise ist verbindlich). Bitte arbeite eigenständig, sorgfältig und schrittweise am GitHub-Repository `https://github.com/Rowlandolo/KONPASU`. Nutze die Informationen in diesem Briefing als **Produktanforderungen**, aber verifiziere technische Ist-Aussagen stets am tatsächlich aktuellen Code. Frühere Dokumentationen im Repository können veraltet sein.

**Mein Ziel ist ein wirklich benutzbares, ausgereiftes Produkt – keine Ansammlung von halbfertigen Screens oder Scheinfunktionen.** Priorisiere Stabilität, Datenerhalt, verständliche Nutzerführung und wissenschaftlich vorsichtige Auswertungen vor Feature-Masse. Entferne niemals stillschweigend bestehende Nutzerdaten oder Funktionen. Führe keine riskanten Änderungen auf `main` ohne meine Freigabe aus. Arbeite möglichst in einem eigenen Branch mit nachvollziehbaren Commits und Pull Requests, Tests und Rückweg.

**Kontextgrenze:** Du hast keinen automatischen Zugriff auf unsere früheren ChatGPT-Gespräche oder deren Dateien. Alles hier beschreibt die bisherigen verbindlichen Entscheidungen. Lies die Repo-Dateien selbst. Wenn ich das ZIP `KONPASU_2.4_Release_Kit_20261102.zip` bei Codex hochlade, verwende es als zu überprüfenden Entwicklungsstand – nicht blind als bewiesen fehlerfrei. Fehlt es, implementiere anhand der Spezifikation und des aktuellen Repositories. Ein ChatGPT-`sandbox:/...`-Pfad ist für dich nicht automatisch verfügbar.

## 1. Produktvision und Zielgruppe

KONPASU soll ein **ganzheitlicher, intelligenter Coach für Ziele, Gewohnheiten, Training, Ernährung, Reflexion, Motivation und persönliche Entwicklung** werden. Die App hilft, sinnvolle Ziele zu formulieren, alltagstauglich umzusetzen, Fortschritte ehrlich zu dokumentieren, Rückschläge zu verstehen und neue Strategien auszuprobieren. Sie soll nicht nur Daten sammeln, sondern dem Nutzer tatsächlich helfen, langfristig an seinen Zielen dranzubleiben.

- Zielgruppe: breite Nutzergruppe, auch jüngere Menschen; hochwertig, emotional zugänglich, motivierend, aber **nicht kindlich**.
- Kombination aus seriösem, wissenschaftlich informiertem Coach und **leichtem japanischem RPG-/Samurai-Fortschrittssystem**.
- Persönlichkeit und echte Entwicklung statt überladener Gamification oder manipulativer Streak-Strafen.
- **„Quick First – Details Optional“**: Jede wichtige Handlung muss schnell gehen; tiefere Eingaben, Analysen und Planungen sind freiwillig.
- Keine Pflicht zu täglichen Check-ins. Fehlende Daten sind grundsätzlich **unbekannt/neutral, nicht automatisch ein Misserfolg**. Jeder vergangene Tag und jede Woche bleibt nachvollziehbar nachträglich bearbeitbar.
- Rückschläge ohne Scham, kurze unterstützende Coach-Texte; keine übergriffigen Hinweise oder künstliche Erfolgsmeldungen.
- Langfristig eine echte **iOS- und Android-App**, nicht lediglich eine PWA. Die heutige installierbare Offline-PWA ist ein pragmatischer, kostenloser Zwischenstand und Test-/Entwicklungsfundament.

**Langfristiges Erfolgskriterium:** Ein Nutzer kann all seine gewählten Ziele, Trainings, Ergebnisse, Experimente und persönlichen Fortschritte an einem Ort verwalten; die App ist offline nützlich, zuverlässig synchronisiert, visuell begeisternd und motiviert auf respektvolle Weise.

## 2. Verbindliche Design- und UX-Richtung

Designlinie: **Japanese Minimal Zen → Botanical Zen → Premium Botanical / Zen 1.2 Soft Contrast**.

- **Hell, warm, ruhig, hochwertig**: Creme/Ivory, Nebelgrün, Salbei, Waldgrün, feine Naturakzente; ausreichend Kontrast und gute Lesbarkeit. Keine dauerhaft dominante dunkle Gaming-Oberfläche.
- Großzügiger Freiraum, organisch-weiche Rundungen, klare Typografie, hochwertige Kartengestaltung, subtile Schatten und wenige sparsame Pflanzen-/Blattdetails.
- Japanische Naturästhetik in kleinen Details, **keine riesigen Landschaftsbilder oder überfrachtete Dekorationen** im normalen UI.
- Startbildschirm ist **Variante C**: persönlich, mit **großem zentralem Ganzkörper-Avatar**, Tagesfokus, schnellen Aktionen und übersichtlichen Aufgaben. Diagramme auf dem Dashboard zurückhaltend bzw. tiefer platziert.
- Ruhige, schnelle Mikroanimationen; reduzierte Bewegung respektieren. Mobile-first für iPhone, später Android; Tablets und Desktop ebenfalls sauber.
- UI-Text kurz, konkret, ermutigend, sachlich. Keine unnötigen Modals, Pflichtdialoge oder langen Onboardings.
- Deutsch und Englisch konsistent, nicht per fragilem nachträglichem Textaustausch. Barrierefreiheit, ausreichend große Touch-Ziele und Screenreader-Labels.

## 3. Die 19 aktivierbaren Standardziele

Jeder Nutzer kann Ziele aktivieren/deaktivieren, anpassen sowie **eigene Ziele** erstellen. Pro Ziel gibt es Quick-Check-in, optionale Details, Kalender, Analyse und – sofern sinnvoll – Fortschrittsbelohnungen. Folgende 19 Zielvorlagen sind vereinbart:

**Sport (4)**
1. Krafttraining / Workouts: kompletter Trainingsplaner, echte Trainingseinheiten, Sätze und Verlauf.
2. Cardio: Joggen, Radfahren u. Ä.; Minuten, Strecke und optionale Details.
3. Alltagsbewegung / Schritte: Tagesbewegung, optional Sensoren später.
4. Beweglichkeit / Mobility: Übung bzw. Aktivität, Dauer und Verlauf.

**Gesundheit und Ernährung (5)**
5. Wasser: getrunkene Mengen; Wasser plus ungesüßter Tee/Kaffee zählen, konfigurierbares Tagesziel.
6. Schlaf: optional automatische Erfassung später; unkomplizierter manueller Schnell-Check-in, Dauer/Qualität.
7. Gesunde Ernährung: verständliche **Wochenbilanz** mit optionalen Tageszielen; zusätzlich ein tiefes, aber freiwilliges Ernährungsmodul mit Kalorien/Makros, Lebensmittel-/Rezeptdatenbank, Barcode und Foto als spätere Ausbaustufen. Schätzungen kennzeichnen.
8. Zucker: Tage ohne **zugesetzten** Zucker, manuelle Bestätigung und optionale Details.
9. Alkohol: alkoholfreie Tage bzw. Konsumereignisse, ohne moralische Wertung. Gewünschte schnelle Bedienlogik: Wenn nichts erfasst wurde, ist **kein Konsum protokolliert**. In Statistiken und Rewards dennoch zwischen „nicht protokolliert“ und **tatsächlich bestätigtem alkoholfreiem Tag** unterscheiden, um keine erfundenen Erfolge zu vergeben.

**Wissen und Produktivität (4)**
10. Lesen/Bücher: Lesetage pro Woche; optional Buch, Seiten, Minuten.
11. Sprachen: Lerntage pro Woche; Sprache, Zeit, Aktivität optional.
12. Weiterbildung: Weiterbildungstage pro Woche; Kurse/Meilensteine optional.
13. Konzentriertes Arbeiten / Deep Work: Fokuseinheiten pro Woche, Details/Timer optional.

**Achtsamkeit und Reflexion (2)**
14. Meditation: kurze Erfassung, Übung/Dauer optional.
15. Tagebuch / Reflexion: Reflexionstage pro Woche; private freiwillige Einträge.

**Soziales und Natur (2)**
16. Soziale Kontakte: gemeinsame Aktivitäten pro Woche.
17. Natur: Tage mit Aufenthalt in der Natur pro Woche.

**Digitales (2)**
18. Private Bildschirmzeit: Zeit pro Tag begrenzen, zunächst manuell, native Integration später.
19. Gaming: Zeit pro Woche begrenzen; keine voreiligen Erfolgsmeldungen bei unvollständigen Zeitdaten.

Für jedes Ziel eine **fachlich passende** Metrik und Eingabelogik verwenden; nicht alle Zieltypen mit demselben Häkchenmodell behandeln. Zielwechsel/-pausen, Einheiten, Teilziele, ungültige Eingaben und eigene Ziele müssen berücksichtigt werden. Keine unnötigen zusätzlichen Verpflichtungen.

## 4. Verbindliche Tages-/Wochenlogik und Datenqualität

- **Tagesziele** werden tageweise beurteilt; Standardanalyse: **30 Tage**.
- **Wochenziele** umfassen **Montag 00:00 bis Sonntag 23:59:59 in der lokalen Zeitzone**; Standardanalyse: **12 Wochen**. Eine Woche wird nach dem Wochenwechsel abgeschlossen und bei späterem Öffnen korrekt berechnet; kein dauernder Hintergrundprozess erforderlich.
- Aktivitäten für Wochenziele **tagesweise protokollieren**. Beispiel: Drei Workouts Mo/Mi/Fr ergeben 3/3; keine pauschale Wochenbestätigung darf nachträglich frei erfundene Trainingstage erzeugen.
- **Früher Erfolg**: Bereits am Mittwoch 3/3 anzeigen; weitere Einheiten (4/3, 5/3) weiterhin zählen und wertschätzen. Wochenrang-/Meilensteinlogik auf tatsächlich abgeschlossene und belegte Wochen abstimmen.
- Ein Tag mit mehreren Protokollen zählt für ein zieltypisches „Trainingstage/Woche“-Ziel grundsätzlich nur als **ein Tag**, nicht mehrfach. Echte Trainingsdaten können als Nachweis dienen. Reine Aufwärmsätze gelten nicht als vollständiges Krafttraining.
- **Unbekannt ≠ Nein.** Nicht dokumentierte Tage/Wochen dürfen keine falschen Misserfolge erzeugen. Eine vollständig dokumentierte abgeschlossene und verfehlte Woche darf als verfehlt gelten. Der Unterschied zwischen „nicht dokumentiert“, „teilweise“, „erreicht“ und „nicht erreicht“ muss sichtbar und mathematisch korrekt sein.
- **Obergrenzen** (Gaming, Bildschirmzeit etc.): Teilweise protokollierte Werte unter dem Limit beweisen noch keinen Erfolg; bestätigte Überschreitungen sind dagegen klar erkennbar.
- Versäumte und historische Einträge jederzeit nachtragen/korrigieren, einschließlich daraus resultierender Neuberechnung. Historische Ränge, Belohnungen und Trends müssen nachvollziehbar bleiben. Zukunftsdaten nicht als abgeschlossene Erfolge werten.
- Vorhandene Daten aus alten App-Versionen **niemals heimlich semantisch umdeuten**. Migrationen müssen explizit, geprüft und reversibel sein.

## 5. Vollständiger Krafttrainingsplaner (sehr hohe Priorität)

Angestrebte Nutzungsqualität ähnlich **Fitness Point Pro**, aber als eigenständiges KONPASU-System:

- Es existiert bereits eine Basisbibliothek mit ca. **97 Übungen**. Suche, Filter nach Muskelgruppen, Vorschau, Beschreibung, beteiligte Muskeln, saubere Illustration; eigene Übungen, Geräte, Kategorien und lokale Bilder.
- Übungen direkt aus Katalog/Detailansicht einem Plan zuweisen, **ohne dauernde Seitenwechsel oder Verlust des Kontexts**.
- Pläne erstellen/bearbeiten, Übungen hinzufügen, entfernen, umsortieren, duplizieren, konfigurierbare Sätze und Satzreihenfolge, Pausen, Supersatzgruppen.
- Training **nicht schon beim Öffnen eines Plans als begonnen zählen**. Start erfolgt erst beim tatsächlichen Protokollieren eines Satzes; abgeschlossene relevante Arbeitssätze bestimmen Trainingstage.
- Jeder Satz einzeln: kg, Wiederholungen, ggf. Dauer, Typ (Aufwärmen, Arbeitssatz, Dropsatz), RPE, Notiz, Geräteeinstellung; nachträglich ändern/löschen.
- Letzte Leistungswerte, Verlauf, Fortschritt und sinnvoll belegte persönliche Bestleistungen anzeigen; Eingabe schnell mit dem Daumen möglich.
- Laufende Trainingseinheit bearbeiten, pausieren, abbrechen, abschließen; doppelte Einheiten, reine Warm-ups und nachträgliche Änderungen korrekt behandeln.
- Trainingstage im Kalender, historische Einheiten abrufbar und nachbearbeitbar, Verknüpfung mit Krafttrainingsziel ohne Doppelzählung.
- Offline vollständig verwendbar. Keine erzwungenen Cloud-, Sensor- oder Bezahlfunktionen.

## 6. Avatar, Belohnungen und Gamification

Der Avatar ist ein **zentrales Alleinstellungsmerkmal**. Gewünschter Stil: hochwertige **2D-Soft-Anime-Ganzkörperfigur**, erwachsen, leicht dreiviertel-perspektivisch, inspiriert von japanischen Samurai-/Edo-Rängen und Kimono/Haori/Obi/Ausrüstung. Die Figur soll den Nutzer persönlich repräsentieren, später dezent animiert werden, jedoch **nicht** ins Kindliche oder in übertriebenes Kampfspiel-Design kippen.

- Aus bestehenden SVG-Layern komponierbar: Körperdarstellung, Frisur, Haarfarbe, Mimik, Gewandfarbe, Rüstung, Kopfteile, Gürtel, Schuhe, Armteile, Haupt-/Nebenaccessoires, Auren, Hintergründe, Begleiter. Aktive Ausstattung muss **wirklich am Avatar sichtbar** sein (nicht bloß auf einer statischen Blueprint-Grafik als Text angegeben).
- Körpermaße optional; leichte, respektvolle stilisierte Anpassung, keine Bewertung des Körpers und keine Messpflicht.
- 19 Zielpfade mit jeweils **5 Belohnungsstufen**; genaues Mapping `Ziel × Stufe × Slot × Grafik × Voraussetzung`. Eigene Ziele ebenfalls sinnvoll abbilden.
- **Temporäre Ausrüstung** spiegelt aktuellen Status und kann nach einem belegten Rückschlag vorübergehend nicht mehr tragbar sein; zuvor verdiente Dinge dürfen nicht als nie erworben verschwinden. **Permanente Embleme/Meilensteine** (z. B. 100 Tage, 1 Jahr) bleiben nach korrekt nachgewiesener Vergabe bestehen; nachträgliche Datenkorrekturen fachlich sauber behandeln.
- Historische Samurai-/Edo-Ränge, Inventar-Hybrid mit ungefähr **30 Slots**, Set- und Einzelitems, gespeicherte Lieblings-Outfits; Ausrüstungs- und Reward-Status klar unterscheiden.
- Verschiedene **entwickelbare Begleiter** mit mehreren Formen, ohne zusätzliche tägliche Pflegepflichten. Bei Outfitwechsel Begleiter synchronisieren.
- Probieren/Vorschau gesperrter Items erlaubt, **ohne Freischaltung oder Speichern als Besitz**. „Beste verfügbare Ausrüstung“ darf keine nicht mehr tragbaren Gegenstände behalten.
- Historie/„Zeitreise“ des Avatars und permanente Auszeichnungen sinnvoll dokumentieren.
- **3D-Sensei und vollständige 3D-Avatar-Ansicht sind spätere optionale Features – aktuell NICHT priorisieren.** Zuerst 2D, Basisfeatures, Tests und UX fertigstellen.

## 7. Intelligenter KI-Coach und Verhaltensunterstützung

Der Coach soll individuell, zurückhaltend, evidenzorientiert und **mit manueller Kontrolle** arbeiten. Er soll Erfolge erkennen, realistische Pläne anbieten und bei Schwierigkeiten helfen, ohne zu beschämen.

- Bei Bedarf WOOP (Wish, Outcome, Obstacle, Plan), Wenn-dann-Pläne, kleine freiwillige Reflexion bei Rückschlag (z. B. „anderer Grund“, „Training verschieben“).
- Kontextbezogene kurze, fundierte Coach-Texte; sparsame Erinnerungen, Ruhezeiten, adaptive Häufigkeit und freiwilliger Verzicht. Kein täglicher Zwang oder Strafe für Lücken.
- Umfangreiche explorative Musteranalyse: Zusammenhänge und Hypothesen **vorsichtig** formulieren, keine Kausalität aus Korrelation ableiten, Stichprobenumfang, fehlende Daten und mögliche Verzerrungen berücksichtigen.
- Optionale **Strategie-Experimente**: leichter A/B-Einstieg und bei Interesse wiederholte N-of-1-Vergleiche mit Hypothesen/Metriken; jederzeit abbrechbar, keine Zusatzpflichten, statistisch zurückhaltende Interpretation.
- Gewünschte **intelligente Automatik** bei Chat-Aktionen: eindeutige, risikoarme Einträge nach Nutzeranweisung unmittelbar übernehmen; bei Unklarheiten nachfragen; größere, destruktive oder mehrere Daten betreffende Änderungen nur nach expliziter Bestätigung. Doppelte Eingaben erkennen; Schätzungen kennzeichnen. Aktionen protokollieren und **rückgängig** machen können. Der Coach arbeitet mit denselben nachvollziehbaren App-Daten, nicht mit einer getrennten Schatten-Datenbank.
- KI darf keine unbewiesenen gesundheitlichen Diagnosen, falschen wissenschaftlichen Gewissheiten oder frei erfundenen Messwerte erzeugen. Kein API-Schlüssel im Client und keine geheimen Zugangsdaten in GitHub. Wo echte KI noch nicht kostenlos/sicher verfügbar ist, klare Offline-/Regel-Fallbacks statt vorgetäuschter KI.

## 8. Statistiken, Datenmodell und Synchronisierung

- Analysezeitraum standardmäßig 30 Tage (Tagesziele) bzw. 12 Wochen (Wochenziele); Zeiträume erweiterbar; Kalender und Detailanalyse vom Ziel direkt erreichbar.
- Erfasse neben Erfolgswerten auch Datenvollständigkeit/Verlässlichkeit, Zieländerungen, Notizen, wiederkehrende Muster, Streaks und Rückschläge. Ansichten sollen verständlich statt überladen sein.
- Cloud-Konto und **Synchronisierung stehen in der langfristigen Produktvision im Mittelpunkt**, **alle Kernfunktionen müssen trotzdem vollständig offline funktionieren**. Der aktuelle Stand muss zunächst **kostenlos und ohne laufende Serverkosten** nutzbar bleiben.
- Später, nach stabiler PWA-Basis, echte iOS-/Android-App mit geeigneter Architektur (als erwogene Richtung: React Native + Expo + TypeScript, lokale SQLite-Datenbank und Cloud-Sync). Die konkrete technische Wahl durch einen nachvollziehbaren Architekturvergleich absichern; **keine voreilige Komplettneuschreibung**.
- Zuverlässige Konfliktbehandlung bei Offline-Änderungen, Wiederverbindung, Gerätewechsel; niemals stillschweigende Datenverluste.
- Datensparsamkeit, transparente Exporte und klare Kontrolle über persönliche Daten. KI-Zugangsdaten nur serverseitig/vertraulich und nur wenn eine solche Infrastruktur eingeführt wird.

## 9. Verifizierter technischer Ist-Zustand am 02.11.2026

Repository: `https://github.com/Rowlandolo/KONPASU`  
Live-PWA: `https://rowlandolo.github.io/KONPASU/`  
Standardbranch: `main`  
Zuletzt über GitHub geprüfter `main`-Commit: `444bdb3981ccc03c550fb402c2cca9e45ad8a46a` (01.11.2026)  
`version.json`: **2.3.1**, Cache **`konpasu-offline-v231`**. **2.3.2 und 2.4 sind bisher nicht auf `main` veröffentlicht.** Vor Beginn unbedingt neu nachsehen, falls zwischenzeitlich etwas geändert wurde.

Aktuelle PWA ohne Build-System: `index.html`, `app.js`, `app.css`, `sw.js`, `manifest.webmanifest`, `version.json` plus Feature-Skripte:
- `features-v1.js`, `goal-modules.js`, `goal-calendar-v23.js`, `core-v15.js`
- `training-library.js`, `training-v22.js`
- `avatar2d.js`, `avatar-art-bundle.js`, `premium-art-bundle.js`
- `update-check.html` für Updateprüfung.

Wichtige Repo-Dokumente: `README.md`, `ANALYSE.md`, `FUNKTIONSSTATUS.md`, `PLAN_100_PROZENT.md`, `PRUEFBERICHT.md`, `TESTBERICHT_2.3.md`, `TESTSTATUS.md`. Sie stammen aus unterschiedlichen Versionen und sind **nicht durchweg der aktuelle verbindliche Produktplan**. `avatar-art-bundle.js` enthält **346 SVG-Einträge** (verschiedene Grafiktypen). `premium-art-bundle.js` ist umfangreich; bestehende Assets möglichst wiederverwenden.

**Stand nach früheren Arbeiten:** 19 Zielvorlagen und viele spezialisierte Modi, 97 Trainingsübungen und Workout-Basis, Offline-PWA, Kalender 2.3, Zweisprachigkeit, Avatar-/Reward-Vorarbeit, grundlegende Offline-Coach-/Analysefunktionen. **Nicht als fertig behaupten:** hochwertiger modularer Endavatar, lückenlos korrektes Inventar, vollständiger KI-Coach, echtes Cloud-Konto/Sync, native Apps, End-to-End-Gerätetests.

## 10. Bekannte technische Fehler und Grenzen – aktiv prüfen

### Priorität A: 2.3.2 – bestehende Fehler beheben

1. `avatar2d.js` verwendet `mkButton`, `displayTier`, `KPBackgroundControls`, ohne sie dort zu definieren. **Laufzeitursache anhand Scope und tatsächlicher Aufrufe prüfen**, fehlende Hilfen belastbar implementieren und testen. Avatar-Studio, Inventar und Gestaltungsbuttons dürfen nicht mehr beim Rendern abstürzen.
2. „Beste verfügbare Ausrüstung“ kann veraltete, inzwischen nicht tragbare Items in der Auswahl belassen. Freischaltung/Tragbarkeit vor jeder Auswahl prüfen, ohne historischen Besitz zu löschen.
3. Favoriten-Outfit kann `avatar2d.pet` ändern, aber älteren `profile.companion` nicht synchronisieren. Daten konsistent halten, vorhandene Favoriten erhalten.
4. Ruhmeshalle kann irreführend „keine Meilensteine“ anzeigen, obwohl eine andere Auszeichnungsart vorhanden ist. Gemeinsame Leerzustandslogik.
5. UI zeigt stellenweise hartkodiert „Version 1.8 · Avatar Studio“, obwohl `version.json` 2.3.1 ausweist. Zentrale, konsistente Versionsanzeige.
6. Event-/State-Konsistenz im Avatar prüfen, insbesondere alte und neue Ausrüstungswege, Try-on, Wechsel und erneutes Rendern.

### Priorität B: 2.4 – echte modulare Figur

Die bisherige große Avataransicht verwendet eine statische Blueprint-Bilddatei. Farben/Frisur/Outfit beeinflussen zwar gespeicherte Werte und Teile des Inventars, **aber nicht durchgehend die sichtbare Figur**. Ein **vorbereitetes, noch nicht veröffentlichtes 2.4-Release-Kit** existiert: `KONPASU_2.4_Release_Kit_20261102.zip` (ich kann es bei Codex hochladen). Laut Paket: `apply_240.py`, `apply_232_reference.py`, `avatar-composer-v24.js`, `avatar-v24.css`, `release_preflight.py`, `verify_live_deployment.py`, Regressionstests und Anleitung. Der Patch ist für 2.3.1 gedacht und enthält 2.3.2-Fixes. Frühere isolierte Tests meldeten 13/13 plus 4 Release-Checks erfolgreich, **kein Nachweis einer vollständigen Live- oder iPhone-Abnahme**. Vor Benutzung gegen den aktuellen Repo-Stand prüfen, Sicherheits-/Renderingprobleme ausbessern und Tests erneut ausführen.

### Weitere relevante Mängel

- Offline-/Service-Worker-Caching kann erfolgreiches GitHub-Pages-Deployment optisch verbergen. Neue Version und Cache-Schlüssel gemeinsam erhöhen; Assets vollständig precachen; Fallback und Updateverhalten auf iOS testen. **Nie als „Fix“ die PWA oder Browserdaten löschen lassen.**
- Trainingsplaner ist umfangreich, aber UX und Randfälle müssen gegen die vereinbarten Anforderungen geprüft werden (Planzuordnung ohne Navigation, Satzstart, Änderungen, Supersätze, Detailbilder etc.).
- Datenmigration/Restore und wissenschaftlich korrekte Kennzahlen haben noch Testlücken.
- Premium-Botanical-Stil muss appweit konsistent umgesetzt werden.
- Echte Hintergrund-Pushes, native Sensorzugriffe, umfassende Food-/Barcode-DB, Cloud-Sync und native Builds fehlen bzw. sind spätere Stufen.

## 11. Schritt-für-Schritt-Entwicklungs- und Veröffentlichungsplan

**Phase 0 – Bestandsaufnahme, Sicherheit und Projektdokumentation (sofort)**
1. Prüfe Repo, aktuelle HEAD-SHA, Dateien, Dependencies, git status, GitHub Pages / Workflows und vorhandene Tests. Keine ungeprüfte Annahme, dass die Repo-Dokumente stets aktuell sind.
2. Lege einen Feature-Branch an. Falls Codex keine Schreibrechte erhält, erkläre präzise die Sperre und liefere einen überprüfbaren Patch/PR-Vorschlag; **nicht** heimlich `main` verändern.
3. Prüfe, welche Dateien User-Daten ändern könnten, wie Speicher/Backups funktionieren und welche alten Formate unterstützt werden. Niemals private Exporte committen.
4. Überführe dieses Briefing in repo-eigene Dokumente, z. B. `docs/PRODUCT_SPEC.md`, `docs/ROADMAP.md`, `docs/KNOWN_ISSUES.md`, `docs/QA_CHECKLIST.md` und eine kurze `AGENTS.md` für Folgeaufgaben. Aktualisiere sie bei jeder abgeschlossenen Phase.
5. Erstelle reproduzierbare Testdaten: neu, alt, offline, unterschiedliche Sprache, viele Einträge, Lücken, nachträgliche Korrekturen und bestätigte Rewards.

**Phase 1 – KONPASU 2.3.2: Stabilität vor Feature-Zuwachs**
1. Obige Avatar-/Reward-Bugs mit reproduzierbaren Testfällen nachweisen.
2. Kleine isolierte Korrekturen implementieren, ohne Profil-/Ziel-/Workout-Datenformate unnötig zu verändern.
3. Regressionen für Buttons, Equip, Favoriten, Begleiter, Ruhmeshalle, Versionsanzeige, Speicherung, Restore sowie Ziele/Training durchführen.
4. Eigenen PR, verständliche Änderungsliste, Testresultate und Rollback erstellen. **Wenn 2.4 die Fixes vollständig und nachweislich enthält, sind keine zwei separaten öffentlichen Releases nötig.**

**Phase 2 – KONPASU 2.4: Modularer 2D-Avatar (direkt als nächstes umsetzen)**
1. Vorbereitetes 2.4-Release-Kit ansehen (falls hochgeladen). Alte Anker gegen aktuelle Dateien prüfen, keine Blindüberschreibungen.
2. Bestehende Original-SVGs zu einem stabilen Layer-Renderer mit richtiger Z-Reihenfolge, Körper-/Haar-/Gesichts-/Kleidungs-/Accessoire-/Hintergrund-/Begleiter-Ebene zusammensetzen.
3. Ausrüstung mit vorhandener `resolveSlot`-/Item-/Tragbarkeitslogik koppeln. Try-on bleibt rein visuell, bis Nutzer explizit anlegt; gesperrte Items nicht als Eigentum speichern.
4. Personalisierung, Szenen, Outfitwechsel und Rewards **sichtbar** und nach Reload korrekt darstellen. Alte Blueprint-Ansicht darf als Fallback dienen, nicht als Hauptlösung.
5. Rendering- und Interaktionstests, Mobile-Layout (320/390/430px), Sprachwechsel, Altprofile, Offline-Neustart, Performance und reduzierten Bewegungsmodus testen.
6. Versionsdatei, `index.html`, Service Worker und Asset-Liste synchron auf 2.4 erhöhen. PR erstellen, **nicht ohne Freigabe mergen**.

**Phase 3 – Rewards, Inventar, Begleiter und Avatar-Finaldesign**
1. Alle 19×5 Reward-Stufen und Slot-/Asset-Mappings auditieren; fehlende/inkonsistente Bilder und Unlock-Logik ergänzen.
2. Inventar-Hybrid/30 Slots, Sets, Favoriten, feste Embleme und temporäre Ausstattung fachlich korrekt implementieren.
3. Begleiter-Entwicklung und historische Ansicht konsistent machen; Design im freigegebenen Premium-Botanical-Stil polieren.
4. 3D bewusst weiterhin verschieben.

**Phase 4 – Workout-System perfektionieren**
1. 97er Katalog und eigene Übungen auditieren; Detailansicht und Planzuordnung ohne Kontextverlust.
2. Planeditor (Reihenfolge, Entfernen, Hinzufügen), Satzstart, Satztypen, Gewichte/Wdh, Notizen, Verlauf, Nachbearbeitung und Trainingskalender durchprüfen.
3. Doppelzählung und Grenzfälle des Krafttrainingsziels mit Testdaten verhindern.

**Phase 5 – Alle 19 Zielmodule und Kalender absichern**
1. Pro Ziel einen konkreten E2E-Prüffall samt Lücken, Nachträgen, Pausen, Einheitenwechseln, Aktivierung/Deaktivierung und eigenen Zielen schreiben.
2. Tages-/Wochenstatus einschließlich Sonntag/Montag-Grenze, frühzeitiger Erfüllung, Gaming-Obergrenzen und Nicht-Doppelzählung mathematisch prüfen.
3. Detailtracking, Kalender, Analyse und Reward-Folgen konsistent machen.

**Phase 6 – UX, Startseite und Premium Botanical**
1. Gewünschte Startseite C mit großem Avatar, Tagesfokus, Quick Check-ins und ruhiger Priorisierung finalisieren.
2. Alle Screens auf ein konsistentes helles Designsystem, gute mobile Bedienung, DE/EN und Barrierefreiheit bringen.
3. Leerzustände, Fehlermeldungen, Hinweise, Navigation und Updatefluss verbessern.

**Phase 7 – Coach, Analyse und Experimente**
1. Offline-Coach mit klaren, transparenten Regeln und zurückhaltenden Texten stabilisieren.
2. Ziele/Statistiken datenqualitätsbewusst auswerten; hilfreiche Muster und freiwillige WOOP-/Wenn-dann- und N-of-1-Experimente.
3. Sichere Chat-Aktions-Engine (eindeutig → ausführen; unklar → nachfragen; riskant → bestätigen; Protokoll + Undo). Echte KI nur mit sicherer Architektur und verständlicher Kosten-/Datenschutzstrategie.

**Phase 8 – Konto, Cloud-Sync und native App**
1. Erst nach stabiler Datengrundlage: Architekturentscheidung dokumentieren, Offline-First-Synchronisierung und Konfliktregeln prototypisch erproben.
2. Echte iOS-/Android-App planen (React Native/Expo + TypeScript/SQLite als erwogene Option), auf Windows entwickelbar; nicht zwangsläufig sofort PWA ersetzen.
3. Bestehende Daten migrieren können; Cloud optional verfügbar, Kernnutzung offline. Lauffähigkeit und Finanzierung ohne überraschende laufende Kosten bedenken.

**Phase 9 – Release-Qualität**
1. Automatische Unit-, Integrations- und Browser-E2E-Tests, Fehler-/Sicherheitschecks, Offline-/PWA-Speicher-, Backup-/Restore- und Migrationsprüfungen.
2. Echte iPhone-Homescreen-Abnahme inklusive Flugmodus, App-Neustart, Upgrade ohne Deinstallation, sonntäglichem Wochenwechsel und erhaltenen persönlichen Daten; später Android.
3. Release Notes und Versionierung; Performance, Accessibility, Datenexport, Rückweg dokumentieren.

## 12. Sicherheits-, Daten- und Release-Regeln – NICHT verhandelbar

1. **Vor jedem Live-Update** muss der Nutzer in der bestehenden KONPASU-App unter Einstellungen ein **JSON-Backup exportieren und außerhalb der App sichern**. Ein Git-Backup schützt Quellcode, nicht die persönlichen Browser-/PWA-Daten.
2. **Die installierte Homescreen-PWA nicht löschen** und keine Safari-Website-Daten, IndexedDB, localStorage oder Service-Worker-Speicher pauschal zurücksetzen. Das könnte lokale Daten vernichten.
3. Keine unaufgeforderte Schema- oder Storage-Migration, keine Testdaten im Nutzerprofil, keine stillschweigende Überschreibung von Backups. Vor/nach Upgrade Datenbestand vergleichen.
4. Keine Geheimnisse, Nutzerdaten, Schlüssel, private Check-ins oder persönliche JSON-Backups ins öffentliche GitHub-Repository committen.
5. Jede Änderung in kleineren, nachvollziehbaren PRs; Tests vor Merge; GitHub-Pages-Success nur für den **neuen Commit** akzeptieren. Danach `version.json` öffentlich prüfen und anschließend bestehende iPhone-App testen.
6. Cache-Key (`konpasu-offline-v...`) und precachete Quellen bei Releases korrekt versionieren, `version.json` nicht aus einem alten Cache lesen. Keine leeren Offline-Fallbacks.
7. Keine Behauptung „100 % fertig/fehlerfrei“, solange wichtige Funktionen oder echte Geräteabnahmen offen sind. Klar zwischen **implementiert, getestet, deployed und auf Gerät abgenommen** unterscheiden.
8. Wenn die große 2.4-Integration riskant ist, zuerst funktionale, kleiner geschnittene PRs; aktuelle 2.3.1 darf nicht beschädigt werden.

## 13. Arbeitsweise und Ausgabeformat in Codex

Für jede Aufgabe:

- Zuerst tatsächlichen Ist-Code lesen und einen **kurzen Befund** mit den relevanten Dateien/Fehlerursachen abgeben.
- Dann einen kleinen konkreten Implementierungsplan und Akzeptanzkriterien formulieren; wenn die Aufgabe klar ist, direkt **implementieren, nicht bei jeder Kleinigkeit erneut fragen**.
- Code ändern, passende Tests hinzufügen, Tests ausführen und Ergebnis ehrlich berichten; bei Blockern sichere Teilfortschritte liefern.
- Immer angeben: **Welche Dateien geändert? Welche Bugs behoben? Welche Tests erfolgreich/fehlgeschlagen? Daten-/Migrationsrisiko? Was noch offen?**
- Technische Entscheidungen in `docs/` dokumentieren, damit Kontext und Projektvision auch in neuen Codex-Sessions erhalten bleiben.
- Keine veralteten Versprechen aus früheren Chatprotokollen als verifizierten Ist-Zustand darstellen.

## 14. Dein unmittelbarer erster Auftrag – starte JETZT

**A.** Öffne `Rowlandolo/KONPASU`, zeige aktuellen Branch, HEAD-SHA, Dateistruktur und Versionsstand. Vergleiche diese Anforderungen mit dem tatsächlichen Stand. Lies insbesondere `avatar2d.js`, `app.js`, `app.css`, `index.html`, `sw.js`, `version.json`, `avatar-art-bundle.js` sowie die sieben Analyse-/Testdokumente.

**B.** Erstelle einen priorisierten **Ist-Soll-Fehlerbericht** mit reproduzierbaren Fällen. Prüfe als Erstes `mkButton`, `displayTier`, `KPBackgroundControls`, `best`, `use-favorite`, Ruhmeshalle und die 2D-Grafik.

**C.** Falls das Release-ZIP 2.4 beigefügt ist: inspiziere alle Dateien, führe `release_preflight.py` bzw. `apply_240.py --check` und die Tests zunächst **ohne Schreibzugriff auf `main`** aus. Falls es nicht beigefügt ist, sage kurz, dass du es für die direkte Übernahme brauchst, und arbeite währenddessen an der Codeanalyse weiter. Verbessere die Lösungen, wo nötig, statt alten Patch unkritisch zu übernehmen.

**D.** Lege einen Feature-Branch an und implementiere zunächst **2.3.2-Bugfixes plus 2.4-Layer-Avatar** möglichst in einem überprüfbaren PR. Keine Veröffentlichung auf `main` ohne meine ausdrückliche Freigabe und ohne Backup-Hinweis.

**E.** Stelle die zentrale Produktdokumentation und eine aktuelle Roadmap im Repository bereit. Nenne danach konkret den **nächsten kleinsten sinnvollen Arbeitsschritt**. Ich möchte ab hier KONPASU vollständig mit Codex weiterentwickeln, sodass die App konsequent bis zu einem professionellen, sicheren Produkt fortgeführt wird.

**Wiederhole nicht alle Rückfragen früherer Chats.** Die hier genannten Entscheidungen gelten als getroffen. Wo echte Produktkonflikte bestehen, dokumentiere sie und schlage eine begründete Lösung vor, statt stillschweigend Anforderungen zu verwerfen.
