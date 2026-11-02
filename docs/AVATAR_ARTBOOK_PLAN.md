# KONPASU: Artbook-Avatar und kombinierbare Belohnungen

Stand 02.11.2026. Verbindliche neue Nutzeranforderung: Artbooks als Stil- und Artikelreferenz, einzelne angepasste Module, gemeinsame Auswahl aller Belohnungsartikel ohne stilles Ablegen. Gilt zusätzlich zum vollständigen Masterbriefing. Entwicklung im separaten Branch, kein Live-Update dieses Prototyps.

## Was die Bestandsaufnahme tatsächlich zeigt

- Neun fertige Artbook-/Referenztafeln, 95 daraus abgeleitete WebP-Artikelkarten im Premiumbundle. Die Karten enthalten Hintergründe und Rahmen, sind teilweise angeschnitten und haben keine für den Körper passenden transparenten Silhouetten. Sie sind Inventarillustrationen, keine fertigen Anziehebenen.
- 346 einfache SVGs vorhanden; die bestehende Figur kann Ebenen anzeigen, entspricht gestalterisch aber noch nicht dem Artbook. Ein Kartenbild über den Körper zu legen oder die Figur nur höher aufzulösen löst das nicht.
- Aktuelle Auswahl: genau eine ID pro einem von 16 Plätzen. Neue Auswahl ersetzt alte auf demselben Platz. Krafttraining 1/2/3 teilen `arm`; Stufe 4 zeigt im Artbook Schulterpanzer, ist im bisherigen Mapping jedoch `head`. Cardio 1 zeigt einen Schal, steht bisher unter `feet`. Das alte Mapping ist deshalb kein verbindlicher Schnittplan für neue Grafiken.
- Artbooks zeigen Kleidungssets, Einzelteile, Effekte, Begleiter und Szenen. Eine Belohnung kann mehrere zeichnerische Fragmente brauchen. Sichtbarkeit, verdienten Besitz, erlaubte Tragbarkeit und reine Vorschau weiterhin trennen.

## Kombinierbarkeit als verbindlicher Vertrag

Jede Kombination freigegebener Artikel darf als Auswahl erhalten bleiben; es gibt keinen automatisch verdrängenden Haupt-/Nebenplatz und keine verdeckte 16-/30-Artikelgrenze. Die etwa 30 Kategorien dienen Organisation und Körperzuordnung, nicht als Limit der Artikelzahl. Ein neuer Gegenstand nimmt einen alten nicht automatisch ab. Ein Set ist eine Liste eigenständiger Artikel, kein unteilbares Ganzkörperbild.

Gleichzeitige Auswahl bedeutet nicht, dass alle Pixel aller Artikel gleichzeitig sichtbar sein können: Zwei Brustpanzer am gleichen Ort verdecken einander; zwei komplette Szenen können nicht beide undurchsichtig den ganzen Hintergrund füllen. Deshalb braucht es klar angezeigte Stapelreihenfolge, individuelle Sichtbarkeit, transparente Varianten und gegebenenfalls Vorder-/Hinterteile. Keine automatische Reduktion auf ein einziges Teil. Ein verdeckter ausgewählter Artikel bleibt ausgewählt. Umweltmodule und Begleiter bleiben frei kombinierbar, erhalten aber eigene Ebenengruppen neben dem Körper. Überschneidungswarnungen informieren, statt Kombinationen pauschal zu verbieten.

Keine Änderungen an Rewardschwellen oder Umdeutung von Besitz allein wegen einer neuen Grafik. Die verbindliche ID bleibt zum Beispiel strength-4; der neue Grafikvertrag beschreibt zusätzlich zwei Schulterfragmente. Vorübergehend ruhende Teile bleiben in Outfitvorlagen erhalten und werden nachvollziehbar als ruhend angezeigt.

## Erster begonnenener Abschnitt: Krafttraining

Fünf Artbookartikel anhand des tatsächlichen Originals identifiziert:

| Bestehende ID | Artbookgegenstand | Neue Fragmentierung | Überlagerung |
|---|---|---|---|
| strength-1 | Handgelenkbänder | links/rechts | oberhalb Armschienen, Bündchen sichtbar halten |
| strength-2 | Kote-Armschienen | links/rechts | auf Unterarmen; Körper-/Ärmelmasken erforderlich |
| strength-3 | Brustgeschirr | Torso | unter Brustpanzer, Riemen später teilweise sichtbar |
| strength-4 | Samurai-Schulterpanzer | links/rechts | an Schultern, nicht am Kopf |
| strength-5 | Brustpanzer | Torso | auf Gewand/Geschirr; verdeckte Riemen bleiben ausgewählt |

