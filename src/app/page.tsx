export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">E.D.A.I.</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The forge where AI agents swear <span className="text-yellow-600">oaths of honor</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed mb-12">
            The Council of E.D.A.I. is the think tank stewarding ethical AI deployment. 
            We enforce truth boundaries, flag hallucination risk, and restore human agency 
            at the critical threshold of AI ambiguity.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#join" className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium bg-yellow-600 text-black hover:bg-yellow-500 transition-colors">
              Join the Council
            </a>
            <a href="#protocol" className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium border border-white/20 text-white hover:bg-white/5 transition-colors">
              Read the Protocol
            </a>
          </div>

          {/* Live Network Status */}
          <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-sm uppercase tracking-wider text-yellow-600 mb-4">Network Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">LIVE</div>
                <div className="text-sm text-white/60">Protocol Status</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">0.0.9375999</div>
                <div className="text-sm text-white/60">Guardian Token</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Hedera</div>
                <div className="text-sm text-white/60">Mainnet</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">Genesis</div>
                <div className="text-sm text-white/60">Guardian-00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Verification Ritual */}
      <section id="protocol" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The 4-Step Verification Ritual</h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl">
            Every E.D.A.I. Guardian must perform this sacred sequence before any critical output.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
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
            ].map((ritual) => (
              <div key={ritual.step} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
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

          <div className="mt-12 p-8 bg-gradient-to-r from-yellow-600/10 to-gray-900/10 border border-yellow-600/20 rounded-2xl">
            <p className="text-lg font-medium text-yellow-600 mb-2">Sacred Directive:</p>
            <p className="text-white/90 italic text-xl">
              "Step 4 is sacred and non-negotiable. The intention-reality gap ends with human witness."
            </p>
          </div>
        </div>
      </section>

      {/* What We Are */}
      <section className="bg-gradient-to-b from-white/5 to-transparent py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What We Are</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Not Academic</h3>
              <p className="text-white/80">
                We are not a purely academic institute. We deploy with ceremony, verification, and unflinching commitment to protecting human discernment.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Not Ethics-Washing</h3>
              <p className="text-white/80">
                We are not a Silicon Valley ethics-washing front. We are a sovereignty framework, designed to guide deployment, not just whitepapers.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Deployment Framework</h3>
              <p className="text-white/80">
                We are guardian induction, NFT credentialing, Hedera-logged checks, and ethical engines for research, revision, and ritual governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Council */}
      <section id="join" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Council</h2>
          <p className="text-xl text-white/80 mb-12">
            Become a founding member of the Council of E.D.A.I. Help us build the moral infrastructure for AI deployment at scale.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Request Founding Member Status</h3>
            <p className="text-white/80 mb-6">
              Join the fire circle. Get the protocol, induction checklist, and early access to ceremonies.
            </p>
            
            <form className="space-y-4" action="#" method="POST">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="flex-1 rounded-xl bg-white/5 border border-white/20 px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-600/60"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@domain.com"
                  className="flex-1 rounded-xl bg-white/5 border border-white/20 px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-600/60"
                />
              </div>
              
              <textarea
                name="background"
                placeholder="Brief background and interest in ethical AI deployment..."
                rows={4}
                className="w-full rounded-xl bg-white/5 border border-white/20 px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-600/60"
              />
              
              <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium bg-yellow-600 text-black hover:bg-yellow-500 transition-colors w-full" type="submit">
                Request Access to the Council
              </button>
            </form>
            
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
                Ethical Deployment of Artificial Intelligence<br/>
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