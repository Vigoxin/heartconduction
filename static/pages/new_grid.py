import pyperclip
import os
import sys

# arrhythmia = sys.argv[1]
arrhythmia = "lbbb"
arrhythmia_grid = pyperclip.paste()[1:-1]

if not os.path.isdir(arrhythmia):
	os.mkdir(arrhythmia)

os.chdir(arrhythmia)
os.system("touch grid.txt")
os.system("touch info.txt")
with open ('grid.txt', 'w') as file:
	file.write(arrhythmia_grid)