Umgesetzt: isolierter, reiner Ebenenplaner `avatar-rig-v25.js`, acht Fragmente für fünf unabhängig auswählbare IDs, deterministische Reihenfolge und vorläufige Körperanker. Alle 32 Teilkombinationen geprüft. Keine Persistenz, keine Änderung der Liveausrüstung, keine automatische Schemaerweiterung. Karten dürfen nicht als fertige tragbare Assets deklariert werden; nur ausdrücklich auf Rig und Körperanker abgestimmte transparente Assets werden als zeichnungsfähig behandelt. Tatsächliche PNG-/SVG-Integrität ist zusätzlich Aufgabe des künftigen Produktions-Assetloaders, nicht eine zugesicherte Eigenschaft des Planers.

Gestaltung: neuer Grundkörperentwurf als PNG mit Transparenz in `design/avatar/base-art-direction-v01.png`. Bildgeneriert unter Bezug auf die vorhandenen Artbooks; keine Behauptung eines manuell retuschierten fertigen Rigassets. Erwachsene Proportionen, Dreiviertelansicht, Ivory/Grün, ruhiger Soft-Anime-Look. Noch keine separate Körper-/Haar-/Gewandzerlegung, keine Körpervarianten, keine Passformabnahme. Das ist eine visuelle Ausgangsreferenz.

Entwicklungsatelier: `design/avatar/index.html`. Zeigt Referenz, Entwurf, gemeinsame Auswahl und vorläufige Befestigungspunkte. Es zeigt ausdrücklich noch KEINE fertigen neuen Rüstungsebenen. `design/avatar/artbook-catalog.json` inventarisiert alle 95 bestehenden IDs und ihren tatsächlichen Bearbeitungsstand. Krafttraining semantisch identifiziert; 90 weitere Artikel noch nicht einzeln gegen die Tafeln abgenommen.

## Produktionsplan mit Abnahmepunkten

1. **Basis und Gestaltungsvertrag.** Grundfigur anhand des Artbooks auf Gesicht, erwachsene Silhouette, Hände, Perspektive und Farbsprache prüfen. Einen festen Körper-/Posevertrag definieren, Körper/Haar/Gewand separieren. Derzeit 512×768 normierte Planungsfläche, Anker vorläufig. Erst danach Produktionsanker festschreiben.
2. **Erstes tragbares Fünferset.** Die acht transparenten Krafttrainingfragmente perspektivisch passend gestalten. Vorder-/Hinterteile und Masken für Arme, Hände, Ärmel und Torso erstellen. Alle fünf zusammen, jedes einzeln, 32 Kombinationen und maßvolle Körperproportionen visuell abnehmen. Erst ein tatsächlich guter kompletter Pfad zählt als fertiger Abschnitt.
3. **Outfitmodell und App-Anbindung.** Geordnete Artikelliste statt einzelner Slot-ID, Sichtbarkeit und Zeichenreihenfolge. Vorher Legacyprofil/Favoriten/History als Testfixtures; explizite versionierte Konvertierung mit vorherigem JSON-Export, trockenem Vergleich und Rückweg. Keine heimliche Migration. Bestehende Eintrags-/Rewarddaten bleiben unverändert. Neue UI erklärt ausgewählt, sichtbar, verdeckt, Vorschau und ruhend.
4. **Artbooks vollständig übertragen.** Nacheinander Mobilität/Cardio/Schritte, Gesundheit, Wissen, Achtsamkeit, Soziales/Natur, dann digitale Pfade; Sonderbelohnungen/Begleiter/Szenen separat. Jeden der 95 Einträge benennen, mit der Quelle verknüpfen, in Fragmente zerlegen, anpassen, testen, freigeben. Keine automatische Übernahme illustrativer Texte/Schwellen, die den bisherigen Produktregeln widersprechen.
5. **Kombinations- und Geräteabnahme.** Für 95 Standardartikel gibt es 4.465 Paarungen. Planungsprüfung für alle Paare und alle Artikel zusammen; zusätzlich alle Singles, feste problematische Komplettlooks, Masken-/Tiefe-/Proportionsfälle und visuelle Stichproben auf iPhone/Android/Desktop. 2D-Effekte respektieren reduzierte Bewegung. Nicht alle 2^95 Kombinationen als vollständig getestet behaupten.
6. **Regelmäßige Freigaben.** Kleine PRs mit Referenzbild, echter Avatardarstellung, Dateigrößen-/Offlineprüfung und Datenrückweg. Neuer Stil erst nach Sichtabnahme veröffentlichen. Keine unabhängigen Artikel verlieren, wenn später ein weiteres Set hinzukommt.

