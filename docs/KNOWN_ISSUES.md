# KONPASU – Fehlerregister

Stand 03.11.2026. P0 = Releaseblocker, P1 = hoch, P2 = Produktlücke. Fehlerbehebungen der Basis wurden mit 2.4.0 veröffentlicht; die neue Artbook-Avatarentwicklung bleibt separat in PR #3 und #4. Ältere Tabellenbefunde und aktuelle Nachträge unterscheiden.

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

## Etappe 3.1: reiner Outfit-Kompatibilitätsadapter in Prüfung

Adapter und synthetische Prüfseite für aktuelle Auswahl, Favoriten und historische Schnappschüsse vorbereitet. Parallele Legacy-/Slotwerte, Ersatzteile, ruhende/unbekannte Einträge, eigene Ziel-IDs und beide Begleiterfelder bleiben getrennt erhalten. Keine Liveeinbindung, Persistenz- oder Schemaänderung. 23 neue Adapterregressionen lokal erfolgreich; Gesamtprüfung 303 erfolgreich. Reale Browserabnahme steht noch aus. Datenvertrag und nächste Sitzungsschritte: AVATAR_OUTFIT_CONTRACT.md.
