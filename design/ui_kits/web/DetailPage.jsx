// Marlo — Product Detail Page (PDP)

const Gallery = ({ images, badges }) => {
  const [active, setActive] = React.useState(0);
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 'none' }}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: 72, height: 72, borderRadius: 8, background: '#F6F1E8',
            border: active === i ? '2px solid #141210' : '1px solid #E6DFD4',
            padding: 6, cursor: 'pointer'
          }}>
            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, position: 'relative', background: '#F6F1E8', borderRadius: 16, aspectRatio: '1', padding: 32 }}>
        <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 8 }}>
          {badges}
        </div>
        <img src={images[active]} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
        <button style={{
          position: 'absolute', bottom: 20, right: 20, background: 'white', border: '1px solid #E6DFD4',
          borderRadius: 999, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
  );
};

const VariantSwatches = ({ label, options, value, onChange, kind = 'color' }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#5C5853' }}>{label}</span>
      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210' }}>{value}</span>
    </div>
    <div style={{ display: 'flex', gap: kind === 'color' ? 10 : 6 }}>
      {options.map(opt => kind === 'color' ? (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          width: 32, height: 32, borderRadius: 999, background: opt.hex,
          border: '2px solid #F6F1E8',
          outline: value === opt.value ? '2px solid #141210' : '1px solid #D4CCBE',
          outlineOffset: value === opt.value ? 2 : 0,
          cursor: 'pointer', padding: 0,
        }} aria-label={opt.value} />
      ) : (
        <button key={opt} onClick={() => onChange(opt)} disabled={opt === '1 TB'} style={{
          fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
          padding: '10px 16px', borderRadius: 8, cursor: opt === '1 TB' ? 'not-allowed' : 'pointer',
          background: value === opt ? '#141210' : 'white',
          color: value === opt ? 'white' : (opt === '1 TB' ? '#B5AFA5' : '#141210'),
          textDecoration: opt === '1 TB' ? 'line-through' : 'none',
          border: '1px solid ' + (value === opt ? '#141210' : '#E6DFD4'),
        }}>{opt}</button>
      ))}
    </div>
  </div>
);

const QtyStepper = ({ value, onChange }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center',
    background: 'white', border: '1px solid #E6DFD4', borderRadius: 999, height: 48, padding: '0 4px'
  }}>
    <button onClick={() => onChange(Math.max(1, value - 1))} style={{
      width: 40, height: 40, borderRadius: 999, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}><Icon name="minus" size={16}/></button>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 15, padding: '0 16px', minWidth: 32, textAlign: 'center' }}>{value}</span>
    <button onClick={() => onChange(value + 1)} style={{
      width: 40, height: 40, borderRadius: 999, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}><Icon name="plus" size={16}/></button>
  </div>
);

const Tabs = ({ tabs, value, onChange }) => (
  <div style={{ borderBottom: '1px solid #E6DFD4', display: 'flex', gap: 4 }}>
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)} style={{
        background: 'transparent', border: 0, padding: '14px 16px', cursor: 'pointer',
        fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
        color: value === t ? '#141210' : '#5C5853',
        borderBottom: value === t ? '2px solid #141210' : '2px solid transparent',
        marginBottom: -1,
      }}>{t}</button>
    ))}
  </div>
);

const ReviewItem = ({ name, rating, when, title, body, verified }) => (
  <div style={{ padding: '20px 0', borderBottom: '1px solid #E6DFD4' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={14} color={i < rating ? '#141210' : '#D4CCBE'} style={{ fill: i < rating ? '#141210' : '#D4CCBE' }}/>)}
      </span>
      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>{name}</span>
      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#8A857E' }}>· {when}</span>
      {verified && <Badge kind="green">Verified buyer</Badge>}
    </div>
    <h4 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, fontWeight: 600, margin: '0 0 6px' }}>{title}</h4>
    <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, lineHeight: 1.5, color: '#5C5853', margin: 0 }}>{body}</p>
  </div>
);

