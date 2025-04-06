from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

# initialization of the Flask app
app = Flask(__name__)
CORS(app)

CLEAN_URI_API_URL="https://cleanuri.com/api/v1/shorten"

@app.route('/shorten', methods=["POST"])
def shorten_url():
    data = request.get_json()  # extract the JSON data sent by the client
    
    if 'url' not in data:
        return jsonify({"error": "URL is missing"}), 400
    
    response = requests.post(CLEAN_URI_API_URL, data={"url": data["url"]}) # data is sent as form-urlencoded as the API requests
    
    if response.status_code == 200:
        short_url = response.json().get("result_url")
        return jsonify({"short_url": short_url})
    else:
        return jsonify({"error": "Failed to shorten the URL"}), 500
    

if __name__ == '__main__':
    app.run(debug=True)