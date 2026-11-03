# KONPASU: sechs Etappen bis zum vollständigen Artbook-Avatar

Zählstand: sechs größere Produktetappen; Etappe 1 technisch abgeschlossen, als Nächstes Etappe 2. Physische Gerätebestätigung bleibt in Etappe 5 vor Veröffentlichung erforderlich. Eine Etappe umfasst mehrere Implementierungen, Prüfungen und Korrekturen. Keine Zusage von sechs Chat-Nachrichten oder einer festen Fertigstellungszeit. Das Ziel hier ist der veröffentlichte Avatar mit allen 95 Standardartikeln; die ganze App und der spätere KI-Copilot haben zusätzliche Arbeitspakete in PROFESSIONAL_APP_PLAN.md.

| Etappe | Konkretes Ergebnis | Abschlusskriterium | Aktueller Stand |
|---|---|---|---|
| 1. Mobile Leistung und Grafikbudget | Bedarfsgesteuertes Laden, stabile Bildelemente, kleine Laufzeitgrafiken | Datei-/Quell-RGBA-Ziele und Browservergleich erreicht; Messgrenzen dokumentiert, physische Bestätigung in Etappe 5 | Technisch abgeschlossen: 0.77 MB Startgrafiken / 47.74 MiB Quell-RGBA, Originalvergleich beider Formen und 3× Pixeldichte bestanden |
| 2. Grafik- und Tiefenvertrag abschließen | Echte Vorder-/Hinterteile für Riemen, Ärmel und Kopfteile; Passform auf beiden Körpern | Kritische Kombinationen visuell abgenommen, keine schwebenden oder falsch überdeckten Fragmente | Läuft: Vorder-/Hintergeschirr und Vorder-/Hinterärmel auf beiden Formen geprüft und gesichtet; Kopfteil-/Haartiefen noch offen |
| 3. Avatar in die App einbinden | Inventar, Mehrfachauswahl, Besitz/Tragbarkeit, Favoriten und Historie aus derselben Datenbasis | Verlustfreier Datenvertrag und Rückweg, alte Auswahlen/Outfits erhalten, Import/Export und Offlinepfad getestet | Vorbereitet, neue Figur noch im Entwicklungsatelier |
| 4. Alle Artbook-Artikel übertragen | Restliche 90 Standardartikel mit ihren Modulfragmenten | 95 stabile IDs samt Voraussetzungen, Grafiken und Passform; kein stiller Ersatz bei Kombination | Erstes Fünferset als Prototyp; weitere 18 Pakete mit je fünf Artikeln |
| 5. Geräte-, Offline- und Datentest | Mobile Bedienung, VoiceOver, Speicher, echte PWA-Upgrades und Fehlerfälle | Reale Zielgeräte/Browser, Datenvergleich und Offline-Neustart bestanden | Chromium-Belege vorhanden; reales iPhone/Alt-PWA-Upgrade offen |
| 6. Prüfen und veröffentlichen | Geprüfter PR, versionierter Cache, kontrolliertes Update | Nutzerfreigabe, externes Backup, erfolgreicher Pageslauf für den Commit, Live- und Geräteprüfung | Aktuelle Entwicklung nicht veröffentlicht |

Eine erste nutzbare Liveversion mit dem Startset kann vor Abschluss aller 90 weiteren Grafiken erscheinen. Dafür müssen die zu dieser Lieferung gehörenden Leistungs-, Integrations-, Geräte- und Veröffentlichungsbedingungen bereits erfüllt sein. Noch nicht übertragene Artikel bleiben mit Besitz, Ausrüstung und Historie im bisherigen Renderer erhalten; kein stummes Ausblenden oder ungefragtes Umschreiben. Der erste Lieferumfang wird vor der Integration konkret festgelegt und geprüft.

## Technischer Abschluss von Etappe 1

Bisher startete das Atelier mit beiden Körpern, allen acht Rüstungsfragmenten und dem 6,3-MB-Artbook-Bundle. Die neue Laderegel startet nur Form A und das aktuelle Fünferset. Form B kommt bei ausdrücklicher Auswahl hinzu. Die Referenz ist eine bytegleiche Einzelkopie des Original-WebP und wird erst beim Öffnen angefordert. Gemeinsame Ressourcen werden pro Sitzung wiederverwendet; Fehlversuche lassen sich erneut laden. Eine verspätete Antwort darf eine neuere Körperwahl nicht überschreiben.

