import os

# textures_path = 'static/textures/'
# texture_files = [f for f in os.listdir(textures_path) if os.path.isfile(os.path.join(textures_path, f))]
# print(texture_files)

print(next(os.walk('./static/arrhythmias'))[1])