# Etappe 3.3: additiver Outfit-Speichervertrag

Stand 03.11.2026. Entwicklungsbranch `feature/outfit-persistence` auf Entwurfs-PR #6. Kein Deployment. Die bisherige Appdarstellung bleibt im Legacy-Renderer; die produktive Verbindung des Mehrfacheditors und seiner Grafikvorschau mit den Appbedienelementen ist der folgende Integrationsabschnitt.

## Daten und Rückweg

Nur ausdrückliches Speichern erzeugt `profile.outfit25` mit `format: konpasu-multi-outfit`, `version: 1`, Körperform, geordneten Instanzen mit stabiler Instanz-/Artikel-ID, getrenntem Grafikschlüssel, gewünschter Sichtbarkeit, lokalem Datum und UTC-Speicherzeit sowie Operations-ID. Unveränderte Altdaten werden beim Start, Validieren oder Migrieren nicht um ein Outfit ergänzt. `equipped`, `avatar2d.slots`, Favoriten, History, Begleiter und alle anderen Felder bleiben erhalten. Unbekannte Metadaten des vorhandenen Outfits und unveränderter Instanzen bleiben bei Änderungen erhalten.

`outfitRecovery25` enthält genau eine dauerhafte Rücknahme: vorheriger Outfitwert mit ausdrücklich erfasster Abwesenheit und der danach gespeicherte Wert. Es enthält keine Kopie aller Trainings-/Zieldaten und keinen rekursiven Undo-Verlauf. Eine Rücknahme prüft, dass der aktuelle Outfitwert noch zum Rücknahmeeintrag passt; sie stellt nur den vorherigen Outfitwert wieder her und verbraucht den Eintrag. Spätere Notizen, Checks, Trainings und übrige Einstellungen bleiben erhalten. Ein zweites Speichern ersetzt diesen einen Rücknahmeeintrag; der Editor behält daneben seinen flüchtigen Undo/Redo-Verlauf.

Bekannte Formate werden bei Startup und tatsächlichem Backupimport auch innerhalb historischer Profile validiert. Künftige positive Versionsnummern werden als opaque JSON erhalten, nicht herunterkonvertiert; Editing/Speichern/Rücknahme solcher unbekannten Verträge bleibt gesperrt. Beschädigte bekannte Strukturen werden abgewiesen. Die allgemeinen Kopiergrenzen des Adapters (200.000 JSON-Werte/64 Ebenen) führen ausdrücklich zum Fehler ohne Datenänderung, nie zu stiller Kürzung; sie sind kein endgültiges Produktlimit für große Trainingsarchive.

## Aktuelle Nachweise statt vertrauter Anprobe

`prepareSave` akzeptiert ausschließlich einen heutigen expliziten Current-Entwurf, dessen Quellprofil strukturell noch dem aktuellen Profil entspricht. Historische und Favoritenvorschauen können nicht als aktuelles Profil gespeichert werden. Änderungen an anderen Datenbereichen sind zulässig, ihre Besitz-/Tragbarkeitsfolgen werden beim Speichern neu über die tatsächlichen bestehenden App-APIs ausgewertet. Mitgelieferte Entwurfsevidenz wird nicht als Besitzbeleg verwendet.

Neue Artikel benötigen bestätigten Besitz; sichtbare neue Artikel zusätzlich bestätigte Tragbarkeit. Eine unverdiente Anprobe wird auch ausgeblendet nicht als Besitz gespeichert. Ein früher gespeicherter, inzwischen ruhender oder unbekannter Artikel bleibt bei unverändertem Wunsch erhalten und darf ohne neue Besitzbehauptung ausgeblendet werden. Erneutes Einblenden benötigt wieder bestätigte Tragbarkeit und Besitz. Die aktuelle Auflösung zeigt ihn nur bei erneut bestätigtem Besitz und Tragbarkeit an. Ein unbekannter Grafik-/Familienwechsel wird nicht stillschweigend umgedeutet. Eigene Ziele mit derselben Grafik behalten unterschiedliche Artikel-/Instanz-IDs. Neue Körperformen werden nie aus Körpermaßen abgeleitet.

## Speicherpfad und Konflikte

