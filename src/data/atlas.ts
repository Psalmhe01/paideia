export const eras = [
  { id: 'ancient', label: 'Early Church', start: 30, end: 800 },
  { id: 'medieval', label: 'Medieval', start: 800, end: 1500 },
  { id: 'reformations', label: 'Reformations', start: 1500, end: 1700 },
  { id: 'modern', label: 'Modern & global', start: 1700, end: 2026 },
] as const;

export const historyEvents = [
  { year: 49, date: 'c. 49', type: 'Councils', title: 'Jerusalem Council', place: 'Jerusalem', description: 'Acts recounts deliberation over what should be required of Gentiles joining the Christian community.', source: '/bible/webp/act/15', sourceLabel: 'Acts 15', topic: 'biblical-canon-textual-criticism' },
  { year: 110, date: 'c. 110', type: 'Texts', title: 'Letters of Ignatius', place: 'Eastern Mediterranean', description: 'On the way to Rome, Ignatius writes to congregations about unity, bishops, martyrdom, and the Eucharist.', source: 'https://www.newadvent.org/fathers/0109.htm', sourceLabel: 'Letter to the Smyrnaeans', topic: 'apostolic-fathers' },
  { year: 180, date: 'c. 180', type: 'Texts', title: 'Against Heresies', place: 'Lyons', description: 'Irenaeus appeals to the rule of faith, the public teaching of the churches, and the fourfold Gospel.', source: 'https://www.newadvent.org/fathers/0103303.htm', sourceLabel: 'Against Heresies, book III', topic: 'apostolic-fathers-and-irenaeus' },
  { year: 313, date: '313', type: 'Church & society', title: 'Agreement of Milan', place: 'Roman Empire', description: 'Constantine and Licinius extend religious toleration and order the restoration of property to Christian communities.', source: 'https://sourcebooks.fordham.edu/source/edict-milan.asp', sourceLabel: 'Text preserved by Lactantius' },
  { year: 325, date: '325', type: 'Councils', title: 'First Council of Nicaea', place: 'Nicaea', description: 'The council confesses the Son as of one substance with the Father. Its 325 creed differs in wording from the creed commonly recited today.', source: 'https://www.newadvent.org/fathers/3801.htm', sourceLabel: 'Nicene creed and canons', topic: 'seven-ecumenical-councils' },
  { year: 367, date: '367', type: 'Texts', title: 'Athanasius’s Festal Letter 39', place: 'Alexandria', description: 'The letter names the 27 New Testament books found in the familiar canon today and separately lists works recommended for reading.', source: 'https://www.newadvent.org/fathers/2806039.htm', sourceLabel: 'Festal Letter 39', topic: 'formation-of-the-biblical-canon' },
  { year: 381, date: '381', type: 'Councils', title: 'First Council of Constantinople', place: 'Constantinople', description: 'The council reaffirms Nicene faith. The creed traditionally associated with it explicitly confesses the Holy Spirit as Lord and giver of life.', source: 'https://www.newadvent.org/fathers/3808.htm', sourceLabel: 'Council canons', topic: 'nicene-constantinopolitan-creed' },
  { year: 431, date: '431', type: 'Councils', title: 'Council of Ephesus', place: 'Ephesus', description: 'Debate over the title Theotokos centers on the identity of the one born of Mary. The council deposes Nestorius.', source: 'https://www.newadvent.org/fathers/3810.htm', sourceLabel: 'Council proceedings', topic: 'seven-ecumenical-councils' },
  { year: 451, date: '451', type: 'Councils', title: 'Council of Chalcedon', place: 'Chalcedon', description: 'The council confesses one and the same Christ in two natures. Its reception differs across Christian communions.', source: 'https://www.newadvent.org/fathers/3811.htm', sourceLabel: 'Definition and acts', topic: 'chalcedonian-definition-of-faith' },
  { year: 553, date: '553', type: 'Councils', title: 'Second Council of Constantinople', place: 'Constantinople', description: 'The Three Chapters controversy concerns how to receive Chalcedon in continuity with Cyril’s Christology.', source: 'https://www.newadvent.org/fathers/3812.htm', sourceLabel: 'Council acts', topic: 'seven-ecumenical-councils' },
  { year: 681, date: '680–681', type: 'Councils', title: 'Third Council of Constantinople', place: 'Constantinople', description: 'The council affirms divine and human wills and operations in the one Christ.', source: 'https://www.newadvent.org/fathers/3813.htm', sourceLabel: 'Conciliar definition', topic: 'seven-ecumenical-councils' },
  { year: 787, date: '787', type: 'Councils', title: 'Second Council of Nicaea', place: 'Nicaea', description: 'The council defends honor shown to sacred images while reserving worship for God.', source: 'https://www.newadvent.org/fathers/3819.htm', sourceLabel: 'Council acts', topic: 'seven-ecumenical-councils' },
  { year: 1054, date: '1054', type: 'Church & society', title: 'Excommunications of 1054', place: 'Rome and Constantinople', description: 'The excommunications become a conventional marker in the longer estrangement between Greek East and Latin West.', source: 'https://www.vatican.va/content/paul-vi/en/speeches/1965/documents/hf_p-vi_spe_19651207_common-declaration.html', sourceLabel: 'Joint declaration of 1965', topic: 'great-schism-1054' },
  { year: 1270, date: 'c. 1265–1274', type: 'Texts', title: 'Summa Theologiae', place: 'Western Europe', description: 'Thomas Aquinas organizes theology by questions, objections, replies, and argument. The work is left unfinished at his death.', source: 'https://www.newadvent.org/summa/', sourceLabel: 'Read the Summa', topic: 'cosmological-and-teleological-arguments' },
  { year: 1517, date: '1517', type: 'Church & society', title: 'Ninety-five Theses', place: 'Wittenberg', description: 'Martin Luther circulates theses on indulgences. The ensuing disputes widen to encompass church authority, penance, and justification.', source: 'https://www.gutenberg.org/ebooks/274', sourceLabel: 'Read Luther’s theses', topic: 'protestant-reformation-and-solas' },
  { year: 1530, date: '1530', type: 'Texts', title: 'Augsburg Confession', place: 'Augsburg', description: 'The confession presents the teaching and reforms of Lutheran churches to the imperial Diet.', source: 'https://bookofconcord.org/augsburg-confession/', sourceLabel: 'Augsburg Confession', topic: 'reformation-confessions-and-catechisms' },
  { year: 1545, date: '1545–1563', type: 'Councils', title: 'Council of Trent', place: 'Trent', description: 'The council addresses Scripture and tradition, justification, sacraments, and reforms of clerical and episcopal life.', source: 'https://www.papalencyclicals.net/councils/trent.htm', sourceLabel: 'Decrees of Trent', topic: 'reformation-and-counter-reformation' },
  { year: 1738, date: '1738', type: 'Church & society', title: 'Wesley at Aldersgate', place: 'London', description: 'John Wesley’s account of assurance at Aldersgate becomes a touchstone in Methodist memory.', source: 'https://www.umc.org/en/content/ask-the-umc-what-is-aldersgate-day', sourceLabel: 'United Methodist account' },
  { year: 1906, date: '1906', type: 'Church & society', title: 'Azusa Street Revival', place: 'Los Angeles', description: 'An interracial revival associated with William J. Seymour becomes an influential center of early Pentecostalism.', source: 'https://ifphc.org/-/media/FPHC/Heritage-Magazine/2005_04.pdf', sourceLabel: 'Heritage archive on Azusa Street' },
  { year: 1962, date: '1962–1965', type: 'Councils', title: 'Second Vatican Council', place: 'Rome', description: 'The Catholic council issues documents on liturgy, revelation, religious freedom, ecumenism, and the church in the modern world.', source: 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/index.htm', sourceLabel: 'Vatican II documents' },
  { year: 1999, date: '1999', type: 'Church & society', title: 'Joint Declaration on Justification', place: 'Augsburg', description: 'The Lutheran World Federation and Catholic Church articulate a consensus on basic truths of justification while recording differences in expression.', source: 'https://www.christianunity.va/content/unitacristiani/en/dialoghi/sezione-occidentale/luterani/dialogo/documenti-di-dialogo/1999-dichiarazione-congiunta-sulla-dottrina-della-giustificazion.html', sourceLabel: 'Joint declaration', topic: 'justification-and-union-with-christ' },
];

export const conceptCharts = [
  {
    id: 'atonement', title: 'Models of atonement', question: 'What does Christ’s saving work accomplish?',
    explanation: 'These motifs often coexist in the same author or confession. The chart compares their emphases.',
    topic: 'theories-of-atonement', labels: ['Human predicament', 'Emphasis', 'Outcome'],
    rows: [
      { name: 'Recapitulation', cells: ['Humanity’s disobedience in Adam', 'Christ relives human life in obedience', 'Human life renewed in Christ'], passage: 'Romans 5:12–21', reading: 'Irenaeus, Against Heresies III.18', url: 'https://www.newadvent.org/fathers/0103318.htm' },
      { name: 'Christus Victor', cells: ['Bondage to death and hostile powers', 'Christ defeats the powers through death and resurrection', 'Liberation and life'], passage: 'Colossians 2:13–15', reading: 'Athanasius, On the Incarnation', url: 'https://www.newadvent.org/fathers/2802.htm' },
      { name: 'Satisfaction', cells: ['Sin disorders humanity’s relation to God', 'The God-man offers an act of obedience of surpassing worth', 'The order of justice is restored'], passage: 'Romans 3:23–26', reading: 'Anselm, Why God Became Man', url: 'https://ccel.org/ccel/anselm/basic_works/basic_works' },
      { name: 'Penal substitution', cells: ['Guilt and liability to judgment', 'Christ bears the judgment of sinners in their place', 'Pardon and reconciliation'], passage: 'Galatians 3:10–14', reading: 'Westminster Confession, chapter 8', url: 'https://opc.org/wcf.html#Chapter_08' },
      { name: 'Moral influence', cells: ['Alienation and disordered love', 'Christ’s self-giving discloses divine love', 'A life reoriented toward God and neighbor'], passage: '1 John 4:7–12', reading: 'Explore atonement in the curriculum', url: '/study/theories-of-atonement' },
    ],
  },
  {
    id: 'interpretation', title: 'Reading Scripture', question: 'What does each way of reading bring into focus?',
    explanation: 'Apply the lenses to the same text. The examples use the crossing of the sea and its reception in 1 Corinthians.',
    topic: 'grammatical-historical-and-canonical-method', labels: ['Starting point', 'Question to ask', 'Worked example'],
    rows: [
      { name: 'Literary and historical', cells: ['Genre and narrative setting', 'What is the passage doing in Exodus?', 'Israel escapes Egyptian pursuit and sees the LORD’s deliverance.'], passage: 'Exodus 14:10–31', reading: 'Grammatical-historical study module', url: '/study/grammatical-historical-and-canonical-method' },
      { name: 'Typological', cells: ['A pattern picked up elsewhere in Scripture', 'How does a later biblical writer use the event?', 'Paul describes Israel as baptized into Moses in the cloud and sea.'], passage: '1 Corinthians 10:1–13', reading: 'Typology study module', url: '/study/typology-and-christocentric-hermeneutics' },
      { name: 'Moral', cells: ['Formation and practice', 'How does the reading shape a community’s conduct?', 'Paul uses the wilderness generation to warn a baptized community against presumption.'], passage: '1 Corinthians 10:6–14', reading: 'Fourfold interpretation module', url: '/study/alexandria-antioch-and-quadriga' },
    ],
  },
  {
    id: 'millennium', title: 'Millennial views', question: 'How does Revelation 20 relate to Christ’s return?',
    explanation: 'These sequences represent common forms of each reading. Revelation’s imagery, the relation of chapters 19 and 20, and the meaning of the first resurrection drive the differences.',
    topic: 'millennial-views', labels: ['Before the return', 'Millennium', 'Consummation'],
    rows: [
      { name: 'Historic premillennialism', cells: ['The church endures tribulation', 'Christ returns before the millennial reign', 'Final judgment and new creation follow'], passage: 'Revelation 20:1–10', reading: 'Irenaeus, Against Heresies V.32', url: 'https://www.newadvent.org/fathers/0103532.htm' },
      { name: 'Amillennialism', cells: ['The church lives between the two advents', 'The thousand years symbolize a present reign', 'Christ returns for resurrection and judgment'], passage: 'Revelation 20:1–10', reading: 'Augustine, City of God XX', url: 'https://www.newadvent.org/fathers/120120.htm' },
      { name: 'Postmillennialism', cells: ['The gospel gains widespread influence in history', 'A long period of gospel flourishing precedes the return', 'Christ returns for resurrection and judgment'], passage: 'Matthew 13:31–33', reading: 'Millennial views study module', url: '/study/millennial-views' },
    ],
  },
];
