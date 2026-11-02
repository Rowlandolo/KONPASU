# Tiefenvertrag: Geschirr, erster Abschnitt von Etappe 2

Gilt ausschließlich für das Entwicklungsatelier und die beiden vorhandenen Standfiguren. Keine neue Pose, App-Persistenz oder allgemeine Produktionsfreigabe.

## Ein Artikel, zwei Grafikmodule

`strength-3` behält seine vorhandene Identität. Der bestehende Fragment-/Assetschlüssel `chest-harness` bezeichnet weiterhin die Vorderseite; `chest-harness-back` ergänzt die Rückseite. Auswahl und spätere Besitz-/Historiensemantik beziehen sich auf den Artikel, niemals auf ein zufällig sichtbares Fragment. Ein unvollständig aufgelöster Artikel bleibt vollständig ausstehend; keine halbe Ausrüstung.

Beide PNGs wurden aus der unverändert archivierten Geschirrgrafik als separate transparente Ebenen bildgeneriert, nicht durch grobe Polygonmasken aus einem Gesamtbild ausgeschnitten. Vorderseite enthält Zierflächen, Medaillon, Schnallen und Quasten. Rückseite enthält die beiden schlichten Rückriemen. SHA-256, native Maße, tatsächliche Alpha-Grenzen und Herkunft stehen in prototype-assets.json. Die frühere chest-harness.png bleibt unverändert erhalten.

## Zeichenreihenfolge

| Fläche | Tiefe | Regel |
|---|---|---|
| Hinterhaare | 100 | Vorhandene Basis |
| Rückwärtige Riemen | 150 | Hinter Körper und Kleidung, vor Hinterhaaren |
| Körper | 200 | Verdeckt Rückriemen durch eigene Alpha-Fläche |
| Schuhe / Gewand / Hakama / Obi | 300–350 | Vorhandene getrennte Basis |
| Vorderes Geschirr | 430 | Vor der Kleidung, unter Brust-/Schulterpanzer |
| Brust-/Schulterpanzer und Armartikel | 450–511 | Bestehende Reihenfolge und aktive Gewandverdeckung |
| Vorderhaare | 600 | Bestehende Basis |

Die Rollen `back` und `front` werden auf passende Tiefen geprüft; widersprüchliche Grafikmetadaten werden abgewiesen. Die neue Geschirrkomposition besitzt keine posebezogenen Clippolygone. Das Ausschalten der Gewandverdeckung verändert weiterhin nur erklärte Masken; Rückriemen bleiben physisch hinter dem Körper. Bei ausgeblendetem Körper/Kleidung werden sie sichtbar, bleiben aber derselbe ausgewählte Artikel.

Beide Fragmente besitzen eine eigene seitenverhältnistreue Registrierung für Form A und Form B. Auf B gilt dieselbe Gruppenvergrößerung von 1.12 für beide Teile; keine globale Streckung der Figur. Vorder-/Hinterteile sind Grafiken für diese Pose, keine automatische 3D-Rekonstruktion.

## Auslieferung und Abnahme

Front und Rückseite durchlaufen denselben Build und dieselbe Hash-/Maß-/Alpha-Prüfung wie alle vorhandenen Ausgaben. Insgesamt neun Ausrüstungsfragmente, 16 Startgrafiken und 19 eindeutige Laufzeitdateien. Die zusätzliche Rückseite erhöht die Bildknotenobergrenze auf 16; Datei-/Quell-RGBA-Ziele bleiben unverändert. Originalmodus bleibt ein separater Vergleich zur neuen kanonischen Grafik, kein Vergleich mit dem alten maskierten Geschirr. Die älteren Budget-Hilfsfelder previousEagerStartupBytes/startupBytesAvoided rekonstruieren den Eager-Modus aus dem jeweils aktuellen kanonischen Bestand plus Referenzbundle; sie sind kein historischer Netztrace. Tatsächliche Startdateibytes werden getrennt im Browser geprüft.

Abnahme: beide Formen mit Geschirr allein und vollem Set sichten, getrennte Bilder ansehen, tatsächliche SVG-Pixel für Rückseite/Körper/Vorderseite prüfen, alle 64 Rewardzustände und 256 Basiszustände weiterhin bestehen lassen, fehlende Rückseite ohne Teilfigur abweisen, Auswahl beim Körperwechsel erhalten, mobile Größen-/Bildqualitätsgrenzen prüfen. Geräte-/Offlineintegration bleibt separat.

Stand: Geschirrabschnitt technisch und im Entwicklungsatelier visuell geprüft. 248 Regressionen und 21 Atelier-Prüfgruppen erfolgreich für 0a65c3c7d62943028fcd12e49a8021a91b195574, Lauf 41547850324. Frischer Build 41547850475 reproduziert alle 19 Ausgaben und das Manifest bytegleich. Rückseitenpassform nach tatsächlicher Ansicht ohne Gewand enger registriert; Browser prüft maximal vier Randpixel außerhalb der Körperalpha unterhalb rig y=190. A: 1, B: 3. 760,882 Startbytes / 47.94 MiB Quell-RGBA. Keine allgemeine Geräte- oder Nutzerfreigabe. Nachweis und archivierte Aufnahmen: verification-harness-depth-v07.json. Nächster grafischer Abschnitt: vordere/hintere Ärmel und Anschluss an Armartikel auf beiden Körperformen.

## Nächster Abschnitt: Ärmel

Der vorhandene Gewandschlüssel `kimono` und sein Schalter bleiben als gemeinsame Auswahl erhalten. Neue Vorder-/Hinterflächen müssen intern zu dieser Gruppe gehören; zusätzliche Grafikfragmente dürfen keine neuen Besitzartikel und keinen Verlust alter Auswahlen erzeugen. Zunächst passende Teilgrafiken je Körperform entwerfen und ihre Übergänge im Atelier sichten, dann den Basis-/Szenenvertrag um die erforderlichen Teilflächen erweitern. Die bisherigen 128 Basiszustände je Körper müssen weiterhin dieselben logischen Kleidungswahlen abbilden.

Schwerpunkt der Sichtprüfung sind Ärmelöffnungen, geschlossene Unterkleidung, Ellenbogen, Handgelenkbänder und Armschienen: keine freischwebende Rüstung, keine übrig gebliebenen Hände im Ärmelbild und kein still entferntes Teil bei natürlicher Verdeckung. Der tatsächliche Tiefenvertrag folgt aus den neuen Grafiken; keine universelle Tiefenwirkung aus einer einzigen festen Maske behaupten. Jede neue Lieferung muss die unveränderten 8-MB-/48-MiB-Grenzen und den Original-/Mobilevergleich erneut bestehen. Kopfteile folgen nach dem Ärmelabschnitt; App-/Datenintegration bleibt Etappe 3.
