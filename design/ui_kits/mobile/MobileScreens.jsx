// Marlo — Mobile screens. Used inside IOSDevice frames.

// Helper: section with horizontal padding
const M_PAD = 16;

const MobileHeader = ({ title, cart = 3, back }) => (
  <div style={{
    position: 'sticky', top: 0, zIndex: 5,
    background: 'rgba(246, 241, 232, 0.92)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    paddingTop: 50, paddingLeft: M_PAD, paddingRight: M_PAD, paddingBottom: 10,
    display: 'flex', alignItems: 'center', gap: 10,
    borderBottom: '1px solid #E6DFD4',
  }}>
    {back ? (
      <button onClick={back} style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: '#141210' }}>
        <Icon name="chevronLeft" size={22}/>
      </button>
    ) : (
      <img src="../../assets/marlo-logo.svg" alt="marlo" style={{ height: 22 }}/>
    )}
    {title && <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: '#141210', flex: 1, textAlign: 'center', marginRight: 60 }}>{title}</span>}
    {!title && <div style={{ flex: 1 }}/>}
    <button style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: '#141210', position: 'relative' }}>
      <Icon name="heart" size={22}/>
    </button>
    <button style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: '#141210', position: 'relative' }}>
      <Icon name="cart" size={22}/>
      {cart > 0 && (
        <span style={{ position: 'absolute', top: 0, right: 0, background: '#FF5B2E', color: 'white', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{cart}</span>
      )}
    </button>
  </div>
);

const MobileTabBar = ({ active = 'home' }) => {
  const tabs = [
    ['home', 'home', 'Home'],
    ['filter', 'filter', 'Browse'],
    ['heart', 'heart', 'Saved'],
    ['cart', 'cart', 'Cart'],
    ['user', 'user', 'You'],
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 24, paddingTop: 8,
      background: 'rgba(246, 241, 232, 0.95)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #E6DFD4',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(([id, icn, label]) => (
        <button key={id} style={{
          background: 'transparent', border: 0, padding: '4px 14px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          cursor: 'pointer', color: active === id ? '#141210' : '#8A857E',
          fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 10, fontWeight: 600,
        }}>
          <Icon name={icn} size={22} stroke={active === id ? 2 : 1.5}/>
          {label}
        </button>
      ))}
    </div>
  );
};

