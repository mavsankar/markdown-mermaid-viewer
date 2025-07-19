# 🛠️ Developer Documentation

This document contains information for developers who want to contribute to or modify the Markdown Mermaid Viewer extension.

## 📋 Prerequisites

- 📦 Node.js 16.x or higher
- 💻 Visual Studio Code 1.74.0 or higher
- 🔧 TypeScript knowledge (helpful but not required)

## 🏗️ Development Setup

1. 🍴 **Fork** this repository
2. 📥 **Clone** your fork:
   ```bash
   git clone https://github.com/yourusername/markdown-mermaid-viewer.git
   cd markdown-mermaid-viewer
   ```
3. 📦 **Install** dependencies:
   ```bash
   npm install
   ```
4. 🚀 **Launch** extension development:
   - Press `F5` to open Extension Development Host
   - Or run: `code --extensionDevelopmentPath=.`
5. 🧪 **Test** with the included `test.md` file

## ⚙️ Build Commands

```bash
# 🔨 Compile TypeScript
npm run compile

# 👀 Watch for changes during development
npm run watch

# 📦 Package for distribution
npm run package

# 🚀 Publish to marketplace
npm run publish
```

## 🏗️ Project Structure

```
📁 markdown-mermaid-viewer/
├── 📄 src/
│   ├── 🎯 extension.ts          # Main extension entry point
│   └── 🔌 mermaid-plugin.js     # Markdown-It plugin for processing Mermaid blocks
├── 🎨 media/
│   ├── 🌊 mermaid-preview.js    # Client-side script for Mermaid initialization
│   └── 💅 mermaid.css          # Styling for Mermaid diagrams
├── 📁 out/                      # Compiled JavaScript output
├── 📝 test.md                   # Example diagrams for testing
├── 📋 package.json             # Extension manifest
├── 🔧 tsconfig.json            # TypeScript configuration
└── 📚 vsc-extension-quickstart.md # User documentation
```

## 🔧 How It Works

### Extension Architecture

1. **Extension Activation** (`src/extension.ts`):
   - Activates when any file is opened
   - Returns an object with `extendMarkdownIt` function

2. **Markdown-It Plugin** (`src/mermaid-plugin.js`):
   - Intercepts fence blocks with `mermaid` language
   - Transforms them into HTML with `.mermaid` class
   - Adds unique IDs for each diagram

3. **Preview Script** (`media/mermaid-preview.js`):
   - Loads Mermaid library from CDN
   - Finds elements with `.mermaid` class
   - Renders them using Mermaid's async API
   - Handles theme changes and updates

4. **Styling** (`media/mermaid.css`):
   - Provides VS Code theme integration
   - Ensures diagrams look good in light/dark modes

### Key Files Explained

#### `src/extension.ts`
Main extension entry point. Exports the `extendMarkdownIt` function that VS Code calls to extend the built-in Markdown preview.

#### `src/mermaid-plugin.js`
Markdown-It plugin that processes fence blocks. When it finds a ```mermaid block, it wraps the content in a div with the `.mermaid` class.

#### `media/mermaid-preview.js`
Client-side script that runs in the Markdown preview iframe. It:
- Loads the Mermaid library
- Finds all `.mermaid` elements
- Renders them using Mermaid's API
- Handles errors and theme changes

## 🧪 Testing

### Manual Testing
1. **Launch** the extension with `F5`
2. **Open** `test.md` in the new window
3. **Preview** with `Ctrl+Shift+V`
4. **Verify** diagrams render correctly

### Testing Different Scenarios
- ✅ Light and dark themes
- ✅ Different diagram types
- ✅ Invalid Mermaid syntax (should show errors)
- ✅ Live updates while editing

## 🤝 Contributing

### Pull Request Process
1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. ✨ **Make** your changes
4. 🧪 **Test** thoroughly
5. 💌 **Submit** a pull request with detailed description

### Code Style
- Follow existing TypeScript/JavaScript conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Debugging
- Use VS Code's built-in debugger
- Check the Developer Tools console in the preview window
- Look for error messages in the Extension Development Host

## 📦 Publishing

### Prerequisites
1. **Microsoft Account** for Azure DevOps
2. **Publisher Account** on VS Code Marketplace
3. **Personal Access Token** with Marketplace permissions

### Publishing Steps
1. **Update version** in `package.json`
2. **Update** `CHANGELOG.md`
3. **Compile**: `npm run compile`
4. **Package**: `npm run package`
5. **Test** the `.vsix` file locally
6. **Publish**: `npm run publish`

### Version Management
- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features
- **Major** (1.0.0 → 2.0.0): Breaking changes

## 🐛 Troubleshooting

### Common Issues

**Extension not loading:**
- Check the Extension Development Host console for errors
- Verify `package.json` syntax
- Ensure all dependencies are installed

**Diagrams not rendering:**
- Check browser console in preview window
- Verify Mermaid CDN is accessible
- Check if `.mermaid` elements are being created

**TypeScript compilation errors:**
- Run `npm run compile` to see specific errors
- Check `tsconfig.json` configuration
- Ensure all type definitions are installed

## 📚 Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Mermaid Documentation](https://mermaid.js.org/)
- [Markdown-It Plugin Development](https://github.com/markdown-it/markdown-it)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

---

**Happy coding!** 🚀 If you have questions, feel free to open an issue or discussion.
