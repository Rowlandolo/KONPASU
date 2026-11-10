# KONPASU – Fehlerregister

Stand 03.11.2026. P0 = Releaseblocker, P1 = hoch, P2 = Produktlücke. Fehlerbehebungen der Basis wurden mit 2.4.0 veröffentlicht; die neue Artbook-Avatarentwicklung bleibt separat in Entwurfs-PRs bis #11. Ältere Tabellenbefunde und aktuelle Nachträge unterscheiden; der aktuelle Nachtrag steht am Dokumentende.

| ID | Priorität | Reproduktion / Ursache | Stand und Beleg |
|---|---|---|---|
| AV-01 | P0 | Avatar öffnen → `ReferenceError: mkButton is not defined`; Gestaltung benötigt zusätzlich displayTier/KPBackgroundControls im IIFE-Scope | Baselinefehler reproduziert; Hilfen ergänzt; alle Studiotabs DE/EN VM-getestet |
| AV-02 | P1 | Tier-3-Armteil speichern, Tragbarkeit auf 1 senken, „Beste verfügbare“ → altes höheres Teil blockiert Auswahl | Neu aus tragbaren Items berechnen; Favoriten/Awards bleiben; Regression |
| AV-03 | P1 | Favorit mit anderem Tier anziehen → avatar2d.pet und companion widersprechen sich | Beide synchronisiert, Regression |
| AV-04 | P1 | Nur awards, keine streakAwards → zugleich vorhandene Auszeichnung und „keine Meilensteine“ | Gemeinsamer Leerzustand, Regression |
| AV-05 | P1 | Haare/Farbe/Szene ändern → große Figur bleibt Blueprint | Echte 480×600 SVG-Ebenen, 95 Mappings; optische Endabnahme offen |
| AV-06 | P1 | Alte Ansicht am Mittwoch einer später erfolgreichen Woche → Erfolg aus noch laufender Woche | Historische Wochen erst nach deren Ende; Regression |
| AV-07 | P1 | Gesperrter Drache fällt auf Fuchs zurück → Evolutionsstufe berechnet sich weiter aus Drache/Kraft | Tatsächlich sichtbaren Begleiter zur Stufenberechnung verwenden |
| AV-08 | P1 | Ziel pausieren → auch verdiente Inventarteile verschwinden | Ziele mit owned>0 weiter anzeigen; keine automatische Reaktivierung |
| AV-09 | P1 | Serien-Aura auswählen → 2.4-Kit rendert sie nicht | Qualifizierte aktuelle Aura ergänzt; historisch vorerst ausgeblendet statt aktuelle Serie zu behaupten |
| AV-10 | P1 | Nur Teil des Assetbundles geladen → Kit kann unvollständige Figur anzeigen | Erforderliche Körperebenen prüfen, Blueprintfallback |
| AV-11 | P2 | Startseite zeigt statische home-hero-Grafik trotz personalisiertem Avatar | Gleicher Renderer eingebunden; vollständige Startseite C noch offen |
| QA-01 | P0 | Kein echter Browser-/iPhone-Upgrade-/Offline-/IndexedDB-Test in dieser Sitzung | Chromium und Release 2.4.0 erfolgreich; reales iPhone/VoiceOver/Alt-PWA-Upgrade weiter offen |
| OPS-01 | P0 | Frühere create_branch-Aufrufe → 403 Resource not accessible by integration | Nach GitHub-Neuverbindung behoben: separater Remote-Branch erfolgreich angelegt. Übertragung/Review-PR möglich; kein Deployment |
| DATA-01 | P1 | init() liest beschädigten localStorage-Fallback: JSON-/Migrationsfehler werden in catch teils verschluckt; Katalogseeding kann anschließend store() auslösen | Lokal behoben: fehlend vs. unlesbar getrennt, Schreibschutz, Warnhinweis und kein Export des Ersatzprofils. 16 Start-/Lesefehlerregressionen bestanden; echte Browserabnahme offen |
| DATA-02 | P1 | localStorage-Fallback hat keine Revisionsprüfung wie writeDB() | Lokal gehärtet: Web Locks + Vergleich des zuletzt gelesenen Rohstands innerhalb des Locks; Konflikt sperrt alte Tabs. Acht Regressionen bestanden. Ohne Web Locks ist nur dieser Ersatzspeicher schreibgeschützt; alte App-Tabs ohne Lockprotokoll bleiben ein Upgrade-Risiko. Browserabnahme offen |
| DATA-03 | P1 | validateImportedBackup prüft Kernlisten, nicht vollständig alle optionalen Profil-/Reward-/Detailstrukturen oder echte Kalenderdaten | Verschachtelte Struktur-/Datumsprüfung, Startschutz und Restore-Rollback lokal implementiert. Tatsächlicher Change-/Savepfad getestet; vollständige Semantik-/Altformat-/Geräteabnahme offen |
| OFF-01 | P1 | SW lädt Navigation netzwerkzuerst, Skripte cachezuerst → während Upgrade gemischte Versionen möglich | Installiertes HTML bei vorhandenem Cache bevorzugt; Mischstand-Regressionsprüfung und verständlicher Offlinefehler ergänzt. Alte aktive Worker, Cacheverlust/Quoten und echter Upgradepfad bleiben offen |
| REW-02 | P1 | Alte Legacy-Ausrüstung sichtbar, erster Abnehmen-Klick legt dieselbe Auswahl erneut an | Lokal behoben: Toggle folgt sichtbarem resolveSlot-Ergebnis, anschließend Legacy-Slotkonflikte entfernen; Regression bestanden |
| REW-03 | P2 | Neue Sammlungsdarstellung noch nicht visuell auf Zielbrowsern abgenommen | Vorschau und acht VM-Prüfungen vorhanden; lokale Browsernavigation administrativ blockiert |
| REW-04 | P1 | v1RebuildStreakAwards verwirft frühere Serien nach Korrektur/Periodenwechsel kommentarlos | Lokal behoben: Historie erhalten, Nachweis beim Anzeigen prüfen, ungestützte Einträge als offen markieren. Keine neue Freischaltung; acht Audit-/acht Hallentests |
| REW-05 | P1 | Ernährung/Alkohol starten ohne numerischen Zielwert und haben damit keinen ungefragt festgelegten Rewardpfad | Konfigurationshilfe und transparenter Rewardhinweis lokal umgesetzt; ungewählte Werte bleiben leer. Qualitative Wochenbalance wird weiterhin nicht als numerischer Rewardpfad behauptet; Grundlogik/Defaults unverändert |
| REW-06 | P2 | GearTier kann nach belegtem Rückschlag bei späteren unbekannten Wochen wieder nach owned ausstatten | Bestehende Balanceentscheidung dokumentiert, nicht still verändert; siehe REWARD_AUDIT.md |
| REW-07 | P1 | Begleiterauswahl prüft Gate ohne Zielpause; Galerien zeigen bei nicht gewählten Tieren pauschal Form 1 | Lokal behoben: petStatus gemeinsam für Rendern, aktuelle Form und Auswahl; unbekannte Schlüssel sicherer Fallback, Auswahl bleibt gespeichert |
| REW-08 | P1 | Favorit lässt vorige Legacy-Ausrüstung hineinmischen; Speichern lässt Legacy-Teile weg; negativer Löschindex entfernt letzten Favoriten | Lokal behoben: Legacy-Übernahme in freie Slots, klarer Ausrüstungswechsel und validierte Indizes. Vorschau ohne Writes; bestehende Vorlagen bleiben erhalten |
| REW-09 | P2 | Gespeicherte Auswahl und aufgelöstes Ersatzteil waren nicht pro Slot nachvollziehbar; Intensität Aus kann aufgelöste Effekte ausblenden | Neue reine Slotübersicht erklärt Auswahl/Auflösung/Gründe und trennt ausgeblendete Effekte. Zehn Regressionen; visuelle Abnahme offen |
| EVID-01 | P1 | Widersprüchliche Alkoholnachweise, doppelte freie Tage, Tagesbestätigung als Wochenbeleg und verdeckte Obergrenzenüberschreitung | Lokal vereinheitlicht; 23 zusätzliche Tests. CONSUMPTION_EVIDENCE.md. Historische Konfiguration und echte Geräte offen |
| QA-02 | P1 | Fehlende Details als Tagesnachweis, hängenbleibende Anprobe, Maße verändern Look, Exportlücken und flüchtige Speicherwarnung | Lokal korrigiert und mit 43 zusätzlichen Prüfungen abgesichert; vollständiger Befund in QUALITY_AUDIT_2026-11-02.md |
| REW-01 | P1 | 95 Assetzuordnungen existieren, aber historische/temporäre/permanente Freischaltung nicht vollständig abgenommen | 95 Schwellen-/Slot-/SVG-Zuordnungen und mehrere Rückschlag-/Custom-Fälle getestet. Visuelle Passung, vollständige Historie, Sets und 30-Slot-Ziel bleiben offen; siehe REWARD_AUDIT.md |
| UX-01 | P2 | DE/EN nutzt app.js applyLanguage() mit nachträglichem DOM-Textaustausch | Produktanforderung systematische Übersetzung noch nicht erfüllt |
| UX-02 | P2 | Historische Begleiter-/Rewarddaten verwenden teilweise aktuelle Goal-Konfiguration | Vollständige historische Konsistenz offen; keine behauptete Komplettlösung |

