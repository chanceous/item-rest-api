import React from 'react';
import { StarIcon } from '../icons';

export const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({
                                                                                  rating,
                                                                                  reviewCount,
                                                                              }) => (
    <div className="flex items-center gap-2">
    <span className="text-sm text-meli-lightgray hover:underline cursor-pointer">
      {rating}
    </span>
        <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                        i < Math.round(rating) ? 'text-meli-blue' : 'text-meli-lightgray'
                    }`}
                />
            ))}
        </div>
        <span className="text-sm text-meli-lightgray hover:underline cursor-pointer">
      ({reviewCount})
    </span>
    </div>
);