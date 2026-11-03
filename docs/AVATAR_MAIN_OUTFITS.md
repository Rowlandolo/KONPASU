# Etappe 3.4.2: Mehrfachoutfits auf dem persönlichen Hauptavatar

Stand 03.11.2026. Kandidat **2.4.1-preview.3**, Cache `konpasu-offline-v241-outfit-preview3`, Entwicklungsbranch `feature/main-avatar-outfits` auf `feature/outfit-editor-ui`. Kein Deployment.

## Sichtbare Integration

Startseite und Avatar-Studio verwenden denselben persönlichen SVG-Renderer. Ein ausdrücklich gespeichertes bekanntes `profile.outfit25` liefert jetzt jede aktuell tragbare sichtbare Instanz. Gleicher Slot oder gleiche Grafik verdrängen keine andere gespeicherte Identität. Innerhalb derselben Tiefenebene gilt die gespeicherte Reihenfolge; zwischen Ebenen bleibt die anatomische Tiefenordnung maßgeblich. Natürliche Überdeckung bleibt möglich und löscht keine Auswahl.

Körperdarstellung, optionale Maße, Gewandfarbe, Vorder-/Hinterhaare samt Haarfarbe, Mimik, Szene, Begleiter und dessen belegte Form bleiben aus dem gewählten Profil wirksam. Effekte Aus blendet Effekt-/Auraartikel visuell aus, ohne die Auswahl zu löschen. Anprobe ergänzt eine reine Vorschau; Besitz und gespeicherter Look bleiben unverändert.

Diese Hauptansicht verwendet **die vorhandenen personalisierbaren SVG-Körper und Rewardgrafiken**. Die neuen Artbook-Standfiguren und 95 Prototypen werden weiterhin im ausdrücklich geöffneten Editor dargestellt. Ihnen fehlen vollständige persönliche Frisur-/Mimik-/Körpervarianten. Form A/B bleibt gespeicherte Editor-Metadaten; sie ersetzt nicht still die persönliche Hauptfigur. Ein fertiger neuer Premium-Artbook-Hauptavatar wird nicht behauptet.

## Schutz und bestehende Bedienwege

`avatar-outfit-display-v25.js` löst Auswahl rein lesend gegen frische Besitz-/Tragbarkeitsnachweise und die tatsächliche aktuelle Artikelzuordnung auf. Pausierte, unverdiente, unbekannte oder inzwischen anders zugeordnete Artikel bleiben roh gespeichert; sie werden nicht durch ein ähnlich benanntes Bild ersetzt. Eine erforderliche fehlende Rewardgrafik führt zur vollständigen persönlichen Basis mit Hinweis, statt zu einem unvollständigen Mehrfachlook. Unbekannte künftige Formate bleiben erhalten und zeigen die bestehende persönliche Ansicht mit Hinweis.

Das optionale bekannte v1-Feld `enabled:false` pausiert den Mehrfachlook, ohne seine Einträge oder unbekannte Metadaten zu löschen. Fehlendes Feld bedeutet aktiv. Es gibt kein Seeding und keine automatische Migration vorhandener Profile. Explizites Speichern setzt `enabled:true` und verwendet weiterhin gemeinsame Queue, Quellenvergleich, Konfliktschutz und feldbegrenzten Rückweg.

Im aktiven Mehrfachlook schaltet ein einzelner Inventar-Anlegen-Klick nur den ausdrücklich gewählten Artikel. Eine ausgeblendete Instanz wird wieder sichtbar; ein sichtbarer Artikel wird entfernt. „Leeren“, „Beste verfügbare“, alte Gesamtausrüstungswege und alte Favoriten wechseln ausdrücklich zur bisherigen Ausstattung und pausieren den erhaltenen Mehrfachlook. Der Editor kann ihn durch ausdrückliches Speichern wieder aktivieren. Eine mittlerweile veränderte Auswahl macht einen älteren Recovery-Eintrag nicht anwendbar; der Rohbeleg wird behalten.

Neue Mehrfachfavoriten kopieren ihre eigene vollständige Auswahl. Alte Favoriten erben keine aktuelle Mehrfachausrüstung in ihrer Vorschau. Beim Anwenden bleiben Begleiterfelder synchron. Der Importvalidator prüft bekannte neue Favoritenfelder und den optionalen Aktivschalter; künftige unbekannte Formate bleiben opak.

Historische Ansichten wählen nur den damals verfügbaren vollständigen Profilschnappschuss. Ohne frühere Quelle wird ein neutraler Avatar dargestellt; heutige Personalisierung/Mehrfachausrüstung sickert nicht in die Vergangenheit. Die Speicher-API legt weiterhin ausschließlich Outfit und Recovery ab, **keine zusätzlichen historischen Schnappschüsse pro Editor-Speicherung**. Vorhandene Schnappschüsse mit Mehrfachausrüstung sind lesbar; automatische lückenlose Historisierung bleibt offen. Bestehende `recordProfile`-Aktionen arbeiten unverändert.

Der Appstart wartet jetzt auf `DOMContentLoaded`, damit alle geordneten Deferred-Module einschließlich Kalender und Avatar vor dem ersten Lesen/Rendern verfügbar sind. Die echte Neuladeprüfung hatte einen vorzeitigen Home-Ersatzbildstart aufgedeckt.

## Prüfstand

**388 Regressionen (22 neu), 12 neue Hauptavatar-Browsergruppen, 12 bestehende Editorgruppen, 13 Speichergruppen sowie 10 App-/26 Ateliergruppen erfolgreich** für `d4d2948033ca6e102c2928b398ca0055023e9bb5`: [Hauptavatar](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771908), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771935), [Editor](https://github.com/Rowlandolo/KONPASU/actions/runs/41629772026), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41629771846). Vier tatsächliche Browserbilder gesichtet und unverändert unter `design/avatar/review-main-avatar-v01/` archiviert; vollständiger Beleg `design/avatar/verification-main-avatar-v01.json`. Nur synthetische Daten, kein privates Browserprofil, kein Deployment. Der nachfolgende Archivcommit enthält ausschließlich Dokumentation und Belege.

Echte Hauptavatarprüfung bedient Editor, Personalisierung, Szenen, Begleiter, Favoriten, Inventar, Reaktivierung, Zeitreise und Offline-Neustart. Frische Tiernachweise kommen aus tatsächlichen protokollierten synthetischen Zielmessungen, ohne Tier-/Rewardstubs. Screenshotprüfung führte zu zusätzlicher Absicherung der transparenten Home-Layer und der vollständigen Fallbackbreite.

Als Nächstes 3.4.3: persönliche Varianten der neuen Artbook-Standfigur samt Passform und geprüftem Umschalten, während die bisherige SVG-Hauptdarstellung als Rückweg erhalten bleibt. Physische Geräte, VoiceOver, Alt-PWA-Upgrade und finale Artbookgrafiken bleiben eigene Abnahmen.


## Fortschreibung 3.4.3a

Die persönliche Artbook-Anprobe ist jetzt ausdrücklich im Mehrfacheditor einschaltbar. Drei Frisuren/Farben, drei Mimiken und drei Gewandfarben sind als Studie geprüft. Hauptavatar/Home bleiben auf der bestehenden persönlichen SVG-Darstellung; keine automatische Umschaltung. Neue Verträge, Prüfbelege und nächster Abschnitt: AVATAR_PERSONAL_VARIANTS.md.
