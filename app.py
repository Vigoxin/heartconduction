from flask import Flask, render_template

app = Flask(__name__)

# Variables to pass in

pd = {
	'asdf': 'asdf'
}

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/normal')
def normal():
	return render_template('normal.html', pd=pd)

if __name__ == '__main__':
	app.run(port=5000, debug=True)

