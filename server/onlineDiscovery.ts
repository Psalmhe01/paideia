export interface DiscoveredOnlineResource {
  title: string;
  author: string;
  year: string;
  repository: string;
  sourceType: string;
  url: string;
  citation: string;
  summary: string;
}

const CURATED_ONLINE_CATALOG: DiscoveredOnlineResource[] = [
  {
    title: 'Christian Classics Ethereal Library — Early Church Fathers (38 Volumes)',
    author: 'Philip Schaff, Alexander Roberts & James Donaldson (eds.)',
    year: '1885–1900',
    repository: 'CCEL',
    sourceType: 'Historical Archive',
    url: 'https://www.ccel.org/fathers',
    citation: 'Ante-Nicene, Nicene, and Post-Nicene Fathers, 38 vols. (CCEL).',
    summary: 'Complete searchable English edition of the Ante-Nicene, Nicene, and Post-Nicene Church Fathers.',
  },
  {
    title: 'New Advent — Fathers of the Church Digital Archive',
    author: 'Kevin Knight (ed.)',
    year: '1st–8th Century',
    repository: 'New Advent',
    sourceType: 'Primary Text',
    url: 'https://www.newadvent.org/fathers/',
    citation: 'New Advent Patristic Digital Repository.',
    summary: 'Organized index of Greek, Latin, and Syriac patristic treatises, letters, homilies, and conciliar decrees.',
  },
  {
    title: 'Eusebius of Caesarea — Church History (Historia Ecclesiastica)',
    author: 'Eusebius of Caesarea',
    year: 'c. AD 324',
    repository: 'New Advent',
    sourceType: 'Historical Archive',
    url: 'https://www.newadvent.org/fathers/2501.htm',
    citation: 'NPNF Series II, Vol. 1 (New Advent).',
    summary: 'Ten-book foundational history of the early Church from the Apostles to Constantine, preserving priceless lost fragments.',
  },
  {
    title: 'Blaise Pascal — Pensées (Apologetics & Contemplations)',
    author: 'Blaise Pascal',
    year: '1670',
    repository: 'Project Gutenberg',
    sourceType: 'Treatise',
    url: 'https://www.gutenberg.org/ebooks/18269',
    citation: 'Pascal’s Pensées, trans. W.F. Trotter (Project Gutenberg).',
    summary: 'Brilliant seventeenth-century apologetic reflections on human grandeur, wretchedness, and Jesus Christ.',
  },
  {
    title: 'G.K. Chesterton — Orthodoxy',
    author: 'G.K. Chesterton',
    year: '1908',
    repository: 'Project Gutenberg',
    sourceType: 'Treatise',
    url: 'https://www.gutenberg.org/ebooks/130',
    citation: 'G.K. Chesterton, Orthodoxy (Project Gutenberg).',
    summary: 'Classic modern apologetic celebrating the thrilling intellectual adventure of the Apostles’ Creed.',
  },
  {
    title: 'Westminster Confession of Faith & Larger/Shorter Catechisms (1646–1647)',
    author: 'Westminster Assembly of Divines',
    year: '1647',
    repository: 'Creeds & Confessions',
    sourceType: 'Council / Creed',
    url: 'https://www.ccel.org/ccel/schaff/creeds3.iv.xvii.ii.html',
    citation: 'Creeds of Christendom, Vol. III (CCEL).',
    summary: 'Landmark English-speaking Reformed confession covering Scripture, Trinity, Covenant, Justification, and Sacraments.',
  },
  {
    title: 'John of Damascus — Exact Exposition of the Orthodox Faith (De Fide Orthodoxa)',
    author: 'John of Damascus',
    year: 'c. 743',
    repository: 'New Advent',
    sourceType: 'Treatise',
    url: 'https://www.newadvent.org/fathers/3304.htm',
    citation: 'NPNF Series II, Vol. 9 (New Advent).',
    summary: 'Four-book synthesis of Eastern Patristic dogmatics on Trinity, Creation, Christology, and Sacraments.',
  },
  {
    title: 'Perseus Digital Library — Greek New Testament & Classical Lexica (LSJ)',
    author: 'Tufts University Perseus Project',
    year: 'Contemporary',
    repository: 'STEP Bible / Academic',
    sourceType: 'Reference / Lexicon',
    url: 'https://www.perseus.tufts.edu/hopper/',
    citation: 'Perseus Digital Library, Department of Classical Studies, Tufts University.',
    summary: 'Open philological tools including Liddell-Scott-Jones Greek Lexicon, Lewis & Short Latin Dictionary, and primary texts.',
  },
];

