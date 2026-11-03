# Etappe 3.1: Outfit-Kompatibilitätsvertrag

Stand 03.11.2026. Dieser Abschnitt ist eine reine Leseprojektion. Er führt kein persistiertes Outfitformat ein, verändert keine Profilschemas und bindet den neuen Avatar noch nicht in die Live-App ein.

## Vorhandene Datenwege

Die App speichert ältere Ausrüstung unter `profile.equipped[goalId] = tier` und neuere Wünsche unter `profile.avatar2d.slots[slot] = itemId`. `avatar2d.favorites` enthält eigene Slotmaps und optionale Farb-/Szenen-/Begleiterwerte. Historische Einträge liegen unter `avatarHistory[]` mit Datum, optionaler Speicherzeit und vollständigem Profil. Weitere Profilfelder, eigene Zielfamilien und künftige Erweiterungen müssen erhalten bleiben.

Die tatsächlich getragene Ausrüstung entsteht erst durch `KONPASU2D.resolveSlot(slot, profile, date)`. Eine nicht tragbare höhere Auswahl kann durch eine erlaubte niedrigere Stufe desselben alten Slots ersetzt werden. Andere Legacy-Einträge können durch eine Slotwahl überlagert sein. Diese Einträge dürfen bei der Einführung von Mehrfachauswahl nicht ungefragt zusätzlich aktiv werden.

## Reiner Adapter

`avatar-outfit-v25.js` exportiert `KONPASU_OUTFIT25` im Browser und dieselbe API als CommonJS-Modul. Es wird nicht vom Live-HTML geladen. Der Adapter enthält keine Speicher-, Freischalt- oder App-Initialisierungsmethoden.

```js
const projection = KONPASU_OUTFIT25.fromState(state, {
  kind: 'current', // alternativ favorite + index oder history + date
  today: '2026-11-03',
  bindings: {
    slots: KONPASU2D.SLOTS,
    itemForId: (id, profile) => KONPASU2D.itemForId(id, profile),
    itemState: (item, date) => KONPASU2D.itemState(item, date),
    resolveSlot: (slot, profile, date) => KONPASU2D.resolveSlot(slot, profile, date),
    currentPet: (profile, date) => KONPASU2D.currentPet(profile, date),
    companionStage: (profile, date) => KONPASU2D.companionStage(profile, date)
  }
});
```

Die Bindings müssen vertrauenswürdige reine Leser sein. Der Adapter erhält keine `ensure`-, `store`- oder Mutationsfunktion. An die Leser wird eine tiefe eingefrorene Profilkopie übergeben. Der Adapter berechnet keine eigenen Erfolgswochen oder alternativen Freischaltschwellen. Bei fehlender/fehlerhafter Auswertung bleibt ein Nachweis unbekannt; ein bloßes `allowed: true` ohne bestätigten Besitz reicht nicht zur aufgelösten Darstellung.

## Projektion und Quelltreue

Die Ausgabe trägt `format: konpasu-outfit-projection`, `version: 1`, `readOnly: true` und stets `renderer: legacy-required`. Das ist ein Inspektionsformat, kein Backup-, Restore- oder Speicherformat.

| Feld | Bedeutung |
|---|---|
| `source` | Unveränderte JSON-Quelle plus Kontext; niemals automatisch in die App schreiben |
| `entries` | Jeder ursprüngliche Slot-/Legacy-Eintrag, mit eigener Herkunft und unverändertem Rohwert |
| `itemId` | Unveränderte Artikelidentität einschließlich eigener Ziel-ID |
| `item.artworkId` | Getrennte Grafikzuordnung wie strength-2; kein Ersatz für die Artikelidentität |
| `evidence` | Bestehender Besitz-/Tragbarkeitsnachweis oder ausdrücklich unbekannt |
| `resolvedSlots` | Tatsächliche Auflösung der alten API; keine neue automatische Mehrfachausrüstung |
| `companion` | Beide gespeicherten Begleiterfelder, gewünschter und tatsächlich aufgelöster Begleiter getrennt |
| `appearance` | Vorhandene Darstellungseinstellungen; keine automatische Wahl von Form A/B |
| `issues`, `complete`, `blocked` | Fehlende/mehrdeutige Zuordnung und unlesbare Quellen; keine stillen Löschungen |

`recoverSource(projection)` liefert eine unabhängige Kopie des `source`-Kontexts zurück. Bei aktueller Auswahl liegt das Originalprofil unter `source.profile`. Bei Favoriten bleiben das ursprüngliche Profil unter `source.baseProfile` und der vollständige ursprüngliche Favorit unter `source.favorite`; `source.profile` ist ausschließlich dessen abgeleitete Vorschau. Bei Historie bleibt der vollständige ausgewählte Eintrag unter `source.record`, sein Profil außerdem unter `source.profile`. Die übrigen Statebereiche werden nicht umgeschrieben oder als neue Sicherung ausgegeben.

Auch leere Werte, unbekannte IDs, abweichende Slots, ungültige Auswahlwerte und neue Profilfelder bleiben in der Quelle erhalten. Gleiche IDs aus verschiedenen Ursprungswegen bleiben nachvollziehbare Herkunftseinträge. Zwei eigene Ziele mit derselben Familie/Stufe behalten unterschiedliche Artikel- und Eintragsidentitäten. Ein späterer Entwurf darf sie nicht über `Set(artworkId)` zusammenwerfen.

