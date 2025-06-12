import React, { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
    altText: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
                                                              images,
                                                              altText,
                                                          }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 order-last md:order-none justify-center">
                {images.slice(0, 7).map((img, index) => (
                    <div
                        key={index}
                        className={`w-12 h-12 border rounded-md p-1 cursor-pointer hover:border-meli-blue ${
                            mainImage === img ? 'border-meli-blue' : 'border-gray-200'
                        }`}
                        onMouseEnter={() => setMainImage(img)}
                    >
                        <img
                            src={img}
                            alt={`thumbnail ${index + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>
            <div className="flex-1 flex justify-center items-start">
                <img
                    src={mainImage}
                    alt={altText}
                    className="w-auto h-auto max-w-full max-h-[500px] object-contain"
                />
            </div>
        </div>
    );
};