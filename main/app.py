from flask import Flask, request, url_for, jsonify
from flask_cors import CORS
import main.generate
import base64
import os
import random

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
app = Flask(__name__, static_folder=os.path.join(BASE_DIR, 'static'))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static/uploads')
CORS(app)

@app.route('/api', methods=['POST'])
def index():
    names = request.get_json()
    question = names.get('question') if names else None
    image_base64 = names.get('image') if names else None
    image_url = None
    filepath = None
    if image_base64:
        header, encoded = image_base64.split(',', 1) if ',' in image_base64 else (None, image_base64)
        image_data = base64.b64decode(encoded)
        filename = f'{random.randint(1,10**18)}.webp'
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        with open(filepath, 'wb') as f:
            f.write(image_data)
        image_url = url_for('static', filename=f'uploads/{filename}', _external=True)
    d = jsonify(main.generate.output(question, image_url))
    if filepath and os.path.exists(filepath):
        os.remove(filepath)
    return d


if __name__ == '__main__':
    app.run(debug=True)
