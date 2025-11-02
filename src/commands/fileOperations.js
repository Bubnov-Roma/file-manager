import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export async function readFile(currentDirectory, filePath) {
  if (!filePath) {
    throw new Error('File path is required');
  }
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(currentDirectory, filePath);
  try {
    const stats = await fs.stat(absolutePath);
    if (!stats.isFile()) {
      throw new Error('Path is not a file');
    }
    const readStream = createReadStream(absolutePath, 'utf8');
    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    await new Promise((resolve, reject) => {
      readStream.on('end', resolve);
      readStream.on('error', reject);
    });
    console.log()
  } catch {
    throw new Error('Cannot read file')
  }
}

export async function createFile(currentDirectory, fileName) {
  if (!fileName) {
    throw new Error('File name is required');
  }
  const filePath = path.resolve(currentDirectory, fileName);
  try {
    await fs.writeFile(filePath, '')
  } catch {
    throw new Error('Cannot create file');
  }
}

export async function createDirectory(currentDirectory, dirName) {
  if (!dirName) {
    throw new Error('Directory name is required');
  }
  const dirPath = path.resolve(currentDirectory, dirName);
  try {
    await fs.mkdir(dirPath);
  } catch {
    throw new Error('Cannot create directory');
  }
}

export async function renameFile(currentDirectory, oldPath, newName) {
  if (!oldPath || !newName) {
    throw new Error('Both old path and new name are required');
  }
  const oldAbsolutePath = path.isAbsolute(oldPath)
    ? oldPath
    : path.resolve(currentDirectory, oldPath);
  const newAbsolutePath = path.resolve(path.dirname(oldAbsolutePath), newName);
  try {
    await fs.access(oldAbsolutePath);
    await fs.rename(oldAbsolutePath, newAbsolutePath);
  } catch {
    throw new Error('Cannot rename file');
  }
}

export async function copyFile(currentDirectory, sourcePath, targetDir) {
  if (!sourcePath || !targetDir) {
    throw new Error('Both source path and target directory are required');
  }
  const sourceAbsolutePath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(currentDirectory, sourcePath);

  const targetAbsolutePath = path.isAbsolute(targetDir)
    ? path.resolve(targetDir, path.basename(sourcePath))
    : path.resolve(currentDirectory, targetDir, path.basename(sourcePath));

  try {
    await fs.access(sourceAbsolutePath);
    await ensureDirectoryExists(path.dirname(targetAbsolutePath));
    const readStream = createReadStream(sourceAbsolutePath);
    const writeStream = createWriteStream(targetAbsolutePath);
    await pipeline(readStream, writeStream);
  } catch {
    throw new Error('Cannot copy file');
  }
}

export async function moveFile(currentDirectory, sourcePath, targetDir) {
  if (!sourcePath || !targetDir) {
    throw new Error('Both source path and target directory are required');
  }

  const sourceAbsolutePath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(currentDirectory, sourcePath);

  const targetAbsolutePath = path.isAbsolute(targetDir)
    ? path.resolve(targetDir, path.basename(sourcePath))
    : path.resolve(currentDirectory, targetDir, path.basename(sourcePath));

  try {
    await copyFile(currentDirectory, sourceAbsolutePath, targetAbsolutePath);
    await fs.unlink(sourceAbsolutePath);
  } catch {
    throw new Error('Cannot move file');
  }
}

export async function deleteFile(currentDirectory, filePath) {
  if (!filePath) {
    throw new Error('File path is required');
  }
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(currentDirectory, filePath);
  try {
    await fs.unlink(absolutePath);
  } catch {
    throw new Error('Cannot delete file');
  }
}