from flask import Flask, render_template
import os
import re
import json

application = Flask(__name__)

# Variables to pass in
textures_path = 'static/textures/'
texture_files = ['/'+textures_path+f for f in os.listdir(textures_path) if os.path.isfile(os.path.join(textures_path, f))]


# Final pd (python dictionary) variable to pass in
pd = {
	'textureFiles': texture_files,
	'texturesPath': textures_path
}

# Creating arrhythmias as a list of dictionaries
with open("static/pages/pages_to_include.json", "r") as file:
	pages_to_include = json.load(file)
pages = []
# for pageName in [a for a in sorted(next(os.walk('./static/pages'))[1]) if a in pages_to_include]:
for pageName in pages_to_include:
	to_add = {}
	
	# Store shortened/server name with underscores in ["serverName"]
	to_add["serverName"] = pageName

	# If there's a key in pages_names_dict.json, then store this in ["neatName"]
	with open('static/pages/pages_names_dict.json', 'r') as file:
		pages_names_dict = json.load(file)
		if pageName in pages_names_dict:
			to_add["neatName"] = pages_names_dict[pageName]

	# Store the category in ["category"]
	with open('static/pages/pages_categories_dict.json', 'r') as file:
		pages_categories_dict = json.load(file)
		if pageName in pages_categories_dict:
			to_add["category"] = pages_categories_dict[pageName]

	pages.append(to_add)

# Routes
@application.route('/')
def index():
	return render_template('home.html', pages=pages)

@application.route('/about')
def about():
	return render_template('about.html', pages=pages)

@application.route('/contact')
def contact():
	return render_template('contact.html', pages=pages)

@application.route('/blank')
def blank():
	pd = {
		'textureFiles': texture_files,
		'texturesPath': textures_path
	}
	return render_template('page.html', pd=pd)

@application.route('/learn/<pageName>')
def learn(pageName):
	print(pageName)
	page = [a for a in pages if a["serverName"] == pageName][0]
	# print(page)

	# If there's a 'grid.txt' file, then store this in ["gridToLoad"]
	arr_dir = f'static/pages/{pageName}/'
	print(arr_dir)
	if os.path.isfile(arr_dir + 'grid.txt'):
		with open(arr_dir + 'grid.txt', 'r') as file:
			# page['gridToLoad'] = file.read()
			page['gridToLoad'] = file.read()
			# print(page["gridToLoad"])

	pd["page"] = page

	return render_template('page.html', pd=pd, page=page, pages=pages)
	# return render_template('normal.html', pd=pd, pages=pages)

@application.route('/testing')
def testing():
	return render_template('testing.html', pd=pd)

if __name__ == '__main__':
	application.run(debug=True, port=8000)

