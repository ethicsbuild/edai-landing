import Image from "next/image";
import { CouncilSignupForm } from "../components/CouncilSignupForm";

/**
 * Home Page — E.D.A.I.
 * Server Component (no "use client")
 */

export const metadata = {
  title: "E.D.A.I. — Ethical Deployment of AI",
  description:
    "A machine that cannot say \"I don't know\" will say something else instead. E.D.A.I. exists to build the tremor in.",
  openGraph: {
    title: "E.D.A.I. — Ethical Deployment of AI",
    description:
      "A system that knows the edge of its own knowledge. Verification model, Guardian oath, and an honest account of what exists today.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white text-center">
      {/* Hero */}
      <section id="hero" className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="mx-auto inline-flex items-center justify-center rounded-2xl bg-black/70 p-6 md:p-8 ring-1 ring-white/10">
            <Image
              src="/edai-logo.png"
              alt="E.D.A.I. Logo"
              width={480}
              height={480}
              priority
              className="h-40 md:h-56 w-auto"
            />
          </div>

          <h1 className="mt-12 text-4xl md:text-6xl font-bold leading-tight">
            <span className="block">A machine that cannot say</span>
            <span className="block text-edai-gold whitespace-nowrap">&ldquo;I don&apos;t know&rdquo;</span>
            <span className="block">will say something else instead.</span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-xl md:text-2xl text-white/80">
            It will fill the gap with a plausible answer and reason forward from
            it with the same confidence it had a moment ago. The danger is not
            that it is wrong. It is that it is wrong without a tremor.
          </p>

          <p className="mt-6 mx-auto max-w-2xl text-xl md:text-2xl text-white">
            E.D.A.I. exists to build that tremor in.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/protocol"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-lg font-medium bg-yellow-600 text-black hover:bg-yellow-500 transition-colors"
            >
              Read the Protocol
            </a>
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-lg font-medium border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              Join the Council
            </a>
          </div>
        </div>
      </section>

      {/* The First Principle */}
      <section id="first-principle" className="py-24 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-edai-gold text-center">
            The First Principle
          </h2>
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p>
              The most dangerous property of a deployed AI is unearned
              certainty.
            </p>
            <p>
              &ldquo;I don&apos;t know&rdquo; is not a failure state. It is
              load-bearing structure. A system that can mark the edge of its own
              knowledge can hand the decision to a human at exactly the moment a
              human is needed. A system that cannot will make the decision anyway
              and record it as a finding.
            </p>
            <p>
              Verification is what that principle looks like when it is built
              rather than promised: a second, adversarial reading whose job is to
              find the edge; a human who is summoned by the machine&apos;s own
              admission that it has reached one; and a record of the moment it
              said so.
            </p>
            <p>
              The measure of the system is not how often it is right. It is how
              often it correctly stops because it knew it was past its edge.
            </p>
          </div>
        </div>
      </section>

      {/* What exists today */}
      <section id="state" className="py-24 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-edai-gold text-center">
            What exists today, and what does not
          </h2>
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p>
              This page used to describe E.D.A.I. in the voice of a finished
              product. That was the same intention&ndash;reality gap the work is
              meant to close, so here is the actual state.
            </p>
            <p>
              <strong>Built:</strong> the verification model (Agent, Guardian,
              Arbiter); the Guardian oath and induction rite; a Guardian
              credential minted on Hedera mainnet (one issued); two public Hedera
              topics created to hold verification and compliance events.
            </p>
            <p>
              <strong>Not yet done:</strong> no verification events have been
              logged to those topics. The verification topic carries one
              message, the pre-registration of{" "}
              <a href="/field-tests/001-jev-calibration" className="text-edai-gold underline">
                Field Test 001
              </a>
              , a record of a promise rather than a verification. No pilot has been run to completion. Every
              percentage that used to appear on this site was a target, not a
              measurement, and it has been removed.
            </p>
            <p>
              <strong>Open problems we have not solved:</strong> recognizing
              uncertainty in the first place, the confident error that never
              flags itself; giving human verifiers enough time, independence,
              and expertise to actually review rather than rubber-stamp; and
              keeping a verification economy from rewarding throughput over
              judgment.
            </p>
            <p>
              A fuller account, which supersedes the July 2025 investment white
              paper, is here:{" "}
              <a href="/state-of-the-work" className="text-edai-gold underline">
                State of the Work, September 2026
              </a>
              .
            </p>
            <p>
              The first field test, pre-registered on Hedera before the first
              request, is here:{" "}
              <a href="/field-tests/001-jev-calibration" className="text-edai-gold underline">
                Field Test 001, Jev Calibration
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="manifesto" className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-edai-gold">
            Mission
          </h2>
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p>
              We build rites and safeguards for AI deployment—so systems act
              with integrity, and human agency remains sacred.
            </p>
            <p>
              Guardianship is a practice, not a press release.
            </p>
            <p>
              This is our work. This is our vow: close the intention–reality
              gap, starting with our own.
            </p>
          </div>
        </div>
      </section>

      {/* Join the Council */}
      <section id="join" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Council</h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Become a founding member of the Council of E.D.A.I. Get the protocol,
            induction checklist, and early access to ceremonies.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
            <CouncilSignupForm />
            <p className="text-sm text-white/50 mt-4">
              We preserve human agency. No spam. Sacred trust.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16">
            <div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center">
                  <span className="text-black font-bold text-sm">E</span>
                </div>
                <span className="font-semibold">E.D.A.I.</span>
              </div>
              <p className="text-white/60 max-w-md mx-auto">
                Ethical Deployment of Artificial Intelligence
                <br />
                Deploying Truth | Protecting Agency | Enforcing Ethical Rites
              </p>
            </div>
            <div className="text-sm text-white/60">
              <div className="mb-4">
                <div className="font-medium text-white mb-2">Network</div>
                <p>Guardian credential and event topics on Hedera Mainnet</p>
              </div>
              <div className="flex justify-center gap-6">
                <a className="hover:text-white transition-colors" href="mailto:council@edai.org">
                  Contact
                </a>
                <a className="hover:text-white transition-colors" href="/protocol">
                  Protocol
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
            <p>© {new Date().getFullYear()} The Council of E.D.A.I.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}