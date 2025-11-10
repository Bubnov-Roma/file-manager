import fs from 'fs/promises';
import path from 'path';
import { isValidPath, showSuccess, isRootDirectory } from '../utils/index.js';
import { messages } from '../utils/colors.js';

export async function goUp(currentDirectory) {
  const currentAbsolute = path.resolve(currentDirectory);
  const parentDir = path.dirname(currentAbsolute);
  if (parentDir === currentAbsolute) {
    showSuccess('Already at root directory');
    return { newDirectory: currentAbsolute };
  }
  try {
    await fs.access(parentDir);
    showSuccess(`Directory changed to parent directory`);
    return { newDirectory: parentDir };
  } catch (error) {
    throw new Error('Cannot go up: access denied');
  }
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
    showSuccess(`Directory changed to ${messages.path(newPath)}`)
    return { newDirectory: newPath };
  } catch (error) {
    throw new Error('Invalid directory path');
  }
}

function createConsoleTable(directories, files) {
  const allItems = [
    ...directories.map(item => ({ ...item, type: 'directory' })),
    ...files.map(item => ({ ...item, type: 'file' }))
  ];
  console.log(messages.path(`\nDirectory content (${directories.length} directories, ${files.length} files):`));
  const tableObject = {};
  allItems.forEach((item, index) => {
    tableObject[index] = {
      'Name': item.name,
      'Type': item.type
    };
  });

  console.table(tableObject);
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
    createConsoleTable(directories, files);
    console.log(`\nTotal - ${directories.length + files.length} items: ${messages.directory(`${directories.length} directories`)} ${messages.file(`${files.length} files`)}`);
    showSuccess('Directory listing completed');
  } catch {
    throw new Error('Cannot read directory');
  }
}