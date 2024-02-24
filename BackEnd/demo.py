import sys

def process_data(input_data):
    # Process the input data (replace this with your actual processing logic)
    processed_data = input_data.upper()
    return processed_data

if __name__ == '__main__':
    # Get input data from command-line argument, we need to change it ot get the input from the backend
    input_data = sys.argv[1]

    # Process the input data
    processed_data = process_data(input_data)

    # Print the processed data change hello world to processed_data
    print('Hello World')


