import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

export async function calculateHash(currentDirectory, filePath) {
  if (!filePath) {
    throw new Error('File path is required');
  }

  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(currentDirectory, filePath);

  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(absolutePath);

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      console.log(hash.digest('hex'));
      resolve();
    });

    stream.on('error', (error) => {
      reject(new Error('Cannot calculate hash'));
    });
  });
}