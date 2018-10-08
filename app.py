from flask import Flask, render_template
import os

app = Flask(__name__)

# Variables to pass in
textures_path = 'static/textures/'
texture_files = [textures_path+f for f in os.listdir(textures_path) if os.path.isfile(os.path.join(textures_path, f))]

# Final pd (python dictionary) variable to pass in
pd = {
	'asdf': 'asdf',
	'textureFiles': texture_files,
	'texturesPath': textures_path
}

# Routes 
@app.route('/')
def index():
	return render_template('landing.html')

@app.route('/normal')
def normal():
	return render_template('normal.html', pd=pd)

@app.route('/testing')
def testing():
	return render_template('testing.html', pd=pd)

if __name__ == '__main__':
	app.run(port=3000, debug=True)

