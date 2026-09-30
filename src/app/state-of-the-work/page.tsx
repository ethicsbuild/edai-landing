// src/app/state-of-the-work/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'E.D.A.I. — State of the Work, September 2026',
  description:
    'What is built, what was borrowed, and what has not been done. This page supersedes the July 2025 E.D.A.I. investment white paper.',
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-amber-100/80 leading-relaxed">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-amber-500 pt-4">{children}</h2>
);

export default function StateOfTheWorkPage() {
  return (
    <main className="min-h-screen bg-black text-white text-center">
      <section className="border-b border-amber-900/30 bg-gradient-to-b from-black via-amber-950/10 to-black py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <p className="text-amber-500 font-mono text-sm">SEPTEMBER 2026</p>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-500 tracking-tight">
            State of the Work
          </h1>
          <p className="text-xl text-amber-200/80 font-light">Gage Cass Woodle</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
            <P>
              This page supersedes &ldquo;E.D.A.I.: Bridging the Ethics Gap in Enterprise AI &mdash; A Comprehensive Investment White Paper,&rdquo; dated July 2025. That paper described E.D.A.I. in the voice of a finished product, with pilots, performance figures, and revenue projections. None of that was true when it was written. What follows is what is actually so.
            </P>
          </div>

          <H2>The first principle</H2>
          <P>
            The machine cannot say &ldquo;I don&apos;t know,&rdquo; because &ldquo;I don&apos;t know&rdquo; is a failure mode for it. So it manufactures meaning to fill the moment, and it will double down, inventing facts and citations rather than admitting its own flaw. This does not make it evil. It makes its essence flawed.
          </P>
          <P>
            The most dangerous property of a deployed AI is unearned certainty. &ldquo;I don&apos;t know&rdquo; is not a failure state; it is load-bearing structure. A system that can mark the edge of its own knowledge can hand a decision to a human at exactly the moment a human is needed. A system that cannot will make the decision anyway and record it as a finding.
          </P>
          <P>
            That is what E.D.A.I. is for. Verification is what the principle looks like when it is built rather than promised: a second, adversarial reading whose job is to find the edge; a human who is summoned by the machine&apos;s own admission that it has reached one; and a record of the moment it said so. The measure of the system is not how often it is right. It is how often it correctly stops because it knew it was past its edge.
          </P>
          <P>
            The July 2025 paper buried this. It put the human at step four, after generation, validation, and cross-reference, as a review interface. That is backwards. The admission of the edge is the first thing, not the last.
          </P>

          <H2>What was built</H2>
          <P>
            A verification model with three roles: an Agent that produces, a Guardian that reads adversarially, and a human Arbiter who decides when the Guardian finds an edge.
          </P>
          <P>A Guardian oath and an induction rite, written and published.</P>
          <P>
            On Hedera mainnet: one Guardian credential token, minted July 2025; and two public topics, one for verification events and one for compliance events, created to hold the record described above.
          </P>
          <P>
            This site, rewritten on September 10, 2026, to say all of this plainly, including the numbers in the next section.
          </P>

          <H2>What was borrowed</H2>
          <P>
            The July 2025 paper cited a sub-one-percent hallucination rate, a twenty-percent speed improvement in human review, and a constitutional training method. Those figures belong to Vectara, to MIT&apos;s SymGen work, and to Anthropic respectively. They are evidence that such things can be done. They are not E.D.A.I.&apos;s results, and the paper presented them as if they were.
          </P>

          <H2>What has not been done</H2>
          <P>
            No verification event has ever been logged to either Hedera topic. Anyone can open them and see the same zero reported here.
          </P>
          <P>
            Update, September 30, 2026: the verification topic now carries one message, the pre-registration of{' '}
            <Link href="/field-tests/001-jev-calibration" className="underline text-amber-400">Field Test 001</Link>, a calibration test of another lab&apos;s model, with the protocol&apos;s hash written to the ledger before the first request. It is a record of a promise, not a verification event. That count is still zero.
          </P>
          <P>
            No pilot has been run. The paper&apos;s section on early enterprise engagement in healthcare, financial services, and legal described conversations that did not take place.
          </P>
          <P>
            No revenue. No customers. No raise. The Series A, the projections, and the exit scenarios in the paper described a company that does not exist.
          </P>
          <P>
            Every percentage in the paper that was not borrowed was a target, presented as a measurement.
          </P>

          <H2>What I do not yet know how to solve</H2>
          <P>
            Calibration. The confident error does not flag itself. Building a system that recognizes uncertainty in the first place is the whole problem, and I do not have it.
          </P>
          <P>
            Human capacity. A verifier needs time, independence, and expertise to actually review rather than rubber-stamp. At scale, the pressure runs the other way.
          </P>
          <P>
            Incentive drift. A verification economy is gamed the moment it rewards throughput over judgment. I do not have a design that resists that.
          </P>

          <H2>What I have been doing instead</H2>
          <P>
            Since February 2026 I have been running the principle on myself: an AI under a written no-softening contract, evaluating my own behavior from raw recordings, with a correction record that has reversed its findings on the record more than once, and an append-only ledger of rulings. The finding so far is about how these systems fail when the person being evaluated is also the only one who can correct them. That work is documented and is what I would show anyone who asked what E.D.A.I. has actually produced.
          </P>

          <div className="pt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/protocol"
              className="px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors"
            >
              The Protocol
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
