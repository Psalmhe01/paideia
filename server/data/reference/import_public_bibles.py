"""Fetch and package public-domain English Bible VPL datasets from eBible.org."""

from __future__ import annotations

import gzip
import json
import re
import tempfile
import urllib.request
import zipfile
from collections import OrderedDict
from pathlib import Path

OUT = Path(__file__).resolve().parent
SOURCES = {
    "kjv": ("https://ebible.org/zip/eng-kjv2006_vpl.zip", "eng-kjv2006_vpl.txt", "kjv-source.zip"),
    "asv": ("https://ebible.org/zip/eng-asv_vpl.zip", "eng-asv_vpl.txt", "asv-source.zip"),
    "bsb": ("https://ebible.org/zip/engbsb_vpl.zip", "engbsb_vpl.txt", "bsb-source.zip"),
}
VERSE = re.compile(r"^([A-Z0-9]{3})\s+(\d+):(\d+)\s+(.+)$")
BOOK_ALIASES = {
    "1JO": "1JN", "2JO": "2JN", "3JO": "3JN", "EZE": "EZK", "JAM": "JAS",
    "JOE": "JOL", "JOH": "JHN", "MAR": "MRK", "NAH": "NAM", "PHI": "PHP",
    "SOL": "SNG",
}


def main() -> None:
    with tempfile.TemporaryDirectory(prefix="paideia-bibles-") as temporary:
        temp = Path(temporary)
        for edition, (url, filename, local_archive) in SOURCES.items():
            archive_path = temp / f"{edition}.zip"
            existing_archive = OUT / local_archive
            if existing_archive.exists():
                archive_path.write_bytes(existing_archive.read_bytes())
            else:
                urllib.request.urlretrieve(url, archive_path)
            with zipfile.ZipFile(archive_path) as archive:
                source = archive.read(filename).decode("utf-8-sig")

            books: OrderedDict[str, OrderedDict[str, list[list[str]]]] = OrderedDict()
            for line in source.splitlines():
                match = VERSE.match(line)
                if not match:
                    continue
                book, chapter, verse, text = match.groups()
                book = BOOK_ALIASES.get(book, book)
                books.setdefault(book, OrderedDict()).setdefault(chapter, []).append([verse, text])

            if len(books) != 66:
                raise RuntimeError(f"Expected 66 books in {edition.upper()}, found {len(books)}")
            target = OUT / f"{edition}.json.gz"
            payload = json.dumps(books, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
            with target.open("wb") as raw, gzip.GzipFile(fileobj=raw, mode="wb", mtime=0) as compressed:
                compressed.write(payload)
            verses = sum(len(chapter) for book in books.values() for chapter in book.values())
            print(f"{edition.upper()}: {len(books)} books, {verses:,} verses -> {target.name}")


if __name__ == "__main__":
    main()