## Assetvertrag je Artikel und Fragment

Stabile Artikel-ID; Quellen-/Lizenz-/Entstehungsnachweis; Produktname DE/EN; unveränderte Rewardverknüpfung; Rig-/Poseversion; Körpervariante; Anker; Zeichenebene; Vorder-/Hinterfragment; transparente Datei; optionale Masken und bedeckte Körperbereiche; Variante für Ärmel/Handhaltung; Bounds und erlaubte Skalierung; Schwell-/Kantenprüfung; Dateigröße/Offline-Precache; visuell freigegebene Kombinationen. Kein allgemeines „passt überall“ aus einem bloßen Assetpfad ableiten.

Alle Körperproportionen müssen Figur und Ausrüstung im selben Koordinatenraum verändern. Fotografisch ausgeschnittene Einzelbilder dürfen nicht unabhängig auf beliebige Körper gestreckt werden. Fehlendes Asset sichtbar als in Arbeit markieren und bestehende funktionierende Figur erhalten.

## Nächster kleinster konkreter Schritt

Grundkörper-/Posevertrag anhand des hier erzeugten Entwurfs und Originalartbooks abnehmen; dann zunächst **Schulterpanzer und Brustgeschirr** als passende transparente Vorder-/Hinterfragmente ausarbeiten und am selben Körper sichtbar kombinieren. Danach Armschienen, Bänder und Brustpanzer zum vollständigen Fünferset ergänzen. Die jetzigen acht fehlenden Rüstungsgrafiken sind weiterhin offen.

## Zweiter Entwicklungsabschnitt: erste getrennte Grafikprototypen

Grundkörper als gestalterische Richtung vom Nutzer positiv bestätigt. Drei neue bildgenerierte transparente PNGs anhand von Grundkörper und Originalartbook erstellt: Geschirr, Schulter links und Schulter rechts. Sie sind eigenständige Dateien, keine ins Körperbild eingebrannten Änderungen. SHA256, PNG-Größen, Alpha-Bounds, gemessener transparenter Anteil und vorläufige Einpassrechtecke stehen in design/avatar/prototype-assets.json. Die Original-PNGs wurden nicht nachträglich ausgeschnitten oder umgefärbt; Einpassung erfolgt nichtdestruktiv im Browser und erhält das Seitenverhältnis.

Entwickleratelier zeigt jetzt tatsächliche Prototypgrafiken, mit Direktansichten Grundkörper/Geschirr/Schultern/beides. Der Adapter prüft Datei-Hash und decodierte Größe vor Freigabe. Drei der acht Fragmente als Prototyp vorhanden; Bänder, Armschienen und Brustpanzer weiterhin ohne neue Grafik. Keine Produktionsfreigabe: Perspektive, harmonische Größen und besonders rückwärtige Geschirrriemen benötigen Sichtabnahme und Masken. Keine Körpervarianten oder automatische Anpassung an andere Posen behaupten. Das Geschirr ist derzeit ein komplettes transparentes Objekt; eine Vorder-/Hintertrennung muss für korrekte räumliche Verdeckung noch erfolgen.

Sechs zusätzliche Prüfungen (jetzt 209 insgesamt): Binärintegrität/Abmessungen, nicht verzerrende Platzierung, ungültige Bounds, alle 32 tatsächlichen Prototypzuordnungen, unabhängige Fragmentreihenfolge, falsches Rig. Zusätzlich eigener Chromiumlauf fürs Atelier mit vier Bildern, allen 32 UI-Kombinationen, mobiler Breite und ohne Speicherschreibvorgang. Browserergebnis im jeweiligen aktuellen PR-Check, nicht allein aus diesen Quellcodetests ableiten.

## Dritter Entwicklungsabschnitt: vollständiger Krafttraining-Prototyp

Alle fünf Artikel besitzen jetzt eigene neue Grafikprototypen: acht transparente PNG-Fragmente einschließlich links/rechts getrennter Bänder und Armschienen. Der Brustpanzer liegt über dem Geschirr, unter den Schulterteilen; Bänder bleiben oberhalb der Armschienen. Keine Auswahl wird verdrängt. Das ist ein vollständiger Prototyp dieses Pfads, keine universelle Produktionsfreigabe. Alle übrigen 90 Standardartikel haben weiterhin keine neuen angepassten Grafiken.

