from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
import json
import generate

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def index():
    names = request.get_json()
    question = names.get('question') if names else None
    image_base64 = names.get('image') if names else None
    return jsonify(generate.output(question))

if __name__ == '__main__':
    app.run(debug=True)



# fetch("https://influencer-sponsorship-engagement-system.vercel.app/", {
#   method: "GET",
#   mode: "cors"
# })
# .then(response => console.log("CORS allowed!", response))
# .catch(error => console.error("CORS blocked:", error));