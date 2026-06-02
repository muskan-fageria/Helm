const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../temp-extracted');
const destDir = path.join(__dirname, '../public/sequence');

// Ensure output directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function processImages() {
  console.log('Starting image processing sequence...');
  
  const totalFrames = 120;
  const sourceFrames = 156;
  
  for (let i = 0; i < totalFrames; i++) {
    // Map frame index i (0..119) to source index (1..156)
    const sourceIndex = Math.floor((i * (sourceFrames - 1)) / (totalFrames - 1)) + 1;
    const paddedIndex = String(sourceIndex).padStart(3, '0');
    
    const srcFileName = `ezgif-frame-${paddedIndex}.jpg`;
    const srcFilePath = path.join(srcDir, srcFileName);
    const destFilePath = path.join(destDir, `frame_${i}.webp`);
    
    if (!fs.existsSync(srcFilePath)) {
      console.error(`Source file not found: ${srcFilePath}`);
      continue;
    }
    
    try {
      await sharp(srcFilePath)
        .webp({ quality: 80, effort: 4 }) // WebP conversion with high optimization speed (effort 4)
        .toFile(destFilePath);
        
      if (i % 20 === 0 || i === totalFrames - 1) {
        console.log(`Processed ${i + 1}/${totalFrames} frames...`);
      }
    } catch (err) {
      console.error(`Error processing frame ${i} (${srcFileName}):`, err);
    }
  }
  
  console.log('All frames processed successfully!');
}

processImages();