Cloud/Sync, echte KI, native Apps, Sensoren, Barcode/Fotosuche und 3D sind geplante Ausbaustufen, keine versteckt funktionsfähigen Bestandteile.

## Aktueller Lieferblocker

PKG-01 lokal behoben: vollständige Original-ZIP erhalten, alle 45 Basisdateien hashgeprüft, fehlende Originalbilder und premium-art-bundle.js ergänzt. Neues Komplettpaket ersetzt frühere unvollständige Änderungs-ZIPs. Die alte Original-UI hatte „1.8“ fest eingetragen; Versionsanzeige nun DE/EN mit zentraler 2.4.0 abgeglichen. Browser-/iPhone-/Upgradeblocker QA-01 bleibt offen.

## Nach Veröffentlichung 2.4.0

Chromiumblocker der lokalen Arbeitsumgebung bleibt lokal bestehen; reale Chromiumabnahme wurde erfolgreich in GitHub Actions ausgeführt. Startabhängigkeit gmYes vor core-v15 behoben, Regression vorhanden. QA-01 bleibt für reales iPhone/VoiceOver/Alt-PWA-Upgrade offen. Runtime-Merge und Pagesveröffentlichung erfolgreich, aktuelle Nachweise in STATUS.md.

## Artbookabweichung / Mehrfachausrüstung

ART-01: Vorhandene 95 Premiumkarten sind abgeflachte, teils abgeschnittene Illustrationen; keine tragbaren transparenten Assets. ART-02: Legacy-Slots verdrängen Artikel und weisen z.B. Schulterpanzer dem Kopf zu. Neuer Planer prüft unabhängige Auswahl, Livepfad bleibt unverändert. Acht Krafttrainingfragmente noch anzufertigen; Grundkörper ist ein generierter Stilentwurf mit Transparenz, kein fertiges segmentiertes Rig. Kein Anspruch auf abgeschlossene visuelle Abnahme.

## Ausrüstungsprototypen

ART-03: Drei neue PNGs sind Prototypen für eine Pose, keine fertigen universellen Rüstungsebenen. Geschirr enthält noch rückwärtige Riemen, die bei einfacher Überlagerung sichtbar bleiben können; Vorder-/Hintermaskierung erforderlich. Größen/Perspektiven und paarige Schulterpassform visuell abnehmen. Keine Übernahme in den Live-Avatar. Weitere fünf Fragmente des Krafttrainingpfads stehen aus.

## Krafttraining-Fünferset

Die fünf zuvor fehlenden Krafttrainingfragmente existieren jetzt als Prototypen. ART-03 bleibt für endgültige Passform/Masken und weitere Körper gültig. Die neue Geschirrverdeckung ist eine feste Sichtbarkeitsmaske für genau diese Pose, keine universelle Tiefenlösung. Große PNGs sind noch kein freigegebenes mobiles Offline-Assetbudget. Weitere 90 Artikel stehen als angepasste Grafiken aus. Keine Aussage, dass alle Kleidungs-/Handüberlagerungen bereits visuell abgenommen sind.

## Vorläufige Basissegmentierung

ART-04: Die neue Aufteilung klassifiziert sichtbare Quellpixel durch vorläufige Masken; deren Anatomie-/Kleidungsgrenzen sind noch visuell nachzuarbeiten. Ohne Kleidung erscheinen nur im Original vorhandene Haut-/Gesichtsbereiche, keine vollständige Anatomie. Haare entfernen rekonstruiert keine verdeckte Kopfhaut. Der breitere Zustand ist eine gemeinsame 6-Prozent-Transformation, kein eigenständiger Körperbau. Vor frei wechselbaren Kleidungs- oder Haarassets passende Körper-/Kopfbasis neu zeichnen.

Sichtbefund ART-04 bestätigt: Isolierte Körpermaske übernimmt noch Haar-/Kragenpixel, Haarmaske Haut-/Kragenreste, Kleidung einzelne Haar-/Hautreste. Grüne Rekonstruktions-/UI-Tests belegen deshalb ausdrücklich keine fertig separierten Produktionsassets. Neue Körperunterlage und neue/saubere Haar-/Kleiderdaten vor freiem Wechsel erforderlich.

ART-05: Die neue Unterkörper-/Kopfbasis ist ein gesonderter Grafikentwurf und noch nicht auf die alten Kleidungs-/Haar-/Rüstungsebenen registriert. Unterbody-Metadaten markieren dies explizit. Das Atelier zeigt sie separat; keine automatische Pose-/Passformbehauptung oder Produktintegration.

## Ablösung der groben Masken durch neue Einzelgrafiken

ART-04: Die alten polygonalen Quellpixelmasken sind aus der aktiven Atelierdarstellung entfernt. Eigenständige Haar-/Kleidungsgrafiken enthalten keine absichtlich ausgeschnittenen Gesichts-/Handfragmente. Neue isolierte Ebenen im Chromium gesichtet: keine offensichtlichen Gesichts-/Handreste. ART-04 für das Ein-Pose-Atelier behoben; historische Rekonstruktionsnachweise beziehen sich auf den vorherigen Versuch.

ART-05: Vollständiger neuer Körperunterbau jetzt unter separater Grundkleidung und Haaren im Atelier eingebunden. Registrierung für diese Pose im Chromium gesichtet und korrigiert, einschließlich Haaren, vier Armfragmenten und gemeinsamem Breitentest; Nachweis verification-body-foundation-v02.json. ART-05 für diesen Prototyp behoben, keine allgemeine Produktionsfreigabe. Unterkleidung bleibt Bestandteil des Körpers; Gewand, Obi, Hakama und Schuhe bilden noch ein gemeinsames Grundoutfit. Vorder-/Hinterhaar, echte zweite Anatomie, mobile Dateigrößen und produktive Speicherung bleiben offen. Die alte underbody-study.json beschreibt ausschließlich die archivierte v01-Studie.

ART-06: Grundoutfit noch zusammengefasst, Vorder-/Hinterhaar nicht getrennt und nur eine gezeichnete Anatomie. Basis-PNGs 3.45 MB plus Ausrüstungs-PNGs 9.38 MB sind noch kein akzeptiertes mobiles Produktionsbudget. Vollständige App-/Offlineintegration und persistente Mehrfachauswahl fehlen weiterhin; keine Nutzerdatenmigration in diesem Abschnitt.

## Feinere Kleidung und Haare

ART-06 teilweise umgesetzt: Gewand, Hakama, Obi und Schuhe sind im Atelier unabhängig gezeichnet und schaltbar; Vorder-/Hinterhaare liegen auf getrennten Tiefenebenen. Keine polygonale Rückzerlegung des alten Gesamtbilds. Browser- und Sichtabnahme für diese Pose erfolgreich, Beleg verification-seven-layers-v03.json. Kimono hat weiterhin zusammengefasste Vorder-/Hinterseiten der weiten Ärmel; Hand-/Armrüstung kann deshalb weitere Tiefenmasken benötigen. Zweite Anatomie, Größenbudget und produktive Mehrfachauswahl bleiben offen. Die sieben aktuellen Basisgrafiken benötigen zusammen 6,144,050 Bytes.

ART-07 (im Atelier korrigiert): Neues Ärmelinnenfutter verdeckte Unterarme, obwohl Armschienen davor gezeichnet wurden. Gewand mit transparenten Armkanälen neu gezeichnet und auf dieselbe Pose registriert. Vier tatsächliche Unterarmpunkte jetzt im Chromium gegen erneute Verdeckung abgesichert; finale Gesamtaufnahme gesichtet. Dies ersetzt noch keine allgemeine Vorder-/Hinterärmel-Tiefenlösung für andere Anatomien.

## Körperform B / Verdeckung

ART-08: Zweite Körpergrafik sowie angepasstes Gewand und Hakama vorhanden; Passformen für beide Standfiguren im Chromium gesichtet, Nachweis verification-two-forms-v04.json. ART-08 für den Zwei-Formen-Prototyp abgeschlossen; keine universelle Anatomie-/Gerätefreigabe. Körperwechsel soll keine bestehende Artikel-/Basisauswahl verändern. Alle 95 Pfade bleiben unverändert; nur bestehendes Fünferset besitzt passende Prototypgrafiken.

