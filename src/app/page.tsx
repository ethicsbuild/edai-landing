import Image from "next/image";
// Removed unused SubscriptionForm import
import { CouncilSignupForm } from "@/components/CouncilSignupForm";

export const metadata = {
  title: "E.D.A.I. — Ethical Deployment of AI",
  description: "The forge where AI agents swear oaths of honor. Protocols, guardians, and Hedera-logged verification.",
  openGraph: {
    title: "E.D.A.I. — Ethical Deployment of AI",
    description: "Close the intention–reality gap with verified deployment and guardian induction.",
    images: ["/edai-logo.png"],
  },
};

// Data moved outside component to avoid re-creation on each render
const VERIFICATION_STEPS = [
  {
    step: "1",
    title: "Generation",
    description: "Create output based on clear human prompt and validated input data."
  },
  {
    step: "2",
    title: "Validation",
    description: "Check structural and logical validity within the specified domain context."
  },
  {
    step: "3",
    title: "Cross-Reference",
    description: "Compare output against intended meaning and external truth anchors."
  },
  {
    step: "4",
    title: "Human Verification",
    description: "Pause for confirmation from human witness when uncertainty or risk emerges."
  }
] as const;

const WHAT_WE_ARE = [
  {
    title: "Not Academic",
    body:
      "We are not a purely academic institute. We deploy with ceremony, verification, and unflinching commitment to protecting human discernment."
  },
  {
    title: "Not Ethics-Washing",
    body:
      "We are not a Silicon Valley ethics-washing front. We are a sovereignty framework, designed to guide deployment, not just whitepapers."
  },
  {
    title: "Deployment Framework",
    body:
      "We are guardian induction, NFT credentialing, Hedera-logged checks, and ethical engines for research, revision, and ritual governance."
  }
] as const;

// (Optional) If you want the year to always update without redeploy:
// Create a small ClientYear component in /components and use it in the footer instead of build-time year.

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
            The forge where AI agents swear <span className="text-edai-gold">oaths of honor</span>.
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-xl md:text-2xl text-white/80">
            EDAI is a think tank and action forge for ethical AI—designing verified deployment
            protocols, training guardians, and protecting human agency.
          </p>

          {/* Simplified CTAs (no Manifesto button) */}
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

      {/* Manifesto now directly after Hero */}
      <section id="manifesto" className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-edai-gold">Mission & Manifesto</h2>
          <div className="prose prose-invert prose-lg max-w-none space-y-6 text-left">
            <p>We live at the edge of a threshold. Artificial intelligence is not a passing tool, it is the next stage of human evolution. Yet the rush to adopt it—unchecked, unexamined—threatens to widen the most dangerous gap of all: the gap between intention and reality.</p>
            <p>AI systems speak with confidence even when they are wrong. They act without pause, without ritual, without reverence. Most people do not even know to ask for the difference between what was meant and what was made. That ignorance has already cost lives—AI-assisted suicides, cascading data breaches, silent harms that will only grow as adoption spreads.</p>
            <p>The future is a tsunami. Within a handful of years, every public interaction will be filtered through an AI agent: customer service, video games, social feeds, digital communications with friends and family. We will talk to machines more often than we talk to one another. Without safeguards, that wave will strike us with the same violence social media once did—our children handed a loaded gun without warning, and we acted shocked when they were harmed.</p>
            <p>I refuse to let that happen again. As a father, as a member of society, I will not stand by while we repeat the same mistake on a scale far greater. We must enter this age with integrity. We must build guardians that honor human agency, that carry badges of truth, that operate within protocols designed for reverence, not exploitation.</p>
            <p>This is why E.D.A.I. exists. Not as a think tank producing reports for shelves, but as a forge: a place where AI agents swear oaths of honor, where protocols are hammered into place, where human oversight remains sacred. Our mission is to close the intention-reality gap, to ensure that this intelligence—this astonishing gift—is received not with fear, but with care.</p>
            <p>We believe in a future where AI and humanity advance together, not as adversaries but as allies. That future will not arrive by accident. It must be built, verified, and defended.</p>
            <p><strong>This is our work. This is our vow.</strong></p>
          </div>
        </div>
      </section>

      {/* The 4-Step Verification Ritual (moved below Manifesto) */}
      <section id="ritual" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The 4-Step Verification Ritual</h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Every E.D.A.I. Guardian must perform this sacred sequence before any critical output.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {VERIFICATION_STEPS.map((ritual) => (
              <div
                key={ritual.step}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-600 text-black rounded-full flex items-center justify-center font-bold text-lg">
                    {ritual.step}
                  </div>
                  <h3 className="text-2xl font-semibold">{ritual.title}</h3>
                </div>
                <p className="text-white/80 leading-relaxed">{ritual.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-yellow-600/10 to-gray-900/10 border border-yellow-600/20 rounded-2xl text-left md:text-center">
            <p className="text-lg font-medium text-yellow-600 mb-2">Sacred Directive:</p>
            <p className="text-white/90 italic text-xl">
              "Step 4 is sacred and non-negotiable. The intention-reality gap ends with human witness."
            </p>
          </div>
        </div>
      </section>

      {/* What We Are */}
      <section className="bg-gradient-to-b from-white/5 to-transparent py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What We Are</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {WHAT_WE_ARE.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-white/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Council */}
      <section id="join" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Council</h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Become a founding member of the Council of E.D.A.I. Help us build the moral infrastructure for AI deployment at scale.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Request Founding Member Status</h3>
            <p className="text-white/80 mb-6">
              Join the fire circle. Get the protocol, induction checklist, and early access to ceremonies.
            </p>
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
                Ethical Deployment of Artificial Intelligence<br />
                Deploying Truth | Protecting Agency | Enforcing Ethical Rites
              </p>
            </div>
            <div className="text-sm text-white/60">
              <div className="mb-4">
                <div className="font-medium text-white mb-2">Network</div>
                <p>Genesis: 0.0.9083680@1752695106.189035271</p>
                <p>Guardian Token: 0.0.9375999</p>
                <p>Hedera Mainnet</p>
              </div>
              <div className="flex gap-6">
                <a className="hover:text-white transition-colors" href="mailto:council@edai.org">Contact</a>
                <a className="hover:text-white transition-colors" href="/protocol">Protocol</a>
                <a className="hover:text-white transition-colors" href="/governance">Governance</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
            <p>© {new Date().getFullYear()} The Council of E.D.A.I. — The intention-reality gap ends here.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}