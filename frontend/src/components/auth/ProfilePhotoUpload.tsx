import React, { useState, useRef, useEffect } from 'react';
import { uploadService } from '../../services/uploadService';

interface ProfilePhotoUploadProps {
  currentAvatar?: string;
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ currentAvatar, onUploadSuccess, onUploadError }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent browser from restoring old values on refresh
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only proceed on real user interaction
    if (!e.isTrusted && !e.target.files?.length) return;
    
    const file = e.target.files?.[0];
    if (!file) return;

    // Image Validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      onUploadError('Please select a valid image (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      onUploadError('File size must be less than 2MB');
      return;
    }

    // Local Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Real Upload using Axios
    try {
      setUploading(true);
      const url = await uploadService.uploadProfilePhoto(file);
      onUploadSuccess(url);
      setPreview(null);
    } catch (err: any) {
      onUploadError(err.message || 'Failed to upload photo');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' }}>
      <div 
        onClick={triggerUpload}
        style={{ 
          width: '100%', 
          height: '100%', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '3rem', 
          border: '4px solid var(--glass-border)',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}
        className="avatar-container"
      >
        {(preview || currentAvatar) ? (
          <img 
            src={preview || currentAvatar} 
            alt="Profile" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: uploading ? 0.4 : 1,
              transition: 'opacity 0.3s'
            }} 
          />
        ) : (
          '👤'
        )}

        {/* Hover Camera Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: uploading ? 1 : 0,
          transition: 'opacity 0.2s',
          fontSize: '1.5rem',
          color: 'white'
        }}
        className="upload-overlay"
        onMouseEnter={(e) => !uploading && (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => !uploading && (e.currentTarget.style.opacity = '0')}
        >
          {uploading ? (
            <div className="spinner"></div>
          ) : (
            '📷'
          )}
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {uploading && (
        <div style={{ 
          position: 'absolute', 
          bottom: '-12px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: 'var(--primary)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          zIndex: 10,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          UPLOADING...
        </div>
      )}

      <style>{`
        .avatar-container:hover .upload-overlay {
          opacity: 1;
        }
        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProfilePhotoUpload;
