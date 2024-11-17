from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import subprocess
import base64
import os

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def run_script():
   data = request.json  # Get JSON data from the request
   if not data:
      return jsonify({"error": "No JSON data found"}), 400
   # Extract base64 image data
   base64_image = data.get('image', '')
   if not base64_image:
      return jsonify({"error": "No image data provided"}), 400
   try:
      if base64_image.startswith('data:image/png;base64,'):
         base64_image = base64_image.split('base64,')[1]
      # Decode and save the image as PNG
      image_filename = 'uploaded_image.png'
      with open(image_filename, 'wb') as img_file:
         img_file.write(base64.b64decode(base64_image))
      
      if os.path.getsize(image_filename) == 0:
         return jsonify({"error": "Failed to save image file. The file may be empty."}), 500
      # Run the second Python script
      second_script = 'second_script.py'  # Replace with your script name
      try:
         result = subprocess.run(
            ['python', second_script, image_filename],  # Pass image filename as argument
            text=True, capture_output=True, check=True
         )
         output = result.stdout.strip()  # Capture script output
      except subprocess.CalledProcessError as e:
         return jsonify({"error": "Failed to execute script", "details": e.stderr.strip()}), 500
      
      # Return the result of the second script
      return jsonify({"message": "Image processed successfully", "script_output": output})
   except Exception as e:
      return jsonify({"error": "Failed to process image", "details": str(e)}), 500
   
   # Run a second Python script using subprocess
   # try:
   #    result = subprocess.run(
   #       ['python', 'second_script.py', input_value],  # Pass input_value as an argument
   #       text=True, capture_output=True, check=True
   #    )
   #    output = result.stdout.strip()  # Capture the output of the second script
   # except subprocess.CalledProcessError as e:
   #    return jsonify({"error": "Error running second script", "details": str(e)}), 500
   # # Return the result to the frontend
   # return jsonify({"result": output+result})

if __name__ == '__main__':
    app.run(debug=True)
