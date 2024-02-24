# backend.py

from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/api/process_data', methods=['POST'])
def process_data():
    # Extract input data from the request
    input_data = request.json.get('inputData')

    # Call the Python script for processing data
    try:
        # Execute the Python script and pass input data
        result = subprocess.check_output(['python', 'demo.py', input_data], universal_newlines=True)
        processed_data = result.strip()
        return jsonify({'processedData': processed_data})
    except subprocess.CalledProcessError:
        return jsonify({'error': 'Failed to process data'})

if __name__ == '__main__':
    app.run(debug=True)



