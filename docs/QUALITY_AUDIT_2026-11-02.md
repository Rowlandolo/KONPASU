# KONPASU – umfangreicher Fehler- und Bedienbarkeitsaudit

Basis dieses Abschnitts: lokaler Reviewstand 13cc483, nie veröffentlichte 2.4-Vorbereitung. Geprüft und geändert im Entwicklungsbranch; main und Live-App unverändert. Maßstab: verbindliches Masterbriefing, Datenerhalt und Quick First – Details Optional.

## Umfang und Belege

Quellcodeprüfung der aktiven Runtimepfade für Start/Speicherung/Restore, Profil/Avatar/Inventar, Favoriten/Begleiter, Wochen-/Tagesnachweise, Modusaggregate, CSV und Worker. Zusätzliche ausführbare Fehlerfälle statt bloßer Sichtprüfung. 156 aktuelle Tests bestehen (113 vorher, 43 hinzugekommen); alle vorhandenen Runtime-JS-Dateien syntaxgeprüft. tests/quality-audit.cjs reproduzierte zunächst 18 Problemfälle; der später ergänzte Start-Meilenstein-Test war ebenfalls zuerst rot.

Alle sieben Hauptansichten rendern als HTML in DE/EN mit neuem Profil und synthetischem Verlauf einschließlich zeitbasierter Sätze. Alle 47 Zielmodusdialoge werden mit den echten Renderfunktionen erzeugt. Das sind Node-VM-/Event-/Storage-/Cache-Doubles, keine echte Browser- oder Geräteabnahme. Premiumbundle und vollständiger Binärassetbestand sind lokal weiterhin nicht verfügbar. Lokale Browsernavigation ist administrativ gesperrt; keine Umgehung oder neue Screenshot-Abnahme.

## Befunde und Korrekturen

| Bereich | Fehler / Auswirkung | Korrektur und Nachweis |
|---|---|---|
| Backup / hoch | Nur Kernlisten geprüft; falsche Avatar-/Favoriten-/Modus-/Draftstrukturen konnten bis zum Ersetzen gelangen und danach abstürzen | Verschachtelte Struktur-, Listen-, Typ- und Datumsprüfung vor Bestätigung/Übernahme; unmögliche Kalendertage abgewiesen; problematische Objekt-/ID-Schlüssel blockiert. Fehlende zulässige optionale Altversionfelder bleiben erlaubt |
| Bestehende Daten / hoch | Shallow-migrierbare kaputte gespeicherte Unterstrukturen konnten beim Start wieder überschrieben werden | Dieselbe Validierung vor Migration von IndexedDB- und Fallbackdaten; Fehler sperrt Schreiben und erhält Originalbytes. Keine Reparatur durch Löschen oder stilles Entfernen |
| Restore / hoch | Fehler nach data=restored, aber vor erfolgreich abgeschlossenem Save konnten das Ersatzprofil im Speicher belassen | Vorherigen Arbeitsspeicherstand auch bei Award-Berechnungsfehlern zurücksetzen; bestätigter Erfolg, Abbruch, ungültiges Backup und Savefehler über tatsächlichen Change-Handler geprüft |
| Trainingsdaten / mittel | Gültige zeitbasierte Sätze ohne Wiederholungen wurden als defekt abgewiesen / Integritätscheck widersprach Import | Gemeinsame validWorkoutSet()-Prüfung: explizites nicht negatives Gewicht und Wiederholungen ODER positive ganzzahlige Dauer; keine Wiederholungen erfinden |
| Tagesnachweise / hoch | Meal-days sowie Screen-/Gaming-free-Ziele ignorierten passende Details im Tageskalender | Tatsächliche Mahlzeitprotokolle bzw. explizite freie Tage zählen; widersprüchliche private Nutzung verhindert freien Tag. Keine Belohnung allein aus Schweigen |
| DE/EN / mittel | Boolean/englische Bestätigungen, Work / school und englische Getränkewerte wurden teilweise anders aggregiert | Explizite Bestätigungsäquivalente und fachlich identische Getränkewerte erkennen; berufliche Bildschirmzeit in beiden Sprachen ausschließen |
| Anprobe / mittel | Grundausstattung und Beste Ausrüstung konnten weiter eine alte Anprobe anzeigen | Anprobe bei tatsächlichem Outfitgrundwechsel beenden; Ribbon sagt „nicht angelegt“ statt auch bei verdienten Items „nicht freigeschaltet“ |
| Zeitreise / mittel | Aktuelle Bearbeitung konnte unter historischer Heroansicht erfolgen; ungültiges Datum wurde übernommen | Aktive Studiobereiche zeigen heute; nur Zeitreise bleibt historisch. Reale Datumsprüfung und verständliche Rückmeldung, keine Historienänderung |
| Körpermaße / hoch | Der Körpermaße-Einstieg öffnete die komplette Altprofilmaske samt eingeschränkter Begleiterliste; Maße speichern konnte Look/Companion unbeabsichtigt verändern | Aktiver Maße-Einstieg zeigt nur fünf freiwillige Maße; expliziter Measure-only-Save erhält Darstellung, Kleidung, Begleiter und Avataroptionen. Leere Werte zulässig, negative/ungültige Werte nicht |
| Speicherung / hoch | Nach Quoten-/Lock-/Konfliktfehler blieb nach dem einmaligen Dialog kein dauerhafter Hinweis; vorherige Erfolgsmeldung konnte stehen bleiben | Sichtbarer Warnbereich auch nach Schließen des Alerts, irreführenden Toast entfernen; JSON-Export der geladenen ungesicherten Daten bleibt möglich |
| Meilensteinpersistenz / hoch | Auf Start neu berechnete Serien-Meilensteine wurden angezeigt, aber nicht zuverlässig gespeichert | Nur bei tatsächlich geänderter Awardliste oder neuem Katalogseed speichern; Folgeboot schreibt identische Historie nicht erneut und erhält IDs |
| Offline / hoch | Netzwerk-first HTML und Cache-first JS konnten bei vorhandenem Cache verschiedene Releases mischen | Navigation bevorzugt das zur installierten Runtime gehörende HTML. Neue Workerinstallation bleibt Updateweg. Fehlender Cache+Netz liefert erklärende 503-Seite statt leerem Response.error; keine Datenspeicherlöschung |
| Export / mittel | Ziele-CSV konnte trotz Tageschecks/Details leer sein; Trainings-CSV ließ Zeitwerte weg | Periodenschlüssel aus Tagesnachweisen und Details ergänzen; Dauer_s-Spalte exportiert Sekunden. JSON bleibt vollständiges Backup, Ziele-CSV eine Periodenzusammenfassung |
| Bedienung / mittel | Rerender verlor Tastaturfokus; Detailvorschau konnte außerhalb des sichtbaren Ausschnitts erscheinen | Fokus auf aktiven Status-/Award-/Slotfilter zurückführen, Detail öffnen/Schließen und Try-on gezielt fokussieren/scrollen; Studiobereiche als beschriftete Navigation mit aktivem Zustand |
| Unbekannte importierte Familie / mittel | Objekt-Prototypnamen konnten statt einer Reward-/Trackingfamilie als geerbte Funktion aufgelöst werden | Nur eigene Einträge der Familiendictionaries verwenden; Custom-Fallback und seine Seriengrafiken sind wieder gültig |

