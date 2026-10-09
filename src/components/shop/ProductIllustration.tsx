import React from 'react';

interface ProductIllustrationProps {
  visualId: string;
  activeColorHex?: string;
  className?: string;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({
  visualId,
  activeColorHex,
  className = "w-full h-full",
}) => {
  const accent = activeColorHex || '#262626';

  switch (visualId) {
    case 'sculptural_lamp':
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lampGlow" cx="50%" cy="35%" r="45%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="travertineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5E5E5" />
              <stop offset="100%" stopColor="#D4D4D4" />
            </linearGradient>
          </defs>
          {/* Subtle Ambient Plinth Shadow */}
          <ellipse cx="200" cy="355" rx="110" ry="14" fill="#000000" fillOpacity="0.08" />
          
          {/* Travertine Stone Base */}
          <path d="M110 320 L110 345 C110 352 145 358 200 358 C255 358 290 352 290 345 L290 320 Z" fill="url(#travertineGrad)" />
          <ellipse cx="200" cy="320" rx="90" ry="12" fill="#F5F5F4" stroke="#E7E5E4" strokeWidth="1.5" />
          
          {/* Brushed Brass Vertical Stem */}
          <rect x="194" y="140" width="12" height="180" rx="6" fill="url(#brassGradient)" />
          
          {/* Lamp Diffuser Glow Backdrop */}
          <circle cx="200" cy="140" r="95" fill="url(#lampGlow)" />
          
          {/* Fluted Frosted Glass Sphere Shade */}
          <circle cx="200" cy="140" r="64" fill="#FAFAF9" stroke="#E2E8F0" strokeWidth="2" fillOpacity="0.95" />
          {/* Glass Rib lines */}
          <ellipse cx="200" cy="140" rx="42" ry="63" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <ellipse cx="200" cy="140" rx="20" ry="63.5" stroke="#CBD5E1" strokeWidth="1" opacity="0.6" />
          
          {/* Brass Cap & Finial */}
          <path d="M182 78 C182 75 218 75 218 78 L212 90 L188 90 Z" fill="url(#brassGradient)" />
          <circle cx="200" cy="72" r="5" fill="url(#brassGradient)" />
          
          {/* Dynamic Variant Color Accent Ring */}
          <ellipse cx="200" cy="320" rx="25" ry="4" fill={accent} opacity="0.8" />
        </svg>
      );

    case 'acoustic_speaker':
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="meshGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3F3F46" />
              <stop offset="85%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#09090B" />
            </radialGradient>
            <linearGradient id="bodyAlum" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="340" rx="100" ry="12" fill="#000000" fillOpacity="0.08" />
          
          {/* Cast Aluminum Outer Housing */}
          <rect x="90" y="90" width="220" height="230" rx="44" fill={accent} stroke="#D4D4D8" strokeWidth="2" />
          
          {/* Speaker Acoustic Fabric Inset */}
          <rect x="105" y="105" width="190" height="200" rx="34" fill="url(#meshGradient)" />
          
          {/* Concentric Acoustic Driver Circles */}
          <circle cx="200" cy="205" r="62" stroke="#52525B" strokeWidth="3" opacity="0.8" />
          <circle cx="200" cy="205" r="48" stroke="#71717A" strokeWidth="1.5" />
          <circle cx="200" cy="205" r="26" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="200" cy="205" r="8" fill="#F4F4F5" opacity="0.9" />
          
          {/* Precision Top Dial / Volume Crown */}
          <rect x="180" y="74" width="40" height="14" rx="4" fill="url(#bodyAlum)" stroke="#94A3B8" strokeWidth="1" />
          <line x1="200" y1="74" x2="200" y2="88" stroke="#64748B" strokeWidth="1.5" />
          
          {/* Tactile indicator dot */}
          <circle cx="200" cy="122" r="3" fill="#10B981" />
        </svg>
      );

    case 'ceramic_carafe':
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ceramicSheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="350" rx="85" ry="12" fill="#000000" fillOpacity="0.08" />
          
