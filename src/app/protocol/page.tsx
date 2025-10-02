// src/app/protocol/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The E.D.A.I. Protocol | Ethical Deployment of Artificial Intelligence',
  description: 'Complete protocol documentation for E.D.A.I. - the verification framework ensuring ethical AI deployment through ceremony, verification, and immutable accountability.',
  openGraph: {
    title: 'The E.D.A.I. Protocol',
    description: 'Ethical Deployment of Artificial Intelligence - Full Protocol Documentation',
  },
};

export default function ProtocolPage() {
  return (
    <main className="min-h-screen bg-black text-white">
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
                <span className="text-amber-500 font-mono text-sm">STATUS: LIVE</span>
              </div>
              <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded">
                <span className="text-amber-500 font-mono text-sm">NETWORK: HEDERA MAINNET</span>
              </div>
            </div>
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
              <li className="flex items-start">
                <span className="text-amber-500 mr-3">•</span>
                <span>Fast, but not always accurate</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-3">•</span>
                <span>Confident, but often wrong</span>
              </li>
              <li className="flex items-start">
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
                <span className="text-amber-400 font-bold">PASS (~95%)</span>
                <p className="text-amber-100/80 text-sm mt-1">Guardian agrees, output delivered immediately</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
                <span className="text-amber-400 font-bold">FLAG (~4%)</span>
                <p className="text-amber-100/80 text-sm mt-1">Guardian flags concerns, output delivered with warning</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
                <span className="text-amber-400 font-bold">BLOCK (~1%)</span>
                <p className="text-amber-100/80 text-sm mt-1">Guardian blocks, routes to human arbiter</p>
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
                <p className="text-amber-200/60 text-sm">Issued as NFTs</p>
              </div>
              <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded text-center">
                <p className="text-amber-500 font-semibold mb-1">Verification Events</p>
                <p className="text-amber-200/60 text-sm">Immutably logged</p>
              </div>
              <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded text-center">
                <p className="text-amber-500 font-semibold mb-1">Public Auditability</p>
                <p className="text-amber-200/60 text-sm">Full transparency</p>
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

      {/* Deployment Information */}
      <section className="border-b border-amber-900/30 py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500">For Institutions</h2>
          
          <div className="space-y-6">
            <p className="text-amber-100/80 text-lg">
              E.D.A.I. can be deployed across multiple sectors with sector-specific compliance frameworks:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {["Healthcare", "Finance", "Legal", "Education"].map((sector) => (
                <div key={sector} className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                  <p className="text-amber-400 font-semibold">{sector}</p>
                  <p className="text-amber-200/60 text-sm">Compliance frameworks available</p>
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
                <p className="text-amber-200/60 text-sm">Immutable record of protocol evolution</p>
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
            The intention-reality gap ends here. Deploy verified AI with ceremony, accountability, and immutable proof.
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