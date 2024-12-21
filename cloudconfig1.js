const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
   
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "wanderlust_DEV",
      allowerdFormat: ["png","jpg","jpeg"],
    },
    
});

// cloudinary.uploader.upload(storage, { folder: 'sample_folder' })
//   .then(result => {
//     console.log('Upload successful:', result);
//   })
//   .catch(error => {
//     console.error('Error occurred:', error.message);
//   });

module.exports = {
    cloudinary,
    storage,
}