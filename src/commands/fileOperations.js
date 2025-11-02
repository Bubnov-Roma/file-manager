import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { ensureDirectoryExists, showSuccess, fileExists } from '../utils/index.js';
import { messages } from '../utils/colors.js';

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
    console.log(messages.info(`Content of ${messages.file(absolutePath)}:`));
    console.log('─'.repeat(50));

    const readStream = createReadStream(absolutePath, 'utf8');
    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    await new Promise((resolve, reject) => {
      readStream.on('end', resolve);
      readStream.on('error', reject);
    });
    console.log('\n' + '─'.repeat(50));
    showSuccess('File read completed');
  } catch (error) {
    throw new Error(`Cannot read file: ${error.message}`);
  }
}

export async function createFile(currentDirectory, fileName) {
  if (!fileName) {
    throw new Error('File name is required');
  }
  const filePath = path.resolve(currentDirectory, fileName);
  try {
    await fs.writeFile(filePath, '');
    showSuccess(`File ${messages.file(fileName)} created successfully`);
  } catch (error) {
    throw new Error(`Cannot create file: ${error.message}`);
  }
}

export async function createDirectory(currentDirectory, dirName) {
  if (!dirName) {
    throw new Error('Directory name is required');
  }
  const dirPath = path.resolve(currentDirectory, dirName);
  try {
    await fs.mkdir(dirPath);
    showSuccess(`Directory ${messages.directory(dirName)} created successfully`);
  } catch (error) {
    throw new Error(`Cannot create directory: ${error.message}`);
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
    if (!await fileExists(oldAbsolutePath)) {
      throw new Error('Source file does not exist');
    }
    await fs.rename(oldAbsolutePath, newAbsolutePath);
    showSuccess(`File renamed from ${messages.file(path.basename(oldPath))} to ${messages.file(newName)}`);
  } catch (error) {
    throw new Error(`Cannot rename file: ${error.message}`);
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
    if (!await fileExists(sourceAbsolutePath)) {
      throw new Error('Source file does not exist');
    }
    await ensureDirectoryExists(path.dirname(targetAbsolutePath));
    if (!isSubdirectory(currentDirectory, path.dirname(targetAbsolutePath))) {
      throw new Error('Target directory is not valid');
    }
    const readStream = createReadStream(sourceAbsolutePath);
    const writeStream = createWriteStream(targetAbsolutePath);
    await pipeline(readStream, writeStream);
    showSuccess(`File ${messages.file(path.basename(sourcePath))} copied to ${messages.path(targetDir)}`);
  } catch (error) {
    throw new Error(`Cannot copy file: ${error.message}`);
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
    if (!await fileExists(sourceAbsolutePath)) {
      throw new Error('Source file does not exist');
    }
    await ensureDirectoryExists(path.dirname(targetAbsolutePath));
    if (!isSubdirectory(currentDirectory, path.dirname(targetAbsolutePath))) {
      throw new Error('Target directory is not valid');
    }
    const readStream = createReadStream(sourceAbsolutePath);
    const writeStream = createWriteStream(targetAbsolutePath);
    await pipeline(readStream, writeStream);
    await fs.unlink(sourceAbsolutePath);
    showSuccess(`File ${messages.file(path.basename(sourcePath))} moved to ${messages.path(targetDir)}`);
  } catch (error) {
    throw new Error(`Cannot move file: ${error.message}`);
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
    const stats = await fs.stat(absolutePath);
    if (!stats.isFile()) {
      throw new Error('Path is not a file');
    }
    await fs.unlink(absolutePath);
    showSuccess(`File ${messages.file(path.basename(filePath))} deleted successfully`);
  } catch (error) {
    throw new Error(`Cannot delete file: ${error.message}`);
  }
}