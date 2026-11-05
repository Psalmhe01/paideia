import type { SeedTopicSpec } from '../types.js';

export const TOPICS_APOLOGETICS_SOTERIOLOGY: SeedTopicSpec[] = [
  // =========================================================================
  // APOLOGETICS
  // =========================================================================
  {
    slug: 'classical-cosmological-arguments',
    disciplineSlug: 'apologetics',
    title: 'Classical Natural Theology: Cosmological, Teleological & Ontological Arguments',
    subtitle: 'From Aristotle and Anselm to Thomas Aquinas’s Quinque Viae and Modern Cosmology',
    summary:
      'Examines classical a posteriori and a priori arguments for the existence of God: contingency, first cause, cosmic fine-tuning, moral order, and Anselm’s ontological insight.',
    difficulty: 'Intermediate',
    readingMinutes: 16,
    era: 'Patristic, Medieval & Contemporary',
    scriptureRefs: ['Psalm 19:1–4', 'Acts 17:22–31', 'Romans 1:19–20', '1 Peter 3:15'],
    sections: [
      {
        heading: 'The Biblical & Philosophical Mandate of Apologia',
        body: 'In 1 Peter 3:15, believers are exhorted to always be prepared to make a defense (apologia) to anyone who asks for a reason (logos) for the hope within them, yet with gentleness and reverence. Historically, Christian natural theology never sought to replace divine revelation, but rather—in Anselm of Canterbury’s famous phrase—practiced fides quaerens intellectum ("faith seeking understanding"). Both Paul on Mars Hill (Acts 17) and Romans 1:20 affirm that the invisible attributes of God—his eternal power and divine nature—are clearly perceived in the contingent order of creation.',
        keyTakeaway:
          'Natural theology bridges general revelation in creation with philosophical inquiry, demonstrating the rational coherence of theism.',
      },
      {
        heading: 'Cosmological Arguments: Contingency, Aquinas’s Five Ways & Kalam',
        body: 'Cosmological arguments reason from the existence or motion of finite things to an Uncaused Necessary Reality. In Summa Theologiae I, q. 2, a. 3, Thomas Aquinas articulated his Five Ways (Quinque Viae): from motion (act and potency), efficient causality, contingency and necessity, gradations of perfection, and final teleological governance. Unlike temporal chains that stretch backward in time, Aquinas focused on hierarchical ("per se") causal series existing right now—which require a Prime Mover who is Pure Act (Actus Purus). Complementing this, the Kalam Cosmological Argument (developed in medieval philosophy and revived by William Lane Craig) argues that whatever begins to exist has a cause, the universe began to exist (corroborated by philosophical arguments against actual infinities and Big Bang cosmology), and therefore the universe has a transcendent personal Cause.',
        keyTakeaway:
          'Thomistic cosmological arguments prove a sustaining ground of being (Actus Purus), while Kalam arguments focus on the temporal origin of the cosmos.',
      },
      {
        heading: 'Teleological, Moral & Ontological Horizons',
        body: 'Teleological arguments observe purposeful order and extreme cosmic fine-tuning—where physical constants (such as the cosmological constant and strong nuclear force) sit on a razor’s edge permitting embodied conscious life. Moral arguments (C.S. Lewis, Robert Adams) contend that objective moral obligations and universal human worth find their ontological ground only in a transcendent Good rather than blind evolutionary utility. Meanwhile, Anselm’s Ontological Argument in Proslogion chapters 2–3—later reformulated in modal logic by Alvin Plantinga—contends that if it is even metaphysically possible that a Maximally Great Being (necessary in all possible worlds) exists, then such a Being necessarily exists in the actual world.',
        keyTakeaway:
          'Cumulative-case apologetics weaves cosmic contingency, fine-tuning, moral realism, and modal necessity into a mutually reinforcing framework.',
      },
    ],
    excerpts: [
      {
        author: 'Thomas Aquinas',
        work: 'Summa Theologiae, Part I, Question 2, Article 3',
        year: 'c. 1265–1274',
        quote:
          'The third way is taken from possibility and necessity... Not all beings are merely possible, but there must exist something the existence of which is necessary. Every necessary thing either has its necessity caused by another, or not... Therefore we cannot but postulate the existence of some being having of itself its own necessity, and not receiving it from another, and this all men speak of as God.',
        citation: 'ST I, q. 2, a. 3 (Third Way from Contingency)',
        sourceUrl: 'https://www.ccel.org/ccel/aquinas/summa.FP_Q2_A3.html',
      },
      {
        author: 'Anselm of Canterbury',
        work: 'Proslogion, Chapter 2',
        year: '1077–1078',
        quote:
          'And assuredly that, than which nothing greater can be conceived, cannot exist in the understanding alone. For, suppose it exists in the understanding alone: then it can be conceived to exist in reality; which is greater.',
        citation: 'Proslogion, ch. 2',
        sourceUrl: 'https://www.ccel.org/ccel/anselm/basic_works.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Thomistic / Classical',
        proponent: 'Thomas Aquinas, Etienne Gilson',
        summary:
          'Grounds God’s existence through metaphysical demonstration from act/potency and essence/existence (esse), concluding in Ipsum Esse Subsistens.',
      },
      {
        tradition: 'Analytic / Cumulative Case',
        proponent: 'Richard Swinburne, William Lane Craig, Alvin Plantinga',
        summary:
          'Employs Bayesian probability, modal logic, Kalam cosmology, and fine-tuning to show theism has vastly greater explanatory power than naturalism.',
      },
      {
        tradition: 'Presuppositional',
        proponent: 'Cornelius Van Til, Greg Bahnsen',
        summary:
          'Argues that the Triune God of Scripture is the necessary transcendental precondition for logic, science, and morality to be intelligible at all.',
      },
    ],
    keyTerms: [
      {
        term: 'Actus Purus',
        originalScript: 'actus purus',
        transliteration: 'actus purus',
        definition: 'Pure actuality without any unrealized potentiality; God as self-existent fullness of being.',
      },
      {
        term: 'A Posteriori / A Priori',
        originalScript: 'a posteriori / a priori',
        transliteration: 'a posteriori / a priori',
        definition: 'Reasoning from empirical observation of effects (a posteriori) vs. reasoning from pure concepts/modality (a priori).',
      },
    ],
    relatedTopicSlugs: ['historical-resurrection-apologetics', 'reformed-epistemology-theodicy', 'trinity-theology-proper'],
    sources: [
      {
        title: 'Summa Theologica — First Part, Question 2: The Existence of God',
        author: 'Thomas Aquinas',
        year: '1274',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/aquinas/summa.FP_Q2_A3.html',
        citation: 'Aquinas, Summa Theologica, trans. Fathers of the English Dominican Province (CCEL).',
        summary: 'Full text of Aquinas’s famous Quinque Viae (Five Ways) and replies to objections against God’s existence.',
      },
      {
        title: 'Proslogion & Monologion (Basic Works)',
        author: 'Anselm of Canterbury',
        year: '1078',
        repository: 'CCEL',
        sourceType: 'Primary Text',
        url: 'https://www.ccel.org/ccel/anselm/basic_works.html',
        citation: 'St. Anselm: Proslogium; Monologium, trans. S.N. Deane (Open Court / CCEL).',
        summary: 'Anselm’s meditative prayer-treatise articulating fides quaerens intellectum and the ontological argument.',
      },
    ],
    attachments: [
      {
        key: 'aquinas-five-ways-reader',
        title: 'Aquinas’s Quinque Viae — Annotated Study Companion',
        description: 'Detailed breakdown of all Five Ways in Summa Theologiae I.2.3, contrasting per se vs. per accidens causal chains.',
        attachmentKind: 'Study Guide PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Thomas Aquinas: The Five Ways (Quinque Viae)',
        documentSubtitle: 'Paideia Companion Guide to Summa Theologiae I, q. 2, a. 3',
        sections: [
          {
            heading: '1. Essential (Per Se) vs. Linear (Per Accidens) Causality',
            content:
              'A frequent modern misunderstanding of Aquinas treats the First Mover like the first domino knocked over billions of years ago. Instead, Aquinas analyzes hierarchical (per se) causal series operating simultaneously here and now: the hand moves the staff which moves the stone. Without a primary unmoved mover actualizing potentiality at this very instant, no derivative motion could occur.',
          },
          {
            heading: '2. Summary of the Five Ways',
            content:
              'First Way (Motion): Potentiality can only be reduced to act by something already in act, terminating in Pure Act (Actus Purus).\nSecond Way (Efficient Cause): Simultaneous efficient causes cannot regress infinitely; there must be a First Uncaused Cause.\nThird Way (Contingency): Things that can fail to exist require an intrinsically Necessary Being.\nFourth Way (Gradation): Degrees of truth, goodness, and nobility point to a transcendent Maximum.\nFifth Way (Governance): Non-intelligent natural bodies act consistently toward ends, revealing an ordering Intelligence.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which Greek noun in 1 Peter 3:15 gives Christian "apologetics" its name and denotes a reasoned defense?',
        options: ['Kerygma', 'Apologia', 'Didache', 'Paraklesis'],
        correctIndex: 1,
        explanation: '1 Peter 3:15 calls believers to be ready to give an apologia (reasoned defense) for the hope within them.',
        sourceReference: '1 Peter 3:15',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'In Thomas Aquinas’s First Way (the argument from motion), what metaphysical distinction explains change?',
        options: [
          'Phenomena and noumena',
          'Potency (potentiality) and Act (actuality)',
          'Predestination and foreknowledge',
          'Allegory and typology',
        ],
        correctIndex: 1,
        explanation: 'Following Aristotle, Aquinas defines motion/change as the reduction of something from potentiality to actuality by something already in act, culminating in God as Actus Purus.',
        sourceReference: 'Thomas Aquinas, Summa Theologiae I, q. 2, a. 3',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Intermediate',
        prompt: 'Which medieval theologian authored this classic formulation of the Ontological Argument?',
        excerptContext:
          '"And assuredly that, than which nothing greater can be conceived, cannot exist in the understanding alone."',
        options: ['Peter Abelard', 'Anselm of Canterbury', 'William of Ockham', 'Bonaventure'],
        correctIndex: 1,
        explanation: 'Anselm of Canterbury presented this argument in Chapter 2 of his Proslogion (1077–1078).',
        sourceReference: 'Anselm, Proslogion, ch. 2',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Advanced',
        prompt: 'How does Alvin Plantinga’s modal ontological argument advance Anselm’s insight using modal logic?',
        options: [
          'By arguing from biological irreducibility in cellular structures',
          'By showing that if Maximal Greatness (including necessary existence) is exemplified in at least one possible world, it must exist in all possible worlds—including the actual world',
          'By denying that God exists necessarily',
          'By proving the universe had a temporal beginning 13.8 billion years ago',
        ],
        correctIndex: 1,
        explanation: 'Under S5 modal logic, whatever is possibly necessary is necessarily actual; hence if a Maximally Great Being is possible, it exists in the actual world.',
        sourceReference: 'Alvin Plantinga, The Nature of Necessity (1974)',
      },
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: The Kalam Cosmological Argument claims that literally everything—even an eternal, uncaused being—must have a cause.',
        options: [
          'True — its first premise states "Everything that exists has a cause."',
          'False — its first premise specifically states "Whatever begins to exist has a cause."',
        ],
        correctIndex: 1,
        explanation: 'The Kalam argument carefully distinguishes things that begin to exist from an eternal, timeless Necessary Being that never began to exist.',
        sourceReference: 'Kalam Cosmological Argument',
      },
    ],
  },

  {
    slug: 'historical-resurrection-apologetics',
    disciplineSlug: 'apologetics',
    title: 'Historical Evidences: Early Creeds & The Resurrection of Jesus',
    subtitle: 'Assessing 1 Corinthians 15:3–7, Empty Tomb Traditions, and Early Eyewitness Testimony',
    summary:
      'Investigates the historiographical case for Jesus’s bodily resurrection, early pre-Pauline creedal traditions, manuscript transmission, and why naturalistic hypotheses fail.',
    difficulty: 'Foundational',
    readingMinutes: 14,
    era: 'First Century & Modern Historiography',
    scriptureRefs: ['1 Corinthians 15:1–20', 'Luke 1:1–4', 'Acts 2:22–32', 'John 20:24–29'],
    sections: [
      {
        heading: 'Christianity’s Falsifiable Historical Claim',
        body: 'Uniquely among world religions, apostolic Christianity staked its entire truthfulness on a public, datable historical event in first-century Judea. In 1 Corinthians 15:14, Paul writes starkly: "If Christ has not been raised, then our preaching is in vain and your faith is in vain." Luke likewise opens his Gospel (Luke 1:1–4) using classical Greek historiographical prologues, appealing to living eyewitnesses (autoptai) and careful investigation.',
        keyTakeaway:
          'Apostolic preaching anchored faith not in timeless myth, but in verifiable eyewitness testimony during the lifetimes of contemporaries.',
      },
      {
        heading: 'The Pre-Pauline Creed of 1 Corinthians 15:3–7',
        body: 'Written around AD 53–55, 1 Corinthians 15:3–7 preserves an Aramaic-inflected oral creed that Paul himself "received" (parelabon) and "delivered" (paredoka)—technical rabbinic terms for faithful transmission. Most critical historians across the ideological spectrum date the formulation of this creed to within two to five years of the crucifixion (c. AD 30–35) in Jerusalem, likely when Paul visited Peter (Cephas) and James, the Lord’s brother (Galatians 1:18–19). This eliminates any multi-generational gap required for legendary fabrication.',
        keyTakeaway:
          'The 1 Corinthians 15 creed places proclamation of Christ’s death, burial, and resurrection appearances right at the fountainhead of the Jerusalem movement.',
      },
      {
        heading: 'Minimal Historical Bedrock & Competing Hypotheses',
        body: 'Historiographical analysis highlights several widely accepted facts: (1) Jesus of Nazareth died by Roman crucifixion under Pontius Pilate; (2) his burial tomb was discovered empty by women followers—a counter-cultural testimony in first-century jurisprudence that no fabricator would invent; (3) multiple individuals and groups experienced appearances of the risen Jesus; and (4) prominent skeptics such as Saul of Tarsus (a persecutor) and James the brother of Jesus were radically transformed into martyrs. Naturalistic alternatives—conspiracy, swoon/apparent death, wrong tomb, or collective grief hallucinations (which neither occur simultaneously across groups nor explain an empty tomb or Second Temple bodily resurrection categories)—fail standard historical criteria of explanatory scope and plausibility.',
        keyTakeaway:
          'Bodily resurrection uniquely accounts for both the empty tomb, the group appearances, the conversion of skeptics, and the sudden emergence of Resurrection theology within Second Temple Judaism.',
      },
    ],
    excerpts: [
      {
        author: 'Justin Martyr',
        work: 'First Apology, Chapter 48',
        year: 'c. 155',
        quote:
          'And that He did those things, you can learn from the Acts of Pontius Pilate.',
        citation: '1 Apology 48',
        sourceUrl: 'https://www.newadvent.org/fathers/0126.htm',
      },
      {
        author: 'Ignatius of Antioch',
        work: 'Epistle to the Smyrnaeans, Chapter 3',
        year: 'c. 107',
        quote:
          'For I know and believe that He was in the flesh even after the resurrection; and when He came to Peter and those who were with him, He said to them, "Lay hold, handle Me, and see that I am not an incorporeal spirit."',
        citation: 'Smyrnaeans 3.1–2',
        sourceUrl: 'https://www.newadvent.org/fathers/0109.htm',
      },
    ],
    perspectives: [
      {
        tradition: 'Evidential / Minimal Facts',
        proponent: 'Gary Habermas, Mike Licona',
        summary:
          'Builds from historically bedrock facts accepted by critical scholars to show bodily resurrection surpasses all naturalistic hypotheses.',
      },
      {
        tradition: 'Historical-Contextual',
        proponent: 'N.T. Wright, Richard Bauckham',
        summary:
          'Situates Gospel eyewitness testimony (Bauckham) and Second Temple Jewish worldview expectations (Wright) to show neither paganism nor Judaism could have invented a crucified-and-risen Messiah apart from Easter.',
      },
    ],
    keyTerms: [
      {
        term: 'Autoptai',
        originalScript: 'αὐτόπται',
        transliteration: 'autoptai',
        definition: 'Firsthand eyewitnesses cited by Luke (Luke 1:2) as the living sources of Gospel tradition.',
      },
      {
        term: 'Criterion of Embarrassment',
        originalScript: 'historiographical criterion',
        transliteration: 'criterion of embarrassment',
        definition: 'Historical principle that details awkward or counter-productive to an author’s agenda (e.g., Peter’s denial, women as primary tomb witnesses) are highly likely authentic.',
      },
    ],
    relatedTopicSlugs: ['classical-cosmological-arguments', 'biblical-canon-textual-criticism', 'apostolic-fathers'],
    sources: [
      {
        title: 'Justin Martyr — The First Apology',
        author: 'Justin Martyr',
        year: 'c. 155',
        repository: 'New Advent',
        sourceType: 'Primary Text',
        url: 'https://www.newadvent.org/fathers/0126.htm',
        citation: 'Ante-Nicene Fathers, Vol. 1, ed. Alexander Roberts & James Donaldson (New Advent).',
        summary: 'Justin’s formal defense addressed to Emperor Antoninus Pius appealing to historical events, Old Testament prophecy, and Christian worship.',
      },
      {
        title: 'Ignatius of Antioch — Epistle to the Smyrnaeans',
        author: 'Ignatius of Antioch',
        year: 'c. 107',
        repository: 'Early Christian Writings',
        sourceType: 'Primary Text',
        url: 'https://www.earlychristianwritings.com/text/ignatius-smyrnaeans-lightfoot.html',
        citation: 'J.B. Lightfoot translation, Apostolic Fathers (Early Christian Writings).',
        summary: 'Early second-century witness defending the bodily passion and bodily resurrection of Jesus against Docetism.',
      },
    ],
    attachments: [
      {
        key: 'resurrection-historiography-sheet',
        title: '1 Corinthians 15 Creed & Historical Evaluation Matrix',
        description: 'Timeline of early creedal transmission (AD 30–55) and comparative evaluation of competing hypotheses.',
        attachmentKind: 'Scholarly Notes',
        format: 'markdown',
        linkedSourceIndex: 0,
        documentTitle: 'Historiographical Worksheet: The Resurrection of Jesus',
        documentSubtitle: 'Comparing Explanatory Scope, Plausibility, and Ad Hocness',
        sections: [
          {
            heading: 'Chronological Proximity of Primary Sources',
            content:
              '- **AD 30 / 33**: Crucifixion under Pontius Pilate.\n- **AD 31–36**: Formulation of the oral Jerusalem creed preserved in 1 Cor 15:3–7 ("received" by Paul, cf. Gal 1:18–19).\n- **AD 49–55**: Undisputed Pauline Epistles (1 Thessalonians, Galatians, 1 Corinthians).\n- **AD 60–95**: Canonical Gospels & Acts written within the lifetime of eyewitnesses.',
          },
          {
            heading: 'Why Hallucination & Myth Theories Fail',
            content:
              '1. Hallucinations are private intramental projections, not shared polymodal experiences across groups of 12 or 500.\n2. Second Temple Jews expected a general bodily resurrection at the end of history (Dan 12:2), never an isolated resurrection of a crucified Messiah in the middle of history.\n3. Neither hallucinations nor myths vacate a guarded stone tomb in Jerusalem.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'To approximately what period do historians date the origin of the pre-Pauline creed recorded in 1 Corinthians 15:3–7?',
        options: [
          'Within 2 to 5 years of Jesus’s crucifixion (c. AD 30–35)',
          'After the Council of Nicaea (AD 325)',
          'During the late second century (c. AD 180)',
          'During the Maccabean Revolt (167 BC)',
        ],
        correctIndex: 0,
        explanation: 'Paul writes in ~AD 53–55 of a tradition he had already "received," widely dated to Jerusalem within 2–5 years of the cross.',
        sourceReference: '1 Corinthians 15:3–7; Galatians 1:18–19',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Why does the unanimous Gospel testimony that women discovered the empty tomb satisfy the "criterion of embarrassment"?',
        options: [
          'Women were forbidden from leaving Jerusalem during Passover',
          'In first-century Jewish and Roman courts, women’s testimony lacked full legal standing, making them unlikely witnesses for an invented legend',
          'Paul never mentions any appearances of Jesus',
          'Roman soldiers wrote the Gospel of Mark',
        ],
        correctIndex: 1,
        explanation: 'An author fabricating a persuasive legal story in antiquity would have placed male apostles—not women—as the primary discoverers of the empty tomb.',
        sourceReference: 'Mark 16:1–8; Luke 24:1–11',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which two prominent skeptics became leaders and martyrs in the early church following reported encounters with the risen Christ?',
        options: [
          'Pontius Pilate and Herod Antipas',
          'Saul of Tarsus (Paul) and James the brother of Jesus',
          'Caiaphas and Gamaliel',
          'Josephus and Philo of Alexandria',
        ],
        correctIndex: 1,
        explanation: 'Saul persecuted the church (Gal 1:13) and Jesus’s brothers did not believe during his ministry (John 7:5), yet both became pillars and martyrs.',
        sourceReference: '1 Corinthians 15:7–9; Josephus, Antiquities 20.200',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Advanced',
        prompt: 'Which early bishop (~AD 107) wrote against Docetists that Jesus remained "in the flesh even after the resurrection"?',
        excerptContext: '"When He came to Peter and those who were with him, He said to them, \'Lay hold, handle Me, and see that I am not an incorporeal spirit.\'"',
        options: ['Ignatius of Antioch', 'Origen of Alexandria', 'Eusebius of Caesarea', 'Jerome'],
        correctIndex: 0,
        explanation: 'Ignatius of Antioch wrote this in his Epistle to the Smyrnaeans (ch. 3) while en route to martyrdom in Rome.',
        sourceReference: 'Ignatius, Smyrnaeans 3.1–2',
      },
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: Second Temple Judaism regularly expected the Messiah to be crucified by pagans and raised individually prior to the end of history.',
        options: [
          'True — this was the standard Pharisaic expectation.',
          'False — Second Temple Jews expected either political triumph or general resurrection only at the final day.',
        ],
        correctIndex: 1,
        explanation: 'As N.T. Wright demonstrates, a crucified Messiah (Deut 21:23) raised bodily in the middle of history was shockingly unprecedented in Second Temple expectations.',
        sourceReference: 'N.T. Wright, The Resurrection of the Son of God',
      },
    ],
  },

  {
    slug: 'reformed-epistemology-theodicy',
    disciplineSlug: 'apologetics',
    title: 'Reformed Epistemology, Presuppositionalism & Theodicy',
    subtitle: 'Properly Basic Belief, Sensus Divinitatis, and Christian Responses to Evil and Suffering',
    summary:
      'Explores how knowledge of God is warranted (Calvin, Van Til, Plantinga) and addresses the logical and evidential problem of evil through Augustinian, Irenaean, and Christological lenses.',
    difficulty: 'Advanced',
    readingMinutes: 17,
    era: 'Patristic, Reformation & Analytic Philosophy',
    scriptureRefs: ['Job 38–42', 'Genesis 50:20', 'Romans 8:18–28', 'Habakkuk 1–3'],
    sections: [
      {
        heading: 'Warranted Christian Belief & Properly Basic Knowledge',
        body: 'During the Enlightenment, "classical foundationalism" demanded that belief in God be inferred solely from indubitable sense data or else dismissed as irrational (W.K. Clifford’s evidentialism). Drawing on Thomas Reid and John Calvin’s doctrine of the sensus divinitatis ("sense of the divine," Institutes 1.3), Alvin Plantinga revolutionized analytic philosophy of religion by demonstrating that classical foundationalism is self-referentially incoherent. Just as beliefs in other minds, memory, and the external world are "properly basic"—rationally held without propositional syllogisms when formed by properly functioning cognitive faculties—belief in God can be both rational and warranted as a properly basic belief awakened by creation and the internal instigation of the Holy Spirit.',
        keyTakeaway:
          'Belief in God does not require Enlightenment foundationalist permission to possess rational warrant.',
      },
      {
        heading: 'The Logical vs. Evidential Problem of Evil',
        body: 'Atheologians such as J.L. Mackie once claimed a strict logical contradiction between an omnipotent, omnibenevolent God and the existence of evil. Plantinga’s Free Will Defense decisively refuted this logical claim—a consensus acknowledged even by secular philosophers—by showing it is possible that God could not actualize a world containing genuinely free moral creatures capable of love without permitting the possibility of moral evil. Discussion subsequently shifted to the evidential problem of evil (William Rowe, Paul Draper): why gratuitous-looking suffering occurs. Skeptical Theism (Stephen Wykstra) notes our profound cognitive limitations: finite minds embedded in space-time cannot expect to survey all ripple effects across eternity ("noseeum inferences" fail when comparing finite human vision to omniscience).',
        keyTakeaway:
          'The logical problem of evil has been widely recognized as defeated; the evidential and pastoral challenge invites deeper theological wisdom.',
      },
      {
        heading: 'Augustinian, Irenaean & Cruciform Theodicies',
        body: 'Christian tradition offers complementary theological frameworks: (1) Augustine of Hippo defined evil not as a created substance (contra Manichaean dualism) but as privatio boni—a parasitic corruption or privation of a good creation through disordered creaturely love; (2) Irenaeus of Lyons emphasized "soul-making," viewing a challenging moral environment as an arena for spiritual maturation into likeness with God; and (3) Cruciform Theology centers on the Cross itself: Christianity proclaims not an aloof deity insulated from pain, but the Incarnate Son who enters human agony, bears sin and death, and pledges the eschatological wiping away of every tear (Revelation 21:4).',
        keyTakeaway:
          'In Christ crucified and risen, God does not remain distant from suffering—He enters it personally to redeem and overcome it.',
      },
    ],
    excerpts: [
      {
        author: 'Augustine of Hippo',
        work: 'Enchiridion on Faith, Hope, and Love, Chapter 11',
        year: 'c. 421',
        quote:
          'For what is that which we call evil but the absence of good? ... And in the universe, even that which is called evil, when it is regulated and put in its own place, only enhances our admiration of the good; for the Almighty God would in no wise permit evil to exist in His works, unless His power were such and so great that He could bring good even out of evil.',
        citation: 'Enchiridion, ch. 11 (3.11)',
        sourceUrl: 'https://www.ccel.org/ccel/augustine/enchiridion.html',
      },
      {
        author: 'John Calvin',
        work: 'Institutes of the Christian Religion, Book I, Chapter 3',
        year: '1559',
        quote:
          'There is within the human mind, and indeed by natural instinct, an awareness of divinity [divinitatis sensum]. This we take to be beyond controversy.',
        citation: 'Institutes I.3.1',
        sourceUrl: 'https://www.ccel.org/ccel/calvin/institutes.iii.iv.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Augustinian Privatio Boni',
        proponent: 'Augustine, Thomas Aquinas',
        summary:
          'Evil has no independent ontology; it is a corruption of created good permitted only because God brings redemptive good out of evil.',
      },
      {
        tradition: 'Irenaean Soul-Making',
        proponent: 'Irenaeus of Lyons, John Hick',
        summary:
          'Views moral struggle and epistemic distance as conditions through which immature creatures grow freely toward virtuous maturity.',
      },
      {
        tradition: 'Reformed Epistemology',
        proponent: 'John Calvin, Alvin Plantinga, Nicholas Wolterstorff',
        summary:
          'Defends the epistemic warrant of Christian belief via the sensus divinitatis and the internal testimony of the Holy Spirit.',
      },
    ],
    keyTerms: [
      {
        term: 'Privatio Boni',
        originalScript: 'privatio boni',
        transliteration: 'privatio boni',
        definition: 'Augustine’s metaphysical definition of evil as the privation, lack, or distortion of an original created good.',
      },
      {
        term: 'Properly Basic Belief',
        originalScript: 'epistemic basicality',
        transliteration: 'properly basic belief',
        definition: 'A foundational belief warranted immediately upon appropriate experience rather than deduced from prior premises.',
      },
    ],
    relatedTopicSlugs: ['classical-cosmological-arguments', 'latin-doctors-augustine', 'ordo-salutis-grace'],
    sources: [
      {
        title: 'Augustine — Enchiridion on Faith, Hope, and Love',
        author: 'Augustine of Hippo',
        year: 'c. 421',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/augustine/enchiridion.html',
        citation: 'Nicene and Post-Nicene Fathers, First Series, Vol. 3 (CCEL).',
        summary: 'Augustine’s handbook summarizing Christian theology, including his classic account of evil as privation of good.',
      },
      {
        title: 'John Calvin — Institutes of the Christian Religion (Book I)',
        author: 'John Calvin',
        year: '1559',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/calvin/institutes.iii.iv.html',
        citation: 'Calvin, Institutes, trans. Henry Beveridge (CCEL).',
        summary: 'Exposition of the duplex cognitio Dei (twofold knowledge of God) and the innate sensus divinitatis.',
      },
    ],
    attachments: [
      {
        key: 'theodicy-epistemology-guide',
        title: 'Theodicy & Reformed Epistemology Seminar Brief',
        description: 'Structured study guide comparing Augustinian, Irenaean, Free Will, and Skeptical Theism responses to evil.',
        attachmentKind: 'Study Guide PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Warrant & Suffering: Epistemology and Theodicy',
        documentSubtitle: 'Paideia Advanced Apologetics Seminar Brief',
        sections: [
          {
            heading: '1. Defense vs. Theodicy',
            content:
              'In analytic philosophy of religion, a "Defense" (such as Plantinga’s Free Will Defense) aims to show that God and evil are logically compatible by offering a metaphysically possible reason God could allow evil. A "Theodicy" goes further by proposing God’s actual plausible reasons (e.g., love requiring freedom, soul-formation, cosmic redemption in Christ).',
          },
          {
            heading: '2. Why Classical Foundationalism Collapses',
            content:
              'Classical foundationalism claims: "A belief is rational only if it is self-evident, incorrigible, or evident to the senses—or deducible therefrom." Yet that claim itself is neither self-evident, incorrigible, nor evident to the senses! Thus it refutes itself.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'term_identification',
        difficulty: 'Foundational',
        prompt: 'What Latin phrase did Augustine use to define evil not as a created substance, but as the corruption or absence of good?',
        options: ['Ex opere operato', 'Privatio boni', 'Creatio ex nihilo', 'Imago Dei'],
        correctIndex: 1,
        explanation: 'Against Manichaean dualism, Augustine taught that all created nature is good, and evil is privatio boni—a parasitic privation of good.',
        sourceReference: 'Augustine, Enchiridion, ch. 11',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'In Reformed Epistemology, what does it mean to call belief in God "properly basic"?',
        options: [
          'It is simplistic and unsuitable for academic philosophy',
          'It can be rationally and warrantedly held without being inferred from prior propositional arguments',
          'It cannot be challenged by any defeaters',
          'It relies solely on mathematical proofs',
        ],
        correctIndex: 1,
        explanation: 'Plantinga argues that like perceptual or memory beliefs, belief in God can be warranted in the basic way via the sensus divinitatis.',
        sourceReference: 'Alvin Plantinga, Warranted Christian Belief (2000)',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Advanced',
        prompt: 'What is the primary distinction between a philosophical "Defense" and a "Theodicy" regarding the problem of evil?',
        options: [
          'A Defense offers a logically possible reason God might permit evil to refute contradiction; a Theodicy proposes God’s actual plausible reasons',
          'A Defense denies that evil exists; a Theodicy affirms dualism',
          'A Defense is Eastern; a Theodicy is exclusively Western',
          'There is no distinction between the two terms',
        ],
        correctIndex: 0,
        explanation: 'Plantinga distinguished a Defense (requiring only logical possibility to defeat the logical problem of evil) from a full Theodicy.',
        sourceReference: 'Plantinga, God, Freedom, and Evil (1974)',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Intermediate',
        prompt: 'Which Reformer coined the Latin phrase divinitatis sensum (sensus divinitatis) for humanity’s innate awareness of God?',
        excerptContext: '"There is within the human mind, and indeed by natural instinct, an awareness of divinity."',
        options: ['Huldrych Zwingli', 'John Calvin', 'Thomas Cranmer', 'Menno Simons'],
        correctIndex: 1,
        explanation: 'John Calvin introduced this concept in Book I, Chapter 3 of his Institutes of the Christian Religion.',
        sourceReference: 'Calvin, Institutes I.3.1',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which Church Father is most closely associated with the "soul-making" perspective on human maturation through moral trial?',
        options: ['Irenaeus of Lyons', 'Tertullian', 'Cyprian of Carthage', 'Jerome'],
        correctIndex: 0,
        explanation: 'Irenaeus portrayed humanity as created initially immature and growing into mature likeness with God through moral testing and Christ’s recapitulation.',
        sourceReference: 'Irenaeus, Against Heresies IV.38',
      },
    ],
  },

  // =========================================================================
  // SOTERIOLOGY
  // =========================================================================
  {
    slug: 'theories-of-atonement',
    disciplineSlug: 'soteriology',
    title: 'Models & Mysteries of the Atonement',
    subtitle: 'Christus Victor, Recapitulation, Satisfaction, Penal Substitution & Moral Exemplar',
    summary:
      'Surveys the biblical tapestry and historical development of how Christ’s death and resurrection reconcile sinners to God and triumph over sin, death, and Satan.',
    difficulty: 'Foundational',
    readingMinutes: 16,
    era: 'Biblical, Patristic, Medieval & Reformation',
    scriptureRefs: ['Isaiah 53:4–12', 'Romans 3:21–26', 'Colossians 2:13–15', 'Hebrews 9:11–28', '1 Peter 2:21–24'],
    sections: [
      {
        heading: 'A Multi-Faceted Biblical Tapestry',
        body: 'New Testament soteriology employs a rich prism of Old Testament and Greco-Roman metaphors to proclaim the saving work of the Cross: the liturgical language of Temple sacrifice and propitiation (hilasterion, Romans 3:25), the marketplace language of redemption/ransom (apolytrosis, Mark 10:45), the courtroom language of justification (dikaiosis, Romans 5:18), the relational language of reconciliation (katallage, 2 Corinthians 5:18–21), and the battlefield imagery of cosmic victory over principalities and death (Colossians 2:15; Hebrews 2:14–15). Rather than treating historic atonement models as mutually exclusive rivals, classical orthodoxy often views them as complementary facets around a central substitutionary and victorious core.',
        keyTakeaway:
          'Scripture portrays the Cross through sacrificial, forensic, relational, redemptive, and cosmic-victory dimensions.',
      },
      {
        heading: 'Patristic Emphasis: Recapitulation, Ransom & Christus Victor',
        body: 'For the first millennium, Patristic theologians highlighted Christ’s liberation of humanity from bondage to sin, death, and the devil—famously termed Christus Victor by Gustaf Aulén. Irenaeus of Lyons combined this with Recapitulation (anakephalaiosis): as the Second Adam, Jesus retraced human obedience from infancy to the tree of the Cross, reversing Adam’s disobedience. Gregory of Nyssa and Rufinus used vivid "ransom" metaphors, while Athanasius in On the Incarnation powerfully united victory over death with substitutionary death: the Word offered his own sinless body as a substitute to satisfy the divine sentence against corruption and raise humanity to incorruption.',
        keyTakeaway:
          'Early Fathers united cosmic liberation from death (Christus Victor) with Christ’s representative, substitutionary offering in our place.',
      },
      {
        heading: 'Anselm’s Cur Deus Homo, Penal Substitution & Moral Influence',
        body: 'In Cur Deus Homo ("Why God Became Man," 1098), Anselm of Canterbury critiqued crude ransom-to-the-devil imagery and framed sin as robbing God of His infinite honor. Humanity owed a debt only humanity should pay, yet only God had the infinite worth able to pay it; hence the God-Man offered superabundant Satisfaction. Peter Abelard responded by stressing Moral Influence—how Christ’s self-giving love awakens responsive love in stony hearts. During the Reformation, Luther and Calvin deepened Anselm’s insight through biblical law and covenant categories into Penal Substitution: out of fathomless love, the Triune God himself bears the righteous penal curse of the Law in the person of the Son (Isaiah 53:5–6; Galatians 3:13; 2 Corinthians 5:21), so that God might be "just and the justifier of the one who has faith in Jesus" (Romans 3:26).',
        keyTakeaway:
          'Anselm grounded the Incarnation in satisfaction of divine honor; the Reformers anchored it in covenantal justice and penal substitution.',
      },
    ],
    excerpts: [
      {
        author: 'Athanasius of Alexandria',
        work: 'On the Incarnation of the Word, Chapter 2 (Section 9)',
        year: 'c. 318',
        quote:
          'The Word perceived that corruption could not be got rid of otherwise than through death; yet He Himself, as the Word, being immortal and the Father’s Son, was such as could not die. For this reason, therefore, He took to Himself a body capable of death, in order that it, by partaking of the Word Who is above all, might be worthy to die in the stead of all.',
        citation: 'De Incarnatione 9',
        sourceUrl: 'https://www.ccel.org/ccel/athanasius/incarnation.html',
      },
      {
        author: 'Anselm of Canterbury',
        work: 'Cur Deus Homo (Why God Became Man), Book II, Chapter 6',
        year: '1098',
        quote:
          'None therefore can make this satisfaction except God, and none ought to make it except man: it is therefore necessary that a God-Man should make it.',
        citation: 'Cur Deus Homo II.6',
        sourceUrl: 'https://www.ccel.org/ccel/anselm/basic_works.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Patristic / Eastern Orthodox',
        proponent: 'Irenaeus, Athanasius, Gregory of Nazianzus',
        summary:
          'Centers on Christus Victor, Recapitulation, and ontological healing of human nature from mortality and corruption.',
      },
      {
        tradition: 'Catholic / Anselmian',
        proponent: 'Anselm of Canterbury, Thomas Aquinas',
        summary:
          'Emphasizes Christ’s meritorious satisfaction offered in supreme charity to the Father on behalf of the Body.',
      },
      {
        tradition: 'Reformed & Evangelical',
        proponent: 'Martin Luther, John Calvin, John Stott',
        summary:
          'Highlights Penal Substitution—the Triune God’s self-substitution bearing sin’s covenantal penalty—as the engine powering Christus Victor and moral renewal.',
      },
    ],
    keyTerms: [
      {
        term: 'Christus Victor',
        originalScript: 'Christus Victor',
        transliteration: 'Christus Victor',
        definition: '"Christ the Conqueror"—Christ’s Cross and Resurrection disarming the powers of sin, death, and Satan (Col 2:15).',
      },
      {
        term: 'Propitiation',
        originalScript: 'ἱλαστήριον',
        transliteration: 'hilasterion',
        definition: 'Satisfying and turning aside God’s righteous wrath against human sin through Christ’s atoning sacrifice (Rom 3:25; 1 John 2:2).',
      },
    ],
    relatedTopicSlugs: ['ordo-salutis-grace', 'justification-union-with-christ', 'christology-hypostatic-union'],
    sources: [
      {
        title: 'Athanasius — On the Incarnation of the Word (De Incarnatione)',
        author: 'Athanasius of Alexandria',
        year: 'c. 318',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/athanasius/incarnation.html',
        citation: 'Athanasius, On the Incarnation, Nicene and Post-Nicene Fathers II, Vol. 4 (CCEL).',
        summary: 'Patristic masterpiece explaining why the eternal Logos assumed mortal flesh to conquer death and renew the image of God.',
      },
      {
        title: 'Anselm — Cur Deus Homo (Why God Became Man)',
        author: 'Anselm of Canterbury',
        year: '1098',
        repository: 'Project Gutenberg',
        sourceType: 'Treatise',
        url: 'https://www.gutenberg.org/ebooks/67242',
        citation: 'St. Anselm, Cur Deus Homo (Project Gutenberg Open Ebook).',
        summary: 'Landmark medieval dialogue articulating the Satisfaction model of the Incarnation and Atonement.',
      },
    ],
    attachments: [
      {
        key: 'atonement-models-chart',
        title: 'Comparative Matrix of Historic Atonement Models',
        description: 'Side-by-side comparison of Recapitulation, Christus Victor, Satisfaction, Penal Substitution, and Moral Influence.',
        attachmentKind: 'Diagram / Chart',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Models of the Atonement: Comparative Reference Chart',
        documentSubtitle: 'Paideia Soteriology Study Attachment',
        sections: [
          {
            heading: 'Core Diagnostic Question of Each Model',
            content:
              '1. Recapitulation (Irenaeus): How is Adam’s ruined race remade? Christ retraces every stage of life in obedience.\n2. Christus Victor (Patristics / Aulén): How are captives freed from death & Satan? Christ triumphs by dying and rising.\n3. Satisfaction (Anselm): How is God’s dishonored majesty restored? Only the God-Man can pay humanity’s infinite debt.\n4. Penal Substitution (Reformers): How can a holy Judge pardon guilty lawbreakers justly (Rom 3:26)? Christ bears the legal curse in our place.\n5. Moral Influence (Abelard): How are hardened hearts softened? By beholding the self-giving love of the Cross.',
          },
          {
            heading: 'Integrating the Models (Symphonic Orthodoxy)',
            content:
              'Colossians 2:13–15 demonstrates how Scripture itself binds Penal Substitution and Christus Victor together: God disarmed the demonic rulers and authorities (Christus Victor) precisely BY canceling the record of legal debt that stood against us, nailing it to the cross (Penal Substitution).',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'In Anselm of Canterbury’s Cur Deus Homo ("Why God Became Man"), why must the Redeemer be both fully God and fully man?',
        options: [
          'So that angels and humans could both worship in Latin',
          'Because none ought to make satisfaction for human sin except man, yet none is able to make infinite satisfaction except God',
          'Because human flesh is inherently evil and needed destruction',
          'To pay a financial ransom directly to the Roman Emperor',
        ],
        correctIndex: 1,
        explanation: 'Anselm argued that humanity owed the debt of obedience, while only God possessed the infinite dignity capable of rendering satisfaction.',
        sourceReference: 'Anselm, Cur Deus Homo II.6',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'Which Swedish Lutheran bishop’s 1931 book popularized the Latin phrase "Christus Victor" for the classic Patristic motif of Christ defeating sin, death, and the devil?',
        options: ['Gustaf Aulén', 'Dietrich Bonhoeffer', 'Karl Barth', 'Herman Bavinck'],
        correctIndex: 0,
        explanation: 'Gustaf Aulén published Christus Victor in 1931, highlighting the dramatic cosmic-victory motif in the Church Fathers and Martin Luther.',
        sourceReference: 'Gustaf Aulén, Christus Victor (1931)',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'What Greek term in Romans 3:25 recalls the Day of Atonement Mercy Seat and denotes Christ as a propitiatory sacrifice?',
        options: ['Hilasterion', 'Koinonia', 'Parousia', 'Kenosis'],
        correctIndex: 0,
        explanation: 'Hilasterion (used in LXX Leviticus 16 for the mercy seat sprinkled with blood) describes Christ put forward by God as a propitiation by his blood.',
        sourceReference: 'Romans 3:25',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Advanced',
        prompt: 'Which fourth-century Alexandrian treatise argued that the immortal Word assumed a mortal body so it "might be worthy to die in the stead of all"?',
        excerptContext: '"He took to Himself a body capable of death, in order that it, by partaking of the Word Who is above all, might be worthy to die in the stead of all."',
        options: [
          'Athanasius, On the Incarnation',
          'Augustine, Confessions',
          'Peter Abelard, Commentary on Romans',
          'Thomas Kempis, Imitation of Christ',
        ],
        correctIndex: 0,
        explanation: 'Young Athanasius wrote De Incarnatione (~AD 318), uniting the conquest of corruption with Christ’s substitutionary death.',
        sourceReference: 'Athanasius, On the Incarnation 9',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'Which medieval thinker is primarily associated with the "Moral Influence" (or Moral Exemplar) emphasis of the Atonement?',
        options: ['Peter Abelard', 'Bernard of Clairvaux', 'Duns Scotus', 'Cyril of Alexandria'],
        correctIndex: 0,
        explanation: 'Peter Abelard emphasized how the demonstration of divine love in Christ’s Passion enkindles reciprocal love within the believer’s heart.',
        sourceReference: 'Peter Abelard, Exposition of the Epistle to the Romans',
      },
    ],
  },

  {
    slug: 'ordo-salutis-grace',
    disciplineSlug: 'soteriology',
    title: 'Grace, Free Will, the Ordo Salutis & Patristic Theosis',
    subtitle: 'Augustine vs. Pelagius, Reformed & Arminian Soteriology, and Eastern Deification',
    summary:
      'Traces the great debates over human fallenness and divine grace: the Pelagian controversy, Monergism vs. Synergism, the Golden Chain of Romans 8, and participation in God (Theosis).',
    difficulty: 'Intermediate',
    readingMinutes: 18,
    era: 'Patristic, Reformation & Ecumenical',
    scriptureRefs: ['Romans 8:28–30', 'Ephesians 2:1–10', 'Philippians 2:12–13', '2 Peter 1:3–4'],
    sections: [
      {
        heading: 'The Pelagian Controversy & Sovereign Grace',
        body: 'In the early fifth century, the British ascetic Pelagius taught that Adam’s sin injured humanity only by bad example, leaving human free will wholly intact to fulfill God’s law without interior regenerating grace. Augustine of Hippo countered from Ephesians 2 and Romans 5 that humanity after the Fall suffers bondage of the will (non posse non peccare—not able not to sin) and requires prevenient, interior, liberating grace from start to finish. The Council of Ephesus (431) and the Second Council of Orange (529) decisively condemned both Pelagianism and "Semi-Pelagianism" (the view that fallen humans can initiate faith on their own prior to grace).',
        keyTakeaway:
          'Nicene and Western orthodoxy agree against Pelagianism that salvation begins entirely with God’s gracious initiative, never autonomous human merit.',
      },
      {
        heading: 'Monergism, Synergism & The Ordo Salutis',
        body: 'Grounded in Paul’s "Golden Chain" (Romans 8:29–30: foreknew, predestined, called, justified, glorified), Protestant theology developed the Ordo Salutis (logical order of salvation’s application). Reformed theology (Calvin, Synod of Dort 1618–19) affirms Monergism: because fallen sinners are spiritually dead (Ephesians 2:1), the Holy Spirit sovereignly regenerates the heart, effectually awakening willing faith, leading to justification, adoption, sanctification, and perseverance of the saints. Classical Arminian and Wesleyan theology (Jacobus Arminius, John Wesley) also strongly affirms total depravity—rejecting Pelagianism—but holds that universal Prevenient Grace purchased by the Cross restores every person’s ability to freely accept or resist the Gospel call (evangelical synergism).',
        keyTakeaway:
          'Both Reformed monergism and Wesleyan-Arminian prevenient grace affirm total depravity while differing on whether saving grace is irresistible or resistible.',
      },
      {
        heading: 'Eastern Christian Soteriology: Synergy & Theosis',
        body: 'In the Greek Patristic and Eastern Orthodox tradition, salvation is framed less in Western juridical categories and more as ontological healing and Theosis (deification)—becoming "partakers of the divine nature" (2 Peter 1:4). As Athanasius famously summarized: "The Son of God became man so that we might become god [by grace]." Later articulated by Maximus the Confessor and Gregory Palamas (via the distinction between God’s incommunicable Essence and uncreated Energies), theosis never blurs the Creator-creature boundary into pantheism; rather, just as iron placed in fire glows with heat and light while remaining iron, redeemed humanity is transfigured by the Holy Spirit into Christlikeness.',
        keyTakeaway:
          'Theosis expresses transformative union with God by grace, preserving creaturely identity while radiating divine holiness and love.',
      },
    ],
    excerpts: [
      {
        author: 'Second Council of Orange',
        work: 'Canon 7 on Grace and Free Will',
        year: '529',
        quote:
          'If anyone affirms that we can form any right opinion or make any right choice which relates to the salvation of eternal life, as is expedient for us, or that we can be saved... without the illumination and inspiration of the Holy Spirit, he is led astray by a heretical spirit.',
        citation: 'Council of Orange (529), Canon 7',
        sourceUrl: 'https://www.ccel.org/ccel/schaff/creeds2.iv.i.iii.html',
      },
      {
        author: 'Athanasius of Alexandria',
        work: 'On the Incarnation, Section 54.3',
        year: 'c. 318',
        quote:
          'For He was made man that we might be made God; and He manifested Himself by a body that we might receive the idea of the unseen Father.',
        citation: 'De Incarnatione 54.3',
        sourceUrl: 'https://www.ccel.org/ccel/athanasius/incarnation.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Reformed / Calvinist',
        proponent: 'Augustine, John Calvin, Canons of Dort',
        summary:
          'Teaches unconditional election and monergistic regeneration: the Spirit effectually renews the heart so the sinner willingly believes.',
      },
      {
        tradition: 'Arminian / Wesleyan',
        proponent: 'Jacobus Arminius, John Wesley',
        summary:
          'Teaches universal prevenient grace enabling all people to respond freely to the Gospel, conditional election, and entire sanctification in love.',
      },
      {
        tradition: 'Eastern Orthodox',
        proponent: 'Athanasius, Maximus the Confessor, Gregory Palamas',
        summary:
          'Emphasizes ancestral mortality healed through cooperative synergy with divine grace, culminating in Theosis via God’s uncreated energies.',
      },
    ],
    keyTerms: [
      {
        term: 'Monergism vs. Synergism',
        originalScript: 'μόνον + ἔργον / σύν + ἔργον',
        transliteration: 'monergism / synergism',
        definition: 'Whether initial regeneration is accomplished by one working power alone (the Holy Spirit) or cooperative human-divine action.',
      },
      {
        term: 'Prevenient Grace',
        originalScript: 'gratia praeveniens',
        transliteration: 'gratia praeveniens',
        definition: '"Grace that goes before"—divine grace preceding and enabling any human movement toward repentance and faith.',
      },
    ],
    relatedTopicSlugs: ['theories-of-atonement', 'justification-union-with-christ', 'latin-doctors-augustine'],
    sources: [
      {
        title: 'Canons of the Second Council of Orange (AD 529)',
        author: 'Caesarius of Arles & Synod Bishops',
        year: '529',
        repository: 'CCEL',
        sourceType: 'Council / Creed',
        url: 'https://www.ccel.org/ccel/schaff/creeds2.iv.i.iii.html',
        citation: 'Philip Schaff, Creeds of Christendom, Vol. II (CCEL).',
        summary: 'Historic Western canons affirming the necessity of prevenient grace against both Pelagianism and Semi-Pelagianism.',
      },
      {
        title: 'Augustine — On Spirit and the Letter (Anti-Pelagian Writings)',
        author: 'Augustine of Hippo',
        year: '412',
        repository: 'New Advent',
        sourceType: 'Treatise',
        url: 'https://www.newadvent.org/fathers/1502.htm',
        citation: 'Nicene and Post-Nicene Fathers, First Series, Vol. 5 (New Advent).',
        summary: 'Augustine’s foundational exegetical treatise on 2 Corinthians 3:6, grace, law, and interior renewal by the Holy Spirit.',
      },
    ],
    attachments: [
      {
        key: 'grace-perspectives-guide',
        title: 'Pelagianism, Semi-Pelagianism, Arminianism & Monergism Compared',
        description: 'Clear diagnostic table mapping views of the Fall, Prevenient Grace, Election, and Perseverance.',
        attachmentKind: 'Study Guide PDF',
        format: 'pdf',
        linkedSourceIndex: 0,
        documentTitle: 'Theology of Grace: From Orange (529) to Dort & Wesley',
        documentSubtitle: 'Paideia Comparative Soteriology Guide',
        sections: [
          {
            heading: 'Four Classic Positions on Grace and Human Ability',
            content:
              '1. Pelagianism (Condemned at Ephesus 431): No inherited corruption; humans can obey God unaided.\n2. Semi-Pelagianism (Condemned at Orange 529): Human nature is wounded, yet man can take the first step of faith unaided before grace assists.\n3. Classical Arminianism / Wesleyanism: Humanity is totally unable on its own, but God’s universal Prevenient Grace goes first to free the will to accept or reject Christ.\n4. Augustinian / Reformed Monergism: Humanity is spiritually dead in sin; God’s effectual grace sovereignly regenerates the heart, infallibly producing willing faith.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What view was condemned at the Second Council of Orange (AD 529) for claiming fallen humans can initiate faith on their own before God’s grace acts?',
        options: ['Nicene Trinitarianism', 'Semi-Pelagianism', 'Chalcedonian Christology', 'Cappadocian Theology'],
        correctIndex: 1,
        explanation: 'Orange (529) condemned Semi-Pelagianism, insisting that even the beginning of faith (initium fidei) is a gift of the Holy Spirit’s prevenient grace.',
        sourceReference: 'Second Council of Orange (529), Canons 5–7',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'How does classical Wesleyan-Arminianism avoid Pelagianism while still affirming resistible grace?',
        options: [
          'By denying the Fall of Adam altogether',
          'Through the doctrine of universal Prevenient Grace, which restores moral ability prior to human response',
          'By teaching that works of the Mosaic Law earn justification',
          'By rejecting the deity of the Holy Spirit',
        ],
        correctIndex: 1,
        explanation: 'Arminius and Wesley strongly affirmed total depravity, teaching that no one can seek God apart from universal Prevenient Grace.',
        sourceReference: 'John Wesley, Sermon 85: On Working Out Our Own Salvation',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Foundational',
        prompt: 'Which Greek soteriological term—rooted in 2 Peter 1:4—describes transformative participation in the divine life by grace without erasing the Creator-creature distinction?',
        options: ['Theosis', 'Kenosis', 'Anamnesis', 'Eisegesis'],
        correctIndex: 0,
        explanation: 'Theosis (deification) is central to Eastern Patristic soteriology, describing believers becoming by grace what Christ is by nature, while remaining creatures.',
        sourceReference: '2 Peter 1:4; Athanasius, De Incarnatione 54.3',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'In Reformed soteriology, why does Regeneration logically precede Faith in the Ordo Salutis?',
        options: [
          'Because believers are justified centuries before they believe',
          'Because spiritually dead hearts (Eph 2:1–5) must be made alive by the Spirit in order to willingly trust Christ',
          'Because faith is unnecessary for salvation',
          'Because sanctification must be completed before justification begins',
        ],
        correctIndex: 1,
        explanation: 'Monergism holds that regeneration is the Spirit’s instantaneous imparting of spiritual life, whose immediate first breath is saving faith.',
        sourceReference: 'Ephesians 2:4–5; Westminster Confession of Faith ch. 10',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Advanced',
        prompt: 'Which fourteenth-century Byzantine theologian defended Theosis by distinguishing between God’s inaccessible Essence (ousia) and His participatory uncreated Energies (energeiai)?',
        options: ['Gregory Palamas', 'Photius of Constantinople', 'John of Damascus', 'Symeon the New Theologian'],
        correctIndex: 0,
        explanation: 'Gregory Palamas articulated the Essence-Energies distinction during the Hesychast controversy to show how creatures genuinely participate in God without merging into the divine Essence.',
        sourceReference: 'Gregory Palamas, The Triads',
      },
    ],
  },

  {
    slug: 'justification-union-with-christ',
    disciplineSlug: 'soteriology',
    title: 'Justification, Imputation & Mystical Union with Christ',
    subtitle: 'Pauline Righteousness, Reformation Sola Fide, Council of Trent, and Duplex Gratia',
    summary:
      'Examines the heart of the 16th-century soteriological debate: forensic vs. transformative justification, imputed righteousness, the Council of Trent, and Calvin’s Union with Christ.',
    difficulty: 'Intermediate',
    readingMinutes: 16,
    era: 'Pauline, Reformation & Modern Ecumenical',
    scriptureRefs: ['Genesis 15:6', 'Romans 3:21–4:8', 'Galatians 2:16–21', 'Philippians 3:8–9', 'James 2:14–26'],
    sections: [
      {
        heading: 'Forensic Justification & Imputed Righteousness',
        body: 'In Romans 3–4 and Galatians 2–3, Paul addresses how ungodly sinners can stand righteous before the judgment throne of a holy God: "To the one who does not work but believes in him who justifies the ungodly, his faith is counted as righteousness" (Romans 4:5, citing Genesis 15:6). During the Reformation, Martin Luther rediscovered the Hebrew/Greek courtroom nuance of hitsdiq / dikaioo—"to declare righteous" rather than "to make intrinsically righteous" as Latin iustificare ("make just") had suggested to medieval scholastics. Protestant confessions therefore teach Forensic Justification by grace alone through faith alone (sola fide): sins are pardoned and Christ’s active and passive obedience ("alien righteousness," iustitia aliena) is imputed to the believer, who is simul iustus et peccator.',
        keyTakeaway:
          'In Reformation theology, faith is not a meritorious work, but the empty, outstretched hand receiving Christ’s complete righteousness.',
      },
      {
        heading: 'The Council of Trent vs. Reformation Confessions',
        body: 'Responding at Session VI of the Council of Trent (1547), Roman Catholic theology also condemned Pelagianism—insisting no one can merit initial justification by nature or law—but defined justification as comprising not only the remission of sins, but also the interior infusion of sanctifying charity (gratia infusa) through baptismal regeneration, preserved and increased through Spirit-wrought good works. Thus the historic divide turned on whether sanctification is internal to the definition of justification itself (Trent) or an inseparable twin consequence distinct from forensic justification (Reformation). In 1999, the Lutheran-Catholic Joint Declaration on the Doctrine of Justification explored convergences while noting continuing distinctions.',
        keyTakeaway:
          'Trent combined forgiveness and interior renewal under one umbrella of infused justification; the Reformers distinguished forensic justification from transformative sanctification so assurance rests wholly on Christ.',
      },
      {
        heading: 'Union with Christ (Unio Cum Christo) & Duplex Gratia',
        body: 'John Calvin resolved any caricature of justification as a "cold legal fiction" through the Pauline doctrine of Union with Christ (in Christo, Institutes III.11.10). Believers do not receive detached benefits from afar; by the bond of the Holy Spirit and faith, we are grafted into Christ Himself. From that living union flows a "double grace" (duplex gratia): (1) Justification, whereby we are reconciled and counted righteous without any mixture of works, and (2) Sanctification, whereby the same Spirit inevitably renews our desires unto love and holiness. As the Reformers summarized the harmony of Paul and James 2: "We are justified by faith alone, yet the faith that justifies is never alone."',
        keyTakeaway:
          'Union with Christ holds justification and sanctification forever distinct (guarding assurance) yet forever inseparable (guarding holiness).',
      },
    ],
    excerpts: [
      {
        author: 'Martin Luther',
        work: 'The Freedom of a Christian',
        year: '1520',
        quote:
          'Faith unites the soul with Christ as a bride is united with her bridegroom... Accordingly the believing soul can boast of and glory in whatever Christ has as though it were its own, and whatever the soul has Christ claims as his own.',
        citation: 'De Libertate Christiana (1520)',
        sourceUrl: 'https://www.gutenberg.org/ebooks/34904',
      },
      {
        author: 'John Calvin',
        work: 'Institutes of the Christian Religion, Book III, Chapter 11, Section 10',
        year: '1559',
        quote:
          'Christ, therefore, justifies no man without also sanctifying him. These blessings are conjoined by a perpetual and inseparable tie... Just as you cannot rend Christ in pieces, so these two things, which we perceive together in him, are inseparable—namely, righteousness and sanctification.',
        citation: 'Institutes III.11.6 & III.16.1',
        sourceUrl: 'https://www.ccel.org/ccel/calvin/institutes.v.xii.html',
      },
    ],
    perspectives: [
      {
        tradition: 'Lutheran & Reformed',
        proponent: 'Martin Luther, Philip Melanchthon, John Calvin',
        summary:
          'Forensic declaration of righteousness based solely on Christ’s imputed obedience received by faith alone, flowing from Union with Christ alongside distinct sanctification.',
      },
      {
        tradition: 'Roman Catholic (Tridentine)',
        proponent: 'Thomas Aquinas, Council of Trent (Session VI)',
        summary:
          'Transformative infusion of sanctifying grace remitting sin and making the soul intrinsically just, increasing through charity and sacramental life.',
      },
      {
        tradition: 'New Perspective on Paul',
        proponent: 'E.P. Sanders, James D.G. Dunn, N.T. Wright',
        summary:
          'Emphasizes covenantal status—how God’s faithfulness in the Messiah creates one multi-ethnic family marked by faith rather than boundary-marking "works of Torah."',
      },
    ],
    keyTerms: [
      {
        term: 'Duplex Gratia',
        originalScript: 'duplex gratia',
        transliteration: 'duplex gratia',
        definition: 'Calvin’s "double grace" received simultaneously in Union with Christ: forensic justification and transformative sanctification.',
      },
      {
        term: 'Iustitia Aliena',
        originalScript: 'iustitia aliena',
        transliteration: 'iustitia aliena',
        definition: '"Alien righteousness"—Luther’s term for Christ’s own righteousness credited from outside ourselves rather than generated within.',
      },
    ],
    relatedTopicSlugs: ['theories-of-atonement', 'ordo-salutis-grace', 'schism-scholasticism-reformation'],
    sources: [
      {
        title: 'Martin Luther — Concerning Christian Liberty (Freedom of a Christian)',
        author: 'Martin Luther',
        year: '1520',
        repository: 'Project Gutenberg',
        sourceType: 'Treatise',
        url: 'https://www.gutenberg.org/ebooks/34904',
        citation: 'Luther, Concerning Christian Liberty, trans. R.S. Grignon (Project Gutenberg).',
        summary: 'Luther’s classic 1520 treatise unfolding the "joyous exchange" between Christ and the soul united by faith.',
      },
      {
        title: 'John Calvin — Institutes III.11: Justification by Faith',
        author: 'John Calvin',
        year: '1559',
        repository: 'CCEL',
        sourceType: 'Treatise',
        url: 'https://www.ccel.org/ccel/calvin/institutes.v.xii.html',
        citation: 'Calvin, Institutes Book III, ch. 11 (CCEL).',
        summary: 'Calvin’s systematic treatment of forensic justification, union with Christ, and duplex gratia.',
      },
    ],
    attachments: [
      {
        key: 'paul-and-james-reconciliation',
        title: 'Harmonizing Romans 3–4 and James 2:14–26 — Exegetical Brief',
        description: 'Lexical and contextual guide comparing how Paul and James use "justify," "faith," and "works" regarding Abraham.',
        attachmentKind: 'Exegetical Worksheet',
        format: 'markdown',
        linkedSourceIndex: 1,
        documentTitle: 'Paul & James on Justification: Complementary Canonical Voices',
        documentSubtitle: 'Paideia Exegetical Study Sheet',
        sections: [
          {
            heading: 'Contextual Target of Each Apostle',
            content:
              '- **Paul (Romans 4 / Galatians 3)** confronts legalism: Can works of the Law establish a sinner’s righteous standing before God’s tribunal? Answer: Never (Rom 3:28), citing Genesis 15:6.\n- **James (James 2:14–26)** confronts dead antinomian profession ("mere intellectual assent" thateven demons possess, Jas 2:19): Does bare verbal claim without love save? Answer: Dead faith is counterfeit; living faith is vindicated/demonstrated (Genesis 22) by fruit.',
          },
        ],
      },
    ],
    questions: [
      {
        questionType: 'multiple_choice',
        difficulty: 'Foundational',
        prompt: 'What does it mean to describe the Reformation doctrine of justification as "forensic"?',
        options: [
          'It relies on archaeological laboratory science',
          'It is a judicial courtroom declaration by God counting the believer righteous on account of Christ, rather than an infusion of moral quality',
          'It denies the necessity of Christ’s resurrection',
          'It applies only to Old Testament prophets',
        ],
        correctIndex: 1,
        explanation: 'Forensic comes from the Latin forum (law court), reflecting the Hebrew hitsdiq and Greek dikaioo ("to declare righteous").',
        sourceReference: 'Romans 4:5; Romans 8:33–34',
      },
      {
        questionType: 'term_identification',
        difficulty: 'Intermediate',
        prompt: 'What Latin phrase did John Calvin use for the "double grace" of distinct yet inseparable justification and sanctification flowing from Union with Christ?',
        options: ['Duplex gratia', 'Sola scriptura', 'Ex nihilo', 'Analogia fidei'],
        correctIndex: 0,
        explanation: 'In Institutes III.11.1, Calvin teaches that Union with Christ bestows a duplex gratia: forensic justification and Spirit-wrought sanctification.',
        sourceReference: 'Calvin, Institutes III.11.1',
      },
      {
        questionType: 'multiple_choice',
        difficulty: 'Intermediate',
        prompt: 'How did Session VI of the Council of Trent (1547) define justification in contrast to the Protestant Reformers?',
        options: [
          'As self-salvation without any need for Christ or grace',
          'As comprising not only forgiveness of sins, but also interior sanctification and renewal through infused grace',
          'As universal salvation regardless of faith or baptism',
          'As purely symbolic remembrance',
        ],
        correctIndex: 1,
        explanation: 'While condemning Pelagianism, Trent rejected forensic-only imputation and included transformative interior renewal (gratia infusa) inside the definition of justification.',
        sourceReference: 'Council of Trent, Session VI, Chapter 7 (1547)',
      },
      {
        questionType: 'source_attribution',
        difficulty: 'Intermediate',
        prompt: 'Which 1520 Reformation treatise describes the "joyous exchange" between Christ the Bridegroom and the believing soul?',
        excerptContext: '"Faith unites the soul with Christ as a bride is united with her bridegroom... whatever Christ has the believing soul can boast of as its own."',
        options: [
          'Martin Luther, The Freedom of a Christian',
          'Thomas Cranmer, Book of Common Prayer',
          'John Knox, History of the Reformation in Scotland',
          'Philipp Spener, Pia Desideria',
        ],
        correctIndex: 0,
        explanation: 'Luther’s 1520 treatise De Libertate Christiana famously depicts Christ taking the soul’s sins and bestowing His royal righteousness.',
        sourceReference: 'Martin Luther, The Freedom of a Christian (1520)',
      },
      {
        questionType: 'true_false',
        difficulty: 'Foundational',
        prompt: 'True or False: The Reformation maxim "justified by faith alone" teaches that genuine saving faith can remain barren of love and good works.',
        options: [
          'True — good works are discouraged in Reformed confessions.',
          'False — "We are justified by faith alone, yet the faith that justifies is never alone," inevitably bearing fruit in love (Gal 5:6).',
        ],
        correctIndex: 1,
        explanation: 'Both Lutheran and Reformed confessions insist good works have zero merit toward justification, yet necessarily flow as grateful fruit of living faith.',
        sourceReference: 'Galatians 5:6; Westminster Confession 11.2',
      },
    ],
  },
];
