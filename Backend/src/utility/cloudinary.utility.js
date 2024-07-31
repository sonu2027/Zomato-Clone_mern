// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     //upload the file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // file has been uploaded successfull
//     //console.log("file is uploaded on cloudinary ", response.url);
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
//     return null;
//   }
// };

// const deleteFromCloudinary = async (public_id) => {
//   return new Promise((resolve, reject) => {
//     // Delete the image from Cloudinary
//     console.log("delete for cloudinary called");
//     cloudinary.uploader.destroy(public_id, (error, result) => {
//       if (error) {
//         console.error("Error deleting image:", error);
//         reject(error);
//       } else {
//         console.log("Image deleted successfully:", result);
//         resolve(result);
//       }
//     });
//   });
// };

// export { uploadOnCloudinary, deleteFromCloudinary };

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", public_id: filename }, // Specify file type and optional public_id
        (error, result) => {
          if (error) {
            console.error("Error uploading file:", error);
            reject(error);
          } else {
            console.log("File uploaded successfully:", result);
            resolve(result);
          }
        }
      )
      .end(fileBuffer); // Pass the file buffer to the upload stream
  });
};

const deleteFromCloudinary = async (public_id) => {
  return new Promise((resolve, reject) => {
    // Delete the image from Cloudinary
    console.log("delete for cloudinary called");
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) {
        console.error("Error deleting image:", error);
        reject(error);
      } else {
        console.log("Image deleted successfully:", result);
        resolve(result);
      }
    });
  });
};

export { uploadOnCloudinary, deleteFromCloudinary };
