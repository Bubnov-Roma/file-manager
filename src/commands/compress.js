import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { ensureDirectoryExists, showSuccess } from '../utils/index.js';
import { messages } from '../utils/colors.js';

export async function compressFile(currentDirectory, sourcePath, targetPath) {
  if (!sourcePath || !targetPath) {
    throw new Error('Both source path and target path are required');
  }

  const sourceAbsolutePath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(currentDirectory, sourcePath);

  const targetAbsolutePath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(currentDirectory, targetPath);

  try {
    await ensureDirectoryExists(path.dirname(targetAbsolutePath));
    const readStream = createReadStream(sourceAbsolutePath);
    const writeStream = createWriteStream(targetAbsolutePath);
    const compressStream = createBrotliCompress();
    await pipeline(readStream, compressStream, writeStream);
    showSuccess(`File ${messages.file(path.basename(sourcePath))} compressed to ${messages.file(path.basename(targetPath))}`);
  } catch {
    throw new Error('Cannot compress file');
  }
}

export async function decompressFile(currentDirectory, sourcePath, targetPath) {
  if (!sourcePath || !targetPath) {
    throw new Error('Both source path and target path are required');
  }

  const sourceAbsolutePath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(currentDirectory, sourcePath);

  const targetAbsolutePath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(currentDirectory, targetPath);

  try {
    await ensureDirectoryExists(path.dirname(targetAbsolutePath));
    const readStream = createReadStream(sourceAbsolutePath);
    const writeStream = createWriteStream(targetAbsolutePath);
    const decompressStream = createBrotliDecompress();
    await pipeline(readStream, decompressStream, writeStream);
    showSuccess(`File ${messages.file(path.basename(sourcePath))} decompressed to ${messages.file(path.basename(targetPath))}`);
  } catch {
    throw new Error('Cannot decompress file');
  }
}