## Daten- und Kompatibilitätsgrenzen

Kein neues DB-/Profilschema, keine automatische Migration oder Datenbereinigung. Der Validator verändert die eingelesene Struktur nicht. Fehlerhafte oder bisher unbekannte nicht unterstützte Sicherungsstrukturen werden abgewiesen bzw. beim Start schreibgeschützt statt still normalisiert. Synthetische Backups der Datenversionen 2/4/10 bleiben erfolgreich geprüft; eine Garantie für jedes jemals existierende Fremd-/Altformat ist das nicht.

Die CSV-Ausgabe enthält nun zusätzlich Dauer_s: Verbraucher mit festen Spaltenpositionen müssen die Überschriften berücksichtigen. JSON-Exporte und gespeicherte Trainingsdatensätze bleiben unverändert. Meal-days/free-day-/Alias-Korrekturen können abgeleitete Statistiken und daraus korrekt belegte Rewards neu berechnen; rohe Protokolle werden nicht umgeschrieben. Vor realem Upgrade alte/neue Statistik vergleichen.

Der Snapshot-Schutz im Worker verhindert den normalen Mischstand, wenn die installierten Eintragsdateien vorhanden sind. Bereits aktive ältere Worker, verlorene/teilweise Caches, Quoten und echte iOS-Updates sind damit nicht vollständig abgenommen. Installierte App, Website-Daten und Nutzerdatenbanken niemals als Reparatur pauschal löschen.

## Bewusst offene Punkte / nächster sinnvoller Abschnitt

- Echte IndexedDB-Transaktionen, gleichzeitige Tabs und Wechsel Fallback↔IndexedDB, Geräte-/Offlineupgrade, Fokus und Layout in Safari/iPhone. VM-Smokes ersetzen keine Geräteabnahme.
- Großer echter Datenbestand, sehr große Fotos und umfassende semantische Validierung aller optionalen Importfelder. Noch kein anwenderfertiges Rohdaten-Rettungswerkzeug für beschädigte Speicherstände.
- Private tägliche Obergrenzen aus alten manuellen Messwerten gegenüber expliziter Vollständigkeit: Format-/Semantikentscheidung vor einer rückwirkenden Änderung. Bestehende Einträge nicht heimlich umdeuten.
- Konsistenz bei Alkoholereignissen mit unbekanntem Alkoholgehalt und gleichzeitigem Freitagsnachweis weiter auditieren; nicht aus mehrdeutigen Daten bestätigte Erfolge erfinden.
- Tragbarkeit nach späteren Datenlücken (REW-06), qualitative Ernährungsbalance, vollständige historische Zielkonfiguration, Sets/30-Slot-Ausbau. Keine ungefragte Balanceänderung in diesem Abschnitt.
- Systematische DE/EN-Lokalisierung und vollständige A11y-/Kontrastprüfung stehen weiter aus; kein Anspruch „alles fehlerfrei“.

Als Nächstes die offenen Bewertungsfälle für Obergrenzen und widersprüchliche Konsumdaten mit schriftlich klaren Regeln und Regressionen behandeln; parallel vollständige Geräteabnahme ermöglichen. Neue Features erst nach diesen Kernqualitätsfragen priorisieren.