Unterstützt werden endliche JSON-Werte ohne Zyklen, Accessors, sparse/erweiterte Arrays oder Sonderobjekte. Nicht verlustfrei kopierbare Werte werden abgewiesen, statt durch JSON.stringify still verändert zu werden. Inspektionsgrenzen: 200.000 Werte und 64 Ebenen; Überschreitung führt zum Fehler ohne Schreibaktion. Das sind keine Produktlimits für endgültige Mehrfachauswahl oder Slotzahl.

## Lieblingsoutfits

Ein Favorit übernimmt ausschließlich seine Slotmap; `equipped` ist in seiner Vorschau leer. Ein absichtlich leerer Look darf keine aktuelle oder ältere Ausrüstung hineinmischen. Optionale Farb-/Szenen-/Begleiterwerte folgen der bisherigen Vorschau-Fallbackregel. Unbekannte Favoritenfelder bleiben vollständig erhalten. Alte Favoriten speichern keine vollständige eigene Frisur-/Mimik-/Effekt-/Zielfamilienhistorie; fehlende Werte werden entsprechend der bestehenden Vorschau aus dem aktuellen Profil gelesen und nicht als damals gespeicherte Information ausgegeben. Negative, gebrochene oder nicht existierende Indizes werden abgewiesen. Unlesbare Favoriteneinträge werden als blockierte Quelle erhalten.

Diese Vorschau trägt nichts tatsächlich an und synchronisiert keine gespeicherten Begleiterfelder. Erst eine spätere ausdrücklich implementierte Aktion darf einen Look übernehmen; sie benötigt einen eigenen Vertrag und Rückweg.

## Historie

Ein Datum muss ausdrücklich als echtes YYYY-MM-DD-Kalenderdatum angegeben sein. Die heutige Profilwahl darf nicht als Vergangenheit projiziert werden. Vorhandene gültige Schnappschüsse werden in der bisherigen Reihenfolge nach Datum/Speicherzeit gewählt; die Gegenstände werden für das gewünschte historische Datum ausgewertet. Eine damalige Zuordnung eigener Zielfamilien stammt aus diesem Schnappschuss.

Ohne früheren Schnappschuss entsteht eine blockierte, neutrale Projektion. Der Adapter setzt dann nicht das heutige Profil ein. Die bestehende Live-Hilfsfunktion `showProfileForDate` besitzt diesen Heute-Fallback noch; dessen spätere Korrektur ist gesondert abzunehmen. Künftige historische Daten ergeben keine vorab belegten Ansichten. Ein neuester Eintrag ohne lesbares Profil wird nicht durch einen älteren plausiblen Eintrag ersetzt.

Ältere Schnappschüsse ohne `savedAt` bleiben lesbar. Bei mehreren Einträgen desselben Tages und fehlenden Zeitangaben wird die historische Reihenfolge ausdrücklich als unklar markiert; die Daten werden nicht umsortiert oder neu datiert.

## Prüfseite und Nachweise

`design/avatar/outfit-contract.html` zeigt acht synthetische Beispiele mit gespeicherten Wünschen, tatsächlicher Altauflösung, Begleiterunterschieden und Quellvergleich. Sie lädt keine Live-App-Skripte, liest keine persönlichen Speicher und bietet keinen Profilimport und keine Speicherschaltfläche an.

`scripts/build-outfit-contract-cases.cjs` erzeugt die Browserdaten über die tatsächlichen bestehenden APIs im isolierten VM-Testharness. Aktuelle Tierwerte und Wochenstatus sind dabei bewusst kontrollierte synthetische Eingaben. Das beweist den Adaptervertrag, nicht die vollständige Richtigkeit aller Reward-/Kalenderberechnungen. Fixture und Generator sind reproduzierbar; keine persönlichen Exporte verwenden.

Tests: `node tests/outfit-adapter.cjs`; Gesamtprüfung: `node scripts/check.cjs`. Reale Browserprüfung: `node scripts/outfit-browser-check.cjs` mit gepinntem Playwright/Chromium in GitHub Actions. Abschlussbelege stehen in `design/avatar/verification-outfit-contract-v01.json`: 303 Regressionen, davon 23 neue, 26 bestehende Ateliergruppen sowie 12 neue Browsergruppen für Quellcommit `1d50304da6b818cf1181cb79fda02072755e8143` erfolgreich. Läufe [41605680366](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680366) und [41605680286](https://github.com/Rowlandolo/KONPASU/actions/runs/41605680286). Sechs gesichtete Original-Screenshots und Browserbericht unter `design/avatar/review-outfit-contract-v01/`. Der folgende Nachweiscommit enthält nur Dokumentation und Belege.

## Nächster Abschnitt

Ein geordneter Mehrfachentwurf zunächst nur im Sitzungsspeicher: bestehende Auswahl als Ausgangspunkt, eigene stabile Artikelinstanzen statt Grafik-IDs, getrennte Sichtbarkeit und Reihenfolge, explizites Hinzufügen/Entfernen und Undo. Noch kein Anwenden auf ein gespeichertes Profil. Danach folgt ein eigener geprüfter Speicher-/Import-/Export-/Rollbackvertrag samt Altprofil- und Offlinefällen. Der neue Renderer bleibt bis zu seiner Funktions- und Geräteabnahme opt-in mit vollständigem Legacy-Rückweg.