Für das Geschirr wurde eine explizite, umschaltbare Sichtbarkeitsmaske im Koordinatenraum dieser einen Pose ergänzt. Sie reduziert rückwärtig wirkende Riemenbereiche, ohne Dateiänderung oder Abwahl. Ein Screenshotvergleich mit/ohne Maske ist Teil der Browserprüfung. Das ersetzt keine vollständig segmentierten Vorder-/Hinterteile und funktioniert nicht automatisch für andere Körper/Posen. Gerade Ärmelübergänge, Hände und anatomische Größen müssen anhand der tatsächlichen Browseraufnahme geprüft werden.

Weitere zwei Prüfungen sichern Maskengeometrie und unveränderte Metadaten; insgesamt 211 Quellcodeprüfungen. Der erweiterte Atelier-Browserlauf prüft alle 32 Kombinationen mit acht verfügbaren Fragmenten, fünf Vergleichsansichten inklusive ganzem Set, reversible Verdeckung und mobile Darstellung. Ergebnis nur aus dem aktuellen CI-Lauf ableiten. Transparente PNGs bleiben für die Entwicklung unverändert; Dateigrößenoptimierung und Offline-Assetbudget sind vor produktiver Integration gesondert zu prüfen.

## Vierter Abschnitt: nichtdestruktive Basisaufteilung

Die sichtbaren Pixel des bestätigten Originals sind nun in Körperbereiche (Gesicht/Hals/Arme/Hände), Haare und Grundkleidung aufgeteilt. Das ist eine vorläufige, polygonbasierte Eigentums-/Maskenstudie im Renderer: Die PNG-Quelldatei bleibt unverändert. Alle drei Bereiche zusammen rekonstruieren die decodierten Originalpixel ohne neu gezeichnete Farben; ausgeschaltete Bereiche werden nur in der Vorschau transparent. Keine Behauptung einer vollständigen neuen Körperanatomie. Unter Kimono/Haaren fehlen im Original Körper-/Kopfpartien; diese werden beim Abschalten nicht automatisch erfunden. Isolierte Ansichten müssen an ihren Trennkanten gesichtet und überarbeitet werden.

Zusätzlich zwei Proportionszustände Standard und gemeinsam 6 Prozent breiter. Der gemeinsame Rigcontainer transformiert Basis, Ausrüstung, Masken und Anker zusammen. Das ist ein geometrischer Passformtest, keine zweite individuell gezeichnete Anatomie und keine Geschlechtszuordnung. Artikel-IDs und Auswahl bleiben erhalten.

Neues Modul design/avatar/base-layers.js, verifizierter Quellvertrag base-layer-contract.json. Sieben neue Tests sichern Quellintegrität, getrennte Bereiche, vollständige RGBA-Rekonstruktion, acht Basis-Auswahlen, ungültige Metadaten, immutable Proportionen und lückenlose Pixelzuordnung ab. Gesamt 218 lokale Tests. Browserlauf ergänzt native Pixelrekonstruktion, alle acht isolierten Basisansichten und gemeinsamen Proportionstest mit dem vollständigen Set. Ergebnis nur aus aktuellem CI ableiten. Nächster gestalterischer Schritt: verborgene Körper-/Kopfbereiche anhand desselben Posevertrags neu zeichnen und dann neue Kleidung/Frisur passend einsetzen. Diese Maskenstudie allein ist noch kein frei umkleidbarer Produktionskörper.

## Getrennte Unterkörper-/Kopfbasis als neue Grafikstudie

Zusätzlich zur technischen Maskenstudie wurde ein vollständiger Körperunterbau mit geschlossener Unterkleidung und ohne Haare unter Bezug auf den bestätigten Entwurf neu gezeichnet (bildgeneriert). Datei body-underlayer-study-v01.png und Herkunfts-/Hashmetadaten underbody-study.json. Transparenter Hintergrund, native Größe 1024×1536. Das Bild ist kein Ergebnis der Pixelmasken und wurde nicht automatisch als passende Produktionsanatomie deklariert: Rigregistrierung ausdrücklich not-accepted. Es wird im Atelier getrennt angezeigt, nicht unbemerkt unter alte Haar-/Kleidungsfragmente gelegt. Saubere, hierzu passende Kopf-/Haar-/Kleidungsfragmente und anatomische Registrierung sind der folgende Abschnitt. Mit einer zusätzlichen Binär-/Statusprüfung insgesamt 219 Quellcodeprüfungen.

