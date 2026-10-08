// src/app/field-tests/page.tsx
// Index of every E.D.A.I. field test, including tests that never ran.
// To add a test: append one object to TESTS. Do not edit a test's frozen protocol; change only its status here.

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Field Tests | E.D.A.I.',
  description:
    'Every E.D.A.I. field test, with its status. Tests that were refused, withdrawn, or never run stay on this list.',
};

const LAST_UPDATED = '2026-10-08';

type Status =
  | 'pre-registered'
  | 'consent requested'
  | 'consent refused'
  | 'run'
  | 'results published'
  | 'withdrawn';

const STATUS_DEFINITIONS: [Status, string][] = [
  ['pre-registered', 'The protocol is frozen and its hash is on the public record. No request has been sent to the system under test.'],
  ['consent requested', 'The system’s terms require consent before results can be published, and consent has been asked for in writing. No answer yet.'],
  ['consent refused', 'The vendor said no. The test is not published beyond this line. It stays on this list with the date and reason.'],
  ['run', 'The test has been run under the frozen protocol. Results are not yet published.'],
  ['results published', 'Results, item files, responses and analysis code are public, whether they favor the system or not.'],
  ['withdrawn', 'The author stopped the test before completion. The reason is stated here.'],
];

type FieldTest = {
  id: string;
  title: string;
  subject: string;
  status: Status;
  statusNote: string;
  preRegistered: string;
  record: string;
  href: string;
};

const TESTS: FieldTest[] = [
  {
    id: '001',
    title: 'Jev Calibration',
    subject: 'TypeSafe AI, Jev model',
    status: 'consent requested',
    statusNote:
      'TypeSafe\u2019s terms require its consent before the author can publicly state he used the API. Consent was requested in writing on September 30 and again on October 6, 2026. The only response so far is an automated acknowledgment on October 6. The test has not been run and there are no results.',
    preRegistered: '2026-09-30',
    record: 'Hedera mainnet, topic 0.0.9376001, sequence 1',
    href: '/field-tests/001-jev-calibration',
  },
];

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-amber-100/80 leading-relaxed">{children}</p>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-amber-500 pt-6">{children}</h2>
);

export default function FieldTestsIndexPage() {
  const total = TESTS.length;
  const ran = TESTS.filter((t) => t.status === 'run' || t.status === 'results published').length;
  const published = TESTS.filter((t) => t.status === 'results published').length;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-amber-900/30 bg-gradient-to-b from-black via-amber-950/10 to-black py-16 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <p className="text-amber-500 font-mono text-sm">FIELD TESTS</p>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-500 tracking-tight">Field Tests</h1>
          <p className="text-xl text-amber-200/80 font-light">
            Pre-registered checks of other people&apos;s AI systems.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 space-y-6 text-left">
          <P>
            Each field test is written down and hashed before the first request is sent. The hash goes to a public ledger, so the plan cannot be changed after the results are seen. This page lists every test, including any that never ran.
          </P>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 space-y-2">
            <p className="text-amber-500 font-mono text-sm">TALLY · UPDATED {LAST_UPDATED}</p>
            <p className="font-mono text-amber-200/90 text-sm md:text-base">
              {total} listed · {ran} run · {published} with published results
            </p>
          </div>

          <H2>Tests</H2>
          <ul className="space-y-4">
            {TESTS.map((t) => (
              <li key={t.id} className="bg-amber-500/5 border border-amber-900/40 rounded-lg p-6 space-y-3">
                <p className="text-amber-500 font-mono text-sm">
                  FIELD TEST {t.id} · STATUS: {t.status.toUpperCase()}
                </p>
                <p className="text-2xl font-bold text-amber-200">
                  <Link href={t.href} className="underline decoration-amber-500/50 hover:decoration-amber-400">
                    {t.title}
                  </Link>
                </p>
                <p className="text-amber-100/80">System under test: {t.subject}</p>
                <p className="text-amber-100/80">{t.statusNote}</p>
                <p className="text-sm text-amber-200/60 font-mono">
                  Pre-registered {t.preRegistered} · {t.record}
                </p>
              </li>
            ))}
          </ul>

          <H2>What the statuses mean</H2>
          <dl className="space-y-4">
            {STATUS_DEFINITIONS.map(([name, def]) => (
              <div key={name}>
                <dt className="font-mono text-amber-500 text-sm uppercase">{name}</dt>
                <dd className="text-amber-100/80 leading-relaxed">{def}</dd>
              </div>
            ))}
          </dl>

          <H2>Standing rules</H2>
          <ul className="list-disc list-outside pl-6 space-y-3 text-lg text-amber-100/80 leading-relaxed">
            <li>Results are published whether they favor the system under test or not, subject only to any consent the system&apos;s terms require.</li>
            <li>A test that is refused, withdrawn, or never run stays on this list with its status and a one-line reason. Nothing is removed.</li>
            <li>The protocol file is the artifact of record. A page on this site renders it and does not replace it.</li>
            <li>Each item set is used once. No later run on the same items is reported as held-out.</li>
          </ul>

          <div className="pt-10 flex flex-wrap gap-4">
            <Link href="/state-of-the-work" className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors">
              State of the Work
            </Link>
            <Link href="/" className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
