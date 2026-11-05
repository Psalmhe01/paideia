export const axes = [
  { id: 'authority', label: 'Scripture & authority' },
  { id: 'baptism', label: 'Baptism' },
  { id: 'communion', label: 'Eucharist / Communion' },
  { id: 'polity', label: 'Church governance' },
] as const;

type Tradition = {
  id: string; name: string; family: string; origin: string; introduction: string;
  practices: Record<(typeof axes)[number]['id'], string>;
  sourceLabel: string; source: string;
};

export const traditions: Tradition[] = [
  { id: 'catholic', name: 'Catholic', family: 'Catholic communion', origin: 'Ancient sees · Latin and Eastern churches',
    introduction: 'The Catholic communion includes the Latin Church and self-governing Eastern Catholic churches. They share communion with the bishop of Rome and retain diverse liturgical and theological traditions.',
    practices: { authority: 'Scripture and apostolic Tradition form one deposit of faith, interpreted by the church’s teaching office.', baptism: 'Infants and adults receive baptism as a sacrament of initiation.', communion: 'Christ is truly present. The Catechism uses transubstantiation to describe the change of bread and wine.', polity: 'Bishops govern local churches in communion with one another and the pope.' },
    sourceLabel: 'Catechism of the Catholic Church', source: 'https://www.vatican.va/content/catechism/en.html' },
  { id: 'eastern-orthodox', name: 'Eastern Orthodox', family: 'Eastern Christian communions', origin: 'Ancient churches · Byzantine liturgical tradition',
    introduction: 'A communion of self-governing churches sharing faith, sacramental life, and the first seven ecumenical councils. Liturgy, icons, and theosis are prominent in its theology and practice.',
    practices: { authority: 'Scripture belongs within Holy Tradition, expressed in liturgy, the Fathers, and councils.', baptism: 'Baptism, chrismation, and communion normally form a unified initiation, including for infants.', communion: 'The Divine Liturgy celebrates the real presence of Christ as a holy mystery.', polity: 'Bishops and synods govern self-governing churches with a historic order of primacy.' },
    sourceLabel: 'Greek Orthodox Archdiocese teachings', source: 'https://www.goarch.org/-/teachings-of-the-orthodox-church' },
  { id: 'oriental-orthodox', name: 'Oriental Orthodox', family: 'Eastern Christian communions', origin: 'Ancient churches · reception of Chalcedon',
    introduction: 'This communion includes Coptic, Syriac, Armenian, Ethiopian, Eritrean, and Malankara churches. It receives the first three ecumenical councils and follows the Christological language of Cyril of Alexandria.',
    practices: { authority: 'Scripture is read within the apostolic Tradition and the confession of the first three ecumenical councils.', baptism: 'Baptism is associated closely with chrismation and Eucharist in initiation.', communion: 'Christ is received in the Eucharistic mystery within each church’s historic liturgy.', polity: 'Self-governing churches have their own patriarchal or equivalent structures.' },
    sourceLabel: 'Joint dialogue on the sacraments', source: 'https://www.christianunity.va/content/unitacristiani/en/dialoghi/sezione-orientale/chiese-ortodosse-orientali/commissione-mista-internazionale-per-il-dialogo-teologico-tra-la/documenti-di-dialogo/en.html' },
  { id: 'assyrian', name: 'Assyrian Church of the East', family: 'Eastern Christian communions', origin: 'Ancient East Syriac churches',
    introduction: 'An heir of the ancient Church of the East, with an East Syriac liturgy and a history across Mesopotamia and Asia. Its dialogue with the Catholic Church records a common confession of Christ’s divinity and humanity.',
    practices: { authority: 'Scripture is read in the East Syriac apostolic and liturgical tradition.', baptism: 'Baptism is received within the sacramental life of the church.', communion: 'The East Syriac Eucharistic liturgy includes the Anaphora of Addai and Mari.', polity: 'A catholicos-patriarch and synod of bishops lead the church.' },
    sourceLabel: 'Common Christological Declaration', source: 'https://www.vatican.va/content/john-paul-ii/en/speeches/1994/november/documents/hf_jp-ii_spe_19941111_dichiarazione-cristologica.html' },
  { id: 'anglican', name: 'Anglican', family: 'Reformation traditions', origin: 'English Reformation · global communion',
    introduction: 'Anglican churches grew from the English Reformation and developed into a global communion. Common prayer, historic episcopacy, and a range of Protestant and catholic emphases shape Anglican identity.',
    practices: { authority: 'Scripture is foundational, with the creeds, prayer books, and historic formularies received in provincial contexts.', baptism: 'Infant and adult baptism are practiced.', communion: 'The Eucharist is central to common worship. Theological accounts of Christ’s presence vary.', polity: 'Churches have bishops and govern through provincial structures and synods.' },
    sourceLabel: 'Chicago-Lambeth Quadrilateral', source: 'https://www.anglicancommunion.org/resource/chicago-lambeth-quadrilateral/' },
  { id: 'lutheran', name: 'Lutheran', family: 'Reformation traditions', origin: 'Sixteenth-century German Reformation',
    introduction: 'Lutheran churches trace their confessional identity to the Reformation associated with Martin Luther and the Augsburg Confession. They emphasize justification by faith and the gospel conveyed through Word and sacrament.',
    practices: { authority: 'Scripture is the final norm. Lutheran confessions articulate its teaching.', baptism: 'Infants and adults receive baptism as a means of grace.', communion: 'Christ’s body and blood are truly present and received with the bread and wine.', polity: 'Synodical and episcopal forms vary by church and country.' },
    sourceLabel: 'Augsburg Confession', source: 'https://bookofconcord.org/augsburg-confession/' },
  { id: 'reformed', name: 'Reformed & Presbyterian', family: 'Reformation traditions', origin: 'Swiss, continental, and Scottish Reformations',
    introduction: 'Reformed churches share emphases on Scripture, covenant, and divine grace. Presbyterian and continental Reformed churches draw on overlapping but distinct confessional histories.',
    practices: { authority: 'Scripture is the final authority. Confessional standards vary, including Westminster and the Three Forms of Unity.', baptism: 'Many Reformed churches baptize children of believers and adult converts as a covenant sign.', communion: 'Classical Reformed confessions speak of real spiritual participation in Christ by faith.', polity: 'Elders share governance through congregational, regional, and wider assemblies in Presbyterian churches.' },
    sourceLabel: 'Westminster Confession (OPC)', source: 'https://opc.org/wcf.html' },
  { id: 'anabaptist', name: 'Anabaptist & Mennonite', family: 'Reformation traditions', origin: 'Sixteenth-century Radical Reformation',
    introduction: 'Anabaptist traditions emphasize voluntary discipleship and the visible community of believers. Many Mennonite churches foreground peacemaking, service, and Jesus’ teaching.',
    practices: { authority: 'Scripture is interpreted in the gathered community with attention to the life and teaching of Jesus.', baptism: 'Baptism follows personal confession of faith.', communion: 'The Lord’s Supper expresses remembrance, unity, and renewed commitment to Christ and the community.', polity: 'Congregations relate to regional conferences or other church bodies in varied ways.' },
    sourceLabel: 'Confession of Faith in a Mennonite Perspective', source: 'https://www.mennoniteusa.org/who-are-mennonites/what-we-believe/confession-of-faith/' },
  { id: 'baptist', name: 'Baptist', family: 'Later Protestant movements', origin: 'Seventeenth-century English-speaking churches',
    introduction: 'Baptist churches are diverse. Believer’s baptism, congregational responsibility, and religious liberty are recurring commitments.',
    practices: { authority: 'Scripture is the supreme norm for faith and practice. Confessions differ among Baptist bodies.', baptism: 'Baptism usually follows a profession of faith and is performed by immersion.', communion: 'Many Baptist churches observe the Lord’s Supper as a memorial ordinance. Communion practices vary.', polity: 'Local congregations are generally autonomous and cooperate through associations or conventions.' },
    sourceLabel: 'Baptist Faith and Message (Southern Baptist example)', source: 'https://bfm.sbc.net/bfm2000/' },
  { id: 'methodist', name: 'Methodist & Wesleyan', family: 'Later Protestant movements', origin: 'Eighteenth-century Wesleyan revival',
    introduction: 'Methodist traditions emerged from the Wesleyan revival. They emphasize prevenient grace, holy living, and works of mercy alongside acts of piety.',
    practices: { authority: 'Scripture is primary. Tradition, reason, and experience inform theological reflection.', baptism: 'Many Methodist churches baptize infants and adults.', communion: 'The Lord’s Supper is a means of grace. Invitation and frequency vary across churches.', polity: 'Connectional structures link local churches. Some communions have bishops.' },
    sourceLabel: 'United Methodist Articles of Religion', source: 'https://www.umc.org/en/content/articles-of-religion' },
  { id: 'pentecostal', name: 'Pentecostal', family: 'Later Protestant movements', origin: 'Early twentieth-century global revivals',
    introduction: 'Pentecostal churches emphasize the work and gifts of the Holy Spirit. Their global origins, theology, and forms of governance are diverse. This profile draws on a classical Trinitarian Pentecostal example.',
    practices: { authority: 'Scripture is the authoritative norm, with strong attention to the Spirit’s work in the church.', baptism: 'Believer’s water baptism by immersion is common. Baptism in the Holy Spirit is a distinct emphasis in many bodies.', communion: 'Many churches observe the Lord’s Supper as an ordinance of remembrance and anticipation.', polity: 'Congregational, networked, and episcopal patterns occur across Pentecostal denominations.' },
    sourceLabel: 'Assemblies of God Statement of Fundamental Truths', source: 'https://ag.org/beliefs/statement-of-fundamental-truths' },
];
