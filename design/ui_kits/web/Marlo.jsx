// Marlo Web UI Kit — Shared components.
// Loaded as a babel JSX file. Exports components to window so other JSX files can use them.

const Logo = ({ onDark = false, size = 32 }) => (
  <a href="#" data-page-link="home" style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
    <img
      src={onDark ? '../../assets/marlo-logo-on-dark.svg' : '../../assets/marlo-logo.svg'}
      alt="marlo"
      style={{ height: size, display: 'block' }}
    />
  </a>
);

// --- Icons (Lucide-styled, inline SVG) ---
const Icon = ({ name, size = 20, stroke = 1.5, color = 'currentColor', style }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>,
    cart: <><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></>,
    heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    menu: <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    chevronRight: <polyline points="9 18 15 12 9 6"/>,
    chevronLeft: <polyline points="15 18 9 12 15 6"/>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    truck: <><path d="M5 17H3a1 1 0 0 1-1-1V4h14v12h-3M16 8h4l3 4v4a1 1 0 0 1-1 1h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    rotateCcw: <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></>,
    pin: <><path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="m19 6-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    minus: <line x1="5" y1="12" x2="19" y2="12"/>,
    package: <><path d="m7.5 4.27 9 5.15"/><path d="M21 8L12 13L3 8"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="12 22 12 13"/></>,
    creditCard: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/></>,
    sliders: <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name]}
    </svg>
  );
};

// --- Button ---
const btnBase = {
  fontFamily: "'Hanken Grotesk', sans-serif",
  fontWeight: 600,
  fontSize: 14,
  borderRadius: 8,
  padding: '12px 22px',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 150ms cubic-bezier(.2,.8,.2,1)',
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  whiteSpace: 'nowrap',
};
const Button = ({ kind = 'primary', size = 'md', children, icon, iconRight, onClick, style, full, ...rest }) => {
  const variants = {
    primary:   { background: '#FF5B2E', color: 'white' },
    secondary: { background: '#141210', color: 'white' },
    ghost:     { background: 'transparent', color: '#141210', borderColor: '#D4CCBE' },
    link:      { background: 'transparent', color: '#141210', padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 },
  };
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13, borderRadius: 6 },
    md: {},
    lg: { padding: '16px 28px', fontSize: 16 },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...btnBase, ...variants[kind], ...sizes[size], width: full ? '100%' : undefined, ...style }}
      onMouseEnter={(e) => { if (kind === 'primary') e.currentTarget.style.background = '#E84A1E'; if (kind === 'secondary') e.currentTarget.style.background = '#2C2823'; if (kind === 'ghost') e.currentTarget.style.background = '#EFE8DB'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = variants[kind].background; }}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
};

// --- Badge ---
const Badge = ({ kind = 'default', children, mono }) => {
  const styles = {
    default:  { background: 'transparent', color: '#141210', border: '1px solid #D4CCBE' },
    sale:     { background: '#D7263D', color: 'white' },
    discount: { background: '#FFE7DD', color: '#C73A12', fontFamily: "'JetBrains Mono', monospace" },
    new:      { background: '#141210', color: 'white', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 10 },
    gold:     { background: '#FFD83D', color: '#141210' },
    green:    { background: '#1F4D3C', color: '#F6F1E8', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: 10 },
    stock:    { background: '#E0F2EA', color: '#15643F' },
    low:      { background: '#FCF1D9', color: '#7A5510' },
    info:     { background: '#E0EBFB', color: '#1F4FA0' },
    persimmon:{ background: '#FFE7DD', color: '#C73A12' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 10px', borderRadius: 999, fontWeight: 600, fontSize: 12, lineHeight: 1,
      whiteSpace: 'nowrap', alignSelf: 'flex-start', width: 'fit-content',
      fontFamily: mono ? "'JetBrains Mono', monospace" : undefined,
      ...styles[kind]
    }}>{children}</span>
  );
};

// --- Price ---
const Price = ({ amount, was, size = 'md', color }) => {
  const sizes = { sm: 14, md: 18, lg: 24, xl: 40 };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: sizes[size], color: color || '#141210', fontVariantNumeric: 'tabular-nums', letterSpacing: size === 'xl' ? '-1px' : 0 }}>
        ${amount.toLocaleString()}
      </span>
      {was && (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: Math.max(12, sizes[size] - 6), color: '#8A857E', textDecoration: 'line-through' }}>
          ${was.toLocaleString()}
        </span>
      )}
    </span>
  );
};

// --- Stars ---
const Stars = ({ rating, count }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>
    <Icon name="star" size={14} stroke={1.5} color="#141210" style={{ fill: '#141210' }} />
    <span style={{ fontWeight: 600, color: '#141210' }}>{rating}</span>
    {count && <span style={{ color: '#8A857E' }}>· {count.toLocaleString()}</span>}
  </span>
);

