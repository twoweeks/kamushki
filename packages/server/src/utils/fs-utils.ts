import { join } from 'path';
import { createReadStream, ReadStream } from 'fs';

export const readStaticFileStream = (staticPath: string, fileName: string, charset = 'utf-8'): ReadStream => {
    return createReadStream(join(staticPath, fileName), charset);
};
