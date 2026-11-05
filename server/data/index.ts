import merged from './mergedCurriculum.json' with { type: 'json' };
import type { SeedTopicSpec, SeedDisciplineSpec, SeedGlossarySpec } from '../types.js';
import { SEED_DISCIPLINES, SEED_GLOSSARY } from './disciplinesAndGlossary.js';
import { TOPICS_APOLOGETICS_SOTERIOLOGY } from './topicsApologeticsSoteriology.js';
import { TOPICS_DOCTRINE_HERMENEUTICS } from './topicsDoctrineHermeneutics.js';
import { TOPICS_HISTORY_BIBLE_PATRISTICS } from './topicsHistoryBiblePatristics.js';

const CAPPADOCIAN_TOPIC: SeedTopicSpec = {
  slug: 'cappadocian-golden-age-fathers',
  disciplineSlug: 'church-fathers',
  title: 'Athanasius & The Cappadocian Fathers (4th-Century Greek East)',
  subtitle: 'Athanasius Contra Mundum, Basil the Great, Gregory of Nazianzus, Gregory of Nyssa & Macrina',
  summary:
    'Examines the fourth-century Greek theologians who championed Nicene orthodoxy, pioneered Christian hospital mercy, and articulated Trinitarian grammar and contemplative spirituality.',
  difficulty: 'Intermediate',
  readingMinutes: 16,
  era: 'Nicene Golden Age (AD 325–394)',
  scriptureRefs: ['John 1:1–18', '2 Corinthians 3:17–18', 'Hebrews 1:1–3'],
  sections: [
    {
      heading: 'Athanasius of Alexandria: Pillar of Orthodoxy',
      body: 'Present as a young deacon alongside Bishop Alexander at Nicaea in 325, Athanasius succeeded to the see of Alexandria in 328 and spent forty-five years defending the full deity of the Son against imperial Arian pressure—earning Jerome’s tribute Athanasius contra mundum ("Athanasius against the world"). His twin early treatises Against the Heathen and On the Incarnation, along with his Orations Against the Arians, Letters to Serapion on the Holy Spirit, and Life of Antony (which sparked Christian monasticism East and West), bound theology inextricably to worship and salvation: if the Son or Spirit were creatures, humanity could neither truly know God nor be united to God.',
      keyTakeaway:
        'Athanasius always argued soteriologically: only God Himself can save and deify fallen creatures.',
    },
    {
      heading: 'The Cappadocian Family Circle: Macrina, Basil & The Two Gregories',
      body: 'In central Anatolia (Cappadocia), an extraordinary Christian household and friendship reshaped world theology: Macrina the Younger (c. 327–379)—revered by her brothers as "the Teacher"—converted the family estate at Annisa into an ascetic community of prayer and care for orphans; her brother Basil of Caesarea (330–379) authored On the Holy Spirit, liturgical prayers, monastic rules, and constructed the Basiliad—the ancient world’s premier charitable hospital-city for lepers, travelers, and the poor; their younger brother Gregory of Nyssa (c. 335–395) penned The Life of Moses and profound anti-slavery and Trinitarian treatises; and Basil’s Athenian university companion Gregory of Nazianzus (329–390) delivered the Five Theological Orations in Constantinople (380) that paved the road to the Council of 381.',
      keyTakeaway:
        'The Cappadocians demonstrated that the highest speculative Trinitarian contemplation belongs hand-in-hand with sacrificial care for the poor.',
    },
    {
      heading: 'Apophatic Humility & Cataphatic Confession',
      body: 'Against the hyper-rationalist Neo-Arian Eunomius—who boasted that he knew God’s essence as exhaustively as God knows Himself—Basil and the Gregories balanced Cataphatic Theology (affirming what God has truly revealed of His attributes and Triune Persons) with Apophatic Humility (recognizing that God’s infinite Essence infinitely transcends finite creaturely comprehension). As Gregory of Nyssa portrayed Moses ascending Mount Sinai into the luminous cloud in The Life of Moses, knowing the infinite God is an unending eternal journey of wonder (epektasis, Philippians 3:13).',
      keyTakeaway:
        'Orthodox theology confesses true revealed knowledge of God while bowing in reverent awe before God’s inexhaustible mystery.',
    },
  ],
  excerpts: [
    {
      author: 'Basil of Caesarea',
      work: 'Epistle 234 (Against Eunomius on Knowing God)',
      year: 'c. 376',
      quote:
        'We know our God from His operations [energeiai], but do not undertake to approach near to His essence. His operations come down to us, but His essence remains beyond our reach.',
      citation: 'Epistle 234.1',
      sourceUrl: 'https://www.newadvent.org/fathers/3202234.htm',
    },
    {
      author: 'Gregory of Nazianzus',
      work: 'Oration 27 (First Theological Oration), Section 3',
      year: '380',
      quote:
        'Not to every one, my friends, does it belong to philosophize about God; not to every one; the Subject is not so cheap and low... It is for those who have been examined, and are passed masters in meditation, and who have been previously purified in soul and body, or at the very least are being purified.',
      citation: 'Oration 27.3',
      sourceUrl: 'https://www.newadvent.org/fathers/310227.htm',
    },
  ],
  perspectives: [
    {
      tradition: 'Eastern Patristic & Contemplative',
      proponent: 'Gregory of Nyssa, Maximus the Confessor',
      summary:
        'Celebrates epektasis—eternal joyful stretching forward into the infinite beauty of the Triune God—and apophatic reverence.',
    },
    {
      tradition: 'Ecumenical Nicene Heritage',
      proponent: 'Thomas F. Torrance, Khaled Anatolios, Christopher Beeley',
      summary:
        'Recognizes Athanasius and the Cappadocians as the indispensable architects of universal Nicene-Constantinopolitan orthodoxy.',
    },
  ],
  keyTerms: [
    {
      term: 'Apophatic vs. Cataphatic',
      originalScript: 'ἀποφατικός / καταφατικός',
      transliteration: 'apophatic / cataphatic',
      definition: 'Speaking of God by negating creaturely limitations (immortal, invisible, ineffable) vs. affirming positive revealed attributes (good, wise, Father).',
    },
    {
      term: 'Epektasis',
      originalScript: 'ἐπέκτασις',
      transliteration: 'epektasis',
      definition: 'Gregory of Nyssa’s term (from Phil 3:13) for the soul’s never-ending growth in love and delight in the infinite God throughout eternity.',
    },
  ],
  relatedTopicSlugs: ['trinity-theology-proper', 'seven-ecumenical-councils', 'latin-doctors-augustine'],
  sources: [
    {
      title: 'Gregory of Nazianzus — The Five Theological Orations (Orations 27–31)',
      author: 'Gregory of Nazianzus',
      year: '380',
      repository: 'New Advent',
      sourceType: 'Treatise',
      url: 'https://www.newadvent.org/fathers/310227.htm',
      citation: 'Nicene and Post-Nicene Fathers II, Vol. 7 (New Advent).',
      summary: 'Masterwork of fourth-century Trinitarian rhetoric delivered at the Chapel of the Anastasia in Constantinople.',
    },
    {
      title: 'Athanasius — Select Works and Letters (NPNF II, Vol. 4)',
      author: 'Athanasius of Alexandria',
      year: 'c. 318–373',
      repository: 'CCEL',
      sourceType: 'Treatise',
      url: 'https://www.ccel.org/ccel/schaff/npnf204.html',
      citation: 'Nicene and Post-Nicene Fathers, Second Series, Vol. 4 (CCEL).',
      summary: 'Includes Against the Heathen, On the Incarnation, Life of Antony, Four Discourses Against the Arians, and Festal Letters.',
    },
  ],
  attachments: [
    {
      key: 'cappadocian-theological-orations-guide',
      title: 'Study Companion to Gregory’s Five Theological Orations & The Basiliad',
      description: 'Overview of Orations 27–31, Macrina’s ascetic leadership, and Basil’s hospital ministry.',
      attachmentKind: 'Study Guide PDF',
      format: 'pdf',
      linkedSourceIndex: 0,
      documentTitle: 'The Cappadocian Achievement: Trinity, Contemplation & Mercy',
      documentSubtitle: 'Paideia Greek Patristics Study Guide',
      sections: [
        {
          heading: 'Structure of Gregory of Nazianzus’s Five Theological Orations (AD 380)',
          content:
            '- Oration 27: Spiritual preparation and humility required for theological discourse against Eunomian hubris.\n- Oration 28: Natural contemplation and the incomprehensibility of the Divine Essence.\n- Oration 29: On the Son — resolving biblical passages on eternal deity and incarnate economy.\n- Oration 30: Continued Christological exegesis of "problem texts" cited by Arians (Prov 8:22; John 14:28).\n- Oration 31: On the Holy Spirit — confessing explicitly: "Is the Spirit God? Most certainly! Is He consubstantial? Yes, if He is God!"',
        },
      ],
    },
  ],
  questions: [
    {
      questionType: 'multiple_choice',
      difficulty: 'Foundational',
      prompt: 'Who are traditionally known as the three "Cappadocian Fathers" (alongside their sister and mentor Macrina the Younger)?',
      options: [
        'Basil of Caesarea, Gregory of Nazianzus, and Gregory of Nyssa',
        'Ambrose, Jerome, and Augustine',
        'Clement, Origen, and Cyril',
        'Ignatius, Polycarp, and Irenaeus',
      ],
      correctIndex: 0,
      explanation: 'Basil the Great, his brother Gregory of Nyssa, and his friend Gregory of Nazianzus (mentored in the family household alongside Macrina) are the Cappadocian Fathers.',
      sourceReference: '4th-Century Cappadocian Patristics',
    },
    {
      questionType: 'multiple_choice',
      difficulty: 'Intermediate',
      prompt: 'What groundbreaking charitable institution did Basil the Great build outside Caesarea around AD 370?',
      options: [
        'The Basiliad — a vast public hospital, hospice, and poorhouse caring freely for lepers, the sick, and strangers',
        'An imperial amphitheater',
        'A military fortress',
        'A private library closed to the poor',
      ],
      correctIndex: 0,
      explanation: 'Gregory of Nazianzus praised Basil’s Basiliad as a "new city" of mercy that revolutionized healthcare in late antiquity.',
      sourceReference: 'Gregory of Nazianzus, Oration 43.63 (Panegyric on St. Basil)',
    },
    {
      questionType: 'term_identification',
      difficulty: 'Intermediate',
      prompt: 'What Greek term refers to safeguarding God’s transcendence by stating what God is NOT (e.g., invisible, immortal, incomprehensible) in response to Eunomius’s rationalist pride?',
      options: ['Apophatic theology', 'Synoptic theology', 'Dispensational theology', 'Etymological theology'],
      correctIndex: 0,
      explanation: 'Apophatic theology (via negativa) complements Cataphatic theology (positive revealed affirmations) to honor divine mystery.',
      sourceReference: 'Basil, Epistle 234; Gregory of Nazianzus, Oration 28',
    },
    {
      questionType: 'multiple_choice',
      difficulty: 'Foundational',
      prompt: 'Which biography written by Athanasius (~AD 357) played a pivotal role in inspiring Christian monasticism across both East and West (including Augustine’s conversion)?',
      options: ['The Life of Antony (Vita Antonii)', 'The Rule of Benedict', 'Confessions', 'Ecclesiastical History'],
      correctIndex: 0,
      explanation: 'Athanasius’s Life of Antony spread rapidly into Latin and directly stirred Pontitianus and Augustine in Confessions Book VIII.',
      sourceReference: 'Athanasius, Vita Antonii; Augustine, Confessions VIII.6',
    },
    {
      questionType: 'term_identification',
      difficulty: 'Advanced',
      prompt: 'Drawn from Philippians 3:13, what Greek term did Gregory of Nyssa use in The Life of Moses for the soul’s unending, joyful progression into the infinite God?',
      options: ['Epektasis', 'Anathema', 'Adiaphora', 'Kerygma'],
      correctIndex: 0,
      explanation: 'Because God’s goodness is infinite, Gregory of Nyssa taught that eternal beatitude is never static boredom, but joyful epektasis ("stretching forward").',
      sourceReference: 'Gregory of Nyssa, The Life of Moses',
    },
  ],
};

