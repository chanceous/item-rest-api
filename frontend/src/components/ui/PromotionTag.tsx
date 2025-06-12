import React from 'react';

interface PromotionTagProps {
    text: string;
}

export const PromotionTag: React.FC<PromotionTagProps> = ({ text }) => {
    return (
        <div className="inline-block bg-meli-blue/15 text-meli-blue text-xs font-semibold px-2.5 py-1 rounded">
            {text}
        </div>
    );
};