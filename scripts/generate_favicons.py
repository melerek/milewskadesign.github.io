#!/usr/bin/env python3
"""
Favicon & App Icon Generator for Milewska Design Website
Preserves the natural aspect ratio of the MD logo mark on a square canvas.
"""
import os
from PIL import Image

def generate_favicons():
    src_path = 'images/logo_img_md.webp'
    if not os.path.exists(src_path):
        print(f"Error: {src_path} not found")
        return

    orig = Image.open(src_path).convert('RGBA')
    bbox = orig.getbbox()
    cropped = orig.crop(bbox)

    w, h = cropped.size
    aspect = w / h

    sizes = [16, 32, 48, 64, 180, 192, 512]
    icons_dir = 'images/icons'
    os.makedirs(icons_dir, exist_ok=True)

    generated_images = {}

    for size in sizes:
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))

        if size == 16:
            target_w = size
            target_h = max(1, round(target_w / aspect))
        elif size == 32:
            target_w = size - 2
            target_h = max(1, round(target_w / aspect))
        elif size == 48:
            target_w = size - 4
            target_h = max(1, round(target_w / aspect))
        else:
            target_w = int(size * 0.90)
            target_h = max(1, round(target_w / aspect))

        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

        offset_x = (size - target_w) // 2
        offset_y = (size - target_h) // 2
        canvas.paste(resized, (offset_x, offset_y), resized)

        out_path = os.path.join(icons_dir, f'favicon-{size}x{size}.png')
        if size == 180:
            out_path = os.path.join(icons_dir, 'apple-touch-icon.png')
        canvas.save(out_path, format='PNG', optimize=True)
        generated_images[size] = canvas
        print(f"Generated {out_path} ({size}x{size}, logo: {target_w}x{target_h})")

    ico_path = os.path.join(icons_dir, 'favicon.ico')
    generated_images[32].save(
        ico_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[generated_images[16], generated_images[48]]
    )
    print(f"Generated multi-size {ico_path}")

if __name__ == '__main__':
    generate_favicons()
