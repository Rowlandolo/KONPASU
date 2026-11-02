# Geräteabnahme – noch nicht durchgeführt

Keine Veröffentlichung dieses Entwicklungsstands. Ein echtes iPhone und eine lauffähige freigegebene Browserumgebung fehlen in dieser Sitzung. VM-Tests ersetzen diesen Schritt nicht.

## Voraussetzungen

Vollständigen Originalcheckout einschließlich Binärassets und premium-art-bundle.js verwenden, Änderungen in Entwicklungsbranch prüfen. Nur einen isolierten Testorigin bzw. separates Browserprofil mit synthetischen Daten benutzen. Persönliches Profil nicht mit der Testdatei überschreiben. Die aktuelle produktive PWA, Website-Daten und Datenbanken nicht löschen. Bestehende persönliche Daten vor späterem freigegebenem Live-Update extern als JSON sichern.

Beigefügte KONPASU-Geraetetest-Synthetisch.json enthält ausschließlich synthetische Daten und besteht die Importvalidierung. Bezugstag der Fälle: 26.10.2026, abgeschlossene Woche. Kein persönlicher Export erforderlich.

## Auf Chrome und iPhone/Safari jeweils protokollieren

Gerät/OS/Browserversion, Kandidat-Commit, Origin, Datum/Zeitzone und Ergebnis pro Zeile notieren. Alle Zeilen derzeit OFFEN.

| Schritt | Aktion | Erwartung |
|---|---|---|
| 1 | Testdatei im isolierten Profil importieren, vorher Abbruch prüfen | Abbruch erhält Ausgangsdaten; bestätigter Import lädt Testprofil |
| 2 | Alkohol, 26.10.: freie Bestätigung plus Getränk mit 330 ml ohne ABV ansehen | Tag offen, Konflikthinweis, kein erfundener alkoholfreier Tag |
| 3 | Fehlenden ABV über vorhandenen Detail-Editor als 0 ergänzen; danach als 5 ändern | 0 erlaubt den freien Tagesnachweis, 5 blockiert ihn; ursprüngliche Angaben editierbar |
| 4 | Gaming-Woche 26.10. mit 20 Minuten und Complete Yes, Zielwert auf 60 setzen | Abgeschlossene Woche unter Limit bestätigt; weitere 50 Minuten machen Überschreitung sichtbar |
| 5 | Zusätzlichen Eintrag löschen/korrigieren | Bewertung berechnet sich zurück; Awardhistorie nicht still gelöscht |
| 6 | Dieselben Daten als aktuelle laufende Woche testen | Unter Limit offen bis Wochenende; Überschreitung sofort sichtbar |
| 7 | Niedrigen manuellen Messwert plus höheres Detailprotokoll erfassen | Überschreitung bleibt sichtbar; keine Doppeladdition |
| 8 | Privatbildschirmzeit unter Limit, Complete Yes; Berufszeit hinzufügen | Privatlimit bestätigt, Berufszeit DE/EN beeinflusst es nicht |
| 9 | Bildschirmzeit als Wochenlimit konfigurieren, nur einen Tag vollständig bestätigen | Woche offen; erst sieben verschiedene Tage erlauben bestätigten Abschluss |
| 10 | Sprache wechseln, Tastatur/VoiceOver, 320/390/430 px prüfen | Konflikthinweise lesbar, keine abgeschnittenen Bedienelemente, Fokus nachvollziehbar |
| 11 | Eintrag speichern, Browser/PWA schließen und erneut öffnen | Echte IndexedDB erhält Datensätze und dieselbe Bewertung |
| 12 | Nach erfolgreichem Online-Erstladen Flugmodus, Kaltstart, Eintrag, Neustart | Kernfunktionen offline; neuer Eintrag persistiert; Avatarassets verfügbar |
| 13 | JSON exportieren, im zweiten isolierten Profil wiederherstellen | Ziele, Trainings, Rewards, Favoriten und Detaildaten inhaltlich gleich |
| 14 | Zwei Tabs mit konkurrierendem Save, danach Änderungen exportieren | Konflikt sichtbar, kein unbemerktes Überschreiben; ungesicherte Änderungen exportierbar |

Erst nach vollständigem Checkout und erfolgreicher Browserprüfung eine kontrollierte Upgrade-Abnahme mit bestehender PWA planen. Deployment und Nutzerfreigabe separat dokumentieren. Kein noch ungeprüftes Update nur für einen Test live stellen.