ART-09: Gemeinsame SVG-Szene und alphabasierte deklarative Verdeckung umgesetzt, einschließlich aktivem Gewand vor Armrüstung. Dies ist keine vollständige universelle Vorder-/Hintersegmentierung aller Ärmel, Riemen und künftigen Kopfteile. Rückwärtige Geschirrriemen verwenden weiterhin transportierte, posebezogene Clippolygone. Weitere Tiefenoberflächen müssen ausdrücklich modelliert werden.

Zwei-Formen-Nachweis: https://github.com/Rowlandolo/KONPASU/actions/runs/41529386209, 230 Regressionen und 14 Atelier-Prüfgruppen. ART-09: aktive Alpha-Verdeckung und erhaltener Auswahlstatus durch echte SVG-Pixel bestätigt; zukünftige Tiefenfragmente weiter offen. Gemeinsame Basismenge umfasst 9,905,070 Bytes in zehn PNGs; Produktionsbudget weiterhin nicht akzeptiert.

## Leistungsabschnitt

PERF-01: Vorher beide Formen und komplettes 6,3-MB-Referenzbundle beim Start. Form B und Referenz nun bedarfsgesteuert; SVG-Bilder werden wiederverwendet, Masken referenzieren ihre Bildfläche statt Daten zu duplizieren. Prüfraster werden erst durch Snapshot-Aufruf angelegt. Neuer Browserbeleg erfolgreich: verification-performance-v05.json, inklusive Retry/Race, Maskenpixeln und bytegleichen Vergleichsbildern. PERF-01 im aktuellen Prototyp behoben.

PERF-02 bleibt Produktionsblocker für den neuen Avatar: aktuelle PNG-Quellauflösungen benötigen 15.52 MB beim Start und geschätzt 108 MiB decodiertes RGBA für alle verfügbaren Formen/Artikel. Die Schätzung enthält keine GPU-, DOM-, String- oder Browserkosten. Prototypbudgets sind kein Ersatz für kleinere Auslieferungsgrafiken und physische Gerätemessungen. Neue Grafikversionen/Formatwahl und Leistungsprüfung bleiben Bestandteil von Etappe 1.

Aktueller Leistungsnachweis: https://github.com/Rowlandolo/KONPASU/actions/runs/41533841108, 236 Regressionen und 17 Atelier-Prüfgruppen erfolgreich. Referenzen werden erst bei ausdrücklichem Öffnen, dann unmittelbar geladen. PERF-02 bleibt offen; weder die Prototypbudgets noch CI-Skriptzeiten sind eine Produktions-/iPhonefreigabe.

## Verkleinerte Laufzeitgrafiken

PERF-02 teilweise behoben: Mobile-Auslieferung erfüllt Datei-/Quell-RGBA-Ziele mit 770,084 Startbytes und 50,061,824 RGBA-Bytes. Originale bleiben unverändert. Browservergleich beider Formen und 390 px bei 3× Pixeldichte bestanden und Aufnahmen gesichtet; Nachweis verification-delivery-v06.json, Lauf 41544503356. Bildvergleich ist verlustbegrenzt, nicht byteidentisch zur kanonischen PNG-Darstellung. Echte iPhone-/GPU-/Speicherspitzenprüfung bleibt offen und verhindert weiterhin eine allgemeine mobile Produktionsfreigabe.

PERF-03 (im Atelier abgesichert): Geänderte WebP-Rezepte dürfen keine neue Revision unter bisherigem Dateinamen ausliefern. Dateinamen enthalten den SHA-256-Präfix der tatsächlichen Ausgabe, nicht nur der Quelle. Integritätsprüfung verifiziert weiterhin den vollständigen Hash. Das ersetzt keine spätere versionierte Service-Worker-/Offlineintegration.

ART-09 für das Geschirr im Zwei-Formen-Atelier behoben: zwei neu gezeichnete transparente Vorder-/Hinterdateien und echte Zeichentiefe ersetzen die alten Geschirr-Clippolygone. 248 Regressionen und 21 Atelier-Prüfgruppen erfolgreich, verification-harness-depth-v07.json. Getrennte Bilder und beide Körper mit/ohne Gewand gesichtet. Ärmel und künftige Kopfteile bleiben als restlicher Teil von ART-09/Etappe 2 offen; keine universelle Produktionsfreigabe.

ART-10 im Atelier behoben: Zusätzliche Ansicht ohne Gewand zeigte Rückriemen bei Form A außerhalb des Oberarms. Rückseitenregistrierung um acht Rigpixel nach innen versetzt, Form-B-Gruppenregistrierung entsprechend nachgeführt. Reale Browser-Alphaprüfung unterhalb Schulterhöhe: Form A 1, Form B 3 Randpixel außerhalb der Körperalpha, maximal 4 erlaubt; kein sichtbarer hängender Riemen. Grenztest ist auf diese beiden Standfiguren begrenzt.

ART-11 für die beiden Standfiguren im Atelier behoben: je Form neue Vorder-/Hintergrafiken, ein logischer kimono-Schalter und atomare vollständige Gruppe. Hinterärmel liegen hinter dem Körper und maskieren Armartikel nicht. Beide Formen mit Grundoutfit/komplettem Set, isoliertem Gewand und Flächenvorschau gesichtet. Tatsächliche Körperalpha 253 und Frontalpha 0 an acht Unterarm-/Handgelenkpunkten; echte SVG-Pixel sichern die Reihenfolge samt Frontmaske ab. 255 Regressionen und 23 Atelier-Gruppen erfolgreich, verification-sleeve-depth-v08.json. Keine allgemeine Pose-/Geräte-/Produktionsfreigabe; Kopfteil-/Haartiefen bleiben offen.

QA-Hinweis zur neuen Grafik: Ein bisheriger einzelner Hand-Messpunkt trifft nach Skalierung eine schwach geglättete Goldkante (etwa 22/255 Alpha). Gewand-Randprobe daher ausdrücklich <32, alle anderen isolierten Teile weiterhin <20; keine pauschale Erhöhung der Körper-/Passformtoleranzen. Separater tatsächlicher Unterarmtest verlangt weiterhin Frontalpha <32 und Körperalpha >240, aktuell an allen acht Stellen 0/253. Bildvergleich gegen die neuen kanonischen Quellen bleibt eigenständig begrenzt.

ART-12 für das Zwei-Formen-Startset im Atelier behoben: Artbook-Stirnband focus-1 semantisch belegt, drei transparente Tiefenmodule mit eigener Referenz und Registrierung. Legacytitel/-slot, Voraussetzungen und Besitz unverändert. Sechs Artikel bleiben gemeinsam auswählbar, Haare unabhängig; 262 Regressionen/26 Atelier-Gruppen erfolgreich. Belege verification-headwear-depth-v09.json. Weitere 89 Artikel und App-/Datenintegration offen.

ART-13 im Atelier behoben: Die neue optionale Referenz blieb nach Öffnen außerhalb des Sichtbereichs browserseitig lazy. Explizit geöffnete Referenz fordert jetzt eager an, meldet Ladefehler und lässt sich erneut öffnen. Einmalige Anforderung ohne Bundle im Browser geprüft.


## Abschluss Etappe 2: Fokus-Stirnband und Haarüberlagerung