## Eigenständige Basisgrafiken statt Maskenzerlegung

base-layers.js rendert nun drei unabhängige vollständige PNGs aus layers/: Körper in geschlossener Unterkleidung, Grundoutfit, Haare. Die Originalreferenz wird nicht mehr zur Pixelklassifikation verwendet. Vertrag v2 enthält SHA-256, RGBA-Maße und seitenverhältnistreue rigbezogene Platzierung. Gemeinsamer Transform gilt weiterhin für Körper und sämtliche Ausrüstungsfragmente; kein Schreiben in Profildaten. Haare sind separat an den Kopf angepasst, Körper und Outfit folgen dem vollständigen 1024×1536-Rahmen. Frühere Masken-/Unterbody-Studien sind historische Nachweise. Elf sinnvolle Basisprüfungen ersetzen acht Tests der alten Studie; Gesamtstand 222. Visuelle Ein-Pose-Abnahme und weitergehende Segmentierung werden separat dokumentiert.

Basisabschluss: https://github.com/Rowlandolo/KONPASU/actions/runs/41509862640 für 6a8775a71b297c0c1616146e7d61ad13e9f5c675 erfolgreich, 222 Regressionen und beide Chromiumläufe. Saubere unabhängige Ebenen und kompletter Unterbau gesichtet; Haare sowie vier Armfragmente auf die tatsächliche Anatomie angepasst. Beleg verification-body-foundation-v02.json. Ein-Pose-Prototyp, keine universelle Produktionsfreigabe.

## Sieben Ebenen und zwei Zeichenflächen

Vertrag v3 verwendet stabile Basis-IDs hair-back, body, shoes, kimono, hakama, obi, hair-front. Haar- und Kleidungsbestandteile wurden unabhängig aus den bestätigten v02-Grafiken neu gezeichnet, keine groben Pixelmasken übernommen. Body-PNG unverändert. Feste Reihenfolge: Hinterhaar → Körper → Schuhe → Gewand → Hakama → Obi; vorderes Haar auf eigener Zeichenfläche über der vorhandenen Rüstungs-SVG. Das erlaubt weitere Tiefenarbeit, ersetzt aber noch keine Ärmel-/Arm-/Kopfteilmaskierung. Drei ausdrückliche Schnellansichten verändern nur die Atelierauswahl. 128 Basiskombinationen geprüft; reale Aufnahme und vollständige Kombination als nächstes. Frühere v02-Nachweise gelten ausschließlich für den vorherigen dreiteiligen Zustand.

Sieben-Ebenen-Abschluss: 512f877d51d61654cc2eec7d0d41f201883fe7d9, https://github.com/Rowlandolo/KONPASU/actions/runs/41518792450, 222 Regressionen und zwölf Atelier-Gruppen grün. Neu gezeichnete Unterarmkanäle beseitigen schwebende Rüstung über opakem Innenfutter; vier echte Unterarmpunkte geprüft. Komposition und alternative Kleidung gesichtet, kein vollständiger 4096er-Sichttest. Nachweis verification-seven-layers-v03.json. Allgemeine Tiefen und zweite Anatomie bleiben offen.

## Individuelle Körperprofile und alphabasierte Szene

scene-composer.js plant eine gemeinsame SVG-Ebenenliste. Basis, Ausrüstung und vordere Haare besitzen explizite Tiefen. Armfragmente können durch aktive Gewand-Alphaflächen verdeckt werden, ohne aus der Auswahl oder Szenenliste zu verschwinden; fehlendes/ausgeschaltetes Gewand entfernt nur die entsprechende Verdeckung. Die alte Geschirr-Clippose wird mit der Artikelplatzierung transportiert. Weitere Kopf-/Riemen-/Ärmel-Fragmenttypen benötigen weiterhin echte Assets und Tiefenverträge.

Form B verwendet eigene gezeichnete Anatomie, eigenes Gewand und Hakama. Die Platzierung des ganzen Körpers ist für A und B identisch; separat registrierte Kleidungs- und Ausrüstungsbilder passen die Einzelmodule an. Gemeinsamer 6-Prozent-Test bleibt eine zusätzliche geometrische Studie und ist keine dritte Anatomie. body-profiles-v04.json erfasst Körperquellen, acht passformspezifische Artikelpositionen und Anker. Keine Verbindung zur Live-Persistenz.
