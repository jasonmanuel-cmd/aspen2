#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// List of image files to convert
const images = [
  'img_585-n-wendy-dr-newbury-park-ca.jpg',
  'img_kitchenfacinglivingroom.jpg',
  'img_livingroomfacingfireplace.jpg',
  'img_bathroom1.jpg',
  'img_Furnishedmasterbedroom1.jpg',
  'img_bedroom2.jpg',
  'img_backyard.jpg',
  'img_Diningroomfacingkitchen.jpg',
  'img_bathroom2.jpg',
  'img_livingroom.jpg',
  'img_masterbed2.jpg',
  'img_backyard1.jpg',
  'img_backyard2.jpg',
  'img_backyard3.jpg',
  'img_585-n-wendy-dr-newbury-park-ca-2.jpg',
  'img_585-n-wendy-dr-newbury-park-ca-4.jpg',
  'floorplan.png',
  'nathanael-harbison.jpg'
];

async function convertToWebP() {
  try {
    const sharp = require('sharp');
    let convertedCount = 0;
    let skippedCount = 0;

    console.log('🎬 Starting WebP conversion...\n');

    for (const image of images) {
      const inputPath = path.join(__dirname, image);
      const outputPath = path.join(__dirname, image.replace(/\.(jpg|png)$/i, '.webp'));

      // Check if input file exists
      if (!fs.existsSync(inputPath)) {
        console.log(`⏭️  Skipping ${image} (file not found)`);
        skippedCount++;
        continue;
      }

      // Check if WebP already exists
      if (fs.existsSync(outputPath)) {
        console.log(`✅ ${image.replace(/\.(jpg|png)$/i, '.webp')} already exists`);
        continue;
      }

      try {
        // Convert to WebP with quality 80 (good balance)
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);

        // Get file sizes
        const originalSize = fs.statSync(inputPath).size;
        const webpSize = fs.statSync(outputPath).size;
        const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${image} → ${image.replace(/\.(jpg|png)$/i, '.webp')} (${savings}% smaller)`);
        convertedCount++;
      } catch (error) {
        console.log(`❌ Error converting ${image}: ${error.message}`);
      }
    }

    console.log(`\n📊 Conversion complete!`);
    console.log(`   ✅ Converted: ${convertedCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('❌ sharp module not found. Installing...\n');
      const { execSync } = require('child_process');
      try {
        console.log('📦 Installing sharp package...');
        execSync('npm install sharp', { stdio: 'inherit', cwd: __dirname });
        console.log('\n✅ sharp installed. Please run this script again.\n');
      } catch (installError) {
        console.error('❌ Failed to install sharp:', installError.message);
        console.error('\nTo install manually, run:');
        console.error('  npm install sharp\n');
      }
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

convertToWebP();
