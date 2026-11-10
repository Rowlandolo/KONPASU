# KONPASU – Roadmap

Stand 03.11.2026. Reihenfolge aus Masterbriefing §11. Kein Terminversprechen; jede Stufe wird mit Belegen abgeschlossen.

| Phase | Ziel / kleinste überprüfbare Lieferung | Stand |
|---|---|---|
| 0 | Repo-/Speicheraudit, verbindliche Spezifikation, Status, Fehlerregister, QA | Dokumentiert und gepflegt; Speicherschutz getestet, GitHub-Zugriff wiederhergestellt, PR #1 veröffentlicht |
| 1 | 2.3.2 Avatar-/Inventar-/Favoriten-/Versionsfehler | Mit 2.4.0 veröffentlicht; VM- und Chromiumprüfungen erfolgreich |
| 2 | Tatsächlicher Layeravatar, echte Reward-Assets, Vorschau, Personalisierung, Cache | Technischer SVG-Avatar live; Artbook-Stil und neue modulare Basis in separatem Atelier, reales iPhone/Upgrade offen |
| 3 | 95 Voraussetzungen semantisch auditieren, ca. 30 Slots, Sets, Begleiter, historische Rewards und finales Design | Sammlung, Schwellenaudit und Ruhmeshalle lokal umgesetzt; Historienkorrektur abgesichert. Visuelle Abnahme, Konfigurationshilfe, Balancefragen und weitere Ausbauten offen |
| 4 | Workout-UX, Katalog/Pläne/Sätze/PBs, historische Bearbeitung und Doppelzählung absichern | Codebasis vorhanden; vollständige Abnahme offen |
| 5 | Alle 19 Zielmodule: Einheiten, Pausen, Nachträge, Wochenwechsel, Obergrenzen | Stichproben getestet, Ziel-für-Ziel-E2E offen |
| 6 | Vollständige Startseite C, Tagesfokus, Premium Botanical, systematische DE/EN und A11y | Personalisierter Home-Avatar integriert; Gesamt-UX offen |
| 7 | Offlinecoach, vorsichtige Muster, freiwillige Experimente, sichere Aktionen und Undo | Basis vorhanden, Produktausbau offen |
| 8 | Architekturentscheidung, optionales Konto/Sync, Konflikte, native Plattformen | Noch nicht begonnen; keine Neuschreibung |
| 9 | Releasequalität über alle Phasen: Automatik, echte Geräte, Backup/Restore und Rückweg | Blockierende Abnahmen siehe QA |

## Nächster kleinster Schritt

