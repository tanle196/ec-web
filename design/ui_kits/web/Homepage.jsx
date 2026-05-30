// Marlo — Homepage

const Hero = ({ variant = 'editorial' }) => {
  if (variant === 'products') {
    return (
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 64px 0' }}>
        <div style={{
          background: '#F6F1E8',
          borderRadius: 24,
          padding: '64px 56px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
          border: '1px solid #E6DFD4',
        }}>
          <div>
            <Badge kind="persimmon">Limited drop · Mar 18</Badge>
            <h1 className="h1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 72, lineHeight: 0.98, fontWeight: 700, letterSpacing: '-0.03em', margin: '20px 0 16px', color: '#141210' }}>
              New phone day.<br/>
              <span style={{ color: '#FF5B2E' }}>Save up to $400.</span>
            </h1>
            <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 18, lineHeight: 1.5, color: '#5C5853', maxWidth: 440, margin: '0 0 28px' }}>
              Trade in your old device, get same-day credit, and shop the new Halo Pro 14. Free shipping, free returns.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button kind="primary" size="lg">Shop phones</Button>
              <Button kind="ghost" size="lg" iconRight="arrowRight">Estimate trade-in</Button>
            </div>
          </div>
          <div style={{ position: 'relative', height: 460 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'url(../../assets/hero-products.svg) center/contain no-repeat' }} />
          </div>
        </div>
      </section>
    );
  }
  // Editorial variant — full-bleed, dark, big quote
  return (
    <section style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 64px 0' }}>
      <div style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        height: 540,
        background: '#141210',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(../../assets/hero-editorial.svg) center/cover no-repeat' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(20,18,16,0.65) 0%, rgba(20,18,16,0.2) 60%, rgba(20,18,16,0) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: 720 }}>
          <Badge kind="gold">★ The Spring Edit</Badge>
          <div>
            <h1 className="h1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 80, lineHeight: 0.96, fontWeight: 700, letterSpacing: '-0.035em', color: '#F6F1E8', margin: '0 0 20px' }}>
              Everything,<br/>and nothing<br/>extra.
            </h1>
            <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 18, lineHeight: 1.5, color: '#C9C2B5', maxWidth: 420, margin: '0 0 28px' }}>
              4,200 sellers. One marketplace. Real reviews, real photos, real ship times. No theater.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button kind="primary" size="lg">Shop the edit</Button>
              <Button size="lg" style={{ background: 'transparent', color: '#F6F1E8', border: '1px solid rgba(246,241,232,0.3)' }}>Browse all categories</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryStrip = ({ onSelect }) => (
  <section style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 64px 0' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14 }}>
      {CATEGORIES.map(c => (
        <a key={c.id} href="#" onClick={(e) => { e.preventDefault(); onSelect && onSelect(c.id); }} style={{
          background: 'white', border: '1px solid #E6DFD4', borderRadius: 16, padding: 16,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          textDecoration: 'none', color: 'inherit', transition: 'all 150ms cubic-bezier(.2,.8,.2,1)',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(20,18,16,0.04), 0 1px 3px rgba(20,18,16,0.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <img src={c.img} alt="" style={{ width: 56, height: 56 }} />
          <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: '#141210' }}>{c.name}</span>
        </a>
      ))}
    </div>
  </section>
);

const SectionHeader = ({ eyebrow, title, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
    <div>
      {eyebrow && <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5853', marginBottom: 8 }}>{eyebrow}</div>}
      <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.02em', color: '#141210', margin: 0 }}>{title}</h2>
    </div>
    {action && (
      <a href="#" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#141210', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
        {action} <Icon name="arrowRight" size={14} />
      </a>
    )}
  </div>
);

const ProductRow = ({ products, onSelect, eyebrow, title, action }) => (
  <section style={{ maxWidth: 1440, margin: '0 auto', padding: '64px 64px 0' }}>
    <SectionHeader eyebrow={eyebrow} title={title} action={action} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
      {products.slice(0, 5).map(p => (
        <ProductCard key={p.id} product={p} onClick={onSelect} />
      ))}
    </div>
  </section>
);

const EditorialPair = () => (
  <section style={{ maxWidth: 1440, margin: '0 auto', padding: '72px 64px 0' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden', height: 360, background: '#3A4A3A',
        padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#F6F1E8'
      }}>
        <div style={{ position: 'absolute', right: -40, bottom: -40, width: 320, height: 320, background: 'url(../../assets/placeholders/bottle.svg) center/contain no-repeat', opacity: 0.9 }} />
        <Badge kind="gold">New collection</Badge>
        <div>
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 40, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Slow goods, fast ship.</h3>
          <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, lineHeight: 1.5, color: '#C9C2B5', maxWidth: 360, margin: '0 0 20px' }}>Hand-built home pieces from independent makers. Two-day delivery anyway.</p>
          <Button size="md" style={{ background: '#F6F1E8', color: '#141210' }}>Browse home</Button>
        </div>
      </div>
      <div style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden', height: 360, background: '#FF5B2E',
        padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white'
      }}>
        <div style={{ position: 'absolute', right: -20, bottom: -40, width: 320, height: 320, background: 'url(../../assets/placeholders/headphones.svg) center/contain no-repeat', opacity: 0.95 }} />
        <Badge style={{}}>Today only</Badge>
        <div>
          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 40, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Audio, 20%&nbsp;off.</h3>
          <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', maxWidth: 360, margin: '0 0 20px' }}>Over-ears, true-wireless, speakers — one day, one price drop.</p>
          <Button size="md" style={{ background: '#141210', color: 'white' }}>Shop the sale</Button>
        </div>
      </div>
    </div>
  </section>
);

const TrustStrip = () => (
  <section style={{ maxWidth: 1440, margin: '72px auto 0', padding: '40px 64px', borderTop: '1px solid #E6DFD4', borderBottom: '1px solid #E6DFD4' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      {[
        ['truck', 'Free shipping', 'On orders over $35'],
        ['rotateCcw', 'Free returns', '30 days, no questions'],
        ['shield', 'Buyer protection', 'Money-back guarantee'],
        ['package', 'Real ship times', 'No fake delivery dates'],
      ].map(([icon, t, d]) => (
        <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 999, background: '#FFE7DD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C73A12', flex: 'none' }}>
            <Icon name={icon} size={18} stroke={2} />
          </div>
          <div>
            <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: '#141210' }}>{t}</div>
            <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Homepage = ({ onNavigate, heroVariant }) => (
  <div>
    <Hero variant={heroVariant} />
    <CategoryStrip onSelect={() => onNavigate('listing')} />
    <ProductRow products={PRODUCTS} onSelect={() => onNavigate('detail')} eyebrow="Today\u2019s deals · ends in 4h 12m" title="Save big in electronics" action="See all deals" />
    <EditorialPair />
    <ProductRow products={[...PRODUCTS].reverse()} onSelect={() => onNavigate('detail')} eyebrow="Picked for you" title="Because you saved a phone case" action="See more for you" />
    <TrustStrip />
    <div style={{ height: 80 }} />
  </div>
);

Object.assign(window, { Homepage, Hero, CategoryStrip, ProductRow, SectionHeader, EditorialPair, TrustStrip });
