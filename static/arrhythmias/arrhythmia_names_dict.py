a = {'a': 1, 'b': 2}
import json

with open('arrhythmia_names_dict.json', 'w') as file:
	file.write(json.dumps(a))

