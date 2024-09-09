import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configuración de __dirname en un módulo ES6
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);