import React, { useState } from 'react';
import { ArrowRight, Check, Eye } from 'lucide-react';

import model01 from '../assets/campaign/model-01.jpg';
import model02 from '../assets/campaign/model-02.jpg';
import model03 from '../assets/campaign/model-03.jpg';
import model04 from '../assets/campaign/model-04.jpg';
import model05 from '../assets/campaign/model-05.jpg';
import model06 from '../assets/campaign/model-06.jpg';
import model07 from '../assets/campaign/model-07.jpg';
import model08 from '../assets/campaign/model-08.jpg';

export interface BeautyLook {
  id: string;
  shadeName: string;
  shadeCode: string;
  hexColor: string;
  finish: string;
  skinTone: string;
  undertone: string;
  hairStyle: string;
  modelStyle: string;
  description: string;
  editorialQuote: string;
  image: string;
  category: 'deep' | 'warm' | 'fair';
}

export const defaultBeautyLooks: BeautyLook[] = [
  {
    id: 'look-01',
    shadeName: 'Velours Nuit',
    shadeCode: 'SHADE 01',
    hexColor: '#5a1724',
    finish: 'Velvet Matte Liquid',
    skinTone: 'Rich Deep Ebony',
    undertone: 'Cool / Neutral',
    hairStyle: 'Voluminous Loose Flowing Waves',
    modelStyle: 'Elegant Soft Glam · kajal-lined gaze · champagne silk',
    description: 'A deep blackberry wine liquid lipstick complemented by soft glam makeup, kajal-defined eyes, and cascading silky waves.',
    editorialQuote: '“Soft glam with an undeniable edge. A rich blackberry velvet that defines modern allure.”',
    image: model01,
    category: 'deep',
  },
  {
    id: 'look-02',
    shadeName: 'Brun Chocolat',
    shadeCode: 'SHADE 02',
    hexColor: '#431A14',
    finish: 'Cashmere Liquid Matte',
    skinTone: 'Warm Dusky Brown',
    undertone: 'Golden Warm',
    hairStyle: 'Glossy Voluminous Dark Waves',
    modelStyle: 'Smokey Eye Luxury · black velvet blazer · confident gaze',
    description: 'Dark cocoa with roasted espresso depth, paired with an intensely blended smokey eye, waterline kajal, and tailored velvet styling.',
    editorialQuote: '“Smokey eyes meet rich dark chocolate velvet—pure backstage opulence.”',
    image: model02,
    category: 'deep',
  },
  {
    id: 'look-03',
    shadeName: 'Rose Poudré',
    shadeCode: 'SHADE 03',
    hexColor: '#C75C7A',
    finish: 'Hydrating Cloud Matte',
    skinTone: 'High-Fashion Editorial Tone',
    undertone: 'Soft Neutral',
    hairStyle: 'Loose Waves under Luxury Black Felt Fedora',
    modelStyle: 'International Fashion Model · chic fedora · bold winged eyes',
    description: 'A delicate milky powder-rose styled with bold graphic winged eye makeup, a luxury black hat, and Parisian trench coat elegance.',
    editorialQuote: '“A Parisian street-chic attitude paired with the softest powder rose.”',
    image: model03,
    category: 'fair',
  },
  {
    id: 'look-04',
    shadeName: 'Rouge Cérémonie',
    shadeCode: 'SHADE 04',
    hexColor: '#a51725',
    finish: 'Iconic Satin Matte',
    skinTone: 'Porcelain Radiance · East Asian',
    undertone: 'Cool Rose / Dewy',
    hairStyle: 'Glossy Soft Curtain Waves',
    modelStyle: 'Korean-Inspired Beauty · luminous glass skin · cream silk blouse',
    description: 'The definitive Parisian crimson scarlet presented with radiant Korean glass skin, feathered lashes, soft apricot blush, and loose curtain waves.',
    editorialQuote: '“Luminous skin, effortless grace, and the definitive Paris red.”',
    image: model04,
    category: 'fair',
  },
  {
    id: 'look-05',
    shadeName: 'Fuchsia Sauvage',
    shadeCode: 'SHADE 05',
    hexColor: '#810036',
    finish: 'Electric Velvet Liquid',
    skinTone: 'Ultra-Deep Melanin-Rich',
    undertone: 'Cool Blue / Violet',
    hairStyle: 'Voluminous Loose Textured Crown',
    modelStyle: 'Bold Editorial Beauty · dramatic kajal · sculptural gold jewelry',
    description: 'Electrifying wild fuchsia-magenta paired with dramatic black kajal, smokey violet eyeshadow, sculpted cheekbones, and off-the-shoulder couture.',
    editorialQuote: '“Fierce, regal, and unapologetically electric from every angle.”',
    image: model05,
    category: 'deep',
  },
  {
    id: 'look-06',
    shadeName: 'Rose Obscur',
    shadeCode: 'SHADE 06',
    hexColor: '#a8535c',
    finish: 'Soft-Focus Muted Matte',
    skinTone: 'Medium Olive · Mediterranean',
    undertone: 'Warm Olive / Neutral',
    hairStyle: 'Voluminous Waves under Wide-Brim Hat',
    modelStyle: 'Modern Luxury Diva · glamorous mauve-bronze eyes · tailored coat',
    description: 'A dusty rose mauve styled with rich glamorous eye makeup, thick fluttery lashes, a wide-brim felt hat, and cashmere camel tailoring.',
    editorialQuote: '“Old-world Hollywood glamour reimagined into modern everyday luxury.”',
    image: model06,
    category: 'warm',
  },
  {
    id: 'look-07',
    shadeName: 'Brun de Scène',
    shadeCode: 'SHADE 07',
    hexColor: '#784e43',
    finish: 'Velvet Terracotta Matte',
    skinTone: 'Golden Tan · Latin Bronzed',
    undertone: 'Warm Amber',
    hairStyle: 'Voluminous Natural Curls',
    modelStyle: 'Sunlit editorial angle · warm radiant skin',
    description: 'Spiced terracotta with baked caramel undertones, illuminating sun-kissed and tan complexions.',
    editorialQuote: '“Warm backstage light captured inside a single formula.”',
    image: model07,
    category: 'warm',
  },
  {
    id: 'look-08',
    shadeName: 'Rouge Minuit',
    shadeCode: 'SHADE 08',
    hexColor: '#771925',
    finish: 'Midnight Velvet Matte',
    skinTone: 'Warm Beige · East Asian',
    undertone: 'Golden Peach',
    hairStyle: 'Sleek Center-Parted Hair',
    modelStyle: 'Fashion magazine side tilt · bold lip focus',
    description: 'A blue-toned midnight ruby red created to brighten the complexion and deliver dramatic evening allure.',
    editorialQuote: '“Midnight in Paris, formulated for all night presence.”',
    image: model08,
    category: 'warm',
  },
];

