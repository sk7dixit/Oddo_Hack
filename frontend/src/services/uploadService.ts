import api from './api';

export const uploadService = {
  uploadProfilePhoto: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await api.post('/user/profile-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        console.log(`Upload progress: ${percentCompleted}%`);
      },
    });

    return response.data.url;
  }
};
