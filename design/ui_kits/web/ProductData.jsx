// Mock product data for the Marlo Web UI Kit.
const PRODUCTS = [
  { id: 'halo-pro-14', name: 'Halo Pro 14 — 128 GB', seller: 'Bayside Mobile', img: '../../assets/placeholders/phone-orange.svg', price: 649, was: 799, rating: 4.6, reviews: 2341, badge: 'new', cat: 'Phones', colors: ['#FF5B2E', '#141210', '#3A4A3A', '#F6F1E8'] },
  { id: 'overhead-3', name: 'Overhead 3 wireless — Onyx', seller: 'Northstar Audio', img: '../../assets/placeholders/headphones.svg', price: 229, rating: 4.8, reviews: 14021, cat: 'Audio', colors: ['#141210', '#F6F1E8'] },
  { id: 'lume-14',    name: 'Lume Air 14"', seller: 'Driftwood Tech', img: '../../assets/placeholders/laptop.svg', price: 1099, was: 1249, rating: 4.5, reviews: 824, badge: 'gold', cat: 'Laptops' },
  { id: 'orbit-watch',name: 'Orbit Watch 8', seller: 'Bayside Mobile', img: '../../assets/placeholders/watch.svg', price: 329, rating: 4.4, reviews: 3107, cat: 'Phones' },
  { id: 'fjord-bag',  name: 'Fjord weekender — Tan', seller: 'Slow Goods Co.', img: '../../assets/placeholders/bag.svg', price: 184, rating: 4.7, reviews: 612, badge: 'discount', discount: 22, cat: 'Fashion' },
  { id: 'wellspring', name: 'Wellspring bottle 24oz', seller: 'Honest Goods', img: '../../assets/placeholders/bottle.svg', price: 38, rating: 4.9, reviews: 8540, cat: 'Home' },
  { id: 'pulse-spkr', name: 'Pulse compact speaker', seller: 'Northstar Audio', img: '../../assets/placeholders/speaker.svg', price: 89, was: 119, rating: 4.6, reviews: 1840, badge: 'sale', cat: 'Audio' },
  { id: 'soft-lamp',  name: 'Soft glow desk lamp', seller: 'Hearth & Hold', img: '../../assets/placeholders/home-lamp.svg', price: 72, rating: 4.5, reviews: 446, cat: 'Home' },
  { id: 'halo-mini',  name: 'Halo Mini — 64 GB', seller: 'Bayside Mobile', img: '../../assets/placeholders/phone-green.svg', price: 449, rating: 4.3, reviews: 998, badge: 'new', cat: 'Phones', colors: ['#3A4A3A', '#141210', '#F6F1E8'] },
  { id: 'pulse-mid',  name: 'Pulse Studio mid-tower', seller: 'Northstar Audio', img: '../../assets/placeholders/speaker.svg', price: 149, rating: 4.5, reviews: 304, cat: 'Audio' },
];

const CATEGORIES = [
  { id: 'phones', name: 'Phones', img: '../../assets/icons/categories/phones.svg' },
  { id: 'laptops', name: 'Laptops', img: '../../assets/icons/categories/laptops.svg' },
  { id: 'audio', name: 'Audio', img: '../../assets/icons/categories/audio.svg' },
  { id: 'home', name: 'Home', img: '../../assets/icons/categories/home.svg' },
  { id: 'fashion', name: 'Fashion', img: '../../assets/icons/categories/fashion.svg' },
  { id: 'grocery', name: 'Grocery', img: '../../assets/icons/categories/grocery.svg' },
  { id: 'beauty', name: 'Beauty', img: '../../assets/icons/categories/beauty.svg' },
  { id: 'sports', name: 'Sports', img: '../../assets/icons/categories/sports.svg' },
];

// --- ProductCard ---
const ProductCard = ({ product, onClick }) => {
  const [hover, setHover] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick && onClick(product); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'white', border: '1px solid #E6DFD4', borderRadius: 12, padding: '8px 8px 14px',
        position: 'relative', display: 'block', textDecoration: 'none', color: 'inherit',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 4px 8px rgba(20,18,16,0.06), 0 8px 24px rgba(20,18,16,0.08)' : 'none',
        transition: 'all 150ms cubic-bezier(.2,.8,.2,1)',
      }}
    >
      <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6, zIndex: 1 }}>
        {product.badge === 'new' && <Badge kind="new">NEW</Badge>}
        {product.badge === 'sale' && <Badge kind="sale">SALE</Badge>}
        {product.badge === 'gold' && <Badge kind="gold">★ Bestseller</Badge>}
        {product.badge === 'discount' && <Badge kind="persimmon" mono>−{product.discount}%</Badge>}
      </div>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved); }}
        aria-label="Save"
        style={{
          position: 'absolute', top: 16, right: 16, zIndex: 1,
          background: 'rgba(246,241,232,0.92)', border: 0, width: 32, height: 32, borderRadius: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? '#FF5B2E' : 'none'} stroke={saved ? '#FF5B2E' : '#141210'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      </button>
      <div style={{ width: '100%', aspectRatio: '1', background: '#F6F1E8', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ padding: '12px 6px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 11, fontWeight: 500, color: '#8A857E', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{product.seller}</span>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#141210', lineHeight: 1.25 }}>{product.name}</span>
        <div style={{ marginTop: 4 }}>
          <Price amount={product.price} was={product.was} size="md" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          {product.was && <Badge kind="persimmon" mono>−{Math.round((1 - product.price / product.was) * 100)}%</Badge>}
          <Stars rating={product.rating} count={product.reviews} />
        </div>
      </div>
    </a>
  );
};

Object.assign(window, { PRODUCTS, CATEGORIES, ProductCard });
