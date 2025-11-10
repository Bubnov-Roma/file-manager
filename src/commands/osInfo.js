import os from 'os';
import { messages } from '../utils/colors.js';

export function getEOL() {
  const eol = os.EOL;
  let displayEOL;
  switch (eol) {
    case '\n':
      displayEOL = '\\n (LF - Line Feed)';
      break;
    case '\r\n':
      displayEOL = '\\r\\n (CRLF - Carriage Return + Line Feed)';
      break;
    case '\r':
      displayEOL = '\\r (CR - Carriage Return)';
      break;
    default:
      displayEOL = Array.from(eol)
        .map(char => {
          const code = char.charCodeAt(0);
          if (code < 32) {
            return '\\x' + code.toString(16).padStart(2, '0');
          }
          return char;
        })
        .join('');
  }
  console.log(messages.info('Default system End-Of-Line:'));
  console.log(`  ${displayEOL}`);
  console.log(`  Raw: ${JSON.stringify(eol)}`);
}

export function getCPUs() {
  const cpus = os.cpus();
  console.log(messages.info(`Overall amount of CPUs: ${cpus.length}`));
  console.log(messages.info('\nCPU details:'));
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
}

export function getHomeDir() {
  console.log(messages.info('Home directory:'));
  console.log(`  ${os.homedir()}`);
}

export function getUsername() {
  console.log(messages.info('System username:'));
  console.log(`  ${os.userInfo().username}`);
}

export function getArchitecture() {
  console.log(messages.info('CPU architecture:'));
  console.log(`  ${os.arch()}`);
}