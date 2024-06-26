from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/api/message', methods=['POST'])
def message():
    data = request.json
    user_message = data.get('message', '')
    response_message = f"Server received: {user_message}"
    return jsonify({"response": response_message})

if __name__ == '__main__':
    app.run(debug=True)
