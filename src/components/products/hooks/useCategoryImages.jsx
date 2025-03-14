import cpu from "../../../images/cpu.webp";
import gpu from "../../../images/gpu.webp";
import ram from "../../../images/ram.webp";
import motherboard from "../../../images/motherboard.webp";
import storage from "../../../images/storage.webp";
// import case from "../../images/case.webp";

const categoryImages = {
  CPU: cpu,
  GPU: gpu,
  RAM: ram,
  Motherboard: motherboard,
  Storage : storage,
//   case: case,
};

const useCategoryImage = (category) => {
  return categoryImages[category] || null; 
};

export default useCategoryImage;