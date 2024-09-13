import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import Tailwind
import { RouterProvider } from 'react-router-dom';
import Router from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={ Router } >

 </RouterProvider>
);
