import os
from PIL import Image

def compress_images():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, '..'))
    assets_dir = os.path.join(root_dir, 'assets')
    html_files = [
        'index.html',
        'work.html',
        'project-awareness.html',
        'project-launch.html',
        'community-subprojects.html',
        'project-placeholder-04.html',
        'project-placeholder-05.html',
        'project-placeholder-06.html',
        'project-placeholder-07.html',
        'project-placeholder-08.html'
    ]

    target_images = [
        'brand-photoshoot.png',
        'campaign-launch.png',
        'campaign-tiktok.png',
        'campaign-ugc.png',
        'dashboard-stats.png'
    ]

    print("--- 1. Converting PNGs to WebP ---")
    for img_name in target_images:
        png_path = os.path.join(assets_dir, img_name)
        webp_name = img_name.replace('.png', '.webp')
        webp_path = os.path.join(assets_dir, webp_name)

        if os.path.exists(png_path):
            try:
                with Image.open(png_path) as img:
                    # Save as WebP with 80% quality
                    img.save(webp_path, 'webp', quality=80)
                original_size = os.path.getsize(png_path) / 1024
                compressed_size = os.path.getsize(webp_path) / 1024
                print(f"Compressed {img_name} ({original_size:.1f} KB) -> {webp_name} ({compressed_size:.1f} KB) | Saved {original_size - compressed_size:.1f} KB ({(original_size - compressed_size)/original_size * 100:.1f}%)")
            except Exception as e:
                print(f"Error compressing {img_name}: {e}")
        else:
            print(f"PNG not found: {png_path}")

    print("\n--- 2. Updating HTML file references ---")
    for html_file in html_files:
        html_path = os.path.join(root_dir, html_file)
        if os.path.exists(html_path):
            try:
                with open(html_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                updated_content = content
                replaced_any = False
                for img_name in target_images:
                    webp_name = img_name.replace('.png', '.webp')
                    # Replace image name references in the HTML files
                    if f"assets/{img_name}" in updated_content:
                        updated_content = updated_content.replace(f"assets/{img_name}", f"assets/{webp_name}")
                        replaced_any = True
                        print(f"Replaced assets/{img_name} -> assets/{webp_name} in {html_file}")

                if replaced_any:
                    with open(html_path, 'w', encoding='utf-8') as f:
                        f.write(updated_content)
                    print(f"Saved updates to {html_file}")
            except Exception as e:
                print(f"Error updating {html_file}: {e}")
        else:
            print(f"HTML file not found: {html_path}")

if __name__ == '__main__':
    compress_images()
