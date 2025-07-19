import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 Markdown Mermaid Viewer extension is now active!');
    
    return {
        extendMarkdownIt(md: any) {
            console.log('📝 ExtendMarkdownIt called - registering Mermaid plugin');
            try {
                const mermaidPlugin = require(path.join(__dirname, 'mermaid-plugin.js'));
                console.log('✅ Mermaid plugin loaded successfully');
                const result = md.use(mermaidPlugin);
                console.log('✅ Mermaid plugin registered with MarkdownIt');
                return result;
            } catch (error) {
                console.error('❌ Error loading mermaid plugin:', error);
                return md;
            }
        }
    };
}

export function deactivate() {}