Etappe 2 für das Startset technisch abgeschlossen. Kopfteil-/Haartiefen auf beiden Standfiguren gesichtet; alle acht Haarzustände erhalten drei Kopfmodule und sechs Artikelauswahlen. Beschädigte Kopfteilgrafik führt zu keiner Teilfigur. 262 Regressionen, App-Chromium und 26 Atelier-Prüfgruppen erfolgreich für 633e50984f581db846495e011b7766a29d6fb70c ([Lauf 41555922134](https://github.com/Rowlandolo/KONPASU/actions/runs/41555922134)). Vollbeleg samt archivierten Aufnahmen: design/avatar/verification-headwear-depth-v09.json. Weitere 89 Artikel, App-/Outfitintegration und physische Geräte-/Offlineabnahme bleiben offen. Live-App und Daten unverändert.

## Abschluss: alle übrigen 89 Artikel als Vektor-Passformprototypen

Nutzerauftrag vom 03.11.2026 vor Etappe 3 abgearbeitet: alle 95 Artbook-Abbildungen auf fünf Originaltafeln einzeln zugeordnet, stabile IDs und Legacy-Voraussetzungen erhalten. 89 neue Vektorstudien mit 134 eigenen transparenten SVG-Modulen ergänzen die sechs bisherigen PNG-Prototypartikel. Beide Standfiguren, unabhängige Auswahl/Sichtbarkeit/Reihenfolge und echte Frontstoffmasken im separaten `design/avatar/catalog.html`. Es handelt sich um Passform-/Funktionsprototypen; die 89 Premiumzeichnungen bleiben ein eigener Arbeitsschritt.

280 Regressionen, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 13 zusätzliche Katalog-Browsergruppen erfolgreich für c4dcdff69d4c2536f2e11c1993dd7cbd7c46a9ca: [Kataloglauf](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939844), [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41591939822). Alle 4.465 Paare auf beiden Körpern im reinen Planer; 190 tatsächliche Einzelrenderings mit sichtbarer Pixeländerung (Minimum A 48 / B 61 Pixel bei 256×384). Alle 95 gemeinsam als Stressauswahl erhalten; keine Behauptung aller Paarungen als visuell abgenommen. Tatsächliche Außenstoffmasken verändern 563 Bildpixel und erhalten die Artikelgruppen.

19 Familienvergleichsbilder mit Originaltafelbereichen und beiden Figuren sowie Mischoutfits, 95er-Stressfigur, mobile Ansicht und Detailvergleich gesichtet und unverändert unter `design/avatar/review-catalog-v10/` archiviert. Verschobene bestehende Karten besonders bei Sozial/Natur erkannt: neuer Vergleich nutzt explizite Viewports der bytegleichen Gesamttafel, mit tatsächlicher Pixelprüfung der Begrenzung. Legacykarten bleiben unangetastet. Koordinatenrundung beseitigt Node-/Chromium-Hashabweichungen bei Perlen/Fächern. Gewandmotive, Bandführung und sichtbarere Aurasockel nach Sichtprüfung verfeinert.

Keine Live-, Daten-, Schema-, Besitz-, Rewardregel- oder Service-Workeränderung. Reales Gerät, PWA-Kaltstart/Upgrade, Mimikgrafiken, Griffposen, endgültige Schuhpassform und Premiumzeichnung bleiben offen. Vollbeleg und Grenzen: `design/avatar/verification-catalog-v10.json`; Lesefassung und Bedienung: `ARTBOOK_PROTOTYPE_REVIEW.md`; je Artikel vollständige Quelle, Module und beide Registrierungen: `ARTBOOK_95_PROTOTYPES.md`. Abschlusscommit enthält ausschließlich Dokumentation und Prüfbelege.

ART-14: bestehende abgeleitete Artikelkarten zeigen teilweise Nachbarartikel/verschobene Ausschnitte, nach tatsächlichem Originalvergleich besonders bei Sozial/Natur. Im neuen Katalog durch ausdrücklich registrierte, geclippte Originaltafel-Viewports umgangen und SHA-/Pixel-geprüft. Bestehendes Live-Bundle nicht verändert; dortige Kartenkorrektur gehört zur geprüften Appintegration. Originalnamen und stabile IDs nicht verwechseln.

ART-15 im Katalog behoben: Math.sin/Math.cos kann letzte Binärstellen zwischen Node und Chromium unterschiedlich liefern. Numerische SVG-Attribute auf sechs Dezimalstellen kanonisiert; Regression und tatsächliche Browser-Hashprüfung erfolgreich. Keine pauschale Abschaltung der Integritätsprüfung.

ART-16 offen: 89 Studien verwenden bewusst Vektorgrafik statt finaler Premiumzeichnung. Zwei Mimiksets sind separate Studien neben dem Kopf; keine fertigen Gesichtslayer. Handobjekte hängen am Obi, neue Griffposen fehlen. Passformen sind Studien für zwei Körper/eine Pose; insbesondere Schuhsohle/-spitze und Maskierung der Grundschuhe benötigen Verfeinerung. Das ist keine Produktionsfreigabe dieser Grafiken.

ART-17 offen: 95er-Kombination enthält 4.550 SVG-Knoten im CI-Lauf. Skriptmedian 1.9 ms / p95 3.6 ms ohne Paint sind keine Telefon-/GPU-/Spitzenspeicherzusage. Unveränderte 47.84-MiB-Quellbildrechnung betrifft das PNG-Startset, nicht alle zusätzlichen Vektor-Rastercaches. Reale Messung vor Produktintegration.

## Abschluss Etappe 3.1: verlustfreier Outfit-Leseadapter

`avatar-outfit-v25.js` projiziert aktuelle Auswahl, Favoriten und historische Schnappschüsse ohne Schreibzugriff. Parallele Legacy-/Slotwerte, ruhende/unbekannte Einträge, eigene Ziel-IDs und beide Begleiterfelder bleiben mit ihrer Herkunft erhalten. Artikelidentität und Grafikschlüssel sind getrennt; Besitz/Tragbarkeit und tatsächliche Altauflösung stammen aus den bestehenden APIs. Leere Favoriten bleiben leer. Ohne historische Quelle entsteht eine neutrale blockierte Ansicht statt einer erfundenen heutigen Vergangenheit.

303 Regressionen einschließlich 23 neuer Adapterfälle, bestehende App-/Atelier-Chromiumprüfung (26 Gruppen) und 12 neue Browsergruppen erfolgreich für **1d50304da6b818cf1181cb79fda02072755e8143**: [Regression und bestehender Browser](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680366), [synthetische Outfitprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680286). Acht UI-Fälle, exakte Quelltreue, 390-px-Layout, Textsicherheit, sichtbare Fehler und bedienbare bereits geladene Offlineansicht geprüft. Kein localStorage-/IndexedDB-Eintrag, keine Browserfehler. Sechs tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-contract-v01/` archiviert; Vollbeleg `design/avatar/verification-outfit-contract-v01.json`.

Entwurfs-PR [#5](https://github.com/Rowlandolo/KONPASU/pull/5) baut auf #4 auf. Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Die synthetischen VM-Fälle verwenden kontrollierte Wochen-/Tierwerte; sie sind keine vollständige Reward-/Kalender- oder Geräteabnahme. Etappe 3 insgesamt ist weiterhin offen. Als Nächstes folgt ein geordneter Mehrfachentwurf mit eigenen Artikelinstanzen, Sichtbarkeit, Reihenfolge und Undo ausschließlich im Sitzungsspeicher. Persistenz, Import/Export/Rollback und Appintegration folgen mit eigenem Prüfvertrag. Details: AVATAR_OUTFIT_CONTRACT.md.

OUTFIT-01 offen in der Live-App: `showProfileForDate` verwendet ohne früheren Schnappschuss noch das heutige Profil. Der neue reine Adapter blockiert diesen Fall neutral; die Livefunktion wurde nicht verändert. Spätere Integration muss historischen Leerzustand samt Regression ausdrücklich übernehmen.

OUTFIT-02 Formatgrenze: alte Favoriten besitzen keine vollständige historische Haar-/Mimik-/Effekt-/Zielfamilienkopie. Adapter erhält Originalfavorit und Basisprofil getrennt; fehlende damalige Werte lassen sich nicht zuverlässig rekonstruieren. Keine nachträgliche Erfindung oder stille Migration.

OUTFIT-03 im neuen Inspektor behoben: dreispaltige Statuskarten ließen bei 390 px die lange Quellprüfung überstehen. Mobile Zweispaltenansicht mit eigener voller Zeile sowie horizontal begrenzten lesbaren Tabellen; tatsächlicher Chromiumbeleg und Sichtprüfung vorhanden.

## Abschluss Etappe 3.2: Mehrfachoutfit im Sitzungsspeicher

Eigene Werkstatt `design/avatar/outfit-draft.html` und reiner Editor `avatar-outfit-draft-v25.js` in Entwurfs-PR [#6](https://github.com/Rowlandolo/KONPASU/pull/6), aufbauend auf #5. Artikel unabhängig hinzufügen, ausblenden, sortieren und entfernen; Undo/Redo für alle Aktionen einschließlich Körperform und Reset. Stabile Instanzen erhalten eigene Ziel-IDs bei geteilter Grafik. Start nur mit tatsächlicher Altauflösung; vollständige Originalquelle unverändert. Jedes synthetische Beispiel behält seinen Entwurf während der geöffneten Seite; Neuladen verwirft ihn sichtbar angekündigt. Kein sessionStorage, localStorage oder IndexedDB-Zugriff.

**324 Regressionen (21 neu), bestehende App-/Atelierprüfung mit 26 Gruppen und 16 neue Chromiumgruppen erfolgreich** für `7b90e8a535e52d64b8f2767ef2954f1526b591e2`: [bestehende Prüfungen](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823151), [Entwurfsprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41608823134). Tatsächliche UI-Undo/Redo-Kette, geteilte PNG-Grafik mit eindeutigen SVG-IDs, veränderte gleich tiefe SVG-Reihenfolge, 95er-Kombination mit 134 Vektor-/12 PNG-Modulen, DE/EN, 320/390/430 px, 44-px-Ziele, Warm-Offlinebetrieb und Fehlerfälle bestanden. Drei echte Browserbilder gesichtet und unverändert unter `design/avatar/review-outfit-draft-v01/` archiviert. Vollbeleg `design/avatar/verification-outfit-draft-v01.json`; Vertrag und Grenzen AVATAR_SESSION_DRAFT.md.

Keine Live-, Profil-, Schema-, Rewardregel- oder Cacheänderung. Historische Personalisierung, Szenen und gesonderter Legacy-Begleiter bleiben im Original erhalten; ihre Rendererübernahme ist noch offen. Prototypgrafiken, physisches Gerät und kaltes PWA-Upgrade bleiben eigene Gates. Als Nächstes Etappe 3.3: expliziter additiver Speicher-/Import-/Export-/Rollbackvertrag mit Datenvergleich und bestehendem Revisions-/Konfliktschutz. Noch keine dauerhafte Speicherung oder neue Figur in der Live-App.

OUTFIT-04 im neuen Editor behoben: eine Zuweisung an `SVGElement.hidden` versteckte die SVG-Vorschau bei fehlender Historie nicht zuverlässig. Explizites `hidden`-Attribut und tatsächliche Browserprüfung für fehlende Historie/ungültigen Favoriten; blockierte Quellen zeigen keine Ersatzfigur. Live-App unverändert.

OUTFIT-05 im Editor behoben: Sticky-Vorschau konnte beim Scrollen die Sammlung überlagern; normale Positionierung plus Browser-Grenzprüfung. Identische Standardartikel aus Quelle/Katalog erscheinen nur einmal. Mobile Sammlung zeigt bis 600 px ganze Karten, damit Namen lesbar bleiben.

OUTFIT-06 offen: neue Entwürfe sind ausdrücklich flüchtig und noch nicht auf echte Profile anwendbar. Speicherung, Backups und Offline-Neustart benötigen Etappe 3.3; die Entwicklungswerkstatt ist keine neue Datensicherung.

## Abschluss Etappe 3.3: dauerhafter Outfitvertrag mit Rückweg

Entwurfs-PR [#7](https://github.com/Rowlandolo/KONPASU/pull/7) auf #6 ergänzt `profile.outfit25` ausschließlich nach ausdrücklichem Speichern sowie genau einen dauerhaften Rücknahmeeintrag `outfitRecovery25`. Reine Kandidatenprüfung und struktureller Datenvergleich in `avatar-outfit-persistence-v25.js`; Anbindung an dieselbe Speicherqueue, IndexedDB-Revision und Fallback-Web-Lock in `avatar-outfit-store-v25.js`. Alte Ausrüstung, Favoriten/History, Ziele/Trainings und unbekannte Daten bleiben erhalten. Frischer Besitz-/Tragbarkeitsnachweis; ruhende/unbekannte gespeicherte Wünsche bleiben erhalten, ohne als tragbar zu gelten. Rücknahme nach Neuladen ändert nur Outfitfelder und erhält spätere andere Einträge. Noch Backend/API, keine produktive Verbindung der neuen Editor-/Rendereroberfläche.

**350 Regressionen (26 neu), bestehende App-/26 Ateliergruppen, 16 bestehende Editorgruppen und 13 neue Speicher-Browsergruppen erfolgreich** für `b6e0d96c0d331360ab77a4a15e0ada309af9bfcb`: [Basis/App](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181636), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181657), [echte Speicherprüfung](https://github.com/Rowlandolo/KONPASU/actions/runs/41619181638). Reale IndexedDB, Startup/Reload, vorhandene JSON-Backup-/Import-UI, frische Offline-Seite mit tatsächlichem Worker, konkurrierende Tabs, Queueüberlagerung, Rücknahme nach späteren Daten und erzwungener Put-Fehler geprüft. Browser-Evidenz über echte Reward-/Kalenderfunktionen mit expliziten Wochenmesswerten; keine Tier-/Evidenzstubs. Der synthetische Screenshot ist eine ausschließlich vom Test erzeugte Ergebniskarte, kein neues produktives Bedienelement. Belege unter `design/avatar/review-outfit-storage-v01/`, Vollbeleg `design/avatar/verification-outfit-storage-v01.json`.

Kandidat **2.4.1-preview.1** hat einen getrennten Cache `konpasu-offline-v241-outfit-preview1` und precacht alle vier neuen Laufzeitabhängigkeiten kritisch. Dieser Entwicklungsstand ist nicht veröffentlicht; main/Pages und persönliche Daten wurden nicht geändert. Nächster Abschnitt 3.4: Editorbedienung mit Speichern/Rücknahme und klaren Konfliktzuständen an die API anbinden, neuen Renderer samt Personalisierung/Szenen/Begleiter und Legacy-Rückweg integrieren. Physisches iPhone, VoiceOver und Alt-PWA-Upgrade bleiben eigenständige Abnahmen. Details: AVATAR_OUTFIT_PERSISTENCE.md.

OUTFIT-07 im Entwicklungsbackend behoben: Ein gewöhnlicher vorab kopierter Speichersnapshot konnte neue Outfitfelder nach der Outfittransaktion wieder entfernen oder rückgenommene wieder einführen. Gemeinsame Queue und gezieltes Rebase ausschließlich dieser zwei Felder; tatsächliche IndexedDB- und Fallbacktests. Andere Snapshotdaten bleiben erhalten.

OUTFIT-08 im Kandidaten behoben: `ObjectStore.put` konnte im onsuccess-Callback des bestehenden Schreibpfads synchron werfen, ohne kontrolliert zur Promise-/Transaktionsbehandlung zu gelangen. Fehler abfangen, Transaktion abbrechen, Memoryfelder zurücksetzen und bestehenden Schreibschutz verwenden; echter Browser-Put-Fehlertest ohne Datenverlust/ungefangenen Fehler.

OUTFIT-09 Versionsgrenze: unbekannte spätere Outfit-/Recoveryformate werden erhalten und nicht herunterkonvertiert. Auch ein bekanntes Receipt mit unbekanntem Ziel-Outfit darf keinen Rollback auslösen. Produktive Editor-/Renderer-Anbindung, bekannte Live-Historiefallbackfrage und Synchronisierung mit späteren Legacy-UI-Aktionen bleiben offen.

OUTFIT-06 Fortschritt: der Backendteil ist mit Etappe 3.3 erledigt und real gespeichert/geprüft. Die separate Werkstatt aus 3.2 bleibt absichtlich flüchtig; ihre produktive Speichern-/Konflikt-/Rücknahmebedienung folgt in 3.4.

## Abschluss Etappe 3.4.1: sichtbarer Editor mit Speichern, Konflikt und Rücknahme

Entwurfs-PR [#8](https://github.com/Rowlandolo/KONPASU/pull/8) auf #7 ergänzt den tatsächlichen Einstieg **Avatar → Outfits → Mehrfachoutfit bearbeiten**. Native Dialogbedienung mit Artbook-Anprobe, Artikelwahl/Suche, unabhängiger Sichtbarkeit/Reihenfolge, Körperform, Undo/Redo/Reset und ausdrücklichem Speichern. Separate dauerhafte Rücknahme ist bei ungespeicherten Entwurfsänderungen gesperrt. Schließen behält den Entwurf in der laufenden App. Vorhandene Ausrüstung, Favoriten, History, Ziele/Trainings und übrige Daten bleiben erhalten.

Konflikt zeigt klare Meldung, sperrt Speichern und erhält den Entwurf. „Neueste Daten laden · Entwurf behalten“ liest und validiert denselben Speicher, prüft lokale Appänderungen vor/nach dem Lesen und rebasiert nur auf ausdrückliche Aktion. Ungespeicherte andere Einträge werden nicht überschrieben; vorhandener JSON-Export ist erreichbar. Geprüfter Memory-Ausgangsstand nach Startup/Schreibabschluss, typisierter Konflikthinweis und erwartetes Recovery-Token ergänzen den vorhandenen Schutz. Keine automatische Wiederholung fehlgeschlagener Writes.

**366 Regressionen (16 neu), 12 neue UI-Browsergruppen, 13 bestehende Speichergruppen und bisherige App-/26 Ateliergruppen erfolgreich** für `cb18dd1142783b34331eed1d9566448f79c9c056`: [App/Tests](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795811), [sichtbare UI](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795808), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795918). Echter Offline-Neustart mit Anprobe, Speichern/Neuladen/Rücknahme, tatsächlicher Zweitab-Konflikt und behaltener Entwurf, lokale Fremdänderungen, JSON-Sicherung, DE/EN, 320/390/430 px, Touch/Fokus, Textsicherheit und Integritäts-Retry geprüft. 24 Liefer-WebPs reproduziert: [Build](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795888). Drei tatsächliche UI-Bilder gesichtet und unverändert archiviert; Bericht/Vollbeleg unter `design/avatar/review-outfit-editor-v01/` und `design/avatar/verification-outfit-editor-v01.json`.

Kandidat **2.4.1-preview.2** mit getrenntem Cache `konpasu-offline-v241-outfit-preview2`; alle benötigten Vorschauverträge/Skripte/24 WebPs sind kritisch precached. Keine Original-Artbooktafeln oder einzelnen 134 SVG-Dateien dafür geladen. Kein Main-Merge/Deployment und kein Zugriff auf private Browserprofile. **3.4 insgesamt bleibt offen:** Hauptavatarroute samt Personalisierung/Szenen/Begleiter, Favoriten/History und Synchronisierung mit Legacyaktionen ist der nächste Integrationsabschnitt 3.4.2. Die neue Standfigur wird in diesem Schritt ausdrücklich als Editor-Anprobe angezeigt, die bisherige Hauptdarstellung bleibt aktiv. Physische Geräte-/GPU-/VoiceOver-/Alt-PWA-Abnahme und finale Grafik bleiben offen. Vertrag: AVATAR_OUTFIT_EDITOR.md.

OUTFIT-06 UI-Fortschritt: Einstieg, Speichern, Konfliktanzeige, behaltener Entwurf und dauerhafte Rücknahme sind nun mit 3.4.1 verbunden. Das separate synthetische Atelier bleibt unverändert flüchtig. Hauptavatar-/Legacy-Aktionsintegration folgt separat.

OUTFIT-10 im Kandidaten behoben: Ein Konflikt durfte keinen blinden Reload auslösen oder andere ungespeicherte Appdaten ersetzen. Neue Refresh-Operation prüft unabhängigen Memory-Ausgangsstand vor und nach dem Lesen; erhält Entwurf und bietet vorhandenen JSON-Export. Leeres Lazy-Default dailyGoalChecks wird neutral behandelt, echte Tagesnachweise bleiben geschützt.

OUTFIT-11 UI behoben: Speichern/Rücknahme lagen nach langer Vorschau unterhalb der ersten Ansicht. Explizite Aktionen oben und beim Scrollen erreichbar; lange Zielnamen/niedrige Breiten enthalten, tatsächliche Screenshots gesichtet.

OUTFIT-12 offen: aktuelle Grafik im neuen Dialog ist eine ausdrücklich gekennzeichnete Artbook-Anprobe. Hauptavatar, Home, Szenen, Begleiter, persönliche Darstellung, vollständige History/Favoriten und Verhalten späterer alter Equipaktionen müssen noch durch dieselbe neue Auswahlbasis laufen. Keine Behauptung einer abgeschlossenen neuen Rendererroute.


## Etappe 3.4.2: Hauptavatar und verbleibende Grenzen

OUTFIT-12 im Kandidaten behoben: gespeicherte Mehrfachauswahl war im Hauptavatar unsichtbar. Der persönliche SVG-Renderer zeigt nun alle frisch tragbaren Instanzen, auch bei gleichem Slot/Grafikmotiv; Home verwendet dieselbe Projektion. Favoriten/Inventar/Gesamtausrüstung sind abgestimmt, ruhende Auswahl bleibt erhalten. Alte Favoriten erben keinen heutigen Mehrfachlook. Nicht unterstützte künftige Formate dürfen auch über Favoriten nicht überschrieben werden.

OUTFIT-13 im Kandidaten behoben: schneller Startup/Reload konnte Home vor dem Deferred-Avatarmodul rendern und beim Ersatzbild bleiben. Init wartet bei fehlendem Avatar während `loading`/`interactive` auf DOMContentLoaded. Historische Ansichten wählen einen damaligen Profilschnappschuss; fehlende historische Quellen übernehmen nicht die heutige Personalisierung.

OUTFIT-14 offen: Artbook-Standfiguren besitzen keine vollständigen persönlichen Haar-/Mimik-/Körpervarianten. Hauptavatar verwendet daher vorhandene personalisierbare SVGs, Artbook-Grafiken bleiben Editor-Anprobe. A/B-Metadaten werden nicht als neue persönliche Hauptkörper behauptet. Automatische lückenlose Historyeinträge pro Editor-Save fehlen weiterhin; bestehende Schnappschüsse mit Mehrfachlook sind lesbar. Historische Zielkonfiguration, tatsächliches iPhone/VoiceOver/Alt-PWA-Upgrade und finale Premiumzeichnung bleiben offen. Details: AVATAR_MAIN_OUTFITS.md.


OUTFIT-15 im Kandidaten behoben: allgemeines `.home-character-tile span` färbte neue Ausrüstungsebenen deckend grün; Caption auf direktes Kind begrenzt. Ein Hinweis im Flex-Zeilenlayout quetschte den Fallbackavatar; Szene stapelt nun Figur und Hinweis vertikal. Tatsächliche Screenshot-Sichtung führte zu Browserprüfungen für transparente Ebenen, erhaltene Avatarbreite und Hinweisposition.


**388 Regressionen (22 neu), 12 neue Hauptavatar-Browsergruppen, 12 bestehende Editorgruppen, 13 Speichergruppen sowie 10 App-/26 Ateliergruppen erfolgreich** für `d4d2948033ca6e102c2928b398ca0055023e9bb5`: [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771908), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771935), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41629772026), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771846). Vier tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-main-avatar-v01/` archiviert; vollständiger Beleg `design/avatar/verification-main-avatar-v01.json`. Nur synthetische Daten, kein privates Browserprofil, kein Deployment. Der nachfolgende Archivcommit enthält ausschließlich Dokumentation und Belege.

OUTFIT-12 ist für den vorhandenen persönlichen SVG-Hauptavatar behoben. Die neue Artbook-Hauptdarstellung und automatische vollständige Historisierung bleiben unter OUTFIT-14 offen; kein Versprechen einer umfassenden historischen oder physischen Geräteabnahme.


## Persönliche Artbook-Studie 3.4.3a

OUTFIT-14 teilweise bearbeitet: drei neue Mimikzeichnungen und drei Frisuren mit Vorder-/Hinterhaar sind auf beiden bestehenden Formen registriert und im Editor anprobierbar. Die Hauptdarstellung verwendet weiterhin persönliche SVGs. Vollständige Körper-/Gesichts-/Hautbandbreite, finale Farbpaletten und automatische Historisierung bleiben offen.

PERSONAL-01 im Kandidaten behoben: Gesicht war fest im Body eingezeichnet, sodass neue Mimik sonst über alten Augen/Mund läge. Im persönlichen Modus wird die alte Kopfregion oberhalb der Kragengrenze y=110 ausgespart und durch einen vollständigen registrierten Kopf ersetzt. Originalgrafiken bleiben unverändert; der Rückweg stellt sie wieder her.

PERSONAL-02 im Kandidaten behoben: neue Einschaltfläche hatte zunächst nur 24px statt geforderter 44px Höhe. Reale Touchprüfung erkannte dies; 44px hergestellt und bestehende Editorprüfung erneut erfolgreich.

PERSONAL-03 offen: Farbfilter sind Studien, keine final handgemalten Gewandpaletten. Persönliche Varianten bleiben bewusst lokale Anprobe; bestätigte dauerhafte Übernahme und Artbook-Hauptdarstellung benötigen eigenen Datenvergleich/Rückweg. Die 95er-Komposition und feste Anker sind keine Premium-Freigabe aller visuellen Überdeckungen.

**402 Regressionen (14 neu), 11 neue persönliche Browsergruppen, 12 Hauptavatar-, 12 Editor-, 13 Speicher- sowie 10 App-/26 Ateliergruppen erfolgreich** für `dedbfedb4dbd6eb96f51a3d12b977f4fcfbc6a4a`: [Varianten/Passform](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882331), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882613), [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882357), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882476), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41633882422). Fünf tatsächlich im Browser erzeugte Bilder gesichtet und unverändert unter `design/avatar/review-personal-variants-v11/` archiviert; Vollbeleg `design/avatar/verification-personal-variants-v11.json`. Nur synthetische Daten, kein privates Browserprofil, kein Main-Merge/Deployment. Der folgende Archivcommit enthält ausschließlich Dokumentation und Belege.


