import type { SeedTopicSpec } from '../types.js';

export const TOPICS_HISTORY_BIBLE_PATRISTICS: SeedTopicSpec[] = [
  // =========================================================================
  // CHURCH HISTORY
  // =========================================================================
  {
    slug: 'seven-ecumenical-councils',
    disciplineSlug: 'church-history',
    title: 'The Seven Ecumenical Councils (AD 325–787)',
    subtitle: 'From Nicaea I and Constantinople I to Ephesus, Chalcedon, and Nicaea II',
    summary:
      'Chronicles the conciliar era in which bishops from across the Christian world forged classical Trinitarian and Christological orthodoxy amid imperial and theological turmoil.',
    difficulty: 'Foundational',
    readingMinutes: 17,
    era: 'Patristic / Conciliar Era (325–787)',
    scriptureRefs: ['Acts 15:1–29', '1 Timothy 3:15–16', 'Jude 3'],
    sections: [
      {
        heading: 'Nicaea I (325) & Constantinople I (381): Securing the Trinity',
        body: 'Patterned after the Apostolic Council of Jerusalem (Acts 15), ecumenical ("worldwide") councils convened to resolve acute doctrinal crises. When the Alexandrian presbyter Arius sang "There was once when the Son was not," Emperor Constantine convened ~318 bishops—many bearing scars from Diocletian’s persecution—at Nicaea in 325. Nicaea confessed the Son as "true God of true God, begotten, not made, homoousios with the Father." After half a century of Arian imperial backlash withstood heroically by Athanasius (Athanasius contra mundum), the First Council of Constantinople (381) reaffirmed Nicaea, condemned Apollinarianism, and completed the Nicene-Constantinopolitan Creed’s confession of the Holy Spirit.',
        keyTakeaway:
          'The first two Ecumenical Councils gave the universal Church its enduring Trinitarian rule of faith and worship.',
      },
      {
        heading: 'Ephesus (431), Chalcedon (451) & Constantinople II–III (553, 681)',
        body: 'Once the Son’s full deity was settled, fifth- to seventh-century debates shifted to how deity and humanity unite in Jesus. Ephesus (431), led by Cyril of Alexandria against Nestorius, upheld Christ’s personal unity and affirmed Mary as Theotokos ("God-bearer") because the child born of her is personally God the Word. Twenty years later, Chalcedon (451) rejected Eutyches’s opposite extreme (swallowing Christ’s humanity into divinity), proclaiming one Person in two complete natures. Constantinople II (553) reinforced Cyrillian-Chalcedonian unity ("One of the Holy Trinity suffered in the flesh"), and Constantinople III (681) condemned Monothelitism, affirming Christ’s two natural wills.',
        keyTakeaway:
          'Councils III through VI systematically protected both the undivided Person and the unconfused divine and human natures of the Redeemer.',
      },
      {
        heading: 'Nicaea II (787) & Diverse Reception of the Councils',
        body: 'The Seventh Ecumenical Council, Nicaea II (787), addressed the Byzantine Iconoclast Controversy, drawing upon John of Damascus’s Incarnational argument: while the invisible Father could never be depicted under the Old Covenant, the eternal Word truly became visible, tangible flesh; therefore, honoring (proskynesis of honor, sharply distinguished from latreia—adoration owed strictly to God alone) depictions of Christ witnesses to the reality of the Incarnation. Historically, Eastern Orthodoxy and Roman Catholicism receive all seven councils as ecumenical; Oriental Orthodoxy receives the first three; and Reformation Protestantism honors the first four (and Christological decrees of V–VI) insofar as they faithfully expound Holy Scripture.',
        keyTakeaway:
          'Even where traditions differ on conciliar infallibility or Nicaea II, the Trinitarian and Christological core of the early councils unites global Christianity.',
      },
    ],
    excerpts: [
      {
        author: 'Eusebius / Symbol of Nicaea',
        work: 'Original Creed of the First Council of Nicaea',
        year: '325',
        quote:
          'We believe in one God, the Father Almighty, Maker of all things visible and invisible. And in one Lord Jesus Christ, the Son of God, begotten of the Father, Light of Light, very God of very God, begotten, not made, being of one substance (homoousion) with the Father.',
        citation: 'Creed of Nicaea (AD 325)',
        sourceUrl: 'https://www.newadvent.org/fathers/3801.htm',
      },
      {
        author: 'John of Damascus',
        work: 'Apologia Against Those Who Decry Holy Images, Part I',
        year: 'c. 730',
        quote:
          'In former times God, who is without form or body, could never be depicted. But now when God is seen in the flesh conversing with men, I make an image of the God whom I see. I do not worship matter; I worship the Creator of matter, who became matter for my sake.',
        citation: 'On Holy Images I.16',
        sourceUrl: 'https://www.ccel.org/ccel/damascus/icons.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Eastern Orthodox & Roman Catholic',
        proponent: 'John of Damascus, Conciliar Tradition',
        summary:
          'Reveres all Seven Ecumenical Councils as Spirit-guided dogmatic milestones binding upon the universal Church.',
      },
      {
        tradition: 'Protestant / Reformed & Anglican',
        proponent: 'Martin Luther (On the Councils and the Church), Richard Hooker, Calvin',
        summary:
          'Warmly embraces the first four (and Christological V–VI) councils because their decrees accord with Scripture, while critiquing Nicaea II.',
      },
    ],
    keyTerms: [
      {
        term: 'Oikoumene',
        originalScript: 'οἰκουμένη',
        transliteration: 'oikoumene',
        definition: '"The inhabited world"—the Greek root of "ecumenical," signifying councils representing the whole worldwide Church.',
      },
      {
        term: 'Latreia vs. Dulia / Timetike Proskynesis',
        originalScript: 'λατρεία / προσκύνησις',
        transliteration: 'latreia / proskynesis',
        definition: 'Nicaea II’s distinction between supreme worship/adoration owed solely to the Triune God (latreia) and relative honor/respect.',
      },
    ],
    relatedTopicSlugs: ['trinity-theology-proper', 'christology-hypostatic-union', 'cappadocian-golden-age-fathers'],
    sources: [
      {
        title: 'The Seven Ecumenical Councils of the Undivided Church (NPNF II, Vol. 14)',
        author: 'Henry R. Percival (ed.)',
        year: '325–787',
        repository: 'CCEL',
        sourceType: 'Council / Creed',
        url: 'https://www.ccel.org/ccel/schaff/npnf214.html',
        citation: 'Nicene and Post-Nicene Fathers, Second Series, Vol. 14 (CCEL).',
        summary: 'Complete English translations, canons, and historical introductions for all Seven Ecumenical Councils.',
      },
      {
        title: 'First Council of Nicaea — Canons & Creed (AD 325)',
        author: 'Fathers of Nicaea',
        year: '325',
        repository: 'New Advent',
        sourceType: 'Council / Creed',
        url: 'https://www.newadvent.org/fathers/3801.htm',
        citation: 'NPNF II, Vol. 14 (New Advent).',
        summary: 'Primary texts from AD 325 including the Nicene Creed, synodal letter, and twenty disciplinary canons.',
      },
    ],
    attachments: [
      {
        key: 'seven-councils-timeline-pdf',
        title: 'Chronological Master Chart of the Seven Ecumenical Councils',
        description: 'Printable PDF study chart detailing year, emperor, key theologians, central heresy refuted, and doctrinal achievement of all 7 councils.',
        attachmentKind: 'Diagram / Chart',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'The Seven Ecumenical Councils (AD 325–787)',
        documentSubtitle: 'Paideia Church History Reference Companion',
        sections: [
          {
            heading: 'Conciliar Chronology at a Glance',
            content:
              '1. Nicaea I (325) — Refuted Arius; affirmed Son is homoousios with the Father.\n2. Constantinople I (381) — Refuted Macedonians/Pneumatomachians & Apollinarius; affirmed full Deity of the Holy Spirit.\n3. Ephesus (431) — Refuted Nestorius & Pelagius; affirmed unity of Christ’s Person & Mary as Theotokos.\n4. Chalcedon (451) — Refuted Eutyches (Monophysitism); defined two complete natures in one Person/Hypostasis.\n5. Constantinople II (553) — Three Chapters; reinforced Cyrillian interpretation of Chalcedon.\n6. Constantinople III (681) — Refuted Monothelitism; affirmed Christ’s two natural wills (Dyothelitism).\n7. Nicaea II (787) — Addressed Iconoclasm; distinguished latreia (to God alone) from relative honor.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which Ecumenical Council in AD 325 condemned Arius’s teaching ("There was once when the Son was not") and adopted the term homoousios?',
        options: ['First Council of Nicaea', 'Council of Ephesus', 'Second Council of Nicaea', 'Council of Basel'],
        correctIndex: 0,
        explanation: 'Nicaea I (325) convened to settle the Arian controversy, confessing Christ as homoousios ("of one substance") with the Father.',
        sourceReference: 'First Council of Nicaea (AD 325)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Why did the Council of Ephesus (AD 431) affirm the title Theotokos ("God-bearer") against Nestorius?',
        options: [
          'To teach that Mary existed before the creation of the world',
          'To safeguard Christological unity: the one born of Mary according to the flesh is personally the eternal Word of God, not a separate human person',
          'To replace the Nicene Creed',
          'To deny Jesus’s human nature',
        ],
        correctIndex: 1,
        explanation: 'Cyril of Alexandria showed that denying Theotokos splits Christ into two persons; affirming it is fundamentally a Christological confession.',
        sourceReference: 'Council of Ephesus (AD 431); Cyril’s Second Letter to Nestorius',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which theological defender laid the Incarnational groundwork for the Seventh Ecumenical Council (Nicaea II, AD 787)?',
        options: ['John of Damascus', 'Tertullian', 'Clement of Rome', 'Bernard of Clairvaux'],
        correctIndex: 0,
        explanation: 'Writing under Umayyad rule beyond Byzantine imperial reach (~730), John of Damascus argued from the Word becoming visible flesh.',
        sourceReference: 'John of Damascus, On Holy Images',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Advanced',
        prompt: 'What Greek term did Nicaea II reserve strictly and exclusively for supreme adoration owed to the Triune God alone?',
        options: ['Latreia', 'Oikonomia', 'Diakonia', 'Didaskalia'],
        correctIndex: 0,
        explanation: 'Latreia denotes supreme divine worship owed solely to Father, Son, and Holy Spirit.',
        sourceReference: 'Horos of Nicaea II (AD 787)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which New Testament gathering in Jerusalem served as the biblical precedent for synodal and conciliar deliberation in the Church?',
        options: ['Acts 15', 'Acts 27', 'Romans 16', 'Philemon 1'],
        correctIndex: 0,
        explanation: 'In Acts 15, the apostles and elders gathered in council to deliberate over Gentile inclusion and issue a conciliar letter.',
        sourceReference: 'Acts 15:6–29',
      },
    ],
  },

  {
    slug: 'schism-scholasticism-reformation',
    disciplineSlug: 'church-history',
    title: 'The Great Schism (1054), Medieval Scholasticism & The Reformations',
    subtitle: 'East & West, Cathedral Universities, Five Solas, and Confessional Europe',
    summary:
      'Traces the medieval divergence of Greek East and Latin West, the rise of Scholastic theology, and the sixteenth-century Protestant and Catholic Reformations.',
    difficulty: 'Foundational',
    readingMinutes: 18,
    era: 'Medieval & Reformation (1054–1648)',
    scriptureRefs: ['Romans 1:16–17', 'Ephesians 2:8–9', 'John 17:20–23'],
    sections: [
      {
        heading: 'The 1054 East-West Schism: Culture, Ecclesiology & Filioque',
        body: 'Centuries of linguistic drift between the Greek-speaking Byzantine East and Latin-speaking West—compounded by geopolitical rivalry, liturgical differences (leavened vs. unleavened Eucharistic bread), and competing ecclesiologies (papal universal jurisdiction vs. collegial pentarchy of five patriarchates)—culminated in the mutual excommunications of July 1054 between Cardinal Humbert and Patriarch Michael Cerularius (later tragically deepened by the Fourth Crusade’s sack of Constantinople in 1204). Doctrinally, debate centered on the Western addition of Filioque ("and from the Son") to the Creed of 381: the East feared it compromised the Father’s unique role as sole fountainhead of deity, while the West taught the Spirit proceeds from the Father and/through the Son as from a single principle.',
        keyTakeaway:
          'The Great Schism intertwined theological debate over the Filioque with divergent models of papal primacy vs. conciliar collegiality.',
      },
      {
        heading: 'Monastic Renewal & High Medieval Scholasticism',
        body: 'In Western Europe, Benedictine, Cluniac, and Cistercian monasticism (Bernard of Clairvaux) preserved classical manuscripts and devotional theology, followed in the 12th–13th centuries by the mendicant orders (Franciscans and Dominicans) and the birth of universities at Bologna, Paris, and Oxford. Scholasticism was above all a rigorous pedagogical method (quaestio, disputatio, sententiae) harmonizing faith and reason: Peter Lombard’s Four Books of Sentences became the standard textbook, crowned by the Dominican Thomas Aquinas’s Summa Theologiae and Franciscan masterpieces by Bonaventure and Duns Scotus. Meanwhile, pre-Reformation voices such as John Wycliffe in England and Jan Hus in Bohemia called for vernacular Scripture and ecclesial reform.',
        keyTakeaway:
          'Scholasticism created the university system and sought disciplined harmony between biblical revelation and philosophical reason.',
      },
      {
        heading: 'The 16th-Century Reformations & Five Solas',
        body: 'Sparked on October 31, 1517 when Augustinian friar Martin Luther posted his Ninety-Five Theses against indulgence abuses in Wittenberg, the Protestant Reformation unfolded across four distinct streams: Lutheran (Luther, Melanchthon; Augsburg Confession 1530), Reformed (Zwingli in Zurich, Calvin in Geneva, Knox in Scotland; Heidelberg Catechism & Westminster Standards), Radical/Anabaptist (Simons, Sattler; believer’s baptism & separation of church and state), and Anglican (Cranmer, Hooker; Book of Common Prayer & Thirty-Nine Articles). Later summarized in the Five Solas, Magisterial Protestantism confessed Scripture Alone (Sola Scriptura—as supreme infallible norm, while actively quoting the Church Fathers!), Grace Alone (Sola Gratia), Faith Alone (Sola Fide), Christ Alone (Solus Christus), and To the Glory of God Alone (Soli Deo Gloria). Simultaneously, the Catholic Counter-Reformation (Ignatius of Loyola, Teresa of Ávila, Council of Trent 1545–1563) clarified Catholic dogma and reformed clerical education.',
        keyTakeaway:
          'The Reformation sought not to invent a new church, but to reform the catholic Church according to the supreme norm of Holy Scripture.',
      },
    ],
    excerpts: [
      {
        author: 'Martin Luther',
        work: 'Speech at the Imperial Diet of Worms',
        year: 'April 18, 1521',
        quote:
          'Unless I am convinced by the testimony of the Scriptures or by clear reason... I am bound by the Scriptures I have quoted and my conscience is captive to the Word of God. I cannot and I will not recant anything, since it is neither safe nor right to go against conscience.',
        citation: 'Diet of Worms (1521)',
        sourceUrl: 'https://www.ccel.org/ccel/schaff/hcc7.ii.iii.viii.html',
      },
      {
        author: 'Augsburg Confession (Confessio Augustana)',
        work: 'Article IV: Of Justification',
        year: '1530',
        quote:
          'Also they teach that men cannot be justified before God by their own strength, merits, or works, but are freely justified for Christ’s sake, through faith, when they believe that they are received into favor, and that their sins are forgiven for Christ’s sake.',
        citation: 'Augsburg Confession, Art. IV (1530)',
        sourceUrl: 'https://www.ccel.org/ccel/schaff/creeds3.iii.ii.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Magisterial Reformation (Lutheran, Reformed, Anglican)',
        proponent: 'Luther, Melanchthon, Calvin, Cranmer',
        summary:
          'Maintained Nicene-Chalcedonian catholicity and infant baptism while reforming authority (Sola Scriptura), soteriology (Sola Fide), and vernacular worship.',
      },
      {
        tradition: 'Radical Reformation (Anabaptist)',
        proponent: 'Conrad Grebel, Michael Sattler, Menno Simons',
        summary:
          'Advocated credobaptism (believer’s baptism), nonviolence, and a voluntary church wholly free from state coercion.',
      },
      {
        tradition: 'Catholic Reform / Tridentine',
        proponent: 'Council of Trent, Ignatius of Loyola, Robert Bellarmine',
        summary:
          'Reaffirmed Sacred Scripture and Sacred Tradition together under Magisterial interpretation, seven sacraments, and interior renewal.',
      },
    ],
    keyTerms: [
      {
        term: 'Sola Scriptura vs. Nuda Scriptura',
        originalScript: 'sola Scriptura',
        transliteration: 'sola Scriptura',
        definition: 'Scripture is the sole infallible rule of faith (norma normans), while gratefully valuing historic creeds and Fathers—unlike "solo/nuda Scriptura" which discards all tradition.',
      },
      {
        term: 'Quaestio Disputata',
        originalScript: 'quaestio disputata',
        transliteration: 'quaestio disputata',
        definition: 'The Scholastic university method of stating objections fairly, citing authorities, giving a reasoned response (respondeo), and answering each objection.',
      },
    ],
    relatedTopicSlugs: ['seven-ecumenical-councils', 'justification-union-with-christ', 'modern-global-christianity'],
    sources: [
      {
        title: 'Philip Schaff — History of the Christian Church, Vol. VII: Modern Christianity & The German Reformation',
        author: 'Philip Schaff',
        year: '1888',
        repository: 'CCEL',
        sourceType: 'Historical Archive',
        url: 'https://www.ccel.org/ccel/schaff/hcc7.html',
        citation: 'Schaff, History of the Christian Church, Vol. 7 (CCEL).',
        summary: 'Monumental historical narrative and primary-document collection covering Luther, Wittenberg, Worms, and Augsburg.',
      },
      {
        title: 'The Augsburg Confession (1530) & Heidelberg Catechism (1563)',
        author: 'Philip Melanchthon / Zacharias Ursinus & Caspar Olevianus',
        year: '1530 / 1563',
        repository: 'Creeds & Confessions',
        sourceType: 'Council / Creed',
        url: 'https://www.ccel.org/ccel/schaff/creeds3.iii.ii.html',
        citation: 'Creeds of Christendom, Vol. III: Evangelical Protestant Creeds (CCEL).',
        summary: 'Primary texts of the foundational Lutheran and Reformed confessions of the sixteenth century.',
      },
    ],
    attachments: [
      {
        key: 'reformation-streams-guide',
        title: 'Four Streams of the Reformation & The Five Solas Study PDF',
        description: 'Comparative chart of Lutheran, Reformed, Anabaptist, and Anglican streams alongside Tridentine Catholicism.',
        attachmentKind: 'Study Guide PDF',
        format: 'pdf',
        linkedSourceIndex: 1,
        documentTitle: 'Schism, Scholasticism & The 16th-Century Reformations',
        documentSubtitle: 'Paideia Church History Study Companion',
        sections: [
          {
            heading: 'Comparing the Four Protestant Streams + Trent',
            content:
              '- Lutheran (Wittenberg): Consubstantiation/Sacramental Union; Law & Gospel hermeneutic; retains liturgical art not forbidden by Scripture (normative/permissive).\n- Reformed (Zurich & Geneva): Spiritual Real Presence (Calvin); Regulative Principle of Worship; covenantal unity of Old & New Testaments.\n- Anabaptist (Zurich / Schleitheim 1527): Believer’s baptism only; pacifism; strict separation from civil magistrate.\n- Anglican (Canterbury): Via media uniting Reformed soteriology (39 Articles) with historic episcopacy and vernacular Book of Common Prayer.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'In what year did mutual excommunications between legates of Rome and the Patriarch of Constantinople symbolize the East-West Great Schism?',
        options: ['AD 451', 'AD 800', 'AD 1054', 'AD 1517'],
        correctIndex: 2,
        explanation: 'In July 1054, Cardinal Humbert and Patriarch Michael Cerularius issued mutual excommunications in Constantinople.',
        sourceReference: 'East-West Schism (AD 1054)',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'Which Latin clause meaning "and from the Son," added in Western recitations of the Nicene Creed, was a major theological point of contention between East and West?',
        options: ['Filioque', 'Theotokos', 'Sola gratia', 'Magna Carta'],
        correctIndex: 0,
        explanation: 'First inserted at Spanish councils (Toledo, 589) against Arianism, the Filioque became a flashpoint over both pneumatology and conciliar authority.',
        sourceReference: 'Filioque Controversy',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What is the vital distinction between historic Reformation "Sola Scriptura" and modern individualistic "Nuda/Solo Scriptura"?',
        options: [
          'Sola Scriptura honors ecumenical creeds and Fathers as ministerial authorities under Scripture’s supreme magisterial authority, whereas Nuda Scriptura discards all church history',
          'Sola Scriptura rejects reading the Bible in Hebrew and Greek',
          'They mean the exact same thing',
          'Sola Scriptura places church councils above the Apostle Paul',
        ],
        correctIndex: 0,
        explanation: 'Luther and Calvin cited the Church Fathers hundreds of times, holding Scripture as the sole infallible norm (norma normans) while respecting creeds as subordinate summaries (norma normata).',
        sourceReference: 'Calvin, Institutes; Westminster Confession 1.10',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which 12th-century theologian’s Four Books of Sentences served for three centuries as the standard university textbook commented on by Scholastic masters?',
        options: ['Peter Lombard', 'Jan Hus', 'Desiderius Erasmus', 'Ignatius of Loyola'],
        correctIndex: 0,
        explanation: 'Every aspiring medieval doctor of theology (including Aquinas, Bonaventure, Scotus, and young Luther) lectured on Peter Lombard’s Sentences (~1150).',
        sourceReference: 'Peter Lombard, Libri Quattuor Sententiarum',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which Reformation movement adopted the Schleitheim Confession (1527), advocating believer’s baptism and separation of the church from civil coercion?',
        options: ['The Radical / Anabaptist Reformation', 'The English Tudor Court', 'The Dominican Order', 'The Gallican Synod'],
        correctIndex: 0,
        explanation: 'Drafted primarily by Michael Sattler in 1527, the Schleitheim Confession articulated core Swiss Brethren (Anabaptist) convictions.',
        sourceReference: 'Schleitheim Confession (1527)',
      },
    ],
  },

  {
    slug: 'modern-global-christianity',
    disciplineSlug: 'church-history',
    title: 'Modern Theology, Evangelical Awakenings & Global Christianity',
    subtitle: 'Pietism, Great Awakenings, Enlightenment Challenges, Barmen, Vatican II & The Global South',
    summary:
      'Follows the Church from post-Reformation Pietism and transatlantic revivals through modern theological debates and the dramatic demographic shift of Christianity to Africa, Asia, and Latin America.',
    difficulty: 'Foundational',
    readingMinutes: 14,
    era: 'Early Modern to 21st Century (1675–Present)',
    scriptureRefs: ['Matthew 28:18–20', 'Acts 1:8', 'Revelation 7:9–10'],
    sections: [
      {
        heading: 'Pietism, Evangelical Awakenings & Modern Missions',
        body: 'Reacting against arid confessional polemics after the Thirty Years’ War, German Pietism (Philipp Jakob Spener’s Pia Desideria, 1675; Count Zinzendorf and the Moravians) emphasized heartfelt regeneration, small-group Bible study, and compassionate social reform. This sparked the eighteenth-century Evangelical Revival and First Great Awakening under John and Charles Wesley, George Whitefield, and American philosopher-theologian Jonathan Edwards, alongside the Abolitionist movement spearheaded by William Wilberforce and Olaudah Equiano, and the modern missionary movement catalyzed by Moravian missionaries, William Carey (1792), Adoniram Judson, and Hudson Taylor.',
        keyTakeaway:
          'Pietism and the Great Awakenings joined orthodox doctrine with experiential new birth, hymnody, abolitionism, and cross-cultural missions.',
      },
      {
        heading: 'Enlightenment Liberalism, Neo-Orthodoxy & Confessing Witness',
        body: 'Following Kant’s critique of metaphysics, Friedrich Schleiermacher (1799/1830) sought to rescue religion for "cultured despisers" by relocating theology from objective divine revelation to human "feeling of absolute dependence"—founding nineteenth-century Theological Liberalism (Ritschl, Harnack). After World War I shattered Enlightenment optimism in inevitable human moral progress, Karl Barth’s explosive Epistle to the Romans (1919) and Church Dogmatics proclaimed God as the "Wholly Other" who speaks sovereignly through Jesus Christ the Living Word. In 1934, Barth drafted the Theological Declaration of Barmen for the German Confessing Church (Dietrich Bonhoeffer, Martin Niemöller), courageously repudiating Nazi totalitarian claims over the Church.',
        keyTakeaway:
          'Where nineteenth-century liberalism reduced Christianity to immanent ethics, twentieth-century confessing theology reclaimed Christ’s sovereign Lordship.',
      },
      {
        heading: 'Vatican II, Lausanne & The Polycentric Global Church',
        body: 'The second half of the twentieth century witnessed two historic shifts: first, the Second Vatican Council (1962–1965) promoted Catholic ressourcement (returning to biblical and patristic sources), vernacular liturgy, religious liberty, and ecumenical dialogue, while the Lausanne Covenant (1974, John Stott & Billy Graham) united global evangelical mission and social compassion. Second—as historians Andrew Walls, Lamin Sanneh, and Philip Jenkins have documented—Christianity’s demographic center of gravity shifted dramatically from Europe and North America to the Global South (Sub-Saharan Africa, Latin America, and East/South Asia), vividly embodying Revelation 7:9: a polycentric, vernacular faith rooted in every tribe, tongue, and nation.',
        keyTakeaway:
          'Far from being a Western religion, twenty-first-century Christianity is predominantly African, Latin American, and Asian—returning to its ancient non-Western polycentric roots.',
      },
    ],
    excerpts: [
      {
        author: 'Jonathan Edwards',
        work: 'A Treatise Concerning Religious Affections, Part I',
        year: '1746',
        quote:
          'True religion, in great part, consists in holy affections.',
        citation: 'Religious Affections I.1 (1746)',
        sourceUrl: 'https://www.ccel.org/ccel/edwards/affections.html',
      },
      {
        author: 'Theological Declaration of Barmen',
        work: 'Article 1 (Confessing Synod of the German Evangelical Church)',
        year: 'May 1934',
        quote:
          'Jesus Christ, as he is attested for us in Holy Scripture, is the one Word of God which we have to hear and which we have to trust and obey in life and in death. We reject the false doctrine, as though the church could and would have to acknowledge as a source of its proclamation, apart from and besides this one Word of God, still other events and powers, figures and truths, as God’s revelation.',
        citation: 'Barmen Declaration, Thesis 1 (1934)',
      },
    ],
    perspectives: [
      {
        tradition: 'Classical Confessional & Evangelical',
        proponent: 'Jonathan Edwards, B.B. Warfield, John Stott',
        summary:
          'Combines high view of biblical inspiration and historic orthodoxy with personal conversion, evangelism, and public mercy.',
      },
      {
        tradition: 'Neo-Orthodox / Barthian',
        proponent: 'Karl Barth, Dietrich Bonhoeffer, Thomas F. Torrance',
        summary:
          'Centers radically on God’s self-revelation in Jesus Christ against both secular naturalism and cultural religion.',
      },
      {
        tradition: 'Global Majority World Theology',
        proponent: 'Lamin Sanneh, Kwame Bediako, Samuel Escobar',
        summary:
          'Highlights the vernacular "translatability" of the Christian Gospel into every indigenous culture without losing Nicene unity.',
      },
    ],
    keyTerms: [
      {
        term: 'Ressourcement',
        originalScript: 'ressourcement',
        transliteration: 'ressourcement',
        definition: 'Twentieth-century movement (Henri de Lubac, Jean Daniélou) returning "back to the fountains" (ad fontes) of Scripture and the Church Fathers.',
      },
      {
        term: 'Translatability of the Gospel',
        originalScript: 'vernacular incarnation',
        transliteration: 'translatability',
        definition: 'Lamin Sanneh’s thesis that unlike religions tied to one sacred untranslatable language, Christianity affirms every mother tongue as fit to bear God’s Word.',
      },
    ],
    relatedTopicSlugs: ['schism-scholasticism-reformation', 'ordo-salutis-grace', 'virtue-ethics-imago-dei'],
    sources: [
      {
        title: 'Jonathan Edwards — A Treatise Concerning Religious Affections',
        author: 'Jonathan Edwards',
        year: '1746',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/edwards/affections.html',
        citation: 'Works of Jonathan Edwards (CCEL).',
        summary: 'Edwards’s penetrating theological psychology discerning authentic work of the Holy Spirit during the First Great Awakening.',
      },
      {
        title: 'John Wesley — Sermons on Several Occasions',
        author: 'John Wesley',
        year: '1746–1788',
        repository: 'CCEL',
        sourceType: 'Primary Text',
        url: 'https://www.ccel.org/ccel/wesley/sermons.html',
        citation: 'Standard Sermons of John Wesley (CCEL).',
        summary: 'Foundational evangelical sermons on Salvation by Faith, the New Birth, Justification, and Christian Perfection.',
      },
    ],
    attachments: [
      {
        key: 'modern-theology-roadmap',
        title: 'Modern & Global Church History Study Timeline (1675–Present)',
        description: 'Concise roadmap from Spener’s Pietism and Edwards to Barmen, Vatican II, Lausanne, and the Global South shift.',
        attachmentKind: 'Scholarly Notes',
        format: 'markdown',
        linkedSourceIndex: 0,
        documentTitle: 'Modern & Global Christianity: Key Landmarks',
        documentSubtitle: 'Paideia Modern Church History Notes',
        sections: [
          {
            heading: 'Major Turning Points (1675–2000)',
            content:
              '- **1675**: Spener’s *Pia Desideria* launches German Pietism.\n- **1730s–1740s**: Transatlantic Evangelical Revival (Wesleys, Whitefield, Edwards).\n- **1799**: Schleiermacher’s *Speeches* inaugurates modern theological liberalism.\n- **1919 / 1934**: Karl Barth’s *Romans* & the Barmen Declaration resist cultural accommodation and Nazism.\n- **1962–1965 / 1974**: Vatican II & the Lausanne Congress reshape Catholic and Evangelical global engagement.\n- **Late 20th–21st c.**: Majority of the world’s Christians live in Africa, Latin America, and Asia.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which 1934 confession—drafted largely by Karl Barth for the German Confessing Church—repudiated totalitarian Nazi ideology by proclaiming Jesus Christ as the one Word of God?',
        options: [
          'The Barmen Declaration',
          'The Peace of Westphalia',
          'The Savoy Declaration',
          'The Edict of Milan',
        ],
        correctIndex: 0,
        explanation: 'Adopted at Wuppertal-Barmen in May 1934, the Barmen Declaration resisted the "German Christians" movement’s capitulation to Hitler.',
        sourceReference: 'Theological Declaration of Barmen (1934)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Why is Friedrich Schleiermacher (1768–1834) widely called the "Father of Modern Liberal Theology"?',
        options: [
          'He translated the Septuagint into German',
          'He relocated the essence of religion from revealed doctrinal propositions to an inward human "feeling of absolute dependence"',
          'He presided over the Council of Trent',
          'He founded the Moravian missionary movement',
        ],
        correctIndex: 1,
        explanation: 'Responding to Enlightenment rationalism and Kant, Schleiermacher grounded theology in religious self-consciousness rather than propositional revelation.',
        sourceReference: 'Schleiermacher, The Christian Faith (1830)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Where does the demographic majority of practicing Christians reside in the twenty-first century?',
        options: [
          'Western and Northern Europe',
          'The Global South / Majority World (Africa, Latin America, and Asia)',
          'Exclusively in the Mediterranean basin',
          'Scandinavia',
        ],
        correctIndex: 1,
        explanation: 'Over two-thirds of the world’s Christians today live in Africa, Latin America, Asia, and Oceania.',
        sourceReference: 'Andrew Walls; Lamin Sanneh, Translating the Message',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Intermediate',
        prompt: 'Which American pastor-philosopher of the First Great Awakening wrote A Treatise Concerning Religious Affections (1746)?',
        options: ['Jonathan Edwards', 'Charles Finney', 'Walter Rauschenbusch', 'Cotton Mather'],
        correctIndex: 0,
        explanation: 'Jonathan Edwards authored Religious Affections to distinguish genuine Spirit-wrought love for God’s holiness from mere emotionalism or cold formalism.',
        sourceReference: 'Jonathan Edwards, Religious Affections (1746)',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'What French term describes the 20th-century theological renewal that returned directly to biblical and Patristic primary sources prior to Vatican II?',
        options: ['Ressourcement', 'Laissez-faire', 'Rapprochement', 'SOLA'],
        correctIndex: 0,
        explanation: 'Led by scholars like Henri de Lubac and Jean Daniélou (Sources Chrétiennes), ressourcement recovered patristic exegesis and ecclesiology.',
        sourceReference: 'Nouvelle Théologie / Ressourcement',
      },
    ],
  },

  // =========================================================================
  // BIBLE HISTORY
  // =========================================================================
  {
    slug: 'old-testament-redemptive-history',
    disciplineSlug: 'bible-history',
    title: 'Old Testament History, Covenants & Ancient Near Eastern Context',
    subtitle: 'Creation to Exile: Patriarchs, Exodus, Monarchy, Prophets & Return',
    summary:
      'Maps the historical backbone of the Hebrew Scriptures against Ancient Near Eastern empires (Egypt, Assyria, Babylon, Persia) and traces the progressive unfolding of YHWH’s covenants.',
    difficulty: 'Foundational',
    readingMinutes: 16,
    era: 'Ancient Near East to Post-Exilic Israel (to c. 400 BC)',
    scriptureRefs: ['Genesis 12:1–3', 'Exodus 19:4–6', '2 Samuel 7:12–16', 'Jeremiah 31:31–34', '2 Chronicles 36:15–23'],
    sections: [
      {
        heading: 'Genesis & Polemical Theology in the Ancient Near East',
        body: 'Unlike Mesopotamian myths such as the Enuma Elish—where rival gods battle chaos monsters and fashion humans from a slain rebel god’s blood to serve as slave labor—Genesis 1–2 proclaims one sovereign, transcendent Creator speaking a harmonious cosmos into existence by effortless word and crowning male and female alike as royal image-bearers (tselem Elohim). Following humanity’s rebellion and scattering at Babel (Genesis 3–11), God launches His global rescue plan by calling Abram out of Ur, pledging in the Abrahamic Covenant (Genesis 12, 15, 17) seed, land, and blessing to "all the families of the earth."',
        keyTakeaway:
          'Israel’s election was never tribal favoritism, but God’s chosen instrument to bring covenantal blessing back to all nations.',
      },
      {
        heading: 'Exodus, Sinai, Monarchy & The Divided Kingdom',
        body: 'Delivering Israel from Egyptian bondage through the Passover and Red Sea, YHWH establishes the Mosaic/Sinai Covenant (Exodus 19–24)—structured comparably to second-millennium BC Hittite suzerain-vassal treaties (preamble, historical prologue of grace, stipulations, blessings/curses, witnesses)—calling redeemed Israel to be "a kingdom of priests and a holy nation." Under David, God establishes the Davidic Covenant (2 Samuel 7), promising an eternal royal throne. Yet after Solomon’s death (~931 BC), the kingdom splits into Northern Israel (Samaria, 10 tribes) and Southern Judah (Jerusalem). Despite prophetic calls to covenant faithfulness (Elijah, Amos, Hosea, Isaiah, Micah), Assyria conquers Samaria in 722 BC, and Nebuchadnezzar’s Neo-Babylonian Empire destroys Jerusalem and Solomon’s Temple in 586 BC.',
        keyTakeaway:
          'Notice the grace-first structure of Exodus: God redeems Israel out of Egypt (Exod 1–18) BEFORE giving the Law at Sinai (Exod 20).',
      },
      {
        heading: 'Exile, New Covenant Hope & Post-Exilic Restoration',
        body: 'In the crucible of Babylonian Exile, Ezekiel beholds dry bones breathed alive by God’s Spirit (Ezekiel 37), Daniel witnesses God’s sovereignty over earthly empires, and Jeremiah announces a breathtaking New Covenant (Jeremiah 31:31–34) written not merely on stone tablets, but upon transformed human hearts with complete forgiveness of iniquity. Following Cyrus of Persia’s decree in 539/538 BC (corroborated archaeologically by the Cyrus Cylinder), a remnant returns under Zerubbabel, Ezra, and Nehemiah to rebuild the Second Temple (completed 516 BC) and Jerusalem’s walls—yet the Hebrew canon closes (Malachi / 2 Chronicles 36) still yearning for the greater Messianic Shepherd-King to come.',
        keyTakeaway:
          'Even after physical return from Babylon, the Old Testament ends in forward-looking expectation of the Spirit-wrought New Covenant.',
      },
    ],
    excerpts: [
      {
        author: 'Prophet Jeremiah',
        work: 'Book of Jeremiah 31:31, 33 (Hebrew Canon)',
        year: 'c. 587 BC',
        quote:
          'Behold, the days are coming, declares the LORD, when I will make a new covenant with the house of Israel and the house of Judah... I will put my law within them, and I will write it on their hearts. And I will be their God, and they shall be my people.',
        citation: 'Jeremiah 31:31, 33',
      },
      {
        author: 'Melito of Sardis',
        work: 'Peri Pascha (Homily on the Passover), Sections 68–69',
        year: 'c. 170',
        quote:
          'This is He who rescued us from slavery into freedom, from darkness into light, from death into life, from tyranny into an eternal kingdom, and made us a new priesthood and a chosen people forever. He is the Pascha of our salvation.',
        citation: 'Peri Pascha 68–69',
      },
    ],
    perspectives: [
      {
        tradition: 'Covenantal Unity',
        proponent: 'Irenaeus, John Calvin, O. Palmer Robertson',
        summary:
          'Views the Abrahamic, Mosaic, Davidic, and New Covenants as progressive administrations of one unfolding Covenant of Grace.',
      },
      {
        tradition: 'ANE Comparative-Historical',
        proponent: 'Kenneth Kitchen, John Walton, Tremper Longman',
        summary:
          'Illuminates the historical reliability and sharp theological contrasts of Old Testament texts against Egyptian, Hittite, Assyrian, and Babylonian inscriptions.',
      },
    ],
    keyTerms: [
      {
        term: 'Suzerain-Vassal Treaty',
        originalScript: 'ANE covenant diplomacy',
        transliteration: 'suzerain-vassal treaty',
        definition: 'Ancient Near Eastern treaty form mirrored in Exodus and Deuteronomy, grounding covenant loyalty in the Great King’s prior saving acts.',
      },
      {
        term: 'TaNaKh',
        originalScript: 'תַּנַ״ךְ',
        transliteration: 'Tanakh',
        definition: 'Hebrew acronym for the tripartite canon: Torah (Instruction/Law), Nevi’im (Prophets), and Ketuvim (Writings)—echoed by Jesus in Luke 24:44.',
      },
    ],
    relatedTopicSlugs: ['second-temple-intertestamental', 'typology-canonical-theology', 'biblical-canon-textual-criticism'],
    sources: [
      {
        title: 'STEP Bible — Hebrew Masoretic Text (Leningrad Codex) & Interlinear',
        author: 'Tyndale House, Cambridge',
        year: 'Contemporary',
        repository: 'STEP Bible / Academic',
        sourceType: 'Reference / Lexicon',
        url: 'https://www.stepbible.org/',
        citation: 'STEP Bible Open Hebrew & Greek Tools.',
        summary: 'Study the Hebrew Tanakh with full morphological tagging, BDB lexicon entries, and Ancient Near Eastern geographical cross-references.',
      },
      {
        title: 'Flavius Josephus — Antiquities of the Jews (Complete Works)',
        author: 'Flavius Josephus',
        year: 'c. AD 94',
        repository: 'CCEL',
        sourceType: 'Historical Archive',
        url: 'https://www.ccel.org/ccel/josephus/complete.html',
        citation: 'Works of Flavius Josephus, trans. William Whiston (CCEL).',
        summary: 'Essential first-century Jewish historical account retelling Old Testament and Second Temple history for Greco-Roman readers.',
      },
    ],
    attachments: [
      {
        key: 'ot-covenants-timeline-pdf',
        title: 'Old Testament Covenants & Empire Chronology Chart',
        description: 'Reference PDF mapping Noahic, Abrahamic, Mosaic, Davidic, and New Covenants alongside key dates (931 BC, 722 BC, 586 BC, 538 BC).',
        attachmentKind: 'Diagram / Chart',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Covenants & Chronology of the Old Testament',
        documentSubtitle: 'Paideia Bible History Companion',
        sections: [
          {
            heading: 'Essential Anchor Dates of Israel’s History',
            content:
              '- **c. 1010–931 BC**: United Monarchy under Saul, David, and Solomon (First Temple built).\n- **931 BC**: Division into Northern Kingdom (Israel) and Southern Kingdom (Judah).\n- **722 BC**: Fall of Samaria (Northern Kingdom) to the Neo-Assyrian Empire.\n- **586 BC**: Destruction of Jerusalem & Solomon’s Temple by Nebuchadnezzar II of Babylon; Babylonian Exile.\n- **539 / 538 BC**: Persian conquest of Babylon; Decree of Cyrus allowing Jewish return.\n- **516 BC**: Completion and dedication of the Second Temple under Zerubbabel and Joshua.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which two benchmark dates mark the fall of the Northern Kingdom (Samaria) to Assyria and the destruction of Jerusalem by Babylon?',
        options: [
          '722 BC (Assyria) and 586 BC (Babylon)',
          '1000 BC and 325 AD',
          '332 BC and 70 AD',
          '1446 BC and 1200 BC',
        ],
        correctIndex: 0,
        explanation: 'Assyria conquered Northern Israel in 722 BC (2 Kings 17), and Nebuchadnezzar’s Babylon destroyed Jerusalem and the First Temple in 586 BC (2 Kings 25).',
        sourceReference: '2 Kings 17; 2 Kings 25',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'In which Old Testament covenant does God promise King David an enduring house, kingdom, and throne forever?',
        options: ['2 Samuel 7 (Davidic Covenant)', 'Genesis 9 (Noahic Covenant)', 'Numbers 6', 'Judges 11'],
        correctIndex: 0,
        explanation: 'Through Nathan the prophet in 2 Samuel 7:12–16, YHWH covenants to establish the throne of David’s royal offspring forever—fulfilled in Jesus the Messiah (Luke 1:32–33).',
        sourceReference: '2 Samuel 7:12–16; Psalm 89',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'How does the creation account of Genesis 1–2 polemically contrast with Mesopotamian myths like the Enuma Elish?',
        options: [
          'Genesis portrays creation arising from violent warfare among rival gods',
          'Genesis proclaims one sovereign God effortlessly speaking an ordered cosmos into being and dignifying all humanity—not just kings—as bearing God’s image',
          'Genesis teaches that physical matter is an evil illusion',
          'Genesis copies Babylonian polytheism verbatim',
        ],
        correctIndex: 1,
        explanation: 'Where ANE myths reserved "image of the god" for monarchs and treated common humans as slave labor, Genesis democratizes royal Imago Dei dignity to every man and woman.',
        sourceReference: 'Genesis 1:26–28',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which Persian ruler issued the decree in 539/538 BC permitting exiled Jews to return to Jerusalem and rebuild the Temple?',
        options: ['Cyrus the Great', 'Alexander the Great', 'Sennacherib', 'Antiochus Epiphanes'],
        correctIndex: 0,
        explanation: 'Foretold in Isaiah 44:28–45:1 and recorded in Ezra 1:1–4 (corroborated by the Cyrus Cylinder), Cyrus of Persia authorized the return from Babylon.',
        sourceReference: 'Ezra 1:1–4; 2 Chronicles 36:22–23',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'What does the Hebrew acronym "TaNaKh" stand for in describing the three divisions of the Hebrew Scriptures?',
        options: [
          'Torah (Law), Nevi’im (Prophets), and Ketuvim (Writings)',
          'Temple, Nation, and Kingdom',
          'Targum, Mishnah, and Gemara',
          'Tabernacle, Nazarite, and King',
        ],
        correctIndex: 0,
        explanation: 'TaNaKh combines the initial consonants of Torah, Nevi’im, and Ketuvim (mirrored in Luke 24:44: "Law of Moses and the Prophets and the Psalms").',
        sourceReference: 'Luke 24:44',
      },
    ],
  },

  {
    slug: 'second-temple-intertestamental',
    disciplineSlug: 'bible-history',
    title: 'The Second Temple & Intertestamental World',
    subtitle: 'Hellenization, the Septuagint (LXX), Maccabees, Dead Sea Scrolls & Roman Judea',
    summary:
      'Bridges the four centuries between Malachi and Matthew, explaining how Greek language, synagogue life, Pharisees, Sadducees, Essenes, and Roman rule shaped the world of the New Testament.',
    difficulty: 'Intermediate',
    readingMinutes: 15,
    era: 'Second Temple Period (516 BC – AD 70)',
    scriptureRefs: ['Daniel 8; 11', 'Galatians 4:4', 'John 10:22', 'Acts 23:6–8'],
    sections: [
      {
        heading: 'Alexander the Great, Hellenization & The Septuagint (LXX)',
        body: 'When a reader turns the single page between Malachi and Matthew, empires, languages, and religious institutions have transformed dramatically! Alexander the Great’s lightning conquests (334–323 BC) spread Koine ("common") Greek across the Mediterranean and Near East, providing a single international lingua franca through which the Gospel would later travel rapidly. In third-century BC Alexandria under Ptolemaic rule, Jewish scholars translated the Torah—and subsequently the rest of the Hebrew Scriptures—into Koine Greek, known as the Septuagint (LXX). The LXX became the everyday Bible of Diaspora Judaism and supplied the majority of Old Testament quotations in the New Testament.',
        keyTakeaway:
          'Koine Greek and the Septuagint prepared a unified linguistic and theological vocabulary across the Mediterranean world for "the fullness of time" (Gal 4:4).',
      },
      {
        heading: 'Antiochus IV, The Maccabean Revolt & Jewish Groups',
        body: 'In 167 BC, the Seleucid ruler Antiochus IV Epiphanes attempted to eradicate Jewish Torah observance and desecrated the Jerusalem Temple ("the abomination of desolation"), sparking the Maccabean Revolt led by Mattathias and Judas Maccabeus. Their rededication of the Temple in 164 BC instituted Hanukkah (the "Feast of Dedication," attended by Jesus in John 10:22) and inaugurated the Hasmonean dynasty. Out of these struggles emerged the distinct Second Temple groups encountered in the Gospels: (1) Sadducees—aristocratic priestly elites collaborating with Rome, accepting only the written Pentateuch and denying resurrection; (2) Pharisees—lay renewal teachers devoted to Torah purity, oral tradition, and bodily resurrection; (3) Essenes—ascetic covenant communities largely linked with the Qumran caves and Dead Sea Scrolls; and (4) Zealots—armed revolutionaries seeking violent overthrow of Rome.',
        keyTakeaway:
          'Understanding Second Temple Jewish groups illuminates why Jesus’s debates with Pharisees and Sadducees carried intense covenantal stakes.',
      },
      {
        heading: 'Pax Romana, Herod the Great & The Dead Sea Scrolls',
        body: 'Roman general Pompey captured Jerusalem in 63 BC, and Rome installed Herod the Great (37–4 BC) as client king, who magnificently expanded the Second Temple complex while ruling with paranoid brutality. Meanwhile, Augustus’s Pax Romana built paved Roman road networks and suppressed Mediterranean piracy, enabling safe travel for early Christian missionaries. Discovered between 1947 and 1956 in eleven caves at Qumran by the Dead Sea, the Dead Sea Scrolls revolutionized biblical history: not only exposing vivid Second Temple apocalyptic expectations, but yielding Hebrew biblical manuscripts (such as the Great Isaiah Scroll, 1QIsa-a) a full 1,000 years older than previously extant medieval Masoretic codices—confirming the extraordinary fidelity of Old Testament textual transmission.',
        keyTakeaway:
          'The 1947 discovery of the Dead Sea Scrolls vaulted Old Testament manuscript evidence back a millennium into the Second Temple era itself.',
      },
    ],
    excerpts: [
      {
        author: 'Flavius Josephus',
        work: 'The Jewish War, Book II, Chapter 8, Section 14',
        year: 'c. AD 75',
        quote:
          'The Pharisees are those who are esteemed most skillful in the exact explication of their laws... and attribute all to Fate and to God, and yet allow, that to act what is right, or the contrary, is principally in the power of men... The Sadducees are those that compose the second order, and take away destiny entirely.',
        citation: 'Bellum Judaicum 2.162–165',
        sourceUrl: 'https://www.ccel.org/ccel/josephus/complete.html',
      },
      {
        author: 'Letter of Aristeas (Traditional Account of the LXX)',
        work: 'Alexandrian Jewish Narrative',
        year: 'c. 2nd Century BC',
        quote:
          'Demetrius of Phalerum, the president of the king’s library, received vast sums of money for the purpose of collecting together, as far as he possibly could, all the books in the world... including the laws of the Jews.',
        citation: 'Letter of Aristeas 9–10',
        sourceUrl: 'https://www.earlyjewishwritings.com/text/aristeas.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Second Temple Contextual Exegesis',
        proponent: 'Larry Hurtado, Richard Bauckham, N.T. Wright',
        summary:
          'Shows how earliest "high Christology"—worshiping Jesus within strict Second Temple Jewish monotheism—arose immediately in Palestine rather than centuries later on pagan soil.',
      },
      {
        tradition: 'Textual & Archaeological Scholarship',
        proponent: 'Emanuel Tov, Frank Moore Cross',
        summary:
          'Analyzes Qumran scrolls alongside Masoretic and Septuagint witnesses to reconstruct textual history.',
      },
    ],
    keyTerms: [
      {
        term: 'Koine Greek',
        originalScript: 'ἡ κοινὴ διάλεκτος',
        transliteration: 'he koine dialektos',
        definition: 'The everyday international Greek dialect spread following Alexander the Great, in which the LXX and all 27 New Testament books were composed.',
      },
      {
        term: 'Synagogue',
        originalScript: 'συναγωγή',
        transliteration: 'synagoge',
        definition: 'Local assembly house for Scripture reading, prayer, and instruction developed during the Exile and Second Temple era—serving as Paul’s initial preaching venue across cities in Acts.',
      },
    ],
    relatedTopicSlugs: ['old-testament-redemptive-history', 'biblical-canon-textual-criticism', 'historical-resurrection-apologetics'],
    sources: [
      {
        title: 'The Digital Dead Sea Scrolls (Israel Museum Jerusalem — Great Isaiah Scroll)',
        author: 'Israel Museum, Jerusalem',
        year: 'c. 125 BC (Manuscript)',
        repository: 'STEP Bible / Academic',
        sourceType: 'Historical Archive',
        url: 'http://dss.collections.imj.org.il/isaiah',
        citation: 'Leon Levy Dead Sea Scrolls Digital Library / Israel Museum.',
        summary: 'High-resolution interactive access to the complete Great Isaiah Scroll (1QIsa-a) with English verse-by-verse translation.',
      },
      {
        title: 'Josephus — The Wars of the Jews (Bellum Judaicum)',
        author: 'Flavius Josephus',
        year: 'c. AD 75',
        repository: 'Project Gutenberg',
        sourceType: 'Historical Archive',
        url: 'https://www.gutenberg.org/ebooks/2850',
        citation: 'Josephus, Wars of the Jews, trans. William Whiston (Project Gutenberg).',
        summary: 'Primary eyewitness history of first-century Judea, Second Temple sects, and the AD 70 destruction of Jerusalem.',
      },
    ],
    attachments: [
      {
        key: 'second-temple-sects-guide',
        title: 'Second Temple World & Qumran Manuscripts Study Sheet',
        description: 'Comparison of Pharisees, Sadducees, Essenes, and Zealots plus overview of the Dead Sea Scrolls.',
        attachmentKind: 'Scholarly Notes',
        format: 'markdown',
        linkedSourceIndex: 0,
        documentTitle: 'Bridging the Testaments: Second Temple History',
        documentSubtitle: 'Paideia Bible History Study Sheet',
        sections: [
          {
            heading: 'Comparing First-Century Jewish Movements',
            content:
              '- **Sadducees**: Priestly Jerusalem aristocracy; accepted Torah alone; denied angels, spirits, and bodily resurrection (Acts 23:8).\n- **Pharisees**: Popular lay scholars active in synagogues; upheld written Torah + Oral Tradition; affirmed providence and bodily resurrection.\n- **Essenes / Qumran**: Ascetic community awaiting imminent cosmic war between Sons of Light and Sons of Darkness; preserved the Dead Sea Scrolls.\n- **Zealots**: Militant nationalists opposing Roman taxation and occupation by force.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What is the Septuagint (often abbreviated LXX)?',
        options: [
          'Jerome’s fourth-century Latin translation of the Bible',
          'The Koine Greek translation of the Hebrew Scriptures begun in Alexandria in the third century BC',
          'A medieval collection of papal decrees',
          'A list of seventy Roman emperors',
        ],
        correctIndex: 1,
        explanation: 'Named after the tradition of seventy (seventy-two) translators in Alexandria, the Septuagint was the Greek Old Testament widely quoted by the New Testament writers.',
        sourceReference: 'Septuagint (LXX)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Why was the discovery of the Dead Sea Scrolls at Qumran (beginning in 1947) a watershed for Old Testament textual scholarship?',
        options: [
          'They contained autograph originals signed by Paul',
          'They provided Hebrew Old Testament manuscripts (such as the Great Isaiah Scroll) roughly 1,000 years older than previously surviving Masoretic codices',
          'They were written entirely in modern English',
          'They proved the Second Temple never existed',
        ],
        correctIndex: 1,
        explanation: 'Prior to 1947, the oldest complete Hebrew OT manuscripts dated to ~AD 900–1008 (Aleppo and Leningrad Codices); Qumran yielded scrolls from ~250 BC–AD 68.',
        sourceReference: 'Dead Sea Scrolls / 1QIsa-a',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'According to Acts 23:8 and Josephus, how did the Sadducees differ theologically from the Pharisees?',
        options: [
          'Sadducees denied the bodily resurrection, angels, and spirits, whereas Pharisees affirmed them',
          'Sadducees led the Qumran desert monastery',
          'Sadducees wrote the New Testament Gospels',
          'Pharisees rejected Moses and the Prophets',
        ],
        correctIndex: 0,
        explanation: 'Acts 23:8 explicitly notes: "For the Sadducees say that there is no resurrection, nor angel, nor spirit, but the Pharisees acknowledge them all."',
        sourceReference: 'Acts 23:6–8; Josephus, Jewish War 2.162–165',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which Seleucid ruler’s desecration of the Jerusalem Temple in 167 BC triggered the Maccabean Revolt?',
        options: ['Antiochus IV Epiphanes', 'Julius Caesar', 'Darius the Mede', 'Ptolemy II Philadelphus'],
        correctIndex: 0,
        explanation: 'Antiochus IV Epiphanes outlawed Torah practice and profaned the Temple altar in 167 BC, sparking Judas Maccabeus’s revolt and the rededication celebrated at Hanukkah.',
        sourceReference: '1 Maccabees 1–4; John 10:22',
      },
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: The Second Temple in Jerusalem stood until AD 70, when Roman legions under Titus destroyed it.',
        options: [
          'True — Titus’s Roman forces destroyed Jerusalem and the Second Temple in AD 70, just as Jesus had foretold.',
          'False — the Second Temple remained standing until the Crusades.',
        ],
        correctIndex: 0,
        explanation: 'Following the First Jewish-Roman War (AD 66–70), Roman legions under Titus destroyed the Second Temple in August AD 70.',
        sourceReference: 'Luke 21:5–6; Josephus, Jewish War Book VI',
      },
    ],
  },

  {
    slug: 'biblical-canon-textual-criticism',
    disciplineSlug: 'bible-history',
    title: 'Formation of the Biblical Canon & Textual Criticism',
    subtitle: 'Canon Recognition Criteria, Papyri & Great Uncials, Masoretic Text, and Translations',
    summary:
      'Investigates how the Old and New Testament canons were recognized (not invented) by God’s people, and how thousands of ancient manuscripts establish the reliability of the biblical text.',
    difficulty: 'Intermediate',
    readingMinutes: 17,
    era: 'First to Sixteenth Centuries',
    scriptureRefs: ['2 Peter 3:15–16', '1 Timothy 5:18', 'Colossians 4:16', 'Luke 1:1–4', 'Romans 3:2'],
    sections: [
      {
        heading: 'Recognizing—Not Inventing—the Biblical Canon',
        body: 'Popular fiction often alleges that Emperor Constantine or the Council of Nicaea (325) invented the New Testament canon by political vote—a claim historically false on every count (Nicaea passed zero canons listing biblical books!). Rather, from the first century onward (2 Peter 3:15–16 already grouping Paul’s letters alongside "the other Scriptures"; 1 Timothy 5:18 citing Deuteronomy 25:4 and Luke 10:7 side-by-side as "Scripture"), the Church recognized books possessing intrinsic divine authority through three organic criteria: (1) Apostolicity—written by an apostle or close apostolic associate (Mark with Peter, Luke with Paul); (2) Orthodoxy—harmony with the apostolic Rule of Faith (rejecting second-century Gnostic forgeries like the Gospel of Thomas); and (3) Catholicity—widespread, continuous liturgical reading across churches East and West. Key historical witnesses include the Muratorian Fragment (~AD 170–200), Irenaeus’s defense of the fourfold Gospel (~180), Athanasius’s 39th Festal Letter (AD 367—listing all 27 NT books identically to ours), and the North African Synods of Hippo (393) and Carthage (397).',
        keyTakeaway:
          'The Church did not create the Canon like a legislature enacting a statute; it recognized the Shepherd’s voice in the apostolic writings.',
      },
      {
        heading: 'Hebrew Canon vs. Deuterocanonical / Apocryphal Books',
        body: 'In Romans 3:2, Paul notes that the Jewish people "were entrusted with the oracles of God." The Jewish Tanakh comprises 24 scrolls—identical in content to the 39 books of the Protestant Old Testament (counting Samuel, Kings, Chronicles, Ezra-Nehemiah, and the Twelve Minor Prophets as unified scrolls). Meanwhile, copies of the Greek Septuagint circulated alongside additional Second Temple Jewish writings (Tobit, Judith, Wisdom of Solomon, Sirach/Ecclesiasticus, Baruch, 1–2 Maccabees). Early Fathers debated their status: Jerome—translator of the Latin Vulgate from Hebrew—distinguished the Hebrew canonical books for establishing church dogma from the "ecclesiastical" books read for edification, whereas Augustine and North African councils included them. At the Reformation, Protestants aligned with the Hebrew canon while printing the Apocrypha as useful historical reading; Trent (1546) affirmed them as Deuterocanonical.',
        keyTakeaway:
          'The 39-book Protestant Old Testament matches the exact textual contents of the 24-book Jewish Hebrew Tanakh.',
      },
      {
        heading: 'Manuscript Wealth & The Science of Textual Criticism',
        body: 'Whereas classical works like Tacitus’s Annals or Plato’s Tetralogies survive in a handful of medieval copies separated by 800–1,200 years from composition, the New Testament is attested by over 5,800 Greek manuscripts (from early 2nd/3rd-century papyri such as P52 [Rylands fragment of John 18, c. AD 125–150], P46, P66, and P75, to fourth-century complete parchment uncials Codex Sinaiticus and Codex Vaticanus), plus over 18,000 early Latin, Syriac, and Coptic versions and over one million patristic quotations! Paradoxically, having thousands of copies reveals more minor scribal variants (mostly spelling, word order, or movable nu), yet simultaneously gives textual critics massive cross-checking data to establish the original wording with extraordinary precision—and not a single cardinal Christian doctrine depends on any disputed textual variant.',
        keyTakeaway:
          'Abundance of independent manuscript streams eliminates any possibility of centralized corruption and secures the original text.',
      },
    ],
    excerpts: [
      {
        author: 'Athanasius of Alexandria',
        work: 'Thirty-Ninth Festal Letter',
        year: 'AD 367',
        quote:
          'Again it is not tedious to speak of the books of the New Testament... These are fountains of salvation, that they who thirst may be satisfied with the living words they contain. In these alone is proclaimed the doctrine of godliness. Let no man add to these, neither let him take ought from these.',
        citation: 'Festal Letter 39 (AD 367)',
        sourceUrl: 'https://www.newadvent.org/fathers/2806039.htm',
      },
      {
        author: 'Irenaeus of Lyons',
        work: 'Against Heresies, Book III, Chapter 11, Section 8',
        year: 'c. AD 180',
        quote:
          'It is not possible that the Gospels can be either more or fewer in number than they are [Matthew, Mark, Luke, and John].',
        citation: 'Adversus Haereses III.11.8',
        sourceUrl: 'https://www.newadvent.org/fathers/0103311.htm',
      },
    ],
    perspectives: [
      {
        tradition: 'Reasoned Eclecticism (Critical Text)',
        proponent: 'Bruce Metzger, Kurt & Barbara Aland, Nestle-Aland / UBS',
        summary:
          'Weighs both external manuscript age/geography (Alexandrian, Western, Byzantine) and internal transcriptional probabilities (lectio difficilior).',
      },
      {
        tradition: 'Protestant, Catholic & Orthodox Canon Traditions',
        proponent: 'Jerome vs. Augustine; Westminster, Trent, Synod of Jerusalem',
        summary:
          'All Christian traditions unite completely on the exact same 27 New Testament books while differing on the canonical rank of Second Temple Deuterocanonical/Apocryphal books.',
      },
    ],
    keyTerms: [
      {
        term: 'Papyri & Uncials (Majuscules)',
        originalScript: 'πάπυρος / uncialis',
        transliteration: 'papyri / uncials',
        definition: 'Earliest NT manuscripts written on reed papyrus (e.g., P52, P66, P75) and 4th–9th century parchment codices in capital Greek letters (Sinaiticus, Vaticanus).',
      },
      {
        term: 'Lectio Difficilior Potior',
        originalScript: 'lectio difficilior potior',
        transliteration: 'lectio difficilior potior',
        definition: '"The more difficult reading is stronger"—textual-critical principle noting scribes tended to smooth out rough grammar rather than create it.',
      },
    ],
    relatedTopicSlugs: ['second-temple-intertestamental', 'grammatical-historical-exegesis', 'historical-resurrection-apologetics'],
    sources: [
      {
        title: 'Athanasius — Festal Letter 39 (AD 367): Complete Canon List',
        author: 'Athanasius of Alexandria',
        year: '367',
        repository: 'New Advent',
        sourceType: 'Primary Text',
        url: 'https://www.newadvent.org/fathers/2806039.htm',
        citation: 'Nicene and Post-Nicene Fathers II, Vol. 4 (New Advent).',
        summary: 'Historic Easter pastoral letter enumerating the exact 27 books of the New Testament as "fountains of salvation."',
      },
      {
        title: 'Codex Sinaiticus Project (British Library, Leipzig, Sinai & St. Petersburg)',
        author: '4th-Century Christian Scribes',
        year: 'c. AD 330–360',
        repository: 'STEP Bible / Academic',
        sourceType: 'Historical Archive',
        url: 'https://codexsinaiticus.org/en/',
        citation: 'Codex Sinaiticus International Digital Unification Project.',
        summary: 'View high-resolution digital folios and transcriptions of the oldest complete manuscript of the Greek New Testament.',
      },
    ],
    attachments: [
      {
        key: 'canon-manuscripts-dossier',
        title: 'New Testament Manuscript Witnesses & Canon Milestones PDF',
        description: 'Detailed dossier cataloging P52, P46, P66, P75, Sinaiticus, Vaticanus, Muratorian Fragment, and Athanasius’s 39th Festal Letter.',
        attachmentKind: 'Study Guide PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Canon & Codex: Transmission of the Scriptures',
        documentSubtitle: 'Paideia Bible History & Textual Criticism Dossier',
        sections: [
          {
            heading: 'Key Early New Testament Manuscript Witnesses',
            content:
              '- **P52 (John Rylands Fragment)**: John 18:31–33, 37–38; dated c. AD 125–150, discovered in Egypt hundreds of miles from Ephesus.\n- **P46 (Chester Beatty II)**: c. AD 200; contains major Pauline Epistles & Hebrews.\n- **P66 & P75 (Bodmer Papyri)**: c. AD 175–225; extensive early witnesses to Luke and John.\n- **Codex Vaticanus (B / 03) & Codex Sinaiticus (Aleph / 01)**: Mid-4th century parchment codices preserving the Greek Bible.',
          },
          {
            heading: 'Refuting the "Constantine Invented the Canon" Myth',
            content:
              '1. Over a century before Constantine, Irenaeus (~180) and the Muratorian Fragment (~180) already recognized the four Gospels, Acts, 13 Pauline Epistles, and Catholic Epistles.\n2. The Council of Nicaea (325) never voted on or issued a list of biblical books.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: Emperor Constantine and the First Council of Nicaea (AD 325) selected the 27 books of the New Testament by political vote.',
        options: [
          'True — Nicaea’s Canon 21 established the 27-book New Testament.',
          'False — Nicaea passed zero canons listing biblical books; the core fourfold Gospel and Pauline corpus were recognized well over a century earlier.',
        ],
        correctIndex: 1,
        explanation: 'This widespread pop-culture myth has zero historical basis; Nicaea addressed Arianism, Easter dating, and church discipline—not biblical canon lists.',
        sourceReference: 'Canons of Nicaea (325); Irenaeus, Against Heresies III.11.8',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which bishop’s 39th Festal Letter in AD 367 provides the earliest surviving single list naming all 27 books of the New Testament with nothing added or omitted?',
        options: ['Athanasius of Alexandria', 'Constantine the Great', 'Gregory VII', 'Thomas Cranmer'],
        correctIndex: 0,
        explanation: 'In his Easter pastoral letter of AD 367, Athanasius listed the exact 27 books of our New Testament as "fountains of salvation."',
        sourceReference: 'Athanasius, Festal Letter 39 (AD 367)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'What three interrelated criteria guided the early Church’s recognition of canonical New Testament writings?',
        options: [
          'Length, poetic meter, and Latin prose style',
          'Apostolicity, Orthodoxy (harmony with the Rule of Faith), and Catholicity (widespread liturgical reception)',
          'Imperial endorsement, popularity in Rome alone, and anonymity',
          'Philosophical novelty, esoteric secrecy, and monastic authorship',
        ],
        correctIndex: 1,
        explanation: 'Books recognized as Scripture traced back to the apostolic circle, cohered with apostolic teaching, and were read publicly across the catholic churches.',
        sourceReference: 'Bruce Metzger, The Canon of the New Testament',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'What is P52 (the John Rylands Papyrus), generally dated around AD 125–150?',
        options: [
          'A medieval Latin psalter',
          'A papyrus fragment of John 18 discovered in Egypt, demonstrating early circulation of the Gospel of John',
          'An Aramaic targum of Genesis',
          'A decree from the Council of Chalcedon',
        ],
        correctIndex: 1,
        explanation: 'Housed in Manchester’s John Rylands Library, P52 contains verses from John 18 on front and back (showing early Christian adoption of the codex book format!).',
        sourceReference: 'Papyrus 52 (Rylands Greek Papyrus 457)',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Advanced',
        prompt: 'In textual criticism, what does the Latin rule lectio difficilior potior mean?',
        options: [
          'The longest manuscript is always oldest',
          'The more difficult reading is stronger (since scribes tended to smooth out awkward phrasing rather than introduce it)',
          'Latin translations outweigh Greek papyri',
          'Every variant alters Christian dogma',
        ],
        correctIndex: 1,
        explanation: 'When evaluating variants, critics ask which reading best explains the rise of the others; scribes naturally harmonized or smoothed difficult grammar.',
        sourceReference: 'Textual Criticism Principles (Johann Jakob Wettstein / Metzger)',
      },
    ],
  },

  // =========================================================================
  // CHURCH FATHERS (PATRISTICS)
  // =========================================================================
  {
    slug: 'apostolic-fathers',
    disciplineSlug: 'church-fathers',
    title: 'The Apostolic Fathers (First & Early Second Century)',
    subtitle: 'Clement of Rome, Ignatius of Antioch, Polycarp of Smyrna, The Didache & Diognetus',
    summary:
      'Reads the earliest post-canonical Christian writings composed by direct disciples and contemporaries of the Apostles, offering a vivid window into sub-apostolic worship, martyrdom, and church order.',
    difficulty: 'Foundational',
    readingMinutes: 15,
    era: 'Sub-Apostolic Era (c. AD 70–150)',
    scriptureRefs: ['Philippians 4:3', 'Acts 11:26', 'Revelation 2:8–11'],
    sections: [
      {
        heading: 'Direct Bridge to the Apostles: Clement & The Didache',
        body: 'The "Apostolic Fathers" are a collection of late first- and early second-century writings from church leaders personally acquainted with the Apostles or their immediate circle. Around AD 95–96, Clement of Rome wrote 1 Clement on behalf of the Roman church to Corinth—saturated with Old Testament examples, echoes of Hebrews and Paul, and appeals to humble congregational harmony. From roughly the same era (c. AD 50–100) hails The Didache ("The Teaching of the Twelve Apostles"), the oldest surviving Christian church manual: opening with the "Two Ways" of life and death, instructing catechesis and baptism (by immersion in running water, or pouring thrice in the Triune Name if water is scarce), Wednesday and Friday fasting, the Lord’s Prayer thrice daily, Eucharistic thanksgiving prayers, and testing itinerant prophets by their Christlike conduct.',
        keyTakeaway:
          'The Didache and 1 Clement reveal a late first-century Church deeply Jewish-rooted in ethics, Trinitarian in baptism, and saturated in Scripture.',
      },
      {
        heading: 'Ignatius of Antioch & Polycarp of Smyrna',
        body: 'Arrested in Syria under Emperor Trajan (~AD 107–110) and marched in chains across Asia Minor to face wild beasts in the Roman Colosseum, Bishop Ignatius of Antioch composed seven fiery pastoral letters along his route. Ignatius fiercely combated Docetism (insisting Jesus truly was born, ate, suffered, died, and rose bodily), championed unity around the local bishop, presbyters, and deacons, and was the first recorded writer to call the universal community "the catholic Church" (Smyrnaeans 8.2). One recipient of Ignatius’s letters was Polycarp, Bishop of Smyrna—who had personally sat at the feet of the Apostle John! Around AD 155, aged eighty-six, Polycarp stood in the Smyrna stadium refusing the proconsul’s demand to revile Christ, leaving the immortal testimony recorded in The Martyrdom of Polycarp.',
        keyTakeaway:
          'Ignatius and Polycarp form a living biographical chain linking the Apostle John directly to Irenaeus of Lyons.',
      },
      {
        heading: 'The Epistle to Diognetus: Christians in the Roman World',
        body: 'Perhaps the jewel of early Christian apologetic prose is the anonymous second-century Epistle to Diognetus. Explaining why Christians neither worship Greco-Roman idols nor withdraw into isolated ghettos, chapters 5–6 paint an unforgettable portrait of Christian citizenship: Christians share their neighbors’ languages, clothing, and cities, yet live as resident aliens whose true homeland is heaven—exposing nobody’s infants, sharing their table with all yet never their marriage bed, blessing when reviled, and acting in the world "as the soul is in the body." Even more remarkably, Chapter 9 celebrates the "sweet exchange" of atonement: "O the sweet exchange, O the inscrutable creation, O the unexpected benefits; that the iniquity of many should be hidden in One Righteous Person, and the righteousness of One should justify many sinners!"',
        keyTakeaway:
          'Fourteen centuries before the Reformation, the Epistle to Diognetus celebrated the "sweet exchange" of Christ’s righteousness justifying sinners.',
      },
    ],
    excerpts: [
      {
        author: 'Polycarp of Smyrna',
        work: 'The Martyrdom of Polycarp, Chapter 9',
        year: 'c. AD 155',
        quote:
          'Eighty and six years have I served Him, and He never did me any injury: how then can I blaspheme my King and my Saviour?',
        citation: 'Martyrdom of Polycarp 9.3',
        sourceUrl: 'https://www.newadvent.org/fathers/0102.htm',
      },
      {
        author: 'Epistle to Diognetus',
        work: 'Chapters 5 & 9',
        year: 'c. AD 130–180',
        quote:
          'They dwell in their own countries, but simply as sojourners. As citizens, they share in all things with others, and yet endure all things as if foreigners. Every foreign land is to them as their native country, and every land of their birth as a land of strangers... O sweet exchange! ... that the wickedness of many should be hid in a single righteous One, and that the righteousness of One should justify many transgressors!',
        citation: 'Epistle to Diognetus 5.5; 9.5',
        sourceUrl: 'https://www.newadvent.org/fathers/0101.htm',
      },
    ],
    perspectives: [
      {
        tradition: 'Historical & Liturgical Continuity',
        proponent: 'J.B. Lightfoot, Michael Holmes',
        summary:
          'Reads the Apostolic Fathers as indispensable witnesses to early canon reception, liturgical practice, and emergent threefold ministry.',
      },
      {
        tradition: 'Canonical Boundary Clarity',
        proponent: 'Clement & Ignatius themselves',
        summary:
          'Notably, Clement and Ignatius explicitly distinguish themselves from the Apostles ("I do not issue commands to you as Peter and Paul did," Ignatius, Romans 4.3), testifying to the uniqueness of Apostolic Scripture.',
      },
    ],
    keyTerms: [
      {
        term: 'Didache',
        originalScript: 'Διδαχή',
        transliteration: 'Didache',
        definition: '"Teaching"—short title of The Teaching of the Lord Through the Twelve Apostles to the Nations, rediscovered in Constantinople in 1873.',
      },
      {
        term: 'Martys',
        originalScript: 'μάρτυς',
        transliteration: 'martys',
        definition: 'Originally "legal eyewitness"; through faithful deaths like Stephen’s and Polycarp’s, came to denote one who seals witness to Christ with blood.',
      },
    ],
    relatedTopicSlugs: ['ante-nicene-apologists-fathers', 'historical-resurrection-apologetics', 'sacraments-ancient-liturgy'],
    sources: [
      {
        title: 'The Didache (Teaching of the Twelve Apostles)',
        author: 'Early Jewish-Christian Community',
        year: 'c. AD 70–100',
        repository: 'Early Christian Writings',
        sourceType: 'Primary Text',
        url: 'https://www.earlychristianwritings.com/text/didache-roberts.html',
        citation: 'Ante-Nicene Fathers, Vol. 7 (Early Christian Writings).',
        summary: 'Full sixteen-chapter text of the earliest surviving church manual on ethics, baptism, fasting, prayer, and Eucharist.',
      },
      {
        title: 'Epistle of Mathetes to Diognetus & Martyrdom of Polycarp',
        author: 'Apostolic Fathers Corpus',
        year: 'c. AD 130–155',
        repository: 'New Advent',
        sourceType: 'Primary Text',
        url: 'https://www.newadvent.org/fathers/0101.htm',
        citation: 'Ante-Nicene Fathers, Vol. 1 (New Advent).',
        summary: 'Luminous early Christian apologetic letter portraying Christian citizenship in Rome and the "sweet exchange" of the Cross.',
      },
    ],
    attachments: [
      {
        key: 'apostolic-fathers-reader-pdf',
        title: 'Primary Reader: Selections from 1 Clement, Didache, Ignatius & Polycarp',
        description: 'Curated primary-source PDF anthology with historical introductions and study discussion questions.',
        attachmentKind: 'Primary Excerpt PDF',
        format: 'pdf',
        linkedSourceIndex: 1,
        documentTitle: 'The Apostolic Fathers: Selected Primary Texts',
        documentSubtitle: 'Paideia Patristics Reading Room Anthology',
        sections: [
          {
            heading: 'Biographical Chain of Discipleship',
            content:
              'Jesus Christ -> Apostle John (Ephesus) -> Polycarp of Smyrna (c. 69–155) -> Irenaeus of Lyons (c. 130–202) -> Hippolytus.\nNotice how only ONE living link (Polycarp) stands between the beloved Apostle John and Irenaeus’s late second-century defense of the four Gospels!',
          },
          {
            heading: 'Didache Chapter 7 on Baptism',
            content:
              '"And concerning baptism, baptize this way: Having first said all these things, baptize into the name of the Father, and of the Son, and of the Holy Spirit, in living water. But if you have not living water, baptize into other water; and if you can not in cold, in warm. But if you have not either, pour out water thrice upon the head into the name of Father and Son and Holy Spirit."',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'source_attribution',
        difficulty: 'Foundational',
        prompt: 'Which 86-year-old bishop and disciple of the Apostle John declared at his martyrdom: "Eighty and six years have I served Him, and He never did me any injury: how then can I blaspheme my King and my Saviour?"',
        options: ['Polycarp of Smyrna', 'Justin Martyr', 'Cyprian of Carthage', 'Ambrose of Milan'],
        correctIndex: 0,
        explanation: 'Polycarp of Smyrna spoke these immortal words in the stadium at Smyrna (~AD 155), recorded in The Martyrdom of Polycarp 9.3.',
        sourceReference: 'Martyrdom of Polycarp 9.3',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What is The Didache, rediscovered in an 11th-century manuscript in Constantinople in 1873?',
        options: [
          'A medieval Scholastic commentary on Aristotle',
          'A late first-century church manual covering the Two Ways ethics, baptism, fasting, prayer, and Eucharist',
          'A Gnostic gospel rejecting creation',
          'An imperial Roman tax register',
        ],
        correctIndex: 1,
        explanation: 'Metropolitan Philotheos Bryennios rediscovered The Didache in 1873 in Codex Hierosolymitanus, illuminating first-century Jewish-Christian catechesis and worship.',
        sourceReference: 'The Didache (c. AD 70–100)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which second-century work famously describes Christians acting in the world "as the soul is in the body" and celebrates the "sweet exchange" of One Righteous Person justifying many sinners?',
        options: [
          'The Epistle to Diognetus',
          'Shepherd of Hermas',
          'Fragments of Papias',
          'Rule of St. Benedict',
        ],
        correctIndex: 0,
        explanation: 'Chapters 5–6 and 9 of the Epistle to Diognetus contain both the soul-in-the-body citizenship portrait and the "sweet exchange" soteriology.',
        sourceReference: 'Epistle to Diognetus, chs. 5–6, 9',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'While being transported in chains to Rome (~AD 107), which bishop wrote seven letters refuting Docetism and first used the phrase "the catholic Church"?',
        options: ['Ignatius of Antioch', 'Clement of Alexandria', 'Gregory the Great', 'Jerome'],
        correctIndex: 0,
        explanation: 'Ignatius of Antioch wrote seven epistles en route to martyrdom, using he katholike ekklesia in Smyrnaeans 8.2.',
        sourceReference: 'Ignatius of Antioch, Smyrnaeans 8.2',
      },
      {
        questionType: 'true_false',
        difficulty: 'Intermediate',
        prompt: 'True or False: Ignatius of Antioch claimed equal apostolic inspiration with Peter and Paul when writing to the Romans.',
        options: [
          'True — Ignatius placed his letters above Paul’s.',
          'False — Ignatius explicitly wrote: "I do not, as Peter and Paul, issue commandments unto you. They were Apostles; I am a condemned man" (Romans 4.3).',
        ],
        correctIndex: 1,
        explanation: 'The Apostolic Fathers themselves recognized a clear line of demarcation between the unique authority of the Apostles and their own pastoral letters.',
        sourceReference: 'Ignatius, Epistle to the Romans 4.3',
      },
    ],
  },

  {
    slug: 'ante-nicene-apologists-fathers',
    disciplineSlug: 'church-fathers',
    title: 'Greek Apologists & Ante-Nicene Fathers (AD 150–313)',
    subtitle: 'Justin Martyr, Irenaeus of Lyons, Tertullian, Cyprian, Clement & Origen',
    summary:
      'Explores how second- and third-century Fathers engaged Greco-Roman philosophy, defeated Gnosticism and Marcionism, and forged Latin theological vocabulary under Roman persecution.',
    difficulty: 'Intermediate',
    readingMinutes: 16,
    era: 'Ante-Nicene Period (AD 150–313)',
    scriptureRefs: ['John 1:1, 9', 'Colossians 2:8', 'Ephesians 1:10'],
    sections: [
      {
        heading: 'Justin Martyr & The Logos Spermatikos',
        body: 'Converted through an encounter with an aged Christian by the seashore who pointed him to the Hebrew Prophets, Justin Martyr (~100–165) continued wearing his philosopher’s cloak in Rome, teaching that Christianity is the "true philosophy." Addressing Emperor Antoninus Pius in his First Apology, Justin refuted pagan slanders (atheism, cannibalism, immorality), gave our earliest detailed description of Sunday Christian worship (reading "the memoirs of the apostles" and the prophets, preaching, common prayers, kiss of peace, Eucharist, and collection for orphans and widows, 1 Apol. 65–67!), and articulated the Logos Spermatikos ("seminal Word," cf. John 1:9): whatever fragments of truth Greek philosophers like Socrates dimly glimpsed belonged to Christ, the eternal Logos now fully incarnate.',
        keyTakeaway:
          'Justin Martyr both engaged classical philosophy charitably and preserved our richest second-century snapshot of Sunday liturgical worship.',
      },
      {
        heading: 'Irenaeus of Lyons Against Gnosticism & Marcion',
        body: 'Two existential threats confronted second-century Christianity: Marcion of Sinope (excommunicated at Rome in AD 144), who severed the Old Testament Creator "Demiurge" from the Father of Jesus and mutilated the canon down to an edited Luke and ten Pauline letters; and Gnosticism (Valentinus, Basilides), which despised material creation, denied bodily incarnation and resurrection, and claimed secret elitist knowledge (gnosis). Bishop Irenaeus of Lyons (~130–202)—reared in Smyrna under Polycarp—answered decisively in five books Against Heresies (Adversus Haereses): the one Creator God is the Father of Jesus Christ; physical creation and bodily flesh are good and destined for resurrection; public Apostolic Succession and the baptismal Rule of Faith (regula fidei) expose secret Gnostic myths as recent fabrications; and Christ saves through Recapitulation (anakephalaiosis).',
        keyTakeaway:
          'Irenaeus united Creation and Redemption against Gnostic dualism, proving the Creator of Genesis is the Redeemer of Calvary.',
      },
      {
        heading: 'North African Latin Pioneers: Tertullian & Cyprian',
        body: 'In Roman North Africa (Carthage), the brilliant lawyer-rhetorician Tertullian (~155–220) became the father of Latin theology. In Apologeticus, he thundered against persecution: "The blood of Christians is seed!" (semen est sanguis Christianorum). Against Praxeas’s modalism, Tertullian coined the enduring Latin vocabulary Trinitas ("Trinity") and una substantia, tres personae ("one substance, three persons") a full century before Nicaea! A generation later, Bishop Cyprian of Carthage (martyred AD 258) navigated the crisis of the lapsed (lapsi) following Emperor Decius’s empire-wide persecution, writing On the Unity of the Catholic Church and leaving his famous ecclesiological aphorism: "He can no longer have God for his Father, who has not the Church for his mother."',
        keyTakeaway:
          'A full century before Nicaea, Tertullian’s Against Praxeas already articulated "one substance, three persons" in Latin.',
      },
    ],
    excerpts: [
      {
        author: 'Justin Martyr',
        work: 'First Apology, Chapter 67 (Weekly Worship of the Christians)',
        year: 'c. AD 155',
        quote:
          'And on the day called Sunday, all who live in cities or in the country gather together to one place, and the memoirs of the apostles or the writings of the prophets are read, as long as time permits; then, when the reader has ceased, the president verbally instructs, and exhorts to the imitation of these good things.',
        citation: '1 Apology 67',
        sourceUrl: 'https://www.newadvent.org/fathers/0126.htm',
      },
      {
        author: 'Tertullian of Carthage',
        work: 'Apology (Apologeticus), Chapter 50',
        year: 'AD 197',
        quote:
          'Nor does your cruelty, however exquisite, avail you; it is rather a temptation to us. The oftener we are mown down by you, the more in number we grow; the blood of Christians is seed.',
        citation: 'Apologeticus 50.13',
        sourceUrl: 'https://www.ccel.org/ccel/schaff/anf03.iv.iii.l.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Open Engagement ("Spoiling the Egyptians")',
        proponent: 'Justin Martyr, Clement of Alexandria, Origen',
        summary:
          'Reclaims every true philosophical insight in classical culture as belonging rightfully to Christ the Logos ("All truth is God’s truth").',
      },
      {
        tradition: 'Antithetical Distinctiveness',
        proponent: 'Tertullian ("What indeed has Athens to do with Jerusalem?")',
        summary:
          'Warns fiercely against speculative Greek philosophical synthesis corrupting apostolic revelation into heresy.',
      },
    ],
    keyTerms: [
      {
        term: 'Logos Spermatikos',
        originalScript: 'λόγος σπερματικός',
        transliteration: 'logos spermatikos',
        definition: 'Justin Martyr’s concept of seeds of divine reason implanted across humanity through Christ the eternal Word (John 1:9).',
      },
      {
        term: 'Marcionism',
        originalScript: 'Marcionism',
        transliteration: 'Marcionism',
        definition: 'Second-century heresy pitting a wrathful Old Testament "Demiurge" against an alien New Testament God of love, rejecting the OT.',
      },
    ],
    relatedTopicSlugs: ['apostolic-fathers', 'cappadocian-golden-age-fathers', 'trinity-theology-proper'],
    sources: [
      {
        title: 'Irenaeus — Against Heresies (Adversus Haereses, Complete 5 Books)',
        author: 'Irenaeus of Lyons',
        year: 'c. 180',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/schaff/anf01.ix.html',
        citation: 'Ante-Nicene Fathers, Vol. 1 (CCEL).',
        summary: 'Monumental refutation of Gnosticism and Marcionism affirming the unity of Old and New Testaments, Creation, and Incarnation.',
      },
      {
        title: 'Tertullian — Apology & Against Praxeas',
        author: 'Tertullian of Carthage',
        year: 'c. 197–213',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/schaff/anf03.html',
        citation: 'Ante-Nicene Fathers, Vol. 3: Latin Christianity: Its Founder, Tertullian (CCEL).',
        summary: 'Includes Tertullian’s Apologeticus, Prescription Against Heretics, and Trinitarian treatise Against Praxeas.',
      },
    ],
    attachments: [
      {
        key: 'gnosticism-vs-irenaeus-chart',
        title: 'Gnosticism & Marcionism vs. Irenaean Orthodoxy Study PDF',
        description: 'Side-by-side comparison of Gnostic dualism vs. Patristic orthodoxy on Creation, OT God, Incarnation, Salvation, and Resurrection.',
        attachmentKind: 'Study Guide PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Irenaeus Against the Gnostics: Five Theological Pillars',
        documentSubtitle: 'Paideia Ante-Nicene Patristics Guide',
        sections: [
          {
            heading: 'Contrast Across Five Doctrinal Axes',
            content:
              '1. Creator & Creation: Gnosticism says matter was formed by an ignorant Demiurge -> Irenaeus affirms one good Creator of heaven and earth.\n2. Old Testament: Marcion rejects OT entirely -> Irenaeus shows OT and NT form one progressive economy.\n3. Christology: Docetic Gnostics say Jesus only "seemed" to have flesh -> Irenaeus defends real flesh, blood, birth, and cross.\n4. Epistemology: Gnostics claim secret oral gnosis for spiritual elites -> Irenaeus appeals to public Scriptures and open Regula Fidei across churches.\n5. Eschatology: Gnostics seek escape of sparks from bodies -> Irenaeus proclaims bodily resurrection and renewed creation.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which North African Latin Father (~AD 155–220) coined the Latin term Trinitas and the formula una substantia, tres personae in his treatise Against Praxeas?',
        options: ['Tertullian', 'Jerome', 'Ambrose', 'Gregory the Great'],
        correctIndex: 0,
        explanation: 'Writing against the modalist Praxeas (~AD 213), Tertullian forged the classic Latin Trinitarian vocabulary a century prior to Nicaea.',
        sourceReference: 'Tertullian, Adversus Praxean',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What was the central error of Marcion of Sinope (excommunicated in AD 144)?',
        options: [
          'He claimed the Old Testament Creator God was an inferior, wrathful deity wholly separate from the Father of Jesus, and rejected the entire Old Testament',
          'He insisted Gentile Christians must observe Mosaic temple sacrifices',
          'He introduced icons into Byzantine churches',
          'He taught Pelagian self-salvation',
        ],
        correctIndex: 0,
        explanation: 'Marcion’s radical wedge between Creator and Redeemer prompted the early Church to articulate the unity of the two Testaments and clarify the Canon.',
        sourceReference: 'Irenaeus, Against Heresies; Tertullian, Against Marcion',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Intermediate',
        prompt: 'Which second-century apologist gave our earliest detailed account of Christian Sunday worship—including reading the "memoirs of the apostles," preaching, common prayer, Eucharist, and caring for orphans?',
        options: ['Justin Martyr (First Apology)', 'Origen (Contra Celsum)', 'Lactantius', 'Athenagoras'],
        correctIndex: 0,
        explanation: 'In Chapters 65–67 of his First Apology (~AD 155), Justin Martyr explained Christian weekly worship to Emperor Antoninus Pius.',
        sourceReference: 'Justin Martyr, First Apology 65–67',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which rhetorical question was posed by Tertullian to warn against speculative philosophy corrupting apostolic teaching?',
        options: [
          '"What indeed has Athens to do with Jerusalem?"',
          '"Why did God become Man?"',
          '"How can a man be righteous before God?"',
          '"Where were you when I laid the foundation of the earth?"',
        ],
        correctIndex: 0,
        explanation: 'In Prescription Against Heretics 7, Tertullian contrasted "Athens" (pagan academy) with "Jerusalem" (the Church of the Apostles).',
        sourceReference: 'Tertullian, De Praescriptione Haereticorum 7',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'What Greek term describes Irenaeus’s teaching that Christ, as the Second Adam, summed up and retraced every stage of human life in obedience to undo Adam’s ruin?',
        options: ['Anakephalaiosis (Recapitulation)', 'Homoiousios', 'Apokatastasis', 'Eisegesis'],
        correctIndex: 0,
        explanation: 'Drawn from Ephesians 1:10, anakephalaiosis (Recapitulation) is the centerpiece of Irenaeus’s theology in Against Heresies.',
        sourceReference: 'Irenaeus, Against Heresies III.18; V.21',
      },
    ],
  },

  {
    slug: 'latin-doctors-augustine',
    disciplineSlug: 'church-fathers',
    title: 'Golden Age Greek & Latin Fathers: Athanasius, Cappadocians, Chrysostom, Jerome & Augustine',
    subtitle: 'Four Towering Centuries of Exegesis, Preaching, Translation, and Confessional Depth',
    summary:
      'Studies the Patristic Golden Age (4th–5th centuries): Athanasius’s five exiles, the Cappadocian trio, John "Golden-Mouthed" Chrysostom, Jerome’s Vulgate, and Augustine’s Confessions and City of God.',
    difficulty: 'Foundational',
    readingMinutes: 18,
    era: 'Nicene & Post-Nicene Golden Age (325–451)',
    scriptureRefs: ['Romans 13:13–14', 'Hebrews 11:10, 16', 'John 1:1–14'],
    sections: [
      {
        heading: 'Athanasius, The Cappadocians & John Chrysostom in the East',
        body: 'In the Greek East, Athanasius of Alexandria (296–373)—exiled five times covering seventeen years by emperors sympathetic to Arianism—stood indomitably for Christ’s full deity because salvation itself hung on whether the Savior was truly God. Passing the torch, the Cappadocian Fathers—brothers Basil the Great (who built the Basiliad hospital-hospice complex for the poor and lepers!) and Gregory of Nyssa, mentored alongside their sister Macrina the Younger ("the Fourth Cappadocian") and lifelong friend Gregory of Nazianzus—crowned Nicene Trinitarianism. Meanwhile, in Antioch and Constantinople, John Chrysostom (347–407, posthumously named "Golden-Mouthed") preached verse-by-verse expository homilies through Genesis, Matthew, John, Acts, and Paul’s Epistles while fearlessly rebuking imperial luxury on behalf of the destitute.',
        keyTakeaway:
          'Patristic orthodoxy united razor-sharp Trinitarian theology with hospital-building mercy (Basil’s Basiliad) and fearless preaching (Chrysostom).',
      },
      {
        heading: 'Ambrose & Jerome in the Latin West',
        body: 'In the Latin West, four figures were honored as the original Doctors of the Church: Ambrose of Milan, Jerome, Augustine of Hippo, and Gregory the Great. Ambrose (340–397) introduced antiphonal congregational hymnody, courageously held Emperor Theodosius accountable after the massacre of Thessalonica, and mentored a brilliant young North African rhetoric professor named Augustine. Meanwhile, Eusebius Sophronius Hieronymus—Jerome (347–420)—settled in a monastery cell in Bethlehem, mastering biblical Hebrew under Jewish rabbis ("Hebraica veritas") in addition to Greek and Latin to produce the Latin Vulgate translation that served Western Christendom for over a millennium.',
        keyTakeaway:
          'Jerome’s return to the Hebrew text in Bethlehem established linguistic scholarship as an act of sacred devotion.',
      },
      {
        heading: 'Augustine of Hippo: Confessions & The City of God',
        body: 'Towering over Western intellectual history stands Augustine, Bishop of Hippo Regius in North Africa (354–430). In his Confessions (c. 397)—addressed directly as a sustained prayer to God—Augustine traced his restless odyssey through Manichaeism, skepticism, and Neoplatonism until picking up Paul’s Epistle in a Milanese garden ("Tolle, lege—Take up and read," Romans 13:13–14), uttering the immortal opening prayer: "You have made us for Yourself, O Lord, and our heart is restless until it rests in You." After Alaric’s Visigoths sacked Rome in AD 410 and pagans blamed Christianity, Augustine spent thirteen years composing the twenty-two books of The City of God (De Civitate Dei), interpreting all human history as the intermingling of two cities defined by two loves: the Earthly City (amor sui—love of self even to contempt of God) and the City of God (amor Dei—love of God even to self-forgetfulness), journeying as pilgrims until eternal peace.',
        keyTakeaway:
          'Augustine’s Confessions shaped Christian interiority and grace, while City of God forged the Christian theology of history and political order.',
      },
    ],
    excerpts: [
      {
        author: 'Augustine of Hippo',
        work: 'Confessions, Book I, Chapter 1',
        year: 'c. 397',
        quote:
          'Thou awakest us to delight in Thy praise; for Thou madest us for Thyself, and our heart is restless, until it repose in Thee.',
        citation: 'Confessions I.1.1',
        sourceUrl: 'https://www.ccel.org/ccel/augustine/confess.html',
      },
      {
        author: 'John Chrysostom',
        work: 'Homily 50 on the Gospel of Matthew, Section 3–4',
        year: 'c. 390',
        quote:
          'Do you wish to honor the body of Christ? Do not ignore Him when He is naked. Do not pay Him homage in the temple clad in silk, only then to neglect Him outside where He is cold and ill-clad. He who said: "This is my body" is the same who said: "You saw me hungry and you gave me no food."',
        citation: 'Homilies on Matthew 50.3',
        sourceUrl: 'https://www.newadvent.org/fathers/200150.htm',
      },
    ],
    perspectives: [
      {
        tradition: 'Universal Western Debt to Augustine',
        proponent: 'B.B. Warfield ("The Reformation was the triumph of Augustine’s doctrine of grace over Augustine’s doctrine of the Church")',
        summary:
          'Both medieval Catholic Scholasticism and Protestant Reformers appealed intensely to Augustine as their premier patristic authority after Scripture.',
      },
      {
        tradition: 'Eastern Three Hierarchs',
        proponent: 'Basil the Great, Gregory the Theologian, John Chrysostom',
        summary:
          'Honored together in Eastern liturgy as models of pastoral charity, contemplative Trinitarian theology, and biblical preaching.',
      },
    ],
    keyTerms: [
      {
        term: 'Hebraica Veritas',
        originalScript: 'Hebraica veritas',
        transliteration: 'Hebraica veritas',
        definition: '"The Hebrew truth"—Jerome’s scholarly principle of translating the Old Testament directly from the original Hebrew text rather than secondary Greek translations.',
      },
      {
        term: 'Ordo Amoris',
        originalScript: 'ordo amoris',
        transliteration: 'ordo amoris',
        definition: '"Rightly ordered love"—Augustine’s definition of virtue: loving God supremely and loving neighbor and creation in God rather than idolatrously.',
      },
    ],
    relatedTopicSlugs: ['ante-nicene-apologists-fathers', 'ordo-salutis-grace', 'alexandrian-antiochene-quadriga'],
    sources: [
      {
        title: 'Augustine — The Confessions & The City of God (NPNF I, Vols. 1–2)',
        author: 'Augustine of Hippo',
        year: '397 / 426',
        repository: 'CCEL',
        sourceType: 'Primary Text',
        url: 'https://www.ccel.org/ccel/augustine/confess.html',
        citation: 'Nicene and Post-Nicene Fathers, First Series, Vols. 1–2 (CCEL).',
        summary: 'Complete English texts of Augustine’s autobiographical prayer Confessions and historical-theological magnum opus City of God.',
      },
      {
        title: 'John Chrysostom — Homilies on the Gospel of Matthew & Epistle to the Romans',
        author: 'John Chrysostom',
        year: 'c. 390',
        repository: 'New Advent',
        sourceType: 'Commentary',
        url: 'https://www.newadvent.org/fathers/2001.htm',
        citation: 'Nicene and Post-Nicene Fathers, First Series, Vol. 10 (New Advent).',
        summary: 'Masterpieces of Antiochene verse-by-verse biblical exposition and ethical application from the Golden Age of preaching.',
      },
    ],
    attachments: [
      {
        key: 'golden-age-fathers-reading-plan',
        title: 'Patristic Golden Age Reading Plan & Biographical Atlas (PDF)',
        description: 'Structured 8-week primary-source reading plan through Athanasius, Macrina & Cappadocians, Chrysostom, Jerome, and Augustine.',
        attachmentKind: 'Primary Excerpt PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Reading the Golden Age Church Fathers: An 8-Week Syllabus',
        documentSubtitle: 'Paideia Patristic Study Attachment',
        sections: [
          {
            heading: 'Recommended Entry-Point Masterpieces',
            content:
              'Week 1–2: Athanasius, *On the Incarnation* (chs. 1–9, 54).\nWeek 3: Gregory of Nyssa, *Life of St. Macrina* & Basil the Great, *On Social Justice* / *On the Holy Spirit*.\nWeek 4: Gregory of Nazianzus, *Five Theological Orations* (Orations 27–31).\nWeek 5: John Chrysostom, *Paschal Homily* & *On the Priesthood*.\nWeek 6: Jerome, *Preface to the Books of Samuel and Kings* (Prologus Galeatus).\nWeek 7–8: Augustine, *Confessions* (Books I–IX) & *City of God* (Books XIV.28, XIX).',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'source_attribution',
        difficulty: 'Foundational',
        prompt: 'Which North African Church Father opened his Confessions with the prayer: "Thou madest us for Thyself, and our heart is restless, until it repose in Thee"?',
        options: ['Augustine of Hippo', 'Cyprian of Carthage', 'Athanasius', 'Jerome'],
        correctIndex: 0,
        explanation: 'Augustine opens Confessions I.1.1 with this famous prayer reflecting humanity’s created longing for communion with God.',
        sourceReference: 'Augustine, Confessions I.1.1',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What catastrophic historical event in AD 410 prompted Augustine to write his twenty-two-book masterpiece The City of God?',
        options: [
          'The Visigothic sack of Rome under Alaric, after which pagans blamed Christianity for abandoning Rome’s ancestral gods',
          'The eruption of Mount Vesuvius in AD 79',
          'The fall of Constantinople in 1453',
          'The signing of the Edict of Milan in 313',
        ],
        correctIndex: 0,
        explanation: 'When Alaric’s Goths sacked Rome in 410, pagan elites claimed Rome fell because Christians neglected Jupiter; Augustine answered by contrasting earthly empires with the eternal City of God.',
        sourceReference: 'Augustine, Retractationes II.43; City of God I.1',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which Latin Doctor of the Church moved to Bethlehem, learned Hebrew from Jewish scholars, and translated the Latin Vulgate Bible?',
        options: ['Jerome (Eusebius Hieronymus)', 'Ambrose of Milan', 'Leo the Great', 'Hilary of Poitiers'],
        correctIndex: 0,
        explanation: 'Commissioned initially by Pope Damasus I in 382, Jerome spent decades in Bethlehem translating the Old Testament directly from the Hebraica veritas.',
        sourceReference: 'Jerome, Prologus Galeatus',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Why was John of Antioch/Constantinople (347–407) given the Greek epithet "Chrysostomos"?',
        options: [
          'It means "Golden-Mouthed," honoring his unsurpassed eloquence in verse-by-verse biblical preaching',
          'He wore a golden imperial crown',
          'He translated Plato into Syriac',
          'He built the walls of Constantinople',
        ],
        correctIndex: 0,
        explanation: 'Chrysostomos ("Golden-Mouthed") recognized his extraordinary homiletical mastery and pastoral courage.',
        sourceReference: 'John Chrysostom (347–407)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Advanced',
        prompt: 'How many times was Athanasius of Alexandria driven into exile by Roman emperors during his forty-five-year episcopate defending Nicene orthodoxy?',
        options: ['Never', 'Five times (totaling roughly seventeen years in exile)', 'Once for two weeks', 'Twelve times'],
        correctIndex: 1,
        explanation: 'Under Constantine, Constantius II, Julian the Apostate, and Valens, Athanasius endured five exiles rather than compromise Christ’s full deity.',
        sourceReference: 'Life of Athanasius (AD 328–373)',
      },
    ],
  },

  // =========================================================================
  // LITURGICS & MORAL THEOLOGY ("ETC.")
  // =========================================================================
  {
    slug: 'sacraments-ancient-liturgy',
    disciplineSlug: 'ethics-liturgy',
    title: 'Sacramental Theology & Ancient Christian Liturgy',
    subtitle: 'Lex Orandi Lex Credendi, Baptism, Eucharistic Presence & The Christian Year',
    summary:
      'Examines Augustine’s definition of sacraments as "visible words," ancient liturgical structures from Justin Martyr to Hippolytus and Chrysostom, and comparative views of Baptism and the Lord’s Supper.',
    difficulty: 'Foundational',
    readingMinutes: 15,
    era: 'Patristic, Reformation & Contemporary Worship',
    scriptureRefs: ['Matthew 28:19', 'Luke 22:19–20', '1 Corinthians 11:23–29', 'Romans 6:3–4'],
    sections: [
      {
        heading: 'Visible Words & Lex Orandi, Lex Credendi',
        body: 'Augustine defined a sacrament as an "outward and visible sign of an inward and invisible grace," calling sacraments verba visibilia ("visible words"): whereas preached Scripture enters through the ear, water, bread, and wine proclaim the exact same Gospel promise tangibly to eye, touch, and taste! Across Christian antiquity, Prosper of Aquitaine’s principle lex orandi, lex credendi ("the law of prayer establishes the law of belief") highlighted how the Church’s weekly worship—composed of the Liturgy of the Word (Scripture readings, psalmody, homily, intercessions) and Liturgy of the Table (Sursum Corda—"Lift up your hearts," Sanctus, Words of Institution, Epiclesis, and Communion)—embodied Trinitarian faith long before formal textbooks.',
        keyTakeaway:
          'From Justin Martyr (AD 155) onward, historic Christian worship holds together the Ministry of the Word and the Ministry of the Table.',
      },
      {
        heading: 'Baptism Across Christian Traditions',
        body: 'Rooted in Christ’s command (Matthew 28:19) and union with His death and resurrection (Romans 6:3–4), Baptism serves as the solemn initiatory rite into the visible Body of Christ. While virtually all Christians insist upon water in the Triune Name, historic traditions differ on mode and subjects: Paedobaptist traditions (Eastern Orthodox, Roman Catholic, Lutheran, Reformed, Anglican, Methodist) baptize both professing converts and infants of believing households—grounded either in baptismal regeneration or covenantal continuity with circumcision as sign and seal of the Covenant of Grace (Colossians 2:11–12; Acts 2:39). Credobaptist traditions (Baptist, Anabaptist, Pentecostal) reserve baptism exclusively for professing disciples able to articulate personal repentance and faith.',
        keyTakeaway:
          'Debates between paedobaptism and credobaptism reflect deeper hermeneutical convictions regarding covenant continuity between Israel and the New Covenant Church.',
      },
      {
        heading: 'Four Historic Views of the Eucharist / Lord’s Supper',
        body: 'How is Christ present when the Church celebrates the Eucharist ("thanksgiving")? Four classic positions emerged in church history: (1) Roman Catholic Transubstantiation (Fourth Lateran 1215; Trent 1551)—using Aristotelian categories, the inner substance of bread and wine transforms wholly into Christ’s body and blood while outward accidents remain; (2) Eastern Orthodox Holy Mystery (Metabole)—affirms true somatic change through the Spirit’s invocation (epiclesis) while declining scholastic philosophical mechanics; (3) Lutheran Sacramental Union—Christ’s true body and blood are objectively present "in, with, and under" the bread and wine; (4) Reformed Spiritual Real Presence (Calvin, Cranmer)—while Christ’s glorified human body remains locally at the Father’s right hand in heaven, the Holy Spirit truly lifts believers’ hearts upward (Sursum Corda) to feed spiritually and really upon the whole Christ by faith; alongside (5) Zwinglian / Memorialist emphasis on covenantal remembrance and proclamation.',
        keyTakeaway:
          'Contrary to popular misconception, Calvin’s Reformed view affirms real spiritual communion with Christ through the Holy Spirit, distinct from bare memorialism.',
      },
    ],
    excerpts: [
      {
        author: 'Augustine of Hippo',
        work: 'Tractates on the Gospel of John, Tractate 80, Section 3',
        year: 'c. 414',
        quote:
          'Take away the word, and what is the water except water? The word is added to the element, and it becomes a sacrament, itself also, as it were, a visible word (visibile verbum).',
        citation: 'In Joannis Evangelium Tractatus 80.3',
        sourceUrl: 'https://www.newadvent.org/fathers/1701080.htm',
      },
      {
        author: 'Ancient Eucharistic Dialogue (Apostolic Tradition / Cyril of Jerusalem)',
        work: 'Sursum Corda',
        year: '3rd–4th Century',
        quote:
          'Celebrant: "Lift up your hearts!" — People: "We lift them up to the Lord!" — Celebrant: "Let us give thanks to the Lord our God!" — People: "It is right and just!"',
        citation: 'Apostolic Tradition 4; Cyril of Jerusalem, Mystagogical Catechesis 5.4',
      },
    ],
    perspectives: [
      {
        tradition: 'Catholic & Eastern Orthodox (Seven Sacraments / Mysteries)',
        proponent: 'Cyril of Jerusalem, Thomas Aquinas, John Chrysostom',
        summary:
          'Celebrates seven sacraments/mysteries centered in the Eucharistic liturgy as objective channels of sanctifying grace.',
      },
      {
        tradition: 'Magisterial Protestant (Two Dominical Sacraments)',
        proponent: 'Luther, Calvin, Cranmer',
        summary:
          'Recognizes the two sacraments directly instituted by Christ with physical elements—Baptism and the Lord’s Supper—as means of grace received through faith.',
      },
      {
        tradition: 'Baptist / Free Church (Ordinances)',
        proponent: 'Balthasar Hubmaier, Second London Confession',
        summary:
          'Emphasizes Baptism of professing believers by immersion and the Lord’s Supper as obedient gospel ordinances proclaiming Christ’s death.',
      },
    ],
    keyTerms: [
      {
        term: 'Verbum Visibile',
        originalScript: 'verbum visibile',
        transliteration: 'verbum visibile',
        definition: 'Augustine’s definition of a sacrament as a "visible word" enacting the preached Gospel promise to the senses.',
      },
      {
        term: 'Sursum Corda & Epiclesis',
        originalScript: 'sursum corda / ἐπίκλησις',
        transliteration: 'sursum corda / epiklesis',
        definition: '"Lift up your hearts" (ancient Eucharistic preface) and the prayer invoking the Holy Spirit upon the gathered congregation and gifts.',
      },
    ],
    relatedTopicSlugs: ['pneumatology-ecclesiology-eschatology', 'apostolic-fathers', 'virtue-ethics-imago-dei'],
    sources: [
      {
        title: 'Cyril of Jerusalem — Catechetical & Mystagogical Lectures',
        author: 'Cyril of Jerusalem',
        year: 'c. 350',
        repository: 'New Advent',
        sourceType: 'Primary Text',
        url: 'https://www.newadvent.org/fathers/3101.htm',
        citation: 'Nicene and Post-Nicene Fathers II, Vol. 7 (New Advent).',
        summary: 'Fourth-century catechetical lectures delivered in Jerusalem’s Church of the Holy Sepulchre explaining Baptism, Chrismation, and the Eucharist.',
      },
      {
        title: 'The Divine Liturgy of St. John Chrysostom',
        author: 'Byzantine Liturgical Tradition',
        year: '4th–5th Century',
        repository: 'CCEL',
        sourceType: 'Primary Text',
        url: 'https://www.ccel.org/ccel/pearse/morefathers/files/chrysostom_liturgy_01_text.htm',
        citation: 'Early Church Fathers Additional Texts (CCEL).',
        summary: 'English text of the historic Eastern Christian Eucharistic liturgy steeped in Scripture and Trinitarian doxology.',
      },
    ],
    attachments: [
      {
        key: 'eucharistic-views-comparison',
        title: 'Comparative Guide to Baptism & Eucharistic Presence Across Traditions',
        description: 'Clear reference chart comparing Transubstantiation, Metabole, Sacramental Union, Reformed Spiritual Presence, and Memorialism.',
        attachmentKind: 'Diagram / Chart',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Word & Sacrament: Comparative Liturgical Theology',
        documentSubtitle: 'Paideia Liturgics Study Attachment',
        sections: [
          {
            heading: 'Five Historic Understandings of the Lord’s Supper',
            content:
              '1. Roman Catholic (Transubstantiation): Substance of bread/wine changes into Christ’s body/blood; accidents remain.\n2. Eastern Orthodox (Holy Mystery / Metabole): True real change via Epiclesis without Aristotelian substance/accident explanation.\n3. Lutheran (Sacramental Union): Christ’s body and blood truly present "in, with, and under" the bread and wine.\n4. Reformed (Calvin — Spiritual Real Presence): Believers’ hearts are lifted by the Holy Spirit (Sursum Corda) to truly partake of the ascended Christ by faith.\n5. Zwinglian / Memorialist: Solemn covenantal remembrance and corporate thanksgiving.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'source_attribution',
        difficulty: 'Foundational',
        prompt: 'Which Father coined the definition of a sacrament as a verbum visibile ("visible word")?',
        excerptContext: '"The word is added to the element, and it becomes a sacrament, itself also, as it were, a visible word."',
        options: ['Augustine of Hippo', 'Ulrich Zwingli', 'Gregory Palamas', 'Clement of Rome'],
        correctIndex: 0,
        explanation: 'Augustine formulated this classic phrase in Tractate 80.3 on the Gospel of John.',
        sourceReference: 'Augustine, Tractates on John 80.3',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'How did John Calvin’s Reformed doctrine of the Lord’s Supper differ from bare Zwinglian memorialism?',
        options: [
          'Calvin taught Aristotelian transubstantiation',
          'Calvin affirmed a true Spiritual Real Presence: while Christ’s body remains locally in heaven, the Holy Spirit genuinely unites believers to feed upon the whole Christ by faith',
          'Calvin abolished the Lord’s Supper altogether',
          'Calvin taught that only clergy could partake',
        ],
        correctIndex: 1,
        explanation: 'Calvin insisted the signs are never empty tokens; the Holy Spirit bridges heaven and earth (Sursum Corda) to nourish believers truly with Christ.',
        sourceReference: 'Calvin, Institutes IV.17.10–12',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Foundational',
        prompt: 'What does the liturgical maxim lex orandi, lex credendi mean?',
        options: [
          'The law of prayer establishes/reflects the law of belief',
          'Only Latin may be spoken in prayer',
          'Prayer replaces the reading of Scripture',
          'Civil law governs church creeds',
        ],
        correctIndex: 0,
        explanation: 'Derived from Prosper of Aquitaine (5th century), it expresses the deep reciprocity between how the Church worships and what the Church confesses.',
        sourceReference: 'Prosper of Aquitaine, Indiculus ch. 8',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Why do Protestant confessions recognize two sacraments (Baptism and the Lord’s Supper) rather than seven?',
        options: [
          'Because Protestants reject marriage and ordination as sinful',
          'Because only Baptism and the Lord’s Supper were directly instituted by Christ Himself with a commanded physical element joined to a Gospel promise',
          'Because only two sacraments were known in the Middle Ages',
          'Because Paul forbade confirmation',
        ],
        correctIndex: 1,
        explanation: 'While honoring marriage, ordination, and confession pastorally, Reformers reserved "sacrament" strictly for rites instituted by Jesus with an outward element and promise of grace.',
        sourceReference: 'Thirty-Nine Articles, Art. XXV; Westminster Confession ch. 27',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'What is the Greek liturgical term for the Eucharistic prayer invoking the Holy Spirit upon the worshiping assembly and elements?',
        options: ['Epiclesis', 'Apokatastasis', 'Homologoumena', 'Prolegomena'],
        correctIndex: 0,
        explanation: 'Epiclesis ("calling upon / invocation") asks the Father to send the Holy Spirit to sanctify the gifts and communicants.',
        sourceReference: 'Divine Liturgy of St. John Chrysostom',
      },
    ],
  },

  {
    slug: 'virtue-ethics-imago-dei',
    disciplineSlug: 'ethics-liturgy',
    title: 'Christian Moral Theology, Virtue Formation & The Imago Dei',
    subtitle: 'Beatitudes, Theological Virtues, Natural Law, Neighbor-Love & Human Dignity',
    summary:
      'Explores how Christianpaideia forms moral character: the Sermon on the Mount, cardinal and theological virtues, sanctity of human life in the Imago Dei, and public discipleship.',
    difficulty: 'Foundational',
    readingMinutes: 14,
    era: 'Biblical, Patristic, Thomistic & Contemporary',
    scriptureRefs: ['Genesis 1:26–27', 'Micah 6:8', 'Matthew 5–7', 'Matthew 22:37–40', '1 Corinthians 13:13'],
    sections: [
      {
        heading: 'Imago Dei: The Theological Bedrock of Human Dignity',
        body: 'In the ancient Greco-Roman world, human worth was stratified sharply by citizenship, wealth, pedigree, and utility—rendering infanticide, gladiatorial bloodshed, and mistreatment of the weak commonplace. Early Christianity sparked a quiet moral revolution grounded in Genesis 1:26–27 and the Incarnation: every human being—from womb to frailty, disabled or vigorous, slave or emperor—bears the indelible Imago Dei ("Image of God") and is someone for whom Christ died. Consequently, early Christians rescued exposed infants, cared sacrificially for plague victims when pagan cities fled (documented even by hostile Emperor Julian the Apostate!), founded the first public hospitals, and transformed moral imagination regarding the vulnerable.',
        keyTakeaway:
          'Universal human rights and equal moral dignity historically grew from the biblical soil of the Imago Dei.',
      },
      {
        heading: 'The Sermon on the Mount & Theological Virtues',
        body: 'Rather than reducing ethics to either bare rule-keeping (deontology) or calculating outcomes (utilitarianism), Jesus’s Sermon on the Mount (Matthew 5–7) and New Testament paraenesis aim at interior character formation—true Christian paideia! Building on Paul (1 Corinthians 13:13) and Augustine’s "rightly ordered love" (ordo amoris), Ambrose and Thomas Aquinas integrated the four classical Cardinal Virtues (Prudence, Justice, Fortitude, Temperance) with the three infused Theological Virtues that orient the soul directly to God: Faith, Hope, and Charity (Agape—self-giving love of God and neighbor, the greatest of all, Matthew 22:37–40).',
        keyTakeaway:
          'Christian ethics asks not merely "What rules must I avoid breaking?" but "What kind of person is the Holy Spirit forming me to become in Christ?"',
      },
      {
        heading: 'Natural Law, Conscience & Vocation in the World',
        body: 'Following Romans 2:14–15, classical Christian ethics (Chrysostom, Aquinas, Hooker, Calvin, C.S. Lewis’s Abolition of Man) affirms Natural Law: God’s moral wisdom woven into human nature and discernible by conscience, providing common moral ground for justice in pluralistic societies even where special revelation is not yet embraced. At the Reformation, Luther and Calvin also recovered the priesthood of all believers and the dignity of everyday Vocation (Beruf): serving neighbor faithfully as parent, artisan, physician, scholar, or magistrate is no "second-class" secular existence beneath monastic vows, but sacred service offered coram Deo ("before the face of God").',
        keyTakeaway:
          'Natural Law grounds public moral discourse with all neighbors, while Vocation hallows ordinary daily work as worship and neighbor-love.',
      },
    ],
    excerpts: [
      {
        author: 'Augustine of Hippo',
        work: 'On the Morals of the Catholic Church, Chapter 15',
        year: '388',
        quote:
          'I hold virtue to be nothing else than perfect love of God... Temperance is love giving itself entirely to that which is loved; fortitude is love readily bearing all things for the sake of the loved object; justice is love serving only the loved object, and therefore ruling rightly; prudence is love distinguishing with sagacity between what hinders it and what helps it.',
        citation: 'De Moribus Ecclesiae Catholicae 15.25',
        sourceUrl: 'https://www.newadvent.org/fathers/1401.htm',
      },
      {
        author: 'Gregory of Nyssa',
        work: 'Fourth Homily on Ecclesiastes (Earliest Total Critique of Slavery in Antiquity)',
        year: 'c. 379',
        quote:
          'You condemn man to slavery, when his nature is free and possesses free will, and you legislate in competition with God, overturning His law for the human species... For what price, tell me? What did you find in existence worth as much as this human nature?',
        citation: 'Homilies on Ecclesiastes IV (on Eccl 2:7)',
      },
    ],
    perspectives: [
      {
        tradition: 'Thomistic Natural Law & Virtue',
        proponent: 'Augustine, Thomas Aquinas, Alasdair MacIntyre',
        summary:
          'Synthesizes teleological human flourishing, natural law, cardinal habits, and grace-infused theological virtues crowned by charity.',
      },
      {
        tradition: 'Reformed Vocation & Third Use of the Law',
        proponent: 'John Calvin, Abraham Kuyper, Oliver O’Donovan',
        summary:
          'Highlights the "third use of the moral law" (tertia usus legis) as a joyful guide for grateful redeemed living across every sphere of culture.',
      },
      {
        tradition: 'Kingdom / Cruciform Witness',
        proponent: 'Dietrich Bonhoeffer (Cost of Discipleship), Stanley Hauerwas',
        summary:
          'Emphasizes the Church itself as an alternative community embodying the Beatitudes, peacemaking, and costly discipleship.',
      },
    ],
    keyTerms: [
      {
        term: 'Theological Virtues',
        originalScript: 'πίστις, ἐλπίς, ἀγάπη',
        transliteration: 'pistis, elpis, agape',
        definition: 'Faith, Hope, and Love (1 Cor 13:13)—gracious dispositions uniting the believer to God and overflowing toward neighbor.',
      },
      {
        term: 'Coram Deo',
        originalScript: 'coram Deo',
        transliteration: 'coram Deo',
        definition: '"Before the face of God"—living all of life, public and private, in conscious joyful accountability to God’s presence.',
      },
    ],
    relatedTopicSlugs: ['old-testament-redemptive-history', 'latin-doctors-augustine', 'modern-global-christianity'],
    sources: [
      {
        title: 'Augustine — On the Morals of the Catholic Church (De Moribus)',
        author: 'Augustine of Hippo',
        year: '388',
        repository: 'New Advent',
        sourceType: 'Treatise',
        url: 'https://www.newadvent.org/fathers/1401.htm',
        citation: 'Nicene and Post-Nicene Fathers I, Vol. 4 (New Advent).',
        summary: 'Augustine’s seminal treatise recasting the four classical virtues as four expressions of rightly ordered love for God.',
      },
      {
        title: 'Aquinas — Summa Theologica I-II, Q. 62 (Theological Virtues) & Q. 94 (Natural Law)',
        author: 'Thomas Aquinas',
        year: 'c. 1271',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/aquinas/summa.FS_Q62.html',
        citation: 'Summa Theologica, First Part of the Second Part (CCEL).',
        summary: 'Classic moral treatise on human flourishing (beatitudo), virtue habits, and the precepts of natural law.',
      },
    ],
    attachments: [
      {
        key: 'three-uses-of-law-ethics',
        title: 'Christian Moral Theology: Three Uses of the Law & Seven Virtues Sheet',
        description: 'Study guide outlining the civil, pedagogical, and normative uses of God’s moral law alongside the Cardinal and Theological Virtues.',
        attachmentKind: 'Scholarly Notes',
        format: 'markdown',
        linkedSourceIndex: 1,
        documentTitle: 'Formation in Christ: Virtues, Law & Vocation',
        documentSubtitle: 'Paideia Moral Theology Companion',
        sections: [
          {
            heading: 'The Classical Three Uses of God’s Moral Law (Usus Legis)',
            content:
              '1. **First Use (Civil / Restraining — *usus politicus*)**: Restrains public evil and preserves civil order in society.\n2. **Second Use (Mirror / Pedagogical — *usus elenchticus*)**: Exposes human sin and inability, driving us to Christ for grace (Rom 3:20; Gal 3:24).\n3. **Third Use (Guide of Gratitude — *tertia usus legis*)**: Delights and guides the regenerated believer in how to love God and neighbor (Ps 119:97; Rom 13:8–10).',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'In classical Christian moral theology (grounded in 1 Corinthians 13:13), which three virtues are known as the "Theological Virtues"?',
        options: [
          'Prudence, Justice, and Fortitude',
          'Faith, Hope, and Love (Charity)',
          'Wealth, Eloquence, and Honor',
          'Silence, Solitude, and Fasting',
        ],
        correctIndex: 1,
        explanation: 'Faith, Hope, and Love (1 Cor 13:13) are the three Theological Virtues, alongside the four Cardinal Virtues (Prudence, Justice, Fortitude, Temperance).',
        sourceReference: '1 Corinthians 13:13; Aquinas, ST I-II, q. 62',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Upon what foundational biblical doctrine did early Christians ground the equal sanctity of every human life—leading them to oppose infanticide and build hospitals for the destitute?',
        options: [
          'The Imago Dei (Image of God, Genesis 1:26–27) reinforced by the Incarnation',
          'Roman imperial citizenship laws',
          'Stoic fatalism',
          'Aristotelian social hierarchy',
        ],
        correctIndex: 0,
        explanation: 'Because every human person bears God’s image (Gen 1:26–27) and Christ assumed human nature, human dignity is intrinsic rather than based on utility or status.',
        sourceReference: 'Genesis 1:26–27; Gregory of Nyssa, Homilies on Ecclesiastes IV',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Advanced',
        prompt: 'Which fourth-century Cappadocian Father delivered the earliest uncompromising total condemnation of the institution of human slavery in ancient literature, appealing directly to Genesis 1:26?',
        options: ['Gregory of Nyssa', 'Aristotle', 'Seneca', 'Constantine'],
        correctIndex: 0,
        explanation: 'In his Fourth Homily on Ecclesiastes (~AD 379), Gregory of Nyssa denounced slave-owning as an arrogant usurpation against God who created human nature free in His image.',
        sourceReference: 'Gregory of Nyssa, Homilies on Ecclesiastes IV',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'In Reformation moral theology (Calvin & Melanchthon), what is the "Third Use of the Law" (tertia usus legis)?',
        options: [
          'Earning justification through flawless merit',
          'Serving as a joyful rule of gratitude showing regenerated believers how to please God and love neighbor',
          'Levying royal taxes',
          'Abolishing the Ten Commandments completely',
        ],
        correctIndex: 1,
        explanation: 'For redeemed believers already justified by grace alone, the moral law shines as a lamp of gratitude guiding holy love.',
        sourceReference: 'Calvin, Institutes II.7.12',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Foundational',
        prompt: 'What Latin phrase captures the Reformation doctrine of Vocation—that ordinary work in family, craft, and society is lived "before the face of God"?',
        options: ['Coram Deo', 'Ex cathedra', 'Sine qua non', 'Ad hominem'],
        correctIndex: 0,
        explanation: 'Coram Deo ("before the face of God") expresses that every honest calling—not merely monastic life—is sacred service before God.',
        sourceReference: 'Reformation Doctrine of Vocation',
      },
    ],
  },
];
