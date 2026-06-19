import os
import re

def update_sprites():
    dinos_dir = 'assets/dinos/'
    dino_data_path = 'dino_data.js'
    
    if not os.path.exists(dinos_dir):
        print(f"Error: Directory '{dinos_dir}' does not exist.")
        return
        
    if not os.path.exists(dino_data_path):
        print(f"Error: File '{dino_data_path}' does not exist.")
        return

    # Scan all files matching 'pixellab-*.png'
    sprite_files = []
    for filename in os.listdir(dinos_dir):
        if filename.startswith('pixellab-') and filename.endswith('.png'):
            sprite_files.append(filename)
            
    # Sort files alphabetically
    sprite_files.sort()
    
    # Read dino_data.js
    with open(dino_data_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Generate the replacement string
    formatted_list = "spriteFiles: [\n" + ",\n".join(f"        '{f}'" for f in sprite_files) + "\n    ]"
    
    # Regex to find spriteFiles: [ ... ] block (handles multiline)
    pattern = re.compile(r'spriteFiles:\s*\[[^\]]*\]', re.DOTALL)
    
    if not pattern.search(content):
        print("Error: Could not find 'spriteFiles: [ ... ]' block in dino_data.js")
        return
        
    new_content = pattern.sub(formatted_list, content)
    
    # Write back to dino_data.js
    with open(dino_data_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Successfully updated {len(sprite_files)} sprites in {dino_data_path}:")
    for f in sprite_files:
        print(f"  - {f}")

if __name__ == '__main__':
    update_sprites()
