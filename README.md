# KONPASU 2.3 – Tages-Check-ins und Zielkalender

Diese ZIP-Datei ist ein **vollständiges Offline-PWA-Update** für die bestehende KONPASU-Installation auf GitHub Pages. Alle Laufzeitdateien gehören ins Hauptverzeichnis deines vorhandenen GitHub-Repositories.

## Das ist neu

1. **Wochenziele jeden Tag abhaken:** Beispielsweise wird `3× Krafttraining pro Woche` durch drei einzelne, dokumentierte Trainingstage erreicht. Ein pauschaler Wochenhaken am Montag ist nicht mehr möglich.
2. **Frühzeitige Erfüllung:** Bei `3/3` erscheint sofort ein Hinweis auf der Startseite. Ein vierter oder fünfter Erfolg bleibt möglich und wird zusätzlich gezählt.
3. **Automatischer Wochenabschluss:** Die aktuelle Woche umfasst Montag bis Sonntag, 23:59:59 Ortszeit. Ab Montag, 00:00 wird die Vorwoche als abgeschlossen ausgewertet. Es ist keine Hintergrundverbindung nötig; die Anzeige wird beim nächsten Öffnen bzw. bei offenem Browser am Tageswechsel neu berechnet.
4. **Unbekannt ist nicht „Nein“:** Unvollständige Wochen ohne hinreichende Angaben werden nicht als nachgewiesenes Scheitern eingestuft. Sind alle relevanten Tage bewertet und die Vorgabe nicht erreicht, wird die abgeschlossene Woche als verfehlt ausgewertet.
5. **Kalender pro Ziel:** Unter „Ziele“ Kalender öffnen, vergangene Tage auswählen, direkt dort nachtragen oder korrigieren.
6. **Direkt zur Analyse:** Jede Zielkarte hat einen Button „Analysieren“. Die Analyse öffnet zuerst den passenden Tageskalender und die letzten zwölf Wochen und zeigt danach die bisherigen Statistiken.
7. **Trainingstagebuch berücksichtigt:** Ein abgeschlossenes Krafttraining mit Nicht-Aufwärmsätzen gilt als ein Trainingstag. Zusätzlicher manueller Haken am selben Tag wird nicht doppelt gezählt.
8. **Tägliche Ziele unverändert:** Wasser, Schlaf, Schritte und andere Tagesziele bleiben tageweise bewertbar.

## Wichtig bei bestehenden Daten

Alte pauschale Wochenbestätigungen werden **nicht** stillschweigend zu angeblichen Trainingstagen umgewandelt. Sie verbleiben im JSON-Backup und im Altbestand; für die neue genaue Tagesstatistik sind Tagesnachweise erforderlich. Bestehende Trainingseinheiten können dagegen aus dem Trainingstagebuch als Nachweise verwendet werden.

Bei Wochenzielen mit einer **Zeit-, Mengen- oder Obergrenze** (etwa Gaming-Minuten pro Woche) kannst du weiterhin jeden Tag dokumentieren. Eine bloße Folge von Tageshäkchen beweist jedoch keine aufsummierte Zeit oder Menge; für solche Ziele sind die gemessenen Detailwerte beziehungsweise eine vollständige Bestätigung erforderlich.

## Installation ohne Datenverlust

1. **Zuerst** in der bisherigen App unter „Einstellungen“ ein **JSON-Backup** erstellen und außerhalb der App sichern.
2. ZIP-Datei entpacken.
3. Sämtliche **App-Laufzeitdateien** einschließlich `goal-calendar-v23.js` aus dem ZIP in das Hauptverzeichnis von `Rowlandolo/KONPASU` hochladen/ersetzen. Dokumentationen und Testvorschaubilder müssen nicht auf GitHub liegen.
4. `https://rowlandolo.github.io/KONPASU/` in Safari **mit Internetverbindung** öffnen und aktualisieren.
5. Bestehende Homescreen-App starten und prüfen, ob Übungen, Trainings und Ziele vorhanden sind. **Die Homescreen-App nicht deinstallieren.**
6. Im Flugmodus tägliche Check-ins hinzufügen, App schließen und erneut öffnen; dann JSON-Backup und Rückkehr in den Online-Modus testen.

## Abnahmegrenzen

Die Browser-Abläufe und die Datumslogik wurden mit automatisierten Tests geprüft. Ein vollständiger, echter iPhone-Offline-End-to-End-Test ist noch ausstehend. „100% fehlerfrei“ wird nicht zugesichert.
