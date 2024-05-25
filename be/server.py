from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

messages = {} 

@app.route('/api/message', methods=['POST'])
def create_message():
    data = request.json
    message_id = len(messages) + 1
    messages[message_id] = data.get('message', '')
    return jsonify({"id": message_id, "message": messages[message_id]}), 201

@app.route('/api/message/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = messages.get(message_id)
    if message is None:
        return jsonify({"error": "Message not found"}), 404
    return jsonify({"id": message_id, "message": message})

@app.route('/api/message/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    if message_id not in messages:
        return jsonify({"error": "Message not found"}), 404
    data = request.json
    messages[message_id] = data.get('message', messages[message_id])
    return jsonify({"id": message_id, "message": messages[message_id]})

@app.route('/api/message/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    if message_id not in messages:
        return jsonify({"error": "Message not found"}), 404
    del messages[message_id]
    return jsonify({"result": "Message deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
