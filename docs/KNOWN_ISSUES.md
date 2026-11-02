# KONPASU – Fehlerregister

Stand 02.11.2026. P0 = Releaseblocker, P1 = hoch, P2 = Produktlücke. Behoben bedeutet lokal, nicht deployed.

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
| QA-01 | P0 | Kein echter Browser-/iPhone-Upgrade-/Offline-/IndexedDB-Test in dieser Sitzung | Offen, keine Releasefreigabe |
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
