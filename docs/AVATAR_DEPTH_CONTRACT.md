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

Front und Rückseite durchlaufen denselben Build und dieselbe Hash-/Maß-/Alpha-Prüfung wie alle vorhandenen Ausgaben. Insgesamt neun Ausrüstungsfragmente, 16 Startgrafiken und 19 eindeutige Laufzeitdateien. Die zusätzliche Rückseite erhöht die Bildknotenobergrenze auf 16; Datei-/Quell-RGBA-Ziele bleiben unverändert. Originalmodus bleibt ein separater Vergleich zur neuen kanonischen Grafik, kein Vergleich mit dem alten maskierten Geschirr.

Abnahme: beide Formen mit Geschirr allein und vollem Set sichten, getrennte Bilder ansehen, tatsächliche SVG-Pixel für Rückseite/Körper/Vorderseite prüfen, alle 64 Rewardzustände und 256 Basiszustände weiterhin bestehen lassen, fehlende Rückseite ohne Teilfigur abweisen, Auswahl beim Körperwechsel erhalten, mobile Größen-/Bildqualitätsgrenzen prüfen. Geräte-/Offlineintegration bleibt separat.

Stand: Grafik-/Code-/Unitabschnitt vorbereitet; frischer Auslieferungsbuild und abschließender Browser-/Sichtbeleg folgen. Nächster grafischer Abschnitt nach geprüfter Geschirrlieferung: vordere/hintere Ärmel und Anschluss an Armartikel auf beiden Körperformen.
