import vid1 from '../assets/vid/makeoverindonesia_pindown.io_1795155677.mp4';
import vid2 from '../assets/vid/ofracosmetics_pindown.io_1795155615.mp4';
import vid3 from '../assets/vid/vedibeauty_pindown.io_1795155769.mp4';

const videos = [
  { src: vid1, label: 'BOLD' },
  { src: vid2, label: 'FIERCE' },
  { src: vid3, label: 'RADIANT' },
];

export default function ColourFeels() {
  return (
    <section className="colour-feels-section">
      {/* Section Heading */}
      <div className="colour-feels-header">
        <h2 className="colour-feels-title">
          THE COLOUR <em>MAKES YOU FEEL.</em>
        </h2>
        <p className="colour-feels-sub">Three shades. Three moods. All unapologetically you.</p>
      </div>

      {/* 3 Videos — edge-to-edge, no gap */}
      <div className="colour-feels-grid">
        {videos.map((v) => (
          <div key={v.label} className="colour-feels-cell">
            <video
              src={v.src}
              autoPlay
              loop
              muted
              playsInline
              className="colour-feels-video"
            />
            <div className="colour-feels-overlay" />
            <span className="colour-feels-label">{v.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
