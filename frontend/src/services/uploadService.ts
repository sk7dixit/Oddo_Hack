import axios from "axios";
import api from './api';

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; 
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary Upload Error Details:", error.response?.data || error.message);
    throw error;
  }
};

export const uploadProfilePhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await api.post('/user/profile-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  return response.data.url;
};

export const uploadService = {
  uploadProfilePhoto,
  uploadImage
};
