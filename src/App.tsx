import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Switch, useParams } from 'wouter';
import { ArrowRight, Menu, ShoppingBag, X } from 'lucide-react';
import heroImage from './assets/hero.png';
import heroVideo from './assets/vid/jovane.mp4';
import closeupImage from './assets/hero-campaign.jpg';
import storyStrawberryIceImage from './assets/story-strawberry-ice.png';
import rougeImage from './assets/rouge-ceremonie-after.jpg';
import veloursImage from './assets/redlip.png';
import beforeLipsImage from './assets/img-before.png';
import afterLipsImage from './assets/img-after.png';
import rougeCeremonieAfterImage from './assets/rouge-ceremonie-after.jpg';
import LipstickComparison from '@/components/LipstickComparison';
import ShopByColours from '@/components/ShopByColours';
import BeautyAcrossSkinTones from '@/components/BeautyAcrossSkinTones';
import ColourFeels from '@/components/ColourFeels';
import NotFound from '@/pages/not-found';

type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'The Icons' | 'The Nudes' | 'The Atelier';
  image: string;
  shade: string;
  color: string;
  description: string;
  tag?: string;
};
type BagItem = { product: Product; quantity: number };

const products: Product[] = [
  { slug: 'rouge-ceremonie', name: 'Rouge Cérémonie', subtitle: 'Satin lipstick · 3.8 g', price: 48, category: 'The Icons', image: rougeImage, shade: 'Rouge Cérémonie', color: '#a51725', description: 'A true, vivid red with a satin finish. One deliberate gesture, and the room changes. The house signature, made for every entrance.', tag: 'The signature' },
  { slug: 'velours-nuit', name: 'Velours Nuit', subtitle: 'Velvet matte · 3.8 g', price: 48, category: 'The Icons', image: veloursImage, shade: 'Velours Nuit', color: '#5a1724', description: 'A deep wine-red in a soft-focus velvet finish. It wears like the last light of an evening that has no intention of ending.', tag: 'Bestseller' },
  { slug: 'rose-obscur', name: 'Rose Obscur', subtitle: 'Satin lipstick · 3.8 g', price: 48, category: 'The Nudes', image: closeupImage, shade: 'Rose Obscur', color: '#a8535c', description: 'A muted rose with a quiet warmth. Barely there at first glance; unforgettable up close.', tag: 'New shade' },
  { slug: 'brun-scene', name: 'Brun de Scène', subtitle: 'Velvet matte · 3.8 g', price: 48, category: 'The Nudes', image: veloursImage, shade: 'Brun de Scène', color: '#784e43', description: 'An understated brown rose, borrowed from the backstage shadows. Soft, considered, and entirely your own.' },
  { slug: 'rouge-minuit', name: 'Rouge Minuit', subtitle: 'Satin lipstick · 3.8 g', price: 48, category: 'The Atelier', image: rougeImage, shade: 'Rouge Minuit', color: '#771925', description: 'A blue-toned crimson with a glimmer of midnight. Created for a close-up, kept for the whole night.' },
  { slug: 'la-premiere', name: 'La Première', subtitle: 'Lip wardrobe · 3 shades', price: 92, category: 'The Atelier', image: closeupImage, shade: 'Curated set', color: '#a51725', description: 'Three house signatures, gathered in a keepsake case. Rouge Cérémonie, Rose Obscur, and Velours Nuit — your own backstage wardrobe.', tag: 'Limited edition' },
];

