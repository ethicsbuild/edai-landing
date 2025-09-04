export const metadata = {
  title: "Your Oath Is Sealed — E.D.A.I.",
  description:
    "Your vow has been recorded in the ledger of E.D.A.I. Guardians will soon reach out.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-edai-gold">Your Oath is Sealed</span>
      </h1>
      <p className="text-xl md:text-2xl text-white/80 max-w-2xl text-center mb-10 leading-relaxed">
        Thank you for pledging to uphold the tenets of ethical AI. Your vow has been
        etched into the Council’s ledger. The Guardians will review your oath and
        guide you through your induction. Until then, carry the flame of integrity
        into all your works.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium bg-yellow-600 text-black hover:bg-yellow-500 transition-colors"
      >
        Return to the Forge
      </a>
    </main>
  );
}
