import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const StaticPath = join(__dirname, 'static');