function Header({ count, openBag, solid = false }: { count: number; openBag: () => void; solid?: boolean }) {
  return <>
    <header className={`header ${solid ? 'solid' : ''}`}>
      <div className="header-spacer" />
      <Link href="/" className="brand brand-center" data-testid="link-home">JOVANE</Link>
      <div className="nav-actions"></div>
    </header>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-main">
      <div className="footer-brand"><Link href="/" className="brand" data-testid="link-footer-home">JOVANE<small>PARIS · MAISON DE COULEUR</small></Link><p className="footer-note">Colour, with a point of view. Made for the moment before you enter the room.</p></div>
      <div className="footer-column">
        <span className="footer-title">A little correspondence</span>
        <span style={{ fontSize: '13px', color: '#b5aba2' }}>Notes from backstage, now and then.</span>
        <form
          style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '420px', marginTop: '6px' }}
          onSubmit={(event) => {
            event.preventDefault();
            window.alert('You are on the list. A note from the house will find you soon.');
          }}
        >
          <input
            aria-label="Email address"
            placeholder="YOUR EMAIL ADDRESS"
            data-testid="input-newsletter"
            className="footer-email-input"
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: 0,
              borderBottom: '2px solid rgba(255, 255, 255, 0.45)',
              padding: '14px 0',
              width: '100%',
              font: 'inherit',
              fontSize: '18px',
              letterSpacing: '0.08em',
              outline: 'none',
            }}
          />
          <button
            aria-label="Join newsletter"
            className="icon-button"
            data-testid="button-newsletter"
            style={{ marginLeft: '-32px', color: '#ffffff', cursor: 'pointer', padding: '6px' }}
          >
            <ArrowRight size={22} />
          </button>
        </form>
      </div>
    </div>
    <div className="footer-bottom"><span>© JOVANE PARIS · 2025</span><span>AN EXERCISE IN PRESENCE</span><span>DEMO EXPERIENCE · NO PURCHASES</span></div>
  </footer>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return <article className="product-card" data-testid={`card-product-${product.slug}`}>
    <div className="product-image-wrap">
      <Link href={`/product/${product.slug}`} data-testid={`link-product-${product.slug}`}><img src={product.image} alt={`${product.name} lipstick editorial`} /></Link>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className="quick-add" onClick={() => onAdd(product)} data-testid={`button-add-${product.slug}`}>Add to bag — ${product.price}</button>
    </div>
    <div className="product-meta">
      <Link href={`/product/${product.slug}`} data-testid={`link-product-name-${product.slug}`}>
        <div className="product-name">{product.name}</div><div className="product-sub">{product.subtitle}</div>
      </Link><div className="product-price">${product.price}</div>
    </div>
    <div className="swatches" aria-label="Available shades">
      {[product.color, '#c37b70', '#402127'].map((color, index) => <span key={`${product.slug}-${color}`} className="swatch" style={{ backgroundColor: color }} aria-label={`${product.name} shade ${index + 1}`} data-testid={`swatch-${product.slug}-${index + 1}`} />)}
    </div>
  </article>;
}

function HomePage({ onAdd, count }: { onAdd: (p: Product) => void; count: number }) {
  return <>
    <Header count={count} openBag={() => window.dispatchEvent(new Event('open-bag'))} />
    <main>
      <section className="hero">
        <video
          className="hero-photo"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-content">
          <div className="hero-actions">
            <Link href="/shop" className="hero-link" data-testid="button-explore-collection">
              Explore the collection
            </Link>
          </div>
        </div>
      </section>
      <div className="ticker"><div className="ticker-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>THE ART OF THE ENTRANCE <span>✳</span> COLOUR WITH A POINT OF VIEW <span>✳</span> MADE TO BE REMEMBERED <span>✳</span></span>)}</div></div>
      <ShopByColours />
      <LipstickComparison
        beforeSrc={afterLipsImage}
        afterSrc={beforeLipsImage}
        shades={[
          {
            name: 'Velours Nuit',
            color: '#5a1724',
            afterSrc: afterLipsImage,
            price: 48,
          },
          {
            name: 'Rouge Cérémonie',
            color: '#a51725',
            afterSrc: rougeCeremonieAfterImage,
            price: 48,
          },
        ]}
      />
      <ColourFeels />
      <BeautyAcrossSkinTones />
      <section className="story-band">
        <div className="story-photo"><img src={storyStrawberryIceImage} alt="JOVANE dark red liquid lipstick with strawberries and ice cubes" /></div>
        <div className="story-copy"><h2 className="serif">Not made to<br />blend in.</h2><p>JOVANE began with a simple conviction: colour should feel like a decision. A red can be a signature, a small rebellion, a private ritual. We make the tools for all three.</p><Link href="/about" className="text-link" data-testid="link-story-more">Read the house story&nbsp; ↗</Link></div>
      </section>
      <section className="quote-section"><div className="eyebrow">The house note</div><p className="quote serif">“The final touch is never just the final touch. It is the beginning of being seen.”</p><div className="quote-attribution">From the JOVANE atelier</div></section>
    </main>
    <Footer />
  </>;
}

