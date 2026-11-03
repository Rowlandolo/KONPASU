# Tiefenvertrag: Geschirr und Gewand in Etappe 2

Gilt ausschließlich für das Entwicklungsatelier und die beiden vorhandenen Standfiguren. Keine neue Pose, App-Persistenz oder allgemeine Produktionsfreigabe.

## Ein Artikel, zwei Grafikmodule

`strength-3` behält seine vorhandene Identität. Der bestehende Fragment-/Assetschlüssel `chest-harness` bezeichnet weiterhin die Vorderseite; `chest-harness-back` ergänzt die Rückseite. Auswahl und spätere Besitz-/Historiensemantik beziehen sich auf den Artikel, niemals auf ein zufällig sichtbares Fragment. Ein unvollständig aufgelöster Artikel bleibt vollständig ausstehend; keine halbe Ausrüstung.

Beide PNGs wurden aus der unverändert archivierten Geschirrgrafik als separate transparente Ebenen bildgeneriert, nicht durch grobe Polygonmasken aus einem Gesamtbild ausgeschnitten. Vorderseite enthält Zierflächen, Medaillon, Schnallen und Quasten. Rückseite enthält die beiden schlichten Rückriemen. SHA-256, native Maße, tatsächliche Alpha-Grenzen und Herkunft stehen in prototype-assets.json. Die frühere chest-harness.png bleibt unverändert erhalten.

## Zeichenreihenfolge

| Fläche | Tiefe | Regel |
|---|---|---|
| Hinterhaare | 100 | Vorhandene Basis |
| Rückwärtige Riemen | 150 | Hinter Körper und Kleidung, vor Hinterhaaren |
| Hintere Ärmelinnenflächen | 180 | Hinter Körper/Armen; keine Armverdeckungsmaske |
| Körper | 200 | Verdeckt Rückriemen durch eigene Alpha-Fläche |
| Schuhe / Gewand / Hakama / Obi | 300–350 | Vorhandene getrennte Basis |
| Vorderes Geschirr | 430 | Vor der Kleidung, unter Brust-/Schulterpanzer |
| Brust-/Schulterpanzer und Armartikel | 450–511 | Bestehende Reihenfolge und aktive Gewandverdeckung |
| Vorderhaare | 600 | Bestehende Basis |

Die Rollen `back` und `front` werden auf passende Tiefen geprüft; widersprüchliche Grafikmetadaten werden abgewiesen. Die neue Geschirrkomposition besitzt keine posebezogenen Clippolygone. Das Ausschalten der Gewandverdeckung verändert weiterhin nur erklärte Masken; Rückriemen bleiben physisch hinter dem Körper. Bei ausgeblendetem Körper/Kleidung werden sie sichtbar, bleiben aber derselbe ausgewählte Artikel.

Beide Fragmente besitzen eine eigene seitenverhältnistreue Registrierung für Form A und Form B. Auf B gilt dieselbe Gruppenvergrößerung von 1.12 für beide Teile; keine globale Streckung der Figur. Vorder-/Hinterteile sind Grafiken für diese Pose, keine automatische 3D-Rekonstruktion.

## Auslieferung und Abnahme

Front und Rückseite durchlaufen denselben Build und dieselbe Hash-/Maß-/Alpha-Prüfung wie alle vorhandenen Ausgaben. Aktuell sieben logische Basiswahlen mit acht Basisflächen und neun Ausrüstungsfragmenten: 17 Startgrafiken, 21 eindeutige Laufzeitdateien. Die Bildknotenobergrenze ist 17; Datei-/Quell-RGBA-Ziele bleiben unverändert. Originalmodus bleibt ein separater Vergleich zur jeweils aktiven kanonischen Grafik, kein Vergleich mit dem alten maskierten Geschirr/Gewand. Die älteren Budget-Hilfsfelder previousEagerStartupBytes/startupBytesAvoided rekonstruieren den Eager-Modus aus dem jeweils aktuellen kanonischen Bestand plus Referenzbundle; sie sind kein historischer Netztrace. Tatsächliche Startdateibytes werden getrennt im Browser geprüft.

Abnahme: beide Formen mit Geschirr allein und vollem Set sichten, getrennte Bilder ansehen, tatsächliche SVG-Pixel für Rückseite/Körper/Vorderseite prüfen, alle 64 Rewardzustände und 256 Basiszustände weiterhin bestehen lassen, fehlende Rückseite ohne Teilfigur abweisen, Auswahl beim Körperwechsel erhalten, mobile Größen-/Bildqualitätsgrenzen prüfen. Geräte-/Offlineintegration bleibt separat.

