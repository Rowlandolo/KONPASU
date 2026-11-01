# KONPASU 2.3 – Testbericht Tages- und Wochenziele

**Teststand:** 1. November 2026. Chromium headless mit lokal eingebetteten App-Dateien, keine Serverabhängigkeit.

## Automatisiert bestanden

- Die Anwendung lädt ohne JavaScript-Laufzeitfehler in den getesteten Browser-Abläufen.
- Wochenziel Krafttraining setzt Tagesbestätigungen statt einer einmaligen Wochenbestätigung.
- Drei Bestätigungen Montag, Dienstag, Mittwoch ergeben 3/3 und Status *erreicht* – bereits vor Sonntag.
- Eine vierte Bestätigung wird als 4/3 gespeichert; der Erfolg bleibt bestehen.
- Ein- und Ausschalten desselben Tageshakens, Teilweise-/Nein-Einträge und Nachträge funktionieren.
- Erfüllte Wochenziele werden als Hinweis auf der Startseite angezeigt.
- Zielkalender ist direkt über die Zielkarte erreichbar; Tag kann im Kalender selbst nachgetragen werden.
- „Analysieren“ aus einer Zielkarte öffnet die richtige Zielanalyse mit Kalender.
- Tagesziel Wasser bleibt unabhängig vom Wochenziel und lässt sich nachträglich bestätigen.
- Vorherige pauschale Wochenbestätigung wird **nicht** automatisch als Tageserfolg ausgegeben.
- Nachweislich verfehlte, vollständig dokumentierte **abgeschlossene** Wochen werden als *nicht erreicht* ausgewertet.
- Abgeschlossene Wochen mit fehlenden Tagen bleiben *unbekannt*, sofern die Erfüllung nicht eindeutig belegt ist.
- Bei Gaming-Wochenobergrenzen wird ein unvollständiger Wert unter dem Limit **nicht** vorschnell als Erfolg gewertet. Ein Wert über dem Limit wird korrekt als Verfehlung ausgewertet.
- Ziel- und Trainingsverläufe bleiben über JSON-Backup-/Migration-Datenstruktur zugänglich (synthetischer Logiktest).
- Kein horizontales Seitenüberlaufen in den geprüften Abläufen bei **320, 390, 430 und 768 px**.
- `app.js`, `goal-calendar-v23.js`, übrige Kern-JavaScript-Dateien bestehen die Syntaxprüfung.
- Die Service-Worker-Assetliste wurde auf vorhandene Dateien kontrolliert.

## Offene Abnahmen

- Echte Homescreen-App auf iPhone, Flugmodus und Datenerhalt nach App-Neustart.
- Live-Durchlauf von Sonntag 23:59 zu Montag 00:00 auf einem physischen Gerät.
- Sehr große Nutzerdatenbanken, viele gleichzeitig bearbeitete Ziele und neue Zielversionen innerhalb einer Woche.
- Detailtracking für sämtliche ungewöhnlichen Kombinationen aus Wochenziel, Einheitenwechsel und eigenen Zielkategorien.
- End-to-End-Regression aller spezialisierten Zielmodule und Trainingsfunktionen auf iOS und Android.

## Semantische Regeln

**Wochenziele nach Anzahl der Tage:** Tagesstatus `yes` oder sinnvoll belegter Trainings-/Detaileintrag zählt 1 pro Tag. Doppelprotokolle für denselben Tag zählen nicht doppelt. Erst nach Monats- oder Wochenwechsel abgeschlossene Wochen fließen in bisherige kumulative Rang-/Meilensteinberechnungen ein.

**Datenlücken:** Fehlende Tage bleiben unbekannt. Bei eindeutig erreichtem Ziel darf der Wochenstatus schon vor Wochenabschluss „erreicht“ lauten. Kein bestätigter Erfolg aus früheren pauschalen Wochenhäkchen ohne Tagesnachweis.
