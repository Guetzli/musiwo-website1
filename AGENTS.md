# MusiwoWebsite – Projektkontext

Neue Website für **musiwo.ch**. Stand: 2026-10-17 – Prototyp lokal lauffähig (`npm start` → http://localhost:8080).

Repo: https://github.com/Guetzli/musiwo-website1 (privat). CMS: https://app.pagescms.org

## Projektstruktur
- `content/startseite.md` – Startseite: Felder (Titel, Termin, Kursort, Anmelde-PDF) + gesamter Text als Body.
- `content/leitung/*.md` – eine Datei pro Leitungsperson (CRUD via Pages CMS), Felder: name,
  foto, anzeigen, reihenfolge, Body = Kurzbio.
- `src/` – Layouts, Leitungsseite, CSS, Navigation (`src/_data/site.json`) – nur Entwickler.
- `images/`, `dokumente/` – Medienordner (Pages CMS `media`).
- `.pages.yml` – was Laien bearbeiten dürfen.

## Ziel
- Bestehende Website musiwo.ch ablösen; aktuelles Hosting kostet CHF 70.–/Jahr.
- Domain zu **Infomaniak** transferieren und den dort (gratis) enthaltenen Webspace nutzen.
- Kleine Site: ca. 3 Menüpunkte, einige Bilder.

## Anforderungen
- Inhalte müssen von **Laien einfach und komfortabel** gepflegt werden können.
- Laien dürfen **keine Strukturänderungen** machen (Menü, Layout, Seitentypen) – nur banale Inhaltspflege,
  z. B. neue Leitungsperson hinzufügen, Inhalt der Startseite jährlich aktualisieren.
- Keine aktiven Serverkomponenten (kein PHP/DB).
- Entwicklung in einem GitHub-Repo (**musiwo-website1**) mit Deployment; Deployments dürfen
  **vorhandene Inhalte nicht überschreiben**.

## Entscheidungen
- TiddlyWiki verworfen (Speichern auf Infomaniak-Webspace für Laien zu umständlich, wirkt wie Wiki).
- Gewählter Stack:
  - **Eleventy** als Static Site Generator
  - **Pages CMS** (`.pages.yml`) für Laien-Pflege – nur definierte Felder/Collections editierbar
  - Inhalte in `content/` (Markdown/Daten), Templates/CSS in `src/`, Bilder in `images/`
  - **GitHub Action**: Build + Deployment per FTP/SFTP auf Infomaniak-Webspace
    (Alternative: DNS auf GitHub Pages)
- Inhalte sind im Repo die Quelle der Wahrheit; Webspace erhält nur Build-Output → nichts wird überschrieben.

## Analyse bestehende musiwo.ch (2026-10-17)
- WordPress 7.1.3, Titel „Kammermusikwoche“. Nur **2 Seiten**, keine Blogposts:
  - **Home** (`/`): Termin (So 4.–Sa 10. Oktober 2026), Ort (Bildungszentrum Matt, Schwarzenberg,
    bzmatt.ch), Zielgruppe (Amateur-Kammermusik, max. 50 TN), Kursbeschrieb (Ensembles ab 3,
    5 Lektionen à 55 Min.), Kosten (Kurs CHF 580, Unterkunft VP CHF 720–1380), Anmeldeformular (PDF),
    Kontakt (Susanne Reinhard).
  - **Musikalische Leitung** (`/leitung/`): 9 Personen erfasst, je Foto, Name, Instrument/Funktion,
    Kurzbio (30–140 Wörter, teils mit Links). 7 sichtbar; per CSS-Klasse `hide-this-block` ausgeblendet:
    Nathalie Gullung (Oboe, Bio auf Französisch) und Renée Straub (Viola).
- Anforderung (User): **gesamter Text der Startseite** pflegbar; Leitung mit **CRUD**.
- Keine Bilder auf der Startseite; Favicon vorhanden.
- → Leitungspersonen brauchen im CMS ein Feld **„Anzeigen“** (ja/nein), damit Laien ausblenden
  statt löschen können.
- Wiederkehrend jährlich zu pflegen: Termin, Kosten, Anmeldeformular-PDF, Leitungspersonen.

## Offene Punkte / nächste Schritte
1. ~~Bestehende musiwo.ch analysieren~~ (erledigt, siehe oben).
2. Klären: weitere regelmässig gepflegte Inhalte (Termine, Kontakt …)?
3. Eleventy-Projekt + `.pages.yml` aufsetzen.
4. GitHub Action für FTP-Deployment zu Infomaniak.
5. Kurzanleitung für Laien.

## Beim Umzug beachten
- E-Mail-Adressen @musiwo.ch beim alten Anbieter prüfen und zuerst migrieren.
- Auth-Code für .ch-Domain-Transfer beim alten Anbieter holen.
- Prüfen, ob Infomaniak-Gratis-Webspace FTP/SFTP-Zugang bietet.
- Reihenfolge: neue Site bauen & testen → Domain/DNS umstellen → altes Hosting kündigen.
