const sharp = require('sharp');
const fs = require('fs');

async function enhanceKrishna() {
  const inputPath = './public/images/krishna-colored-final.png';
  const outputPath = './public/images/krishna-colored-enhanced.png';

  try {
    // We want to make the colors richer, deeper, and more jewel-toned.
    // 1. Increase saturation by 60%
    // 2. Slightly increase contrast using linear(multiplier, offset)
    // 3. Keep lightness roughly the same or slightly darker for richness.
    
    // Let's use modulate for saturation and lightness
    // And linear for contrast
    await sharp(inputPath)
      .modulate({
        saturation: 1.6,   // Increase saturation by 60%
        brightness: 0.95   // Slightly darken to make it feel richer instead of washed out
      })
      .linear(1.15, -0.05 * 255) // Increase contrast: multiplier 1.15, offset -5%
      .toFile(outputPath);

    console.log("Successfully enhanced Krishna colors.");
  } catch (error) {
    console.error("Error enhancing image:", error);
  }
}

enhanceKrishna();
