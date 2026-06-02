const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir1 = path.join(__dirname, '../temp-part1');
const srcDir2 = path.join(__dirname, '../temp-part2');
const destDir = path.join(__dirname, '../public/sequence');

// Ensure output directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function processAllImages() {
  console.log('Starting image processing sequence for combined animations...');
  
  let frameCounter = 0;

  // Process Part 1: 156 frames (ezgif-frame-001.jpg to ezgif-frame-156.jpg)
  const part1Count = 156;
  console.log(`Processing Part 1 (${part1Count} frames)...`);
  for (let i = 1; i <= part1Count; i++) {
    const paddedIndex = String(i).padStart(3, '0');
    const srcFileName = `ezgif-frame-${paddedIndex}.jpg`;
    const srcFilePath = path.join(srcDir1, srcFileName);
    const destFilePath = path.join(destDir, `frame_${frameCounter}.webp`);

    if (!fs.existsSync(srcFilePath)) {
      console.warn(`Part 1 frame missing: ${srcFileName}`);
      continue;
    }

    try {
      await sharp(srcFilePath)
        .webp({ quality: 80, effort: 4 })
        .toFile(destFilePath);
      
      if (frameCounter % 50 === 0) {
        console.log(`Processed frame ${frameCounter}...`);
      }
      frameCounter++;
    } catch (err) {
      console.error(`Error processing Part 1 frame ${srcFileName}:`, err);
    }
  }

  // Process Part 2: 216 frames (ezgif-frame-001.jpg to ezgif-frame-216.jpg)
  const part2Count = 216;
  console.log(`Processing Part 2 (${part2Count} frames)...`);
  for (let i = 1; i <= part2Count; i++) {
    const paddedIndex = String(i).padStart(3, '0');
    const srcFileName = `ezgif-frame-${paddedIndex}.jpg`;
    const srcFilePath = path.join(srcDir2, srcFileName);
    const destFilePath = path.join(destDir, `frame_${frameCounter}.webp`);

    if (!fs.existsSync(srcFilePath)) {
      console.warn(`Part 2 frame missing: ${srcFileName}`);
      continue;
    }

    try {
      await sharp(srcFilePath)
        .webp({ quality: 80, effort: 4 })
        .toFile(destFilePath);
      
      if (frameCounter % 50 === 0) {
        console.log(`Processed frame ${frameCounter}...`);
      }
      frameCounter++;
    } catch (err) {
      console.error(`Error processing Part 2 frame ${srcFileName}:`, err);
    }
  }

  console.log(`Combined processing complete. Total frames processed: ${frameCounter}`);
}

processAllImages();
