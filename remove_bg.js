const sharp = require('sharp');
const fs = require('fs');

async function removeBackground() {
  const inputPath = './public/images/krishna-provided-raw.png';
  const outputPath = './public/images/krishna-transparent-final.png';

  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Assuming the background is pale/cream.
    // Let's sample the top-left corner as the background color.
    const bgR = data[0];
    const bgG = data[1];
    const bgB = data[2];

    const threshold = 15; // Tolerance

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];

      const diff = Math.sqrt(
        Math.pow(r - bgR, 2) + 
        Math.pow(g - bgG, 2) + 
        Math.pow(b - bgB, 2)
      );

      if (diff < threshold) {
        data[i+3] = 0; // Make transparent
      } else if (diff < threshold + 10) {
        // Feathering
        data[i+3] = Math.max(0, Math.floor(((diff - threshold) / 10) * 255));
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log("Successfully removed background.");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

removeBackground();