Unveränderte SVG-Bildknoten bleiben erhalten. Masken verweisen auf die aktive Bildfläche, statt große PNG-Daten erneut in jede Maske zu schreiben. Die isolierten Canvas-Prüfflächen werden erst durch einen tatsächlichen Snapshot-Aufruf angelegt. Source-PNGs und ihre Passformen bleiben unverändert.

Technische Budgetdatei: design/avatar/performance-budget.json. Wiederholbare Bestandsrechnung: `node scripts/avatar-budget.cjs`. Gegenwärtig gilt eine vorläufige Prototypobergrenze von 16 MB Startgrafiken, 20 MB gesamten Avatar-Dateien und 128 MiB geschätztem decodiertem Quell-RGBA. Die numerischen Produktionsziele von höchstens 8 MB Startgrafiken und 48 MiB Quell-RGBA sind nun erfüllt: 770,084 Startbytes, 1,099,250 Bytes insgesamt, 50,061,824 RGBA-Bytes (47.74 MiB). 18 erzeugte WebPs mit inhaltsabhängigen URLs ersetzen nur die Laufzeitauslieferung; kanonische PNGs und Registrierungen bleiben unverändert. Recipe v06 nutzt 864×1296 für die Basis und WebP-Qualität 0.98. Diese Zahlen sind keine Gerätefreigabe.

Die Dateirechnung verwendet HTTP-Nutzdateigrößen und Ausgabebreite × Ausgabehöhe × 4. Sie misst keine gesamte App-Netzlast und keinen tatsächlichen Browser-/GPU-Spitzenspeicher. Skriptzeiten aus Chromium schließen Bildaufbau/Paint nicht ein und ersetzen keine Messung auf dem Zieltelefon. Echte Gerätemessungen bleiben als Freigabebedingung in Etappe 5, bevor Etappe 6 eine Veröffentlichung erlaubt.

## Letzter Prüfbeleg

https://github.com/Rowlandolo/KONPASU/actions/runs/41544503356, Quellcommit c99b943e70666452aeba9e9a95fe0f05f2c4ad34: 245 Regressionen, App-Chromium und 19 Atelier-Prüfgruppen erfolgreich. 15 Start-WebP-Anfragen, begrenzte Bildabweichungen gegenüber Originalen, beide Formen sowie 390 px bei 3× Pixeldichte, Fehlerretry und Schutz vor verspäteter Antwort geprüft. Frischer Buildlauf 41544503475 erzeugt dieselben 18 Ausgaben und dasselbe Manifest bytegleich. Messwerte, tatsächliche Vergleichsbilder und Grenzen stehen in design/avatar/verification-delivery-v06.json. Die übrigen fünf Etappen und reale Gerätebestätigung sind damit nicht abgeschlossen.

## Erster Abschnitt von Etappe 2 / nächste Lieferung

Rückwärtige und vordere Geschirrriemen sind nun echte separate Grafikmodule für beide Körperformen; die bisherige posebezogene Geschirrmaske ist abgelöst. Passform ohne Gewand nach Sichtprüfung enger registriert und durch tatsächliche Alpha-Pixel abgesichert. 248 Regressionen, App-Chromium und 21 Atelier-Gruppen erfolgreich: Lauf 41547850324, verification-harness-depth-v07.json. Aktuell 0.76 MB Startgrafiken / 47.94 MiB Quell-RGBA; Etappe 1 bleibt numerisch erfüllt, reale Gerätebestätigung offen.

Ärmelabschnitt ebenfalls abgeschlossen: je Körperform zwei neue Gewandgrafiken, ein erhaltener Gewandschlüssel und gemeinsame Auswahl. Hintere Innenflächen hinter dem Körper; nur Frontgewand maskiert Armartikel. 255 Regressionen und 23 Atelier-Prüfgruppen grün (41551201193), Nachweis verification-sleeve-depth-v08.json. 0.76 MB Startgrafiken / 47.71 MiB Quell-RGBA; physische Gerätebestätigung bleibt offen.

Als Nächstes Kopfteil-/Haartiefen anhand eines vorhandenen Artbook-Artikels prüfen. Jedes Fragment behält seinen Artikelbezug; natürliche Verdeckung darf weder Artikel abwählen noch Besitz verändern. Neue Grafiken müssen denselben Auslieferungsbuild, Größenprüfungen und Original-/Mobilevergleich bestehen. Details und Prüfkriterien: AVATAR_DEPTH_CONTRACT.md. Etappe 2 bleibt bis zu diesem Kopfteilabschnitt aktiv.
