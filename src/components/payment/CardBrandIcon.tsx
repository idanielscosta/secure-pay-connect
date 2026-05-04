type Brand = "visa" | "mastercard" | "elo" | "amex" | "hipercard" | "diners" | "unknown";

export const detectBrand = (number: string): Brand => {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2(2[2-9]|[3-6]|7[01]|720))/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(4011|4312|4389|4514|4573|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(n)) return "elo";
  if (/^(606282|3841)/.test(n)) return "hipercard";
  if (/^(36|30[0-5]|3095|38|39)/.test(n)) return "diners";
  return "unknown";
};

const base = "inline-flex items-center justify-center rounded-md font-bold text-[10px] tracking-tight select-none";

export const CardBrandIcon = ({ brand, size = "md" }: { brand: Brand; size?: "sm" | "md" | "lg" }) => {
  const dims = size === "lg" ? "h-9 w-14 text-xs" : size === "sm" ? "h-5 w-8 text-[8px]" : "h-7 w-11 text-[10px]";

  switch (brand) {
    case "visa":
      return (
        <div className={`${base} ${dims} bg-white text-[#1a1f71] border border-slate-200 italic`}>
          <span className="font-extrabold tracking-wider">VISA</span>
        </div>
      );
    case "mastercard":
      return (
        <div className={`${base} ${dims} bg-white border border-slate-200 relative overflow-hidden`}>
          <div className="flex">
            <div className="h-3 w-3 rounded-full bg-[#eb001b]" />
            <div className="h-3 w-3 rounded-full bg-[#f79e1b] -ml-1.5 mix-blend-multiply" />
          </div>
        </div>
      );
    case "amex":
      return (
        <div className={`${base} ${dims} bg-[#2e77bb] text-white`}>
          <span className="font-bold text-[8px] leading-none text-center">AMEX</span>
        </div>
      );
    case "elo":
      return (
        <div className={`${base} ${dims} bg-black text-white`}>
          <span className="font-bold italic">elo</span>
        </div>
      );
    case "hipercard":
      return (
        <div className={`${base} ${dims} bg-[#b3131b] text-white`}>
          <span className="font-bold text-[8px]">Hiper</span>
        </div>
      );
    case "diners":
      return (
        <div className={`${base} ${dims} bg-white border border-slate-200 text-[#0079be]`}>
          <span className="font-bold text-[7px] leading-none text-center">DINERS</span>
        </div>
      );
    default:
      return (
        <div className={`${base} ${dims} bg-muted text-muted-foreground border border-border`}>
          <span>CARD</span>
        </div>
      );
  }
};
