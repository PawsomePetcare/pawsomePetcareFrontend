import React, { useEffect } from 'react';

const ImageRenderer = ({ src, alt = 'Image', className = '' }) => {
    useEffect(() => { console.log('Image src:', src); }, [src]);
    
    return (
        <div className={`image-container ${className}`}>
            <img src={src} alt={alt} className="image" />
        </div>
    );
};

export default ImageRenderer;
