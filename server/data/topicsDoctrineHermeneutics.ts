import type { SeedTopicSpec } from '../types.js';

export const TOPICS_DOCTRINE_HERMENEUTICS: SeedTopicSpec[] = [
  // =========================================================================
  // SYSTEMATIC DOCTRINE
  // =========================================================================
  {
    slug: 'trinity-theology-proper',
    disciplineSlug: 'doctrine',
    title: 'Theology Proper & The Holy Trinity',
    subtitle: 'Divine Simplicity, One Ousia in Three Hypostases, Perichoresis & Inseparable Operations',
    summary:
      'Explores classical Christian monotheism and Nicene-Cappadocian Trinitarianism: eternal generation, spiration, perichoresis, and how the church avoids Modalism and Tritheism.',
    difficulty: 'Intermediate',
    readingMinutes: 18,
    era: 'Biblical, Nicene & Classical',
    scriptureRefs: ['Deuteronomy 6:4', 'Matthew 28:19', 'John 1:1–18', '2 Corinthians 13:14', 'John 14:16–26'],
    sections: [
      {
        heading: 'Biblical Monotheism & Triune Self-Disclosure',
        body: 'The Old Testament thundered Israel’s confession in the Shema: "Hear, O Israel: The LORD our God, the LORD is one" (Deuteronomy 6:4). In the fullness of time (Galatians 4:4), the Incarnation of the Son and outpouring of the Pentecostal Spirit revealed—not three competing deities—but internal personal richness within the one eternal Creator. Jesus baptizes believers into the singular "Name" (onoma, not plural names) "of the Father and of the Son and of the Holy Spirit" (Matthew 28:19), while John 1:1 holds together personal distinction ("the Word was with God") and full divine identity ("and the Word was God").',
        keyTakeaway:
          'Trinitarian doctrine did not invent a philosophical novelty; it gave faithful conceptual grammar to the New Testament revelation of Father, Son, and Spirit.',
      },
      {
        heading: 'Nicene Homoousios & The Cappadocian Settlement',
        body: 'Fourth-century theology confronted two opposite distortions: Modalism/Sabellianism (collapsing Father, Son, and Spirit into temporary masks worn by a unipersonal deity) and Arianism/Subordinationism (treating the Son and Spirit as exalted creatures). Nicaea (325) anchored orthodoxy with homoousios ("of the very same essence with the Father"). Subsequently, the Cappadocian Fathers—Basil of Caesarea, Gregory of Nazianzus, and Gregory of Nyssa—clarified the distinction between ousia (the one indivisible Divine Essence, Will, Power, and Glory) and hypostasis (three real, eternal Personal Subsistences distinguished by their relations of origin: the Father unbegotten, the Son eternally begotten of the Father, and the Holy Spirit eternally proceeding).',
        keyTakeaway:
          'One undivided Essence (Ousia) in three co-equal, co-eternal Persons (Hypostases) guards both divine unity against tritheism and personal distinction against modalism.',
      },
      {
        heading: 'Inseparable Operations, Perichoresis &Divine Attributes',
        body: 'Classical Trinitarianism confesses opera Trinitatis ad extra indivisa sunt ("the external works of the Trinity are indivisible"): in creation, providence, redemption, and consummation, Father, Son, and Spirit never act as three separate agents pulling in different directions, but act inseparably from the Father, through the Son, in the Holy Spirit. Internally, the three Persons mutually indwell one another in eternal love without confusion (perichoresis, John of Damascus). Alongside Trinitarian personalism, classical Theology Proper affirms divine aseity (self-existence), simplicity (God is not assembled out of parts), immutability of character, eternity, omniscience, and holy covenantal love.',
        keyTakeaway:
          'Every saving act originates from the Father, is accomplished through the Son, and is perfected by the Holy Spirit.',
      },
    ],
    excerpts: [
      {
        author: 'Gregory of Nazianzus',
        work: 'Oration 40 (On Holy Baptism), Section 41',
        year: '381',
        quote:
          'No sooner do I conceive of the One than I am illumined by the Splendor of the Three; no sooner do I distinguish Them than I am carried back to the One. When I think of any One of the Three I think of Him as the Whole, and my eyes are filled, and the greater part of what I am thinking escapes me.',
        citation: 'Oration 40.41',
        sourceUrl: 'https://www.newadvent.org/fathers/310240.htm',
      },
      {
        author: 'Athanasian Creed (Quicunque Vult)',
        work: 'Western Ecumenical Symbol',
        year: 'c. 5th Century',
        quote:
          'And the catholic faith is this: That we worship one God in Trinity, and Trinity in Unity; neither confounding the Persons, nor dividing the Substance.',
        citation: 'Quicunque Vult, vv. 3–4',
        sourceUrl: 'https://www.ccel.org/creeds/athanasian.creed.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Cappadocian / Eastern',
        proponent: 'Basil the Great, Gregory of Nazianzus, Gregory of Nyssa',
        summary:
          'Highlights the monarchy of the Father as fount (pege) of divinity eternally begetting the Son and spirating the Spirit within one undivided Ousia.',
      },
      {
        tradition: 'Augustinian / Western',
        proponent: 'Augustine of Hippo, Thomas Aquinas, Herman Bavinck',
        summary:
          'Stresses unity of simple divine essence, subsistent relations, and the Spirit proceeding as the mutual bond of love between Father and Son.',
      },
    ],
    keyTerms: [
      {
        term: 'Eternal Generation',
        originalScript: 'γέννησις ἀΐδιος',
        transliteration: 'gennesis aidios',
        definition: 'The timeless, non-material act whereby the Father eternally communicates the whole undivided divine essence to the Son ("begotten, not made").',
      },
      {
        term: 'Opera Ad Extra Indivisa',
        originalScript: 'opera Trinitatis ad extra indivisa sunt',
        transliteration: 'opera ad extra indivisa',
        definition: 'Classical axiom that all external works of God toward creation are wrought inseparably by Father, Son, and Spirit.',
      },
    ],
    relatedTopicSlugs: ['christology-hypostatic-union', 'seven-ecumenical-councils', 'cappadocian-golden-age-fathers'],
    sources: [
      {
        title: 'The Athanasian Creed (Quicunque Vult)',
        author: 'Western Patristic Tradition',
        year: 'c. 500',
        repository: 'CCEL',
        sourceType: 'Council / Creed',
        url: 'https://www.ccel.org/creeds/athanasian.creed.html',
        citation: 'Creeds of Christendom, ed. Philip Schaff (CCEL).',
        summary: 'Precision Latin creedal statement articulating Trinitarian co-equality and Incarnational orthodoxy.',
      },
      {
        title: 'Augustine — On the Trinity (De Trinitate)',
        author: 'Augustine of Hippo',
        year: 'c. 400–416',
        repository: 'New Advent',
        sourceType: 'Treatise',
        url: 'https://www.newadvent.org/fathers/1301.htm',
        citation: 'Nicene and Post-Nicene Fathers, First Series, Vol. 3 (New Advent).',
        summary: 'Fifteen-book exegetical and contemplative masterpiece on biblical missions, inseparable operations, and Trinitarian relations.',
      },
    ],
    attachments: [
      {
        key: 'shield-of-trinity-guide',
        title: 'Scutum Fidei (Shield of the Trinity) & Heresy Diagnostic Guide',
        description: 'Visual-textual study PDF distinguishing Nicene Orthodoxy from Modalism, Arianism, Partialism, and Tritheism.',
        attachmentKind: 'Diagram / Chart',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Trinitarian Grammar & The Scutum Fidei',
        documentSubtitle: 'Paideia Companion to the Nicene & Athanasian Creeds',
        sections: [
          {
            heading: 'The Seven Propositions of the Scutum Fidei',
            content:
              'Identity Relations: (1) The Father is God; (2) The Son is God; (3) The Holy Spirit is God.\nPersonal Distinctions: (4) The Father is NOT the Son; (5) The Son is NOT the Holy Spirit; (6) The Holy Spirit is NOT the Father.\nUnity Axiom: (7) There is only ONE God (one undivided Divine Essence, not three gods).',
          },
          {
            heading: 'Why Popular Analogies Fail',
            content:
              '- "Water / Ice / Steam" = Modalism (one molecule switching states sequentially).\n- "Three-Leaf Clover / Eggshell-Yolk-White" = Partialism (each part is only 1/3 of the whole, whereas each Divine Person possesses the fullness of undivided Deity).\n- "Three Human Individuals in a Club" = Tritheism (three separate essences and wills).',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which Trinitarian heresy collapses Father, Son, and Holy Spirit into three temporary masks or modes adopted by a single Person?',
        options: ['Arianism', 'Modalism (Sabellianism)', 'Nestorianism', 'Pelagianism'],
        correctIndex: 1,
        explanation: 'Modalism (taught by Sabellius in the 3rd century) "confounds the Persons" by denying real eternal personal distinctions within the Godhead.',
        sourceReference: 'Athanasian Creed, v. 4',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'How did the Cappadocian Fathers standardize Greek terminology to express the mystery of the Trinity?',
        options: [
          'Three Ousiai in one Hypostasis',
          'One Ousia (Essence) in three Hypostases (Persons)',
          'Three Physis in three Prosopa',
          'One Prosopon with three temporary energies',
        ],
        correctIndex: 1,
        explanation: 'Basil the Great and the two Gregories distinguished the single divine essence (mia ousia) from the three distinct personal subsistences (treis hypostaseis).',
        sourceReference: 'Basil of Caesarea, Epistle 236.6',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'What Latin theological axiom affirms that Father, Son, and Holy Spirit never act as separate deities in creation or redemption, but always work inseparably?',
        options: [
          'Opera Trinitatis ad extra indivisa sunt',
          'Simul iustus et peccator',
          'Extra ecclesiam nulla salus',
          'Cuius regio, eius religio',
        ],
        correctIndex: 0,
        explanation: '"The external works of the Trinity are indivisible" means every work toward creation flows from the Father, through the Son, in the Spirit.',
        sourceReference: 'Augustine, De Trinitate I.4.7',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Advanced',
        prompt: 'Why is the popular "water, ice, and steam" analogy rejected by classical Trinitarian orthodoxy?',
        options: [
          'Because water is mentioned only in the Old Testament',
          'Because a single H2O molecule transitions sequentially between states, illustrating Modalism rather than simultaneous co-eternal Persons',
          'Because it teaches Arian subordinationism',
          'Because it denies the humanity of Jesus',
        ],
        correctIndex: 1,
        explanation: 'States of matter represent modes of a single entity at different temperatures/times (Modalism), whereas Father, Son, and Spirit coexist eternally in mutual communion (John 17:5).',
        sourceReference: 'Scutum Fidei / Athanasian Creed',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Advanced',
        prompt: 'Which Cappadocian "Theologian" wrote this celebrated contemplation on the Trinity in Oration 40?',
        excerptContext: '"No sooner do I conceive of the One than I am illumined by the Splendor of the Three; no sooner do I distinguish Them than I am carried back to the One."',
        options: ['Gregory of Nazianzus', 'John Cassian', 'Tertullian', 'Bede the Venerable'],
        correctIndex: 0,
        explanation: 'Gregory of Nazianzus ("the Theologian") delivered this luminous passage in Oration 40.41 (AD 381).',
        sourceReference: 'Gregory of Nazianzus, Oration 40.41',
      },
    ],
  },

  {
    slug: 'christology-hypostatic-union',
    disciplineSlug: 'doctrine',
    title: 'Christology & The Chalcedonian Definition',
    subtitle: 'Incarnation, Two Natures in One Person, Kenosis & Communicatio Idiomatum',
    summary:
      'Studies the Person of Jesus Christ: truly God and truly human united in one Hypostasis without confusion, change, division, or separation.',
    difficulty: 'Intermediate',
    readingMinutes: 15,
    era: 'Biblical & Patristic (4th–7th Centuries)',
    scriptureRefs: ['John 1:14', 'Philippians 2:5–11', 'Colossians 1:15–20', 'Colossians 2:9', 'Hebrews 2:14–18'],
    sections: [
      {
        heading: 'The Paradox of the Incarnation: Word Made Flesh',
        body: 'New Testament Christology presents Jesus of Nazareth as possessing every prerogative of YHWH—receiving worship, forgiving sins, calming the sea by his own word, existing before Abraham ("Before Abraham was, I AM," John 8:58)—while simultaneously experiencing genuine human hunger, fatigue, grief, growth in wisdom (Luke 2:52), and death. In Philippians 2:6–7, Christ’s kenosis ("self-emptying") consists not in subtracting or discarding divine attributes ("subtraction kenoticism"), but in adding: "taking the form of a servant, being born in the likeness of men."',
        keyTakeaway:
          'Incarnation is "emptying by addition"—remaining what He eternally was (true God) while assuming what He was not (true humanity).',
      },
      {
        heading: 'Navigating Four Ancient Christological Errors',
        body: 'In the centuries between Nicaea (325) and Constantinople III (681), the Church fenced the mystery of Christ against four major errors: (1) Docetism / Eutychian Monophysitism, which denied Christ’s genuine humanity or swallowed his human nature into his divinity like a drop of vinegar in the ocean; (2) Ebionism / Adoptionism, which denied Christ’s eternal deity; (3) Apollinarianism, which replaced Jesus’s rational human mind with the divine Logos—provoking Gregory of Nazianzus’s golden soteriological rule: "What has not been assumed has not been healed"; and (4) Nestorianism, which divided Christ into two loosely conjoined persons rather than one single Subject.',
        keyTakeaway:
          'Gregory of Nazianzus’s axiom ("The unassumed is the unhealed") proves Christ had to assume a complete human body, soul, mind, and will to redeem the whole human person.',
      },
      {
        heading: 'The Chalcedonian Definition (AD 451) & Dyothelitism',
        body: 'Meeting at Chalcedon in 451, over 500 bishops synthesized Cyril of Alexandria’s emphasis on personal unity with Pope Leo I’s Tome on the integrity of the two natures. Chalcedon confesses one and the same Son, Lord Jesus Christ, acknowledged in two natures (physeis) "without confusion, without change, without division, without separation" (asynchetos, atreptos, adiairetos, achoristos), concurring into one Person and one Subsistence (hypostasis). Later, the Sixth Ecumenical Council (Constantinople III, 681, guided by Maximus the Confessor) completed this portrait by affirming Dyothelitism: because will belongs to nature rather than person, Christ possesses both a divine will and a genuine human will acting in free, sinless harmony ("not my will, but yours be done," Luke 22:42).',
        keyTakeaway:
          'Chalcedon’s four negative adverbs safeguard the integrity of both natures ("without confusion, without change") and the unity of Christ’s single Person ("without division, without separation").',
      },
    ],
    excerpts: [
      {
        author: 'Council of Chalcedon',
        work: 'Definition of Faith',
        year: '451',
        quote:
          'One and the same Christ, Son, Lord, Only-begotten, to be acknowledged in two natures, inconfusedly, unchangeably, indivisibly, inseparably; the distinction of natures being by no means taken away by the union, but rather the property of each nature being preserved, and concurring in one Person and one Subsistence.',
        citation: 'Symbol of Chalcedon (AD 451)',
        sourceUrl: 'https://www.ccel.org/ccel/schaff/creeds2.iv.i.iii.html',
      },
      {
        author: 'Gregory of Nazianzus',
        work: 'Epistle 101 (To Cledonius Against Apollinarius)',
        year: 'c. 382',
        quote:
          'For that which He has not assumed He has not healed; but that which is united to His Godhead is also saved.',
        citation: 'Epistle 101.32',
        sourceUrl: 'https://www.newadvent.org/fathers/3103a.htm',
      },
    ],
    perspectives: [
      {
        tradition: 'Chalcedonian Consensus (Catholic, Eastern Orthodox, Protestant)',
        proponent: 'Cyril of Alexandria, Leo the Great, Maximus the Confessor',
        summary:
          'Confesses one Divine Person (the eternal Son) subsisting in two complete natures—fully divine and fully human—with two harmonious natural wills.',
      },
      {
        tradition: 'Miaphysite (Oriental Orthodox)',
        proponent: 'Severus of Antioch, Coptic & Armenian Tradition',
        summary:
          'Rejects Eutyches’s confusion of natures while preferring Cyril’s pre-Chalcedonian formula "one incarnate nature (mia physis) of God the Word."',
      },
    ],
    keyTerms: [
      {
        term: 'Four Chalcedonian Adverbs',
        originalScript: 'ἀσυγχύτως, ἀτρέπτως, ἀδιαιρέτως, ἀχωρίστως',
        transliteration: 'asynchetos, atreptos, adiairetos, achoristos',
        definition: 'Without confusion, without change (against Eutychianism), without division, without separation (against Nestorianism).',
      },
      {
        term: 'Dyothelitism',
        originalScript: 'δύο θελήματα',
        transliteration: 'dyo thelemata',
        definition: 'Constantinople III’s (681) teaching that Christ possesses two natural wills—divine and human—in sinless Gethsemane harmony.',
      },
    ],
    relatedTopicSlugs: ['trinity-theology-proper', 'seven-ecumenical-councils', 'theories-of-atonement'],
    sources: [
      {
        title: 'The Definition of Chalcedon & Leo’s Tome (AD 451)',
        author: 'Ecumenical Council of Chalcedon / Pope Leo I',
        year: '451',
        repository: 'New Advent',
        sourceType: 'Council / Creed',
        url: 'https://www.newadvent.org/fathers/3811.htm',
        citation: 'Seven Ecumenical Councils, Nicene and Post-Nicene Fathers II, Vol. 14 (New Advent).',
        summary: 'Acts, Tome of Leo, and dogmatic Christological Definition of the Fourth Ecumenical Council.',
      },
      {
        title: 'Gregory of Nazianzus — Epistle 101 (Against Apollinarius)',
        author: 'Gregory of Nazianzus',
        year: '382',
        repository: 'New Advent',
        sourceType: 'Primary Text',
        url: 'https://www.newadvent.org/fathers/3103a.htm',
        citation: 'NPNF Series II, Vol. 7 (New Advent).',
        summary: 'Classic patristic letter establishing why Christ had to assume a rational human mind and soul to redeem humanity.',
      },
    ],
    attachments: [
      {
        key: 'chalcedonian-box-pdf',
        title: 'The Chalcedonian Box: Mapping Christological Boundaries',
        description: 'Reference PDF mapping the four boundaries of orthodox Christology against Docetism, Ebionism, Apollinarianism, Eutychianism, and Nestorianism.',
        attachmentKind: 'Primary Excerpt PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'The Definition of Chalcedon (451): Primary Text & Boundary Map',
        documentSubtitle: 'Paideia Systematic Doctrine Reader',
        sections: [
          {
            heading: 'The Four Corners of the Chalcedonian Boundary',
            content:
              '1. True Deity (Against Arius & Ebionites): "Truly God... consubstantial (homoousios) with the Father according to the Godhead."\n2. True Humanity (Against Docetists & Apollinarius): "Truly man, of a reasonable soul and body... consubstantial with us according to the Manhood."\n3. Distinction of Natures (Against Eutyches): "Without confusion, without change."\n4. Unity of Person (Against Nestorius): "Without division, without separation... concurring in one Prosopon and one Hypostasis."',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which Council in AD 451 formulated the classic confession of Christ in two natures "without confusion, without change, without division, without separation"?',
        options: ['Council of Nicaea I', 'Council of Chalcedon', 'Fourth Lateran Council', 'Synod of Whitby'],
        correctIndex: 1,
        explanation: 'The Fourth Ecumenical Council at Chalcedon (451) established these four boundaries around the Hypostatic Union.',
        sourceReference: 'Definition of Chalcedon (AD 451)',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Intermediate',
        prompt: 'Which Church Father refuted Apollinarianism (the denial of Jesus’s human mind) with the famous rule: "That which He has not assumed He has not healed"?',
        excerptContext: '"For that which He has not assumed He has not healed; but that which is united to His Godhead is also saved."',
        options: ['Gregory of Nazianzus', 'Tertullian', 'Eusebius', 'Pelagius'],
        correctIndex: 0,
        explanation: 'Gregory of Nazianzus wrote this in Epistle 101 to Cledonius (~382) to show that if Christ lacked a human mind, our fallen minds would remain unredeemed.',
        sourceReference: 'Gregory of Nazianzus, Epistle 101.32',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which Christological error divided Christ into two separate persons loosely joined in moral partnership rather than one Hypostasis?',
        options: ['Nestorianism', 'Sabellianism', 'Eutychianism', 'Marcionism'],
        correctIndex: 0,
        explanation: 'Nestorianism compromised the personal unity of the Incarnate Word, leading Ephesus (431) and Chalcedon (451) to insist upon one single Hypostasis.',
        sourceReference: 'Council of Ephesus (431) & Chalcedon (451)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Advanced',
        prompt: 'What did the Sixth Ecumenical Council (Constantinople III, AD 681) affirm regarding Christ’s will?',
        options: [
          'Monothelitism — Christ possessed only a single hybrid will',
          'Dyothelitism — because will belongs to nature, Christ possesses both a divine will and a genuine human will acting in harmony',
          'Christ had neither a human nor divine will',
          'Christ’s human will opposed the Father in Gethsemane',
        ],
        correctIndex: 1,
        explanation: 'Following Maximus the Confessor, Constantinople III affirmed two natural wills (Dyothelitism), safeguarding Christ’s full human obedience in Gethsemane.',
        sourceReference: 'Constantinople III (AD 681)',
      },
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: In classical Christology, Philippians 2:7 ("emptied himself") means the Son temporarily ceased to be divine while on earth.',
        options: [
          'True — the Son laid aside omniscience and deity entirely.',
          'False — He emptied himself not by subtracting deity, but by taking the form of a servant and assuming human nature.',
        ],
        correctIndex: 1,
        explanation: 'As Leo’s Tome states: "Remaining what He was, He assumed what He was not"—Philippians 2:7 explains "emptied himself" participially as "taking the form of a servant."',
        sourceReference: 'Philippians 2:6–7; Tome of Leo',
      },
    ],
  },

  {
    slug: 'pneumatology-ecclesiology-eschatology',
    disciplineSlug: 'doctrine',
    title: 'Pneumatology, Ecclesiology & Inaugurated Eschatology',
    subtitle: 'The Lord and Giver of Life, the Four Marks of the Church & "Already and Not Yet"',
    summary:
      'Integrates the Person and work of the Holy Spirit, the Nicene marks of the Church, and the biblical horizon of bodily resurrection and the New Heavens and New Earth.',
    difficulty: 'Foundational',
    readingMinutes: 15,
    era: 'Biblical, Nicene & Contemporary',
    scriptureRefs: ['Acts 2:1–21', 'Ephesians 4:1–16', '1 Corinthians 12:12–27', 'Revelation 20–22', 'Romans 8:18–25'],
    sections: [
      {
        heading: 'Pneumatology: "The Lord, the Giver of Life"',
        body: 'Against the fourth-century Pneumatomachians ("Spirit-fighters" or Tropici) who treated the Holy Spirit as an impersonal divine energy or ministering angel, Athanasius (Letters to Serapion) and Basil the Great (On the Holy Spirit, 375) demonstrated from Scripture and baptismal worship that the Spirit is fully divine—worshiped and glorified together with the Father and the Son, as enshrined at Constantinople I (381). Across redemptive history, the Spirit hovers over creation (Genesis 1:2), inspires the prophets (2 Peter 1:21), empowers the Incarnate Messiah from Jordan to Resurrection (Romans 8:11), births the Church at Pentecost (Acts 2), regenerates and sanctifies believers, and serves as the firstfruits/down payment (arrabon, Ephesians 1:14) of the age to come.',
        keyTakeaway:
          'The Holy Spirit is not an impersonal force, but the third co-equal Divine Person who applies all that Christ accomplished.',
      },
      {
        heading: 'Ecclesiology: One, Holy, Catholic, and Apostolic Church',
        body: 'The Nicene-Constantinopolitan Creed identifies four enduring marks (notae ecclesiae) of the Church: One (united in one Lord, one faith, one baptism, Eph 4:5), Holy (set apart as a royal priesthood indwelt by the Spirit, 1 Pet 2:9), Catholic (katholikos—"according to the whole," universal across all nations, classes, and centuries rather than a local ethnic sect), and Apostolic (built on the foundation of the apostles’ teaching and sent in mission, Eph 2:20). Protestant confessions added practical criteria for discerning faithful visible congregations: the pure preaching of the Word, the right administration of the sacraments, and loving church discipline.',
        keyTakeaway:
          'Ecclesiology unites Christ’s mystical Body across all generations with concrete local assemblies gathered around Word, Sacrament, and fellowship.',
      },
      {
        heading: 'Inaugurated Eschatology & The New Creation',
        body: 'Twentieth-century biblical theology (Geerhardus Vos, Oscar Cullmann, George Eldon Ladd) highlighted "Inaugurated Eschatology"—the tension between the "Already" (the Kingdom of God has decisively broken into history in Jesus’s life, death, resurrection, and Pentecost) and the "Not Yet" (its final consummation awaits Christ’s glorious Parousia). While orthodox Christians hold charitable diversity regarding the Millennium of Revelation 20—Amillennialism (Christ’s present heavenly reign throughout the church age), Postmillennialism (gradual triumph of the Gospel prior to Christ’s return), and Historic Premillennialism (an earthly reign following Christ’s return)—all Nicene believers unite around the blessed hope: the visible personal return of Christ, the bodily resurrection of the dead, final judgment, and the renewal of heaven and earth (Revelation 21:1–5) rather than disembodied Platonist escape.',
        keyTakeaway:
          'Christian hope culminates not in escaping materiality, but in bodily resurrection and God dwelling with humanity in a renewed cosmos.',
      },
    ],
    excerpts: [
      {
        author: 'Basil of Caesarea (Basil the Great)',
        work: 'On the Holy Spirit, Chapter 9 (Section 23)',
        year: '375',
        quote:
          'Through the Holy Spirit comes restoration to paradise, ascension into the kingdom of heaven, return to the adoption of sons, liberty to call God our Father, being made partakers of the grace of Christ, being called children of light, sharing in eternal glory.',
        citation: 'De Spiritu Sancto 9.23',
        sourceUrl: 'https://www.newadvent.org/fathers/3203.htm',
      },
      {
        author: 'Nicene-Constantinopolitan Creed',
        work: 'First Council of Constantinople',
        year: '381',
        quote:
          'And we believe in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son together is worshiped and glorified, who spoke by the prophets. In one, holy, catholic, and apostolic Church... We look for the resurrection of the dead, and the life of the world to come.',
        citation: 'Symbol of 381',
        sourceUrl: 'https://www.ccel.org/creeds/nicene.creed.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Amillennial',
        proponent: 'Augustine (City of God XX), Geerhardus Vos, Anthony Hoekema',
        summary:
          'Reads Revelation 20 symbolically as Christ’s current heavenly reign with the saints between His first and second comings.',
      },
      {
        tradition: 'Historic Premillennial',
        proponent: 'Justin Martyr, Irenaeus, George Eldon Ladd',
        summary:
          'Anticipates Christ’s visible return after tribulation to inaugurate a thousand-year earthly reign prior to the new creation.',
      },
      {
        tradition: 'Postmillennial',
        proponent: 'Jonathan Edwards, B.B. Warfield',
        summary:
          'Expects the Spirit-empowered proclamation of the Gospel to progressively disciple the nations before Christ’s bodily return.',
      },
    ],
    keyTerms: [
      {
        term: 'Arrabon',
        originalScript: 'ἀρραβών',
        transliteration: 'arrabon',
        definition: 'Down payment, pledge, or first installment (Eph 1:14; 2 Cor 1:22)—the Holy Spirit bringing future new-creation life into the present.',
      },
      {
        term: 'Parousia',
        originalScript: 'παρουσία',
        transliteration: 'parousia',
        definition: 'Royal arrival or personal presence, denoting Jesus Christ’s bodily, glorious return at the consummation of the age.',
      },
    ],
    relatedTopicSlugs: ['trinity-theology-proper', 'typology-canonical-theology', 'sacraments-ancient-liturgy'],
    sources: [
      {
        title: 'Basil the Great — Treatise On the Holy Spirit (De Spiritu Sancto)',
        author: 'Basil of Caesarea',
        year: '375',
        repository: 'New Advent',
        sourceType: 'Treatise',
        url: 'https://www.newadvent.org/fathers/3203.htm',
        citation: 'Nicene and Post-Nicene Fathers II, Vol. 8 (New Advent).',
        summary: 'Foundational fourth-century defense of the full deity and liturgical co-adoration of the Holy Spirit.',
      },
      {
        title: 'The Nicene-Constantinopolitan Creed (325 / 381)',
        author: 'Ecumenical Councils of Nicaea & Constantinople',
        year: '381',
        repository: 'CCEL',
        sourceType: 'Council / Creed',
        url: 'https://www.ccel.org/creeds/nicene.creed.html',
        citation: 'Creeds of Christendom (CCEL).',
        summary: 'Universal ecumenical symbol uniting Eastern and Western Christianity on Trinity, Church, Baptism, and Resurrection.',
      },
    ],
    attachments: [
      {
        key: 'millennial-views-chart',
        title: 'Eschatology & Millennial Frameworks Comparison Sheet',
        description: 'Structured study sheet comparing Historic Premillennialism, Amillennialism, and Postmillennialism alongside shared creedal essentials.',
        attachmentKind: 'Scholarly Notes',
        format: 'markdown',
        linkedSourceIndex: 1,
        documentTitle: 'Inaugurated Eschatology & Millennial Views',
        documentSubtitle: 'Paideia Doctrinal Overview',
        sections: [
          {
            heading: 'Non-Negotiable Ecumenical Consensus',
            content:
              'Across all millennial interpretations, orthodox Christians unite around four Nicene pillars:\n1. Personal, visible, bodily return (Parousia) of Jesus Christ.\n2. Universal bodily resurrection of the dead.\n3. Righteous final judgment by Christ.\n4. Eternal life in the New Heavens and New Earth (Revelation 21–22).',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which Ecumenical Council in AD 381 expanded the Nicene Creed’s third article to confess the Holy Spirit as "the Lord, the Giver of Life... who with the Father and the Son together is worshiped and glorified"?',
        options: [
          'First Council of Constantinople (381)',
          'Council of Constance (1414)',
          'First Vatican Council (1870)',
          'Synod of Dort (1618)',
        ],
        correctIndex: 0,
        explanation: 'Constantinople I (381) refuted the Pneumatomachians by confessing the full deity and shared worship (homotimia) of the Holy Spirit.',
        sourceReference: 'Nicene-Constantinopolitan Creed (AD 381)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'In the Nicene Creed’s phrase "one, holy, catholic, and apostolic Church," what does the Greek word katholikos ("catholic") mean?',
        options: [
          'Subject exclusively to medieval canon law',
          'According to the whole / universal across all nations, times, and places',
          'Secret and esoteric',
          'Restricted to Greek-speaking congregations',
        ],
        correctIndex: 1,
        explanation: 'First used of the Church by Ignatius of Antioch (Smyrnaeans 8.2), katholikos means universal or according to the whole.',
        sourceReference: 'Ignatius, Smyrnaeans 8.2; Nicene Creed',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'What does "Inaugurated Eschatology" ("Already and Not Yet") teach regarding the Kingdom of God?',
        options: [
          'The Kingdom was fully exhausted in AD 70 with nothing remaining in the future',
          'The Kingdom has already been decisively inaugurated in Christ’s first coming and Spirit outpouring, while awaiting final consummation at His return',
          'The Kingdom is purely an ethical metaphor for human political progress',
          'The Kingdom has no presence whatsoever until the end of time',
        ],
        correctIndex: 1,
        explanation: 'Jesus proclaimed the Kingdom at hand (Mark 1:15) while teaching disciples to pray "Your kingdom come," establishing the Already/Not Yet horizon.',
        sourceReference: 'Geerhardus Vos; George Eldon Ladd, The Presence of the Future',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'Which Greek commercial term in Ephesians 1:14 describes the Holy Spirit as the "down payment" or "first installment" guaranteeing our future inheritance?',
        options: ['Arrabon', 'Anathema', 'Adiaphora', 'Apokalypsis'],
        correctIndex: 0,
        explanation: 'Arrabon denotes an earnest or first installment of the exact same reality to be received in full at the resurrection.',
        sourceReference: 'Ephesians 1:13–14; 2 Corinthians 1:22',
      },
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: Classical Christian eschatology teaches that humanity’s ultimate eternal destiny is disembodied souls floating forever outside physical creation.',
        options: [
          'True — matter is inherently evil and discarded forever.',
          'False — Scripture and the Creeds confess the bodily resurrection of the dead and a renewed Heaven and Earth (Rev 21:1–5).',
        ],
        correctIndex: 1,
        explanation: 'Unlike Gnosticism or Platonism, Christianity affirms the goodness of God’s material creation and promises glorified resurrection bodies in the New Creation.',
        sourceReference: '1 Corinthians 15:42–54; Revelation 21:1–5',
      },
    ],
  },

  // =========================================================================
  // HERMENEUTICS
  // =========================================================================
  {
    slug: 'grammatical-historical-exegesis',
    disciplineSlug: 'hermeneutics',
    title: 'Grammatical-Historical Exegesis & Literary Genre',
    subtitle: 'Authorial Intent, Lexical Semantics, Context, Analogia Fidei & Genre Sensitivity',
    summary:
      'Masters the foundational tools of faithful biblical interpretation: respecting historical background, syntax, literary genres, and avoiding common exegetical fallacies.',
    difficulty: 'Foundational',
    readingMinutes: 15,
    era: 'Reformation & Modern Biblical Scholarship',
    scriptureRefs: ['Nehemiah 8:8', '2 Timothy 2:15', 'Luke 24:27', '2 Peter 1:20–21'],
    sections: [
      {
        heading: 'Dual Authorship & The Primacy of Context',
        body: 'Christian hermeneutics rests on the concurrent dual authorship of Scripture: "men spoke from God as they were carried along by the Holy Spirit" (2 Peter 1:21). Because God chose to speak through real human authors in Hebrew, Aramaic, and Koine Greek at specific historical moments, faithful exegesis ("drawing out" meaning, contrasted with eisegesis, "reading one’s own biases in") seeks the divine-human communicative intent embedded in the text. Context operates in concentric circles: immediate clause and paragraph syntax, book-wide rhetorical argument, historical-cultural setting (Sitz im Leben), and the overarching canon of Scripture.',
        keyTakeaway:
          'A text detached from its literary and historical context swiftly becomes a pretext for the reader’s own assumptions.',
      },
      {
        heading: 'Avoiding Lexical & Exegetical Fallacies',
        body: 'Influenced by James Barr’s Semantics of Biblical Language and Moisés Silva, modern hermeneutics warns against widespread word-study fallacies: (1) the Root Fallacy—assuming a word’s meaning is determined by its ancient etymology rather than current usage in context (just as English "nice" no longer means Latin nescius, "ignorant," Greek ekklesia means "assembly," not "called-out ones" in every occurrence, and dynamis in Romans 1:16 means "power," not modern "dynamite"!); (2) Illegitimate Totality Transfer—dumping every dictionary definition of a word simultaneously into a single verse; and (3) Anachronism—importing later meanings backward into earlier texts.',
        keyTakeaway:
          'Meaning resides primarily at the level of sentences and discourse in context, not isolated etymological roots.',
      },
      {
        heading: 'Literary Genre & The Analogy of Faith (Analogia Fidei)',
        body: 'Reading according to literary convention is indispensable to honoring literal (sensus literalis) meaning—where "literal" means reading a text according to its intended literary form! Historical narrative records events without making every descriptive action a universal moral command; Hebrew Wisdom Literature (Proverbs, Job, Ecclesiastes) offers general covenantal principles rather than unconditional mechanical guarantees; Psalms employ Hebrew parallelism and emotional lament; Parables drive home central kingdom shocks; Epistles address occasional pastoral crises; and Apocalyptic literature (Daniel, Revelation) uses vivid cosmic symbolism to unveil heaven’s perspective on earthly empires. Throughout, the Analogy of Faith (analogia fidei—Augustine and the Westminster Confession 1.9) insists that clearer passages of Scripture illuminate more obscure passages.',
        keyTakeaway:
          'True literal interpretation reads poetry as poetry, proverb as proverb, narrative as narrative, and apocalyptic as apocalyptic.',
      },
    ],
    excerpts: [
      {
        author: 'Augustine of Hippo',
        work: 'On Christian Doctrine (De Doctrina Christiana), Book II, Chapter 9',
        year: 'c. 397',
        quote:
          'In all these books those who fear God and are of a meek and pious disposition seek the will of God... Afterward, when we have become familiar with the language of the Divine Scriptures, we may proceed to open up and investigate the obscure passages, and in doing so draw examples from the plainer expressions to throw light upon the more obscure.',
        citation: 'De Doctrina Christiana II.9.14',
        sourceUrl: 'https://www.ccel.org/ccel/augustine/doctrine.html',
      },
      {
        author: 'John Calvin',
        work: 'Epistle Dedicatory to Commentary on Romans',
        year: '1539',
        quote:
          'Since it is almost his [the interpreter’s] only work to lay open the mind of the writer whom he undertakes to explain, the degree in which he leads his readers away from it is the degree in which he goes astray from his purpose.',
        citation: 'Commentary on Romans, Dedicatory Epistle to Simon Grynaeus (1539)',
        sourceUrl: 'https://www.ccel.org/ccel/calvin/calcom38.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Grammatical-Historical',
        proponent: 'John Calvin, Ernesti, Kevin Vanhoozer, Gordon Fee',
        summary:
          'Focuses on communicative authorial action through lexical, syntactic, genre, and historical-cultural inquiry.',
      },
      {
        tradition: 'Canonical-Theological Exegesis',
        proponent: 'Augustine, Brevard Childs, Richard Hays',
        summary:
          'Reads grammatical-historical meaning within the final canonical shape of Old and New Testaments and the Church’s Rule of Faith.',
      },
    ],
    keyTerms: [
      {
        term: 'Analogia Fidei',
        originalScript: 'ἀναλογία τῆς πίστεως',
        transliteration: 'analogia fidei',
        definition: '"Analogy of Faith" (cf. Rom 12:6)—interpreting difficult or ambiguous texts in harmony with clearer teaching across the whole of Scripture.',
      },
      {
        term: 'Sensus Literalis',
        originalScript: 'sensus literalis',
        transliteration: 'sensus literalis',
        definition: 'The sense intended by the inspired author through the words and literary conventions of the text (including metaphor where intended).',
      },
    ],
    relatedTopicSlugs: ['alexandrian-antiochene-quadriga', 'typology-canonical-theology', 'biblical-canon-textual-criticism'],
    sources: [
      {
        title: 'Augustine — On Christian Doctrine (De Doctrina Christiana)',
        author: 'Augustine of Hippo',
        year: '397 / 426',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/augustine/doctrine.html',
        citation: 'Nicene and Post-Nicene Fathers, First Series, Vol. 2 (CCEL).',
        summary: 'Foundational four-book patristic manual on biblical semiotics (signs and things), hermeneutics, and homiletics.',
      },
      {
        title: 'STEP Bible — Scripture Tools for Every Person (Tyndale House Cambridge)',
        author: 'Tyndale House, Cambridge',
        year: 'Contemporary',
        repository: 'STEP Bible / Academic',
        sourceType: 'Reference / Lexicon',
        url: 'https://www.stepbible.org/',
        citation: 'Tyndale House Cambridge Open Biblical Language Platform.',
        summary: 'Scholarly open-access Hebrew, Greek, LXX, and lexicon study suite for grammatical and morphological exegesis.',
      },
    ],
    attachments: [
      {
        key: 'exegetical-worksheet-pdf',
        title: '7-Step Biblical Exegesis & Fallacy Checklist',
        description: 'Practical seminar worksheet for conducting passage exegesis from textual boundaries and genre to canonical synthesis.',
        attachmentKind: 'Exegetical Worksheet',
        format: 'pdf',
        linkedSourceIndex: 1,
        documentTitle: 'Paideia Exegetical Method Worksheet',
        documentSubtitle: 'Seven Steps from Textual Observation to Theological Application',
        sections: [
          {
            heading: 'The 7-Step Exegetical Workflow',
            content:
              '1. Delimit the Pericope & Check Textual Variants.\n2. Establish Historical-Cultural & Redemptive-Historical Setting.\n3. Identify Literary Genre & Rhetorical Structure (parallelism, chiasm, discourse flow).\n4. Analyze Syntax, Conjunctions, and Verbal Aspect.\n5. Conduct Contextual Word Studies (synchronic usage, avoiding the Root Fallacy and Illegitimate Totality Transfer).\n6. Trace Intertextual Echoes, Allusions, and Canonical Trajectory (Analogia Fidei).\n7. Formulate Theological Principle & Pastoral Application.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What is the difference between "exegesis" and "eisegesis"?',
        options: [
          'Exegesis draws out the text’s intended meaning; eisegesis reads external assumptions into the text',
          'Exegesis applies only to Greek; eisegesis applies only to Hebrew',
          'Exegesis is medieval; eisegesis is patristic',
          'They are exact synonyms',
        ],
        correctIndex: 0,
        explanation: 'From Greek ek- ("out of") vs. eis- ("into"), exegesis draws meaning out of the text’s context while eisegesis imports foreign ideas.',
        sourceReference: '2 Timothy 2:15; Calvin, Dedicatory Epistle to Romans',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Claiming that Greek dynamis ("power") in Romans 1:16 means the Gospel is "explosive like modern dynamite" commits which classic lexical fallacy?',
        options: [
          'Anachronism / Reverse Etymology Fallacy',
          'Haplography',
          'Dittography',
          'Allegorical Quadriga',
        ],
        correctIndex: 0,
        explanation: 'Alfred Nobel coined "dynamite" from Greek dynamis in 1867; reading a 19th-century invention backward into Paul’s 1st-century letter is reverse anachronism.',
        sourceReference: 'D.A. Carson, Exegetical Fallacies',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'What lexical fallacy occurs when a reader assumes every single dictionary definition of a word applies simultaneously in one specific verse?',
        options: [
          'Illegitimate Totality Transfer',
          'Lectio difficilior',
          'Perichoresis',
          'Inclusio',
        ],
        correctIndex: 0,
        explanation: 'Coined by James Barr, "Illegitimate Totality Transfer" ignores that context selects one specific sense of a polysemous word at a time.',
        sourceReference: 'James Barr, The Semantics of Biblical Language (1961)',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Foundational',
        prompt: 'Which hermeneutical principle teaches that Scripture interprets Scripture, so clearer passages illuminate more obscure passages?',
        options: ['Analogia fidei (Analogy of Faith)', 'Ex opere operato', 'Lectio brevior', 'Sola gratia'],
        correctIndex: 0,
        explanation: 'Articulated by Augustine (De Doctrina Christiana II.9) and Reformed confessions, the Analogy of Faith interprets obscure texts in light of plain ones.',
        sourceReference: 'Augustine, On Christian Doctrine II.9; WCF 1.9',
      },
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: Reading Proverbs according to its sensus literalis ("literal sense") requires treating every proverb as an unconditional mechanical guarantee with zero exceptions.',
        options: [
          'True — Wisdom literature operates identically to apodictic legal contracts.',
          'False — Reading Wisdom literature according to its intended genre recognizes proverbs as general covenantal wisdom principles alongside books like Job and Ecclesiastes.',
        ],
        correctIndex: 1,
        explanation: 'Genre sensitivity recognizes that Proverbs teaches how God’s moral order normally operates, while Job and Ecclesiastes address exceptions in a fallen world.',
        sourceReference: 'Proverbs; Job; Ecclesiastes',
      },
    ],
  },

  {
    slug: 'alexandrian-antiochene-quadriga',
    disciplineSlug: 'hermeneutics',
    title: 'Patristic Schools & The Medieval Quadriga',
    subtitle: 'Alexandrian Allegory, Antiochene Theoria, and the Fourfold Sense of Scripture',
    summary:
      'Compares Origen and the School of Alexandria with Chrysostom and the School of Antioch, tracing how their synthesis shaped the medieval fourfold Quadriga and Reformation critique.',
    difficulty: 'Intermediate',
    readingMinutes: 16,
    era: 'Patristic & Medieval (2nd–16th Centuries)',
    scriptureRefs: ['Galatians 4:21–31', '1 Corinthians 10:1–11', 'Luke 24:44–47'],
    sections: [
      {
        heading: 'The School of Alexandria: Clement, Origen & Spiritual Allegory',
        body: 'Centered in Egypt’s cosmopolitan intellectual capital—home earlier to the Jewish philosopher Philo—the Catechetical School of Alexandria (Pantaenus, Clement of Alexandria, Origen, Didymus the Blind) sought to defend the Old Testament against Gnostics and Marcionites who mocked difficult Old Testament narratives. In On First Principles (De Principiis, Book IV), Origen compared Scripture to a human person composed of body (literal/historical sense), soul (moral edification), and spirit (deep mystical/Christological allegory). While Origen affirmed that vast portions of biblical history occurred literally, he believed spiritual stumbling blocks in the text were intentionally placed by the Holy Spirit to beckon mature readers upward to heavenly mysteries.',
        keyTakeaway:
          'Alexandrian exegesis rescued the Old Testament from Marcionite rejection, though unrestrained allegory risked detaching meaning from historical anchor.',
      },
      {
        heading: 'The School of Antioch: Historia & Prophetic Theoria',
        body: 'In Syria, the School of Antioch—led by Diodore of Tarsus, Theodore of Mopsuestia, and its greatest preacher John Chrysostom—reacted strongly against arbitrary allegorizing (for instance, turning every wood or rock in Genesis into a random symbol unmoored from the story). Yet Antioch was not modern secular rationalism! Antiochenes championed theoria ("spiritual insight/vision"): discerning higher Christological typology organically embedded within—never abolishing—the real historical narrative (historia). Thus, for Antioch, the Exodus Passover Lamb truly happened in history AND genuinely prefigured Christ as one unified prophetic design.',
        keyTakeaway:
          'Antiochene theoria insisted that higher spiritual meaning grows out of the true historical narrative rather than floating free of it.',
      },
      {
        heading: 'The Medieval Quadriga & Aquinas’s Grounding in the Literal Sense',
        body: 'Through John Cassian, Gregory the Great, and monastic lectio divina, Western medieval theology distilled a fourfold sense known as the Quadriga ("four-horse chariot"), immortalized in the Latin couplet: Littera gesta docet, quid credas allegoria, Moralis quid agas, quo tendas anagogia ("The letter teaches events; allegory what you should believe; morality what you should do; anagogy where you are heading"). Thus "Jerusalem" meant literally the Judean city, allegorically the Church of Christ, tropologically (morally) the faithful human soul, and anagogically the heavenly New Jerusalem. Crucially, Thomas Aquinas (ST I, q. 1, a. 10) tightened this discipline by insisting that all spiritual senses must rest firmly upon the literal sense, and doctrinal arguments can be proved strictly from the literal sense alone—paving the bridge to Luther and Calvin.',
        keyTakeaway:
          'Aquinas established that spiritual/typological readings are valid only when rooted in the foundational literal-historical sense.',
      },
    ],
    excerpts: [
      {
        author: 'Nicholas of Lyra / Augustine of Dacia',
        work: 'Classic Medieval Mnemonic Couplet on the Quadriga',
        year: 'c. 1260 / 1330',
        quote:
          'Littera gesta docet, quid credas allegoria, Moralis quid agas, quo tendas anagogia. (The letter teaches events, allegory what you are to believe, the moral what you are to do, anagogy whither you are tending.)',
        citation: 'Rotulus Pugillaris (c. 1260)',
      },
      {
        author: 'Thomas Aquinas',
        work: 'Summa Theologiae, Part I, Question 1, Article 10',
        year: 'c. 1265',
        quote:
          'All the senses are founded on one—the literal—from which alone can any argument be drawn, and not from those intended in allegory, as Augustine says.',
        citation: 'ST I, q. 1, a. 10, ad 1',
        sourceUrl: 'https://www.ccel.org/ccel/aquinas/summa.FP_Q1_A10.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Alexandrian Patristic',
        proponent: 'Clement of Alexandria, Origen, Cyril of Alexandria',
        summary:
          'Highlights deep Christological and spiritual symbolism beneath every detail of Old Testament law and narrative.',
      },
      {
        tradition: 'Antiochene Patristic',
        proponent: 'Diodore of Tarsus, John Chrysostom, Theodoret',
        summary:
          'Prioritizes grammatical-historical integrity (historia) crowned by organic typological contemplation (theoria).',
      },
      {
        tradition: 'Scholastic & Reformation Synthesis',
        proponent: 'Thomas Aquinas, Nicholas of Lyra, Martin Luther',
        summary:
          'Grounds all theological proof in the enriched literal-Christological sense while retaining canonical typology.',
      },
    ],
    keyTerms: [
      {
        term: 'Tropological Sense',
        originalScript: 'τροπολογία',
        transliteration: 'tropologia',
        definition: 'The moral sense within the Quadriga, asking how the text forms Christian virtue and love (quid agas).',
      },
      {
        term: 'Anagogical Sense',
        originalScript: 'ἀναγωγή',
        transliteration: 'anagoge',
        definition: '"Leading upward"—the eschatological sense within the Quadriga pointing toward heavenly consummation (quo tendas).',
      },
    ],
    relatedTopicSlugs: ['grammatical-historical-exegesis', 'typology-canonical-theology', 'cappadocian-golden-age-fathers'],
    sources: [
      {
        title: 'Origen — De Principiis (On First Principles), Book IV: Inspiration & Interpretation',
        author: 'Origen of Alexandria',
        year: 'c. 225',
        repository: 'New Advent',
        sourceType: 'Treatise',
        url: 'https://www.newadvent.org/fathers/04124.htm',
        citation: 'Ante-Nicene Fathers, Vol. 4 (New Advent).',
        summary: 'The earliest systematic treatise on Christian hermeneutics, presenting Origen’s threefold reading of Scripture.',
      },
      {
        title: 'Aquinas — Summa Theologica I, Q. 1, Art. 10: Whether Holy Scripture Has Several Senses',
        author: 'Thomas Aquinas',
        year: '1265',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/aquinas/summa.FP_Q1_A10.html',
        citation: 'Summa Theologica, First Part (CCEL).',
        summary: 'Aquinas’s lucid synthesis of the fourfold Quadriga anchored firmly on the literal sense.',
      },
    ],
    attachments: [
      {
        key: 'quadriga-worked-example',
        title: 'The Medieval Quadriga & Patristic Schools Reference Sheet',
        description: 'Worked case studies ("Jerusalem" and "The Red Sea Crossing") read through Alexandria, Antioch, and the Fourfold Quadriga.',
        attachmentKind: 'Scholarly Notes',
        format: 'markdown',
        linkedSourceIndex: 1,
        documentTitle: 'Alexandria, Antioch & The Fourfold Quadriga',
        documentSubtitle: 'Paideia Historical Hermeneutics Guide',
        sections: [
          {
            heading: 'Classic Case Study: "Jerusalem" in Psalm 147:12',
            content:
              '1. **Literal (Historia)**: The historic capital city of Judah.\n2. **Allegorical (Quid Credas)**: The militant Church of Jesus Christ on earth.\n3. **Tropological / Moral (Quid Agas)**: The Christian soul ordered in peace and righteousness.\n4. **Anagogical (Quo Tendas)**: The eschatological New Jerusalem descending from heaven (Rev 21:2).',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'In the medieval Quadriga (fourfold sense of Scripture), which sense directs the believer upward toward future eschatological glory ("quo tendas")?',
        options: ['Literal', 'Tropological', 'Anagogical', 'Etymological'],
        correctIndex: 2,
        explanation: 'Anagogy ("leading upward") points to eternal glory and the New Jerusalem, whereas tropology addresses moral conduct.',
        sourceReference: 'Aquinas, Summa Theologiae I, q. 1, a. 10',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'How did the School of Antioch (e.g., Diodore of Tarsus, John Chrysostom) distinguish its concept of theoria from Alexandrian allegory?',
        options: [
          'Antioch rejected the Old Testament entirely',
          'Antioch insisted that higher spiritual/typological insight (theoria) must remain organically rooted in the truth of the historical event (historia)',
          'Antioch taught that only Greek philosophy contained truth',
          'Antioch denied that any Old Testament prophecy pointed to Christ',
        ],
        correctIndex: 1,
        explanation: 'Antiochene theoria beheld Christological fulfillment in and through real history rather than dissolving or bypassing the historical text.',
        sourceReference: 'Diodore of Tarsus; John Chrysostom',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'What crucial methodological rule did Thomas Aquinas establish regarding doctrinal proof and the senses of Scripture?',
        options: [
          'Doctrinal arguments may be drawn solely from the literal sense, upon which all spiritual senses rest',
          'The literal sense should be ignored by theologians',
          'Only the anagogical sense has authority in debates',
          'Allegory can contradict the literal sense whenever helpful',
        ],
        correctIndex: 0,
        explanation: 'Following Augustine, Aquinas (ST I.1.10 ad 1) ruled that theological proof must be drawn strictly from the literal sense.',
        sourceReference: 'Aquinas, Summa Theologiae I, q. 1, a. 10, ad 1',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which third-century Alexandrian scholar wrote Book IV of On First Principles (De Principiis), comparing Scripture’s three levels to body, soul, and spirit?',
        options: ['Origen of Alexandria', 'Cyprian of Carthage', 'Anselm of Laon', 'Hugh of St. Victor'],
        correctIndex: 0,
        explanation: 'Origen’s De Principiis Book IV is the earliest dedicated treatise on biblical hermeneutics in church history.',
        sourceReference: 'Origen, De Principiis IV.2.4',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'In the fourfold Quadriga, what is another name for the moral sense ("quid agas — what you ought to do")?',
        options: ['Tropological sense', 'Hypostatic sense', 'Textual-critical sense', 'Synoptic sense'],
        correctIndex: 0,
        explanation: 'The tropological sense concerns moral conversion and virtuous Christian action.',
        sourceReference: 'John Cassian, Conferences 14.8',
      },
    ],
  },

  {
    slug: 'typology-canonical-theology',
    disciplineSlug: 'hermeneutics',
    title: 'Biblical Theology, Typology & Canonical Christocentrism',
    subtitle: 'Emmaus Road Hermeneutics, Type and Antitype, Escalation & Progressive Revelation',
    summary:
      'Explores how the entire storyline of Scripture unfolds organically from Creation to New Creation, culminating in Jesus the Messiah on the Road to Emmaus (Luke 24:27).',
    difficulty: 'Intermediate',
    readingMinutes: 15,
    era: 'Biblical, Patristic & Redemptive-Historical',
    scriptureRefs: ['Luke 24:25–27, 44–47', 'John 5:39, 46', 'Romans 5:14', '1 Corinthians 10:1–11', 'Hebrews 1:1–2; 8:1–6'],
    sections: [
      {
        heading: 'The Emmaus Road & Progressive Revelation',
        body: 'On Easter afternoon along the road to Emmaus, the risen Jesus gave the Church its master seminar in hermeneutics: "And beginning with Moses and all the Prophets, he interpreted (diermeneusen—the verbal root of \'hermeneutics\'!) to them in all the Scriptures the things concerning himself" (Luke 24:27). Rather than treating the Bible as an anthology of disconnected moral fables, Biblical Theology (pioneered in modern form by Geerhardus Vos) traces God’s progressive self-revelation organically across epochs—like an acorn maturing into a towering oak—moving from Creation, Fall, Promise, Exodus, Temple, and Kingdom into their Messianic fulfillment.',
        keyTakeaway:
          'Christ is not wedged artificially into the Old Testament; the entire redemptive storyline was designed by God to converge upon Him.',
      },
      {
        heading: 'How Biblical Typology Differs from Arbitrary Allegory',
        body: 'New Testament authors identify Old Testament persons, events, and institutions as typoi ("types" or stamped impressions, Romans 5:14) fulfilled in a greater New Testament antitypos (1 Peter 3:21; Hebrews 9:24). Unlike fanciful allegory, authentic biblical typology exhibits three disciplined hallmarks: (1) Historical Reality—Adam, Melchizedek, the Passover, the Tabernacle, and King David were genuine historical realities; (2) Covenantal Correspondence—God intentionally patterned recurring redemptive structures across covenants; and (3) Escalation (Heightening)—the New Testament antitype always infinitely surpasses its Old Testament shadow! Jonah emerged after three days, yet "something greater than Jonah is here" (Matthew 12:41); bulls and goats cleansed ceremonially, whereas Christ’s own blood purifies the conscience forever (Hebrews 9:13–14).',
        keyTakeaway:
          'Biblical typology requires historical reality, covenantal correspondence, and Christological escalation from shadow to substance.',
      },
      {
        heading: 'New Testament Use of the Old Testament',
        body: 'When Matthew, Paul, or the author of Hebrews cites Old Testament Scripture, they rarely pluck isolated proof-texts out of context; as C.H. Dodd and Richard Hays have shown, brief citations invoke whole Old Testament narratives (metalepsis). When Jesus cries "My God, my God, why have you forsaken me?" (Psalm 22:1), He evokes the entire arc of Psalm 22—moving from righteous suffering pierced by enemies to universal Gentile worship of YHWH’s kingship (Psalm 22:27–31)! Reading canonically trains scholars to hear both Testaments in stereophonic harmony—as Augustine famously observed: "The New is in the Old concealed; the Old is in the New revealed."',
        keyTakeaway:
          'New Testament citations serve as windows into entire Old Testament chapters and covenantal themes.',
      },
    ],
    excerpts: [
      {
        author: 'Irenaeus of Lyons',
        work: 'Against Heresies, Book IV, Chapter 26, Section 1',
        year: 'c. 180',
        quote:
          'If any one, therefore, reads the Scriptures with attention, he will find in them an account of Christ, and a foreshadowing of the new calling. For Christ is the treasure which was hid in the field, that is, in this world (for "the field is the world"); but the treasure hid in the Scriptures is Christ, since He was pointed out by means of types and parables.',
        citation: 'Adversus Haereses IV.26.1',
        sourceUrl: 'https://www.newadvent.org/fathers/0103426.htm',
      },
      {
        author: 'Augustine of Hippo',
        work: 'Questions on the Heptateuch, Book II, Question 73',
        year: 'c. 419',
        quote:
          'In the Old Testament the New is concealed, and in the New the Old is revealed (Quanquam et in Vetere Novum lateat, et in Novo Vetus pateat).',
        citation: 'Quaestiones in Heptateuchum 2.73',
      },
    ],
    perspectives: [
      {
        tradition: 'Redemptive-Historical (Vosian)',
        proponent: 'Geerhardus Vos, Edmund Clowney, Graeme Goldsworthy',
        summary:
          'Traces organic epochs of revelation and covenantal fulfillment culminating in Christ, guarding preaching against moralism.',
      },
      {
        tradition: 'Patristic Rule-of-Faith Reading',
        proponent: 'Irenaeus, Melito of Sardis (On Pascha), Augustine',
        summary:
          'Reads Old and New Testaments as a single two-act symphony authored by the eternal Logos.',
      },
    ],
    keyTerms: [
      {
        term: 'Escalation',
        originalScript: 'a minori ad maius / qal wahomer',
        transliteration: 'escalation',
        definition: 'Heightening from lesser Old Testament shadow (Tabernacle, David, Passover) to greater New Testament reality in Christ.',
      },
      {
        term: 'Metalepsis',
        originalScript: 'μετάληψις',
        transliteration: 'metalepsis',
        definition: 'Literary echo where quoting a single line evokes the entire surrounding context and storyline of the original Old Testament passage.',
      },
    ],
    relatedTopicSlugs: ['grammatical-historical-exegesis', 'alexandrian-antiochene-quadriga', 'old-testament-redemptive-history'],
    sources: [
      {
        title: 'Irenaeus — Against Heresies IV.26: Christ the Treasure Hidden in the Scriptures',
        author: 'Irenaeus of Lyons',
        year: 'c. 180',
        repository: 'New Advent',
        sourceType: 'Primary Text',
        url: 'https://www.newadvent.org/fathers/0103426.htm',
        citation: 'Ante-Nicene Fathers, Vol. 1 (New Advent).',
        summary: 'Irenaeus explains how the Law and Prophets unfold their hidden treasure once read in light of Christ’s Cross and Resurrection.',
      },
      {
        title: 'Justin Martyr — Dialogue with Trypho (Typology of Passover & Bronze Serpent)',
        author: 'Justin Martyr',
        year: 'c. 160',
        repository: 'Early Christian Writings',
        sourceType: 'Primary Text',
        url: 'https://www.earlychristianwritings.com/text/justinmartyr-dialoguetrypho.html',
        citation: 'Ante-Nicene Fathers, Vol. 1 (Early Christian Writings).',
        summary: 'Extensive second-century dialogue examining Messianic prophecy and Old Testament types.',
      },
    ],
    attachments: [
      {
        key: 'major-biblical-types-pdf',
        title: 'Canonical Atlas of Major Biblical Types & Antitypes',
        description: 'Comprehensive study PDF mapping Creation, Adam, Ark, Melchizedek, Passover, Exodus, Tabernacle, and Davidic Kingship to Christ.',
        attachmentKind: 'Study Guide PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'From Shadow to Substance: Canonical Typology Atlas',
        documentSubtitle: 'Paideia Hermeneutics & Biblical Theology Guide',
        sections: [
          {
            heading: 'Key Canonical Trajectories (Type -> Escalated Antitype)',
            content:
              '- First Adam (Rom 5:14; 1 Cor 15:45): Federal head bringing condemnation -> Last Adam bringing life-giving justification.\n- Passover Lamb (Exod 12 -> John 1:29; 1 Cor 5:7): Unblemished lamb sparing households in Egypt -> Christ our Passover sacrificed once for all.\n- Bronze Serpent (Num 21:8–9 -> John 3:14–15): Lifted up in wilderness for physical healing -> Son of Man lifted up on the Cross for eternal life.\n- Tabernacle / Temple (Exod 40; 1 Kgs 8 -> John 1:14; 2:19–21; Rev 21:22): Earthly sanctuary of God’s dwelling -> The Word tabernacling in flesh, His Body the Church, and the New Creation.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which three criteria distinguish genuine biblical typology from arbitrary allegory?',
        options: [
          'Numerology, secret codes, and Greek etymology',
          'Historical reality of the OT type, divinely designed covenantal correspondence, and Christological escalation',
          'Rejection of history, moralism, and philosophical skepticism',
          'Latin translation, monastic authorship, and conciliar canons',
        ],
        correctIndex: 1,
        explanation: 'Biblical types are real historical persons/events/institutions patterned by God that escalate from lesser shadow to greater fulfillment in Christ.',
        sourceReference: 'Romans 5:14; Hebrews 8:5; 10:1',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'In Luke 24:27, what did the risen Jesus do for the two disciples on the road to Emmaus?',
        options: [
          'Dictated a brand-new Gospel scroll in Latin',
          'Beginning with Moses and all the Prophets, He interpreted to them in all the Scriptures the things concerning Himself',
          'Instructed them to stop reading the Old Testament',
          'Explained Aristotelian metaphysics',
        ],
        correctIndex: 1,
        explanation: 'Luke 24:27 uses diermeneusen ("interpreted"), establishing canonical Christ-centered reading of Moses, Prophets, and Psalms (v. 44).',
        sourceReference: 'Luke 24:27, 44–47',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Intermediate',
        prompt: 'Which Father formulated the enduring maxim: "In the Old Testament the New is concealed, and in the New the Old is revealed"?',
        options: ['Augustine of Hippo', 'Marcion of Sinope', 'Tertullian', 'John Wesley'],
        correctIndex: 0,
        explanation: 'Augustine penned this famous Latin epigram in Questions on the Heptateuch (2.73) to express the organic unity of the two Testaments.',
        sourceReference: 'Augustine, Quaestiones in Heptateuchum 2.73',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Advanced',
        prompt: 'In literary-canonical studies (Richard Hays), what does "metalepsis" describe when a New Testament author quotes a brief Old Testament line?',
        options: [
          'Accidental scribal omission of a line',
          'Quoting a single verse as an evocative pointer to the entire surrounding Old Testament chapter and storyline (e.g., Jesus quoting Psalm 22:1)',
          'Translating Hebrew into Aramaic',
          'Replacing narrative with legal code',
        ],
        correctIndex: 1,
        explanation: 'Metalepsis shows that brief NT quotations bring their wider OT narrative horizon along with them rather than functioning as atomistic proof-texts.',
        sourceReference: 'Richard B. Hays, Echoes of Scripture in the Letters of Paul',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which modern Reformed biblical theologian pioneered the discipline of tracing God’s revelation organically across historical-redemptive epochs?',
        options: ['Geerhardus Vos', 'Rudolf Bultmann', 'Friedrich Schleiermacher', 'Adolf von Harnack'],
        correctIndex: 0,
        explanation: 'Geerhardus Vos’s Biblical Theology: Old and New Testaments (1948) established redemptive-historical progression as a distinct theological discipline.',
        sourceReference: 'Geerhardus Vos, Biblical Theology (1948)',
      },
    ],
  },
];
