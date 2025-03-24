import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function WebImage({ imgSrc }: { imgSrc: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!imgSrc) return;

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        setImageUrl(imgSrc.startsWith('/uploads') ? `${backendUrl}${imgSrc}` : imgSrc);
        
    }, [imgSrc]);

    if (!imageUrl) return null; // Prevent rendering if the image URL isn't ready

    return (
        <Image
            src={imageUrl}
            alt="Shop Image"
            fill
            priority
            className="object-cover rounded-t-lg"
        />
    );
}
