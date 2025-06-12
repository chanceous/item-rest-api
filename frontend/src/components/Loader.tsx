import React from 'react';

export const Loader: React.FC = () => (
    <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-meli-blue"></div>
    </div>
);