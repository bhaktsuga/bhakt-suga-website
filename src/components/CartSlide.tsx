"use client";
import { useCart } from "./CartProvider";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartSlide() {
  const { items, open, setOpen, remove, updateQty, total, count, clear } = useCart();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] max-w-full bg-parchment shadow-2xl border-l border-ivory/60 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Cart"
      >
        <div className="flex items-center justify-between px-7 py-6 border-b border-ivory/60">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-ink">Your Cart</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-2 rounded-full hover:bg-cream transition-colors text-ink">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-cream flex items-center justify-center text-stone-light">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
              </div>
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-xl text-ink">Your bag is empty</p>
                <p className="text-sm text-stone mt-1">Discover fragrances that speak to you.</p>
              </div>
              <button onClick={() => setOpen(false)} className="mt-4 px-6 py-2.5 rounded-full bg-ink text-parchment text-sm font-medium hover:bg-navy transition-colors">Continue Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <Link href={`/product/${item.id}`} onClick={() => setOpen(false)} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-cream ring-1 ring-ivory/50 shadow-sm hover:ring-gold/50 transition-all">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/product/${item.id}`} onClick={() => setOpen(false)} className="block">
                      <h3 className="font-[family-name:var(--font-cormorant)] text-lg leading-snug text-ink hover:text-gold-dark transition-colors">{item.name}</h3>
                      <p className="text-xs text-stone uppercase tracking-wider mt-0.5">{item.brand} · {item.size}</p>
                    </Link>
                    <button onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} className="shrink-0 p-1.5 rounded-full hover:bg-rose-soft text-stone hover:text-rose-blush transition-colors">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-cream rounded-full px-1.5 py-0.5 shadow-inner ring-1 ring-ivory/60">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity" className="p-1 rounded-full hover:bg-white hover:shadow transition"><Minus size={13} strokeWidth={2} /></button>
                      <span className="text-sm font-medium w-4 text-center tabular-nums">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity" className="p-1 rounded-full hover:bg-white hover:shadow transition"><Plus size={13} strokeWidth={2} /></button>
                    </div>
                    <span className="font-[family-name:var(--font-playfair)] text-base text-ink">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-7 py-6 border-t border-ivory/60 bg-cream/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-stone">Subtotal</span>
              <span className="font-[family-name:var(--font-playfair)] text-xl text-ink">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <p className="text-xs text-stone mb-5">Taxes and shipping calculated at checkout.</p>
            <Link href="/checkout" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-ink text-parchment font-medium hover:bg-navy transition-colors shadow-lg shadow-ink/10">
              Checkout <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
            <button onClick={clear} className="w-full text-center text-xs text-stone hover:text-ink mt-3 underline underline-offset-4">Clear cart</button>
          </div>
        )}
      </aside>
    </>
  );
}
