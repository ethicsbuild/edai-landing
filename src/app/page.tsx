import Image from "next/image";
import { CouncilSignupForm } from "../components/CouncilSignupForm";

/**
 * Home Page — E.D.A.I.
 * Server Component (no "use client")
 */

export const metadata = {
  title: "E.D.A.I. — Ethical Deployment of AI",
  description:
    "The forge where AI agents swear oaths of honor. Protocols, guardians, and Hedera-logged verification.",
  openGraph: {
    title: "E.D.A.I. — Ethical Deployment of AI",
    description:
      "Close the intention–reality gap with verified deployment and guardian induction.",
    images: ["/edai-logo.png"],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
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
            The forge where AI agents swear{" "}
            <span className="text-edai-gold">oaths of honor</span>.
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-xl md:text-2xl text-white/80">
            E.D.A.I. is a think tank and action forge for ethical AI—designing
            verified deployment protocols, training guardians, and protecting
            human agency.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-lg font-medium bg-yellow-600 text-black hover:bg-yellow-500 transition-colors"
            >
              Join the Council
            </a>
            <a
              href="/protocol"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-lg font-medium border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              Read the Protocol
            </a>
          </div>
        </div>
      </section>

      {/* Mission / Manifesto */}
      <section id="manifesto" className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-edai-gold">
            Mission &amp; Manifesto
          </h2>
          <div className="prose prose-invert prose-lg max-w-none space-y-6 text-left">
            <p>
              We build rites and safeguards for AI deployment—so systems act
              with integrity, and human agency remains sacred.
            </p>
            <p>
              Guardianship is a practice, not a press release. Our protocols are
              verified, logged on Hedera, and designed for real-world use.
            </p>
            <p>
              This is our work. This is our vow: close the intention–reality
              gap.
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
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center">
                  <span className="text-black font-bold text-sm">E</span>
                </div>
                <span className="font-semibold">E.D.A.I.</span>
              </div>
              <p className="text-white/60 max-w-md">
                Ethical Deployment of Artificial Intelligence
                <br />
                Deploying Truth | Protecting Agency | Enforcing Ethical Rites
              </p>
            </div>
            <div className="text-sm text-white/60">
              <div className="mb-4">
                <div className="font-medium text-white mb-2">Network</div>
                <p>Hedera Mainnet</p>
              </div>
              <div className="flex gap-6">
                <a className="hover:text-white transition-colors" href="mailto:council@edai.org">
                  Contact
                </a>
                <a className="hover:text-white transition-colors" href="/protocol">
                  Protocol
                </a>
                <a className="hover:text-white transition-colors" href="/governance">
                  Governance
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