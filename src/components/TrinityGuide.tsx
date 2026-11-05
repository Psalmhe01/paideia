import { useState } from 'react';
import { Link } from 'react-router-dom';

const persons = [
  { name: 'Father', x: 95, y: 54, reference: '1 Corinthians 8:6', to: '/bible/webp/1co/8#verse-6' },
  { name: 'Son', x: 305, y: 54, reference: 'John 1:1–18', to: '/bible/webp/jhn/1#verse-1' },
  { name: 'Holy Spirit', x: 200, y: 233, reference: 'Acts 5:3–4', to: '/bible/webp/act/5#verse-3' },
];

export function TrinityGuide() {
  const [selected, select] = useState(0);
  const person = persons[selected];
  return (
    <figure className="ref-card space-y-4">
      <div><p className="ref-kicker">Visual study guide</p><h2 className="ref-heading">The Shield of the Trinity</h2></div>
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(12rem,.8fr)] gap-4 items-center">
        <svg viewBox="0 0 400 282" className="w-full max-w-sm mx-auto" role="img" aria-label="The Father, Son, and Holy Spirit are each God and distinct from each other.">
          <path d="M95 54H305L200 233Z" fill="none" stroke="var(--ref-muted)" strokeWidth="1.5" strokeDasharray="5 5" />
          {persons.map(({ name, x, y }, index) => <line key={name} x1={x} y1={y} x2="200" y2="117" stroke="var(--ref-accent)" strokeWidth={selected === index ? 4 : 1.6} />)}
          <g fontFamily="system-ui" fontSize="13" textAnchor="middle" fill="var(--ref-muted)">
            <text x="200" y="41">is distinct from</text>
            <text transform="translate(122 163) rotate(59)">is distinct from</text>
            <text transform="translate(278 163) rotate(-59)">is distinct from</text>
          </g>
          <g fontFamily="system-ui" fontSize="13" textAnchor="middle">
            <text x="152" y="102" fill="var(--ref-accent)">is</text>
            <text x="248" y="102" fill="var(--ref-accent)">is</text>
            <text x="215" y="181" fill="var(--ref-accent)">is</text>
            <circle cx="200" cy="117" r="31" fill="var(--ref-accent)" />
            <text x="200" y="122" fill="var(--ref-surface)" fontWeight="700">God</text>
          </g>
          {persons.map(({ name, x, y }, index) => (
            <g key={name}>
              <rect x={x - 51} y={y - 20} width="102" height="40" rx="14" fill={selected === index ? 'var(--ref-selected)' : 'var(--ref-surface)'} stroke="var(--ref-accent)" />
              <text x={x} y={y + 5} fill="var(--ref-accent)" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="system-ui">{name}</text>
            </g>
          ))}
        </svg>
        <div className="ref-inset space-y-3">
          <p className="font-reading text-lg">The lines express two claims of Nicene theology. Each person is fully God. The Father, Son, and Holy Spirit are personally distinct.</p>
          <div className="ref-tabs" aria-label="Select a person">
            {persons.map(({ name }, index) => <button key={name} className="ref-button" type="button" aria-pressed={selected === index} onClick={() => select(index)}>{name}</button>)}
          </div>
          <p className="text-sm" aria-live="polite">Read <Link className="ref-link" to={person.to}>{person.reference}</Link></p>
        </div>
      </div>
    </figure>
  );
}
