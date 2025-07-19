let mermaidIndex = 0;

module.exports = function(md) {
    console.log('🔧 Mermaid plugin initialized');
    
    const fence = md.renderer.rules.fence;
    
    md.renderer.rules.fence = function(tokens, idx, options, env, renderer) {
        const token = tokens[idx];
        const info = token.info ? token.info.trim() : '';
        const langName = info.split(/\s+/g)[0];
        
        console.log('🔍 Processing fence block with language:', langName);
        
        if (langName === 'mermaid') {
            console.log('✨ Found mermaid block, transforming to HTML');
            const mermaidId = `mermaid-${mermaidIndex++}`;
            const mermaidCode = token.content.trim();
            
            const html = `<div class="mermaid-container">
                        <div id="${mermaidId}" class="mermaid">${mermaidCode}</div>
                    </div>`;
            console.log('📄 Generated HTML:', html.substring(0, 100) + '...');
            return html;
        }
        
        return fence(tokens, idx, options, env, renderer);
    };
    
    console.log('✅ Mermaid plugin fence rule registered');
};
