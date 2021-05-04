from flask import Flask, render_template
import os
import re
import json

app = Flask(__name__)

# Variables to pass in
textures_path = 'static/textures/'
texture_files = ['/'+textures_path+f for f in os.listdir(textures_path) if os.path.isfile(os.path.join(textures_path, f))]


# Final pd (python dictionary) variable to pass in
pd = {
	'textureFiles': texture_files,
	'texturesPath': textures_path
}

# Creating arrhythmias as a list of dictionaries
with open("static/arrhythmias/arrhythmias_to_include.json", "r") as file:
	arrhythmias_to_include = json.load(file)
arrhythmias = []
for arrhythmiaName in [a for a in sorted(next(os.walk('./static/arrhythmias'))[1]) if a in arrhythmias_to_include]:
	to_add = {}
	
	# Store shortened/server name with underscores in ["serverName"]
	to_add["serverName"] = arrhythmiaName

	# If there's a key in arrhythmia_names_dict.json, then store this in ["neatName"]
	with open('static/arrhythmias/arrhythmia_names_dict.json', 'r') as file:
		arrhythmia_names_dict = json.load(file)
		if arrhythmiaName in arrhythmia_names_dict:
			to_add["neatName"] = arrhythmia_names_dict[arrhythmiaName]

	arrhythmias.append(to_add)

# Routes
@app.route('/')
def index():
	return render_template('landing.html', arrhythmias=arrhythmias)

@app.route('/about')
def about():
	return render_template('about.html', arrhythmias=arrhythmias)

@app.route('/contact')
def contact():
	return render_template('contact.html', arrhythmias=arrhythmias)

@app.route('/blank')
def blank():
	pd = {
		'textureFiles': texture_files,
		'texturesPath': textures_path
	}
	return render_template('arrhythmia.html', pd=pd)

@app.route('/arrhythmia/<arrhythmiaName>')
def arrhythmia(arrhythmiaName):
	print(arrhythmiaName)
	arrhythmia = [a for a in arrhythmias if a["serverName"] == arrhythmiaName][0]
	# print(arrhythmia)

	# If there's a 'grid.txt' file, then store this in ["gridToLoad"]
	arr_dir = f'static/arrhythmias/{arrhythmiaName}/'
	print(arr_dir)
	if os.path.isfile(arr_dir + 'grid.txt'):
		with open(arr_dir + 'grid.txt', 'r') as file:
			# arrhythmia['gridToLoad'] = file.read()
			arrhythmia['gridToLoad'] = file.read()
			# print(arrhythmia["gridToLoad"])
	
	# # If there's a 'neatName.txt' file, then store this in pd["neatName"]
	# if os.path.isfile(arr_dir + 'neatName.txt'):
	# 	with open(arr_dir + 'neatName.txt', 'r') as file:
	# 		pd['neatName'] = file.read()

	# # If there's a 'grid.txt' file, then store this in pd["gridToLoad"]
	# if os.path.isfile(arr_dir + 'grid.txt'):
	# 	with open(arr_dir + 'grid.txt', 'r') as file:
	# 		pd['gridToLoad'] = file.read()

	# # If there's a 'info.txt' file, then store this in pd["info"]
	# if os.path.isfile(arr_dir + 'info.txt'):
	# 	pd['info'] = []
	# 	with open(arr_dir + 'info.txt', 'r') as file:
	# 		for line in file.readlines():
				
	# 			line = re.sub('\n', '', line)		# Removing new line characters
	# 			if bool(re.search(r'\w', line)):	# If the line is not an empty one
	# 				if line.startswith('A: '):
	# 					current_arrhythmia = line.split('A: ')[1]
	# 					pd['arrhythmia'] = current_arrhythmia
	# 				elif line.startswith('H: '):
	# 					heading = line.split('H: ')[1]
	# 					pd['info'].append({'heading': heading, 'paragraphs': []})
	# 				elif line.startswith('P: '):
	# 					paragraph = line.split('P: ')[1]
	# 					pd['info'][-1]['paragraphs'].append(paragraph)
	# 				else:
	# 					pd['info'][-1]['paragraphs'][-1] += ' ' + line

	pd["arrhythmia"] = arrhythmia

	return render_template('arrhythmia.html', pd=pd, arrhythmia=arrhythmia, arrhythmias=arrhythmias)
	# return render_template('normal.html', pd=pd, arrhythmias=arrhythmias)

@app.route('/testing')
def testing():
	return render_template('testing.html', pd=pd)

if __name__ == '__main__':
	app.run(debug=True, port=5001)

