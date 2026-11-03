# Etappe 3.2: Mehrfachoutfit im Sitzungsspeicher

Stand 03.11.2026. Aufbau auf dem verlustfreien Outfit-Leseadapter aus Entwurfs-PR #5. Separate Entwicklung in `feature/outfit-session-draft`. Keine Liveeinbindung oder Änderung persönlicher Daten, Rewardregeln, Profilschemas, Cacheversion oder Speicherung.

## Lieferung und Bedienung

`design/avatar/outfit-draft.html` ist eine eigenständige Werkstatt mit acht synthetischen Quellen. Keine Appinitialisierung, kein Profilimport und keine Speicherschaltfläche. Ein Beispielwechsel behält seinen jeweiligen Entwurf samt Undo-Verlauf während die Seite geöffnet bleibt. Neuladen verwirft die Entwürfe ausdrücklich; selbst sessionStorage wird nicht verwendet.

- Alle 95 Prototypartikel unabhängig ergänzen. Gleiche Artikelidentität doppelt zu ergänzen ist ein No-op; eigene Ziele mit derselben Grafik bleiben getrennte Artikel.
- Sichtbarkeit getrennt von Auswahl. Ausblenden entfernt die Artikelinstanz nicht.
- Reihenfolge über tastaturbedienbare Schaltflächen statt verpflichtendem Drag-and-drop. Unten liegt in gleicher anatomischer Tiefe weiter vorn. Feste Vorder-/Hinterrollen und echte Stoffmasken bleiben erhalten; die Reihenfolge überschreibt keine Körperanatomie.
- Entfernen, Körperform A/B und Zurücksetzen als explizite Aktionen. Undo/Redo stellt genaue Reihenfolge, Instanzidentität, Sichtbarkeit, Herkunft und Körperform wieder her. Neue echte Aktion nach Undo verwirft den Redozweig; No-ops tun dies nicht.
- DE/EN über ausdrückliche Textwörterbücher, kurze Hinweise, sichtbarer Leer-/Such-/Fehlerzustand und mindestens 44 px Touch-Ziele. Quellen bleiben optional unter Details sichtbar.

Die Grafiken bleiben sechs PNG-Prototypartikel und 89 Vektorstudien. Kein Abschluss der Premiumzeichnung, Mimik-/Griffposen oder endgültigen Schuhpassform. Natürliche Überdeckung wird erklärt, nicht durch Löschen der Auswahl kaschiert.

## Reiner Entwurfsvertrag

`avatar-outfit-draft-v25.js` exportiert `KONPASU_OUTFIT_DRAFT25.create(projection, {catalogue})`, mit `snapshot()` und `dispatch(action, accept?)`. Unterstützte Aktionen sind `add` mit `choiceId`, `remove`/`visibility`/`move` mit `instanceId`, `body`, `reset`, `undo`, `redo`. `visibility` verlangt ein Boolean, `move` genau -1/+1. Ungültige Aktionen ändern weder Auswahl noch Undo/Redo. Ein fehlgeschlagener synchroner `accept`-Callback rollt die gesamte Aktion inklusive Undo/Redo zurück.

Der Snapshot ist ausdrücklich `format: konpasu-session-outfit-draft`, `version: 1`, `sessionOnly: true`. Er ist kein unterstütztes Backup-, Restore-, Import- oder Profilspeicherformat. Alle zurückgegebenen Daten sind unabhängige JSON-Kopien. Der vollständige ursprüngliche Adapterstand bleibt unter `source` erhalten und wird durch keine Entwurfsaktion verändert.

Eine Instanz besitzt eine sitzungsstabile `instanceId` (`draft-item-N`), unveränderte `itemId`, getrennte `artworkId`, `choiceId`, `origin`, ursprüngliche `evidence`, `visible` und `provenance`. Der ID-Zähler läuft monoton; verworfene IDs werden nicht an andere Artikel vergeben. Quellen und Katalogangebote haben getrennte Choice-IDs. Kataloganproben haben ausdrücklich unbekannten Besitz/Tragbarkeit; eine vorhandene Grafik erteilt keine Freischaltung.

Startauswahl: ausschließlich die bereits vom Altvertrag aufgelösten Artikel; abgeschaltete Effekte bleiben ausgeblendet. Ruhende höhere Wünsche, überlagerte Legacy-Einträge und unbekannte Rohwerte bleiben im vollständigen Original erhalten und werden nicht ungefragt zusätzlich aktiviert. Fehlende Historie/ungültige Favoriten sperren den Entwurf. Historische Beispiele behalten Datum und Schnappschuss; Anproben ändern diese Quelle nicht und schaffen keinen damaligen Besitz.

