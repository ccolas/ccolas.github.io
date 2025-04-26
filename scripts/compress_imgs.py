import os
import shutil
import numpy as np
from PIL import Image, ImageCms

path = "/Users/bkayf/Documents/Perso/Scratch/mysite/images/projects/wiki/calendar/"
save_path = path + 'save/'

files = os.listdir(save_path)
MAX_SIZE = 1024

for i_f, f in enumerate(files):
    if '.DS' in f:
        continue
    full_path = save_path + f
    output_file = os.path.join(path, os.path.splitext(f)[0] + '.webp')
    image = Image.open(full_path)
    # Get the original format and extension
    original_format = image.format
    file_ext = os.path.splitext(f)[1].lower()
    original_mode = image.mode
    icc_profile = image.info.get('icc_profile')
    original_format = image.format

    # Calculate new dimensions while maintaining aspect ratio
    width, height = image.size
    if width > height and width > MAX_SIZE:
        new_height = int(height * MAX_SIZE / width)
        new_width = MAX_SIZE
    elif height > MAX_SIZE:
        new_width = int(width * MAX_SIZE / height)
        new_height = MAX_SIZE
    else:
        # No need to resize if both dimensions are already smaller than MAX_SIZE
        new_width, new_height = width, height
    # Resize if needed
    if new_width != width or new_height != height:
        image = image.resize((new_width, new_height), Image.LANCZOS)

    # Set DPI to 72
    save_options = {'dpi': (72, 72)}
    if icc_profile:
        save_options['icc_profile'] = icc_profile
    # Check color mode and save accordingly
    if original_mode == 'CMYK':
        # For CMYK, save as JPEG
        output_file = os.path.join(path, os.path.splitext(f)[0] + '.jpg')
        save_options['quality'] = 95
        image.save(output_file, 'JPEG', **save_options)
        format_used = 'JPEG (CMYK preserved)'
    else:
        # For RGB and others, save as WebP (convert if needed)
        if original_mode != 'RGB':
            image = image.convert('RGB')

        output_file = os.path.join(path, os.path.splitext(f)[0] + '.webp')
        save_options['quality'] = 95
        # Don't use lossless here since we want some compression
        image.save(output_file, 'WEBP', **save_options)
        format_used = 'WebP (RGB)'
    image.close()
    stop = 1
    # extension = f.split('.')[-1].lower()
    # new_path = path + f'img_{i_f+1}.{extension}'
    # shutil.copy(full_path, new_path)
    # os.remove(full_path)