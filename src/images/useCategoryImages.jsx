import cpu from "./cpu.webp";
import gpu from "./gpu.webp";
import ram from "./ram.webp";
import motherboard from "./motherboard.webp";
import storage from "./storage.webp";
import case_ from "./case.webp";
import psu from "./psu.webp";

const categoryImages = {
  CPU: cpu,
  GPU: gpu,
  RAM: ram,
  Motherboard: motherboard,
  Storage: storage,
  PSU: psu,
  Case: case_,
};

const useCategoryImage = (category) => {
  return categoryImages[category] || null;
};

export default useCategoryImage;