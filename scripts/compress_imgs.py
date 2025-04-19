import os
import shutil
import numpy as np
from PIL import Image

path = "/Users/bkayf/Documents/Perso/Media/pictures/argentique/selection_website/renamed/"

files = os.listdir(path)
np.random.shuffle(files)
print(len(files))
for i_f, f in enumerate(files):
    if "webp" not in f and ".DS" not in f and "save" not in f:
        full_path = path + f
        image = Image.open(full_path)
        image = image.convert('RGB')
        image.save(full_path[:-4] + '.webp', 'webp', optimize=True, quality=50)
        image.close()
        stop = 1
    # extension = f.split('.')[-1].lower()
    # new_path = path + f'img_{i_f+1}.{extension}'
    # shutil.copy(full_path, new_path)
    # os.remove(full_path)