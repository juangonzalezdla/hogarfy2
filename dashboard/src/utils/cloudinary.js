import cloudinary from 'cloudinary-core';
import { v4 as uuidv4 } from "uuid";

const cl = new cloudinary.Cloudinary({ 
  cloud_name: 'dsfoscdww', 
  api_key: '826282682856161',
});

const uploadImage = async (file, publicId) => {
  return new Promise((resolve, reject) => {
    const fileName = `${uuidv4()}`;
    const folder = 'product_images';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'epukkowo');
    formData.append('public_id', `${folder}/${fileName}`);

    fetch(`https://api.cloudinary.com/v1_1/${cl.config().cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          resolve(data.secure_url);
        } else {
          reject('Error al cargar la imagen a Cloudinary');
        }
      })
      .catch(error => {
        console.error('Error al cargar la imagen a Cloudinary:', error);
        reject(error.message || 'Error al cargar la imagen a Cloudinary');
      });
  });
};

export { uploadImage };