"use client";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ArrowLeft, Check, Lock, ShieldAlert, Sparkles, QrCode, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    utr: "",
  });

  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("bhaktsuga@upi");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (items.length === 0 && !submitted) {
    return (
      <main className="min-h-screen bg-parchment flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md bg-white rounded-3xl p-10 border border-ivory/80 shadow-2xl shadow-ink/[0.03]">
          <div className="h-16 w-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-6 text-gold-dark border border-gold/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-ink mb-3">Your Cart is Empty</h1>
          <p className="text-stone text-sm mb-8 leading-relaxed">Add the divine SHREE RAM fragrance to your collection to proceed with secure checkout.</p>
          <Link href="/shop" className="inline-block w-full py-3.5 rounded-full bg-ink text-parchment font-semibold hover:bg-navy transition-colors tracking-widest uppercase text-xs shadow-lg shadow-ink/10">Browse Fragrances</Link>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-parchment flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-xl bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-ink/10 border border-gold/30 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-gold via-gold-soft to-gold-dark" />
          <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
            <Check size={28} strokeWidth={2.5} />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark font-bold mb-2">Jai Shree Ram</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-ink mb-4">Order Received!</h1>
          <p className="text-ink/80 text-base mb-6 leading-relaxed">
            Your payment reference of <span className="font-semibold text-ink">UTR: {form.utr}</span> has been logged. 
            Our temple fragrance team is manually verifying the UPI transaction.
          </p>

          <div className="bg-cream rounded-2xl p-6 text-left border border-ivory/60 mb-8 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-stone">Order Number:</span><span className="font-semibold text-ink font-[family-name:var(--font-playfair)]">#BS-{orderId || "1002"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-stone">Customer Name:</span><span className="font-semibold text-ink">{form.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-stone">Shipping Address:</span><span className="font-semibold text-ink text-right max-w-[240px] truncate">{form.address}, {form.city} - {form.zip}</span></div>
            <div className="flex justify-between text-sm"><span className="text-stone">Total Amount:</span><span className="font-semibold text-gold-dark">₹{total.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-sm"><span className="text-stone">Payment Method:</span><span className="font-semibold text-emerald-600 uppercase tracking-widest text-xs">UPI (Pending Manual Verification)</span></div>
          </div>

          <p className="text-xs text-stone mb-8 leading-relaxed">A confirmation updates will be sent to your phone <span className="font-medium text-ink">{form.phone}</span> and email <span className="font-medium text-ink">{form.email}</span>. Thank you for scanning devotion.</p>
          <Link href="/" className="inline-block px-10 py-4 rounded-full bg-ink text-parchment text-xs font-semibold tracking-widest uppercase hover:bg-navy transition-all shadow-xl shadow-ink/10">Return to Home</Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          shippingAddress: form.address,
          city: form.city,
          zip: form.zip,
          items,
          totalAmount: total,
          paymentUtr: form.utr,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setOrderId(data.orderId);
      setSubmitted(true);
      clear();
    } catch (err: any) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-stone hover:text-ink mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl lg:text-5xl text-ink font-bold mb-3 tracking-tight">Complete Your Order</h1>
          <p className="text-stone text-sm leading-relaxed">Experience BHAKT SUGA - Shree Ram Perfume (20 ML) delivered straight to your home.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-ink/[0.02] border border-ivory/60 space-y-8">
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-6 w-6 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center font-bold text-xs">1</span>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-ink font-semibold">Shipping Information</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] uppercase tracking-wider text-stone font-bold mb-1.5">Full Name</label>
                    <input required id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl bg-parchment/50 border border-ivory px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow" placeholder="E.g., Ananya Sharma" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-wider text-stone font-bold mb-1.5">Email Address</label>
                    <input required type="email" id="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl bg-parchment/50 border border-ivory px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow" placeholder="ananya@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider text-stone font-bold mb-1.5">Phone (WhatsApp updates)</label>
                    <input required id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl bg-parchment/50 border border-ivory px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-[10px] uppercase tracking-wider text-stone font-bold mb-1.5">Pincode (6-digit)</label>
                    <input required id="zip" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className="w-full rounded-xl bg-parchment/50 border border-ivory px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow" placeholder="400001" />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="address" className="block text-[10px] uppercase tracking-wider text-stone font-bold mb-1.5">Full Delivery Address</label>
                  <textarea required id="address" rows={3} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl bg-parchment/50 border border-ivory px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow resize-none" placeholder="Flat/House no., Floor, building name, colony/street name..." />
                </div>

                <div className="mt-5 sm:w-1/2">
                  <label htmlFor="city" className="block text-[10px] uppercase tracking-wider text-stone font-bold mb-1.5">City</label>
                  <input required id="city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full rounded-xl bg-parchment/50 border border-ivory px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow" placeholder="Mumbai" />
                </div>
              </div>

              <div className="border-t border-ivory/60 pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-6 w-6 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center font-bold text-xs">2</span>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-ink font-semibold">UPI Payment Only</h2>
                </div>

                <div className="bg-[#fffdf9] border-2 border-dashed border-gold/40 rounded-2xl p-5 mb-6 text-center space-y-5">
                  <p className="text-xs font-bold text-amber-950 uppercase tracking-widest bg-amber-500/10 py-1.5 px-3 rounded-full inline-block">Scan to Pay via any UPI App</p>
                  
                  <div className="relative mx-auto w-48 h-48 rounded-xl overflow-hidden shadow-md border border-ivory bg-white p-2">
                    <img src="/images/qr_code.png" alt="UPI Scan to Pay QR Code" className="w-full h-full object-contain" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-stone">UPI ID: <span className="font-bold text-ink bg-cream/70 px-2.5 py-1 rounded-md text-sm border border-ivory inline-flex items-center gap-1.5">bhaktsuga@upi <button type="button" onClick={handleCopyUPI} className="text-gold-dark hover:text-ink transition-colors" title="Copy UPI ID">{copied ? <span className="text-[10px] text-emerald-600 font-bold">Copied!</span> : <ClipboardCheck size={14} />}</button></span></p>
                    <p className="text-[11px] text-amber-950/80 max-w-sm mx-auto leading-relaxed font-light">GPay, PhonePe, Paytm, BHIM, or any banking app accepted. Please pay exactly <span className="font-bold text-ink">₹{total.toLocaleString("en-IN")}</span>.</p>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex gap-3 text-rose-950 mb-6">
                  <ShieldAlert className="text-rose-600 shrink-0" size={18} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">COD is NOT available</h4>
                    <p className="text-[11px] text-rose-950/80 mt-0.5 leading-relaxed">As our premium Shree Ram fragrances are prepared and packaged with utmost purity and custom devotion boxes, we only process orders paid via UPI.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="utr" className="block text-[10px] uppercase tracking-wider text-stone font-bold mb-1.5">Enter 12-Digit UPI Ref. No. / UTR / Transaction ID</label>
                  <input required id="utr" pattern="^[0-9a-zA-Z]{12}$" value={form.utr} onChange={e => setForm({ ...form, utr: e.target.value })} className="w-full rounded-xl bg-parchment/50 border border-ivory px-4 py-3 text-sm text-ink font-mono focus:outline-none focus:ring-2 focus:ring-gold/30 uppercase tracking-widest transition-shadow placeholder:tracking-normal placeholder:font-sans" placeholder="E.g., 619283748291" maxLength={12} />
                  <p className="text-[10px] text-stone">You can find this 12-digit number in your UPI app transaction receipt.</p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold leading-relaxed">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-4 rounded-full bg-ink text-parchment font-bold hover:bg-navy disabled:bg-stone/50 transition-all shadow-xl shadow-ink/10 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest text-xs">
                {loading ? "Processing..." : `Confirm Order — ₹${total.toLocaleString("en-IN")}`}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] uppercase tracking-widest text-stone-light font-semibold"><Lock size={12} /> 256-Bit SSL Encrypted Connection</div>
            </form>
          </div>

          {/* Side Panel Order Summary */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-ink/[0.02] border border-ivory/60">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-ink font-semibold mb-6">Your Basket</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="shrink-0 w-16 h-16 rounded-2xl overflow-hidden bg-cream border border-ivory/50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-ink truncate text-sm">{item.name}</div>
                      <div className="text-xs text-stone-light uppercase tracking-wider mt-0.5">{item.size} · Qty {item.qty}</div>
                    </div>
                    <div className="font-[family-name:var(--font-playfair)] text-ink font-bold text-base">₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-ivory/60 pt-5 space-y-3.5 text-sm">
                <div className="flex justify-between text-stone-light"><span>Basket Subtotal</span><span className="font-semibold text-ink">₹{total.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between text-stone-light"><span>Express Delivery</span><span className="font-semibold text-emerald-600 uppercase tracking-widest text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">FREE</span></div>
                <div className="flex justify-between text-ink font-bold text-lg pt-4 border-t border-ivory/60 font-[family-name:var(--font-playfair)]"><span>Order Total</span><span className="text-gold-dark">₹{total.toLocaleString("en-IN")}</span></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#100d16] to-[#1c1824] rounded-3xl p-6 text-parchment border border-gold/30 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
                <img src="/logo.png" alt="" className="w-48 h-48 object-contain" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-bold mb-1">Authentic Guarantee</p>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-3">Bhakt Suga Promise</h3>
              <p className="text-xs text-parchment/70 leading-relaxed font-light mb-4">Each batch of SHREE RAM PERFUME is prepared in sacred bronze vessels, utilizing age-old spiritual distillation procedures to guarantee pure, highly concentrated, and natural floral essential oils.</p>
              <ul className="space-y-2 text-[11px] text-gold-soft font-semibold">
                <li className="flex items-center gap-2">✓ 100% Alcohol-Free Formulations</li>
                <li className="flex items-center gap-2">✓ Over 24 Hours Scent Longevity</li>
                <li className="flex items-center gap-2">✓ Secure Courier Delivery with Tracking</li>
              </ul>
            </div>
          </aside>
          
        </div>
      </div>
    </main>
  );
}
