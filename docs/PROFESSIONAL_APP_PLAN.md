# KONPASU: verlässliche App und späterer KI-Copilot

## Was „100 % funktionsfähig“ für die Entwicklung bedeutet

Eine pauschale Garantie für jede Situation und jedes Gerät ist nicht seriös. Freigabefähig wird ein Abschnitt, wenn seine verbindlichen Anforderungen umgesetzt, automatisch geprüft und auf den vorgesehenen Geräten abgenommen sind. Offene Fehler und ungeprüfte Fälle bleiben sichtbar. Grün in einem VM-Test ist kein Nachweis für reale iPhone-Persistenz. Eine erzeugte Illustration ist kein fertig geriggter Avatar.

## Reihenfolge und Abschlusskriterien

| Abschnitt | Ergebnis | Abnahme |
|---|---|---|
| 1: Avatar/Artbooks, jetzt | Passende Basis und erstes gleichzeitig tragbares Fünferset; danach alle 95 Artikel | Stilabnahme, alle Einzelteile/32 Startkombinationen, Masken, Daten unverändert; AVATAR_ARTBOOK_PLAN.md |
| 2: Anziehmodell und vollständige Bibliothek | Mehrfachauswahl, Sets, Favoriten, Historie; Kategorien ohne verdrängende Slotgrenze | Alte Outfits erhalten, Rückweg, Paar-/Komplettlooks, mobile/Offline-Dateigrößen |
| 3: Verlässlicher Kern, begleitend | Sicheres Speichern, vollständiger Export/Restore, Training/Ziele/Nachträge und historische Zielversionen | Reales iPhone/Alt-PWA-Update, 100+ Trainings, Fotos, Zeitzonen/Sommerzeit, zwei Tabs/Quota, Nachweis-/Historienfälle |
| 4: Professionelle Bedienung | Schnelle Erfassung, verständliche Fehler, konsistentes DE/EN, zugängliche Oberfläche | 320/390/430px, Tastatur/VoiceOver, Kontrast, reduzierte Bewegung; echte Nutzungsabläufe |
| 5: Copilot-Aktionskern | Dieselben validierten Schreibaktionen für Formular und Chat; Aktionsprotokoll/Undo | Direkter eindeutiger Eintrag, keine Dopplungen, unklare Angaben offen, Abbruch/Savefehler/Undo/Datenkonflikt geprüft |
| 6: Sprachassistent | Chat/Sprache formuliert Vorschläge und löst erlaubte Aktionen aus | Kein freier Datenbankzugriff, keine erfundenen Werte, explizite Bestätigung bei großen/destruktiven Änderungen; Offline-Fallback |
| 7: Konto/Sync und Plattformausbau | Geprüfte spätere Infrastruktur, optional native Apps | Kosten-/Datenschutz-/Architekturentscheidung, Konfliktlösung, Gerätewechsel ohne Verlust; Offlinekern bleibt |

Die gerätebezogenen Kernprüfungen laufen begleitend, nicht erst nach Fertigstellung sämtlicher Grafiken. Eine fehlerhafte Speicherung hat vor gestalterischer Erweiterung Priorität. Einmal veröffentlichte Abschnitte werden durch Regressionen abgesichert; kein großer Komplettumbau als Voraussetzung.

## Der gewünschte Copilot: konkrete Bedienung

- „Trag für heute 500 ml Wasser ein.“ → eindeutige Werte in den normalen Wasserverlauf eintragen, Ergebnis anzeigen, Aktion rückgängig machen können.
- „Gestern Kniebeugen, drei Sätze mit 60 kg, acht Wiederholungen.“ → vorhandene Übung/Datum eindeutig zuordnen und dieselben Satzvalidierungen wie die Trainingsmaske nutzen. Bei mehreren passenden Übungen oder unklarer Zuordnung gezielt nachfragen.
- „Zieh mir den Schulterpanzer und den Lesefächer an.“ → vorhandene Artikel über IDs auflösen, wirkliche Tragbarkeit prüfen, beide erhalten; keine neue Freischaltung behaupten.
- „Ändere alle Trainings der letzten drei Monate.“ → vor Ausführung konkrete Vorschau und Bestätigung; nicht still alle Daten umschreiben.

## Architektur: vorbereiten, ohne jetzt externe KI vorzutäuschen

Ein gemeinsamer lokaler Aktionskern liegt zwischen UI und Datenspeicher. Beispielbefehle: LogWater, LogWorkoutSet, EditGoal, EquipItems. Jeder hat typisierte Felder, Größen-/Werte-/Datumsprüfung und dieselbe Fachlogik wie die manuelle App. Der spätere Sprachparser erzeugt einen solchen Befehl, niemals SQL oder beliebige JavaScript-Ausführung.

Ablauf: Nutzeranweisung → strukturierter Befehl → Validierung/Auflösung → nötigenfalls Rückfrage oder Änderungsvorschau → genau ein transaktionaler Save → sichtbarer Erfolg mit Aktions-ID. Idempotenz verhindert doppelte Einträge bei Wiederholung oder Netzwerkretry. Das Aktionsprotokoll speichert Herkunft, Zeitpunkt und konkrete Änderung, nicht notwendigerweise den ganzen privaten Chat. Undo verwendet einen geprüften Gegenbefehl und schützt zwischenzeitliche Änderungen anderer Tabs.

Erfolg erst nach bestätigter Speicherung melden; bei Konflikten Änderungen für Export erhalten. Ein KI-Timeout darf keinen halb angelegten Trainingssatz erzeugen. Zahlen/Zeiten nur aus tatsächlicher Nutzerangabe, Schätzungen ausdrücklich kennzeichnen. Gerätezeit und Zeitzone für „heute/gestern“ transparent behandeln.

Zuerst Befehle lokal und deterministisch testen. Danach optionales KI-Modell anschließen. API-Schlüssel gehören nicht in Appcode oder GitHub; echte Modellanbindung braucht eine eigene Infrastruktur-/Kostenentscheidung oder ein geeignetes lokal ausführbares Modell. Der kostenlose Offlinekern bleibt funktionsfähig. Aktuell ist dieser Copilot noch nicht implementiert; vorhandene Offline-Coachtexte sind kein autonomer KI-Agent.

## Was jetzt konkret begonnen wurde

Artbookaudit, 95er-Arbeitsinventar, erster visueller Basisentwurf und datenunabhängiger Ebenenplaner für fünf gemeinsam auswählbare Krafttrainingartikel. Dessen Regeln stehen in AVATAR_ARTBOOK_PLAN.md. Die Live-App bleibt unverändert, bis passende Grafiken und App-Anbindung tatsächlich geprüft sind.
