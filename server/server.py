from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def run_script():
    # Example of executing Python logic
    data = request.json
    if not data:
         return jsonify({"error": "No JSON data found"}), 400
    input_value = data.get('input', '')
    result = f"Received: {input_value}"
    print(result)
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
