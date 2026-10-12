import React from 'react';

const Cover: React.FC<{ src: string; className?: string }> = ({ src, className = '' }) => (
  <img
    src={src}
    alt=""
    loading="lazy"
    className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${className}`}
  />
);

export default Cover;
