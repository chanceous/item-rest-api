import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ItemPage } from './pages/ItemPage';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/items/:slug', element: <ItemPage /> },
]);

export const App: React.FC = () => <RouterProvider router={router} />;