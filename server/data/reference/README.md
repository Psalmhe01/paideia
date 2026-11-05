# Reference datasets

## World English Bible

- `webp.json.gz` contains the 66-book Protestant edition with 1,189 chapters. [Edition and downloads](https://ebible.org/find/details.php?id=engwebp).
- `webc.json.gz` contains the 73-book Catholic edition with 1,328 chapters. [Edition and downloads](https://ebible.org/find/details.php?id=engwebc).

eBible.org dedicates the translation text to the public domain. The bundled files reorganize the publisher’s verse-per-line XML downloads as UTF-8 JSON keyed by book code and chapter. Each chapter contains verse-number and text pairs. Copyrighted illustrations and publisher notes are outside the bundled verse text.

## Strong’s dictionaries

`strongs.json.gz` contains 14,197 records from James Strong’s Hebrew, Aramaic, and Greek dictionaries in the Open Scriptures digital edition. The upstream dictionary headers credit Open Scriptures for the JSON editions and identify them as CC BY-SA. The Hebrew data also credits David Troidl and David Instone-Brewer. The Greek data credits Ulrik Petersen for the XML edition. [Upstream files and attribution headers](https://github.com/openscriptures/strongs).

Paideia consolidates the two upstream dictionaries into a UTF-8 JSON array, standardizes field names, and labels Hebrew-series entries whose derivations identify them as Aramaic. The adapted data carries the upstream CC BY-SA notice.
