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
  const relative = path.relative(parent, child);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

export async function ensureDirectoryExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {
    throw new Error(`Cannot create directory: ${dirPath}`);
  }
}

export function isRootDirectory(dirPath) {
  if (os.platform() === 'win32') {
    return path.parse(dirPath).root === dirPath;
  } else {
    return dirPath === '/';
  }
}

export function normalizePath(filePath) {
  if (os.platform() === 'win32') {
    return filePath.replace(/\//g, '\\');
  }
  return filePath;
}

export function showSuccess(message) {
  console.log(messages.success(message));
}