## Aktueller Nachtrag 3.4.3b: Speicherung und neue Hauptansicht

PERSONAL-03 teilweise erledigt: bestätigtes Speichern und Artbook-Hauptansicht mit eigenem Feldvergleich/Rückweg sind in PR #11 implementiert und geprüft. Farbfilter bleiben Studien, vollständige Körper-/Gesichts-/Hautbandbreite und endgültige Premiumzeichnung sind offen. Frühere Aussagen zur ausschließlich flüchtigen persönlichen Anprobe beziehen sich auf 3.4.3a.

PERSONAL-04 im Kandidaten behoben: vollständige Übernahme normalisierter Anproben könnte unberührte unbekannte Profilwerte überschreiben. Save überträgt nur tatsächlich geänderte bekannte Werte. Vollständiger Profilquellen-/Diskvergleich, opake künftige Formate und eigenes erwartetes Recovery-Token schützen Übernahme/Rücknahme; Dreiwegevergleich hält konkurrierende gleiche Felder bis zur ausdrücklichen Auswahl gesperrt. Echte Zweitab- und Put-Fehlerprüfung grün, spätere Notizen/Trainings bleiben erhalten.

MAIN-01 im Kandidaten behoben: globale `.avatar-scene svg`-Regeln setzten verschachtelte Spritefenster auf feste Breite und `overflow:visible`; auf Home erschien der ganze Atlas. Alle drei Regeln auf direktes Haupt-SVG begrenzt. Tatsächliche Browserprüfung kontrolliert jede Clipbreite/overflow und archiviertes Home-Bild.