Etappe **3.4.3b technisch abgeschlossen** in Entwurfs-PR [#11](https://github.com/Rowlandolo/KONPASU/pull/11) auf #10: persönliche Werte ausdrücklich speichern, feldbegrenzte dauerhafte Rücknahme, geschützter dreiseitiger Konfliktabgleich und separate Artbook-Hauptansicht mit Szenen/Begleitern auf Startseite und im Studio. 438 Regressionen, 15 neue Browsergruppen und bestehende App-/Atelier-/Editor-/Speicher-/Hauptavatar-/Variantenprüfungen erfolgreich. Fünf Originalbilder gesichtet. Kandidat 2.4.1-preview.5, kein Deployment. Vertrag und Belege: AVATAR_SAVED_APPEARANCE_MAIN.md.

**Etappe 3.4.4 und damit Etappe 3 technisch abgeschlossen:** Outfit-, persönliche und Ansichtsaktionen samt Rücknahmen erzeugen genau einen vollständigen resultierenden Profilschnappschuss. No-op, Konflikt und Schreibfehler erzeugen keinen; alte sparsame Historie bleibt unverändert und fehlende Vergangenheit wird nicht erfunden. 445 Regressionen und sämtliche sieben Browser-Workflows grün. Vertrag: AVATAR_HISTORY_STAGE3.md; Vollbeleg: `design/avatar/verification-stage3-complete-v01.json`.

**Etappe 4 begonnen:** `cardio-1` (Windschal) liegt als erster Premiumkandidat mit getrennten Vorder-/Rückebenen, Hashbindung und Passform für beide Körperformen vor. 36 Testdateien, 190 Einzelrenderings und der 95er-Mehrfachoutfitlauf sind grün. Details: AVATAR_PREMIUM_STAGE4.md.

**Paket 4.2 umgesetzt:** `cardio-2` (Wind-Tabi) besitzt zwei asymmetrische Premiumkandidaten für die feste Standpose. Sohlen, geteilte Zehen und Überdeckung durch Hakama/Grundschuhe werden auf beiden Körperformen geprüft.

**Paket 4.3 umgesetzt:** `cardio-3` (Tempo-Armbänder) besitzt getrennte, posegerechte Premiumkandidaten für beide Unterarme. Kimono- und Außenkleidungsmasken bleiben aktiv.

**Paket 4.4 umgesetzt:** `cardio-4` (Sturmläufer-Umhang) besitzt getrennte Vorder-/Rückflächen. Nur die tatsächliche Vorderfläche maskiert Armartikel; Körpermitte, Obi und Hakama bleiben durch die offene Silhouette kombinierbar.

**Paket 4.5 umgesetzt:** `cardio-5` (Sturmreiter-Rüstungsaura) besitzt vier getrennte Premiumkandidaten: Aura, Rückengewand, offenes Vordergewand und Brustpanzer. Damit sind alle fünf Cardio-Artikel als zwölf unabhängig kombinierbare Module vorhanden.

**Cardio-Familienabnahme abgeschlossen:** alle fünf Kandidaten bestehen Einzel- und gemeinsame Zwölf-Modul-Komposition auf beiden Körperformen einschließlich Maskierung, Sichtbarkeit, Reihenfolge, 95-Artikel-Stressauswahl und Mehrfachoutfitlauf.

**Paket 4.6 umgesetzt:** `steps-1` (Reisesandalen) besitzt zwei asymmetrische Premiumkandidaten mit getrennten Passformen für die feste Standpose.

**Paket 4.7 umgesetzt:** `steps-2` (Wegtasche) besitzt einen getrennten Körperriemen und einen detailreichen Taschenkörper mit Kartenklappe, Blattmedaillon, Quaste und Glyzinienanhänger.

**Paket 4.8 umgesetzt:** `steps-3` (Pilgerhut-Anhänger) liegt als geschlossenes Premium-Zubehörmodul mit Ring, Knoten, Flechthut, Blütenmedaillon, Quasten und Glyzinien vor.

**Paket 4.9 umgesetzt:** `steps-4` (Reise-Haori) besitzt getrennte Vorder-/Rückebenen mit offenem Zentrum, weiten Ärmeln, dunkelgrünem Futter, Goldkordel und Landschaftsmotiven.

**Paket 4.10 umgesetzt:** `steps-5` (Wegfinder-Banner) besitzt ein getrenntes Standbanner und einen offenen Windband-/Blättereffekt.

**Schritte-Familienabnahme abgeschlossen:** alle fünf Kandidaten bestehen Einzel- und gemeinsame Neun-Modul-Komposition auf beiden Körperformen einschließlich Maskierung, Sichtbarkeit, Reihenfolge, Cardio-Übergang, 95-Artikel-Stressauswahl und Mehrfachoutfitlauf.

**Paket 4.11 umgesetzt:** `mobility-1` (Dehnbänder) besitzt zwei getrennte asymmetrische Seidenbandmodule mit eigenen Passformen für beide Körperformen. Der Einzeltest und der Übergang mit Cardio und Schritte als 23 Module sind abgenommen.

**Paket 4.12 umgesetzt:** `mobility-2` (Fließender Obi) besitzt einen getrennten Taillengürtel und einen seitlichen Blütenknoten mit Stoffbahnen und Quasten. Die ersten beiden Beweglichkeitsartikel bestehen gemeinsam als vier Module; Cardio, Schritte und beide Artikel bestehen den Übergang als 25 Module.

**Paket 4.13 umgesetzt:** `mobility-3` (Beweglichkeitsärmel) besitzt getrennte asymmetrische Unterarmmodule mit eigenen Passformen und bestehender Kimono-/Außenkleidungsmaskierung. Die ersten drei Beweglichkeitsartikel bestehen als sechs Module; gemeinsam mit Cardio und Schritte bleiben 27 Module erhalten.

**Paket 4.14 umgesetzt:** `mobility-4` (Tänzer-Haori) besitzt getrennte Vorder-/Rückebenen mit offenem Zentrum, weiten Ärmelöffnungen, Schulterknoten und Glyzinien. Die ersten vier Beweglichkeitsartikel bestehen als acht Module; gemeinsam mit Cardio und Schritte bleiben 29 Module erhalten.

**Paket 4.15 umgesetzt:** `mobility-5` (Schlangenwind-Aura) besitzt getrennte Drachen- und Windebenen mit offenen Zentren.

**Beweglichkeits-Familienabnahme abgeschlossen:** alle fünf Kandidaten bestehen Einzel- und gemeinsame Zehn-Modul-Komposition auf beiden Körperformen einschließlich Maskierung, Sichtbarkeit, Reihenfolge, Übergang mit Cardio und Schritte als 31 Module, 95-Artikel-Stressauswahl und Mehrfachoutfitlauf.

**Paket 4.16 umgesetzt:** `water-1` (Bambusflasche) liegt als transparentes Premium-Zubehör mit Bambusrohr, Goldfassungen, Trageschnur und Quaste vor. Die Flasche sitzt auf beiden Körperformen am linken Obi und erhält die vollständigen Cardio-, Schritte- und Beweglichkeitsfamilien im 32-Modul-Übergang.

**Paket 4.17 umgesetzt:** `water-2` (Lackflasche) besitzt eine dunkle bauchige Lackfläche, roten Halsrand, Goldkordel, helle Quaste und elfenbeingoldene Blüten. Beide Wasserartikel bleiben als getrennte Module auf beiden Körperformen lesbar und bestehen mit Cardio, Schritte und Beweglichkeit den 33-Modul-Übergang.

**Paket 4.18 umgesetzt:** `water-3` (Kristallfeldflasche) besitzt einen facettierten hellblauen Körper, Kristallverschluss, goldenes Tragenetz und helle Quaste. Die ersten drei Wasserartikel bestehen gemeinsam als drei Module und mit Cardio, Schritte und Beweglichkeit als 34 Module auf beiden Körperformen.

**Paket 4.19 umgesetzt:** `water-4` (Zeremonielle Wasserkalebasse) besitzt eine elfenbeinfarbene Doppelform, Goldblüten, geflochtene Kordel sowie goldene und grüne Quasten. Die ersten vier Wasserartikel bestehen gemeinsam als vier Module und mit Cardio, Schritte und Beweglichkeit als 35 Module auf beiden Körperformen.

**Paket 4.20 umgesetzt:** `water-5` (Quellendrachen-Gefäß) besitzt ein getrenntes dunkles Goldgefäß und einen offenen jadefarbenen Drachen-/Wasserbogeneffekt.

**Wasser-Familienabnahme abgeschlossen:** alle fünf Kandidaten bestehen gemeinsam als sechs Module auf beiden Körperformen einschließlich Sichtbarkeit, Reihenfolge, 37-Modul-Übergang mit Cardio, Schritte und Beweglichkeit, 95-Artikel-Stressauswahl und Mehrfachoutfitlauf.

**Paket 4.21 umgesetzt:** `sleep-1` (Mond-Haarnadel) besitzt getrennte hintere Goldstifte und eine vordere Mondsichel mit Kirschblüten und Glyzinie. Die korrigierte seitliche Kopfpassform hält das Gesicht frei und besteht mit Cardio, Schritte, Beweglichkeit und Wasser als 39 Module auf beiden Körperformen.

**Paket 4.22 umgesetzt:** `sleep-2` (Traumkissen-Talisman) besitzt ein dunkelblaues, gold eingefasstes Kissenmodul mit Mondhasen, Blüten, Wellenstickerei und Tragekordel. Die Kordel sitzt auf beiden Körperformen an der rechten Hand; beide Schlafartikel bestehen gemeinsam als drei Module und mit Cardio, Schritte, Beweglichkeit und Wasser als 40 Module.

**Paket 4.23 umgesetzt:** `sleep-3` (Nacht-Haori) besitzt getrennte Vorder-/Rückebenen mit mitternachtsblauem Stoff, elfenbeinfarbenem offenem Revers, Goldkanten sowie Nachtblüten-, Wolken- und Sternmotiven. Die ersten drei Schlafartikel bestehen gemeinsam als fünf Module und mit Cardio, Schritte, Beweglichkeit und Wasser als 42 Module.

**Paket 4.24 umgesetzt:** `sleep-4` (Mondlaterne) besitzt ein antikgoldenes, warm leuchtendes Laternenmodul mit Mondsichel, Sternöffnungen, Blütenranke und Quaste. Die korrigierte Registrierung hängt an der rechten Obi-Kante; die ersten vier Schlafartikel bestehen gemeinsam als sechs Module und mit Cardio, Schritte, Beweglichkeit und Wasser als 43 Module.

**Paket 4.25 und Schlaf-Familienabnahme umgesetzt:** `sleep-5` (Mondruhe-Aura) besitzt einen offenen Vollmond-, Nachthimmel-, Wolken- und Blütenrahmen ohne fremde Meditationssilhouette. Alle fünf Schlafartikel bestehen gemeinsam als sieben Module; Cardio, Schritte, Beweglichkeit, Wasser und Schlaf bleiben gemeinsam als 44 Module auf beiden Körperformen aktiv.

**Paket 4.26 umgesetzt:** `nutrition-1` (Bento-Anhänger) besitzt ein mitternachtsblaues, gold eingefasstes Bento-Täschchen mit Onigiri, Hasen-Reisbällchen, Blüten, Quaste und Aufhängeschlaufe an der linken Obi-Kante. Der Kandidat besteht mit den fünf vollständigen Premiumfamilien als 45 Module auf beiden Körperformen.

**Paket 4.27 umgesetzt:** `nutrition-2` (Kräuterbeutel) besitzt waldgrüne Seide, elfenbeinfarbenen Zugverschluss, Goldkordel, Quasten, Jadeperle und botanische Stickerei. Beide Ernährungsartikel bleiben gemeinsam lesbar und bestehen mit den fünf vollständigen Premiumfamilien als 46 Module auf beiden Körperformen.

**Paket 4.28 umgesetzt:** `nutrition-3` (Vitalitäts-Obi) besitzt getrennte Gürtel- und Blütenknotenebenen mit waldgrün-elfenbeinfarbener Seide, Blatt-/Blütenmotiven, Goldkanten, Jadeperlen und Quasten. Die ersten drei Ernährungsartikel bestehen gemeinsam als vier Module und mit den fünf vollständigen Premiumfamilien als 48 Module auf beiden Körperformen.

**Paket 4.29 umgesetzt:** `nutrition-4` (Kochgelehrten-Haori) besitzt getrennte Rück-, Vorder- und Schürzenebenen mit offenem elfenbeinfarbenem Gewand, grünem Futter, Ernte-/Kräutermotiven und goldenen Kochutensilien. Die korrigierte tiefe Halsöffnung hält das Gesicht frei. Die ersten vier Ernährungsartikel bestehen gemeinsam als sieben Module und mit den fünf vollständigen Premiumfamilien als 51 Module auf beiden Körperformen.

**Paket 4.30 und Ernährungs-Familienabnahme umgesetzt:** `nutrition-5` ergänzt getrennte Ebenen für Reisährenemblem, tragbare Reisschale und Kürbisanhänger. Das Emblem sitzt sichtbar im rechten Hintergrund. Alle fünf Ernährungsartikel bestehen gemeinsam als zehn Module; die sechs vollständigen Premiumfamilien bleiben gemeinsam als 54 Module auf beiden Körperformen aktiv.

**Paket 4.31 umgesetzt:** `sugar-1` (Zucker-Siegel-Omamori) besitzt dunkelgrüne Seide, Gold-/Blütenornament, rote Kordel und ein textfreies gesperrtes Zuckerkristallsiegel. Die korrigierte Registrierung sitzt an der rechten Hüftseite; der Kandidat besteht mit den sechs vollständigen Premiumfamilien als 55 Module auf beiden Körperformen.

**Paket 4.32 umgesetzt:** `sugar-2` (Reinheitsarmband) besitzt helle Perlen, eine Jadeperle, Goldknoten, Quaste und Blattornament. Das Armband folgt auf beiden Körperformen dem linken Handgelenk und wird durch tatsächliche Ärmelpixel natürlich verdeckt. Beide Zuckerbalance-Kandidaten bestehen mit den sechs vollständigen Premiumfamilien als 56 Module.

**Paket 4.33 umgesetzt:** `sugar-3` (Helles Lächeln) folgt der Artbookreferenz als kompaktes Triptychon aus drei freundlichen erwachsenen Mimikporträts. Die korrigierte Registrierung hält alle drei Ansichten auf beiden Körperformen vollständig sichtbar. Der Kandidat bleibt ehrlich eine separate Studie neben dem Kopf und überschreibt keine ungeprüfte Gesichtsanatomie. Die ersten drei Zuckerbalance-Kandidaten bestehen mit den sechs vollständigen Premiumfamilien als 57 Module.

**Als Nächstes:** Paket 4.34 mit `sugar-4`. App-/Offlineintegration, vollständige austauschbare Gesichtslayer und physische Gerätefreigabe bleiben spätere eigene Gates.

Die App bleibt offline nutzbar. Reales iPhone/Alt-PWA-Upgrade und historische Zielkonfigurationen bleiben eigenständige Prüfpunkte. Der spätere Copilot baut auf einer gemeinsamen, getesteten Aktionsengine mit Undo auf; Details in PROFESSIONAL_APP_PLAN.md.

## Historische Entwicklungsschritte

Die folgenden Abschnitte dokumentieren die Reihenfolge bisheriger Lieferungen; frühere „nächste Schritte“ sind durch den aktuellen Abschnitt oben ersetzt.

## Nach Abschnitt Verbrauchsnachweise

Kernkorrekturen lokal implementiert, 179 Tests grün. Nächster Freigabeschritt: DEVICE_ACCEPTANCE.md mit vollständigem Checkout in freigegebener Browserumgebung und auf echtem iPhone abarbeiten. Historische Ziel-/Periodenwechsel anschließend gezielt auditieren; weder Release noch Geräteabnahme behaupten.

## Nächste konkrete Lieferung

Vollständige Original-GitHub-ZIP ergänzen → aktuellen Kandidaten darüberlegen → entpacktes Komplettpaket samt allen Referenzen, Hashliste und Regressionen prüfen → einfache Uploadanleitung aus UPLOAD_GUIDE.md beilegen. Keine Patchsammlung als vollständiges Uploadpaket deklarieren. Browser-/iPhoneabnahme bleibt eigenständiges Freigabegate.

## Nach Lieferung des vollständigen Originalarchivs

Paketblocker behoben. Vollständiger Kandidat mit Originalbildern, Quellcode und Entwicklungsmaterial zum manuellen Testupload vorbereitet; 193 automatisierte Prüfungen grün. Jetzt zuerst separate Pages-Testvorschau und DEVICE_ACCEPTANCE.md abarbeiten. Anschließend geprüften PR für Original-App, dann historische Ziel-/Periodenkonsistenz und REW-06. Weitere Features hängen von diesen Befunden ab.

## Nach wiederhergestelltem GitHub-Zugriff

Geprüften Kandidaten im separaten Remote-Branch als Entwurfs-PR bereitstellen, GitHub-Reviewchecks abwarten, offene Browser-/Gerätefälle abnehmen. Manueller Datei-Upload ist für die Übertragung nicht mehr erforderlich. main und Pages bis zur geprüften Freigabe beibehalten.

## Nach Live-Release 2.4.0

PR #1 gemergt, Pages und Live-Version bestätigt. Als Nächstes persönliche Alt-PWA auf iPhone prüfen (Datenvergleich, Update, Offline-Neustart), dann historische Ziel-/Periodenänderungen und REW-06. Keine erneute manuelle Dateiübertragung nötig.

## Neue unmittelbare Priorität: Artbook-Avatar

PROFESSIONAL_APP_PLAN.md definiert den Weg zu abgenommenen Kernfunktionen und KI-Copilot. Jetzt Basis-/Poseabnahme, Schulterpanzer+Geschirr passend ausarbeiten, dann komplettes Krafttraining-Fünferset. Erst nach sichtbarer Passform produktives Mehrfach-Outfitmodell mit geprüftem Rückweg und danach restliche 90 Artikel. Kern-Datensicherheit und reale iPhone-Abnahme laufen begleitend.

## Nach Erstellung der ersten drei Grafikprototypen

Vier tatsächliche Atelieransichten im Chromium prüfen, Proportionen/Positionen visuell nacharbeiten und rückwärtige Geschirrriemen durch Masken/Tiefenaufteilung korrekt verdecken. Danach fünf noch fehlende Fragmente und komplette Kombinationsabnahme; erst dann produktives Outfitmodell. Nutzerprofil und Liveausrüstung werden dabei noch nicht angefasst.

Erste tatsächliche Kombinationsansicht erfolgreich in Chromium aufgenommen und gesichtet. Jetzt vorrangig Rückseitenmasken für Geschirr und tiefe Körperüberlagerungen ausarbeiten; dann übrige Krafttrainingfragmente. Die aktuellen drei PNGs verbleiben im Entwicklungsatelier.

## Nach Komplettierung des Krafttraining-Prototyps

Tatsächliches Fünferset im Browser sichten, Hand-/Ärmelübergänge und Riemenverdeckung nacharbeiten. Anschließend Basis in Körper, Grundgewand und Haare trennen und zweite Körpervariante prüfen, bevor dieses Rig als allgemeiner Grafikvertrag gilt. Produktions-Outfitmodell und Datenkonvertierung erst mit getesteten Rückwegen; Artbookpfade anschließend nacheinander.

Erste Fünferset-Aufnahme nach Handgelenk-/Unterarmkorrektur in Chromium erfolgreich gesichtet. Nächster Abschnitt: Basis in Körper/Grundkleidung/Haar zerlegen und Masken mit einer weiteren Körpervariante prüfen, dann produktive Mehrfachauswahl mit erhaltener Outfit-/Historienkompatibilität.

## Nach erster Basisaufteilung

Isolierte Körper-/Haar-/Kleidungsbilder prüfen und Trennmasken korrigieren. Darauf aufbauend verborgene Körper-/Kopfflächen anhand der bestätigten Pose zeichnen und für wirklichen Wechsel passende neue Einzelgrafiken erstellen. Die geometrische Breitenvariation dient nur dem gemeinsamen Einpassungstest und ersetzt keine individuell gezeichnete zweite Anatomie. Erst nach dieser Sichtabnahme produktive freie Umkleidung.

Neuer separat gezeichneter Körperunterbau vorhanden. Jetzt Proportionen/Anker mit bestätigter Basis vergleichen, danach passende vollständige Haar- und Grundkleidungsfragmente erzeugen und anpassen. Keine allein aus groben sichtbaren Masken abgeleitete Produktionsfreigabe.

## Nach Bereinigung und Körperunterbau

Neue unabhängige Haare/Kleider und vollständigen Unterbau gemeinsam im realen Browser sichten, Registrierung bei Bedarf korrigieren. Insbesondere Gesichtöffnung, Kragen, Unterärmel, Hände, Füße sowie alle acht Ausrüstungsfragmente prüfen. Danach Grundoutfit in Gewand/Obi/Hakama/Schuhe und Haare in Vorder-/Hinterteil aufteilen, damit weitere Belohnungen sinnvoll dazwischen liegen können. Vor Liveintegration Größenbudget und zweite gezeichnete Anatomie festlegen; Datenmodell/Favoriten/History erst mit verlustfreiem Rückweg anbinden.

Basis- und Unterbauabschnitt im Chromium abgeschlossen und gesichtet; aktueller Nachweis verification-body-foundation-v02.json. Die nächsten Arbeiten stehen im aktuellen Abschnitt oben, nicht in den historischen Ablaufnotizen.

## Nach sieben unabhängigen Basisgrafiken

Sieben Ebenen und komplette Kombination im Chromium sichten, Taille/Ärmel/Schuhe und Haaranschlüsse korrigieren. Danach Ärmel-Vorder-/Hinterseiten für natürliche Armverdeckung ausarbeiten; zwei gezeichnete Anatomien mit denselben Artikeln prüfen und mobiles Asset-/Renderingbudget festlegen. Produktive Auswahl erst anschließend mit stabilen IDs, vollständigem Besitz-/Favoriten-/Historienrückweg und Offline-/Geräteprüfung anbinden.

Sieben-Ebenen-Abschnitt einschließlich korrigierter Unterarmkanäle abgeschlossen; [Nachweis](https://github.com/Rowlandolo/KONPASU/actions/runs/41518792450) und verification-seven-layers-v03.json. Allgemeine Ärmel-/Arm-Tiefen und zweite Anatomie bleiben der nächste gestalterische Abschnitt.

## Nach zwei Körperformen und gemeinsamer Szene

Beide Formen mit Grundoutfit, Unterbau und vollständigem Set im realen Chromium sichten und Passformen korrigieren. Anschließend Rendering-/Dateigrößenbudget verbindlich festlegen, echte Kopf-/Ärmel-/Riemenfragmente in dieselbe Szenenlogik einordnen und erst danach produktive Mehrfach-Outfits mit Besitz-/Favoriten-/History-Rückweg anbinden. Weitere 90 Artikel nacheinander, keine neue Schemaänderung ohne Auftrag und Rückweg.

Zwei-Formen-/Szenenabschnitt erfolgreich geprüft und gesichtet: https://github.com/Rowlandolo/KONPASU/actions/runs/41529386209, verification-two-forms-v04.json. Aktuelle nächste Priorität steht oben; frühere Körpervarianten- und Maskenaufträge sind für diesen Prototyp abgeschlossen, nicht universell für alle zukünftigen Artikel.

## Zählbarer Weg zum vollständigen Artbook-Avatar

Sechs größere Etappen mit Ergebnissen und Abschlusskriterien: AVATAR_RELEASE_STEPS.md. Etappe 1 (Leistung/Grafikbudget) ist aktiv, mit bedarfsgesteuertem Laden und Bild-/Maskenwiederverwendung. Produktionsziele sind noch nicht erreicht. Dann Tiefenfragmente, Daten-/Appintegration, weitere 90 Artikel, Geräte-/Offlineabnahme und Veröffentlichung. Der KI-Copilot und die restliche App besitzen zusätzliche Phasen im PROFESSIONAL_APP_PLAN.md.

Aktueller Etappe-1-Beleg: https://github.com/Rowlandolo/KONPASU/actions/runs/41533841108, verification-performance-v05.json. Bedarfssteuerung und Rendering optimiert, visuelle Set-Ausgabe bytegleich; Produktionsgrößen bleiben ein offenes Abschlusskriterium.

## Numerische Produktionsbudgets / nächster Abschnitt

Neue Laufzeitgrafiken erfüllen die numerischen Datei-/Quell-RGBA-Ziele. Nach echtem Vergleich gegen Originale und 3×-Vorschau ist der technische Teil von Etappe 1 abgeschlossen. Die physische Gerätebestätigung bleibt in Etappe 5 und ist weiterhin Voraussetzung vor Veröffentlichung. Danach Etappe 2: tatsächliche Vorder-/Hinterfragmente für Riemen, Ärmel und spätere Kopfteile.

Abschluss belegt: verification-delivery-v06.json, 245 Regressionen und 19 Atelier-Prüfgruppen im Lauf 41544503356 erfolgreich, finaler Build bytegleich wiederholt. Etappe 2 ist die nächste konkrete Lieferung; übrige fünf Etappen und reale Gerätefreigabe bleiben offen.

Erster Abschnitt von Etappe 2 abgeschlossen: zweigeteiltes Geschirr mit unverändertem Artikel-/Frontschlüssel, auf beiden Körpern mit und ohne Gewand gesichtet. 248 Regressionen und 21 Atelier-Prüfgruppen grün im Lauf 41547850324. Ein frischer Build reproduziert alle 19 Laufzeitdateien plus Manifest bytegleich (41547850475). Nachweise: verification-harness-depth-v07.json. Als Nächstes Ärmel-Vorder-/Hinterflächen unter erhaltener logischer Gewandauswahl; AVATAR_DEPTH_CONTRACT.md beschreibt konkrete Bedingungen.

Ärmelabschnitt abgeschlossen: vier neue körperbezogene PNGs, gruppierter Basisvertrag und körperrichtige Vorschau; sieben logische Wahlen und alle 95 Artikel-IDs bleiben erhalten. 255 Regressionen und 23 Atelier-Prüfgruppen erfolgreich (41551201193); 21 Ausgaben plus Manifest bytegleich wiederholt (41551201181). Nachweis: verification-sleeve-depth-v08.json. Als Nächstes Kopfteil-/Haartiefen, danach geplanter App-/Datenvertrag aus Etappe 3; keine neue Live-/Storage-Migration in diesem Abschnitt.

Kopfteilabschnitt begonnen: focus-1 anhand tatsächlicher Artbook-Abbildung als Stirnband zugeordnet, drei Module und unabhängige Haarüberlagerung vorbereitet. Sechs Prototypartikel statt fünf; 89 weitere Standardartikel, weiterhin 18 Grafikpakete (17×5 und zuletzt 4). Nächster Prüfpunkt sind beide zusammengesetzten Köpfe, Haarvarianten, fehlerhafte Module und unveränderte mobile Budgets. Etappe 3 erst nach diesem konkret belegten Startset-Tiefenabschnitt.

## Abschluss Etappe 2: Fokus-Stirnband und Haarüberlagerung

Kopfteilabschnitt erfolgreich abgeschlossen: focus-1 mit drei Modulen und unabhängig wählbaren Haarflächen, sechs Prototypartikel insgesamt. 262 Regressionen, App-Chromium und 26 Atelier-Prüfgruppen erfolgreich für 633e50984f581db846495e011b7766a29d6fb70c ([Lauf 41555922134](https://github.com/Rowlandolo/KONPASU/actions/runs/41555922134)). Vollbeleg samt archivierten Aufnahmen: design/avatar/verification-headwear-depth-v09.json. Etappen 1/2 sind technisch für dieses Startset abgeschlossen; nächster Abschnitt ist der reine App-/Outfitvertrag aus Etappe 3. Weitere 89 Artikel bilden 18 Pakete (17×5, zuletzt 4). Reale Geräte-/PWA-Abnahme und Freigabe vor Veröffentlichung bleiben erforderlich.

## Abschluss: alle übrigen 89 Artikel als Vektor-Passformprototypen

Nutzerauftrag vom 03.11.2026 vor Etappe 3 abgearbeitet: alle 95 Artbook-Abbildungen auf fünf Originaltafeln einzeln zugeordnet, stabile IDs und Legacy-Voraussetzungen erhalten. 89 neue Vektorstudien mit 134 eigenen transparenten SVG-Modulen ergänzen die sechs bisherigen PNG-Prototypartikel. Beide Standfiguren, unabhängige Auswahl/Sichtbarkeit/Reihenfolge und echte Frontstoffmasken im separaten `design/avatar/catalog.html`. Es handelt sich um Passform-/Funktionsprototypen; die 89 Premiumzeichnungen bleiben ein eigener Arbeitsschritt.

280 Regressionen, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 13 zusätzliche Katalog-Browsergruppen erfolgreich für c4dcdff69d4c2536f2e11c1993dd7cbd7c46a9ca: [Kataloglauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939844), [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939822). Alle 4.465 Paare auf beiden Körpern im reinen Planer; 190 tatsächliche Einzelrenderings mit sichtbarer Pixeländerung (Minimum A 48 / B 61 Pixel bei 256×384). Alle 95 gemeinsam als Stressauswahl erhalten; keine Behauptung aller Paarungen als visuell abgenommen. Tatsächliche Außenstoffmasken verändern 563 Bildpixel und erhalten die Artikelgruppen.

19 Familienvergleichsbilder mit Originaltafelbereichen und beiden Figuren sowie Mischoutfits, 95er-Stressfigur, mobile Ansicht und Detailvergleich gesichtet und unverändert unter `design/avatar/review-catalog-v10/` archiviert. Verschobene bestehende Karten besonders bei Sozial/Natur erkannt: neuer Vergleich nutzt explizite Viewports der bytegleichen Gesamttafel, mit tatsächlicher Pixelprüfung der Begrenzung. Legacykarten bleiben unangetastet. Koordinatenrundung beseitigt Node-/Chromium-Hashabweichungen bei Perlen/Fächern. Gewandmotive, Bandführung und sichtbarere Aurasockel nach Sichtprüfung verfeinert.

Keine Live-, Daten-, Schema-, Besitz-, Rewardregel- oder Service-Workeränderung. Reales Gerät, PWA-Kaltstart/Upgrade, Mimikgrafiken, Griffposen, endgültige Schuhpassform und Premiumzeichnung bleiben offen. Vollbeleg und Grenzen: `design/avatar/verification-catalog-v10.json`; Lesefassung und Bedienung: `ARTBOOK_PROTOTYPE_REVIEW.md`; je Artikel vollständige Quelle, Module und beide Registrierungen: `ARTBOOK_95_PROTOTYPES.md`. Abschlusscommit enthält ausschließlich Dokumentation und Prüfbelege.

## Abschluss Etappe 3.1: verlustfreier Outfit-Leseadapter

`avatar-outfit-v25.js` projiziert aktuelle Auswahl, Favoriten und historische Schnappschüsse ohne Schreibzugriff. Parallele Legacy-/Slotwerte, ruhende/unbekannte Einträge, eigene Ziel-IDs und beide Begleiterfelder bleiben mit ihrer Herkunft erhalten. Artikelidentität und Grafikschlüssel sind getrennt; Besitz/Tragbarkeit und tatsächliche Altauflösung stammen aus den bestehenden APIs. Leere Favoriten bleiben leer. Ohne historische Quelle entsteht eine neutrale blockierte Ansicht statt einer erfundenen heutigen Vergangenheit.

303 Regressionen einschließlich 23 neuer Adapterfälle, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 12 neue Browsergruppen erfolgreich für **1d50304da6b818cf1181cb79fda02072755e8143**: [Regression und bestehender Browser](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680366), [synthetische Outfitprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680286). Acht UI-Fälle, exakte Quelltreue, 390-px-Layout, Textsicherheit, sichtbare Fehler und bedienbare bereits geladene Offlineansicht geprüft. Kein localStorage-/IndexedDB-Eintrag, keine Browserfehler. Sechs tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-contract-v01/` archiviert; Vollbeleg `design/avatar/verification-outfit-contract-v01.json`.

Entwurfs-PR [#5](https://github.com/Rowlandolo/KONPASU/pull/5) baut auf #4 auf. Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Die synthetischen VM-Fälle verwenden kontrollierte Wochen-/Tierwerte; sie sind keine vollständige Reward-/Kalender- oder Geräteabnahme. Etappe 3 insgesamt ist weiterhin offen. Als Nächstes folgt ein geordneter Mehrfachentwurf mit eigenen Artikelinstanzen, Sichtbarkeit, Reihenfolge und Undo ausschließlich im Sitzungsspeicher. Persistenz, Import/Export/Rollback und Appintegration folgen mit eigenem Prüfvertrag. Details: AVATAR_OUTFIT_CONTRACT.md.

## Abschluss Etappe 3.2: Mehrfachoutfit im Sitzungsspeicher

Eigene Werkstatt `design/avatar/outfit-draft.html` und reiner Editor `avatar-outfit-draft-v25.js` in Entwurfs-PR [#6](https://github.com/Rowlandolo/KONPASU/pull/6), aufbauend auf #5. Artikel unabhängig hinzufügen, ausblenden, sortieren und entfernen; Undo/Redo für alle Aktionen einschließlich Körperform und Reset. Stabile Instanzen erhalten eigene Ziel-IDs bei geteilter Grafik. Start nur mit tatsächlicher Altauflösung; vollständige Originalquelle unverändert. Jedes synthetische Beispiel behält seinen Entwurf während der geöffneten Seite; Neuladen verwirft ihn sichtbar angekündigt. Kein sessionStorage, localStorage oder IndexedDB-Zugriff.

**324 Regressionen (21 neu), bestehende App-/Atelierprüfung mit 26 Gruppen und 16 neue Chromiumgruppen erfolgreich** für `7b90e8a535e52d64b8f2767ef2954f1526b591e2`: [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823151), [Entwurfsprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823134). Tatsächliche UI-Undo/Redo-Kette, geteilte PNG-Grafik mit eindeutigen SVG-IDs, veränderte gleich tiefe SVG-Reihenfolge, 95er-Kombination mit 134 Vektor-/12 PNG-Modulen, DE/EN, 320/390/430 px, 44-px-Ziele, Warm-Offlinebetrieb und Fehlerfälle bestanden. Drei echte Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-draft-v01/` archiviert. Vollbeleg `design/avatar/verification-outfit-draft-v01.json`; Vertrag und Grenzen AVATAR_SESSION_DRAFT.md.

Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Historische Personalisierung, Szenen und gesonderter Legacy-Begleiter bleiben im Original erhalten; ihre Rendererübernahme ist noch offen. Prototypgrafiken, physisches Gerät und kaltes PWA-Upgrade bleiben eigene Gates. Als Nächstes Etappe 3.3: expliziter additiver Speicher-/Import-/Export-/Rollbackvertrag mit Datenvergleich und bestehendem Revisions-/Konfliktschutz. Noch keine dauerhafte Speicherung oder neue Figur in der Live-App.

## Abschluss Etappe 3.3: dauerhafter Outfitvertrag mit Rückweg

Entwurfs-PR [#7](https://github.com/Rowlandolo/KONPASU/pull/7) auf #6 ergänzt `profile.outfit25` ausschließlich nach ausdrücklichem Speichern sowie genau einen dauerhaften Rücknahmeeintrag `outfitRecovery25`. Reine Kandidatenprüfung und struktureller Datenvergleich in `avatar-outfit-persistence-v25.js`; Anbindung an dieselbe Speicherqueue, IndexedDB-Revision und Fallback-Web-Lock in `avatar-outfit-store-v25.js`. Alte Ausrüstung, Favoriten/History, Ziele/Trainings und unbekannte Daten bleiben erhalten. Frischer Besitz-/Tragbarkeitsnachweis; ruhende/unbekannte gespeicherte Wünsche bleiben erhalten, ohne als tragbar zu gelten. Rücknahme nach Neuladen ändert nur Outfitfelder und erhält spätere andere Einträge. Noch Backend/API, keine produktive Verbindung der neuen Editor-/Rendereroberfläche.

**350 Regressionen (26 neu), bestehende App-/26 Ateliergruppen, 16 bestehende Editorgruppen und 13 neue Speicher-Browsergruppen erfolgreich** für `b6e0d96c0d331360ab77a4a15e0ada309af9bfcb`: [Basis/App](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181636), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181657), [echte Speicherprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181638). Reale IndexedDB, Startup/Reload, vorhandene JSON-Backup-/Import-UI, frische Offline-Seite mit tatsächlichem Worker, konkurrierende Tabs, Queueüberlagerung, Rücknahme nach späteren Daten und erzwungener Put-Fehler geprüft. Browser-Evidenz über echte Reward-/Kalenderfunktionen mit expliziten Wochenmesswerten; keine Tier-/Evidenzstubs. Der synthetische Screenshot ist eine ausschließlich vom Test erzeugte Ergebniskarte, kein neues produktives Bedienelement. Belege unter `design/avatar/review-outfit-storage-v01/`, Vollbeleg `design/avatar/verification-outfit-storage-v01.json`.

Kandidat **2.4.1-preview.1** hat einen getrennten Cache `konpasu-offline-v241-outfit-preview1` und precacht alle vier neuen Laufzeitabhängigkeiten kritisch. Dieser Entwicklungsstand ist nicht veröffentlicht; main/Pages und persönliche Daten wurden nicht geändert. Nächster Abschnitt 3.4: Editorbedienung mit Speichern/Rücknahme und klaren Konfliktzuständen an die API anbinden, neuen Renderer samt Personalisierung/Szenen/Begleiter und Legacy-Rückweg integrieren. Physisches iPhone, VoiceOver und Alt-PWA-Upgrade bleiben eigenständige Abnahmen. Details: AVATAR_OUTFIT_PERSISTENCE.md.

## Abschluss Etappe 3.4.1: sichtbarer Editor mit Speichern, Konflikt und Rücknahme

Entwurfs-PR [#8](https://github.com/Rowlandolo/KONPASU/pull/8) auf #7 ergänzt den tatsächlichen Einstieg **Avatar → Outfits → Mehrfachoutfit bearbeiten**. Native Dialogbedienung mit Artbook-Anprobe, Artikelwahl/Suche, unabhängiger Sichtbarkeit/Reihenfolge, Körperform, Undo/Redo/Reset und ausdrücklichem Speichern. Separate dauerhafte Rücknahme ist bei ungespeicherten Entwurfsänderungen gesperrt. Schließen behält den Entwurf in der laufenden App. Vorhandene Ausrüstung, Favoriten, History, Ziele/Trainings und übrige Daten bleiben erhalten.

Konflikt zeigt klare Meldung, sperrt Speichern und erhält den Entwurf. „Neueste Daten laden · Entwurf behalten“ liest und validiert denselben Speicher, prüft lokale Appänderungen vor/nach dem Lesen und rebasiert nur auf ausdrückliche Aktion. Ungespeicherte andere Einträge werden nicht überschrieben; vorhandener JSON-Export ist erreichbar. Geprüfter Memory-Ausgangsstand nach Startup/Schreibabschluss, typisierter Konflikthinweis und erwartetes Recovery-Token ergänzen den vorhandenen Schutz. Keine automatische Wiederholung fehlgeschlagener Writes.

**366 Regressionen (16 neu), 12 neue UI-Browsergruppen, 13 bestehende Speichergruppen und bisherige App-/26 Ateliergruppen erfolgreich** für `cb18dd1142783b34331eed1d9566448f79c9c056`: [App/Tests](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795811), [sichtbare UI](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795808), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795918). Echter Offline-Neustart mit Anprobe, Speichern/Neuladen/Rücknahme, tatsächlicher Zweitab-Konflikt und behaltener Entwurf, lokale Fremdänderungen, JSON-Sicherung, DE/EN, 320/390/430 px, Touch/Fokus, Textsicherheit und Integritäts-Retry geprüft. 24 Liefer-WebPs reproduziert: [Build](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795888). Drei tatsächliche UI-Bilder gesichtet und unverändert archiviert; Bericht/Vollbeleg unter `design/avatar/review-outfit-editor-v01/` und `design/avatar/verification-outfit-editor-v01.json`.

Kandidat **2.4.1-preview.2** mit getrenntem Cache `konpasu-offline-v241-outfit-preview2`; alle benötigten Vorschauverträge/Skripte/24 WebPs sind kritisch precached. Keine Original-Artbooktafeln oder einzelnen 134 SVG-Dateien dafür geladen. Kein Main-Merge/Deployment und kein Zugriff auf private Browserprofile. **3.4 insgesamt bleibt offen:** Hauptavatarroute samt Personalisierung/Szenen/Begleiter, Favoriten/History und Synchronisierung mit Legacyaktionen ist der nächste Integrationsabschnitt 3.4.2. Die neue Standfigur wird in diesem Schritt ausdrücklich als Editor-Anprobe angezeigt, die bisherige Hauptdarstellung bleibt aktiv. Physische Geräte-/GPU-/VoiceOver-/Alt-PWA-Abnahme und finale Grafik bleiben offen. Vertrag: AVATAR_OUTFIT_EDITOR.md.


## Nach Etappe 3.4.2

**388 Regressionen (22 neu), 12 neue Hauptavatar-Browsergruppen, 12 bestehende Editorgruppen, 13 Speichergruppen sowie 10 App-/26 Ateliergruppen erfolgreich** für `d4d2948033ca6e102c2928b398ca0055023e9bb5`: [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771908), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771935), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41629772026), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771846). Vier tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-main-avatar-v01/` archiviert; vollständiger Beleg `design/avatar/verification-main-avatar-v01.json`. Nur synthetische Daten, kein privates Browserprofil, kein Deployment. Der nachfolgende Archivcommit enthält ausschließlich Dokumentation und Belege.

Die funktionale Mehrfachroute läuft auf dem bestehenden persönlichen SVG-Hauptavatar. Der Artbook-Körper braucht vor der Hauptansicht vollständige persönliche Varianten und passende Ebenen. Danach folgen finale Artikelgrafiken, Geräte-/Alt-PWA-Abnahme und erst nach Freigabe Veröffentlichung. Die gesamte Etappe 3.4 wird nicht als abgeschlossene neue Artbook-Darstellung ausgegeben.


## Abschluss Etappe 3.4.3a: persönliche Artbook-Varianten und Passformstudie

Entwurfs-PR [#10](https://github.com/Rowlandolo/KONPASU/pull/10) auf #9 ergänzt im tatsächlichen Mehrfacheditor eine ausdrücklich einschaltbare persönliche Artbook-Studie. Neun neue separate Zeichnungen: drei vollständige Köpfe/Mimiken und Vorder-/Hinterhaare für drei Frisuren. Drei Haar- und drei Gewandfarben werden mit alphaerhaltenden Farbfiltern dargestellt. Bestehende Profilwerte dienen als Ausgangspunkt; Körperform A/B bleibt ausdrücklich frei gewählt. Die persönlichen Regler verändern weder Profil noch Besitz oder Hauptavatar. Outfit-Speichern schreibt weiterhin ausschließlich den bestehenden Outfit-/Recoveryvertrag.

162 Kombinationen auf beiden Körpern mit dem sechs Artikel umfassenden PNG-Startset tatsächlich gerendert, Körper-/Ausrüstungsgeometrie und eindeutige IDs unverändert, Kopfteil-/Haar-Tiefenordnung in allen Fällen geprüft. Zusätzlich alle 95 Artikelidentitäten auf beiden Körpern komponiert; dies ist keine vollständige Sichtabnahme jeder möglichen Kombination. Drei Mimik-/Haarfarbwerte unterscheiden sich in tatsächlichen Pixeln. Original-/WebP-Vergleich: maximaler Alphafehler 0, sichtbarer Farb-RMSE 1,802745. Umschaltung zur Ursprungsansicht, Profilvergleich nach Save, DE/EN, 320/390/430 px/44px, Integritätsfehler mit Retry und erste Aktivierung nach frischem Offline-Neustart bestanden.

**402 Regressionen (14 neu), 11 neue persönliche Browsergruppen, 12 Hauptavatar-, 12 Editor-, 13 Speicher- sowie 10 App-/26 Ateliergruppen erfolgreich** für `dedbfedb4dbd6eb96f51a3d12b977f4fcfbc6a4a`: [Varianten/Passform](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882331), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882613), [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882357), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882476), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882422). Fünf tatsächlich im Browser erzeugte Bilder gesichtet und unverändert unter `design/avatar/review-personal-variants-v11/` archiviert; Vollbeleg `design/avatar/verification-personal-variants-v11.json`. Nur synthetische Daten, kein privates Browserprofil, kein Main-Merge/Deployment. Der folgende Archivcommit enthält ausschließlich Dokumentation und Belege.

Kandidat **2.4.1-preview.4**, Cache `konpasu-offline-v241-outfit-preview4`. Der 466.178-Byte-Atlas ist kritisch precached und wird erst beim Einschalten in der Anprobe decodiert. Die unveränderte Original-PNG wird nicht precached. Delivery lokal bytegleich mit Pillow 12.3.0/libwebp 1.6.0 reproduziert; zusätzlicher Quell-RGBA-Bedarf rund 6 MiB. Keine physische Peak-/GPU-Messung. Vertrag: AVATAR_PERSONAL_VARIANTS.md.

Die neuen Zeichnungen und Farbpaletten sind Studien für eine erwachsene Pose. Vollständige persönliche Körper-/Gesichts-/Hautvarianten, endgültige Premiumfarben, weitere Posen, reale Geräte/GPU/VoiceOver/Alt-PWA und universelle Passform bleiben offen. **Nächster Abschnitt 3.4.3b:** ausdrücklich bestätigte Übernahme persönlicher Werte mit feldbegrenztem Datenvergleich/Rückweg und Vorbereitung der Artbook-Hauptdarstellung mit Szenen/Begleitern sowie erhaltenem SVG-Rückweg. Noch keine automatische persönliche Speicherung oder Hauptavatar-Umschaltung.
