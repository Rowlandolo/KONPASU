# Belohnungssystem – Gestaltung und schrittweiser Ausbau

Verbindliche Richtung: Masterbriefing §6, Premium Botanical mit erwachsener japanischer RPG-Ästhetik. Keine neuen Pflichtaktionen oder Strafen für Datenlücken. Dieser erste UI-Abschnitt verändert keine Freischaltschwellen, Besitzberechnung, Speicherstruktur oder historischen Awardregeln.

## Schritt 1: Sammlung verständlich und hochwertig präsentieren

Lokal umgesetzt:
- Ivory-/Salbeiflächen, klare Typografie und größere Originalillustrationen statt kompakter Listenzeilen. Dezente Stufenkennzeichnung, keine blinkende/überladene Seltenheitsinszenierung.
- Getrennte Übersichten für verdient, aktuell tragbar und tatsächlich angelegt. „Angelegt“ folgt resolveSlot(), nicht nur einer gespeicherten Auswahl. Vorgemerkte ruhende Auswahl bleibt erkennbar.
- Filter: alle, verdient, tragbar, angelegt, ruhend, gesperrt; separater Slotfilter für alle bestehenden 16 Plätze. Filter sind flüchtige UI-Zustände und lösen keine Speicherung aus.
- Tatsächlich belegte Erfolgswochen gegenüber unveränderten Stufenbedingungen 1/4/12/26/52. Der Fortschrittsbalken endet bei der jeweiligen Schwelle, fehlende Werte erscheinen als unbekannt. Keine Umdeutung von Lücken.
- Ruhende Ausrüstung bleibt als bereits verdient sichtbar. Vorschau gesperrter Gegenstände ist rein visuell. Anlegen ist nur bei vorhandener Tragbarkeit möglich; aus alten Profilen sichtbare Legacy-Ausrüstung lässt sich nun in einem Schritt abnehmen.
- Detailkarte mit Herkunftsziel, Slot, Stufe, Status, Fortschritt und klar getrennten Aktionen Anprobieren/Anlegen. Permanente Embleme bleiben in der Ruhmeshalle.
- Gebündelte SVG-Thumbnails als Fallback, wenn der Premiumbild-Resolver nicht vorhanden ist. Kein neuer externer Bilddienst, keine neuen Assets erforderlich.

## Test- und Vorschaustand

156 Node-Regressionstests erfolgreich, acht davon neu für diese Sammlung. Die Tests prüfen Statuszuordnung, Filter ohne Datenspeicherung, ruhende Items, Legacy-Ablegen, Fortschrittsgrenzen, Escaping und englische UI-Texte. Vorhandene Equip-/Vorschau-/Persistenztests bleiben grün.

`node scripts/reward-preview.cjs /pfad/vorschau.html` erzeugt eine eigenständig öffnbare HTML-Datei mit echten Runtimequellen und Original-SVGs, aber ausdrücklich synthetischen Zuständen und Save-Stub im Arbeitsspeicher. Sie ist ein Designprüfstand, keine vollständige installierbare App und kein Datenimport. Premiumbundle/Blueprintbilder fehlen in diesem Prüfstand; die alte Studio-Hero-/Navigationsfläche ist nur dort ausgeblendet.

Chromium/Playwright sind inzwischen vorhanden. Der Browserstart scheitert in der Prozess-Sandbox; nach separatem Start ist die lokale file:-Navigation mit ERR_BLOCKED_BY_ADMINISTRATOR gesperrt. Deshalb wurden weder Screenshots noch erfolgreiche Browserinteraktions-/Viewporttests behauptet. 320/390/430/768/1200 px, Fokusführung nach Rerender, Screenreader, Kontrast und reduced motion bleiben offen. Keine iPhone- oder Persistenzabnahme.

## Nächste kleine Lieferungen

2. Alle 95 Belohnungen fachlich auditieren: Ziel × Stufe × Slot × Grafik × Voraussetzung; ruhend versus verdient, Nachträge, Datenlücken und eigene Ziele mit Testfällen. Erst danach Balancing oder Unlockregeln verändern.
3. Ruhmeshalle und permanente Embleme visuell als eigene Sammlung ausarbeiten, Herkunft und Vergabedatum verständlich darstellen; historische Korrekturen absichern.
4. Begleiterentwicklung und Lieblings-Outfits konsistent gestalten. Sets und ungefähr 30 Slots erst nach explizitem Mapping und rückwärtskompatiblem Datenkonzept erweitern.
5. Finale Illustration/Z-Reihenfolge und echte Mobile-/Offline-Abnahme. Kein Anspruch auf fertiges Premium-Enddesign aus einem CSS-Abschnitt.


## Schritte 2/3: Audit und Ruhmeshalle

