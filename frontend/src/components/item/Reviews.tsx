import React from 'react';
import { Item } from '../../types/item';
import { StarIcon, ThumbsUpIcon } from '../icons';

interface Review {
    id: number;
    rating: number;
    date: string;
    review: string;
    likes: number;
}

interface ReviewsProps {
    item: Item;
}

const StarRatingDisplay: React.FC<{ rating: number; size?: string }> = ({
                                                                            rating,
                                                                            size = 'h-5 w-5',
                                                                        }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
            <StarIcon
                key={index}
                className={`${size} ${
                    index < rating ? 'text-meli-blue' : 'text-gray-300'
                }`}
            />
        ))}
    </div>
);

export const Reviews: React.FC<ReviewsProps> = ({ item }) => {
    const ratingDistribution = { 5: 75, 4: 15, 3: 5, 2: 2, 1: 3 };
    const featureRatings = [
        { name: 'Relación precio-calidad', rating: 5 },
        { name: 'Calidad de materiales', rating: 4 },
        { name: 'Brillo', rating: 4 },
        { name: 'Durabilidad', rating: 4 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 py-8">
            <div className="md:col-span-1 mb-8 md:mb-0">
                <div className="flex items-center space-x-2">
                    <p className="text-5xl font-light">
                        {item.rating?.toFixed(1)}
                    </p>
                    <div>
                        <StarRatingDisplay rating={Math.round(item.rating || 0)} />
                        <p className="text-sm text-gray-500">
                            {item.reviews?.length} calificaciones
                        </p>
                    </div>
                </div>
                <div className="mt-4 space-y-1">
                    {Object.entries(ratingDistribution)
                        .reverse()
                        .map(([stars, percentage]) => (
                            <div key={stars} className="flex items-center text-sm">
                                <span className="w-12 text-gray-600">{stars}</span>
                                <div className="flex-grow bg-gray-200 rounded-full h-1.5 mx-2">
                                    <div
                                        className="bg-gray-500 h-1.5 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                </div>

                <h3 className="font-semibold mt-8 mb-4">Calificación de características</h3>
                <div className="space-y-3">
                    {featureRatings.map((feature) => (
                        <div key={feature.name}>
                            <p className="text-sm">{feature.name}</p>
                            <StarRatingDisplay rating={feature.rating} size="h-4 w-4" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:col-span-2">
                <h3 className="text-xl font-semibold">Opiniones destacadas</h3>
                <p className="text-sm text-gray-500">{item.reviews?.length} comentarios</p>

                <div className="space-y-6">
                    {item.reviews?.map((review: Review) => (
                        <div key={review.id}>
                            <div className="flex justify-between items-center">
                                <StarRatingDisplay rating={review.rating} />
                                <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="mt-2 text-sm">{review.review}</p>
                            <button className="flex items-center border rounded-full px-3 py-1 mt-3 text-sm text-gray-700 hover:bg-gray-100">
                                <ThumbsUpIcon className="h-4 w-4 mr-1.5" /> Es útil{' '}
                                <span className="ml-2 font-semibold">{review.likes}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};