          {/* Main Hand-Thrown Carafe Body */}
          <path
            d="M165 90 L235 90 L245 130 C265 170 280 230 270 290 C265 325 240 342 200 342 C160 342 135 325 130 290 C120 230 135 170 155 130 Z"
            fill={accent}
          />
          {/* Surface texture reflection */}
          <path
            d="M165 90 L235 90 L245 130 C265 170 280 230 270 290 C265 325 240 342 200 342 C160 342 135 325 130 290 C120 230 135 170 155 130 Z"
            fill="url(#ceramicSheen)"
          />
          {/* Lip / Spout Rim */}
          <ellipse cx="200" cy="90" rx="35" ry="8" fill="#F5F5F4" stroke={accent} strokeWidth="2" />
          <ellipse cx="200" cy="90" rx="28" ry="5" fill="#44403C" opacity="0.6" />
          
          {/* Companion Tumbler in foreground */}
          <path d="M250 250 L295 250 L288 325 C286 332 278 338 272 338 C266 338 258 332 256 325 Z" fill={accent} opacity="0.9" />
          <ellipse cx="272" cy="250" rx="22" ry="5" fill="#E7E5E4" stroke={accent} strokeWidth="1.5" />
          
          {/* Organic Throwing Ring Lines */}
          <path d="M142 210 Q200 220 258 210" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
          <path d="M136 250 Q200 262 264 250" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
          <path d="M132 290 Q200 300 268 290" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
        </svg>
      );

    case 'chronograph_watch':
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="strapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="bezelTitanium" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="340" rx="90" ry="12" fill="#000000" fillOpacity="0.08" />
          
          {/* Leather Strap Top & Bottom */}
          <rect x="165" y="40" width="70" height="90" rx="6" fill={accent === '#262626' ? 'url(#strapGrad)' : accent} />
          <rect x="165" y="270" width="70" height="90" rx="6" fill={accent === '#262626' ? 'url(#strapGrad)' : accent} />
          
          {/* Titanium Outer Bezel */}
          <circle cx="200" cy="200" r="82" fill="url(#bezelTitanium)" />
          <circle cx="200" cy="200" r="74" fill="#0F172A" />
          
          {/* Dial Markers */}
          <circle cx="200" cy="200" r="68" stroke="#334155" strokeWidth="1" strokeDasharray="3 7.8" />
          
          {/* Minimalist Hour Indices */}
          <line x1="200" y1="134" x2="200" y2="142" stroke="#F8FAFC" strokeWidth="2.5" />
          <line x1="200" y1="258" x2="200" y2="266" stroke="#F8FAFC" strokeWidth="2.5" />
          <line x1="134" y1="200" x2="142" y2="200" stroke="#F8FAFC" strokeWidth="2.5" />
          <line x1="258" y1="200" x2="266" y2="200" stroke="#F8FAFC" strokeWidth="2.5" />
          
          {/* Subdial */}
          <circle cx="200" cy="230" r="16" stroke="#475569" strokeWidth="1" />
          <line x1="200" y1="230" x2="208" y2="226" stroke="#94A3B8" strokeWidth="1" />
          
          {/* Precision Hands */}
          <line x1="200" y1="200" x2="200" y2="152" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="200" y1="200" x2="236" y2="200" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          <line x1="200" y1="200" x2="175" y2="225" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
          <circle cx="200" cy="200" r="4" fill="#F8FAFC" />
          
          {/* Crown & Chrono Pushers */}
          <rect x="282" y="194" width="8" height="12" rx="2" fill="#CBD5E1" />
          <rect x="278" y="172" width="6" height="8" rx="1.5" fill="#94A3B8" />
          <rect x="278" y="220" width="6" height="8" rx="1.5" fill="#94A3B8" />
        </svg>
      );

    case 'lounge_chair':
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="woodLeg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="350" rx="110" ry="14" fill="#000000" fillOpacity="0.08" />
          
          {/* Solid Turned Legs */}
          <line x1="145" y1="250" x2="120" y2="345" stroke="url(#woodLeg)" strokeWidth="8" strokeLinecap="round" />
          <line x1="255" y1="250" x2="280" y2="345" stroke="url(#woodLeg)" strokeWidth="8" strokeLinecap="round" />
          <line x1="180" y1="250" x2="170" y2="340" stroke="url(#woodLeg)" strokeWidth="7" strokeLinecap="round" />
          <line x1="220" y1="250" x2="230" y2="340" stroke="url(#woodLeg)" strokeWidth="7" strokeLinecap="round" />
          
          {/* Sculptural Ergonomic Seat Cushion */}
          <path d="M120 230 C120 255 150 265 200 265 C250 265 280 255 280 230 L275 210 C240 215 160 215 125 210 Z" fill={accent} />
          
          {/* Deep Contoured Backrest Shell */}
          <path
            d="M130 210 C125 150 140 100 200 100 C260 100 275 150 270 210 C240 218 160 218 130 210 Z"
            fill={accent}
            stroke="#171717"
            strokeWidth="2"
          />
          {/* Internal Tufting / Contour Shadow */}
          <path d="M160 130 C185 140 215 140 240 130" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" />
          <path d="M150 170 C185 180 215 180 250 170" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" />
        </svg>
      );

    case 'marble_altar':
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="marbleBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F4" />
              <stop offset="50%" stopColor="#E7E5E4" />
              <stop offset="100%" stopColor="#D6D3D1" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="330" rx="120" ry="16" fill="#000000" fillOpacity="0.08" />
          
          {/* Carved Marble Monolith */}
          <rect x="90" y="240" width="220" height="70" rx="8" fill="url(#marbleBase)" stroke="#A8A29E" strokeWidth="1.5" />
          {/* Subtle Grey Marble Veins */}
          <path d="M110 245 Q150 270 190 260 T270 295" stroke="#78716C" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <path d="M140 280 Q180 295 230 270" stroke="#78716C" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
          
          {/* Incense Brass Bowl */}
          <ellipse cx="200" cy="235" rx="36" ry="10" fill="#D97706" stroke="#92400E" strokeWidth="1" />
          <ellipse cx="200" cy="232" rx="30" ry="6" fill="#78350F" />
          
          {/* Solid Architectural Sphere Accent */}
          <circle cx="200" cy="180" r="38" fill={accent} stroke="#44403C" strokeWidth="1.5" />
          <circle cx="188" cy="170" r="8" fill="#FFFFFF" fillOpacity="0.3" />
        </svg>
      );

    case 'pendulum_clock':
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="350" rx="70" ry="10" fill="#000000" fillOpacity="0.08" />
          {/* Minimalist Column Body */}
          <rect x="155" y="80" width="90" height="250" rx="12" fill={accent} stroke="#404040" strokeWidth="1.5" />
          {/* Glass Aperture Window */}
          <rect x="168" y="160" width="64" height="150" rx="6" fill="#171717" fillOpacity="0.8" />
          {/* Pendulum Rod & Bob */}
          <line x1="200" y1="170" x2="200" y2="280" stroke="#FBBF24" strokeWidth="2" />
          <circle cx="200" cy="280" r="16" fill="#D97706" stroke="#FDE68A" strokeWidth="1" />
          {/* Clock Face */}
          <circle cx="200" cy="120" r="28" fill="#FAFAF9" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="200" y1="120" x2="200" y2="102" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <line x1="200" y1="120" x2="214" y2="120" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="200" cy="120" r="2" fill="#D97706" />
        </svg>
      );

    case 'linen_throw':
    default:
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="200" cy="340" rx="95" ry="12" fill="#000000" fillOpacity="0.08" />
          {/* Draped Organic Textile Folds */}
          <path
            d="M110 180 C130 150 170 145 200 155 C230 145 270 150 290 180 L280 320 C240 335 160 335 120 320 Z"
            fill={accent}
            stroke="#262626"
            strokeWidth="1.5"
          />
          {/* Woven Linen Weft & Fringe Details */}
          <path d="M125 210 Q200 230 275 210" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
          <path d="M120 250 Q200 270 280 250" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
          <path d="M118 290 Q200 310 282 290" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
          {/* Organic Fringe */}
          <line x1="130" y1="324" x2="130" y2="338" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="328" x2="150" y2="342" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="170" y1="330" x2="170" y2="344" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="190" y1="332" x2="190" y2="346" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="210" y1="332" x2="210" y2="346" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="230" y1="330" x2="230" y2="344" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="250" y1="328" x2="250" y2="342" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="270" y1="324" x2="270" y2="338" stroke="#D4D4D8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
