# import sys
# input_value = sys.argv[1]
# print(input_value)

import sys

def process_image(image_path):
    # Add your image processing logic here
    return f"Image at '{image_path}' processed successfully!"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No image file provided.")
        sys.exit(1)
    
    image_path = sys.argv[1]
    result = process_image(image_path)
    print(result)