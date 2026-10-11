
const bengaliNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

export const formatPrice = (price: number) => {
  return `${new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price)} টাকা`;
};

export const formatUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return `প্রতি ${units[unit.toLowerCase()] ?? unit}`;
};

export const formatChange = (pct: number) => {
  return bengaliNumber.format(Math.abs(pct));
};
