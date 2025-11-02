import fs from 'fs/promises';
import path from 'path';

export function displayCurrentDirectory(currentDirectory) {
  console.log(`You are currently in ${currentDirectory}`);
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