export const editorialImages = {
  sanctuary: {
    src: 'https://images.unsplash.com/photo-1532631746401-3649fa2fe050?auto=format&fit=crop&w=2200&q=85',
    alt: 'Gothic church interior lit by stained glass',
    credit: 'https://unsplash.com/photos/a-group-of-people-inside-of-a-concrete-cathedral-pufWmDu1UFQ',
  },
  scripture: {
    src: 'https://images.unsplash.com/photo-1567017013860-2ad167f23bce?auto=format&fit=crop&w=1800&q=85',
    alt: 'An old Bible opened on a wooden table',
    credit: 'https://unsplash.com/photos/ouvrir-la-bible-JbuOoT7dNVg',
  },
  history: {
    src: 'https://images.unsplash.com/photo-1732895886052-7788d86d266e?auto=format&fit=crop&w=1800&q=85',
    alt: 'Ancient stone columns beside a church dome in Rome',
    credit: 'https://unsplash.com/photos/a-large-building-with-a-tall-tower-next-to-a-cemetery-6i1cLvhp9Vc',
  },
  library: {
    src: 'https://images.unsplash.com/photo-1755675673436-874fbed2dd32?auto=format&fit=crop&w=1800&q=85',
    alt: 'Rows of antique books on dark wooden library shelves',
    credit: 'https://unsplash.com/photos/rows-of-antique-books-fill-library-shelves-gz_abaSsT7g',
  },
  manuscript: {
    src: 'https://digmanclass.universiteitleiden.nl/assets/img/010_Leiden_VLO_3_64r.jpg',
    alt: 'A medieval manuscript leaf with handwritten text on parchment',
    credit: 'https://digmanclass.universiteitleiden.nl/glossary/',
  },
  classical: {
    src: 'https://images.unsplash.com/photo-1577543599916-551c9c4c1ca8?auto=format&fit=crop&w=1800&q=85',
    alt: 'The Parthenon’s ancient marble columns on the Athenian Acropolis',
    credit: 'https://unsplash.com/photos/low-angle-photography-of-the-parthenon-during-daytime-QEqZDccvsPE',
  },
  orthodox: {
    src: 'https://images.unsplash.com/photo-1602376531381-e2bc41a27f74?auto=format&fit=crop&w=1800&q=85',
    alt: 'A Byzantine-style church interior with icons and a mosaic of Christ',
    credit: 'https://unsplash.com/s/photos/orthodox-church',
  },
  worship: {
    src: 'https://images.unsplash.com/photo-1587860158411-3b6ed707494c?auto=format&fit=crop&w=1800&q=85',
    alt: 'A quiet church nave with a wooden bench, candles, and stained glass',
    credit: 'https://unsplash.com/photos/brown-wooden-church-bench-in-church-s1e-WAeF3QQ',
  },
  printing: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Atelier-d%27impression-par-Jan-Van-der-Straet-XVIe.jpg/1280px-Atelier-d%27impression-par-Jan-Van-der-Straet-XVIe.jpg',
    alt: 'A sixteenth-century engraving of a printing workshop with a hand press',
    credit: 'https://commons.wikimedia.org/wiki/File:Atelier-d%27impression-par-Jan-Van-der-Straet-XVIe.jpg',
  },
} as const;

export function studyImageFor(disciplineSlug: string, topic = '') {
  const subject = `${disciplineSlug} ${topic}`.toLowerCase();
  if (/reformation|luther|calvin|protestant|printing press|95 theses|confession/.test(subject)) return editorialImages.printing;
  if (/orthodox|byzantine|icon|trinity|nicene|arian|cappadoc|christology/.test(subject)) return editorialImages.orthodox;
  if (/baptism|eucharist|sacrament|liturgy|worship|prayer|monastic|devotion/.test(subject)) return editorialImages.worship;
  if (/manuscript|textual criticism|paleograph|scrib|copying|transmission|codex/.test(subject)) return editorialImages.manuscript;
  if (/greek|plato|aristotle|anselm|aquinas|natural theology|apologetic|cosmological|ontological|teleological|philosoph/.test(subject)) return editorialImages.classical;
  if (/millennium|eschatology|resurrection|judgment|new creation|apocalypse/.test(subject)) return editorialImages.orthodox;
  if (/scripture|bible|canon|translation|exegesis|hermeneutic|hebrew|gospel|testament/.test(subject)) return editorialImages.scripture;
  if (/church.?history|patristic|church fathers|council|creed|schism|medieval|apostolic/.test(subject)) return editorialImages.history;
  if (/atonement|soteriology|salvation|theology|doctrine|god|christ/.test(subject)) return editorialImages.sanctuary;
  if (disciplineSlug.includes('history') || disciplineSlug.includes('patristic')) return editorialImages.history;
  if (disciplineSlug.includes('bible') || disciplineSlug.includes('hermeneutic')) return editorialImages.scripture;
  if (disciplineSlug.includes('doctrine') || disciplineSlug.includes('soteriology')) return editorialImages.sanctuary;
  return editorialImages.library;
}
