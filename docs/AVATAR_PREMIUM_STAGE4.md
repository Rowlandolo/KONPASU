# Etappe 4: Premiumgrafiken

Stand 09.11.2026. Etappe 4 ersetzt die 89 technischen Vektorstudien in kleinen, prüfbaren Paketen. Artikel-ID, Freischaltung, Besitz, Tragbarkeit, Outfitreihenfolge und gespeicherte Profile bleiben dabei unverändert.

## Paket 4.1 · Windschal (`cardio-1`)

Der erste Premiumkandidat folgt der belegten Artbookkarte: tiefgrüne und elfenbeinfarbene Seide, goldene Kante, botanische Ornamente und zwei Quasten. Das Modell besteht aus zwei unabhängigen transparenten Rastermodulen:

- `cardio-1-rear.png`: wehende Enden hinter Körper und Kleidung, Tiefe 145.
- `cardio-1-front.png`: gefaltetes Halsband vor dem Gewand, Tiefe 390.

Beide Module besitzen eigene Passformboxen für Form A und B. Der Katalog prüft Pfad, Bytezahl, SHA-256 und Bildmaße vor der Anzeige. Die bisherigen SVG-Studien bleiben als dokumentierte technische Grundlage im Repository; der Planer verwendet für diesen Artikel ausdrücklich die Premiumkandidaten.

## Prüfstand

- 36 vollständige Node-Testdateien erfolgreich.
- Katalogbrowser: 190 sichtbare Einzelrenderings, 95 Artikel gemeinsam, beide Körperformen und 19 Familienvergleichsseiten erfolgreich.
- Mehrfachoutfit-Browser: alle 95 Artikel, unabhängige Instanzen, Sichtbarkeit, Reihenfolge, Undo/Redo und Warm-Offlinebetrieb erfolgreich.
- Mischansichten Form A und B visuell geprüft; Vorderband, Goldornamentik und andere Ausrüstung bleiben sichtbar und kombinierbar.
- Keine Profil-, Ziel-, Training-, Rewardregel-, Datenbank- oder Liveänderung.

## Paket 4.2 · Wind-Tabi (`cardio-2`)

Die hohen Tabi sind keine gespiegelten Kopien. `cardio-2-left.png` folgt dem kompakten frontalen Fuß, `cardio-2-right.png` dem längeren nach außen gedrehten Fuß. Beide besitzen getrennte Ebenen mit dunklem geteiltem Zehenbereich, grünem Schaft, gekreuzten Goldbändern und botanischem Knöchelschutz. Die Schäfte beginnen unter dem Hakama; Sohlen und Zehenspitzen bleiben für die Passformprüfung sichtbar.

## Paket 4.3 · Tempo-Armbänder (`cardio-3`)

`cardio-3-left.png` und `cardio-3-right.png` folgen den entgegengesetzten Unterarmwinkeln der festen Standpose. Die grünen Stoffwickel besitzen goldene Randbänder, gekreuzte Schnüre und eigene botanische Details. Beide bleiben getrennte Ebenen. Bestehende Kimono- und Außenkleidungsmasken verdecken die oberen Bereiche anatomisch, ohne den Artikel oder seine Auswahl zu entfernen.

## Paket 4.4 · Sturmläufer-Umhang (`cardio-4`)

`cardio-4-rear.png` bildet den langen dunklen Umhangkörper hinter Figur und Armen. `cardio-4-front.png` enthält ausschließlich Schulterkragen, Goldknoten, Quasten und die offenen seitlichen Vorderbahnen. Die transparente Körpermitte erhält Kimono, Obi und Hakama. Nur die sichtbaren Vorderbahnen wirken als Armmaske; Schal, Armbänder und Schuhe bleiben eigene Artikelinstanzen.

## Offene Freigaben

Die ersten vier Cardio-Artikel sind **Premiumkandidaten**, noch keine endgültig freigegebenen Grafiken. Offen bleiben physisches iPhone/Android, VoiceOver, GPU-/Speicherspitzen, kalter PWA-Start und Alt-PWA-Upgrade. Erst danach folgt die App-/Offlineintegration. Das nächste Grafikpaket bearbeitet `cardio-5` (Sturmreiter-Rüstungsaura).