MAIN-02 im Kandidaten behoben: 480×600-Szenenbild im 512×768-Hauptviewport ließ waagerechte Lücken, große Maßvarianten konnten Füße abschneiden. Eigenes verschachteltes Szenen-SVG füllt per slice; gemeinsame begrenzte Figurtransformation verankert Fußboden bei y=690. Vier tatsächliche Eckpixel Alpha 255, maximale bekannte Figurenbounds, 320/390/430px und echte Studio-/Homebilder geprüft. Keine Behauptung universeller Premium-Passform.

OUTFIT-14 weiterhin teilweise offen: neue Standfigur mit persönlichen Varianten, Szenen, Begleitern, unabhängiger Artikelauswahl und SVG-Rückweg funktioniert als ausdrücklich gewählte Hauptansicht. Automatische vollständige Historien-Schnappschüsse bei jeder neuen API-Aktion fehlen noch (nächster Abschnitt 3.4.4); vorhandene Snapshots sind lesbar. Historische Zielkonfiguration und reale Geräte bleiben gesonderte Grenzen.

Nachweis: 438 Regressionen, 15 neue Browsergruppen und alle bestehenden Integrationsprüfungen erfolgreich für `0f72f4713487fb014a03d637e4a3f1b4624435e9`. Fünf Originalbilder gesichtet, Belege in `design/avatar/verification-artbook-main-settings-v01.json`; Vertrag AVATAR_SAVED_APPEARANCE_MAIN.md. Nur synthetische Daten, keine Veröffentlichung.

