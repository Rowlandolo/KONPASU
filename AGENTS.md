# KONPASU: verbindliche Arbeitsgrundlage

Vor Änderungen docs/PRODUCT_SPEC.md, docs/STATUS.md, docs/KNOWN_ISSUES.md und die für die Aufgabe relevanten Abschnitte des vollständigen docs/MASTERBRIEFING_2026-11-02.md lesen. Produktentscheidungen aus dem Masterbriefing gelten; technische Aussagen stets am aktuellen Code prüfen.

- Branch und kleine überprüfbare PRs. Kein Merge, Push nach main oder Deployment ohne ausdrückliche Nutzerfreigabe. Vor Live-Updates extern gesichertes JSON-Backup verlangen.
- Homescreen-App, Website-Daten, IndexedDB und localStorage niemals als Reparatur pauschal löschen. Keine Schemaänderung oder semantische Migration ohne gesonderten Auftrag, Tests und Rückweg.
- Keine persönlichen Exporte, Fotos, Zugangsdaten oder Testdaten im Nutzerprofil. Tests ausschließlich mit synthetischen Daten.
- Unbekannt ist neutral; keine erfundenen Trainingstage, alkoholfreien Tage oder Erfolge bei unvollständigen Obergrenzen. Wochen lokal Montag–Sonntag; historische Nachträge berücksichtigen.
- Quick First – Details Optional. Helles Premium Botanical, Deutsch/Englisch, respektvolle Motivation; 2D vor 3D. Keine voreilige Neuschreibung.
- Prüfen: `node scripts/check.cjs`. Keine Dependencies erforderlich. VM-Tests sind keine Browser-, IndexedDB- oder iPhone-Abnahme.
- Bei jeder abgeschlossenen Phase docs/STATUS.md, KNOWN_ISSUES.md, ROADMAP.md und QA_CHECKLIST.md aktualisieren. Implementiert, getestet, deployed, geräteabgenommen unterscheiden.
- Bei fehlenden GitHub-Schreibrechten lokal in Branch fortfahren und `git format-patch`/PR-Vorschlag liefern. Snapshot-Baseline nicht als echten Upstream-Commit ausgeben.
