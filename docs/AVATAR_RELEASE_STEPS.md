# KONPASU: sechs Etappen bis zum vollständigen Artbook-Avatar

Zählstand: sechs größere Produktetappen, Etappe 1 in Arbeit. Eine Etappe umfasst mehrere Implementierungen, Prüfungen und Korrekturen. Keine Zusage von sechs Chat-Nachrichten oder einer festen Fertigstellungszeit. Das Ziel hier ist der veröffentlichte Avatar mit allen 95 Standardartikeln; die ganze App und der spätere KI-Copilot haben zusätzliche Arbeitspakete in PROFESSIONAL_APP_PLAN.md.

| Etappe | Konkretes Ergebnis | Abschlusskriterium | Aktueller Stand |
|---|---|---|---|
| 1. Mobile Leistung und Grafikbudget | Bedarfsgesteuertes Laden, stabile Bildelemente, kleine Laufzeitgrafiken | Start-/Speicherziele mit passenden Auslieferungsdateien erreicht; reale Messwerte dokumentiert | Läuft: Form B/Artbook bei Bedarf, Bild-/Maskenwiederverwendung und lazy Prüfflächen umgesetzt; Produktionsgrößen noch offen |
| 2. Grafik- und Tiefenvertrag abschließen | Echte Vorder-/Hinterteile für Riemen, Ärmel und Kopfteile; Passform auf beiden Körpern | Kritische Kombinationen visuell abgenommen, keine schwebenden oder falsch überdeckten Fragmente | Gemeinsame Szene und Alpha-Verdeckung geprüft; zusätzliche Fragmente fehlen |
| 3. Avatar in die App einbinden | Inventar, Mehrfachauswahl, Besitz/Tragbarkeit, Favoriten und Historie aus derselben Datenbasis | Verlustfreier Datenvertrag und Rückweg, alte Auswahlen/Outfits erhalten, Import/Export und Offlinepfad getestet | Vorbereitet, neue Figur noch im Entwicklungsatelier |
| 4. Alle Artbook-Artikel übertragen | Restliche 90 Standardartikel mit ihren Modulfragmenten | 95 stabile IDs samt Voraussetzungen, Grafiken und Passform; kein stiller Ersatz bei Kombination | Erstes Fünferset als Prototyp; weitere 18 Pakete mit je fünf Artikeln |
| 5. Geräte-, Offline- und Datentest | Mobile Bedienung, VoiceOver, Speicher, echte PWA-Upgrades und Fehlerfälle | Reale Zielgeräte/Browser, Datenvergleich und Offline-Neustart bestanden | Chromium-Belege vorhanden; reales iPhone/Alt-PWA-Upgrade offen |
| 6. Prüfen und veröffentlichen | Geprüfter PR, versionierter Cache, kontrolliertes Update | Nutzerfreigabe, externes Backup, erfolgreicher Pageslauf für den Commit, Live- und Geräteprüfung | Aktuelle Entwicklung nicht veröffentlicht |

Eine erste nutzbare Liveversion mit dem Startset kann vor Abschluss aller 90 weiteren Grafiken erscheinen. Dafür müssen die zu dieser Lieferung gehörenden Leistungs-, Integrations-, Geräte- und Veröffentlichungsbedingungen bereits erfüllt sein. Noch nicht übertragene Artikel bleiben mit Besitz, Ausrüstung und Historie im bisherigen Renderer erhalten; kein stummes Ausblenden oder ungefragtes Umschreiben. Der erste Lieferumfang wird vor der Integration konkret festgelegt und geprüft.

## Aktuelle Etappe 1

Bisher startete das Atelier mit beiden Körpern, allen acht Rüstungsfragmenten und dem 6,3-MB-Artbook-Bundle. Die neue Laderegel startet nur Form A und das aktuelle Fünferset. Form B kommt bei ausdrücklicher Auswahl hinzu. Die Referenz ist eine bytegleiche Einzelkopie des Original-WebP und wird erst beim Öffnen angefordert. Gemeinsame Ressourcen werden pro Sitzung wiederverwendet; Fehlversuche lassen sich erneut laden. Eine verspätete Antwort darf eine neuere Körperwahl nicht überschreiben.

Unveränderte SVG-Bildknoten bleiben erhalten. Masken verweisen auf die aktive Bildfläche, statt große PNG-Daten erneut in jede Maske zu schreiben. Die isolierten Canvas-Prüfflächen werden erst durch einen tatsächlichen Snapshot-Aufruf angelegt. Source-PNGs und ihre Passformen bleiben unverändert.

Technische Budgetdatei: design/avatar/performance-budget.json. Wiederholbare Bestandsrechnung: `node scripts/avatar-budget.cjs`. Gegenwärtig gilt eine vorläufige Prototypobergrenze von 16 MB Startgrafiken, 20 MB gesamten Avatar-Dateien und 128 MiB geschätztem decodiertem Quell-RGBA. Ziel für die Produktion sind höchstens 8 MB Startgrafiken und 48 MiB Quell-RGBA. Diese Produktionsziele sind noch nicht erfüllt; das verhindert eine irreführende mobile Produktionsfreigabe.

Die Dateirechnung verwendet unkomprimierte HTTP-Nutzdateigrößen und native Breite × Höhe × 4. Sie misst keine gesamte App-Netzlast und keinen tatsächlichen Browser-/GPU-Spitzenspeicher. Skriptzeiten aus Chromium schließen Bildaufbau/Paint nicht ein und ersetzen keine Messung auf dem Zieltelefon. Bildgrößen/Auslieferungsformate und echte Gerätemessungen bleiben Teil dieser Etappe.

## Letzter Prüfbeleg

https://github.com/Rowlandolo/KONPASU/actions/runs/41533841108, Quellcommit e05b0c3f5228b10a83ef270fcac1b28045f1bf8a: 236 Regressionen, App-Chromium und 17 Atelier-Prüfgruppen erfolgreich. 15 Start-PNG-Anfragen, unveränderte vollständige Set-Aufnahmen, Fehlerretry und Schutz vor verspäteter Antwort geprüft. Messwerte und Grenzen stehen in design/avatar/verification-performance-v05.json. Das bestätigt den umgesetzten Teil von Etappe 1; die sechs Etappen sind dadurch noch nicht vollständig abgeschlossen.