// ── Screen 1: Home ───────────────────────────────────────────
const MobileHome = () => (
  <div style={{ background: '#F6F1E8', minHeight: '100%', paddingBottom: 100 }}>
    <MobileHeader cart={2}/>
    {/* Search */}
    <div style={{ padding: '14px ' + M_PAD + 'px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1px solid #E6DFD4', borderRadius: 999, padding: '10px 16px' }}>
        <Icon name="search" size={18} color="#8A857E"/>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#8A857E' }}>Search phones, laptops…</span>
      </div>
    </div>

    {/* Hero card */}
    <div style={{ margin: '4px ' + M_PAD + 'px 16px', borderRadius: 20, overflow: 'hidden', background: '#141210', height: 220, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'url(../../assets/hero-editorial.svg) center/cover no-repeat' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,18,16,0.7) 0%, rgba(20,18,16,0.1) 70%)' }}/>
      <div style={{ position: 'relative', padding: 20, color: 'white', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignSelf: 'flex-start', background: '#FFD83D', color: '#141210', padding: '4px 10px', borderRadius: 999, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 700 }}>★ Spring edit</span>
        <div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, lineHeight: 0.98, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 10px', maxWidth: 220 }}>Everything, nothing extra.</h2>
          <button style={{ background: '#FF5B2E', color: 'white', border: 0, padding: '10px 18px', borderRadius: 999, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Shop the edit</button>
        </div>
      </div>
    </div>

    {/* Categories */}
    <div style={{ padding: '0 ' + M_PAD + 'px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {CATEGORIES.slice(0, 8).map(c => (
          <div key={c.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 56, height: 56, background: 'white', borderRadius: 14, border: '1px solid #E6DFD4', padding: 6 }}>
              <img src={c.img} alt="" style={{ width: '100%', height: '100%' }}/>
            </div>
            <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 500, color: '#141210' }}>{c.name}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Deals row */}
    <div style={{ marginTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 ' + M_PAD + 'px', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5853' }}>Ends in 4h 12m</div>
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Today's deals</h3>
        </div>
        <a href="#" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: '#141210', textDecoration: 'none' }}>See all →</a>
      </div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 ' + M_PAD + 'px 4px', scrollbarWidth: 'none' }}>
        {PRODUCTS.slice(0, 6).map(p => (
          <div key={p.id} style={{ width: 156, flex: 'none', background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, padding: 6, position: 'relative' }}>
            {p.was && <span style={{ position: 'absolute', top: 12, left: 12, background: '#FFE7DD', color: '#C73A12', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 999 }}>−{Math.round((1 - p.price / p.was) * 100)}%</span>}
            <div style={{ width: '100%', aspectRatio: '1', background: '#F6F1E8', borderRadius: 8, overflow: 'hidden' }}>
              <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
            </div>
            <div style={{ padding: '8px 4px 4px' }}>
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: '#141210', lineHeight: 1.2, marginBottom: 4, height: 28, overflow: 'hidden' }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: '#141210' }}>${p.price}</span>
                {p.was && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8A857E', textDecoration: 'line-through' }}>${p.was}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Picked for you */}
    <div style={{ marginTop: 28, padding: '0 ' + M_PAD + 'px' }}>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Picked for you</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {PRODUCTS.slice(2, 6).map(p => (
          <div key={p.id} style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, padding: 6 }}>
            <div style={{ width: '100%', aspectRatio: '1', background: '#F6F1E8', borderRadius: 8, overflow: 'hidden' }}>
              <img src={p.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
            </div>
            <div style={{ padding: '8px 4px 4px' }}>
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: '#141210', lineHeight: 1.2, marginBottom: 6 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 500, color: '#141210' }}>${p.price}</span>
                <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, color: '#5C5853' }}>★ {p.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <MobileTabBar active="home"/>
  </div>
);

