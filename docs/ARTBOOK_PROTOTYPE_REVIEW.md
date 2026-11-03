# Alle 89 übrigen Artikel: Prototypreview

Stand 03.11.2026. [Entwurfs-PR #4](https://github.com/Rowlandolo/KONPASU/pull/4) baut auf dem Startset-PR #3 auf. Kein Merge oder Deployment.

## Was fertig ist

Alle 95 Abbildungen anhand der fünf Originaltafeln zugeordnet. Die sechs bisherigen PNG-Prototypartikel bleiben erhalten; die 89 übrigen besitzen jetzt 134 eigenständige transparente Vektor-Passformmodule mit Datei-/Quellhash, Rolle, Tiefe, Befestigung und expliziten Boxen für Form A/B. Vollständiger Einzelkatalog: [ARTBOOK_95_PROTOTYPES.md](ARTBOOK_95_PROTOTYPES.md). Die Entwicklungstitel beschreiben das tatsächliche Bild; alte Namen/Slots, IDs und Freischaltregeln bleiben unverändert.

## Werkstatt öffnen

Vollständigen Entwicklungsbranch auschecken, im Repository `python3 -m http.server 8000 --bind 127.0.0.1` starten und `http://127.0.0.1:8000/design/avatar/catalog.html` öffnen. HTTPS oder localhost ist für die Integritätsprüfung erforderlich. Keine bestehende App/PWA deinstallieren oder Browserdaten löschen. Die Werkstatt schreibt keine Profildaten.

Artikel lassen sich einzeln auswählen, per Zielpfad ergänzen, gezielt allein ansehen oder alle 95 gemeinsam wählen. „Details“ zeigt den belegten Originaltafelbereich und beide Passformen. Das Hintergrundbild wird dabei nicht bearbeitet. „Zeigen“ blendet einen gewählten Artikel nur optisch aus; die Auswahl bleibt erhalten. Reihenfolge verschiebt gleich tiefe Flächen, keine festen Hinter-/Vorderrollen. Die Basis-/Haarschalter sind unabhängig. Zum Vergleich können Grundschuhe ausgeblendet werden.

## Prüfbeleg

- Quellcommit `c4dcdff69d4c2536f2e11c1993dd7cbd7c46a9ca`.
- [280 Regressionen sowie App und bisheriges Atelier mit 26 Gruppen](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939822).
- [13 neue Browsergruppen, 190 sichtbare Einzelrenderings und 19 Familienaufnahmen](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939844).
- 4.465 Paare je Körper im reinen Planer; alle 95 in einer tatsächlichen Stressszene ohne Auswahlverlust. Nicht alle Paarungen visuell abgenommen.
- Kleinste sichtbare Einzeländerung: A 48 / B 61 Pixel bei 256×384. Außenstoffmasken verändern 563 Pixel. Referenzclip pro Familie außen Alpha 0 / innen 255.
- Unveränderte ausführliche Belege: [verification-catalog-v10.json](../design/avatar/verification-catalog-v10.json).

## Echte Bilder aller Familien

- [Krafttraining · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-strength.png)
- [Ausdauer · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-cardio.png)
- [Schritte · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-steps.png)
- [Beweglichkeit · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-mobility.png)
- [Wasser · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-water.png)
- [Schlaf · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-sleep.png)
- [Ernährung · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-nutrition.png)
- [Zuckerbalance · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-sugar.png)
- [Alkoholbalance · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-alcohol.png)
- [Lesen · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-reading.png)
- [Sprachen · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-languages.png)
- [Weiterbildung · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-learning.png)
- [Fokus · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-focus.png)
- [Meditation · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-meditation.png)
- [Tagebuch · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-journal.png)
- [Soziale Kontakte · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-social.png)
- [Natur · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-nature.png)
- [Bildschirmbalance · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-screen.png)
- [Gamingbalance · fünf Originale und beide Körperformen](../design/avatar/review-catalog-v10/family-gaming.png)

[Mischoutfit A](../design/avatar/review-catalog-v10/mixed-form-a.png) · [Mischoutfit B](../design/avatar/review-catalog-v10/mixed-form-b.png) · [alle 95 gleichzeitig](../design/avatar/review-catalog-v10/all-95-form-b.png) · [390 px](../design/avatar/review-catalog-v10/mobile-390.png) · [Original-/Legacyvergleich](../design/avatar/review-catalog-v10/reference-detail.png)

## Gefundene und behandelte Probleme

Legacy-Namen/-Slots treffen die tatsächlichen Bilder häufig nicht. Beispiele: focus-2 ist eine Sanduhr, learning-2 ein Maßband, social-3 ein Fächer, nature-3 ein Haori und gaming-4 ein Teeset. Vorhandene Karten können zudem verschobene Nachbarbilder zeigen. Neue Vergleiche verwenden deshalb dokumentierte, tatsächlich geclippte Originaltafelbereiche. Alte Karten und Live-Zuordnungen werden nicht still überschrieben.

Kleinste engineabhängige Trigonometrieabweichungen hatten SVG-Hashfehler ausgelöst; sechs Nachkommastellen der numerischen Attribute machen die Quellen in Node und Chromium gleich. Eine echte SVG-Pixelprüfung sichert die neue Kleidermaske. Nach Sichtprüfung Bandführung, Gewandmotive, Mondposition und Aurasockel verfeinert. Suchtests berücksichtigen alte und neue Bezeichnungen.

## Was weiter offen bleibt

Die 89 neuen Grafiken sind Vektorstudien. Ihre endgültige Premiumzeichnung im bestätigten erwachsenen Anime-/Artbookstil und die jeweilige Detailpassform sind noch zu erstellen. Besonders Grundschuhüberdeckung, Sohlen und Zehenspitzen brauchen weitere Arbeit. sugar-3/alcohol-3 sind separate Mimikstudien neben dem Kopf; passende vollständige Gesichtslayer fehlen. Handobjekte sind am Obi geführt; neue korrekte Griffposen fehlen.

Alle 95 gleichzeitig bilden eine bewusste Stressansicht mit deckenden Überlagerungen. Das ist kein fertig gestaltetes Outfit. Auswahl, Sichtbarkeit und natürliche Verdeckung sind unterschiedliche Zustände. Auf zwei Standfiguren geprüfte Module sind kein allgemeines Rig für neue Posen oder Frisuren.

Das numerische PNG-Startsetbudget bleibt unverändert. Zusätzliche Inline-Vektoren erfordern reale DOM-/GPU-/Spitzenspeichermessungen. CI-Skriptzeiten schließen Paint nicht ein. Warme Offlinebedienung ist kein PWA-Kaltstart-/Upgradebeleg. Geräte, VoiceOver, Persistenz, Import/Export, Rollback und Offline-Precache bleiben eigene Gates.

## Nächste überprüfbare Schritte

1. Gemeinsam die 19 Familienbilder und den Prototypumfang sichten; aus den Studien kleine priorisierte Premium-Grafikpakete ableiten.
2. Den reinen verlustfreien App-/Outfitadapter mit synthetischen Legacy-/Favoriten-/Historyfällen vorbereiten. Noch keine automatische Profilkonvertierung.
3. Pro freigegebener Familie finale Zeichnung, Masken und Detailpassform; Mimik, Handhaltungen und Schuhe gesondert lösen.
4. Erst nach Daten-/Offline-/Geräteabnahme kontrolliert in die Live-App integrieren. Der spätere Copilot bleibt an dieselbe getestete Daten- und Aktionsbasis mit Undo gebunden.