export const ALL_SEED_DISCIPLINES: SeedDisciplineSpec[] = [
  ...SEED_DISCIPLINES,
  { slug: 'creeds-confessions', name: 'Creeds & Confessions', greekTitle: 'Σύμβολα Πίστεως', transliteration: 'Symbola pisteōs',
    subtitle: 'The faith churches confess', description: 'Read conciliar definitions, ecumenical creeds, and Reformation catechisms in historical context.', icon: 'ScrollText', accentColor: 'amber', sortOrder: 9 },
  { slug: 'ecclesiology', name: 'Church & Sacraments', greekTitle: 'Ἐκκλησία', transliteration: 'Ekklēsia',
    subtitle: 'The Christian community in worship', description: 'Explore church order, ministry, baptism, and the Eucharist across Christian traditions.', icon: 'Landmark', accentColor: 'teal', sortOrder: 10 },
  { slug: 'eschatology', name: 'Eschatology', greekTitle: 'Ἔσχατα', transliteration: 'Eschata',
    subtitle: 'Christian hope and the last things', description: 'Study resurrection, judgment, new creation, and ways of reading Revelation.', icon: 'Compass', accentColor: 'indigo', sortOrder: 11 },
];
export const ALL_SEED_TOPICS: SeedTopicSpec[] = [
  ...TOPICS_APOLOGETICS_SOTERIOLOGY,
  ...TOPICS_DOCTRINE_HERMENEUTICS,
  ...TOPICS_HISTORY_BIBLE_PATRISTICS.slice(0, 8),
  CAPPADOCIAN_TOPIC,
  ...TOPICS_HISTORY_BIBLE_PATRISTICS.slice(8),
  ...(merged.topics as SeedTopicSpec[]),
];

const glossary = new Map<string, SeedGlossarySpec>();
for (const entry of [...SEED_GLOSSARY, ...merged.glossary as SeedGlossarySpec[]]) {
  if (!glossary.has(entry.term.toLowerCase())) glossary.set(entry.term.toLowerCase(), entry);
}
for (const topic of ALL_SEED_TOPICS) {
  for (const entry of topic.keyTerms) {
    const key = entry.term.toLowerCase();
    if (!glossary.has(key)) glossary.set(key, {
      ...entry, language: 'Theology', originalScript: entry.originalScript ?? '',
      transliteration: entry.transliteration ?? '', pronunciation: '',
      category: topic.title, relatedTopicSlug: topic.slug,
    });
  }
}
export const ALL_SEED_GLOSSARY = [...glossary.values()];
