# Etappe 3.4.1: sichtbarer Mehrfacheditor und Speicherbedienung

Stand 03.11.2026. Entwicklung in `feature/outfit-editor-ui` auf Entwurfs-PR #7. Kein Deployment. Einstieg: Avatar → Outfits → Mehrfachoutfit bearbeiten. Vorhandene Favoriten, bisherige Avataransicht, Personalisierung, Szenen und Begleiter bleiben erhalten. Die neue Editoranprobe zeigt ausdrücklich die Atelier-Standfigur mit sechs PNG-Prototypartikeln und 89 Vektorstudien; die vollständige neue Hauptavatarroute ist ein weiterer Integrationsabschnitt.

## Bedienung

Der Editor ist ein natives Dialogfenster mit DE/EN, Tastaturfokus, Schließen/Escape, Suche, Artikelwahl und Hinzufügen. Instanzen lassen sich unabhängig ausblenden, umordnen und entfernen. Körperform, Undo/Redo und Reset bleiben flüchtig bis zur ausdrücklichen Speicherung. Schließen behält den Entwurf in der geöffneten App; Neuladen kann ungespeicherte Änderungen verlieren. Beforeunload warnt bei schmutzigem Entwurf; automatischer Worker-Neuladevorgang wartet auf dessen Sicherung.

„Outfit speichern“ verwendet ausschließlich die Speicher-API aus 3.3. Auch eine unveränderte erste Legacy-Auswahl kann ausdrücklich gespeichert werden. Ein sauberer bereits gespeicherter Look erzeugt keine weitere Schreibaktion. Speichern ist während einer laufenden Operation und bei Schreibschutz gesperrt. Erfolg wird erst nach bestätigtem Speichern gemeldet. Der Editor bekommt dann einen neuen Ausgangsstand aus dem tatsächlichen aktuellen Profil, damit eine weitere Bearbeitung nicht mit veralteter Quelle arbeitet.

Eine Anprobe erzeugt weiterhin keinen Besitz. Der Editor zeigt frische Tragbarkeit/ruhenden Besitz/unverdiente Anprobe/offene Zuordnung. Ungeeignete Auswahl bleibt bei Ablehnung erhalten und lässt sich korrigieren. „Letzte Speicherung zurücknehmen“ ist eine ausdrücklich getrennte dauerhafte Operation; sie ist bei ungespeicherten Editoränderungen gesperrt. Das angezeigte Recovery-Token wird geprüft, damit ein inzwischen ersetzter Eintrag nicht versehentlich zurückgenommen wird.

## Konflikt ohne verlorenen Entwurf

Nach Konflikt bleiben Artikel, Körperform und Reihenfolge erhalten. Speichern bleibt bis zur Klärung gesperrt. „Neueste Daten laden · Entwurf behalten“ liest denselben Appspeicher über die gemeinsame Queue und rebasiert ausschließlich den Entwurf auf die aktuelle Quelle. Keine automatische Wiederholung eines fehlgeschlagenen Schreibens.

`refresh()` prüft vor und nach dem asynchronen Lesen, dass keine anderen ungespeicherten Appänderungen vorliegen. Als Referenz dient ein unabhängiger Memory-Ausgangsstand nach Startup bzw. erfolgreichem normalen Speicherabschluss. Revision-Metadaten und das bekannte leere Lazy-Default `dailyGoalChecks: []` werden beim Vergleich neutral behandelt; tatsächliche Tagesnachweise bleiben geschützt. Bei lokalem Training/Notizen/Profiländerungen wird das Laden abgewiesen, ohne Memory oder Disk zu ersetzen. Sichtbare JSON-Sicherung nutzt den vorhandenen vollständigen App-Backupknopf. Nach regulärem Speichern anderer Appänderungen ist ein erneutes Laden möglich.

Gelesene Daten werden normal validiert und migriert, ausschließlich im Arbeitsspeicher übernommen; Refresh schreibt keine Daten und löscht keinen Speicher. Unlesbare Quellen oder künftige Formate bleiben gesperrt. Der vorhandene IndexedDB-/Fallback-Konfliktschutz bleibt maßgeblich. `conflict` ergänzt das bestehende Ergebnisobjekt, ohne dessen bisherigen Fehlercode zu ändern.

## Aufbau und Offlinepfad

`avatar-outfit-session-v25.js` hält den testbaren UI-Zustand und trennt flüchtiges Undo von dauerhafter Rücknahme. `avatar-outfit-editor-v25.js` baut die tatsächlichen Bedienelemente; persönliche Beschriftungen werden als Textknoten eingefügt. `avatar-outfit-preview-v25.js` lädt Skripte und geprüfte Grafikquellen erst beim ausdrücklichen Öffnen. Bestehende Grafikloader erhalten lediglich einen optionalen Basis-URL-Kontext; ihre bisherigen relativen Aufrufe und Hashprüfungen bleiben bestehen.

Kandidat **2.4.1-preview.2** mit eigenem Cache `konpasu-offline-v241-outfit-preview2` und Reloadmarker. Sämtliche benötigten Scripts, Verträge und 24 optimierten WebP-Liefergrafiken sind kritisch precached, damit die erste Editoröffnung nach Offline-Neustart funktioniert. Original-Artbooktafeln und 134 einzelne SVG-Dateien werden dafür nicht geladen. Neues Precache ist größer; physische Speicher-/GPU-/Leistungsbestätigung bleibt offen. Bei fehlgeschlagener Integrität/Ladung bleibt die Auswahl gespeichert; Retry lädt die Anprobe erneut, ohne Profilimport oder Datenlöschung.

## Prüfstand und nächster Abschnitt

**366 Regressionen (16 neu), 12 neue echte UI-Browsergruppen, 13 bestehende Speichergruppen, bisherige App-/26 Ateliergruppen sowie 24 reproduzierte Liefer-WebPs erfolgreich** für `cb18dd1142783b34331eed1d9566448f79c9c056`. Läufe [UI](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795808), [App/Regression](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795811), [Speicher](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795918) und [Lieferbuild](https://github.com/Rowlandolo/KONPASU/actions/runs/41623795888). Tatsächlicher Studioeinstieg, sichtbare Schaltflächen, echter Zweitab-Konflikt, Draft-Rebase, geschützte lokale Fremdänderung, JSON-Sicherung, kalte Offline-Seite mit Anprobe, DE/EN/mobile Größen und Integritäts-Retry geprüft. Drei gesichtete Original-UI-Bilder und Bericht unter `design/avatar/review-outfit-editor-v01/`; Vollbeleg `design/avatar/verification-outfit-editor-v01.json`. Der folgende Archivcommit enthält nur Dokumentation und Belege. Ausschließlich synthetische Daten auf zufälligem Loopback-Origin; kein Zugriff auf Pages oder private Browserprofile. Physische Geräte, VoiceOver und installierte alte PWA bleiben offen.

Nach diesem Abschnitt: Hauptavatarroute samt Personalisierung, Szene, Begleiter, Favoriten/History und klarer Synchronisierung mit bisherigen Legacy-Bedienelementen integrieren. Die bewusst gekennzeichnete neue Editoranprobe ersetzt diese Abnahme nicht. Finale Premiumgrafiken, reales iPhone/VoiceOver und Alt-PWA-Upgrade bleiben eigene Gates vor Veröffentlichung.