function ShopPage({ onAdd, count }: { onAdd: (p: Product) => void; count: number }) {
  const params = new URLSearchParams(window.location.search);
  const [filter, setFilter] = useState(params.get('category') || 'All');
  const [sort, setSort] = useState('featured');
  const categories = ['All', 'The Icons', 'The Nudes', 'The Atelier'];
  const visible = useMemo(() => {
    const filtered = filter === 'All' ? [...products] : products.filter(p => p.category === filter);
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [filter, sort]);
  return <>
    <Header count={count} openBag={() => window.dispatchEvent(new Event('open-bag'))} solid />
    <main>
      <div className="page-top"><div className="eyebrow">The JOVANE collection</div><h1 className="serif">Colour,<br />considered.</h1><p>A tightly edited wardrobe of lip colour. Each shade made to be worn with intention, and nowhere else in mind.</p></div>
      <section className="shop-content">
        <div className="shop-toolbar"><div className="filter-group">{categories.map(cat => <button key={cat} className={`filter-chip ${filter === cat ? 'active' : ''}`} data-testid={`button-filter-${cat.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setFilter(cat)}>{cat}</button>)}</div><div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><span className="result-count" data-testid="text-result-count">{visible.length} pieces</span><select className="sort-select" value={sort} data-testid="select-sort" onChange={e => setSort(e.target.value)} aria-label="Sort products"><option value="featured">Sort: House edit</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div></div>
        <div className="shop-grid">{visible.length ? visible.map(p => <ProductCard key={p.slug} product={p} onAdd={onAdd} />) : <div className="no-results">The dressing room is quiet. Try another edit.</div>}</div>
      </section>
    </main>
    <Footer />
  </>;
}

function ProductPage({ onAdd, count }: { onAdd: (p: Product) => void; count: number }) {
  const params = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === params.slug) || products[0];
  const [shade, setShade] = useState(product.shade);
  return <>
    <Header count={count} openBag={() => window.dispatchEvent(new Event('open-bag'))} solid />
    <main className="detail-wrap">
      <div className="breadcrumb"><Link href="/" data-testid="link-breadcrumb-home">Home</Link><span>/</span><Link href="/shop" data-testid="link-breadcrumb-shop">The collection</Link><span>/</span><span>{product.name}</span></div>
      <div className="detail-grid">
        <div className="detail-image"><img src={product.image} alt={`${product.name} luxury lipstick campaign`} /></div>
        <div className="detail-info"><div className="eyebrow">{product.category} · The house colour</div><h1 className="serif">{product.name}</h1><div className="detail-price">${product.price}.00</div><p className="detail-description">{product.description}</p>
          <div className="detail-label">Choose your shade — {shade}</div><div className="shade-options">{products.slice(0, 5).map(p => <button className={`shade-option ${shade === p.shade ? 'selected' : ''}`} key={p.slug} data-testid={`button-select-shade-${p.slug}`} onClick={() => setShade(p.shade)}><span className="shade-dot" style={{ background: p.color }} />{p.shade}</button>)}</div>
          <button className="button-primary detail-add" data-testid="button-detail-add" onClick={() => onAdd({ ...product, shade })}>Add to bag — ${product.price}</button><div className="detail-note">A demo bag, for the pleasure of choosing. No purchase is made.</div>
          <div className="detail-features"><span><b>Finish</b>{product.subtitle.split(' · ')[0]}</span><span><b>Wear</b>Comfort, from first entrance to last call</span><span><b>Made with</b>Care in Paris, France</span></div>
        </div>
      </div>
    </main><Footer />
  </>;
}

function AboutPage({ count }: { count: number }) {
  return <>
    <Header count={count} openBag={() => window.dispatchEvent(new Event('open-bag'))} solid />
    <main>
      <section className="about-intro" style={{ paddingTop: '120px' }}><h2 className="serif">Born between<br />the curtain and<br />the camera.</h2><div><p>JOVANE is an independent lipstick house built around a single, enduring idea: colour is presence. Not decoration. Not a finishing touch. A way of taking up space, on your own terms.</p><p>Our imagined atelier lives somewhere backstage in Paris — in the hush before the lights, the softened click of a compact, the red that survives the night. That is where every shade begins.</p><Link href="/shop" className="text-link" style={{ color: '#241a18' }} data-testid="link-about-shop">Meet the collection&nbsp; ↗</Link></div></section>
      <section className="manifesto"><div className="eyebrow" style={{ justifyContent: 'center' }}>Our point of view</div><p className="serif">We believe a lipstick can be a <em>small ceremony.</em><br />A daily act of authorship.<br />A little audacity, made wearable.</p></section>
      <section className="process"><div className="eyebrow">The house codes</div><h2 className="serif" style={{ fontSize: 'clamp(45px,6vw,70px)', margin: '17px 0 0' }}>Three things we keep.</h2><div className="process-grid"><article className="process-item"><div className="process-number">01</div><h3>Colour with conviction</h3><p>We do not make a shade just to fill a line. Every colour earns its place at the mirror.</p></article><article className="process-item"><div className="process-number">02</div><h3>Presence, not perfection</h3><p>A real face, a real evening, a red that moves with you. The ritual is personal; the result is yours.</p></article><article className="process-item"><div className="process-number">03</div><h3>Less, but considered</h3><p>A small edit of objects made to be kept close, reached for often, and remembered.</p></article></div></section>
      <section className="quote-section"><div className="eyebrow">The house signature</div><p className="quote serif">“Wear the red. Keep the room.”</p><Link href="/shop" className="text-link" style={{ display: 'inline-block', marginTop: 15 }} data-testid="link-about-collection">Discover the collection&nbsp; ↗</Link></section>
    </main><Footer />
  </>;
}

function App() {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [toast, setToast] = useState('');
  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const addToBag = (product: Product) => {
    setBag(current => {
      const found = current.find(item => item.product.slug === product.slug && item.product.shade === product.shade);
      return found ? current.map(item => item === found ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }];
    });
    setToast(`${product.shade} added to your bag`);
    setBagOpen(true);
    window.setTimeout(() => setToast(''), 2600);
  };
  const adjust = (slug: string, delta: number) => setBag(current => current.map(item => item.product.slug === slug ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  const remove = (slug: string) => setBag(current => current.filter(item => item.product.slug !== slug));
  const subtotal = bag.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  useEffect(() => {
    const listener = () => setBagOpen(true);
    window.addEventListener('open-bag', listener);
    return () => window.removeEventListener('open-bag', listener);
  }, []);
  return <div className="site-shell">
    <Switch>
      <Route path="/"><HomePage onAdd={addToBag} count={bagCount} /></Route>
      <Route path="/shop"><ShopPage onAdd={addToBag} count={bagCount} /></Route>
      <Route path="/product/:slug"><ProductPage onAdd={addToBag} count={bagCount} /></Route>
      <Route path="/about"><AboutPage count={bagCount} /></Route>
      <Route component={NotFound} />
    </Switch>
    <div className={`bag-backdrop ${bagOpen ? 'open' : ''}`} onClick={() => setBagOpen(false)} data-testid="bag-backdrop" />
    <aside className={`bag-drawer ${bagOpen ? 'open' : ''}`} aria-label="Shopping bag" data-testid="panel-bag">
      <div className="bag-heading"><h2 className="serif">Your bag <span style={{ fontSize: 14, color: '#8c8176' }}>({bagCount})</span></h2><button className="bag-close" aria-label="Close bag" data-testid="button-close-bag" onClick={() => setBagOpen(false)}><X size={19} /></button></div>
      {bag.length ? <><div className="bag-items">{bag.map(({ product, quantity }) => <div className="bag-item" key={product.slug}><img src={product.image} alt={product.name} /><div><div className="bag-item-name">{product.name}</div><div className="bag-item-detail">{product.shade} · ${product.price}</div><div className="qty-controls"><button aria-label={`Decrease ${product.name}`} data-testid={`button-quantity-minus-${product.slug}`} onClick={() => adjust(product.slug, -1)}>−</button><span data-testid={`text-quantity-${product.slug}`}>{quantity}</span><button aria-label={`Increase ${product.name}`} data-testid={`button-quantity-plus-${product.slug}`} onClick={() => adjust(product.slug, 1)}>+</button></div><button className="remove-item" data-testid={`button-remove-${product.slug}`} onClick={() => remove(product.slug)}>Remove</button></div><div className="bag-item-price">${product.price * quantity}</div></div>)}</div><div className="bag-bottom"><div className="bag-total"><span>Subtotal</span><span data-testid="text-bag-subtotal">${subtotal}.00</span></div><p className="bag-disclaimer">This is a visual demo bag. No checkout or purchase is available. Your selections stay in this browser session.</p><button className="button-primary" data-testid="button-demo-bag" onClick={() => setBagOpen(false)}>Continue admiring</button></div></> : <div className="bag-empty"><div className="bag-empty-mark">R/N</div><p>Your dressing room is waiting. Find a colour that feels like you.</p><Link href="/shop" className="button-primary" style={{ display: 'inline-flex', alignItems: 'center', marginTop: 12 }} data-testid="link-bag-shop" onClick={() => setBagOpen(false)}>Explore the collection</Link></div>}
    </aside>
    {toast && <div className="toast" role="status" data-testid="status-added-to-bag"><strong>Added.</strong> {toast}</div>}
  </div>;
}

export default App;
