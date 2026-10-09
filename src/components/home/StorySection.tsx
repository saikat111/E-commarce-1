import React from 'react';
import { Layers, Shield, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="craft-story" className="border-t border-neutral-200 bg-neutral-900 text-neutral-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Narrative Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-400">
            <span>Philosophy & Material Ethos</span>
            <span aria-hidden="true">·</span>
            <span>Honest Craft</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white leading-tight">
            Designed against the ephemeral.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            In an era of disposable manufacturing, Atelier Nord produces objects intended to outlast generations. We mill raw architectural alloys, carve Roman stone, and harvest certified Scandinavian timber without chemical lacquers or planned obsolescence.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-neutral-800">
          
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">
              01. Raw Material Permanence
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every brass stem is unlacquered so that handling slowly imparts an organic amber patina. Stone bases are carved from quarried blocks of travertine and Nero Marquina.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">
              02. Modular Repairability
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No proprietary glued enclosures. Every luminaire socket, acoustic driver, and mechanical movement uses standardized mechanical fasteners accessible with standard hex keys.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">
              03. Micro-Batch Integrity
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We produce runs of 20 to 100 units per quarter. Each timepiece and architectural piece is inspected, measured, and signed by our foundry master before dispatch.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
