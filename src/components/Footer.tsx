import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f0d14] text-parchment border-t border-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-16">
          
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative h-11 w-12 rounded-full overflow-hidden border border-gold/40 bg-black">
                <img src="/images/logo.png" alt="Bhakt Suga Logo" className="w-full h-full object-cover" />
              </div>
              <div className="leading-none">
                <span className="block font-[family-name:var(--font-playfair)] text-lg font-bold tracking-widest text-white uppercase">BHAKT SUGA</span>
                <span className="block text-[8px] uppercase tracking-[0.25em] text-gold-soft mt-1">Divine Fragrance</span>
              </div>
            </Link>
            <p className="text-parchment/65 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              BHAKT SUGA is a premium Indian fragrance brand. Inspired by devotion, purity, and ancient spiritual heritage, we create 100% alcohol-free, highly concentrated and long-lasting attar oils.
            </p>
            <p className="font-[family-name:var(--font-cormorant)] text-gold-soft text-base italic tracking-wider font-semibold pt-1">
              ॥ भक्ति की सुगंध, मर्यादा की पहचान ॥
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold-soft font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs text-parchment/70">
              <li><Link href="/" className="hover:text-gold-soft hover:underline underline-offset-4 transition">Home</Link></li>
              <li><Link href="/shop" className="hover:text-gold-soft hover:underline underline-offset-4 transition">Our Shop</Link></li>
              <li><Link href="/#about" className="hover:text-gold-soft hover:underline underline-offset-4 transition">About Brand</Link></li>
              <li><Link href="/#reviews" className="hover:text-gold-soft hover:underline underline-offset-4 transition">Customer Reviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold-soft font-bold mb-4">Delivery & Payment</h4>
            <p className="text-xs text-parchment/70 leading-relaxed font-light mb-3">
              We offer free courier shipping across India. Payments are processed securely via UPI only (QR Scan / UPI ID). Cash on Delivery is currently unavailable.
            </p>
            <span className="inline-block px-2.5 py-1 bg-gold/10 border border-gold/30 rounded-md text-[9px] uppercase tracking-widest text-gold-soft font-bold">
              🇮🇳 Pan-India Courier
            </span>
          </div>

        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-widest text-parchment/40">
          <span>© 2026 BHAKT SUGA. All rights reserved.</span>
          <span className="font-semibold text-gold-soft">Made with absolute devotion in India</span>
        </div>
      </div>
    </footer>
  );
}