Der Schwellen-/Mappingaudit mit realen Appfunktionen ist in REWARD_AUDIT.md dokumentiert; er ersetzt keine visuelle Gesamtprüfung oder ungeklärte Balanceentscheidungen. Die Ruhmeshalle besitzt jetzt eigene Botanical-Embleme, Typfilter, Herkunftsziel und nachvollziehbare Datumsangaben. Gespeichert, belegt und Nachweis offen werden getrennt gezählt. Datenkorrekturen entfernen gespeicherte Serien-Auszeichnungen nicht mehr stillschweigend; offene Nachweise werden angezeigt und vergeben keine neue Ausrüstung. Acht Audit- und acht Ruhmeshallen-Regressionen ergänzen die bisherigen Tests.

Vorschau: `node scripts/reward-preview.cjs /pfad/ruhmeshalle.html trophy`. Wie die Sammlung ausschließlich mit synthetischen Beispieldaten, Save-Stub und ohne private Datenspeicher. Keine erfolgreiche visuelle Browserabnahme behauptet.


## Schritt 4: verständliche Voraussetzungen und direkte Zielkonfiguration

Sammlungskarten zeigen die heutige strukturierte Zielvorgabe (Mindestens/Höchstens, Wert, Einheit, Tag/Woche), ohne alte Beschreibungsstrings als verbindliche Metrik auszugeben. Fehlende/ungeeignete Vorgaben werden markiert. Detailkarten nennen Stufenschwelle, Herkunftsziel und passende Nachweislogik: sieben belegte Tage bei Tageszielen, verschiedene Tage bei Wochenfrequenz oder vollständige Dokumentation bei Obergrenzen. Pausen werden erklärt, frühere Erfolge bleiben.

„Ziel einrichten/anpassen“ öffnet den bestehenden passenden Moduseditor oder bei eigenen Zielen deren eigenen Editor. Aus der Belohnung heraus wird kein nicht gewählter Standardzielwert vorausgefüllt. Öffnen/Abbrechen speichert nichts; erst explizites Speichern verwendet den bestehenden versionierten Zielpfad. Filter und betrachteter Gegenstand bleiben erhalten. Flexible Ernährungsbalance ohne Zahlen bleibt wählbar; ihre derzeit fehlende messbare Rewardbewertung wird transparent erklärt statt heimlich eine Vorgabe einzusetzen.

Zwölf neue VM-/Eventregressionen prüfen Null-Ziele, Tages-/Wochen-/Maximum-Erklärungen, 0 als gültiges Maximum, unerreichbare Tagesfrequenz, reelles Editor-Rendering, Abbruch, Custom-Routing, EN/Escaping sowie den tatsächlichen Submitpfad für fehlende bzw. ausdrücklich eingegebene Zielwerte. Insgesamt 89 Tests erfolgreich. Kein neues Datenschema, keine Zielwertmigration und keine neuen Rewardschwellen.

Vorschau: `node scripts/reward-preview.cjs /pfad/voraussetzungen.html requirements`. Synthetische aktivierte Ernährungs-/Alkoholziele und geöffnete Ernährungsbelohnung; keine persönlichen Daten. Browser-/iPhone-Abnahme weiterhin offen.

Nächster Abschnitt: Begleiterkarten und Outfitverwaltung im selben Stil ausarbeiten; Entwicklungsformen, tatsächliche Tragbarkeit und gespeicherte Auswahl klar voneinander unterscheiden. Neue Sets/Slots oder Pflegepflichten werden dabei nicht vorausgesetzt.


## Schritt 5: Begleiter und Lieblings-Outfits

Sieben Begleiter erhalten eigene Botanical-Karten, vergrößerte Ausschnitte der unveränderten SVGs und eine Anzeige der vier aktuellen Entwicklungsformen. Jede Karte berechnet ihre Form unabhängig davon, ob sie ausgewählt ist. Grundform und Weiterentwicklung folgen unverändert tragbaren Stufen 0/2/4/5; bestehende Freischaltgates bleiben bestehen. Ein aktiver Fallback und eine gespeicherte, aktuell nicht verfügbare Auswahl werden ausdrücklich getrennt erklärt. Keine Pflegepflicht oder neue Freischaltregel.

petStatus() wird für Anzeige, aktuellen Begleiter, Entwicklungsstufe und Auswahlhandlung gemeinsam verwendet. Pausierte Quellziele können keinen gesperrten Begleiter neu auswählen; ungültige importierte Schlüssel zeigen Fuchs als Fallback ohne automatische Profiländerung. Auch während eines Fallbacks kann der Nutzer den Fuchs bewusst als neue Auswahl übernehmen.