async function fetchWithTimeout(url: string, timeoutMs = 3500): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'PaideiaTheologicalLibrary/1.0 (Educational Theological Research)',
        Accept: 'application/json',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function discoverOnlineResources(query: string): Promise<DiscoveredOnlineResource[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return CURATED_ONLINE_CATALOG;
  }

  const results: DiscoveredOnlineResource[] = [];
  const lower = trimmed.toLowerCase();

  // 1. Match curated high-authority repositories first
  for (const item of CURATED_ONLINE_CATALOG) {
    if (
      item.title.toLowerCase().includes(lower) ||
      item.author.toLowerCase().includes(lower) ||
      item.summary.toLowerCase().includes(lower) ||
      item.repository.toLowerCase().includes(lower)
    ) {
      results.push(item);
    }
  }

  // 2. Query Gutendex (Project Gutenberg) and Open Library in parallel
  const [gutenbergRes, openLibRes] = await Promise.allSettled([
    fetchWithTimeout(`https://gutendex.com/books/?search=${encodeURIComponent(trimmed)}`),
    fetchWithTimeout(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(trimmed + ' theology')}&limit=5`
    ),
  ]);

  if (gutenbergRes.status === 'fulfilled' && gutenbergRes.value.ok) {
    try {
      const data = (await gutenbergRes.value.json()) as {
        results?: Array<{
          id: number;
          title: string;
          authors?: Array<{ name: string; birth_year?: number; death_year?: number }>;
          summaries?: string[];
          subjects?: string[];
        }>;
      };
      for (const book of (data.results || []).slice(0, 4)) {
        const authorObj = book.authors?.[0];
        const author = authorObj ? authorObj.name : 'Public Domain Author';
        const year =
          authorObj?.death_year !== undefined
            ? authorObj.death_year < 0
              ? `${Math.abs(authorObj.death_year)} BC`
              : `d. ${authorObj.death_year}`
            : 'Public Domain';
        results.push({
          title: book.title,
          author,
          year,
          repository: 'Project Gutenberg',
          sourceType: 'Primary Text',
          url: `https://www.gutenberg.org/ebooks/${book.id}`,
          citation: `${author}, ${book.title} (Project Gutenberg Ebook #${book.id}).`,
          summary:
            book.summaries?.[0]?.slice(0, 260) ||
            (book.subjects?.slice(0, 3).join('; ') ?? 'Open-access public domain edition on Project Gutenberg.'),
        });
      }
    } catch {
      // Ignore parse errors
    }
  }

  if (openLibRes.status === 'fulfilled' && openLibRes.value.ok) {
    try {
      const data = (await openLibRes.value.json()) as {
        docs?: Array<{
          key: string;
          title: string;
          author_name?: string[];
          first_publish_year?: number;
          subject?: string[];
        }>;
      };
      for (const doc of (data.docs || []).slice(0, 4)) {
        const author = doc.author_name?.[0] || 'Scholarly Edition';
        const year = doc.first_publish_year ? String(doc.first_publish_year) : '';
        results.push({
          title: doc.title,
          author,
          year,
          repository: 'Open Library',
          sourceType: 'Treatise',
          url: `https://openlibrary.org${doc.key}`,
          citation: `${author}, ${doc.title}${year ? ` (${year})` : ''}, Internet Archive / Open Library.`,
          summary: doc.subject
            ? `Subjects: ${doc.subject.slice(0, 4).join(', ')}.`
            : 'Cataloged theological resource via Open Library & Internet Archive.',
        });
      }
    } catch {
      // Ignore parse errors
    }
  }

  if (results.length === 0) {
    // Provide helpful curated search links to CCEL and New Advent for any esoteric Greek/patristic query
    results.push(
      {
        title: `CCEL Search: "${trimmed}" in Early Church Fathers & Classics`,
        author: 'Christian Classics Ethereal Library',
        year: 'Open Archive',
        repository: 'CCEL',
        sourceType: 'Historical Archive',
        url: `https://www.ccel.org/search?qu=${encodeURIComponent(trimmed)}`,
        citation: `CCEL Theological Search for "${trimmed}".`,
        summary: `Search all 1,000+ classic Christian volumes in CCEL for "${trimmed}".`,
      },
      ...CURATED_ONLINE_CATALOG.slice(0, 3)
    );
  }

  return results.slice(0, 10);
}
