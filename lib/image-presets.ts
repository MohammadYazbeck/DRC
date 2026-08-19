export type ImagePresetKey =
  | "hero"
  | "productCard"
  | "productDetail"
  | "productBanner"
  | "productOption"
  | "logo"
  | "insight";

export type ImagePreset = {
  label: string;
  width: number;
  height: number;
  mode: "contain" | "cover";
  output: "image/png" | "image/jpeg";
  background: "transparent" | "white";
};

export const imagePresets: Record<ImagePresetKey, ImagePreset> = {
  hero: {
    label: "Hero image",
    width: 2400,
    height: 1500,
    mode: "cover",
    output: "image/jpeg",
    background: "white"
  },
  productCard: {
    label: "Product card",
    width: 1600,
    height: 1600,
    mode: "contain",
    output: "image/png",
    background: "transparent"
  },
  productDetail: {
    label: "Product page image",
    width: 1800,
    height: 1200,
    mode: "contain",
    output: "image/png",
    background: "transparent"
  },
  productBanner: {
    label: "Product banner",
    width: 2400,
    height: 460,
    mode: "contain",
    output: "image/png",
    background: "transparent"
  },
  productOption: {
    label: "Product option",
    width: 1600,
    height: 1600,
    mode: "contain",
    output: "image/png",
    background: "transparent"
  },
  logo: {
    label: "Brand logo",
    width: 800,
    height: 400,
    mode: "contain",
    output: "image/png",
    background: "transparent"
  },
  insight: {
    label: "News / blog thumbnail",
    width: 1200,
    height: 800,
    mode: "cover",
    output: "image/jpeg",
    background: "white"
  }
};

export function imagePresetText(key: ImagePresetKey) {
  const preset = imagePresets[key];
  return `${preset.label}: ${preset.width}x${preset.height}px`;
}
