// Built using Hyperiux Vault: https://vault.hyperiux.com

// Built using Hyperiux Vault: https://vault.hyperiux.com
//Filev :- components/effects/zoom-slider/index.tsx
import { ZoomSliderComp, type ZoomSliderItem } from "./ZoomSliderComp";

const ZoomSlider = ({
  scaleOnHover = true,
  textOnHover = true,
  size = 1,
  easeScrollPercentage = 100,
}: {
  scaleOnHover?: boolean;
  textOnHover?: boolean;
  size?: number;
  easeScrollPercentage?: number;
}) => {
  return (
    <ZoomSliderComp
      title="Previous projects"
      subheading="Scroll to explore "
      sliderData={DEFAULT_SLIDER_DATA}
      scaleOnHover={scaleOnHover}
      textOnHover={textOnHover}
      size={size}
      easeScrollPercentage={easeScrollPercentage}
    />
  );
};

export default ZoomSlider;

const DEFAULT_SLIDER_DATA: ZoomSliderItem[] = [
  {
    number: "01",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-09.jpg",
    title: "Aura",
    desc: "Soft light and atmospheric tones",
  },
  {
    number: "02",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-07.jpg",
    title: "Drift",
    desc: "Floating through silence",
  },
  {
    number: "03",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-03.jpg",
    title: "Form",
    desc: "Shapes carved by light",
  },
  {
    number: "04",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-08.jpg",
    title: "Flow",
    desc: "Smooth transitions in motion",
  },
  {
    number: "05",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-05.jpg",
    title: "Depth",
    desc: "Layers and visual weight",
  },
  {
    number: "06",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-06.jpg",
    title: "Energy",
    desc: "Movement captured in time",
  },
  {
    number: "07",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-02.jpg",
    title: "Glitch",
    desc: "Breaking visual boundaries",
  },
  {
    number: "08",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-08.jpg",
    title: "Frame-X",
    desc: "Cinematic still frame",
  },
  {
    number: "09",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-01.jpg",
    title: "Lightplay",
    desc: "Contrast and highlights",
  },
  {
    number: "10",
    src: "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/h-05.jpg",
    title: "Minimal",
    desc: "Less but stronger",
  },
];