`avatar-outfit-persistence-v25.js` ist rein: Validierung, Save-/Rollbackkandidat, struktureller Vorher/Nachher-Vergleich, Auflösung und Wiederaufnahme des Entwurfs. `comparison` erzwingt, dass ausschließlich `/profile/outfit25` und `/outfitRecovery25` geändert werden. `avatar-outfit-store-v25.js` verbindet diesen Vertrag mit der vorhandenen Appwarteschlange, `writeDB` und `writeFallback`; keine zweite Datenbank oder neue Profilwahrheit.

Die API `KONPASU_OUTFIT_STORAGE25` bietet `makeDraft(catalogue)`, `save(snapshot)`, `read()` und `rollback()`. Schreibmethoden liefern ein Ergebnis mit `ok`, Konflikt-/Fehlercode, Revision und Datenvergleich. Die tatsächliche UI-Anbindung folgt separat; ein globaler API-Aufruf ist kein neues produktives Bedienelement.

IndexedDB nutzt denselben atomaren Revisionstest im Readwrite-Transactionpfad. Fallback nutzt denselben Web Lock und Rohdatenvergleich; ohne Web Locks bleibt der Ersatzpfad schreibgeschützt. Gleichzeitige APIbefehle laufen über dieselbe Queue wie andere Appänderungen. Gewöhnliche Snapshots, die vor einer Outfittransaktion vorgemerkt wurden, übernehmen vor ihrem Schreiben ausschließlich die inzwischen geänderten Outfitfelder, damit sie neue Looks nicht entfernen oder zurückgenommene Looks wieder einführen. Ihre anderen Daten bleiben unverändert.

Die zwei Felder werden im Arbeitsspeicher vor dem Schreiben übernommen, damit nachfolgende Änderungen sie mitführen. Bei Schreibfehler werden ausschließlich diese Felder zurückgesetzt, sofern sie noch zu dieser Operation gehören; währenddessen entstandene andere Änderungen bleiben im Arbeitsspeicher. Danach greift der vorhandene Schreibschutz und Backuphilfe. IndexedDB-Fehler beim ObjectStore-Put werden kontrolliert abgefangen und die Transaktion abgebrochen. Ein fachlicher Konflikt vor dem Schreiben verändert nichts und sperrt den ansonsten funktionierenden Speicher nicht.

## Offline und Kandidatenversion

Entwicklungskandidat **2.4.1-preview.1**, eigener Cache `konpasu-offline-v241-outfit-preview1`, eigener Reloadmarker; Versionen von App, HTML und version.json stimmen überein. Adapter, Editorlogik, Persistenzvertrag und Speicherbrücke sind kritische Precache-Ressourcen. Ein fehlendes kritisches Skript verhindert die Aktivierung des Ersatzworkers. Ungeprüfter Kandidat wird nicht nach main gemergt oder auf Pages veröffentlicht. Die Live-App bleibt bis zu einer gesonderten Veröffentlichung auf 2.4.0.

## Prüfung und folgende Integration

26 neue Node-Prüfungen; zuletzt insgesamt 350 lokal erfolgreich. Tatsächliche neue Browserabnahme läuft über `.github/workflows/outfit-storage.yml`; bis zu ihrem Abschluss keine Browser-/Geräteabnahme behaupten. Test ausschließlich mit synthetischen Daten in frischen Browserkontexten auf zufälligem Loopback-Origin, nie auf Pages oder einem privaten Browserprofil.

Die neue Browserprüfung verwendet echte Kalender-/Reward-APIs mit vier expliziten abgeschlossenen Wochenmesswerten zweier synthetischer eigener Ziele; keine Tier-/Evidenzstubs. Sie prüft echte IndexedDB, Startup/Reload, vorhandene UI für JSON-Backup/-Import, Offline-Kaltstart mit Worker, Konflikttabs, Queueüberlagerung, Rücknahme mit späteren Daten und erzwungenen Put-Fehler. Die zusätzlichen Ergebniskarten werden ausschließlich vom Testskript erzeugt und gehören nicht zur Appoberfläche.

Danach: geöffneter Mehrfacheditor an diese API anbinden, klare Anprobe-/Speichern-/Konflikt-/Rücknahmezustände, aktuellen Look nach jedem erneuten Evidenzcheck darstellen; Altgrafik, Szenen, Begleiter und Personalisierung vollständig erhalten. Die bekannte Live-Historie-Fallbackfrage bleibt ein eigener Integrationspunkt. Reales iPhone, VoiceOver, Alt-PWA-Upgrade und finale Grafik bleiben Gates vor Veröffentlichung. Kein Anspruch auf vollständige App- oder Geräteabnahme durch diesen Vertrag.
