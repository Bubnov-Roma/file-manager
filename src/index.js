import os from 'os';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

import * as navigation from './commands/navigation.js';
import * as fileOperations from './commands/fileOperations.js';
import * as osInfo from './commands/osInfo.js';
import * as hash from './commands/hash.js';
import * as compress from './commands/compress.js';
import { displayCurrentDirectory } from './utils/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class FileManager {
  constructor(username) {
    this.username = username;
    this.currentDirectory = os.homedir();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    displayCurrentDirectory(this.currentDirectory);
    this.promptUser();
    this.rl.on('close', () => {
      console.log(`\nThank you for using File Manager, ${this.username}, goodbye!`);
      process.exit(0);
    });
  }
  promptUser() {
    this.rl.question('> ', async (input) => {
      try {
        await this.processCommand(input.trim());
      } catch (error) {
        console.log('Operation failed');
      } finally {
        this.promptUser();
      }
    });
  }
  async processCommand(input) {
    if (input === '') {
      return;
    }
    const [command, ...args] = input.split(' ');
    switch (command) {
      case 'up':
        await this.executeCommand(navigation.goUp, args);
        break;
      case 'cd':
        await this.executeCommand(navigation.changeDirectory, args, args[0]);
        break;
      case 'ls':
        await this.executeCommand(navigation.listDirectory, args);
        break;
      case 'cat':
        await this.executeCommand(fileOperations.readFile, args, args[0]);
        break;
      case 'add':
        await this.executeCommand(fileOperations.createFile, args, args[0]);
        break;
      case 'mkdir':
        await this.executeCommand(fileOperations.createDirectory, args, args[0]);
        break;
      case 'rn':
        await this.executeCommand(fileOperations.renameFile, args, args[0], args[1]);
        break;
      case 'cp':
        await this.executeCommand(fileOperations.copyFile, args, args[0], args[1]);
        break;
      case 'mv':
        await this.executeCommand(fileOperations.moveFile, args, args[0], args[1]);
        break;
      case 'rm':
        await this.executeCommand(fileOperations.deleteFile, args, args[0]);
        break;
      case 'os':
        await this.executeOSCommand(args);
        break;
      case 'hash':
        await this.executeCommand(hash.calculateHash, args, args[0]);
        break;
      case 'compress':
        await this.executeCommand(compress.compressFile, args, args[0], args[1]);
        break;
      case 'decompress':
        await this.executeCommand(compress.decompressFile, args, args[0], args[1]);
        break;
      case '.exit':
        this.rl.close();
        return;
      default:
        console.log('Invalid input');
    }
  }
  async executeCommand(commandFunc, _args, ...commandArgs) {
    try {
      const result = await commandFunc(this.currentDirectory, ...commandArgs);
      if (result && result.newDirectory) {
        this.currentDirectory = result.newDirectory;
      }
      displayCurrentDirectory(this.currentDirectory);
    } catch {
      console.log('Operation failed');
    }
  }

  async executeOSCommand(args) {
    const option = args[0];

    switch (option) {
      case '--EOL':
        osInfo.getEOL();
        break;
      case '--cpus':
        osInfo.getCPUs();
        break;
      case '--homedir':
        osInfo.getHomeDir();
        break;
      case '--username':
        osInfo.getUsername();
        break;
      case '--architecture':
        osInfo.getArchitecture();
        break;
      default:
        console.log('Invalid input');
    }
  }
}


function getUsername() {
  const args = process.argv.slice(2);
  const usernameArg = args.find(arg => arg.startsWith(`--username=`));
  if (!usernameArg) {
    console.log('Please provide username with --username=your_username');
    process.exit(1);
  }
  return usernameArg.split('=')[1];
}

const username = getUsername();
const fileManager = new FileManager(username);
fileManager.start();

process.on('SIGINT', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
})