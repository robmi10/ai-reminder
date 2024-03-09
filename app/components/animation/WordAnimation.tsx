import React, { useState, useEffect, useRef } from 'react';

type Props = {
    text: string,
    delay: number
}

export const WordByWordRenderer = ({ text, delay }: Props) => {
    const [displayedWords, setDisplayedWords] = useState<string[]>([]);
    const words = text.split(' ');
    const endOfTextRef = useRef<any>(null);

    const scrollToBottom = () => {
        endOfTextRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (words.length > 0) {
            const interval = setInterval(() => {
                setDisplayedWords(currentWords => {
                    const nextWordIndex = currentWords.length;
                    if (nextWordIndex < words.length) {
                        return [...currentWords, words[nextWordIndex]];
                    } else {
                        clearInterval(interval);
                        return currentWords;
                    }
                });
            }, delay);

            return () => clearInterval(interval);
        }
    }, [words, delay]);

    useEffect(() => {
        scrollToBottom();
    }, [displayedWords]);

    return (
        <div className='text-black w-64 text-sm font-medium'>
            {displayedWords.join(' ')}
            <div ref={endOfTextRef} />
        </div>
    );
};
