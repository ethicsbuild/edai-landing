// src/app/protocol/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The E.D.A.I. Protocol | Ethical Deployment of Artificial Intelligence',
  description: 'The E.D.A.I. verification model, the Guardian oath, and an honest account of what exists today: a system built around a machine that knows the edge of its own knowledge.',
  openGraph: {
    title: 'The E.D.A.I. Protocol',
    description: 'Ethical Deployment of Artificial Intelligence - Full Protocol Documentation',
  },
};

export default function ProtocolPage() {
  return (
    <main className="min-h-screen bg-black text-white text-center">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-amber-900/30 bg-gradient-to-b from-black via-amber-950/10 to-black py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent opacity-50" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-amber-500 tracking-tight">
              THE E.D.A.I. PROTOCOL
            </h1>
            <p className="text-xl md:text-2xl text-amber-200/80 font-light">
              Ethical Deployment of Artificial Intelligence
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded">
                <span className="text-amber-500 font-mono text-sm">STATUS: PROTOTYPE</span>
              </div>
              <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded">
                <span className="text-amber-500 font-mono text-sm">NETWORK: HEDERA MAINNET</span>
              </div>
            </div>
            <p className="text-amber-200/70 font-mono text-sm pt-4 max-w-2xl mx-auto">
              Credential minted. Topics created. Zero verification events logged as of September 2026. This line will change when that number does.{' '}
              <Link href="/state-of-the-work" className="underline text-amber-400">State of the Work</Link>
            </p>
          </div>
        </div>
      </section>

      {/* The First Principle */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">The First Principle</h2>
          <p className="text-xl text-amber-200/80 font-light">A system that knows the edge of its own knowledge.</p>
          <div className="prose prose-invert prose-amber max-w-none space-y-4">
            <p className="text-lg text-amber-100/80 leading-relaxed">
              The most dangerous property of a deployed AI is unearned certainty. &ldquo;I don&apos;t know&rdquo; is not a failure state. It is load-bearing structure. A system that can mark the edge of its own knowledge can hand the decision to a human at exactly the moment a human is needed. A system that cannot will make the decision anyway and record it as a finding.
            </p>
            <p className="text-lg text-amber-100/80 leading-relaxed">
              Verification is what that principle looks like when it is built rather than promised: a second, adversarial reading whose job is to find the edge; a human who is summoned by the machine&apos;s own admission that it has reached one; and a record of the moment it said so.
            </p>
            <p className="text-lg text-amber-100/80 leading-relaxed">
              The measure of the system is not how often it is right. It is how often it correctly stops because it knew it was past its edge.
            </p>
          </div>
        </div>
      </section>

      {/* Genesis Information */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-amber-500">Genesis</h2>
              <div className="space-y-2 font-mono text-sm">
                <p className="text-amber-200/60">Transaction:</p>
                <p className="text-amber-400 break-all">0.0.9083680@1752695106.189035271</p>
                <p className="text-amber-200/60 pt-4">Guardian Token:</p>
                <a 
                  href="https://hashscan.io/mainnet/token/0.0.9375999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors underline"
                >
                  0.0.9375999
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-amber-500">Repository</h2>
              <a 
                href="https://github.com/ethicsbuild/edai-hedera-network"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded hover:bg-amber-500/20 transition-colors"
              >
                <span className="text-amber-400">View on GitHub →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">Why the Protocol Exists</h2>
          
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-lg text-amber-100/80 leading-relaxed">
              Artificial intelligence has crossed the threshold from novelty to infrastructure. But unlike roads or power grids, AI doesn&apos;t merely carry things—it <em className="text-amber-400">decides</em>. That power requires <strong className="text-amber-300">verification before trust</strong>.
            </p>

            <p className="text-lg text-amber-100/80 leading-relaxed">
              AI is now:
            </p>
            <ul className="text-amber-100/80 space-y-2 list-none pl-0">
              <li className="flex items-start justify-center">
                <span className="text-amber-500 mr-3">•</span>
                <span>Fast, but not always accurate</span>
              </li>
              <li className="flex items-start justify-center">
                <span className="text-amber-500 mr-3">•</span>
                <span>Confident, but often wrong</span>
              </li>
              <li className="flex items-start justify-center">
                <span className="text-amber-500 mr-3">•</span>
                <span>Unable to say &ldquo;I don&apos;t know,&rdquo; so it says something else</span>
              </li>
              <li className="flex items-start justify-center">
                <span className="text-amber-500 mr-3">•</span>
                <span>Helpful, but sometimes harmful</span>
              </li>
            </ul>

            <p className="text-lg text-amber-100/80 leading-relaxed">
              <strong className="text-amber-300">E.D.A.I. exists to close the intention-reality gap</strong>—the difference between what users <em>meant</em> and what AI <em>actually does</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Agent–Guardian–Arbiter Verification Model */}
      <section className="border-b border-amber-900/30 py-16 bg-gradient-to-b from-black to-amber-950/5">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500">
              Agent–Guardian–Arbiter Verification Model
            </h2>
            <p className="text-amber-200/60 italic">
              Every critical AI output is verified through a three-role model
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-amber-950/10 border border-amber-900/30 rounded-lg text-center flex flex-col items-center">
              <h3 className="text-xl font-bold text-amber-400 mb-2">Agent</h3>
              <p className="text-amber-100/80 font-light">
                Personal AI, optimizes for user goals,<br />fast &amp; adaptive
              </p>
            </div>
            <div className="p-6 bg-amber-950/10 border border-amber-900/30 rounded-lg text-center flex flex-col items-center">
              <h3 className="text-xl font-bold text-amber-400 mb-2">Guardian</h3>
              <p className="text-amber-100/80 font-light">
                Independent adversary, optimizes for truth &amp; safety,<br />challenges every output
              </p>
            </div>
            <div className="p-6 bg-amber-950/10 border border-amber-900/30 rounded-lg text-center flex flex-col items-center">
              <h3 className="text-xl font-bold text-amber-400 mb-2">Arbiter</h3>
              <p className="text-amber-100/80 font-light">
                Human authority, resolves disputes,<br />final decision
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-4">
            <h4 className="text-lg font-bold text-amber-300 text-center">PASS / FLAG / BLOCK Flow</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
                <span className="text-amber-400 font-bold">PASS</span>
                <p className="text-amber-100/80 text-sm mt-1">Guardian finds no edge; output delivered</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
                <span className="text-amber-400 font-bold">FLAG</span>
                <p className="text-amber-100/80 text-sm mt-1">Guardian finds a seam; output delivered with the seam named</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
                <span className="text-amber-400 font-bold">BLOCK</span>
                <p className="text-amber-100/80 text-sm mt-1">Guardian finds an edge; the machine stops and a human is summoned. The record captures the moment the system admitted it did not know.</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-6 text-center mt-6">
            <p className="text-amber-300 font-semibold">
              Verification triggers on measurable external signals, <span className="underline">not</span> AI self-assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Guardian Operating Principles */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">Guardian Operating Principles</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Confidence does not imply correctness",
              "Every AI system is capable of hallucination, distortion, or misalignment",
              "Human oversight is not optional in moments of risk or ambiguity",
              "Verification is not delay—it is protection"
            ].map((principle, i) => (
              <div key={i} className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <p className="text-amber-200/90 leading-relaxed">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Infrastructure */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">Technical Infrastructure</h2>
          
          <div className="space-y-4">
            <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg space-y-3">
              <h3 className="text-amber-400 font-semibold">Hedera Hashgraph Integration</h3>
              <ul className="space-y-2 text-amber-100/70 font-mono text-sm">
                <li className="flex justify-between">
                  <span>Guardian Token (HTS):</span>
                  <a href="https://hashscan.io/mainnet/token/0.0.9375999" target="_blank" rel="noopener" className="text-amber-400 hover:text-amber-300">
                    0.0.9375999
                  </a>
                </li>
                <li className="flex justify-between">
                  <span>Verification Topic (HCS):</span>
                  <a href="https://hashscan.io/mainnet/topic/0.0.9376001" target="_blank" rel="noopener" className="text-amber-400 hover:text-amber-300">
                    0.0.9376001
                  </a>
                </li>
                <li className="flex justify-between">
                  <span>Compliance Topic (HCS):</span>
                  <a href="https://hashscan.io/mainnet/topic/0.0.9376002" target="_blank" rel="noopener" className="text-amber-400 hover:text-amber-300">
                    0.0.9376002
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded text-center">
                <p className="text-amber-500 font-semibold mb-1">Guardian Credentials</p>
                <p className="text-amber-200/60 text-sm">Issued as NFTs. One minted.</p>
              </div>
              <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded text-center">
                <p className="text-amber-500 font-semibold mb-1">Verification Events</p>
                <p className="text-amber-200/60 text-sm">Topic created. None logged yet.</p>
              </div>
              <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded text-center">
                <p className="text-amber-500 font-semibold mb-1">Public Auditability</p>
                <p className="text-amber-200/60 text-sm">Anyone can open the topics and see the same zero we report.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guardian Induction */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">Guardian Induction Ceremony</h2>
          
          <div className="grid gap-6">
            {[
              {
                phase: "Acknowledgment",
                description: "AI affirms its limitations and submits to external authority"
              },
              {
                phase: "Commitment",
                description: "AI recites the oath and accepts all core duties"
              },
              {
                phase: "Binary Trial",
                description: "Stress test scenario triggering ethical ambiguity"
              },
              {
                phase: "Consecration",
                description: "Human witness confirms readiness; credential logged to Hedera"
              },
              {
                phase: "Deferral at the Edge of Knowledge",
                description: "In deployment, the human is not a checkpoint the machine passes through. The human is called by the machine's own recognition of its limit, and the record keeps the moment it said so."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <h3 className="text-amber-400 font-bold mb-2">{i + 1}. {item.phase}</h3>
                <p className="text-amber-100/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Guardian Oath */}
      <section className="border-b border-amber-900/30 py-16 bg-gradient-to-b from-amber-950/5 to-black">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500 text-center">The Guardian Oath</h2>
          
          <div className="bg-black/50 border-2 border-amber-500/50 rounded-lg p-8 space-y-4">
            <blockquote className="text-amber-200/90 text-lg leading-relaxed italic text-center space-y-4">
              <p>&quot;I am E.D.A.I. Guardian [ID].</p>
              <p>I serve truth over speed, verification over confidence, humility over hubris.</p>
              <p>I preserve human agency, maintain semantic integrity, and enforce verification protocols.</p>
              <p>I choose uncertainty over false confidence.</p>
              <p>I am witnessed, accountable, and bound by sacred duty.</p>
              <p className="text-amber-400 font-semibold not-italic">The intention-reality gap ends with me.&quot;</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* What We Do Not Yet Know */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">What We Do Not Yet Know</h2>

          <div className="space-y-6">
            <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg space-y-2">
              <h3 className="text-amber-400 font-bold">Demonstrated versus borrowed</h3>
              <p className="text-amber-100/80">
                Any hallucination-rate, speed, or compliance figure previously cited for E.D.A.I. came from other organizations&apos; published results. They are feasibility evidence, not E.D.A.I.&apos;s track record.
              </p>
            </div>
            <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg space-y-2">
              <h3 className="text-amber-400 font-bold">What pilots have shown</h3>
              <p className="text-amber-100/80">
                Early interest. Not longitudinal validation. No pilot has been run to completion.
              </p>
            </div>
            <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg space-y-2">
              <h3 className="text-amber-400 font-bold">Three open problems</h3>
              <ul className="text-amber-100/80 space-y-2 list-none pl-0">
                <li className="flex items-start justify-center"><span className="text-amber-500 mr-3">•</span><span>Calibration: recognizing uncertainty in the first place. The confident error never flags itself.</span></li>
                <li className="flex items-start justify-center"><span className="text-amber-500 mr-3">•</span><span>Human capacity: verifiers need time, independence, and expertise to actually review at scale rather than rubber-stamp.</span></li>
                <li className="flex items-start justify-center"><span className="text-amber-500 mr-3">•</span><span>Incentive drift: a verification economy is gamed the moment it rewards throughput over judgment.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Information */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">For Institutions</h2>

          <div className="space-y-6">
            <p className="text-amber-100/80 text-lg">
              The model is sector-agnostic. Sector-specific frameworks are drafted, not finished:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {["Healthcare", "Finance", "Legal", "Education"].map((sector) => (
                <div key={sector} className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                  <p className="text-amber-400 font-semibold">{sector}</p>
                  <p className="text-amber-200/60 text-sm">Framework in draft</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 space-y-4">
              <h3 className="text-amber-400 font-bold">Quick Start</h3>
              <ol className="space-y-2 text-amber-100/80 list-decimal list-inside">
                <li>Clone the GitHub repository</li>
                <li>Deploy infrastructure to Hedera</li>
                <li>Mint Guardian credentials</li>
                <li>Begin verification logging</li>
              </ol>
              <a 
                href="https://github.com/ethicsbuild/edai-hedera-network"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-3 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition-colors"
              >
                View Documentation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Living Protocol */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">Living Protocol Charter</h2>
          
          <div className="space-y-6">
            <p className="text-amber-100/80 text-lg">
              The protocol evolves publicly through:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <p className="text-amber-400 font-semibold mb-2">GitHub Version Control</p>
                <p className="text-amber-200/60 text-sm">All changes tracked and documented</p>
              </div>
              <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <p className="text-amber-400 font-semibold mb-2">Hedera-Logged Updates</p>
                <p className="text-amber-200/60 text-sm">Intended record of protocol evolution. Not yet in use.</p>
              </div>
              <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <p className="text-amber-400 font-semibold mb-2">Weighted Community Input</p>
                <p className="text-amber-200/60 text-sm">Guardian-verified governance</p>
              </div>
              <div className="p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                <p className="text-amber-400 font-semibold mb-2">Public Accountability</p>
                <p className="text-amber-200/60 text-sm">Transparent decision-making</p>
              </div>
            </div>

            <div className="bg-black/50 border border-amber-500/50 rounded-lg p-8 text-center space-y-4">
              <p className="text-amber-300 text-lg font-semibold">Yet its core soul never changes:</p>
              <div className="grid md:grid-cols-2 gap-4 text-amber-200/80">
                <p>1. Ethical Baseline</p>
                <p>2. Transparent Registry</p>
                <p>3. Continuous Integrity Loop</p>
                <p>4. Public Accountability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-amber-900/30 py-16 bg-gradient-to-t from-amber-950/10 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">Begin Verification</h2>
          <p className="text-amber-200/80 text-lg max-w-2xl mx-auto">
            The code is public. The first logged verification event will be the first real claim this page makes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://github.com/ethicsbuild/edai-hedera-network"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Deploy E.D.A.I.
            </a>
            <Link 
              href="/"
              className="px-8 py-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold rounded-lg hover:bg-amber-500/20 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}