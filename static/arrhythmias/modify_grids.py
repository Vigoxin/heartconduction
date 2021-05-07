import json
import os
with open("arrhythmias_to_include.json", "r") as file:
	ati = json.load(file)

ati = [x for x in [a[1] for a in os.walk("./")][0] if x in ati]
for name in ati:
	print(name)
	with open(f"{name}/grid.txt", "r") as file:
		grid = json.load(file)
	cell_size = grid[1]["cellSize"]
	for i in range(40):
		i = str(i)
		# print(i)
		for j in range(40):
			grid[0][i][j]["x"] = grid[0][i][j]["col"]*cell_size
			grid[0][i][j]["y"] = grid[0][i][j]["row"]*cell_size
			# print(grid[0][i][j])
	with open(f"{name}/grid.txt", "w") as file:
		json.dump(grid, file)