Favoriten zeigen den heute tatsächlich tragbaren Look mit Szene und Begleiter. Gespeicherte Teile und davon aktuell tragbare Teile werden getrennt gezählt; ruhende Auswahl bleibt vorgemerkt und passende bestehende Ersatzteile können sichtbar sein. Speichern nimmt Legacy-Ausrüstung für Slots mit auf, die noch keine neue gespeicherte Auswahl besitzen; bestehende Rohwahl hat Vorrang. Beim ausdrücklichen Anziehen wird die aktive alte Legacy-Auswahl geleert, damit kein Teil aus dem vorherigen Look hineinmischt. Historischer Besitz und die gespeicherte Favoritenvorlage werden nicht gelöscht.

Umbenennen ist ergänzt; Löschen erfordert weiter Bestätigung. Ungültige/negative Indizes werden vor einer Mutation verworfen. Es werden keine neuen Favoritenfelder oder Datenmigration eingeführt: Ausrüstung, Gewandfarbe, Szene und Begleiter sind gespeichert, Haare/Mimik stammen wie bisher aus dem aktuellen Profil.

14 neue Regressionen: pausierte Auswahl, unselektierte Formen, ungültiger Begleiter, Fallbackwechsel, Legacy-Speichern/-Anziehen, unveränderliche Vorschau, Umbenennen, Abbruch/Löschbestätigung, negative Indizes, ruhende Teile, vier Stufen und EN/Escaping. Insgesamt 103 Tests bestanden; echte mobile Darstellung, Bildausschnitte und Persistenzabnahme bleiben offen.

Vorschauen: `node scripts/reward-preview.cjs /pfad/begleiter.html pets` bzw. `... /pfad/outfits.html outfits`; ausschließlich synthetische Beispiele mit Save-Stub.

Nächster kleiner Abschnitt: Ausrüstungsübersicht pro bestehendem Slot mit sichtbarem Teil, vorgemerkter Auswahl und verständlichem Grund für Ersatz/ruhenden Zustand. Noch keine ungeprüfte Erweiterung auf 30 Slots oder neue Sets.


## Schritt 6: Ausrüstung pro bestehendem Slot erklären

Neuer Studiotab „Ausrüstung“ zeigt alle 16 bestehenden Plätze. Jede Karte trennt die gespeicherte Auswahl vom heute aufgelösten Teil. Gründe unterscheiden Grundausstattung/Personalisierung, aktive Auswahl, andere tragbare Auswahl als Ersatz, Zielpause, nicht ausreichende belegte Stufe, nicht mehr zugeordnete Auswahl und ausgeschaltete Effekte. Ein sichtbares Ersatzteil überschreibt keine gespeicherte Auswahl. Der Header zählt aufgelöste zusätzliche Teile und vorgemerkte Plätze, keine Besitzfreischaltungen.

Besonderheit Aura/Effekte: resolveSlot() kann ein tragbares Teil liefern, während der Renderer es bei Intensität Aus nicht zeichnet. Die neue Übersicht kennzeichnet diesen Fall als ausgeblendet und zählt ihn nicht als sichtbaren Reward. Der Überblick bezieht sich auf den normalen Avatar ohne Try-on; Pixelüberlagerungen, fehlende Grafiken oder Blueprintfallback werden damit nicht gerätegeprüft.

„Auswahl ansehen“, „Ersatz ansehen“ und „Im Inventar öffnen“ wechseln nur in den passenden Inventarfilter und optional zur Detailvorschau. Keine automatische Ausrüstung, Löschung oder Speicherung. Beim Wechsel aus einer Zeitreise zur heutigen Ausrüstung wird nur das UI-Datum auf heute gesetzt; gespeicherte Historie bleibt unverändert. Keine Erweiterung auf 30 Slots und kein Eingriff in die vorhandene Auflösungs-/Freischaltlogik.

Zehn zusätzliche Regressionen, insgesamt 113 erfolgreich. Vorschau mit synthetischen Beispielen: `node scripts/reward-preview.cjs /pfad/ausruestung.html equipment`. Echte Layout-, Fokus-, Geräte- und Offlineabnahme weiter offen.

Nächster kleiner UX-Schritt: Inventar bei 95 Items gezielt durchsuchbar und nach Zielpfad filterbar machen, ohne Datenänderungen oder neue Freischaltregeln. Die bestehenden visuellen und Release-Gates bleiben bestehen.


## Qualitätsrunde nach dem Gestaltungsabschnitt

Auf Nutzerauftrag Fehleranalyse priorisiert: Anprobe-/Zeitreise-Zustände, Fokus, reiner Körpermaßeeditor, zusätzliche Tagesnachweise, Start-/Importschutz, Meilensteinpersistenz und Exporte korrigiert. Vollständiger Bericht: QUALITY_AUDIT_2026-11-02.md. Insgesamt 156 Tests; visuelle Geräteabnahme bleibt offen. Neue Inventarsuche wird hinter die offenen fachlichen Bewertungsfragen eingeordnet.
