const sharp = require('sharp');

const main = async () => {
  await sharp('sample_image.jpg')
    .clone()
    .resize(50)
    .toFile('sample_image_50.jpg');

  await sharp('sample_image.jpg')
    .clone()
    .jpeg({ quality: 50 })
    .toFile('sample_image_quality_50.jpg');
};

main().catch((err) => {
  console.log(err);
});