const DetailPage = ({ onNavigate, onAddToCart }) => {
  const [color, setColor] = React.useState('Persimmon');
  const [storage, setStorage] = React.useState('256 GB');
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState('Details');

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 64px 80px' }}>
      <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853', marginBottom: 20 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ color: '#5C5853', textDecoration: 'none' }}>Home</a> · <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('listing'); }} style={{ color: '#5C5853', textDecoration: 'none' }}>Phones</a> · <span style={{ color: '#141210', fontWeight: 600 }}>Halo Pro 14</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48 }}>
        <Gallery
          images={[
            '../../assets/placeholders/phone-orange.svg',
            '../../assets/placeholders/phone-green.svg',
            '../../assets/placeholders/phone-orange.svg',
            '../../assets/placeholders/phone-green.svg',
          ]}
          badges={[<Badge key="n" kind="new">NEW</Badge>, <Badge key="d" kind="persimmon" mono>−19%</Badge>]}
        />
        <div>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C5853', marginBottom: 6 }}>Bayside Mobile</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px', color: '#141210' }}>
            Halo Pro 14 — Unlocked, 5G
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <Stars rating={4.6} count={2341} />
            <span style={{ color: '#D4CCBE' }}>·</span>
            <a href="#" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#141210', textDecoration: 'underline', textUnderlineOffset: 3 }}>312 questions</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 40, fontWeight: 500, color: '#141210', letterSpacing: '-1px' }}>$649</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#8A857E', textDecoration: 'line-through' }}>$799</span>
            <Badge kind="persimmon" mono>−19%</Badge>
          </div>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853', marginBottom: 28 }}>
            or 4 payments of <strong style={{ color: '#141210' }}>$162.25</strong> with Marlo Pay
          </div>

          <VariantSwatches
            label="Color"
            value={color}
            onChange={setColor}
            options={[
              { value: 'Persimmon', hex: '#FF5B2E' },
              { value: 'Onyx', hex: '#141210' },
              { value: 'Pine', hex: '#3A4A3A' },
              { value: 'Cream', hex: '#F6F1E8' },
            ]}
          />
          <VariantSwatches
            label="Storage"
            value={storage}
            onChange={setStorage}
            options={['128 GB', '256 GB', '512 GB', '1 TB']}
            kind="size"
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <QtyStepper value={qty} onChange={setQty} />
            <Button kind="primary" size="lg" full style={{ flex: 1, height: 48 }} onClick={onAddToCart}>Add to cart · $649</Button>
          </div>
          <Button kind="secondary" size="lg" full style={{ marginBottom: 20 }}>Buy now</Button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20, background: 'white', border: '1px solid #E6DFD4', borderRadius: 12 }}>
            {[
              ['truck', <span><strong style={{ color: '#141210' }}>Free shipping</strong> · arrives <strong style={{ color: '#141210' }}>Tue, Mar 18</strong> to 90210</span>],
              ['rotateCcw', <span><strong style={{ color: '#141210' }}>Free 30-day returns</strong> · no restocking fee</span>],
              ['shield', <span><strong style={{ color: '#141210' }}>Buyer protection</strong> from Marlo · covered for 90 days</span>],
            ].map(([icn, txt], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>
                <Icon name={icn} size={18} color="#141210" stroke={1.8} />
                <span>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: 64 }}>
        <Tabs tabs={['Details', 'Specs', 'Reviews · 2,341', 'Questions · 312', 'Shipping']} value={tab} onChange={setTab} />
        <div style={{ paddingTop: 32, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          <div>
            {tab === 'Details' && (
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, lineHeight: 1.7, color: '#141210' }}>
                <p style={{ margin: '0 0 16px' }}>The Halo Pro 14 is built for people who use their phone for everything. 6.1" OLED display, the new H14 chip, and a triple-camera system tuned for low light.</p>
                <p style={{ margin: '0 0 16px' }}>Sold and shipped by <strong>Bayside Mobile</strong>, a Marlo Verified seller. Includes a USB-C cable, a Marlo 30-day return label, and a 12-month seller warranty.</p>
                <ul style={{ paddingLeft: 18, margin: 0, color: '#5C5853' }}>
                  <li style={{ marginBottom: 6 }}>Unlocked for use on any major US carrier</li>
                  <li style={{ marginBottom: 6 }}>5G sub-6 + mmWave</li>
                  <li style={{ marginBottom: 6 }}>IP68 water and dust resistance</li>
                </ul>
              </div>
            )}
            {tab === 'Specs' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14 }}>
                <tbody>
                  {[['Display', '6.1" Super Retina OLED'], ['Chip', 'H14 Bionic'], ['Storage', '256 GB'], ['Battery', '24 hr video'], ['Weight', '187 g'], ['Connectivity', '5G, Wi-Fi 6E, USB-C']].map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: '1px solid #E6DFD4' }}>
                      <td style={{ padding: '12px 0', color: '#5C5853', width: 200 }}>{k}</td>
                      <td style={{ padding: '12px 0', color: '#141210', fontWeight: 600 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab.startsWith('Reviews') && (
              <div>
                <ReviewItem name="Maya R." rating={5} when="2 weeks ago" verified
                  title="Great upgrade from the older model"
                  body="Battery is the biggest jump. Easily two days of normal use. Camera holds up indoors where my old phone fell apart." />
                <ReviewItem name="Theo K." rating={4} when="3 weeks ago" verified
                  title="Color is gorgeous, case fit a bit tight"
                  body="The Persimmon color is what got me. Worth it. Only minor: my old case for last year's model doesn't fit, the camera bump is bigger." />
                <ReviewItem name="Ji-eun Park" rating={5} when="1 month ago" verified
                  title="Bayside shipped fast"
                  body="Ordered Sunday, arrived Tuesday with the Marlo label. Sealed box, original spec, exactly as described." />
              </div>
            )}
            {tab === 'Questions · 312' && (
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#5C5853' }}>Questions feed not shown in this prototype.</div>
            )}
            {tab === 'Shipping' && (
              <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, lineHeight: 1.6, color: '#141210' }}>
                <p>Free standard shipping to ZIP <strong>90210</strong>. Arrives Tue, Mar 18.</p>
                <p style={{ color: '#5C5853' }}>Want it faster? Marlo Prime members get same-day delivery in eligible ZIPs for $0 extra.</p>
              </div>
            )}
          </div>
          {tab.startsWith('Reviews') && (
            <aside style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, padding: 24, alignSelf: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 56, fontWeight: 600, color: '#141210', lineHeight: 1, letterSpacing: '-0.03em' }}>4.6</span>
                <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#5C5853' }}>/ 5</span>
              </div>
              <Stars rating={4.6} count={2341} />
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[[5, 72], [4, 18], [3, 6], [2, 2], [1, 2]].map(([r, p]) => (
                  <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#5C5853' }}>
                    <span style={{ width: 12 }}>{r}</span>
                    <Icon name="star" size={11} color="#141210" style={{ fill: '#141210' }} />
                    <div style={{ flex: 1, height: 6, background: '#EFE8DB', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ width: `${p}%`, height: '100%', background: '#FFD83D' }} />
                    </div>
                    <span style={{ width: 32, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>{p}%</span>
                  </div>
                ))}
              </div>
              <Button kind="ghost" full style={{ marginTop: 20 }}>Write a review</Button>
            </aside>
          )}
        </div>
      </div>

      {/* Related */}
      <section style={{ marginTop: 80 }}>
        <SectionHeader eyebrow="People also bought" title="You might also like" action="See more" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {PRODUCTS.slice(1, 6).map(p => (
            <ProductCard key={p.id} product={p} onClick={() => onNavigate('detail')} />
          ))}
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { DetailPage, Gallery, VariantSwatches, QtyStepper, Tabs, ReviewItem });
