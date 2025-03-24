'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './banner.module.css';

export default function Banner() {
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];
    const [index, setIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); 

    const nextImage = () => {
        setIndex((prevIndex) => (prevIndex + 1) % covers.length);
    };

    const resetTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current); 
        intervalRef.current = setInterval(nextImage, 5000);
    };

    const handleDotClick = (newIndex: number) => {
        setIndex(newIndex);
        resetTimer(); 
    };

    useEffect(() => {
        resetTimer();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [index]);

    return (
        <div className={styles.banner}>
            <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="absolute w-full h-full"
                    >
                        <Image 
                            src={covers[index]} 
                            alt="cover" 
                            fill={true} 
                            priority 
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 p-5">
                <h1 className="text-4xl font-medium font-sans">Relax, Rejuvenate, and Restore – Find Your Perfect Massage Experience</h1>
                <h3 className="text-xl font-serif mt-2">
                    Discover top-rated massage therapists near you. Book your next session effortlessly and indulge in relaxation like never before.
                </h3>
            </div>


            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {covers.map((_, i) => (
                    <button 
                        key={i} 
                        className={`w-3 h-3 rounded-full transition-all duration-300 
                                    ${i === index ? 'bg-white w-4 h-4' : 'bg-gray-400'}`}
                        onClick={() => handleDotClick(i)}
                    />
                ))}
            </div>
        </div>
    );
}
