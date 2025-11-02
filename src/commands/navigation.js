import fs from 'fs/promises';
import path from 'path';
import { isValidPath } from '../utils/index.js';

export async function goUp(currentDirectory) {
  const parentDir = path.dirname(currentDirectory);
  if (parentDir !== currentDirectory) {
    try {
      await fs.access(parentDir);
      return { newDirectory: parentDir };
    } catch {
      throw new Error('Cannot go up')
    }
  }
  return { newDirectory: currentDirectory };
}

export async function changeDirectory(currentDirectory, targetPath) {
  if (!targetPath) {
    throw new Error('Path is required');
  }
  let newPath;
  if (path.isAbsolute(targetPath)) {
    newPath = targetPath;
  } else {
    newPath = path.resolve(currentDirectory, targetPath);
  }

  try {
    const stats = await fs.stat(newPath);
    if (!stats.isDirectory()) {
      throw new Error('Path is not a directory');
    }
    if (!await isValidPath(newPath)) {
      throw new Error('Invalid directory path');
    }
    return { newDirectory: newPath };
  } catch {
    throw new Error('Invalid directory path');
  }
}

export async function listDirectory(currentDirectory) {
  try {
    const items = await fs.readdir(currentDirectory, { withFileTypes: true });
    const directories = [];
    const files = [];
    for (const item of items) {
      if (item.isDirectory()) {
        directories.push({
          name: item.name,
          type: 'directory'
        });
      } else {
        files.push({
          name: item.name,
          type: 'file'
        });
      }
    }
    directories.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));
    console.log(`\nDirectory content:`);
    console.log('Type\t\tName');
    console.log('----\t\t----');
    directories.forEach(dir => {
      console.log(`directory\t${dir.name}`)
    });
    files.forEach(file => {
      console.log(`file\t\t${file.name}`)
    });
    console.log(`\nTotal: ${directories.length} directories, ${files.length} files`);
  } catch {
    throw new Error('Cannot read directory');
  }
}