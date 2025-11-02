import fs from 'fs/promises';
import path from 'path';
import { messages } from './colors.js';

export function displayCurrentDirectory(currentDirectory) {
  console.log(messages.info(`You are currently in ${messages.path(currentDirectory)}`));
}

export async function isValidPath(params) {
  try {
    await fs.access(params);
    return true;
  } catch {
    return false;
  }
}

export function isSubdirectory(parent, child) {
  try {
    const relative = path.relative(parent, child);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
  } catch (error) {
    return false;
  }
}

export async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    throw new Error(`Cannot create directory: ${dirPath}`);
  }
}

export function isRootDirectory(dirPath) {
  const resolvedPath = path.resolve(dirPath);
  if (os.platform() === 'win32') {
    return path.parse(resolvedPath).root === resolvedPath;
  } else {
    return resolvedPath === '/';
  }
}

export function showSuccess(message) {
  console.log(messages.success(message));
}

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}