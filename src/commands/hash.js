import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { showSuccess } from '../utils/index.js';
import { messages } from '../utils/colors.js';

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
      const fileHash = hash.digest('hex');
      console.log(messages.info(`SHA-256 hash of ${messages.file(path.basename(filePath))}:`));
      console.log(`  ${fileHash}`);
      showSuccess('Hash calculation completed');
      resolve();
    });

    stream.on('error', (_error) => {
      reject(new Error('Cannot calculate hash'));
    });
  });
}