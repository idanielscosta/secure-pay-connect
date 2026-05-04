import { useState, useEffect } from "react";
import { CardBrandIcon, detectBrand } from "./CardBrandIcon";
import { Wifi } from "lucide-react";

interface Props {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  flipped: boolean;
}

export const CreditCardPreview = ({ number, name, expiry, cvv, flipped }: Props) => {
  const brand = detectBrand(number);
  const formatted = (number.replace(/\s/g, "").padEnd(16, "•").match(/.{1,4}/g) || []).join(" ").slice(0, 19);

  return (
    <div className="[perspective:1500px] w-full max-w-sm mx-auto">
      <div
        className={`relative h-56 w-full transition-all duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 card-3d rounded-2xl shadow-elevated p-6 flex flex-col justify-between [backface-visibility:hidden]">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col gap-1">
              <div className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 shadow-inner relative overflow-hidden">
                <div className="absolute inset-1 border border-amber-700/30 rounded-sm" />
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px p-1.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="bg-amber-700/20 rounded-[1px]" />
                  ))}
                </div>
              </div>
              <Wifi className="h-5 w-5 text-white/80 rotate-90" />
            </div>
            <CardBrandIcon brand={brand} size="lg" />
          </div>

          <div className="relative z-10">
            <div className="font-mono text-xl md:text-2xl text-white tracking-[0.2em] font-medium drop-shadow-md">
              {formatted}
            </div>
          </div>

          <div className="flex items-end justify-between relative z-10">
            <div>
              <div className="text-[9px] uppercase text-white/60 tracking-widest mb-0.5">Titular</div>
              <div className="text-white text-sm font-medium uppercase tracking-wide truncate max-w-[180px]">
                {name || "SEU NOME AQUI"}
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase text-white/60 tracking-widest mb-0.5">Validade</div>
              <div className="text-white text-sm font-mono">{expiry || "MM/AA"}</div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 card-3d rounded-2xl shadow-elevated [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
          <div className="h-12 bg-black/60 mt-6" />
          <div className="px-6 pt-5">
            <div className="bg-white/90 h-10 rounded flex items-center justify-end px-3">
              <span className="font-mono text-slate-900 tracking-widest">{cvv || "•••"}</span>
            </div>
            <div className="text-[10px] text-white/60 mt-2 text-right">CVV — 3 dígitos no verso</div>
          </div>
        </div>
      </div>
    </div>
  );
};
