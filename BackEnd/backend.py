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
        result = subprocess.check_output(['python', 'process_data.py', input_data], universal_newlines=True)
        processed_data = result.strip()
        return jsonify({'processedData': processed_data})
    except subprocess.CalledProcessError:
        return jsonify({'error': 'Failed to process data'})

if __name__ == '__main__':
    app.run(debug=True)

#Next block of code to be used with our data processing script 
# process_data.py

import sys

def process_data(input_data):
    # Process the input data (replace this with your actual processing logic)
    processed_data = input_data.upper()
    return processed_data

if __name__ == '__main__':
    # Get input data from command-line argument, we need to change it ot get the input from the frontend
    input_data = sys.argv[1]

    # Process the input data
    processed_data = process_data(input_data)

    # Print the processed data
    print(processed_data)
