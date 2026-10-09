import React from 'react';
import { ArrowDownRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { ProductIllustration } from '../shop/ProductIllustration';

interface HeroProps {
  onExploreCatalog: () => void;
  onSelectProduct: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onSelectProduct }) => {
  return (
    <section className="relative border-b border-neutral-200 bg-neutral-100/60 overflow-hidden">
      {/* Main Campaign Hero Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Unboxed Editorial Kicker */}
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-neutral-500">
                <span>Northern Edition 2026</span>
                <span aria-hidden="true">·</span>
                <span>Foundry & Woodcraft</span>
                <span aria-hidden="true">·</span>
                <span>Batch No. 04</span>
              </div>

              {/* Refined Display Title with balanced text wrap */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-neutral-900 leading-[1.08] text-balance">
                Tactile permanence for quiet spaces.
              </h1>

              {/* Descriptive Body Measure */}
              <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed">
                Sculptural objects, precision acoustics, and architectural lighting milled from solid unlacquered brass, Roman travertine, and Nordic hardwood. Built to mature with your home.
              </p>
            </div>

            {/* Action Group */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all whitespace-nowrap shadow-sm"
              >
                <span>Explore Curated Catalog</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectProduct('prod_01')}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-lg border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 transition-colors whitespace-nowrap"
              >
                <span>Spotlight: Lumina Lamp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Hero Showcase Plinth */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full relative bg-neutral-50 rounded-2xl border border-neutral-200/90 p-8 shadow-xs overflow-hidden group">
              {/* Subtle architectural background grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Interactive Showcase Object Preview */}
              <div className="relative aspect-4/3 flex items-center justify-center py-4">
                <ProductIllustration visualId="sculptural_lamp" activeColorHex="#D97706" />
              </div>

              {/* Subtle Showcase Caption */}
              <div className="mt-4 pt-4 border-t border-neutral-200/70 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-neutral-900">Lumina Fluted Brass Lamp</p>
                  <p className="text-neutral-500 font-mono tabular-nums">$340 · Solid Travertine & Brass</p>
                </div>
                <button
                  onClick={() => onSelectProduct('prod_01')}
                  className="text-xs font-semibold text-neutral-900 underline hover:text-neutral-600 transition-colors"
                >
                  Inspect Object →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Adjacent Quantitative Proof Strip (4 columns below hero) */}
      <div className="border-t border-neutral-200 bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold tracking-wide">
                <Compass className="w-3.5 h-3.5 text-neutral-700" />
                <span>0.1mm Tolerances</span>
              </div>
              <p className="text-neutral-500 leading-normal">
                Solid metal and stone milling in Brescia and Aarhus workshops.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>10-Year Warranty</span>
              </div>
              <p className="text-neutral-500 leading-normal">
                Repairable hardware architectures built against planned obsolescence.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
                <span>4.9 / 5.0 Rating</span>
              </div>
              <p className="text-neutral-500 leading-normal">
                Verified reviews from 1,200+ architects and interior collectors worldwide.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-900 font-semibold tracking-wide">
                <span className="font-mono tabular-nums">100%</span>
                <span>Carbon Neutral</span>
              </div>
              <p className="text-neutral-500 leading-normal">
                Plastic-free molded pulp packaging and verified offset freight.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
