import React from 'react';
import { Play } from 'lucide-react';
import { isVideo, isYoutube } from '../utils/media';

// Shows a still for any gallery item. Local videos show their first frame.
const MediaThumb: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  if (isYoutube(src)) {
    return (
      <div className={`flex items-center justify-center bg-wash text-faint ${className}`}>
        <Play size={22} />
      </div>
    );
  }
  if (isVideo(src)) {
    return <video src={`${src}#t=0.1`} muted playsInline preload="metadata" className={`object-cover ${className}`} />;
  }
  return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
};

export default MediaThumb;
