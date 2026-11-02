# KONPASU 2.4 – modularer Avatar, Belohnungen und Datensicherheit

Zielbranch main; Remote-Entwicklungsbranch feature/konpasu-24-reviewed-update. Schreibzugriff nach Neuverbindung erfolgreich geprüft. Reviewkandidat; kein Merge und kein Deployment durch diese Änderung.

Avatarabsturz der Basis 2.3.1 behoben und echte SVG-Ebenen auf Studio/Startseite integriert. Belohnungssammlung mit Status-/Slotfiltern, Voraussetzungen, Begleitern, Favoriten, Ruhmeshalle und Ausrüstungsübersicht ergänzt. Gesperrte Anprobe bleibt ohne Besitzänderung.

Start, Backupvalidierung, Restore-Rollback und Speicherkonflikte gehärtet. Verbrauchs-/Obergrenzennachweise vereinheitlicht, Exporte und Bedienung korrigiert. Rohdaten und Datenbankversion bleiben erhalten; abgeleitete Erfolge und Tragbarkeit können sich durch korrigierte Nachweise ändern. CSV ergänzt Dauer_s.

193 automatisierte Prüfungen im vollständigen Bestand und erneut entpackten Uploadpaket bestanden. Alle 45 Originaldateien aus Nutzerarchiv hashgeprüft; Originalbilder und Premiumbundle unverändert vorhanden. Quellcode-/VM-/Integritätsprüfungen ersetzen keine echten Browser-/IndexedDB-/Safari-/iPhone-/Upgradeprüfungen. Chromiumstart in der Arbeitsumgebung blockiert. QA_CHECKLIST.md und DEVICE_ACCEPTANCE.md bleiben Freigabegates.

Produktanforderungen, vollständiges Masterbriefing, Status, Fehlerregister, Roadmap, Auswertungsregeln und Prüfanleitungen dauerhaft in docs/. Weitere offene Punkte: historische Zielkonfiguration, Tragbarkeit nach Datenlücken (REW-06), vollständige Mobile-/A11y-/DE/EN-Abnahme.

Vor Live-Update aktuelles externes JSON-Backup sichern. Bestehende Origin und Datenbanken behalten. Rückweg: geprüfter Code-Revert, keine Datenbereinigung. Veröffentlichung erst nach Review und ausdrücklicher Freigabe.
