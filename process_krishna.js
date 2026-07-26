const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const originalPath = './public/images/krishna-lineart-transparent.png';
  const coloredPath = 'C:/Users/romeo/.gemini/antigravity/brain/ed096802-30a7-41b1-9d53-f9d9b7ac205a/colored_krishna_1785038215549.png';
  const outputPath = './public/images/krishna-colored-final.png';

  try {
    // 1. Get colored image buffer
    const coloredBuffer = await fs.promises.readFile(coloredPath);
    
    // 2. Remove white background from colored image
    const { data, info } = await sharp(coloredBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Loop through pixels and make near-white pixels transparent
    // Also slightly feather the edges
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      // If color is near white, make it transparent
      if (r > 240 && g > 240 && b > 240) {
        data[i+3] = 0; // Fully transparent
      } else if (r > 230 && g > 230 && b > 230) {
        // Smooth transition
        data[i+3] = Math.max(0, 255 - ((r - 230) * 10));
      }
    }

    const coloredTransparent = await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toBuffer();

    // 3. Composite original line art OVER the colored fills
    // This absolutely guarantees the user's exact line art is preserved.
    await sharp(coloredTransparent)
      .composite([{
        input: originalPath,
        blend: 'over'
      }])
      .toFile(outputPath);

    console.log("Successfully created colored Krishna with transparent background and original line-art.");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

processImage();
