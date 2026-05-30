// Marlo — Cart Page

const CartLineItem = ({ item, onUpdateQty, onRemove }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto auto', gap: 20, padding: '24px 0', borderBottom: '1px solid #E6DFD4', alignItems: 'center' }}>
    <div style={{ width: 120, height: 120, background: '#F6F1E8', borderRadius: 12, padding: 8, display: 'flex' }}>
      <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#8A857E' }}>{item.seller}</span>
      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#141210' }}>{item.name}</span>
      {item.variant && <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>{item.variant}</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
        <button onClick={() => onRemove(item.lineId)} style={{ background: 'transparent', border: 0, color: '#141210', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, padding: 0 }}>Remove</button>
        <button style={{ background: 'transparent', border: 0, color: '#141210', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, padding: 0 }}>Save for later</button>
      </div>
    </div>
    <QtyStepper value={item.qty} onChange={(v) => onUpdateQty(item.lineId, v)} />
    <div style={{ textAlign: 'right', minWidth: 100 }}>
      <Price amount={item.price * item.qty} size="lg" />
      {item.was && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#8A857E', textDecoration: 'line-through', marginTop: 4 }}>${(item.was * item.qty).toLocaleString()}</div>}
    </div>
  </div>
);

const CartPage = ({ items, onUpdateQty, onRemove, onNavigate }) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 0;
  const discount = items.reduce((s, i) => s + ((i.was ? (i.was - i.price) : 0) * i.qty), 0);
  const tax = Math.round(subtotal * 0.0875);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 64px', textAlign: 'center' }}>
        <Icon name="cart" size={48} color="#B5AFA5" />
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', margin: '20px 0 12px' }}>Nothing in your cart yet.</h1>
        <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 16, color: '#5C5853', margin: '0 0 24px' }}>Browse the deals — there's something good in there.</p>
        <Button kind="primary" size="lg" onClick={() => onNavigate('home')}>Start shopping</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 64px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 44, lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.02em', color: '#141210', margin: '0 0 32px' }}>
        Your cart <span style={{ color: '#8A857E', fontWeight: 500 }}>· {items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'flex-start' }}>
        <div>
          {/* Group: Bayside Mobile (mock split by seller) */}
          <div style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 16, padding: '4px 24px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 0 12px', borderBottom: '1px solid #E6DFD4' }}>
              <Badge kind="green">VERIFIED SELLER</Badge>
              <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#141210' }}>Sold by {items[0].seller}</span>
              <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>· Arrives <strong style={{ color: '#141210' }}>Tue, Mar 18</strong></span>
            </div>
            {items.map(i => <CartLineItem key={i.lineId} item={i} onUpdateQty={onUpdateQty} onRemove={onRemove} />)}
          </div>

          {/* Recommendations */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 16px' }}>You might also need</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {PRODUCTS.slice(6, 9).map(p => <ProductCard key={p.id} product={p} onClick={() => onNavigate('detail')}/>)}
            </div>
          </div>
        </div>

        <aside style={{ position: 'sticky', top: 130, background: 'white', border: '1px solid #E6DFD4', borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: '#141210', margin: '0 0 20px' }}>Order summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16, borderBottom: '1px solid #E6DFD4' }}>
            {[
              ['Subtotal', subtotal],
              ['Item discounts', -discount, '#C73A12'],
              ['Shipping', shipping, shipping === 0 ? '#15643F' : '#141210', shipping === 0 ? 'Free' : null],
              ['Estimated tax', tax],
            ].map(([label, amt, color, override]) => amt !== 0 || override ? (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14 }}>
                <span style={{ color: '#5C5853' }}>{label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: color || '#141210', fontWeight: 500 }}>
                  {override || (amt < 0 ? '−' : '') + '$' + Math.abs(amt).toLocaleString()}
                </span>
              </div>
            ) : null)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0' }}>
            <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#141210' }}>Total</span>
            <Price amount={total} size="lg" />
          </div>
          <Button kind="primary" size="lg" full style={{ marginTop: 8 }}>Checkout securely</Button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#5C5853' }}>
              <Icon name="shield" size={14} color="#15643F" stroke={2}/>
              Marlo protects every order — money-back guarantee.
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #E6DFD4' }}>
            <label style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: '#5C5853', display: 'block', marginBottom: 8 }}>Promo code</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Enter code" style={{
                flex: 1, background: '#F6F1E8', border: '1px solid #E6DFD4', borderRadius: 8,
                padding: '10px 12px', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, outline: 0,
              }}/>
              <Button kind="ghost" size="md">Apply</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

Object.assign(window, { CartPage, CartLineItem });
