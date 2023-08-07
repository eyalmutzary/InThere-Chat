import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, height= device-height, initial-scale=1, shrink-to-fit=no';
document.head.appendChild(meta);

createRoot(document.getElementById('root')).render(<App/>);
