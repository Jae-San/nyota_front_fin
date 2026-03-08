import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'; // Ajoutez cet import
import './index.css'
import App from './App.jsx'
import "./styles/theme.css";

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Ajoutez le Provider ici */}
    <PrimeReactProvider value={{ ripple: true }}> 
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)