// ── Screen 2: Product detail ─────────────────────────────────
const MobileDetail = () => (
  <div style={{ background: '#F6F1E8', minHeight: '100%' }}>
    <MobileHeader title="Halo Pro 14" back={() => {}} cart={2}/>
    <div style={{ background: '#F6F1E8', height: 360, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src="../../assets/placeholders/phone-orange.svg" alt="" style={{ width: '70%', height: '100%', objectFit: 'contain' }}/>
      <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6 }}>
        <span style={{ background: '#141210', color: 'white', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', padding: '4px 7px', borderRadius: 4 }}>NEW</span>
        <span style={{ background: '#FFE7DD', color: '#C73A12', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 999 }}>−19%</span>
      </div>
      {/* dots */}
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {[0, 1, 2, 3].map(i => (
          <span key={i} style={{ width: i === 0 ? 18 : 6, height: 6, borderRadius: 999, background: i === 0 ? '#141210' : 'rgba(20,18,16,0.25)' }}/>
        ))}
      </div>
    </div>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: 20, marginTop: -16, position: 'relative', paddingBottom: 140 }}>
      <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5853', marginBottom: 6 }}>Bayside Mobile</div>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 8px', color: '#141210' }}>Halo Pro 14 — Unlocked, 5G</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#5C5853' }}>
        <Icon name="star" size={12} color="#141210" style={{ fill: '#141210' }}/>
        <span style={{ color: '#141210', fontWeight: 600 }}>4.6</span>
        <span>· 2,341 reviews</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 30, fontWeight: 500, color: '#141210', letterSpacing: '-0.5px' }}>$649</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: '#8A857E', textDecoration: 'line-through' }}>$799</span>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#5C5853', marginBottom: 8 }}>Color · Persimmon</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ c: '#FF5B2E', active: true }, { c: '#141210' }, { c: '#3A4A3A' }, { c: '#F6F1E8' }].map((s, i) => (
            <span key={i} style={{
              width: 30, height: 30, borderRadius: 999, background: s.c,
              border: '2px solid #fff',
              outline: s.active ? '2px solid #141210' : '1px solid #D4CCBE',
              outlineOffset: s.active ? 2 : 0,
            }}/>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#5C5853', marginBottom: 8 }}>Storage · 256 GB</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['128 GB', '256 GB', '512 GB'].map((s, i) => (
            <button key={s} style={{
              flex: 1, padding: '10px 0', borderRadius: 8,
              background: i === 1 ? '#141210' : 'white',
              color: i === 1 ? 'white' : '#141210',
              border: '1px solid ' + (i === 1 ? '#141210' : '#E6DFD4'),
              fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ background: '#F6F1E8', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#141210' }}>
          <Icon name="truck" size={16}/>
          <span><strong>Free shipping</strong> · arrives <strong>Tue, Mar 18</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#141210' }}>
          <Icon name="rotateCcw" size={16}/>
          <span><strong>Free 30-day returns</strong> · no restocking fee</span>
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: '#141210', margin: '0 0 8px' }}>About this item</h3>
        <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, lineHeight: 1.6, color: '#5C5853', margin: 0 }}>
          6.1" OLED, H14 chip, triple camera. Unlocked for any US carrier. Includes USB-C cable and 12-month seller warranty.
        </p>
      </div>
    </div>

    {/* Bottom action bar */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 30, paddingTop: 12, paddingLeft: 16, paddingRight: 16,
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #E6DFD4', display: 'flex', gap: 8, alignItems: 'center',
    }}>
      <button style={{ width: 44, height: 44, borderRadius: 999, background: 'white', border: '1px solid #E6DFD4', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <Icon name="heart" size={20}/>
      </button>
      <button style={{ flex: 1, padding: '14px 0', borderRadius: 999, background: '#FF5B2E', color: 'white', border: 0, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>
        Add to cart · $649
      </button>
    </div>
  </div>
);

// ── Screen 3: Cart ───────────────────────────────────────────
const MobileCart = () => (
  <div style={{ background: '#F6F1E8', minHeight: '100%', paddingBottom: 180 }}>
    <MobileHeader title="Your cart" back={() => {}} cart={2}/>
    <div style={{ padding: '14px ' + M_PAD + 'px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ background: '#1F4D3C', color: '#F6F1E8', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', padding: '4px 7px', borderRadius: 999 }}>VERIFIED</span>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: '#141210' }}>Bayside Mobile</span>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, color: '#5C5853' }}>· Mar 18</span>
      </div>
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E6DFD4', overflow: 'hidden' }}>
        {[
          { name: 'Halo Pro 14 — Unlocked', variant: 'Persimmon · 256 GB', price: 649, was: 799, qty: 1, img: '../../assets/placeholders/phone-orange.svg' },
          { name: 'Overhead 3 wireless', variant: 'Onyx', price: 229, qty: 1, img: '../../assets/placeholders/headphones.svg' },
        ].map((i, ix) => (
          <div key={ix} style={{ padding: 12, display: 'flex', gap: 12, borderBottom: ix === 0 ? '1px solid #E6DFD4' : '0' }}>
            <div style={{ width: 72, height: 72, background: '#F6F1E8', borderRadius: 10, padding: 6, flex: 'none' }}>
              <img src={i.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#141210', lineHeight: 1.2 }}>{i.name}</div>
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#5C5853', marginTop: 2 }}>{i.variant}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 500, color: '#141210' }}>${i.price}</span>
                {i.was && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8A857E', textDecoration: 'line-through' }}>${i.was}</span>}
              </div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#F6F1E8', borderRadius: 999, padding: 2, alignSelf: 'flex-end' }}>
              <button style={{ width: 28, height: 28, borderRadius: 999, border: 0, background: 'transparent' }}><Icon name="minus" size={14}/></button>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, padding: '0 10px' }}>{i.qty}</span>
              <button style={{ width: 28, height: 28, borderRadius: 999, border: 0, background: 'transparent' }}><Icon name="plus" size={14}/></button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: 'white', borderRadius: 14, border: '1px solid #E6DFD4', padding: 16 }}>
        <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#141210', margin: '0 0 12px' }}>Order summary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#5C5853' }}>Subtotal</span><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>$878</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#5C5853' }}>Discounts</span><span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#C73A12' }}>−$150</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#5C5853' }}>Shipping</span><span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#15643F' }}>Free</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#5C5853' }}>Tax</span><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>$77</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #E6DFD4', marginTop: 4 }}>
            <span style={{ fontWeight: 600, color: '#141210' }}>Total</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 500, color: '#141210' }}>$955</span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom checkout */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 30, paddingTop: 12, paddingLeft: 16, paddingRight: 16,
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #E6DFD4',
    }}>
      <button style={{ width: '100%', padding: '14px 0', borderRadius: 999, background: '#FF5B2E', color: 'white', border: 0, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>
        Checkout · $955
      </button>
    </div>
  </div>
);

// ── Screen 4: Account ────────────────────────────────────────
const MobileAccount = () => (
  <div style={{ background: '#F6F1E8', minHeight: '100%', paddingBottom: 100 }}>
    <MobileHeader title="You" cart={2}/>
    <div style={{ padding: '14px ' + M_PAD + 'px' }}>
      <div style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: '#FF5B2E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 600 }}>K</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#141210' }}>Kira Lee</div>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#5C5853' }}>Marlo member since 2024</div>
        </div>
        <Icon name="chevronRight" size={18} color="#8A857E"/>
      </div>

      <div style={{ marginTop: 16, background: 'white', border: '1px solid #E6DFD4', borderRadius: 14, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#141210', margin: 0 }}>Recent orders</h3>
          <a style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: '#141210', textDecoration: 'none' }}>See all →</a>
        </div>
        {[
          { id: 'M-58291', when: 'Mar 14', status: 'On the way', statusBg: '#E0EBFB', statusColor: '#1F4FA0', img: '../../assets/placeholders/phone-orange.svg', items: 1, total: 649 },
          { id: 'M-58102', when: 'Mar 6', status: 'Delivered', statusBg: '#E0F2EA', statusColor: '#15643F', img: '../../assets/placeholders/headphones.svg', items: 2, total: 267 },
        ].map(o => (
          <div key={o.id} style={{ display: 'flex', gap: 10, padding: '12px 0', borderTop: '1px solid #EFE8DB' }}>
            <div style={{ width: 48, height: 48, background: '#F6F1E8', borderRadius: 8, padding: 4, flex: 'none' }}>
              <img src={o.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ background: o.statusBg, color: o.statusColor, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 999 }}>{o.status}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#5C5853' }}>{o.id}</span>
              </div>
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#141210', marginTop: 4 }}>{o.items} {o.items === 1 ? 'item' : 'items'} · <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>${o.total}</span></div>
            </div>
            <Icon name="chevronRight" size={16} color="#8A857E" style={{ alignSelf: 'center' }}/>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: 'white', border: '1px solid #E6DFD4', borderRadius: 14, overflow: 'hidden' }}>
        {[
          ['heart', 'Saved items', '14'],
          ['pin', 'Addresses', '2'],
          ['creditCard', 'Payment methods', '2'],
          ['truck', 'Marlo Prime', 'Renew'],
          ['sliders', 'Notifications', null],
          ['shield', 'Privacy & data', null],
        ].map(([icn, label, meta], i, arr) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid #EFE8DB' : '0' }}>
            <Icon name={icn} size={20}/>
            <span style={{ flex: 1, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210' }}>{label}</span>
            {meta && <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>{meta}</span>}
            <Icon name="chevronRight" size={16} color="#8A857E"/>
          </div>
        ))}
      </div>
    </div>
    <MobileTabBar active="user"/>
  </div>
);

Object.assign(window, { MobileHome, MobileDetail, MobileCart, MobileAccount, MobileHeader, MobileTabBar });
