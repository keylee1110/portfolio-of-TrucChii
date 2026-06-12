import os
import re

def minify_css(css):
    # Remove block comments
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    # Collapse multiple whitespaces
    css = re.sub(r'\s+', ' ', css)
    # Remove spacing around characters
    css = re.sub(r'\s*([\{\};:,])\s*', r'\1', css)
    # Remove last semicolon in block
    css = re.sub(r';}', '}', css)
    return css.strip()

def minify_js(js):
    # Match strings and comments to avoid stripping URLs in strings
    pattern = re.compile(
        r'("(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'|`(?:[^`\\]|\\.)*`|//[^\n]*|/\*[\s\S]*?\*/)'
    )
    def replacer(match):
        item = match.group(0)
        if item.startswith('//') or item.startswith('/*'):
            return ''
        return item
    
    js = pattern.sub(replacer, js)
    
    # Remove excessive newlines
    js = re.sub(r'\n\s*\n', '\n', js)
    # Remove extra spaces on lines
    lines = []
    for line in js.splitlines():
        trimmed = line.strip()
        if trimmed:
            lines.append(trimmed)
    
    return '\n'.join(lines)

def run():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.abspath(os.path.join(script_dir, '..'))
    
    css_path = os.path.join(base_dir, 'style.css')
    css_src_path = os.path.join(base_dir, 'style.src.css')
    js_path = os.path.join(base_dir, 'app.js')
    js_src_path = os.path.join(base_dir, 'app.src.js')
    
    # 1. Handle CSS
    if not os.path.exists(css_src_path) and os.path.exists(css_path):
        os.rename(css_path, css_src_path)
        print(f"Renamed original style.css -> style.src.css")
        
    if os.path.exists(css_src_path):
        with open(css_src_path, 'r', encoding='utf-8') as f:
            raw_css = f.read()
        minified_css = minify_css(raw_css)
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(minified_css)
        orig_size = os.path.getsize(css_src_path) / 1024
        mini_size = os.path.getsize(css_path) / 1024
        print(f"Minified CSS: {orig_size:.1f} KB -> {mini_size:.1f} KB | Saved {orig_size - mini_size:.1f} KB ({(orig_size - mini_size)/orig_size * 100:.1f}%)")
        
    # 2. Handle JS
    if not os.path.exists(js_src_path) and os.path.exists(js_path):
        os.rename(js_path, js_src_path)
        print(f"Renamed original app.js -> app.src.js")
        
    if os.path.exists(js_src_path):
        with open(js_src_path, 'r', encoding='utf-8') as f:
            raw_js = f.read()
        minified_js = minify_js(raw_js)
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(minified_js)
        orig_size = os.path.getsize(js_src_path) / 1024
        mini_size = os.path.getsize(js_path) / 1024
        print(f"Minified JS: {orig_size:.1f} KB -> {mini_size:.1f} KB | Saved {orig_size - mini_size:.1f} KB ({(orig_size - mini_size)/orig_size * 100:.1f}%)")

if __name__ == '__main__':
    run()
