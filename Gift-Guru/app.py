from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
import time

app = Flask(__name__)
# CORS(app)  # Allow all origins
CORS(app, resources={r"/generate": {"origins": "http://localhost:5000"}})

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()

    if 'prompt' not in data:
        return jsonify({'error': 'Prompt is required'}), 400

    prompt = data['prompt']

    try:
        start_time = time.time()
        result = subprocess.run(
            ["ollama", "run", "llama3.1:8b", prompt],
            capture_output=True,
            text=True,
            check=True
        )
        end_time = time.time()
        print(f"Generation time: {end_time - start_time} seconds")

        generated_text = result.stdout.strip()
        return jsonify({'response': generated_text}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({'error': 'Failed to generate text', 'stderr': e.stderr}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