## Abschlussnachtrag Etappe 3.4.4

OUTFIT-14 hinsichtlich automatischer Historisierung behoben: Alle erfolgreichen neuen Outfit-, persönlichen und Ansichtsaktionen einschließlich dauerhafter Rücknahmen schreiben einen vollständigen resultierenden Profilschnappschuss. Konflikte, No-op und Schreibfehler schreiben keinen. Alte unvollständige Vergangenheit wird nicht erfunden; vorhandene Legacyeinträge bleiben unverändert. Gleichzeitige fremde Historie und hinter Avatartransaktionen wartende normale Saves sind abgesichert.

HISTORY-01 im Kandidaten behoben: Historieneinträge mit gleichem Datum und identischer UTC-Speicherzeit konnten den älteren Eintrag wählen. Zeitreise sortiert bei Gleichstand nun nach Einfügereihenfolge, der zuletzt gespeicherte Zustand gewinnt. Regression vorhanden.

Technische Etappe 3 abgeschlossen für `0749e4527c6fd1a847f373af0476dc0c42f13cd6`: 445 Regressionen und sieben Browser-Workflows grün. Weiter offen sind Grafik-/Geräte-/Gesamtproduktpunkte, insbesondere 89 finale Premiumzeichnungen, vollständige persönliche Körper-/Gesichts-/Hautbandbreite sowie echtes iPhone, VoiceOver, GPU-Spitzen und Upgrade einer alten installierten PWA. Diese Punkte sind keine verdeckten Defekte des Historienvertrags.

## Etappe 4 · Stand nach Paket 4.43

Die vollständige Beweglichkeitsserie besitzt zehn hashgebundene Premiumodule und besteht gemeinsam sowie im 31-Modul-Übergangsrendering mit Cardio und Schritte auf beiden registrierten Körperformen. 74 Katalogartikel bleiben Vektorstudien. Die Abnahme gilt für die feste Standpose im Entwicklungsatelier; App-/Offlineintegration der Premiumdateien, physische Geräte, VoiceOver, GPU-/Speicherspitzen und kaltes Alt-PWA-Upgrade bleiben offen.

`water-1` besitzt nun eine hashgebundene Premium-Bambusflasche mit eigener Passform für beide registrierten Körperformen. Der 32-Modul-Übergang mit Cardio, Schritte und Beweglichkeit besteht, 73 Katalogartikel bleiben Vektorstudien. Offen bleiben universelle Posen und Kombinationen, App-/Kalt-Offlineintegration, physische Geräte, VoiceOver sowie GPU-/Speicherspitzen; die Atelierabnahme ist keine Produktionsfreigabe.

`water-2` ergänzt eine getrennte Premium-Lackflasche. Beide Wasserartikel bleiben im gemeinsamen Rendering sichtbar; der Übergang mit Cardio, Schritte und Beweglichkeit besteht als 33 Module auf beiden registrierten Körperformen. 72 Artikel bleiben Vektorstudien. Universelle Posen und Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`water-3` ergänzt eine getrennte Premium-Kristallfeldflasche. Die ersten drei Wasserartikel bleiben gemeinsam sichtbar; der Übergang mit Cardio, Schritte und Beweglichkeit besteht als 34 Module auf beiden registrierten Körperformen. 71 Artikel bleiben Vektorstudien. Universelle Posen und Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`water-4` ergänzt eine getrennte zeremonielle Premium-Wasserkalebasse. Die ersten vier Wasserartikel bleiben gemeinsam vollständig sichtbar; der Übergang mit Cardio, Schritte und Beweglichkeit besteht als 35 Module auf beiden registrierten Körperformen. 70 Artikel bleiben Vektorstudien. Universelle Posen und Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

Die vollständige Wasser-Serie besitzt sechs hashgebundene Premiummodule und besteht gemeinsam sowie im 37-Modul-Übergangsrendering mit Cardio, Schritte und Beweglichkeit auf beiden registrierten Körperformen. 69 Katalogartikel bleiben Vektorstudien. Die Abnahme gilt für die feste Standpose im Entwicklungsatelier; universelle Kombinationen, App-/Kalt-Offlineintegration, physische Geräte, VoiceOver sowie GPU-/Speicherspitzen bleiben offen.

`sleep-1` besitzt zwei hashgebundene Premiumebenen für Stifte und sichtbaren Mond-/Blütenschmuck. Die seitliche Passform hält das Gesicht auf beiden registrierten Körperformen frei; der 39-Modul-Übergang mit Cardio, Schritte, Beweglichkeit und Wasser besteht. 68 Artikel bleiben Vektorstudien. Weitere Frisuren, Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`sleep-2` ergänzt ein hashgebundenes Premium-Kissenmodul. Die Tragekordel sitzt auf beiden registrierten Körperformen an der rechten Hand; Mond-Haarnadel und Traumkissen bleiben gemeinsam als drei Module sichtbar und bestehen den 40-Modul-Übergang mit Cardio, Schritte, Beweglichkeit und Wasser. 67 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`sleep-3` ergänzt getrennte hashgebundene Vorder-/Rückebenen für den Nacht-Haori. Die offene Mitte erhält Gesicht, Kimono, Obi, Hände und Hakama; nur tatsächlicher Vorderstoff maskiert Armartikel. Die ersten drei Schlafartikel bleiben gemeinsam als fünf Module sichtbar und bestehen den 42-Modul-Übergang mit Cardio, Schritte, Beweglichkeit und Wasser. 66 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`sleep-4` ergänzt ein hashgebundenes Premium-Laternenmodul. Die erste Registrierung wirkte am Haori-Ärmel befestigt und wurde vor Abnahme an die rechte Obi-Kante verschoben. Laterne, Traumkissen und weitere Hüftartikel bleiben auf beiden Körperformen getrennt lesbar; die ersten vier Schlafartikel bestehen als sechs Module und den 43-Modul-Übergang. 65 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

Die vollständige Schlaf-Serie besitzt sieben hashgebundene Premiummodule. Die Mondruhe-Aura rahmt die persönliche Figur mit Vollmond, offenem Nachthimmel, Wolken und Blüten; die fremde Meditationssilhouette der Kartenillustration ist bewusst ausgeschlossen. Alle fünf Schlafartikel bestehen gemeinsam sowie im 44-Modul-Übergang mit Cardio, Schritte, Beweglichkeit und Wasser auf beiden registrierten Körperformen. 64 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration, physische Geräte, VoiceOver sowie GPU-/Speicherspitzen bleiben offen.

