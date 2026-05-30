// Marlo — Product Listing Page (PLP)

const FilterGroup = ({ title, children, open = true }) => {
  const [expanded, setExpanded] = React.useState(open);
  return (
    <div style={{ borderBottom: '1px solid #E6DFD4', padding: '20px 0' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', background: 'transparent', border: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 0, fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#141210',
        }}
      >
        <span>{title}</span>
        <span style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms' }}>
          <Icon name="chevronDown" size={16} />
        </span>
      </button>
      {expanded && <div style={{ marginTop: 14 }}>{children}</div>}
    </div>
  );
};

const Check = ({ label, count, checked, onClick }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '6px 0', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210' }}>
    <span
      onClick={onClick}
      style={{
        width: 18, height: 18, borderRadius: 4, border: '1px solid #D4CCBE',
        background: checked ? '#141210' : 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
      }}
    >
      {checked && <Icon name="check" size={12} color="white" stroke={3} />}
    </span>
    <span style={{ flex: 1 }}>{label}</span>
    {count != null && <span style={{ color: '#8A857E', fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{count}</span>}
  </label>
);

const FilterSidebar = () => {
  const [checks, setChecks] = React.useState({
    'apple': false, 'samsung': true, 'google': false, 'oneplus': false,
    'new': true, 'used': false, 'refurb': false,
    'free-ship': true, 'prime': false,
  });
  const toggle = (k) => setChecks(c => ({ ...c, [k]: !c[k] }));
  return (
    <aside style={{ width: 240, flex: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: '#141210', margin: 0 }}>Filters</h3>
        <button style={{ background: 'transparent', border: 0, color: '#5C5853', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>Clear all</button>
      </div>
      <FilterGroup title="Brand">
        <Check label="Apple" count={142} checked={checks.apple} onClick={() => toggle('apple')} />
        <Check label="Samsung" count={219} checked={checks.samsung} onClick={() => toggle('samsung')} />
        <Check label="Google" count={64} checked={checks.google} onClick={() => toggle('google')} />
        <Check label="OnePlus" count={28} checked={checks.oneplus} onClick={() => toggle('oneplus')} />
        <button style={{ background: 'transparent', border: 0, color: '#141210', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '8px 0' }}>Show 12 more</button>
      </FilterGroup>
      <FilterGroup title="Price">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <input placeholder="$0" style={{ flex: 1, background: 'white', border: '1px solid #E6DFD4', borderRadius: 8, padding: '8px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: 0 }}/>
          <span style={{ color: '#8A857E' }}>–</span>
          <input placeholder="$1500" style={{ flex: 1, background: 'white', border: '1px solid #E6DFD4', borderRadius: 8, padding: '8px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: 0 }}/>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          {['Under $200', '$200–500', '$500–1k', 'Over $1k'].map(t => (
            <button key={t} style={{
              background: 'white', border: '1px solid #E6DFD4', borderRadius: 999, padding: '5px 10px',
              fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 12, color: '#141210', cursor: 'pointer'
            }}>{t}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Condition">
        <Check label="New" count={412} checked={checks.new} onClick={() => toggle('new')} />
        <Check label="Refurbished" count={92} checked={checks.refurb} onClick={() => toggle('refurb')} />
        <Check label="Used — like new" count={64} checked={checks.used} onClick={() => toggle('used')} />
      </FilterGroup>
      <FilterGroup title="Rating">
        {[4, 3, 2].map(r => (
          <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, cursor: 'pointer' }}>
            <span style={{ width: 18, height: 18, borderRadius: 999, border: '1px solid #D4CCBE', background: 'white' }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={12} color={i < r ? '#141210' : '#D4CCBE'} style={{ fill: i < r ? '#141210' : '#D4CCBE' }}/>)}
            </span>
            <span style={{ color: '#5C5853' }}>&amp; up</span>
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Shipping">
        <Check label="Free shipping" count={381} checked={checks['free-ship']} onClick={() => toggle('free-ship')} />
        <Check label="Marlo Prime · 2-day" count={142} checked={checks.prime} onClick={() => toggle('prime')} />
      </FilterGroup>
    </aside>
  );
};

const SortBar = ({ count, sort, setSort }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
    <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#5C5853' }}>
      <span style={{ color: '#141210', fontWeight: 600 }}>{count}</span> results in <span style={{ color: '#141210', fontWeight: 600 }}>Phones</span>
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853' }}>Sort</span>
      <select value={sort} onChange={(e) => setSort(e.target.value)} style={{
        background: 'white', border: '1px solid #E6DFD4', borderRadius: 8, padding: '8px 12px',
        fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, color: '#141210', cursor: 'pointer',
      }}>
        <option>Featured</option>
        <option>Price: low to high</option>
        <option>Price: high to low</option>
        <option>Top rated</option>
        <option>Newest</option>
      </select>
    </div>
  </div>
);

const ActiveChips = () => {
  const [chips, setChips] = React.useState(['Samsung', 'New', 'Free shipping', '$200 – $500']);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
      {chips.map(c => (
        <button key={c}
          onClick={() => setChips(chips.filter(x => x !== c))}
          style={{
            background: '#141210', color: 'white', border: 0,
            borderRadius: 999, padding: '6px 8px 6px 12px', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer'
          }}>
          {c}
          <Icon name="x" size={12} color="white" stroke={2} />
        </button>
      ))}
    </div>
  );
};

const ListingPage = ({ onNavigate }) => {
  const [sort, setSort] = React.useState('Featured');
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 64px 80px' }}>
      <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, color: '#5C5853', marginBottom: 12 }}>
        <a href="#" style={{ color: '#5C5853', textDecoration: 'none' }}>Home</a> · <a href="#" style={{ color: '#5C5853', textDecoration: 'none' }}>Electronics</a> · <span style={{ color: '#141210', fontWeight: 600 }}>Phones</span>
      </div>
      <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 44, lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.02em', color: '#141210', margin: '0 0 32px' }}>Phones</h1>
      <div style={{ display: 'flex', gap: 32 }}>
        <FilterSidebar />
        <div style={{ flex: 1, minWidth: 0 }}>
          <SortBar count={538} sort={sort} setSort={setSort} />
          <ActiveChips />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[...PRODUCTS, ...PRODUCTS].slice(0, 12).map((p, i) => (
              <ProductCard key={p.id + i} product={p} onClick={() => onNavigate('detail')} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <Button kind="ghost" size="lg">Load more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ListingPage, FilterSidebar, SortBar, ActiveChips });
