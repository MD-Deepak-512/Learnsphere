'use client';

import React, { useState, useEffect } from 'react';

interface TypingTextProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export default function TypingText({ text, speed = 10, onComplete }: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, onComplete]);

    return <>{displayedText}</>;
}