Für die Entwicklungsansicht gilt eine ausdrücklich gemeldete Obergrenze von 500 Instanzen. Dies ist eine Schutzgrenze dieses Prototyps, keine Produktentscheidung über Slots oder endgültige Artikellimits. Der Undo-Verlauf enthält nur Bearbeitungsstände, nicht wiederholt die gesamte Profilquelle. Es gibt keine stille Historienkürzung.

## Tatsächliche Grafikkomposition

`outfit-draft-scene.js` verwendet den vorhandenen geprüften Katalog, Rig-, Basis- und Szenenplaner. Jeder Artikel erhält eindeutige PNG-/SVG-Modul- und Definitions-IDs aus seiner Instanz; eigene Zielidentitäten werden nicht durch Grafikschlüssel ersetzt. Gleiche PNG-Grafik kann mehrfach mit unabhängiger Sichtbarkeit/Reihenfolge vorkommen. Geprüfte Körperregistrierungen und Stoffmasken bleiben erhalten. Körperprofil und ausgewählte Körperform müssen ausdrücklich übereinstimmen; Form A/B wird nie aus persönlichen Körpermaßen abgeleitet.

Die Werkstatt prüft vor dem Bearbeiten sämtliche Vektorquellen und die benötigten PNG-Liefergrafiken. Beschädigte oder fehlende Quellen blockieren den Start; Retry lädt nur die Werkstatt neu. Körperwechsel lädt eine neue Form vor ihrer Übernahme, damit die bisherige Figur bei Ladefehlern erhalten bleibt. Bereits geladene Ressourcen können offline weiterverwendet werden. Das ist kein Nachweis für kalten PWA-Neustart oder Upgrade.

## Prüfstand

`node tests/outfit-draft.cjs`: 21 neue erfolgreiche Prüfungen. `node scripts/check.cjs`: 324 erfolgreiche Prüfungen. Lokaler Browserlauf ist durch den hier nicht erlaubten lokalen Listener (`listen EPERM 127.0.0.1`) blockiert; die tatsächliche Chromiumabnahme läuft über `.github/workflows/outfit-draft.yml` mit Playwright 1.56.1. Bis zu deren Abschluss keine Browser-/Geräteabnahme behaupten. Abschließende Belege folgen unter `design/avatar/verification-outfit-draft-v01.json`.

## Danach: dauerhafte Speicherung mit geprüftem Rückweg

Die jetzige Implementierung speichert bewusst noch nichts. Vor dem nächsten Abschnitt wird ein eigener Speichervorschlag mit Tests konkret umgesetzt:

1. Explizit versionierte additive Mehrfachauswahl neben erhaltenen alten Ausrüstungswegen; keine Umdeutung oder Entfernung von Legacy-, Lieblingslook-, History- oder unbekannten Feldern.
2. Anwenden nur auf den aktuellen expliziten Kontext, nach erneuter Besitz-/Tragbarkeitsprüfung der echten App. Anproben bleiben Vorschau; historische Quellen werden nicht als heutiges Profil gespeichert. Nicht unterstützte Grafik verbleibt über einen vollständigen Legacy-Rückweg darstellbar.
3. Bestehenden Revisions-/Konfliktschutz und atomaren Speicherpfad verwenden. Schreibfehler/Quota/alter Tab dürfen den bisherigen Stand nicht überschreiben. Kein paralleler Entwurfs-Nebenspeicher als neue Wahrheit.
4. Vorher/Nachher-Vergleich aller Ziele, Sessions, Pläne, Belohnungen, permanenten Auszeichnungen, Favoriten, Historien und unbekannten Felder. Explizites Anwenden ändert nur die dafür vereinbarten Felder.
5. Backup-/Import-/Exportvergleich alter und neuer synthetischer Profile, nachvollziehbarer Undo/Rollback, erneutes Laden und echte Offlinefälle. Fehlender historischer Schnappschuss bleibt neutral.
6. Separater Reviewpunkt mit echten Browserbelegen; physische Zielgeräte und PWA-Upgrade vor Veröffentlichung. Kein Main-Merge oder Deployment in dieser Lieferung.

Diese reine Aktionslogik liefert ein überprüfbares Muster für den späteren Copilot. Sie ist noch keine gemeinsame produktive Aktionsengine für andere Appdaten.
