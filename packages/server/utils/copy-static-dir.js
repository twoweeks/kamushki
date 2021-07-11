import { copy } from 'fs-extra';
import { cwd } from 'process';
import { join } from 'path';

const __dirname = cwd();

const staticDir = join(__dirname, 'src', 'static');

const outputDir = join(__dirname, 'dist', 'static');

copy(staticDir, outputDir);
