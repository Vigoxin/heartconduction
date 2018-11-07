from flask import Flask, render_template
import os
import re

app = Flask(__name__)

# Variables to pass in
textures_path = 'static/textures/'
# texture_files_short = ['square.png', 'plus.png', 'circle.png']
# texture_files_short = ['square.png', 'plus.png', 'circle.png', 'dot.png']
# texture_files_short = ['square.png', 'circle.png']
# print(texture_files_short)
# print(os.listdir(textures_path))
texture_files = [textures_path+f for f in os.listdir(textures_path) if os.path.isfile(os.path.join(textures_path, f))]
# texture_files = [textures_path+f for f in texture_files_short]


# Final pd (python dictionary) variable to pass in
pd = {
	'textureFiles': texture_files,
	'texturesPath': textures_path
}

# Routes 
@app.route('/')
def index():
	arrhythmias = sorted(next(os.walk('./static/arrhythmias'))[1])
	return render_template('landing.html', arrhythmias=arrhythmias)

# @app.route('/sandbox')
# def normal():
# 	return render_template('normal.html', pd=pd)

@app.route('/<arrhythmia>')
def arrhythmia(arrhythmia):
	arr_dir = f'static/arrhythmias/{arrhythmia}/'

	with open(arr_dir + 'grid.txt', 'r') as file:
		pd['gridToLoad'] = file.read()

	pd['info'] = []
	with open(arr_dir + 'info.txt', 'r') as file:
		for line in file.readlines():
			
			line = re.sub('\n', '', line)		# Removing new line characters
			if bool(re.search(r'\w', line)):	# If the line is not an empty one
				if line.startswith('A: '):
					current_arrhythmia = line.split('A: ')[1]
					pd['arrhythmia'] = current_arrhythmia
				elif line.startswith('H: '):
					heading = line.split('H: ')[1]
					pd['info'].append({'heading': heading, 'paragraphs': []})
				elif line.startswith('P: '):
					paragraph = line.split('P: ')[1]
					pd['info'][-1]['paragraphs'].append(paragraph)
				else:
					pd['info'][-1]['paragraphs'][-1] += ' ' + line


	return render_template('normal.html', pd=pd)

@app.route('/testing')
def testing():
	return render_template('testing.html', pd=pd)

if __name__ == '__main__':
	app.run(debug=True)