`nutrition-1` ergänzt ein hashgebundenes Premium-Bentomodul. Die Schlaufe sitzt auf beiden registrierten Körperformen an der linken Obi-Kante; Hände bleiben neutral und das Bento bleibt neben bestehenden Flaschen und Hüftartikeln lesbar. Der 45-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser und Schlaf besteht. 63 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`nutrition-2` ergänzt ein hashgebundenes Premium-Kräuterbeutelmodul. Der Beutel sitzt auf beiden registrierten Körperformen links außen neben dem Bento; Hand, Obi und beide Ernährungsartikel bleiben getrennt lesbar. Der 46-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser und Schlaf besteht. 62 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`nutrition-3` ergänzt zwei hashgebundene Premiumebenen für Gürtel und vorderen Blütenknoten. Die Taille schließt auf beiden registrierten Körperformen; Kräuterbeutel und Bento bleiben gleichzeitig sichtbar. Die ersten drei Ernährungsartikel bestehen als vier Module und im 48-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser und Schlaf. 61 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`nutrition-4` ergänzt drei hashgebundene Premiumebenen für Rückengewand, Vordergewand und Kochschürze. Der zunächst zu hohe Kragen wurde vor Abnahme entfernt; die tiefe Öffnung hält Gesicht, Hals und Körpermitte auf beiden registrierten Körperformen frei. Die ersten vier Ernährungsartikel bestehen als sieben Module und im 51-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser und Schlaf. 60 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

Die vollständige Ernährungsserie besitzt zehn hashgebundene Premiummodule. Reisährenemblem, tragbare Reisschale und Kürbisanhänger bleiben getrennt; das vor Abnahme versetzte Emblem ist hinter der rechten Schulter auf beiden registrierten Körperformen sichtbar. Alle fünf Ernährungsartikel bestehen gemeinsam sowie im 54-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser und Schlaf. 59 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration, physische Geräte, VoiceOver sowie GPU-/Speicherspitzen bleiben offen.

`sugar-1` ergänzt ein hashgebundenes Premium-Omamorimodul. Die erste Registrierung wirkte vom Outfit gelöst und wurde vor Abnahme näher an die rechte Hüftseite verschoben; Hände bleiben neutral und das Siegel bleibt neben bestehenden Accessoires lesbar. Der 55-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser, Schlaf und Ernährung besteht. 58 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`sugar-2` ergänzt ein hashgebundenes Premium-Armbandmodul aus hellen Perlen, Jadeperle, Goldknoten, Quaste und Blatt. Es folgt dem linken Handgelenk beider registrierter Körperformen; tatsächliche Ärmel- und Außenkleidungspixel verdecken es bei langen Ärmeln. Beide Zuckerbalance-Artikel bleiben unabhängig ausgewählt und bestehen den 56-Modul-Übergang. 57 Artikel bleiben Vektorstudien. Andere Posen, universelle Kombinationen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`sugar-3` ergänzt ein hashgebundenes Premium-Triptychon mit drei erwachsenen Lächelstudien. Die erste Passform lief auf Form B aus der sichtbaren Bühne; die korrigierte Registrierung zeigt alle drei Porträts auf beiden Formen vollständig neben dem Kopf. Sie ersetzt das Basisgesicht bewusst noch nicht, da vollständige kompatible Gesichtslayer für beide Figuren fehlen. Drei Zuckerbalance-Artikel bestehen den 57-Modul-Übergang. 56 Artikel bleiben Vektorstudien. Austauschbare Gesichtsanatomie, andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`sugar-4` ergänzt einen hashgebundenen Premium-Lotusfächer. Er sitzt auf beiden registrierten Körperformen am linken Obi, lässt die Hände neutral und bleibt neben den vorhandenen Hüftartikeln erkennbar. Die Befestigung behauptet keine neue Griffpose. Vier Zuckerbalance-Artikel bestehen den 58-Modul-Übergang. 55 Artikel bleiben Vektorstudien. Eine spätere Griffpose, andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

Die vollständige Zuckerbalance-Serie besitzt sechs hashgebundene Premiummodule. Die Klargeist-Aura rahmt beide registrierten Körperformen mit offenem Jade-/Wasserwirbel; das getrennte Lotus-Podest bleibt unter den Füßen sichtbar. Alle fünf Zuckerbalance-Artikel bestehen gemeinsam sowie im 60-Modul-Übergang mit Cardio, Schritte, Beweglichkeit, Wasser, Schlaf und Ernährung. 54 Artikel bleiben Vektorstudien. `sugar-3` bleibt bis zu vollständigen Gesichtslayern eine separate Mimikstudie; andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`alcohol-1` ergänzt ein hashgebundenes Premium-Kalebassenmodul. Zwei erste Registrierungen wirkten am linken Unterarm befestigt; die korrigierte Schlaufe beginnt an der linken Obi-Kante und hält Hand sowie Unterarm frei. Das textfreie gekreuzte Gefäßsymbol vermeidet erfundene Schrift und Marken. Der 61-Modul-Übergang mit sieben vollständigen Familien besteht. 53 Artikel bleiben Vektorstudien. Eine spätere Griffpose, andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`alcohol-2` ergänzt ein hashgebundenes Premium-Laternenmodul. Die erste Registrierung wirkte am rechten Unterarm befestigt; der korrigierte Ring beginnt an der rechten Obi-Kante, Laternenkörper und Quaste hängen über dem Hakama, Hand und Unterarm bleiben frei. Beide Alkoholbalance-Artikel bestehen den 62-Modul-Übergang. 52 Artikel bleiben Vektorstudien. Eine spätere Griffpose, andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.


`alcohol-3` ergänzt eine hashgebundene Premium-Dreierstudie ruhiger Gesichtsausdrücke. Sie sitzt vollständig links neben dem Kopf und bleibt von der Zucker-Mimikstudie rechts getrennt. Der Artikel ist derzeit ein separates Sammelmodul und keine austauschbare Gesichtsanatomie; persönliche Mimik und gespeicherte Profildaten bleiben unverändert. Die drei Alkoholbalance-Artikel bestehen den 63-Modul-Übergang. 51 Artikel bleiben Vektorstudien. Animierte bzw. echte Austauschmimik, andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.


`alcohol-4` ergänzt zwei hashgebundene Premium-Obimodule. Gürtel und vordere Schleife schließen die Taille auf beiden Körperformen; die Bandenden bleiben sichtbar und verändern Hände oder Gesicht nicht. Bei vollständiger 65-Modul-Kombination dürfen deckende, später sortierte Vorderaccessoires Teile der Schleife natürlich überlagern, ohne Auswahl oder Identität zu entfernen. 50 Artikel bleiben Vektorstudien. Andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.


`alcohol-5` ergänzt drei hashgebundene Premium-Hintergrundmodule für Landschaft, Torii und Laternenstraße. Der Weg und die Toröffnung halten beide Standfiguren lesbar; es gibt keine fremde Figur oder Schrift. Alle fünf Alkoholbalance-Artikel bestehen gemeinsam als acht Module und im 68-Modul-Übergang mit sieben früheren vollständigen Familien. Andere gleichzeitig gewählte Szenen und deckende Effekte dürfen sich gemäß Reihenfolge natürlich überlagern, ohne Identitäten oder Auswahl zu entfernen. 49 Artikel bleiben Vektorstudien. Andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.


`reading-1` ergänzt ein hashgebundenes Premium-Buchanhängermodul. Die Schlaufe beginnt am linken Obi; Buch und Quaste hängen frei neben dem Hakama, beide Hände bleiben neutral. Es gibt keine erfundene Schrift und keinen Anspruch auf eine neue Griffpose oder ein geöffnetes lesbares Buch. Der 69-Modul-Übergang mit acht vollständigen Familien besteht. 48 Artikel bleiben Vektorstudien. Andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.


`reading-2` ergänzt ein hashgebundenes Premium-Schriftrollenmodul ohne erfundene Schrift. Eine erste linke Registrierung überdeckte Hand und Buch-Anhänger; die korrigierte Rolle hängt rechts am Obi und hält beide Hände sowie beide Lesen-Artikel sichtbar. Die beiden Lesen-Kandidaten bestehen den 70-Modul-Übergang. 47 Artikel bleiben Vektorstudien. Eine echte Griff-/Lesepose, lesbarer Inhalt, andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.

`reading-3` ergänzt einen hashgebundenen Schultergurt und eine getrennte Gelehrtentasche mit zeichenfreien Büchern. Körperformspezifische Passformen verbinden beide Module; alle drei Lesen-Kandidaten bestehen als vier Module den 72-Modul-Übergang. 46 Artikel bleiben Vektorstudien. Natürliche Überdeckung in frei sortierten Mehrfachkombinationen, echte Griffposen, lesbarer Buchinhalt, andere Posen, App-/Kalt-Offlineintegration und physische Geräteabnahme bleiben offen.
