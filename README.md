# Paideia

Paideia is a local study library for Christian theology, Scripture, church history, and primary sources. The unified edition keeps Run 3’s reading rooms, parchment theme, and study workspace and brings together material from all five runs.

## Run in Windows PowerShell

Use Node.js 22.16 or newer on the 22.x, 24.x, or 26.x release lines. The Windows workspace is `C:\Users\omoso\paideia`.

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd start
```

Open [Paideia](http://localhost:3001). For development, run `npm.cmd run dev` and open [the Vite server](http://localhost:5173).

The default listener is `127.0.0.1`. This edition uses one local SQLite profile for study notes, quiz history, and uploads. Scripture verse bookmarks and theme preferences live in the current browser. `PAIDEIA_DATA_DIR` sets a different SQLite and attachment directory. Back up that directory to retain the study profile.

## Reading rooms

| Room | Route | What you can do |
| --- | --- | --- |
| Study curriculum | `/study` | Browse 155 modules across 11 disciplines. Search article text and open cited Scripture in the reader. |
| Study paths | `/paths` | Follow eight ordered curricula and track completed modules. |
| Bible | `/bible` | Read the complete verse text of two World English Bible editions, search for a phrase, jump to a reference, and bookmark verses. |
| Lexicon | `/lexicon` | Search 14,197 Strong’s entries by headword, transliteration, gloss, or ID. The curriculum glossary has 396 linked terms and flashcards. |
| Atlas | `/atlas` | Filter the church-history timeline and compare atonement models, approaches to biblical interpretation, and millennial views. The Trinity reader also has an interactive Shield of the Trinity. |
| Traditions | `/traditions` | Explore 11 church families and denominations and compare their practices and teaching. |
| Christian books | `/books` | Filter 20 works with illustrated cover tiles and links to digital editions. |
| Sources | `/sources` | Browse 562 source listings and 87 companion attachments, discover online readings, and add local materials. |
| Quizzes | `/quizzes` | Practice with 777 questions in study and exam modes, build an exam across disciplines, and review missed questions. |
| Notebook | `/notebook` | Revisit saved topics, progress, and marginalia. |

Individual topics, verses, lexicon entries, study paths, atlas charts, and church profiles have direct URLs. Press Ctrl+K or Cmd+K to search the library.

## Corpus and artwork

- Run 1 contributed long-form articles and a broad quiz bank. Its glossary review informed the flashcards.
- Run 2 contributed articles on eschatology and sacraments, additional questions, creeds, timelines, and worksheets.
- Run 3 supplies the application shell, study reader, source discovery, uploads, SQLite notebook, and missed-question workflow.
- Run 4 contributed scholarly modules, source-linked companion documents, and four guided paths.
- Run 5 contributed comparative modules, parallel texts and charts, questions, and four additional paths.

The merged readings include complementary treatments of the same subject. The inherited course material has not received a line-by-line scholarly review. Follow its cited sources for teaching and research.

The Bible and Strong’s data are bundled and work without an external API. [Dataset details](server/data/reference/README.md). Book links and live source discovery require internet access.

The manuscript archive and Mediterranean port illustrations are editorial artwork made with the built-in image generator. The timeline and study diagrams use labeled controls that support keyboard exploration.

<details>
<summary>Artwork and prompts</summary>

- [Manuscript archive](public/art/manuscript-archive.jpg). Historical-scene website hero illustration for Paideia, an editorial Christian theological library. Ultra-wide horizontal composition. A richly hand-engraved, low-light manuscript archive with a dark plum/oxblood and aubergine palette, copper and honey-amber etching highlights. An open antique codex on the right-hand side beneath an early Christian basilica arch and tiny high windows, with a subtle glow lighting up the pages. Indistinct marks only, no legible text. Left half almost entirely deep shadow with understated printing texture, reserved for overlaid white site headline. Tactile intaglio engraving, weathered ink grain, meticulously shaded hatching. Restrained, scholarly, luminous. No human figures, no lettering, no typography, no borders, no watermarks.
- [Mediterranean port](public/art/mediterranean-port.jpg). Historical-scene editorial illustration for a Christian church history atlas. Horizontal landscape composition with excellent readability in a very wide crop. A hand-engraved antique view of a Mediterranean port at dawn, late antiquity, distant domes and basilica, stone quay and small wooden ships. Suggest the spread of early Christianity through cities and seaways with the setting alone. Engraved aubergine shadows, weathered sepia parchment, old copper linework, amber sunrise. Scholarly and understated, historically evocative rather than literal. No borders, no words, no readable map labels, no modern objects, no watermarks.

</details>

## Checks

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```
