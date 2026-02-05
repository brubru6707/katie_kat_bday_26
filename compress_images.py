#!/usr/bin/env python3
"""
Script to compress and convert images from public/pictures to pictures/
Converts HEIC files to JPG and compresses all images.
"""

import os
from pathlib import Path
from PIL import Image
from pillow_heif import register_heif_opener

# Register HEIF opener for PIL
register_heif_opener()

# Define paths
PUBLIC_PICTURES = Path("public/pictures")
OUTPUT_DIR = Path("pictures")

# Create output directory if it doesn't exist
OUTPUT_DIR.mkdir(exist_ok=True)

# Quality setting for JPG compression (1-100, lower = more compression)
QUALITY = 85

def compress_image(input_path, output_path):
    """
    Open an image, convert to RGB if needed, and save as compressed JPG.
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGB if necessary (HEIC files may be in different modes)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Save as compressed JPG
        img.save(output_path, 'JPEG', quality=QUALITY, optimize=True)
        print(f"✓ Compressed: {input_path.name} -> {output_path.name}")
        
    except Exception as e:
        print(f"✗ Error processing {input_path.name}: {e}")

def main():
    # Check if source directory exists
    if not PUBLIC_PICTURES.exists():
        print(f"Error: {PUBLIC_PICTURES} does not exist!")
        return
    
    # Get all image files
    image_extensions = {'.heic', '.jpg', '.jpeg', '.png', '.gif', '.bmp'}
    image_files = [
        f for f in PUBLIC_PICTURES.iterdir() 
        if f.is_file() and f.suffix.lower() in image_extensions
    ]
    
    if not image_files:
        print(f"No image files found in {PUBLIC_PICTURES}")
        return
    
    print(f"Found {len(image_files)} images to process\n")
    
    # Process each image
    for img_file in image_files:
        # Create output filename (change extension to .jpg)
        output_name = img_file.stem + '.jpg'
        output_path = OUTPUT_DIR / output_name
        
        # Compress and convert
        compress_image(img_file, output_path)
    
    print(f"\n✓ Complete! Compressed images saved to {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
