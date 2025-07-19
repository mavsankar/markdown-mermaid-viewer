<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a VS Code extension project. Please use the get_vscode_api with a query as input to fetch the latest VS Code API references.

## Project Overview
This VS Code extension automatically renders Mermaid diagrams in Markdown preview. It extends the built-in Markdown preview functionality to process Mermaid code blocks and render them as interactive diagrams.

## Key Components
- **Extension Entry Point**: `src/extension.ts` - Main extension activation and Markdown-It plugin registration
- **Mermaid Plugin**: `src/mermaid-plugin.js` - Markdown-It plugin that processes Mermaid code blocks
- **Preview Script**: `media/mermaid-preview.js` - Client-side script that initializes Mermaid in the preview
- **Styling**: `media/mermaid.css` - CSS styles for Mermaid diagrams with VS Code theme integration

## Development Guidelines
1. Follow VS Code extension development best practices
2. Ensure compatibility with both light and dark themes
3. Handle errors gracefully when rendering Mermaid diagrams
4. Use VS Code's Markdown preview extension points properly
5. Maintain TypeScript strict mode compliance
