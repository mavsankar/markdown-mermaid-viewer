// Mermaid preview script for VS Code Markdown preview
(function() {
    console.log('Mermaid preview script loaded!');
    
    // Load Mermaid from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js';
    script.onload = function() {
        console.log('Mermaid library loaded successfully!');
        
        // Initialize Mermaid with VS Code theme support
        mermaid.initialize({
            startOnLoad: false,
            theme: document.body.getAttribute('data-vscode-theme-kind') === 'vscode-dark' ? 'dark' : 'default',
            securityLevel: 'loose',
            fontFamily: 'var(--vscode-font-family)',
            fontSize: 14,
            // Add better error handling
            maxTextSize: 50000,
            maxEdges: 2000
        });
        
        // Function to render all mermaid diagrams
        async function renderMermaidDiagrams() {
            console.log('🔍 Looking for mermaid diagrams...');
            
            // Approach 1: Look for our plugin-generated .mermaid elements
            const mermaidElements = document.querySelectorAll('.mermaid');
            console.log('Found', mermaidElements.length, 'elements with .mermaid class');
            
            for (let i = 0; i < mermaidElements.length; i++) {
                const element = mermaidElements[i];
                const graphDefinition = element.textContent.trim();
                if (graphDefinition && !element.getAttribute('data-processed')) {
                    console.log('Processing .mermaid element:', graphDefinition.substring(0, 50) + '...');
                    try {
                        const diagramId = `mermaid-plugin-${i}`;
                        
                        // First, try to parse the diagram to catch syntax errors early
                        try {
                            await mermaid.parse(graphDefinition);
                        } catch (parseError) {
                            throw new Error(`Syntax Error: ${parseError.message || parseError}`);
                        }
                        
                        // Use the newer async API
                        const { svg } = await mermaid.render(diagramId, graphDefinition);
                        element.innerHTML = svg;
                        element.setAttribute('data-processed', 'true');
                        console.log('✅ Rendered .mermaid element');
                    } catch (error) {
                        console.error('❌ Error rendering .mermaid element:', error);
                        
                        // Provide more detailed error information
                        let errorMessage = error.message || 'Unknown error';
                        
                        // Handle common Mermaid errors
                        if (errorMessage.includes('Maximum text size')) {
                            errorMessage = 'Syntax Error: Invalid Mermaid syntax detected. Please check your diagram code.';
                        } else if (errorMessage.includes('Parse error')) {
                            errorMessage = `Syntax Error: ${errorMessage}`;
                        } else if (errorMessage.includes('Lexical error')) {
                            errorMessage = `Syntax Error: ${errorMessage}`;
                        }
                        
                        element.innerHTML = `<div style="color: red; border: 1px solid red; padding: 10px; background-color: #fee;">
                            <strong>⚠️ Mermaid Diagram Error:</strong><br>
                            ${errorMessage}
                            <br><br>
                            <details>
                                <summary style="cursor: pointer; font-weight: bold;">📝 Show Diagram Source</summary>
                                <pre style="font-size: 12px; background: #f5f5f5; padding: 8px; margin-top: 8px; border-radius: 4px; overflow-x: auto;">${graphDefinition}</pre>
                            </details>
                            <br>
                            <small style="color: #666;">
                                💡 <strong>Tip:</strong> Check the <a href="https://mermaid.js.org/" target="_blank" style="color: #0066cc;">Mermaid documentation</a> for syntax help.
                            </small>
                        </div>`;
                        element.setAttribute('data-processed', 'true');
                    }
                }
            }
            
            // Approach 2: Look for standard code blocks with language "mermaid"
            const codeBlocks = document.querySelectorAll('pre code.language-mermaid');
            console.log('Found', codeBlocks.length, 'code blocks with language-mermaid');
            
            for (let i = 0; i < codeBlocks.length; i++) {
                const codeBlock = codeBlocks[i];
                if (!codeBlock.getAttribute('data-processed')) {
                    const graphDefinition = codeBlock.textContent.trim();
                    console.log('Processing code block:', graphDefinition.substring(0, 50) + '...');
                    
                    try {
                        // First, try to parse the diagram to catch syntax errors early
                        try {
                            await mermaid.parse(graphDefinition);
                        } catch (parseError) {
                            throw new Error(`Syntax Error: ${parseError.message || parseError}`);
                        }
                        
                        const diagramId = `mermaid-codeblock-${i}`;
                        const { svg } = await mermaid.render(diagramId, graphDefinition);
                        
                        // Replace the code block with the rendered SVG
                        const container = document.createElement('div');
                        container.className = 'mermaid-container';
                        container.innerHTML = svg;
                        
                        // Replace the parent <pre> element
                        const preElement = codeBlock.closest('pre');
                        if (preElement) {
                            preElement.parentNode.replaceChild(container, preElement);
                        }
                        
                        codeBlock.setAttribute('data-processed', 'true');
                        console.log('✅ Rendered code block diagram');
                    } catch (error) {
                        console.error('❌ Error rendering code block:', error);
                        
                        // Provide more detailed error information
                        let errorMessage = error.message || 'Unknown error';
                        
                        // Handle common Mermaid errors
                        if (errorMessage.includes('Maximum text size')) {
                            errorMessage = 'Syntax Error: Invalid Mermaid syntax detected. Please check your diagram code.';
                        } else if (errorMessage.includes('Parse error')) {
                            errorMessage = `Syntax Error: ${errorMessage}`;
                        } else if (errorMessage.includes('Lexical error')) {
                            errorMessage = `Syntax Error: ${errorMessage}`;
                        }
                        
                        const errorDiv = document.createElement('div');
                        errorDiv.style.cssText = 'color: red; border: 1px solid red; padding: 10px; background-color: #fee; border-radius: 4px; margin: 10px 0;';
                        errorDiv.innerHTML = `<strong>⚠️ Mermaid Diagram Error:</strong><br>
                            ${errorMessage}
                            <br><br>
                            <details>
                                <summary style="cursor: pointer; font-weight: bold;">📝 Show Diagram Source</summary>
                                <pre style="font-size: 12px; background: #f5f5f5; padding: 8px; margin-top: 8px; border-radius: 4px; overflow-x: auto;">${graphDefinition}</pre>
                            </details>
                            <br>
                            <small style="color: #666;">
                                💡 <strong>Tip:</strong> Check the <a href="https://mermaid.js.org/" target="_blank" style="color: #0066cc;">Mermaid documentation</a> for syntax help.
                            </small>`;
                        
                        const preElement = codeBlock.closest('pre');
                        if (preElement) {
                            preElement.parentNode.replaceChild(errorDiv, preElement);
                        }
                        
                        codeBlock.setAttribute('data-processed', 'true');
                    }
                }
            }
            
            console.log('🏁 Finished processing mermaid diagrams');
        }
        
        // Initial render
        setTimeout(async () => {
            await renderMermaidDiagrams();
        }, 100);
        
        // Watch for content changes (when markdown is updated)
        const observer = new MutationObserver(async function(mutations) {
            let shouldRender = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldRender = true;
                }
            });
            
            if (shouldRender) {
                setTimeout(async () => {
                    await renderMermaidDiagrams();
                }, 200);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Re-render when theme changes
        window.addEventListener('vscode-theme-changed', async function() {
            const newTheme = document.body.getAttribute('data-vscode-theme-kind') === 'vscode-dark' ? 'dark' : 'default';
            mermaid.initialize({
                startOnLoad: false,
                theme: newTheme,
                securityLevel: 'loose',
                fontFamily: 'var(--vscode-font-family)',
                fontSize: 14
            });
            
            // Clear processed flags and re-render
            document.querySelectorAll('[data-processed]').forEach(element => {
                element.removeAttribute('data-processed');
            });
            await renderMermaidDiagrams();
        });
    };
    
    script.onerror = function() {
        console.error('Failed to load Mermaid library from CDN');
    };
    
    document.head.appendChild(script);
})();
