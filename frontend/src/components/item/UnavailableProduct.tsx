import React from 'react';
import {Link} from 'react-router-dom';
import {PausedIcon} from '../icons';

interface UnavailableProductProps {
    title?: string,
    description?: string | null
    buttonText?: string,
}

export const UnavailableProduct: React.FC<UnavailableProductProps> = ({
                                                                          title,
                                                                          description = 'Error',
                                                                          buttonText,
                                                                      }) => {
    return (
        <div
            className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white min-h-[60vh] rounded-md">
            <PausedIcon className="h-16 w-16 text-gray-400 mb-4"/>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="max-w-md text-gray-500">{description}</p>
            <Link
                to={'/'}
                className="mt-6 bg-meli-blue text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
                {buttonText}
            </Link>
        </div>
    );
};