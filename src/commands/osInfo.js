import os from 'os';

export function getEOL() {
  console.log(JSON.stringify(os.EOL));
}

export function getCPUs() {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}`);
  console.log('\nCPU details:');
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
}

export function getHomeDir() {
  console.log(os.homedir());
}

export function getUsername() {
  console.log(os.userInfo().username);
}

export function getArchitecture() {
  console.log(os.arch());
}