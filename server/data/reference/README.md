# Reference datasets

## World English Bible

The compressed `webp.json.gz` and `webc.json.gz` files are the Protestant and Catholic World English Bible corpora.

## Additional English translations

`kjv.json.gz`, `asv.json.gz`, and `bsb.json.gz` use the eBible.org verse-per-line (VPL) datasets. The repeatable importer is `import_public_bibles.py`, uses only Python's standard library, and normalizes publisher book codes to the canonical book codes used by Paideia.

- King James Version (1769 text): [eBible.org edition page](https://ebible.org/find/show.php?id=eng-kjv2006). Public domain in the United States; eBible.org notes Crown copyright restrictions on printing in the United Kingdom.
- American Standard Version (1901): [eBible.org edition page](https://ebible.org/find/show.php?id=eng-asv). Public domain.
- Berean Standard Bible: [eBible.org edition page](https://ebible.org/find/show.php?id=engbsb) and [Berean terms](https://berean.bible/terms.htm). Dedicated to the public domain.

These editions contain the 66-book Protestant canon. They are provided as additional study translations and do not replace the existing World English Bible Catholic edition.

- `webp.json.gz` contains the 66-book Protestant edition with 1,189 chapters. [Edition and downloads](https://ebible.org/find/details.php?id=engwebp).
- `webc.json.gz` contains the 73-book Catholic edition with 1,328 chapters. [Edition and downloads](https://ebible.org/find/details.php?id=engwebc).

eBible.org dedicates the translation text to the public domain. The bundled files reorganize the publisher’s verse-per-line XML downloads as UTF-8 JSON keyed by book code and chapter. Each chapter contains verse-number and text pairs. Copyrighted illustrations and publisher notes are outside the bundled verse text.

## Strong’s dictionaries

`strongs.json.gz` contains 14,197 records from James Strong’s Hebrew, Aramaic, and Greek dictionaries in the Open Scriptures digital edition. The upstream dictionary headers credit Open Scriptures for the JSON editions and identify them as CC BY-SA. The Hebrew data also credits David Troidl and David Instone-Brewer. The Greek data credits Ulrik Petersen for the XML edition. [Upstream files and attribution headers](https://github.com/openscriptures/strongs).

Paideia consolidates the two upstream dictionaries into a UTF-8 JSON array, standardizes field names, and labels Hebrew-series entries whose derivations identify them as Aramaic. The adapted data carries the upstream CC BY-SA notice.