export default function BeautyAcrossSkinTones({
  looks = defaultBeautyLooks,
  onSelectShade,
}: {
  looks?: BeautyLook[];
  onSelectShade?: (shadeName: string) => void;
}) {
  const [selectedLook, setSelectedLook] = useState<BeautyLook | null>(null);

  return (
    <section className="skin-tones-section" id="beauty-across-skin-tones">
      {/* Decorative ambient background */}
      <div className="skin-tones-ambient" />

      <div className="skin-tones-container">
        {/* Header Section */}
        <header className="skin-tones-header">
          <h2 className="serif skin-tones-title">
            BEAUTY HAS NO BOUNDARIES.
          </h2>
          <p className="skin-tones-caption">
            Different skin tones. Different stories. One beautiful shade for everyone.
          </p>
        </header>

        {/* 8-Model Editorial Gallery */}
        <div className="skin-tones-grid">
          {looks.map((look) => (
            <article
              key={look.id}
              className="skin-tone-card"
              onClick={() => setSelectedLook(look)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedLook(look);
                }
              }}
            >
              {/* Model Portrait with Fallback Background */}
              <div className="skin-tone-portrait-wrap">
                <img
                  src={look.image}
                  alt={`${look.shadeName} on ${look.skinTone}`}
                  className="skin-tone-image"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to high quality beauty portrait if specific campaign image not yet loaded
                    const target = e.currentTarget;
                    if (!target.src.includes('lip-closeup')) {
                      target.src = '/assets/lip-closeup.jpg';
                    }
                  }}
                />
                
                {/* Subtle vignette overlay */}
                <div className="skin-tone-overlay" />

                {/* Unique Edge-to-Edge Shade-Filled Color Rectangle Bar */}
                <div
                  className="skin-tone-color-bar"
                  style={{ backgroundColor: look.hexColor }}
                >
                  <div className="skin-tone-color-bar-sheen" aria-hidden="true" />
                  
                  <div className="skin-tone-bar-content">
                    <div className="skin-tone-bar-info">
                      <h4 className="serif skin-tone-bar-title">{look.shadeName}</h4>
                      <p className="skin-tone-bar-tone">{look.skinTone}</p>
                    </div>

                    <button
                      type="button"
                      className="skin-tone-bar-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLook(look);
                      }}
                      aria-label={`View look for ${look.shadeName}`}
                    >
                      <span className="action-text">VIEW</span>
                      <span className="action-icon">
                        <Eye size={11} strokeWidth={2.4} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Campaign Footer Statement */}
        <div className="skin-tones-bottom-banner">
          <div className="skin-tones-bottom-inner">
            <div className="skin-tones-bottom-statement">
              <span className="serif skin-tones-bottom-tagline">“Colour was never meant to be one-size-fits-all.”</span>
              <p>Formulated with micro-milled pigments and cold-pressed squalane for true-to-tube payoff across every undertone.</p>
            </div>
            <a href="/shop" className="hero-link skin-tones-shop-link">
              EXPLORE ALL 8 SHADES
            </a>
          </div>
        </div>
      </div>

      {/* Modal / Look Detail Dialog */}
      {selectedLook && (
        <div
          className="skin-modal-backdrop"
          onClick={() => setSelectedLook(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="skin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="skin-modal-close"
              onClick={() => setSelectedLook(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <div className="skin-modal-grid">
              <div className="skin-modal-image-col">
                <img
                  src={selectedLook.image}
                  alt={selectedLook.shadeName}
                  className="skin-modal-img"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/lip-closeup.jpg';
                  }}
                />
                <div className="skin-modal-color-tag">
                  <span
                    className="skin-modal-swatch"
                    style={{ backgroundColor: selectedLook.hexColor }}
                  />
                  <span>{selectedLook.shadeName}</span>
                </div>
              </div>

              <div className="skin-modal-info-col">
                <div className="eyebrow" style={{ color: '#800020' }}>
                  {selectedLook.shadeCode} · {selectedLook.finish}
                </div>
                <h3 className="serif skin-modal-title">{selectedLook.shadeName}</h3>
                <p className="skin-modal-quote">{selectedLook.editorialQuote}</p>
                <p className="skin-modal-description">{selectedLook.description}</p>

                <div className="skin-modal-specs">
                  <div className="skin-spec-row">
                    <span className="skin-spec-label">Campaign Concept</span>
                    <span className="skin-spec-val" style={{ color: '#800020' }}>{selectedLook.modelStyle.split(' · ')[0]}</span>
                  </div>
                  <div className="skin-spec-row">
                    <span className="skin-spec-label">Model Skin Tone</span>
                    <span className="skin-spec-val">{selectedLook.skinTone}</span>
                  </div>
                  <div className="skin-spec-row">
                    <span className="skin-spec-label">Ideal Undertone</span>
                    <span className="skin-spec-val">{selectedLook.undertone}</span>
                  </div>
                  <div className="skin-spec-row">
                    <span className="skin-spec-label">Editorial Hair & Style</span>
                    <span className="skin-spec-val">{selectedLook.hairStyle}</span>
                  </div>
                  <div className="skin-spec-row">
                    <span className="skin-spec-label">Formula Finish</span>
                    <span className="skin-spec-val">{selectedLook.finish}</span>
                  </div>
                </div>

                <div className="skin-modal-actions">
                  <a
                    href={`/shop`}
                    className="button-primary skin-modal-btn"
                    onClick={() => {
                      if (onSelectShade) onSelectShade(selectedLook.shadeName);
                    }}
                  >
                    View in Shop — $48
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
