require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const main = async () => {
  /* await sharp('sample_image.jpg')
    .clone()
    .resize(50)
    .toFile('sample_image_50.jpg');

  await sharp('sample_image.jpg')
    .clone()
    .jpeg({ quality: 50 })
    .toFile('sample_image_quality_50.jpg'); */

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.CONNECTION_STRING
  );

  const containerClient = blobServiceClient.getContainerClient(
    process.env.CONTAINER_NAME
  );

  const blobName = `${uuidv4()}.jpg`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const buffer = await sharp('sample_image.jpg')
    .jpeg({ quality: 50 })
    .toBuffer();

  const uploadBlobResponse = await blockBlobClient.upload(
    buffer,
    buffer.length
  );

  console.log(
    `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
  );
};

main().catch((err) => {
  console.log(err);
});