// --- IconButton ---
const IconButton = ({ icon, onClick, size = 40, badge, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    style={{
      width: size, height: size, borderRadius: 999, border: 0,
      background: 'transparent', color: '#141210', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', transition: 'background 150ms cubic-bezier(.2,.8,.2,1)',
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = '#EFE8DB'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
  >
    <Icon name={icon} size={20} />
    {badge != null && badge > 0 && (
      <span style={{
        position: 'absolute', top: 4, right: 4,
        background: '#FF5B2E', color: 'white', fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, fontWeight: 600, minWidth: 16, height: 16, padding: '0 4px',
        borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{badge}</span>
    )}
  </button>
);

// --- Header ---
const Header = ({ cartCount = 0, onNavigate, sticky = true }) => {
  const [hovered, setHovered] = React.useState(null);
  const categories = ['All categories', 'Phones', 'Laptops', 'Audio', 'Home', 'Fashion', 'Grocery', 'Beauty', 'Sports'];
  return (
    <header style={{
      position: sticky ? 'sticky' : 'static',
      top: 0, zIndex: 50,
      background: 'rgba(246, 241, 232, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E6DFD4',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 64px', height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>
        <Logo size={28} />
        <div style={{
          flex: 1, maxWidth: 560, display: 'flex', alignItems: 'center',
          background: 'white', border: '1px solid #E6DFD4', borderRadius: 999, padding: '0 6px 0 18px', height: 44,
        }}>
          <Icon name="search" size={18} color="#8A857E" />
          <input
            placeholder="Search phones, laptops, anything…"
            style={{ flex: 1, marginLeft: 12, border: 0, outline: 0, background: 'transparent', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210' }}
          />
          <button style={{
            background: '#FF5B2E', color: 'white', border: 0, height: 32, padding: '0 16px',
            borderRadius: 999, fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 600, fontSize: 13, cursor: 'pointer'
          }}>Search</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onNavigate && onNavigate('account')} style={{ background: 'transparent', border: 0, color: '#141210', fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 500, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8 }}>
            <Icon name="user" size={18} />
            <span>Account</span>
          </button>
          <IconButton icon="heart" ariaLabel="Saved" badge={3} />
          <IconButton icon="cart" ariaLabel="Cart" badge={cartCount} onClick={() => onNavigate && onNavigate('cart')} />
        </div>
      </div>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 64px', height: 44, display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 500, color: '#141210' }}>
        {categories.map((c, i) => (
          <a
            href="#"
            key={c}
            onClick={(e) => { e.preventDefault(); if (i > 0 && onNavigate) onNavigate('listing'); }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: '7px 12px', borderRadius: 999,
              background: hovered === i ? '#EFE8DB' : 'transparent',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: i === 0 ? '#141210' : '#5C5853',
              fontWeight: i === 0 ? 600 : 500,
              textDecoration: 'none',
            }}
          >
            {i === 0 && <Icon name="menu" size={14} />}
            {c}
          </a>
        ))}
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#5C5853', fontSize: 13 }}>
          <Icon name="pin" size={14} color="#5C5853" />
          Deliver to <strong style={{ color: '#141210', fontWeight: 600 }}>90210</strong>
        </span>
      </div>
    </header>
  );
};

// --- Footer ---
const Footer = () => (
  <footer style={{ background: '#141210', color: '#C9C2B5', padding: '64px 0 32px' }}>
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 48, marginBottom: 48 }}>
        <div>
          <Logo onDark size={32} />
          <p style={{ marginTop: 16, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#8A857E', maxWidth: 280 }}>
            A multi-category marketplace. Phones, gadgets, home, fashion, food — we sell everything, and we ship it fast.
          </p>
        </div>
        {[
          ['Shop', ['New arrivals', 'Today\u2019s deals', 'Marlo Outlet', 'Gift cards']],
          ['Help', ['Order status', 'Returns', 'Shipping', 'Contact us']],
          ['Sellers', ['Sell on Marlo', 'Seller hub', 'Sponsored ads', 'Fulfillment']],
          ['Company', ['About', 'Careers', 'Press', 'Sustainability']],
        ].map(([title, items]) => (
          <div key={title}>
            <h4 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: '#F6F1E8', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 16px' }}>{title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map(i => <li key={i}><a href="#" style={{ color: '#C9C2B5', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, textDecoration: 'none' }}>{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #2C2823', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#8A857E' }}>© 2026 Marlo, Inc. All rights reserved.</span>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#8A857E', display: 'inline-flex', gap: 16 }}>
          <a href="#" style={{ color: '#8A857E', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: '#8A857E', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#8A857E', textDecoration: 'none' }}>Cookies</a>
        </span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Logo, Icon, Button, Badge, Price, Stars, IconButton, Header, Footer });
