import path from "path";
import cloudinary from "../config/cloudinary.js";

export const uploadImageBuffer = (file, folder) =>
  new Promise((resolve, reject) => {
    const extension = path.extname(file.originalname || "") || ".jpg";
    const publicId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: publicId,
        format: extension.replace(".", "").toLowerCase() || undefined,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    uploadStream.end(file.buffer);
  });

export const deleteImageByPublicId = async (publicId) => {
  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};