Stand: Geschirrabschnitt technisch und im Entwicklungsatelier visuell geprüft. 248 Regressionen und 21 Atelier-Prüfgruppen erfolgreich für 0a65c3c7d62943028fcd12e49a8021a91b195574, Lauf 41547850324. Frischer Build 41547850475 reproduziert alle 19 Ausgaben und das Manifest bytegleich. Rückseitenpassform nach tatsächlicher Ansicht ohne Gewand enger registriert; Browser prüft maximal vier Randpixel außerhalb der Körperalpha unterhalb rig y=190. A: 1, B: 3. 760,882 Startbytes / 47.94 MiB Quell-RGBA. Keine allgemeine Geräte- oder Nutzerfreigabe. Nachweis und archivierte Aufnahmen: verification-harness-depth-v07.json. Nächster grafischer Abschnitt: vordere/hintere Ärmel und Anschluss an Armartikel auf beiden Körperformen.

## Ärmelabschnitt: umgesetzt und geprüft

Der vorhandene Gewandschlüssel `kimono` und sein Schalter bleiben als gemeinsame Auswahl erhalten. Neue Vorder-/Hinterflächen gehören intern zu dieser Gruppe; sie erzeugen keine neuen Besitzartikel. Je Körperform zwei eigenständige bildgenerierte PNGs mit unveränderten Originalreferenzen. Die bisherigen 128 Basiszustände je Körper bilden dieselben logischen Kleidungswahlen ab; jede Gewandwahl liefert entweder null oder zwei Flächen.

Basisvertrag v4 speichert die erforderlichen Fragmente `kimono-back` und `kimono` unter einer logischen Gewandebene. `plan()` behält logische Wahlen, `artwork()` liefert die körperbezogenen Grafikflächen in physischer Reihenfolge. Hintere Innenflächen haben Tiefe 180, vollständiger Körper 200, Vordergewand 320. Die Armmaske referenziert ausschließlich die vordere Bildfläche `base-kimono`, niemals die hinteren Innenflächen. `scene-composer.js` übernimmt den Tiefenplan aus `base-layers.js`, das deshalb vorher geladen wird. Fehlende, doppelte oder rollenwidrige Flächen werden abgewiesen; erforderliche Decodes sind vollständig vor Darstellung abgeschlossen.

V3-Verträge bleiben validier- und planbar. Mobile Loader benötigen auch dafür explizite passende Quell-/Ausgabezuordnungen; fehlende alte Quellen fallen nicht still auf große Originale zurück. Dieser technische Vertrag ist kein gespeichertes Nutzerprofil und keine Storage-Migration.

Ärmelöffnungen, geschlossene Unterkleidung, Ellenbogen, Bänder und Armschienen auf beiden Figuren im Browser gesichtet. An allen acht Unterarm-/Handgelenkankern Frontalpha 0 und Körperalpha 253; hintere Innenflächen sind dort absichtlich vorhanden und werden vom tatsächlichen Körper überzeichnet. Reale SVG-Pixel bestätigen zusätzlich, dass die Rückfläche Armartikel nicht wegmaskiert. Einzelprobe am Gewandrand erlaubt <32 statt <20 Alpha für eine schwach geglättete Goldkante; andere isolierte Teile und die unabhängigen Qualitäts-/Passformgrenzen bleiben unverändert.

255 Regressionen und 23 Atelier-Gruppen erfolgreich für dde46f6de2c07a7b4bc7755e8a8ea6447827076a (Lauf 41551201193), bytegleicher Rebuild aller 21 Ausgaben plus Manifest (41551201181). Basis-Laufzeitauflösung 848×1272, hintere Innenflächen maximal 512 Pixel lange Kante, WebP-Qualität 0.98; kanonische PNGs unverändert. 761,978 Startbytes / 47.71 MiB Quell-RGBA. Physische Telefon-/GPU-/Spitzenspeichermessung bleibt offen. Nachweis: verification-sleeve-depth-v08.json.

## Nächster Abschnitt: Kopfteil und Haare

Zuerst ein vorhandenes Artbook-Kopfteil anhand seiner Abbildung und stabilen Artikel-ID zuordnen. Ein Legacy-Slotname allein beweist keine physische Kopfposition: strength-4 trägt historisch den Slot head, seine bestätigte Artbook-Grafik ist im Atelier Schulterpanzer. Dann echte hintere/vordere Kopfteilflächen mit Haaren auf beiden Formen registrieren, ohne andere ausgewählte Artikel zu verdrängen oder Voraussetzungen zu ändern. Kombinierbarkeit, Fehlerverhalten und Budgets erneut prüfen. Erst danach Etappe 3 mit geprüftem App-/Datenvertrag; neue Körperhaltungen und universelle 3D-Tiefen bleiben außerhalb dieser Lieferung.
