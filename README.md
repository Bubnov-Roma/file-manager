# 🗂️ File Manager - RS School Node.js Assignment

![Node.js](https://img.shields.io/badge/Node.js-24.14.0+-green)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen)

A full-featured, cross-platform command-line file manager built with native Node.js. This application provides comprehensive file system operations, system information, and compression capabilities through an intuitive CLI interface.

## ✨ Features

### 🧭 Navigation & Directory Management
- **`up`** - Move to parent directory
- **`cd <path>`** - Change directory (supports relative/absolute paths)
- **`ls`** - Beautiful directory listing with color-coded output

### 📁 File Operations
- **`cat <file>`** - Read and display file content
- **`add <file>`** - Create new empty file
- **`mkdir <dir>`** - Create new directory
- **`rn <old> <new>`** - Rename files/directories
- **`cp <source> <target>`** - Copy files with stream support
- **`mv <source> <target>`** - Move files with stream support
- **`rm <file>`** - Delete files

### 💻 System Information
- **`os --EOL`** - Display system End-Of-Line characters
- **`os --cpus`** - Show CPU details and specifications
- **`os --homedir`** - Display home directory path
- **`os --username`** - Show system username
- **`os --architecture`** - Display CPU architecture

### 🔧 Advanced Operations
- **`hash <file>`** - Calculate SHA-256 file hash
- **`compress <source> <target>`** - Compress files using Brotli algorithm
- **`decompress <source> <target>`** - Decompress Brotli compressed files

## 🚀 Quick Start

### Prerequisites
- Node.js version 24.14.0 or higher

### Installation & Usage

```bash
# Clone the repository
git clone <repository-url>
cd file-manager

# Install dependencies
npm install

# Run the file manager
npm run start -- --username=YourName
```

### First Steps
After launching, you'll see:
```
Welcome to the File Manager, YourName!
You are currently in /home/yourusername
>
```

Try these commands to get started:
```bash
ls                    # List directory contents
mkdir test_folder     # Create a new directory
cd test_folder        # Enter the directory
add hello.txt         # Create a new file
cat hello.txt         # Read the file content
up                    # Go back to parent directory
```

## 📖 Command Reference

<details>
<summary><strong>🧭 Navigation Commands</strong></summary>

### `up`
Move to the parent directory.
```bash
> up
✓ Directory changed to parent directory
You are currently in /home/user/parent
```

### `cd <path>`
Change to specified directory. Supports both relative and absolute paths.
```bash
> cd Documents
✓ Directory changed to /home/user/Documents
You are currently in /home/user/Documents

> cd /absolute/path/to/folder
✓ Directory changed to /absolute/path/to/folder
```

### `ls`
List directory contents in a beautiful, color-coded table format.
```bash
> ls
┌─────────────────────────────────────┐
│ Directory content (3 dirs, 2 files) │
├─────────────────────────────────────┤
│ Name              Type              │
├───────────────────┼─────────────────┤
│ Documents         directory         │
│ Projects          directory         │
│ Downloads         directory         │
├───────────────────┼─────────────────┤
│ README.md         file              │
│ config.json       file              │
└─────────────────────────────────────┘
✓ Directory listing completed
```
</details>

<details>
<summary><strong>📁 File Operation Commands</strong></summary>

### `cat <path_to_file>`
Display file contents with stream processing.
```bash
> cat document.txt
─────────────────────────────────────
This is the content of the file...
Line 2 of the file content
─────────────────────────────────────
✓ File read completed
```

### `add <new_file_name>`
Create a new empty file.
```bash
> add newfile.txt
✓ File newfile.txt created successfully
```

### `mkdir <new_directory_name>`
Create a new directory.
```bash
> mkdir my_project
✓ Directory my_project created successfully
```

### `rn <path_to_file> <new_filename>`
Rename a file or directory.
```bash
> rn oldname.txt newname.txt
✓ File renamed from oldname.txt to newname.txt
```

### `cp <path_to_file> <path_to_new_directory>`
Copy a file to another location using streams.
```bash
> cp file.txt backup/
✓ File file.txt copied to backup/
```

### `mv <path_to_file> <path_to_new_directory>`
Move a file to another location using streams.
```bash
> mv file.txt archive/
✓ File file.txt moved to archive/
```

### `rm <path_to_file>`
Delete a file.
```bash
> rm temporary.txt
✓ File temporary.txt deleted successfully
```
</details>

<details>
<summary><strong>💻 System Information Commands</strong></summary>

### `os --EOL`
Display system-specific End-Of-Line characters.
```bash
> os --EOL
ℹ Default system End-Of-Line:
  \n (LF - Line Feed)
  Raw: "\n"
```

### `os --cpus`
Show detailed CPU information.
```bash
> os --cpus
ℹ Overall amount of CPUs: 8
ℹ CPU details:
  CPU 1:
    Model: Apple M1
    Clock rate: 3.20 GHz
  ...
```

### `os --homedir`
Display current user's home directory.
```bash
> os --homedir
ℹ Home directory:
  /Users/username
```

### `os --username`
Show system username.
```bash
> os --username
ℹ System username:
  username
```

### `os --architecture`
Display CPU architecture.
```bash
> os --architecture
ℹ CPU architecture:
  arm64
```
</details>

<details>
<summary><strong>🔧 Advanced Operation Commands</strong></summary>

### `hash <path_to_file>`
Calculate and display SHA-256 hash of a file.
```bash
> hash document.txt
ℹ SHA-256 hash of document.txt:
  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
✓ Hash calculation completed
```

### `compress <path_to_file> <path_to_destination>`
Compress a file using Brotli algorithm with streams.
```bash
> compress large_file.txt compressed_file.br
✓ File large_file.txt compressed to compressed_file.br
```

### `decompress <path_to_file> <path_to_destination>`
Decompress a Brotli compressed file.
```bash
> decompress compressed_file.br decompressed.txt
✓ File compressed_file.br decompressed to decompressed.txt
```
</details>

## 🏗️ Architecture

```
file-manager/
├── src/
│   ├── index.js                 # Main application entry point
│   ├── commands/
│   │   ├── navigation.js        # up, cd, ls commands
│   │   ├── fileOperations.js    # File CRUD operations
│   │   ├── osInfo.js            # System information commands
│   │   ├── hash.js              # Hash calculation
│   │   └── compress.js          # Compression/decompression
│   └── utils/
│       ├── index.js             # Utility functions
│       └── colors.js            # ANSI color codes for CLI
├── package.json
└── README.md
```

### Key Design Principles
- **Modular Architecture** - Separated concerns with dedicated command modules
- **Stream-Based Operations** - Efficient memory usage for large files
- **Cross-Platform Compatibility** - Works seamlessly on Windows, macOS, and Linux
- **Comprehensive Error Handling** - User-friendly error messages and recovery
- **Zero Dependencies** - Uses only native Node.js modules

## 🎨 User Experience

The file manager provides an exceptional CLI experience with:

- **Color-Coded Output** - Easy differentiation between files, directories, and command types
- **Real-Time Feedback** - Immediate confirmation for successful operations
- **Intuitive Error Messages** - Clear explanations for operation failures
- **Consistent Interface** - Uniform command structure and output formatting
- **Progress Indicators** - Visual feedback for all operations

## 🔧 Technical Details

### Stream Implementation
All file operations use Node.js streams for optimal performance:
- **Readable Streams** - For reading file contents (`cat`, `hash`, `compress`)
- **Writable Streams** - For writing files (`cp`, `mv`, `compress`)
- **Transform Streams** - For data processing (`compress`, `decompress`)

### Error Handling
- **Input Validation** - Comprehensive argument checking
- **File System Errors** - Graceful handling of missing files/permissions
- **Stream Errors** - Proper cleanup on operation failures
- **User Feedback** - Clear, actionable error messages

### Cross-Platform Support
- **Path Normalization** - Automatic handling of OS-specific path separators
- **EOL Detection** - Proper line ending handling across platforms
- **Root Directory Detection** - Correct behavior on all operating systems

## 📋 Requirements Compliance

| Requirement | Status | Implementation |
|-------------|---------|----------------|
| No external dependencies | ✅ | Uses only native Node.js modules |
| Node.js 24.14.0+ | ✅ | Compatible with specified version |
| CLI startup with username | ✅ | `npm run start -- --username=name` |
| Welcome/goodbye messages | ✅ | Personalized messages with username |
| Current directory display | ✅ | Shows after every operation |
| Home directory start | ✅ | Starts in user's home directory |
| Interactive prompt | ✅ | Continuous command processing |
| Error handling | ✅ | `Invalid input` & `Operation failed` messages |
| Root directory protection | ✅ | Prevents navigation above root |
| All required commands | ✅ | Complete command set implemented |
| Stream-based operations | ✅ | Uses Readable/Writable streams |
| Cross-platform support | ✅ | Windows, macOS, Linux compatible |

## 🧪 Testing

The application has been thoroughly tested on:
- ✅ **Navigation** - Directory traversal and listing
- ✅ **File Operations** - Complete CRUD operations lifecycle
- ✅ **System Information** - All OS command outputs
- ✅ **Hash Operations** - SHA-256 calculation verification
- ✅ **Compression** - Brotli compression/decompression cycle
- ✅ **Error Handling** - Invalid inputs and edge cases
- ✅ **Cross-Platform** - Consistent behavior across OSes

### Sample Test Session
```bash
# Comprehensive functionality test
mkdir test_project
cd test_project
add main.js
echo "console.log('Hello World');" > main.js
cat main.js
cp main.js backup.js
ls
hash main.js
compress main.js main.br
decompress main.br main_decompressed.js
os --cpus
os --username
cd ..
rm -rf test_project
```

## 🚀 Performance

- **Memory Efficient** - Stream-based operations prevent loading large files into memory
- **Fast Execution** - Optimized command processing with minimal overhead
- **Scalable** - Handles files of any size through stream processing
- **Responsive** - Immediate feedback for all user interactions

## 📝 School

This project was developed as part of the [RS School Node.js course](https://rs.school/courses/nodejs) assignment.

With ❤️ for [RS School](https://rs.school/)
