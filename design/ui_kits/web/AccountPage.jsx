// Marlo — Account Page

const AccountSidebar = ({ active, onNavigate }) => {
  const items = [
    ['Orders', 'package', 'orders'],
    ['Saved items', 'heart', 'saved'],
    ['Addresses', 'pin', 'addresses'],
    ['Payment methods', 'creditCard', 'payment'],
    ['Account settings', 'sliders', 'settings'],
  ];
  return (
    <aside style={{ width: 260, flex: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 0 24px', borderBottom: '1px solid #E6DFD4' }}>
        <div style={{ width: 48, height: 48, borderRadius: 999, background: '#FF5B2E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 600 }}>K</div>
        <div>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: '#141210' }}>Kira Lee</div>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>kira@hey.com</div>
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '16px 0' }}>
        {items.map(([label, icn, id]) => (
          <a key={id} href="#" onClick={(e) => { e.preventDefault(); onNavigate(id); }} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
            borderRadius: 8, color: active === id ? '#141210' : '#5C5853',
            background: active === id ? '#EFE8DB' : 'transparent',
            fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: active === id ? 600 : 500,
            textDecoration: 'none',
          }}>
            <Icon name={icn} size={18}/>
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

const OrderCard = ({ id, when, status, statusColor, total, items, eta }) => (
  <div style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, marginBottom: 16, overflow: 'hidden' }}>
    <div style={{ padding: '16px 20px', borderBottom: '1px solid #E6DFD4', display: 'flex', alignItems: 'center', gap: 32, background: '#FBF7F0' }}>
      <div>
        <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5853' }}>Order</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500, color: '#141210' }}>{id}</div>
      </div>
      <div>
        <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5853' }}>Placed</div>
        <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210' }}>{when}</div>
      </div>
      <div>
        <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5853' }}>Total</div>
        <Price amount={total} size="sm" />
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <Badge kind={statusColor === 'green' ? 'stock' : statusColor === 'info' ? 'info' : 'default'}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor', display: 'inline-block' }} />
          {status}
        </Badge>
      </div>
    </div>
    <div style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {items.map((img, i) => (
          <div key={i} style={{ width: 64, height: 64, background: '#F6F1E8', borderRadius: 8, padding: 6, display: 'flex' }}>
            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#5C5853' }}>
        {eta}
      </div>
      <Button kind="ghost" size="sm">Track</Button>
      <Button kind="ghost" size="sm">View order</Button>
    </div>
  </div>
);

const AccountPage = ({ onNavigate }) => {
  const [tab, setTab] = React.useState('orders');
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 64px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 44, lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.02em', color: '#141210', margin: '0 0 32px' }}>Your account</h1>
      <div style={{ display: 'flex', gap: 48 }}>
        <AccountSidebar active={tab} onNavigate={setTab} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {tab === 'orders' && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Recent orders</h2>
                <select style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 8, padding: '8px 12px', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210' }}>
                  <option>Past 6 months</option>
                  <option>Past year</option>
                  <option>2025</option>
                  <option>All time</option>
                </select>
              </div>
              <OrderCard id="M-2026-58291" when="Mar 14, 2026" status="On the way" statusColor="info" total={649}
                items={['../../assets/placeholders/phone-orange.svg']}
                eta="Arrives Tue, Mar 18 — out for delivery"
              />
              <OrderCard id="M-2026-58102" when="Mar 6, 2026" status="Delivered" statusColor="green" total={267}
                items={['../../assets/placeholders/headphones.svg', '../../assets/placeholders/bottle.svg']}
                eta="Delivered Mar 9 — left at front door"
              />
              <OrderCard id="M-2026-57804" when="Feb 18, 2026" status="Delivered" statusColor="green" total={184}
                items={['../../assets/placeholders/bag.svg']}
                eta="Delivered Feb 21"
              />
            </>
          )}
          {tab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Addresses</h2>
                <Button kind="primary" icon="plus">Add address</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {[
                  ['Home', 'Kira Lee', '420 Cedar Ave, Apt 4B', 'Beverly Hills, CA 90210', true],
                  ['Work', 'Kira Lee', '88 Fountain Plaza, Floor 12', 'Los Angeles, CA 90028', false],
                ].map(([label, name, line1, line2, def]) => (
                  <div key={label} style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: '#141210' }}>{label}</span>
                      {def && <Badge kind="persimmon">Default</Badge>}
                    </div>
                    <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210', lineHeight: 1.6 }}>
                      {name}<br/>{line1}<br/>{line2}
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                      <button style={{ background: 'transparent', border: 0, color: '#141210', textDecoration: 'underline', textUnderlineOffset: 3, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0 }}>Edit</button>
                      <button style={{ background: 'transparent', border: 0, color: '#5C5853', textDecoration: 'underline', textUnderlineOffset: 3, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, cursor: 'pointer', padding: 0 }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'payment' && (
            <div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 20px' }}>Payment methods</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['Visa', '••• 4421', '08/28', true], ['Mastercard', '••• 9013', '03/27', false]].map(([brand, last, exp, def]) => (
                  <div key={last} style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 56, height: 36, borderRadius: 6, background: '#141210', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F6F1E8', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>{brand.toUpperCase()}</div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#141210' }}>{last}</div>
                      <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#5C5853' }}>Expires {exp}</div>
                    </div>
                    {def && <Badge kind="persimmon">Default</Badge>}
                    <button style={{ marginLeft: 'auto', background: 'transparent', border: 0, color: '#5C5853', cursor: 'pointer' }}><Icon name="trash" size={18}/></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'saved' && (
            <div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 20px' }}>Saved items</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onClick={() => onNavigate('detail')} />)}
              </div>
            </div>
          )}
          {tab === 'settings' && (
            <div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 20px' }}>Account settings</h2>
              <div style={{ background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, padding: 24, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#5C5853' }}>
                Settings form not shown in this prototype.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AccountPage, AccountSidebar, OrderCard });
