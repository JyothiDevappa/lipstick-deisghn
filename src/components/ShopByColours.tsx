import React, { useRef, useState } from 'react';
import { Link } from 'wouter';
import img01 from '../assets/collections/img01.png';
import img02 from '../assets/collections/img02.png';
import img03 from '../assets/collections/img03.png';
import img04 from '../assets/collections/img04.jpg';

export interface ColourCategory {
  id: string;
  name: string;
  image: string;
  shadeHint?: string;
  count?: number;
}

const defaultCategories: ColourCategory[] = [
  {
    id: 'choco-brownie',
    name: 'Choco Brownie',
    image: img01,
    shadeHint: 'Dark cocoa & rich espresso undertones',
  },
  {
    id: 'deep-magenta',
    name: 'Deep Magenta',
    image: img02,
    shadeHint: 'Electric plum, rich fuchsia & nocturnal magenta',
  },
  {
    id: 'baby-pink',
    name: 'Baby Pink',
    image: img03,
    shadeHint: 'Soft petal blush & delicate milky pink',
  },
  {
    id: 'classic-red',
    name: 'The Reds',
    image: img04,
    shadeHint: 'Vivid crimson & iconic scarlet',
  },
];

export default function ShopByColours({
  categories = defaultCategories,
}: {
  categories?: ColourCategory[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse drag state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Track cursor movement for drag scrolling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !trackRef.current) return;
    e.preventDefault();
    const delta = (e.clientX - startX) * 1.3;
    if (Math.abs(delta) > 5) {
      setHasDragged(true);
    }
    trackRef.current.scrollLeft = scrollStart - delta;
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.clientX);
    setScrollStart(trackRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <section className="shop-by-colours-section" id="shop-by-colours" ref={containerRef}>
      <div className="colours-inner">
        {/* Header bar - exact Sunnies Face style */}
        <div className="colours-header">
          <h2 className="colours-title">Shop by colours</h2>
        </div>

        {/* Interactive Drag Carousel */}
        <div
          className={`colours-carousel-wrap ${isMouseDown ? 'is-dragging' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Carousel Track */}
          <div className="colours-track" ref={trackRef}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="colour-card"
                data-testid={`card-colour-${cat.id}`}
              >
                {/* Image with subtle zoom on card hover */}
                <div className="colour-card-image-wrap">
                  <img
                    src={cat.image}
                    alt={`${cat.name} lipstick`}
                    className="colour-card-image"
                    draggable={false}
                  />
                  <div className="colour-card-overlay" />
                </div>

                {/* Bottom pill capsule button matching Sunnies Face aesthetic */}
                <div className="colour-card-pill">
                  <span className="colour-pill-label">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

