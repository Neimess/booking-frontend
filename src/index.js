import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Подключаем Bootstrap CSS и наш кастомный
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
console.log('Mounting App…');
root.render(<App />);
