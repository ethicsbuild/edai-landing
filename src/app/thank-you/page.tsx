import Link from "next/link";

export const metadata = {
  title: "Your Name Is In: E.D.A.I.",
  description:
    "Your note reached Gage Cass Woodle. The Council of E.D.A.I. is still being formed.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-edai-gold">Your name is in</span>
      </h1>
      <p className="text-xl md:text-2xl text-white/80 max-w-2xl text-center mb-10 leading-relaxed">
        Thank you. The Council of E.D.A.I. is still being formed. Your note went to a
        private list that only I read, not to any public ledger. I will write back to
        you myself, and it may take some time.
      </p>
      <p className="text-lg text-white/60 max-w-2xl text-center mb-10">Gage Cass Woodle</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-medium bg-yellow-600 text-black hover:bg-yellow-500 transition-colors"
      >
        Return home
      </Link>
    </main>
  );
}
